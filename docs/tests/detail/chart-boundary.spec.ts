
import { expect, test } from "@playwright/test";
const pages = [
  { name: "dashboard", path: "/en/templates/dashboard" },
  { name: "chart", path: "/en/components/chart" },
  { name: "chart-gallery", path: "/en/charts" },
];
test.describe("server-rendered chart boundaries", () => {
  test.use({ javaScriptEnabled: false });
  for (const entry of pages) {
    test(`${entry.name} fits before scripts measure its container`, async ({ page }, info) => {
      const response = await page.goto(entry.path);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      const plots = page.locator('[data-slot="chart-plot"]');
      expect(await plots.count()).toBeGreaterThan(0);
      const metrics = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: innerWidth,
        plots: [...document.querySelectorAll('[data-slot="chart-plot"]')].map(element => {
          const box = element.getBoundingClientRect();
          return { x: box.x, width: box.width, height: box.height };
        }),
      }));
      await info.attach("pre-hydration-metrics", { body: JSON.stringify(metrics, null, 2), contentType: "application/json" });
      await plots.first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: info.outputPath(`${entry.name}-before-hydration.png`), animations: "disabled" });
      expect(metrics.width, "SSR must not impose a guessed 480px plot on a narrow screen").toBeLessThanOrEqual(page.viewportSize()!.width + 1);
      for (const plot of metrics.plots) expect(plot.height).toBe(256);
      const exactData = page.locator('[data-slot="chart"] > details').first();
      await exactData.locator("summary").click();
      await expect(exactData.locator("table")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    });
  }
});
for (const entry of pages) {
  test(`hydrated ${entry.name} keeps real chart and tooltip geometry`, async ({ page }, info) => {
    await page.goto(entry.path);
    await page.evaluate(() => document.fonts.ready);
    const plot = page.locator('[data-slot="chart-plot"]').first();
    const surface = plot.locator("svg.recharts-surface");
    await expect(surface).toBeVisible();
    for (const width of [page.viewportSize()!.width, 320, 820]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect.poll(async () => {
        const inner = await surface.boundingBox();
        const outer = await plot.boundingBox();
        return !!inner && !!outer && inner.width > 100 && Math.abs(inner.width - outer.width) <= 1;
      }, { message: "Recharts measures the actual plot width after resize" }).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      await expect(plot).toHaveCSS("overflow-x", "visible");
      await expect(plot).toHaveCSS("height", "256px");
    }
    await plot.scrollIntoViewIfNeeded();
    await surface.focus();
    await page.keyboard.press("ArrowRight");
    await expect(surface).toBeFocused();
    await page.screenshot({ path: info.outputPath(`${entry.name}-hydrated.png`), animations: "disabled" });
    const exactData = page.locator('[data-slot="chart"] > details').first();
    await exactData.locator("summary").click();
    await expect(exactData.locator("table")).toBeVisible();
  });
}
