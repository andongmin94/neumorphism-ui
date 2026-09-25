import { test, expect } from "@playwright/test";

const pages = ["design-tokens", "registry", "resources", "credits"] as const;

for (const locale of ["ko", "en", "ja", "zh"]) {
  for (const pageName of pages) {
    test(`${locale}: docs reference ${pageName}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`/${locale}/docs/${pageName}`);
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("design tokens are sourced from the live preset list", async ({ page }) => {
  await page.goto("/en/docs/design-tokens");
  await expect(page.getByRole("heading", { name: "Air", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Graphite", exact: true })).toBeVisible();
  await expect(page.getByText("style-sage", { exact: true })).toBeVisible();
});

test("registry architecture documents generated ownership", async ({ page }) => {
  await page.goto("/en/docs/registry");
  await expect(page.getByText("registry/src/components/ui", { exact: true })).toBeVisible();
  await expect(page.getByText("docs/src/registry", { exact: true })).toBeVisible();
  await expect(page.getByText("@neumorphism-ui", { exact: true })).toBeVisible();
});
