import { expect, test, type Page } from "@playwright/test";

const locales = {
  en: { home: "Neumorphic UI for React", showcase: "Workspace settings", save: "Save workspace", reset: "Reset", dirty: "Unsaved changes", saved: "Saved for this page view. Nothing was sent.", templates: "Templates", headings: ["Account settings", "Task records", "Posts"] },
  ko: { home: "React용 뉴모피즘 UI", showcase: "작업 공간 설정", save: "작업 공간 저장", reset: "되돌리기", dirty: "저장하지 않은 변경 사항", saved: "현재 페이지에 저장했습니다. 서버로 전송하지 않았습니다.", templates: "템플릿", headings: ["계정 설정", "작업 목록", "글 관리"] },
  ja: { home: "React向けニューモーフィズムUI", showcase: "ワークスペース設定", save: "保存する", reset: "元に戻す", dirty: "未保存の変更", saved: "このページに保存しました。送信はしていません。", templates: "テンプレート", headings: ["アカウント設定", "タスク一覧", "記事管理"] },
  zh: { home: "React 新拟态 UI 组件", showcase: "工作空间设置", save: "保存工作空间", reset: "重置", dirty: "有未保存的更改", saved: "已保存在当前页面，没有发送任何数据。", templates: "模板", headings: ["账户设置", "任务列表", "文章管理"] },
};
const workspaces = [
  { slug: "settings", slot: "settings-panel" },
  { slug: "data-manager", slot: "data-manager" },
  { slug: "cms", slot: "cms-workspace" },
];

const headings = {
  en: ["Components", "Theme Studio", "Charts"],
  ko: ["컴포넌트", "테마 설정", "차트"],
  ja: ["コンポーネント", "テーマ設定", "チャート"],
  zh: ["组件", "主题设置", "图表"],
};

async function fits(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}

for (const [locale, copy] of Object.entries(locales)) {
  test(`task-first home keeps editable controls and honest feedback: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.home);
    const sample = page.locator("[data-home-showcase]");
    await expect(sample.getByRole("heading", { level: 2 })).toHaveText(copy.showcase);
    await expect(sample.locator('[data-slot="card"]')).toHaveCount(1);
    await expect(sample.locator('[data-slot="badge"]')).toHaveCount(0);
    await expect(sample.getByRole("status")).toBeVisible();
    for (const width of [info.project.use.viewport!.width, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await fits(page);
      await page.screenshot({ path: info.outputPath(`home-${width}.png`) });
    }
    // These are the real locally editable controls, not a static marketing mockup.
    const field = sample.getByRole("textbox");
    const save = sample.getByRole("button", { name: copy.save, exact: true });
    const reset = sample.getByRole("button", { name: copy.reset, exact: true });
    await field.fill("Project settings");
    await expect(sample.getByRole("status")).toHaveText(copy.dirty);
    await save.click();
    await expect(sample.getByRole("status")).toHaveText(copy.saved);
    await field.fill("Not saved");
    await reset.click();
    await expect(field).toHaveValue("Project settings");
    await field.fill("   ");
    await save.click();
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toBeFocused();
    await expect(sample.getByRole("alert")).toBeVisible();
    await field.fill("Recovered");
    await save.click();
    await expect(sample.getByRole("alert")).toHaveCount(0);
    await expect(sample.getByRole("status")).toHaveText(copy.saved);
    expect(errors).toEqual([]);
  });

  test(`task headings and demo controls have separate owners: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const [index, workspace] of workspaces.entries()) {
      await page.setViewportSize(info.project.use.viewport!);
      await page.goto(`/${locale}/templates/${workspace.slug}`);
      await page.evaluate(() => document.fonts.ready);
      const root = page.locator(`[data-slot="${workspace.slot}"]`);
      const note = page.locator("[data-demo-controls]");
      await expect(root.locator("header").first().getByRole("heading", { level: 2 })).toHaveText(copy.headings[index]);
      await expect(note).toHaveCount(1);
      await expect(root.locator("[data-demo-controls]")).toHaveCount(0);
      expect(await root.evaluate(element => Boolean(element.compareDocumentPosition(document.querySelector("[data-demo-controls]")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
      await expect(page.locator(".docs-page-header > p")).toContainText(/reload|새로고침|再読み込み|刷新/);
      for (const width of [info.project.use.viewport!.width, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await fits(page);
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: info.outputPath(`${workspace.slug}-${width}-top.png`) });
        await root.screenshot({ path: info.outputPath(`${workspace.slug}-${width}-workspace.png`) });
      }
      // The diagnostic control moved, but is not hidden or disabled to improve screenshots.
      const failure = note.getByRole("checkbox");
      await failure.check();
      await expect(failure).toBeChecked();
      await failure.uncheck();
      await expect(failure).not.toBeChecked();
    }
    expect(errors).toEqual([]);
  });

  test(`directory keeps destinations without redundant source labels: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/components`);
    await page.evaluate(() => document.fonts.ready);
    const first = page.locator(".component-directory-card").first();
    await expect(first.locator("code")).toHaveCount(1);
    await expect(first.locator("code")).toContainText("@neumorphism-ui/");
    await expect(page.locator(".component-directory-results-head").getByRole("link")).toHaveAccessibleName(copy.templates);
    await page.locator(".component-directory-results-head").scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath("directory.png") });
    await page.setViewportSize({ width: 320, height: 1000 });
    await fits(page);
    const href = await first.getAttribute("href");
    await first.focus();
    await expect(first).toHaveCSS("outline-width", "2px");
    await first.press("Enter");
    await expect(page).toHaveURL(url => url.pathname === href);
  });
}

// Titles identify destinations; the interactive demos and source panels remain below.
for (const [locale, titles] of Object.entries(headings)) {
  test(`section headers name their actual destination: ${locale}`, async ({ page }, info) => {
    for (const [index, path] of ["components", "customize", "charts"].entries()) {
      await page.goto(`/${locale}/${path}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(titles[index]);
      await fits(page);
      await page.screenshot({ path: info.outputPath(`${path}-top.png`) });
    }
  });
}
