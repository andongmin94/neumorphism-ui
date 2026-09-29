import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`reference plates preserve physical hierarchy and real actions: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/customize`);
    await expect(page.locator("#theme-settings")).toHaveAttribute("aria-busy", "false");
    const dark = info.project.name.endsWith("dark");
    await page.locator(".theme-preview-mode").getByRole("button", { name: dark ? "Dark" : "Light", exact: true }).click();
    await page.evaluate(() => document.fonts.ready);
    const canvas = page.locator("[data-theme-price-preview]");
    const cards = canvas.locator("[data-price-metrics] [data-slot=card]");
    await expect(cards).toHaveCount(4);
    await expect(cards.nth(1)).toHaveAttribute("data-variant", "accent");
    for (const card of await cards.all()) {
      const metrics = await card.evaluate(element => {
        const style = getComputedStyle(element), rect = element.getBoundingClientRect();
        return { shadow: style.boxShadow, width: rect.width, height: rect.height, overflow: element.scrollWidth > element.clientWidth + 1 };
      });
      expect(metrics.shadow).not.toBe("none");
      expect(metrics.shadow).not.toContain("inset");
      expect(metrics.overflow).toBe(false);
      expect(metrics.height).toBeGreaterThanOrEqual(116);
    }
    const face = await cards.nth(1).evaluate(element => {
      const style = getComputedStyle(element), value = getComputedStyle(element.querySelector("dd")!);
      return { background: style.backgroundColor, expected: style.getPropertyValue("--primary").trim(), color: style.color, value: value.color, weight: value.fontWeight };
    });
    expect(face.color).toBe(face.value);
    expect(face.weight).toBe("800");
    const input = canvas.locator('input[type="number"]');
    const saved = await cards.nth(1).locator("dd").textContent();
    await input.fill("240");
    await expect(cards.nth(1).locator("dd")).toHaveText(saved!);
    await expect(input).toHaveCSS("box-shadow", /inset/);
    await canvas.screenshot({ path: info.outputPath("reference-ready-to-save.png") });
    await input.press("Enter");
    await expect(cards.nth(1).locator("dd")).toHaveText(new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(240));
    await expect(cards.nth(3).locator("dd")).toHaveText("78%");
    await canvas.screenshot({ path: info.outputPath("reference-saved.png") });
    await page.setViewportSize({ width: 320, height: 844 });
    for (const card of await cards.all()) {
      expect(await card.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      const value = await card.locator("dd").evaluate(element => {
        const style = getComputedStyle(element);
        return { height: element.getBoundingClientRect().height, lineHeight: parseFloat(style.lineHeight), fontSize: style.fontSize, text: element.textContent };
      });
      // Bounds alone did not detect a last fractional digit wrapping at 320px.
      expect(value.height, JSON.stringify(value)).toBeLessThanOrEqual(value.lineHeight + 1);
      const bounds = (await card.boundingBox())!;
      for (const child of await card.locator("dt, dd").all()) {
        const b = (await child.boundingBox())!;
        expect(b.x).toBeGreaterThanOrEqual(bounds.x);
        expect(b.x + b.width).toBeLessThanOrEqual(bounds.x + bounds.width + 1);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await canvas.screenshot({ path: info.outputPath("reference-320.png") });
  });
}
