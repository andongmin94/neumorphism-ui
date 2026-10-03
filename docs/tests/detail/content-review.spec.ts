import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { chartGalleryCopy } from "../../i18n/chart-gallery-copy";

const content = {
  en: { project: "Dispatch queue", article: "Keep a draft after a failed save", section: "Separate the draft from the saved copy", blog: "Return keyboard focus after closing a dialog", topic: "Engineering", search: "Search posts", cms: "September editor update", title: "Title", save: "Save", saved: "Saved.", fail: "Fail the next save", separator: "Component documentation" },
  ko: { project: "배차 대기 목록", article: "저장에 실패해도 초안은 유지하기", section: "초안과 저장된 사본 구분하기", blog: "대화상자를 닫은 뒤 키보드 포커스 돌려주기", topic: "개발", search: "글 검색", cms: "9월 편집기 업데이트", title: "제목", save: "저장", saved: "저장했습니다.", fail: "다음 저장 실패 재현", separator: "컴포넌트 문서" },
  ja: { project: "配車待ち一覧", article: "保存に失敗しても下書きを残す", section: "下書きと保存済みの内容を分ける", blog: "ダイアログを閉じた後にフォーカスを戻す", topic: "開発", search: "記事を検索", cms: "9月の編集機能アップデート", title: "タイトル", save: "保存", saved: "保存しました。", fail: "次の保存を失敗させる", separator: "コンポーネントの説明" },
  zh: { project: "配送调度列表", article: "保存失败后保留草稿", section: "区分草稿与已保存的副本", blog: "关闭对话框后恢复键盘焦点", topic: "开发", search: "搜索文章", cms: "九月编辑器更新", title: "标题", save: "保存", saved: "已保存。", fail: "模拟下次保存失败", separator: "组件文档" },
} as const;

async function fits(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}

for (const locale of ["en", "ko", "ja", "zh"] as const) {
  const t = content[locale];
  test(`editorial reading and native project disclosure: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/templates/portfolio`);
    await page.evaluate(() => document.fonts.ready);
    const project = page.locator('[data-slot="portfolio"] details').first();
    const summary = project.locator("summary");
    await expect(summary).toContainText(t.project);
    await expect(summary.locator("svg")).toHaveAttribute("aria-hidden", "true");
    await expect(summary.locator("svg")).toHaveCSS("width", "16px");
    await page.keyboard.press("Tab");
    await summary.focus();
    await expect(summary).toBeFocused();
    await expect(summary).toHaveCSS("box-shadow", /inset/);
    expect(await summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBeGreaterThan(0);
    await summary.press("Enter");
    await expect(project).toHaveAttribute("open", "");
    await expect(project.locator("dd")).toHaveCount(4);
    await expect.poll(() => summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBe(0);
    await project.screenshot({ path: info.outputPath("project-open.png") });
    await summary.press("Space");
    await expect(project).not.toHaveAttribute("open");
    await expect.poll(() => summary.locator("svg path").last().evaluate(e => e.getBoundingClientRect().height)).toBeGreaterThan(0);
    await expect(summary).toBeFocused();
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); scrollTo(0, 0); });
    await page.screenshot({ path: info.outputPath("portfolio-top.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await fits(page);
    await summary.click();
    await project.screenshot({ path: info.outputPath("project-320.png") });

    await page.setViewportSize(info.project.use.viewport!);
    await page.goto(`/${locale}/templates/blog-post`);
    const article = page.locator('[data-slot="blog-post"]');
    await expect(article.getByRole("heading", { name: t.article, exact: true })).toBeVisible();
    await expect(article.getByRole("heading", { name: t.section, exact: true })).toBeVisible();
    const lead = article.locator('[data-slot="blog-post-lead"]');
    await expect(lead).toHaveCSS("box-shadow", "none");
    await expect(lead).toHaveCSS("padding-left", "0px");
    await expect(lead).toHaveCSS("border-top-width", "0px");
    await expect(article.locator("li")).toHaveCount(3);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath("article-top.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await fits(page);
    await article.screenshot({ path: info.outputPath("article-320.png") });
    expect(errors).toEqual([]);
  });

  test(`localized example posts keep filter and failed-save recovery: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/templates/blog`);
    const blog = page.locator('[data-slot="blog"]');
    await expect(blog.locator("article")).toHaveCount(3);
    await blog.getByRole("button", { name: t.topic, exact: true }).click();
    await blog.getByRole("searchbox", { name: t.search }).fill(t.blog);
    await expect(blog.locator("article")).toHaveCount(1);
    await expect(blog.getByRole("link", { name: t.blog, exact: true })).toBeVisible();
    await page.screenshot({ path: info.outputPath("blog-filtered.png") });
    await page.goto(`/${locale}/templates/cms`);
    const cms = page.locator('[data-template="cms"]');
    const title = cms.getByLabel(t.title, { exact: true });
    await expect(title).toHaveValue(t.cms);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath("cms-top.png") });
    await cms.getByRole("checkbox", { name: t.fail, exact: true }).check();
    await title.fill(t.cms + " 2");
    await cms.getByRole("button", { name: t.save, exact: true }).click();
    await expect(cms.getByRole("alert")).toBeVisible();
    await expect(title).toHaveValue(t.cms + " 2");
    await cms.getByRole("button", { name: t.save, exact: true }).click();
    await expect(cms.getByRole("status")).toHaveText(t.saved);
    await page.setViewportSize({ width: 320, height: 1000 });
    await fits(page);
    await cms.screenshot({ path: info.outputPath("cms-320.png") });
  });

  test(`chart section links, type hierarchy and installed source: ${locale}`, async ({ page, context }, info) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const copy = chartGalleryCopy[locale];
    await page.goto(`/${locale}/charts`);
    await page.evaluate(() => document.fonts.ready);
    const navigation = page.getByRole("navigation", { name: copy.contents, exact: true });
    await expect(navigation.getByRole("link")).toHaveCount(3);
    await page.screenshot({ path: info.outputPath("charts-top.png") });
    for (const [index, id] of ["chart-product", "chart-operations", "chart-installation"].entries()) {
      const link = navigation.getByRole("link").nth(index);
      await link.focus();
      await expect(link).toHaveCSS("outline-width", "2px");
      await link.press("Enter");
      await expect(page).toHaveURL(url => url.hash === `#${id}`);
      const heading = page.locator(`#${id} h2`).first();
      await expect(heading).toHaveCSS("font-weight", "700");
      const box = (await heading.boundingBox())!;
      const header = (await page.locator(".site-header").boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(header.y + header.height);
      expect(box.y).toBeLessThan(page.viewportSize()!.height);
    }
    const cards = page.locator(".chart-reference-card");
    await expect(cards).toHaveCount(8);
    await expect(cards.nth(3).locator("h3")).toHaveText(copy.recipes.build.title);
    await expect(cards.nth(7).locator("h3")).toHaveText(copy.recipes.install.title);
    await expect(cards.first().locator("p").first()).toHaveText(copy.recipes.revenue.description);
    await cards.first().locator("details").last().locator("summary").click();
    const shell = cards.first().locator("details").last().locator(".code-shell").first();
    const source = JSON.parse(readFileSync(new URL("../../../registry/public/r/chart-revenue.json", import.meta.url), "utf8"));
    await expect(shell.locator("pre.shiki")).toBeVisible();
    await expect(shell).toHaveCSS("background-color", "rgb(30, 30, 30)");
    await shell.locator(".copy-button").click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source.files[0].content);
    await cards.first().screenshot({ path: info.outputPath("chart-source.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await fits(page);
    await navigation.scrollIntoViewIfNeeded();
    await navigation.screenshot({ path: info.outputPath("chart-nav-320.png") });
    for (const link of await navigation.getByRole("link").all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await page.goto(`/${locale}/components/separator`);
    const preview = page.locator("#preview");
    await expect(preview.locator("strong")).toHaveText(t.separator);
    await expect(preview.getByRole("link")).toHaveCount(3);
    await preview.screenshot({ path: info.outputPath("separator-320.png") });
  });
}
