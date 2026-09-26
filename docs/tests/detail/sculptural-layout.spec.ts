import { expect, test, type Page } from "@playwright/test";

async function openStudio(page: Page, locale: string, dark: boolean) {
  await page.goto(`/${locale}/customize`);
  // The workbench has its own preview mode; the site's color scheme is not enough.
  await page.locator(".theme-preview-mode").getByRole("button", {
    name: dark ? "Dark" : "Light", exact: true,
  }).click();
  await expect(page.locator("[data-theme-price-preview]")).toHaveAttribute(
    "data-preview-mode", dark ? "dark" : "light",
  );
  await page.evaluate(() => document.fonts.ready);
}

test("reference composition has one lifted value and no nested card frame", async ({ page }, info) => {
  await openStudio(page, "en", info.project.name.endsWith("dark"));
  const canvas = page.locator("[data-theme-price-preview]");
  await expect(canvas).toBeVisible();
  const metrics = canvas.locator("[data-price-metrics]");
  const cards = metrics.locator('[data-slot="card"]');
  await expect(cards).toHaveCount(4);
  await expect(metrics.locator('[data-variant="raised"]')).toHaveCount(1);
  await expect(metrics.locator('[data-variant="inset"]')).toHaveCount(3);
  await expect(canvas.locator('[data-slot="card"] [data-slot="card"]')).toHaveCount(0);
  await expect(canvas).toHaveCSS("box-shadow", "none");
  for (const card of await cards.all()) {
    const value = await card.locator("dd").boundingBox();
    const label = await card.locator("dt").boundingBox();
    const rect = await card.boundingBox();
    expect(value!.y + value!.height).toBeLessThanOrEqual(label!.y - 6);
    expect(value!.x).toBeGreaterThanOrEqual(rect!.x);
    expect(value!.x + value!.width).toBeLessThanOrEqual(rect!.x + rect!.width);
    expect(label!.x).toBeGreaterThanOrEqual(rect!.x);
    expect(label!.x + label!.width).toBeLessThanOrEqual(rect!.x + rect!.width);
    expect(Math.abs(value!.x + value!.width / 2 - rect!.x - rect!.width / 2)).toBeLessThan(1);
  }
  const input = canvas.locator('input[type="number"]');
  const button = canvas.getByRole("button", { name: "Save", exact: true });
  await input.fill("240");
  await expect(cards.nth(1).locator("dd")).toHaveText("$210.00");
  await button.click();
  await expect(cards.nth(1).locator("dd")).toHaveText("$240.00");
  await expect(cards.nth(3).locator("dd")).toHaveText("78%");
  await expect(button).toBeDisabled();
  await canvas.screenshot({ path: info.outputPath("sculptural-saved.png"), animations: "disabled" });
  await canvas.getByRole("button", { name: "Delete alert", exact: true }).click();
  await expect(cards.nth(1).locator("dd")).toHaveText("—");
  await expect(cards.nth(3).locator("dd")).toHaveText("—");
  await input.fill("0");
  await button.click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toBeFocused();
  await input.fill("250");
  await button.click();
  await expect(cards.nth(1).locator("dd")).toHaveText("$250.00");
  await canvas.screenshot({ path: info.outputPath("sculptural-recovered.png"), animations: "disabled" });
});

test("card typography, radius and footer keep content inside the physical plate", async ({ page }, info) => {
  await page.goto("/en/components/card");
  const panel = page.locator("[data-component-stage]");
  const card = panel.locator('[data-slot="card"]').first();
  await expect(card).toBeVisible();
  expect(await card.evaluate(e => parseFloat(getComputedStyle(e).borderTopLeftRadius))).toBe(12);
  const title = card.locator('[data-slot="card-title"]');
  await title.evaluate(e => { e.textContent = "A longer workspace title that must wrap without touching its action"; });
  const description = card.locator('[data-slot="card-description"]');
  await description.evaluate(e => { e.textContent = "https://example.test/a-very-long-unbroken-workspace-identifier-with-no-spaces"; });
  const bounds = await card.boundingBox();
  for (const child of [title, description, card.locator('[data-slot="card-action"]')]) {
    const b = await child.boundingBox();
    expect(b!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(b!.x + b!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
  }
  const t = await title.boundingBox();
  const a = await card.locator('[data-slot="card-action"]').boundingBox();
  expect(t!.x + t!.width + 12).toBeLessThanOrEqual(a!.x);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  await panel.screenshot({ path: info.outputPath("card-long-content.png"), animations: "disabled" });
});

test("reference composition keeps geometry in all document locales", async ({ page }, info) => {
  for (const locale of ["en", "ko", "ja", "zh"]) {
    await openStudio(page, locale, info.project.name.endsWith("dark"));
    const canvas = page.locator("[data-theme-price-preview]");
    await expect(canvas.locator("[data-price-metrics] dt")).toHaveCount(4);
    expect(await canvas.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await canvas.screenshot({ path: info.outputPath(`sculptural-${locale}.png`), animations: "disabled" });
  }
});

test("preset and preview mode changes preserve the saved readout and tile bounds", async ({ page }, info) => {
  await openStudio(page, "en", false);
  const canvas = page.locator("[data-theme-price-preview]");
  await canvas.locator('input[type="number"]').fill("240");
  await canvas.getByRole("button", { name: "Save", exact: true }).click();
  const choices = page.locator(".theme-preset-grid").getByRole("button");
  const presets = ["air", "lavender", "sage", "clay", "graphite"];
  await expect(choices).toHaveCount(presets.length);
  for (const [index, preset] of presets.entries()) {
    await choices.nth(index).click();
    for (const mode of ["light", "dark"] as const) {
      await page.locator(".theme-preview-mode").getByRole("button", {
        name: mode === "light" ? "Light" : "Dark", exact: true,
      }).click();
      await expect(canvas).toHaveAttribute("data-preview-mode", mode);
      const cards = canvas.locator('[data-price-metrics] [data-slot="card"]');
      await expect(cards.nth(1).locator("dd")).toHaveText("$240.00");
      for (const card of await cards.all()) {
        expect(await card.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await canvas.screenshot({ path: info.outputPath(`sculptural-${preset}-${mode}.png`), animations: "disabled" });
    }
  }
});
