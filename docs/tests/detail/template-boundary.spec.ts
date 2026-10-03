import { expect, test } from "@playwright/test";

const previews = { en: "Template preview", ko: "템플릿 미리보기", ja: "テンプレートのプレビュー", zh: "模板预览" };
const slugs = ["dashboard", "settings", "data-manager", "link-hub", "portfolio", "blog", "blog-post", "cms"];
for (const [locale, label] of Object.entries(previews)) {
  test(`template boundaries separate examples from documentation: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    if (info.project.use.isMobile) await page.setViewportSize({ width: 320, height: 900 });
    for (const slug of slugs) {
      await page.goto(`/${locale}/templates/${slug}`);
      await page.evaluate(() => document.fonts.ready);
      const frame = page.locator("[data-template-frame]");
      await expect(frame).toHaveCount(1);
      await expect(page.locator(".docs-page-header")).toHaveCSS("border-bottom-width", "0px");
      await expect(frame.getByRole("heading", { name: label, exact: true })).toBeVisible();
      await expect(frame).toHaveCSS("border-width", "1px");
      await expect(frame).toHaveCSS("box-shadow", "none");
      await expect(frame).toHaveCSS("overflow", "visible");
      await expect(frame.locator("[data-template-canvas] > [data-template]")).toHaveAttribute("data-template", slug);
      await expect(frame.locator("#installation, #installed-source")).toHaveCount(0);
      const code = frame.locator("[data-template-toolbar] code");
      await expect(code).toHaveText(`template-${slug === "dashboard" ? "analytics" : slug}`);
      const positions = await frame.evaluate(e => {
        const r = e.getBoundingClientRect(); const header = document.querySelector(".docs-page-header")!.getBoundingClientRect();
        const installation = document.querySelector("#installation")!.getBoundingClientRect();
        return { header: header.bottom <= r.top, after: r.bottom <= installation.top };
      });
      expect(positions).toEqual({ header: true, after: true });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({ path: info.outputPath(`${slug}-framed.png`) });
    }
    const nav = page.locator("[data-template-toolbar] nav");
    await nav.locator('a[href="#installed-source"]').focus();
    await expect(nav.locator('a[href="#installed-source"]')).toHaveCSS("outline-width", "2px");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#installed-source$/);
    expect(errors).toEqual([]);
  });
}
