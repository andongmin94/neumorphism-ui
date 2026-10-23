import { expect, test } from "@playwright/test";

const pageSlugs = ["design-tokens", "registry", "resources", "accessibility", "verification", "credits"] as const;
const localizedEvidence = {
  en: { keyboard: "Keyboard and focus", bodies: ["Components consume them instead of hard-coded palette values.", "Its presence does not imply directory submission or approval.", "See Verification & release", "Visible focus rings are retained", "Only three Chromium smoke scenarios", "Each package retains its own license"] },
  ko: { keyboard: "키보드와 포커스", bodies: ["고정 색상 대신 이 토큰을 참조합니다.", "디렉터리 제출이나 승인이 완료된 것은 아닙니다.", "소비자·브라우저 검사", "포커스 표시를 제거하지 않습니다.", "Chromium 핵심 시나리오 세 개", "각 패키지는 자체 라이선스"] },
  ja: { keyboard: "キーボードとフォーカス", bodies: ["固定色の代わりにこのトークンを参照します。", "ディレクトリへの申請や承認を意味しません。", "利用側・ブラウザの検査", "フォーカス表示を削除しません。", "Chromiumの主要シナリオ三つ", "各パッケージはそれぞれのライセンス"] },
  zh: { keyboard: "键盘与焦点", bodies: ["而不是硬编码颜色。", "不代表已经提交目录或获得批准。", "使用方与浏览器检查", "移除可见焦点指示", "三个Chromium核心场景", "每个包保留自身的许可证"] },
} as const;

for (const [locale, copy] of Object.entries(localizedEvidence)) {
  test(`${locale}: reference bodies, section links and local-language search`, async ({ page }) => {
    for (const [index, slug] of pageSlugs.entries()) {
      await page.goto(`/${locale}/docs/${slug}`);
      const article = page.locator(".docs-reference-article");
      await expect(article).toContainText(copy.bodies[index]);
      const sections = article.locator(":scope > section");
      expect(await sections.count()).toBeGreaterThan(1);
      for (const section of await sections.all()) {
        const id = await section.getAttribute("id");
        expect(id).toBeTruthy();
        const label = await section.locator(":scope > h2").innerText();
        await expect(page.locator(`.docs-toc a[href="#${id}"]`)).toHaveText(label);
        await expect(article.locator(`.component-doc-quicknav a[href="#${id}"]`)).toHaveText(label);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }

    await expect(page.locator("[data-github-repository]")).toHaveAttribute("data-state", /^(ready|unavailable)$/);
    await page.locator(".docs-search-trigger").click();
    const dialog = page.locator(".docs-search-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("[data-slot=command-input]").fill(copy.keyboard);
    const sectionResult = dialog.locator(`[data-href="/${locale}/docs/accessibility#keyboard"]`);
    await expect(sectionResult).toBeVisible();
    await sectionResult.click();
    await expect(page).toHaveURL(url => url.pathname === `/${locale}/docs/accessibility` && url.hash === "#keyboard");
    await expect(page.locator("#keyboard > h2")).toHaveText(copy.keyboard);
    await expect.poll(async () => {
      const heading = (await page.locator("#keyboard > h2").boundingBox())!;
      const header = (await page.locator(".site-header").boundingBox())!;
      return heading.y - header.y - header.height;
    }).toBeGreaterThanOrEqual(0);

    const catalogHref = `/${locale}/components`;
    await expect(page.locator(`.docs-site-sidebar .docs-nav-group:nth-child(2) a[href="${catalogHref}"]`)).toHaveCount(1);
    await page.goto(catalogHref);
    await expect(page.locator(`.primary-nav a[href="/${locale}/docs"]`)).toHaveAttribute("aria-current", "page");
  });
}

test("verification distinguishes default, comprehensive and deployed checks", async ({ page }) => {
  await page.goto("/en/docs/verification");
  await expect(page.locator("#default")).toContainText("consumer:verify --smoke");
  await expect(page.locator("#default")).toContainText("dependency audit findings block CI");
  await expect(page.locator("#comprehensive")).toContainText("manually run Verify with comprehensive enabled");
  await expect(page.locator("#comprehensive")).toContainText("Firefox/WebKit");
  await expect(page.locator("#deployed")).toContainText("three Chromium smoke scenarios and three representative registry endpoints");
});
