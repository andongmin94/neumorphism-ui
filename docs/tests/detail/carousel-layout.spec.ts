import { expect, test, type Locator } from "@playwright/test";

const labels = {
  en: ["Dashboard", "Settings", "Analytics"],
  ko: ["대시보드", "설정", "분석"],
  ja: ["ダッシュボード", "設定", "分析"],
  zh: ["仪表盘", "设置", "分析"],
} as const;

for (const [locale, titles] of Object.entries(labels)) {
  test(`carousel shadow clearance and navigation: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/${locale}/components/carousel`);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    const carousel = page.locator('.component-example-panel [data-slot="carousel"]');
    const viewport = carousel.locator('[data-slot="carousel-content"]');
    const next = carousel.locator('[data-slot="carousel-next"]');
    const previous = carousel.locator('[data-slot="carousel-previous"]');
    await expect(next).toBeEnabled();
    await carousel.scrollIntoViewIfNeeded();
    await expect(viewport).toHaveCSS("overflow-x", "hidden");

    async function expectPlate(index: number) {
      const plate: Locator = carousel.locator('[data-slot="carousel-item"]').nth(index).locator("div").last();
      await expect(plate).toHaveText(titles[index]);
      expect(await plate.evaluate(e => getComputedStyle(e).boxShadow)).not.toBe("none");
      // Wait for the actual Embla snap. The viewport must still mask inactive slides.
      await expect.poll(async () => {
        const host = (await viewport.boundingBox())!;
        const face = (await plate.boundingBox())!;
        return Math.min(face.x - host.x, face.y - host.y,
          host.x + host.width - face.x - face.width,
          host.y + host.height - face.y - face.height);
      }).toBeGreaterThanOrEqual(7.5);
      expect(await page.evaluate(() => document.documentElement.scrollWidth))
        .toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    }

    await expect(previous).toBeDisabled();
    await expectPlate(0);
    await carousel.screenshot({ path: info.outputPath("carousel-first.png"), animations: "disabled" });
    await next.click();
    await expect(previous).toBeEnabled();
    await expectPlate(1);
    await next.focus();
    await page.keyboard.press("ArrowRight");
    await expect(next).toBeDisabled();
    await expectPlate(2);
    await carousel.screenshot({ path: info.outputPath("carousel-last.png"), animations: "disabled" });
    await previous.focus();
    await page.keyboard.press("ArrowLeft");
    await expectPlate(1);
    await previous.click();
    await expect(previous).toBeDisabled();
    await expectPlate(0);
    expect(errors).toEqual([]);
  });
}
