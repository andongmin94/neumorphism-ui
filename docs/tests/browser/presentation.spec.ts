import { test, expect } from "@playwright/test";

const pages = [
  { name: "home", path: "/en", heading: "Neumorphism as an interface system, not a visual effect." },
  { name: "components", path: "/en/components", heading: "Install only the interface parts you need." },
  { name: "templates", path: "/en/templates", heading: "Templates" },
  { name: "charts", path: "/en/charts", heading: "Charts that do not hide the data." },
  { name: "theme-studio", path: "/en/customize", heading: "Tune tokens in a real interface, not in a spreadsheet." },
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
      await expect(page.locator(".docs-site-sidebar")).toBeVisible();
    } else {
      await expect(page.locator(".mobile-nav-trigger")).toBeVisible();
      await expect(page.locator(".docs-site-sidebar")).toBeHidden();
    }

    await page.screenshot({
      path: info.outputPath(`presentation-${entry.name}.png`),
      fullPage: true,
    });

    expect(errors).toEqual([]);
  });
}
