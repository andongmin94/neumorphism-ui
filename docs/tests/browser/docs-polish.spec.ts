import { expect, test } from "@playwright/test";

for (const [count, displayed] of [[0, "0"], [1287, "1.3K"]] as const) {
  test(`GitHub action renders ${count} actual stars without hiding the mobile count`, async ({ page }) => {
    await page.route("**/api/github-stars", route => route.fulfill({
      json: { count, fetchedAt: "2026-09-26T00:00:00.000Z" },
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

for (const data of [{ count: null, fetchedAt: null }, { count: -1, fetchedAt: "2026-09-26" }]) {
  test(`GitHub unavailable count remains honest: ${data.count}`, async ({ page }) => {
    await page.route("**/api/github-stars", route => route.fulfill({ json: data }));
    await page.goto("/en");
    const link = page.locator("[data-github-repository]");
    await expect(link).toHaveAttribute("data-state", "unavailable");
    await expect(link.locator("[data-github-stars]")).toHaveText("—");
    await expect(link).toHaveAccessibleName(/Star count unavailable/);
    await expect(link).toHaveAttribute("href", "https://github.com/andongmin94/neumorphism-ui");
  });
}

test("static GitHub endpoint exposes only a count and its observation time", async ({ request }) => {
  const response = await request.get("/api/github-stars");
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(Object.keys(data).sort()).toEqual(["count", "fetchedAt"]);
  if (data.count === null) expect(data.fetchedAt).toBeNull();
  else {
    expect(Number.isSafeInteger(data.count)).toBe(true);
    expect(data.count).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(Date.parse(data.fetchedAt))).toBe(true);
  }
});

test("home uses installable controls and saves or resets the same workspace", async ({ page }, info) => {
  await page.goto("/en");
  const showcase = page.locator("[data-home-showcase]");
  await expect(showcase.locator('[data-slot="card"]')).toHaveCount(1);
  await expect(showcase.locator('[data-slot="switch"]')).toHaveCount(1);
  const input = showcase.getByRole("textbox", { name: "Workspace name" });
  const toggle = showcase.getByRole("switch", { name: "Keep me in the loop" });
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
