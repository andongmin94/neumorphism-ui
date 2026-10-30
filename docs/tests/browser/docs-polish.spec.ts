import { expect, test } from "@playwright/test";
import { getGitHubStars } from "../../components/docs/github-stars";

const githubStarsUrl = "https://api.github.com/repos/andongmin94/neumorphism-ui";
const starsCacheKey = "neumorphism-ui-github-stars";
const starsCacheDuration = 60 * 60 * 1000;
const githubApiHeaders = { "Access-Control-Allow-Origin": "*" };

test("GitHub cache shares concurrent requests, expires at one hour and permits recovery", async () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalFetch = globalThis.fetch;
  const originalNow = Date.now;
  let now = 2_000_000_000_000;
  let requests = 0;
  let stored: string | null = null;
  let finish!: (response: Response) => void;
  const response = new Promise<Response>(resolve => { finish = resolve; });
  try {
    Reflect.deleteProperty(globalThis, "window");
    globalThis.fetch = async () => { requests++; return response; };
    expect(await getGitHubStars()).toBeNull();
    expect(requests).toBe(0);
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: {
        getItem: () => stored,
        setItem: (_key: string, value: string) => { stored = value; },
      } },
    });
    Date.now = () => now;
    const first = getGitHubStars();
    const second = getGitHubStars();
    expect(first).toBe(second);
    expect(requests).toBe(1);
    finish(Response.json({ stargazers_count: 1287 }));
    expect(await Promise.all([first, second])).toEqual([1287, 1287]);
    expect(JSON.parse(stored!)).toEqual({ count: 1287, fetchedAt: now });
    now += starsCacheDuration - 1;
    expect(await getGitHubStars()).toBe(1287);
    expect(requests).toBe(1);
    now++;
    globalThis.fetch = async () => { requests++; return new Response(null, { status: 403 }); };
    expect(await getGitHubStars()).toBe(1287);
    expect(requests).toBe(2);
    expect(JSON.parse(stored!).fetchedAt).toBe(now - starsCacheDuration);
    globalThis.fetch = async () => { requests++; return Response.json({ stargazers_count: 1288 }); };
    expect(await getGitHubStars()).toBe(1288);
    expect(requests).toBe(3);
    expect(JSON.parse(stored!)).toEqual({ count: 1288, fetchedAt: now });
  } finally {
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

for (const [count, displayed] of [[0, "0"], [1287, "1.3K"]] as const) {
  test(`GitHub action renders ${count} actual stars without hiding the mobile count`, async ({ page }) => {
    await page.route(githubStarsUrl, route => route.fulfill({
      headers: githubApiHeaders,
      json: { stargazers_count: count },
    }));
    await page.goto("/en");
    const link = page.locator("[data-github-repository]");
    await expect(link).toHaveAttribute("data-state", "ready");
    await expect(link).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAccessibleName(new RegExp(`${count.toLocaleString("en-US")} stars`));
    await expect(link.locator("[data-github-stars]")).toHaveText(displayed);
    await expect(link.locator("[data-github-stars]")).toBeVisible();
    const mark = link.locator("[data-github-mark]");
    await expect(mark).toHaveAttribute("viewBox", "0 0 16 16");
    await expect(mark).toHaveCSS("stroke", "none");
    const size = await mark.boundingBox();
    expect(size?.width).toBe(20);
    expect(size?.height).toBe(20);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const count of [null, -1]) {
  test(`GitHub unavailable count remains honest: ${count}`, async ({ page }) => {
    await page.route(githubStarsUrl, route => route.fulfill({ headers: githubApiHeaders, json: { stargazers_count: count } }));
    await page.goto("/en");
    const link = page.locator("[data-github-repository]");
    await expect(link).toHaveAttribute("data-state", "unavailable");
    await expect(link.locator("[data-github-stars]")).toHaveText("—");
    await expect(link).toHaveAccessibleName(/Star count unavailable/);
    await expect(link).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
  });
}

test("GitHub count is cached for a reload without another upstream request", async ({ page }) => {
  let requests = 0;
  await page.route(githubStarsUrl, route => {
    requests++;
    return route.fulfill({ headers: githubApiHeaders, json: { stargazers_count: 1287 } });
  });
  await page.goto("/en");
  const link = page.locator("[data-github-repository]");
  await expect(link).toHaveAccessibleName(/1,287 stars/);
  const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), starsCacheKey);
  expect(stored.count).toBe(1287);
  expect(Date.now() - stored.fetchedAt).toBeLessThan(starsCacheDuration);
  await page.reload();
  await expect(link).toHaveAccessibleName(/1,287 stars/);
  await expect(link.locator("[data-github-stars]")).toHaveText("1.3K");
  expect(requests).toBe(1);
});

test("GitHub count refreshes an expired persisted cache", async ({ page }) => {
  await page.addInitScript(({ key, duration }) => {
    localStorage.setItem(key, JSON.stringify({ count: 12, fetchedAt: Date.now() - duration - 1000 }));
  }, { key: starsCacheKey, duration: starsCacheDuration });
  let requests = 0;
  await page.route(githubStarsUrl, route => {
    requests++;
    return route.fulfill({ headers: githubApiHeaders, json: { stargazers_count: 1287 } });
  });
  await page.goto("/en");
  await expect(page.locator("[data-github-repository]")).toHaveAccessibleName(/1,287 stars/);
  const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), starsCacheKey);
  expect(stored.count).toBe(1287);
  expect(Date.now() - stored.fetchedAt).toBeLessThan(starsCacheDuration);
  expect(requests).toBe(1);
});

for (const failure of ["http", "network"] as const) {
  test(`GitHub ${failure} failure keeps the expired last success and repository link`, async ({ page }) => {
    await page.addInitScript(({ key, duration }) => {
      localStorage.setItem(key, JSON.stringify({ count: 1287, fetchedAt: Date.now() - duration - 1000 }));
    }, { key: starsCacheKey, duration: starsCacheDuration });
    await page.route(githubStarsUrl, route => failure === "http"
      ? route.fulfill({ status: 403, headers: githubApiHeaders, json: { message: "API rate limit exceeded" } })
      : route.abort("failed"));
    await page.goto("/en");
    const link = page.locator("[data-github-repository]");
    await expect(link).toHaveAttribute("data-state", "ready");
    await expect(link).toHaveAccessibleName(/1,287 stars/);
    await expect(link.locator("[data-github-stars]")).toHaveText("1.3K");
    await expect(link).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
    const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), starsCacheKey);
    expect(stored.count).toBe(1287);
    expect(Date.now() - stored.fetchedAt).toBeGreaterThanOrEqual(starsCacheDuration);
  });
}

test("GitHub failure without a cached success stays unavailable", async ({ page }) => {
  await page.route(githubStarsUrl, route => route.abort("failed"));
  await page.goto("/en");
  const link = page.locator("[data-github-repository]");
  await expect(link).toHaveAttribute("data-state", "unavailable");
  await expect(link.locator("[data-github-stars]")).toHaveText("—");
  await expect(link).toHaveAccessibleName(/Star count unavailable/);
  await expect(link).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
  expect(await page.evaluate(key => localStorage.getItem(key), starsCacheKey)).toBeNull();
});

test("home uses installable controls and saves or resets the same workspace", async ({ page }, info) => {
  await page.goto("/en");
  const showcase = page.locator("[data-home-showcase]");
  await expect(showcase.locator('[data-slot="card"]')).toHaveCount(1);
  await expect(showcase.locator('[data-slot="switch"]')).toHaveCount(1);
  const input = showcase.getByRole("textbox", { name: "Workspace name" });
  const toggle = showcase.getByRole("switch", { name: "Email notifications" });
  const reset = showcase.getByRole("button", { name: "Reset", exact: true });
  await expect(reset).toBeDisabled();
  await input.fill("New studio");
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect(showcase.getByRole("status")).toHaveText("Unsaved changes");
  await showcase.getByRole("button", { name: "Save workspace" }).click();
  await expect(showcase.getByRole("status")).toHaveText("Saved for this page view. Nothing was sent.");
  await expect(reset).toBeDisabled();
  await input.fill("Not saved");
  await toggle.click();
  await expect(toggle).toBeChecked();
  await reset.click();
  await expect(input).toHaveValue("New studio");
  await expect(toggle).not.toBeChecked();
  await expect(showcase.getByRole("status")).toContainText("Changes discarded");
  await expect(showcase.getByRole("link", { name: /CMS demo/ })).toHaveAttribute("href", "/en/templates/cms");
  await showcase.screenshot({ path: info.outputPath("polish-workspace-saved.png") });
  await input.fill("   ");
  await showcase.getByRole("button", { name: "Save workspace" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toBeFocused();
  await expect(showcase.getByRole("alert")).toBeVisible();
  await input.fill("Recovered studio");
  await showcase.getByRole("button", { name: "Save workspace" }).click();
  await expect(showcase.getByRole("alert")).toHaveCount(0);
  await expect(showcase.getByRole("status")).toContainText("Saved for this page view");
});

test("directory slash and global search have one shortcut owner", async ({ page }, info) => {
  await page.goto("/en");
  // Static HTML is not proof that client keyboard listeners are installed.
  await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /^(ready|unavailable)$/, { timeout: 10000 });
  await page.keyboard.press("/");
  await expect(page.locator(".component-directory-search input")).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: /Search documentation/i });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill("button");
  await expect(dialog.getByRole("option").first()).toBeVisible();
  await input.press("Enter");
  await expect(page).toHaveURL(/\/en\/components\/button$/);
  await expect(dialog).toHaveCount(0);
  const trigger = page.getByRole("button", { name: /Search documentation/i });
  await trigger.click();
  await input.fill("date");
  const selected = dialog.locator('[data-slot="command-item"][aria-selected="true"]');
  await expect(selected).toHaveCount(1);
  const first = await selected.getAttribute("data-href");
  await input.press("ArrowDown");
  await expect(selected).not.toHaveAttribute("data-href", first!);
  await page.screenshot({ path: info.outputPath("polish-keyboard-search.png") });
  await input.dispatchEvent("keydown", { key: "Enter", code: "Enter", isComposing: true });
  await expect(dialog).toBeVisible();
  await input.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("search includes templates and recovers from an empty query result", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /Search documentation/i }).click();
  const dialog = page.getByRole("dialog", { name: /Search documentation/i });
  const input = dialog.getByRole("combobox");
  await input.fill("no-such-item-984332");
  await expect(dialog.getByRole("option")).toHaveCount(0);
  await expect(dialog.locator('[data-slot="command-empty"]')).toBeVisible();
  await input.fill("cms");
  await expect(dialog.locator('[data-href="/en/templates/cms"]')).toBeVisible();
  await input.press("Control+k");
  await expect(dialog).toHaveCount(0);
});

test("header and showcase reflow at four widths in both modes", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop-light", "matrix uses explicit viewports and modes");
  for (const width of [390, 820, 1024, 1440]) {
    for (const mode of ["light", "dark"] as const) {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: mode });
      await page.goto("/en");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /ready|unavailable/);
      await expect(page.locator("[data-github-stars]")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const brand = await page.locator(".site-brand").boundingBox();
      const actions = await page.locator(".site-actions").boundingBox();
      expect(brand!.x + brand!.width).toBeLessThanOrEqual(actions!.x);
      expect(actions!.x + actions!.width).toBeLessThanOrEqual(width);
      if (width >= 1024) {
        const nav = await page.locator(".primary-nav").boundingBox();
        expect(nav!.x + nav!.width).toBeLessThanOrEqual(actions!.x);
      }
      await page.screenshot({ path: info.outputPath(`polish-home-${width}-${mode}.png`) });
    }
  }
});

test("sidebar filter keeps a visible recessed target and keyboard focus", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/components/button");
  const field = page.locator(".docs-site-sidebar .sidebar-filter");
  const input = field.getByRole("searchbox");
  await expect(input).toBeVisible();
  expect(await field.evaluate(e => getComputedStyle(e).boxShadow)).toContain("inset");
  await input.focus();
  await expect(field).toHaveCSS("outline-style", "solid");
  await expect(field).toHaveCSS("outline-width", "2px");
  await input.fill("dialog");
  await expect(page.locator(".docs-site-sidebar .component-nav-list").getByRole("link", { name: "Dialog", exact: true })).toBeVisible();
  await field.screenshot({ path: info.outputPath("sidebar-search-focus.png") });
  await input.fill("no-such-component-1379");
  await expect(page.locator(".docs-site-sidebar .component-nav-list a")).toHaveCount(0);
  await input.fill("");
  await expect(page.locator(".docs-site-sidebar .component-nav-list a")).toHaveCount(56);
});
