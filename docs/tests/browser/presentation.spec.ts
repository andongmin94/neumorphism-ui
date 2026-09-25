import { test, expect } from "@playwright/test";

const pages = [
  { name: "home", path: "/en", heading: "Neumorphism as an interface system, not a visual effect.", sidebar: false },
  { name: "components", path: "/en/components", heading: "Install only the interface parts you need.", sidebar: false },
  { name: "templates", path: "/en/templates", heading: "Templates", sidebar: false },
  { name: "charts", path: "/en/charts", heading: "Charts that do not hide the data.", sidebar: false },
  { name: "theme-studio", path: "/en/customize", heading: "Tune tokens in a real interface, not in a spreadsheet.", sidebar: false },
  { name: "button-detail", path: "/en/components/button", heading: "Button", sidebar: true },
  { name: "verification", path: "/en/docs/verification", heading: "Verification & release", sidebar: true },
] as const;

for (const entry of pages) {
  test(`presentation: ${entry.name}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);

    await expect(page.getByRole("heading", { level: 1, name: entry.heading, exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    if (info.project.name === "desktop-light") {
      await expect(page.locator(".site-header .primary-nav")).toBeVisible();
      if (entry.sidebar) {
        await expect(page.locator(".docs-site-sidebar")).toBeVisible();
      } else {
        if (entry.sidebar) await expect(page.locator(".docs-site-sidebar")).toBeHidden(); else await expect(page.locator(".docs-site-sidebar")).toHaveCount(0);
      }
    } else {
      await expect(page.locator(".mobile-nav-trigger")).toBeVisible();
      if (entry.sidebar) {
        await expect(page.locator(".docs-site-sidebar")).toBeHidden();
      } else {
        await expect(page.locator(".docs-site-sidebar")).toHaveCount(0);
      }
    }

    await page.evaluate(() => {
      window.scrollTo(0, 0);
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });
    await expect(page.locator(".site-header")).toBeVisible();

    await page.screenshot({
      path: info.outputPath(`presentation-${entry.name}-top.png`),
      fullPage: false,
    });
    await page.screenshot({
      path: info.outputPath(`presentation-${entry.name}.png`),
      fullPage: true,
    });

    expect(errors).toEqual([]);
  });
}


test("presentation: default locale is English", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Neumorphism as an interface system, not a visual effect.",
      exact: true,
    }),
  ).toBeVisible();
});

test("presentation: tablet shell and drawer", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop-light", "single tablet presentation pass");

  await page.setViewportSize({ width: 820, height: 1180 });
  const tabletPages = [
    { name: "home", path: "/en", sidebar: false },
    { name: "components", path: "/en/components", sidebar: false },
    { name: "templates", path: "/en/templates", sidebar: false },
    { name: "button-detail", path: "/en/components/button", sidebar: true },
  ] as const;

  for (const entry of tabletPages) {
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator(".mobile-nav-trigger")).toBeVisible();
    await expect(page.locator(".primary-nav")).toBeHidden();

    if (entry.sidebar) {
      await expect(page.locator(".docs-site-sidebar")).toBeHidden();
    } else {
      await expect(page.locator(".docs-site-sidebar")).toHaveCount(0);
    }

    await page.screenshot({
      path: info.outputPath(`presentation-tablet-${entry.name}.png`),
      fullPage: false,
    });
  }

  await page.getByRole("button", { name: "Open docs menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Mobile documentation navigation" });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(300);
  expect(box?.x ?? -999).toBeGreaterThanOrEqual(-1);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(821);
  await page.screenshot({
    path: info.outputPath("presentation-tablet-docs-navigation.png"),
    fullPage: false,
  });
});

test("presentation: search-dialog", async ({ page }, info) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /Search documentation/i }).click();
  const dialog = page.getByRole("dialog", { name: /Search documentation/i });
  await expect(dialog).toBeVisible();
  await page.screenshot({
    path: info.outputPath("presentation-search-dialog.png"),
    fullPage: false,
  });
});

test("presentation: mobile-docs-navigation", async ({ page }, info) => {
  test.skip(info.project.name === "desktop-light", "mobile presentation only");
  await page.goto("/en/components/button");
  await page.getByRole("button", { name: "Open docs menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Mobile documentation navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Start", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Components", exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Button", exact: true })).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(300);
  expect(box?.x ?? -999).toBeGreaterThanOrEqual(-1);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(391);
  await page.screenshot({
    path: info.outputPath("presentation-mobile-docs-navigation.png"),
    fullPage: false,
  });
});
