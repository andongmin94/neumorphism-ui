import { expect, test } from "@playwright/test";

for (const width of [320, 390, 1440]) for (const mode of ["light", "dark"]) {
  test(`editorial source without documentation CSS: ${width} ${mode}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const locale of ["en", "ko", "ja", "zh"]) {
      await page.goto(`/editorial.html?locale=${locale}&mode=${mode}`);
      await page.evaluate(() => document.fonts.ready);
      const portfolio = page.locator('[data-slot="portfolio"]');
      const project = portfolio.locator("details").first();
      const summary = project.locator("summary");
      await expect(summary.locator("svg")).toHaveCSS("width", "16px");
      await summary.focus();
      expect(await summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBeGreaterThan(0);
      await summary.press("Enter");
      await expect(project).toHaveAttribute("open", "");
      await expect(project.locator("dd")).toHaveCount(4);
      await expect.poll(() => summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBe(0);
      await expect(summary).toHaveCSS("box-shadow", /inset/);
      for (const element of await project.locator("summary, dd").all()) {
        expect(await element.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      }
      await project.screenshot({ path: info.outputPath(`project-${locale}.png`) });
      await summary.press("Space");
      await expect(project).not.toHaveAttribute("open");
      await expect.poll(() => summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBeGreaterThan(0);
      await expect(summary).toBeFocused();
      const lead = page.locator('[data-slot="blog-post-lead"]');
      await expect(lead).toHaveCSS("box-shadow", "none");
      await expect(lead).toHaveCSS("padding-left", "0px");
      await expect(lead).toHaveCSS("border-top-width", "0px");
      await page.locator('[data-slot="blog-post"]').screenshot({ path: info.outputPath(`article-${locale}.png`) });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
