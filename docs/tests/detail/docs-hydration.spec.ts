import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`documentation tabs wait for their own hydration: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));

    // Hold the real scripts until static HTML has been inspected. No fixed sleeps,
    // response mocks, event replay, or weaker color assertions hide a lost click.
    let releaseScripts!: () => void;
    const scriptsReleased = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(url => url.pathname.endsWith(".js"), async route => {
      await scriptsReleased;
      await route.continue();
    });

    try {
      await page.goto(`/${locale}/components/button`, { waitUntil: "commit" });
      const preview = page.locator(".component-example");
      const installation = page.locator(".component-installation");
      for (const region of [preview, installation]) {
        await expect(region).toHaveAttribute("aria-busy", "true");
        const tabs = region.getByRole("tab");
        await expect(tabs).toHaveCount(2);
        await expect(tabs.nth(0)).toBeDisabled();
        await expect(tabs.nth(1)).toBeDisabled();
        await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
      }
      // Static content and Dark+ usage remain readable while scripts are delayed.
      await expect(page.locator("#usage pre.shiki").first()).toBeVisible();
      await expect(installation.locator("pre.shiki")).toBeVisible();
      await preview.screenshot({ path: info.outputPath("tabs-before-hydration.png") });

      releaseScripts();
      const codeTab = preview.getByRole("tab").nth(1);
      // A single ordinary click must wait for readiness and then actually select.
      await codeTab.click();
      await expect(preview).toHaveAttribute("aria-busy", "false");
      await expect(codeTab).toHaveAttribute("aria-selected", "true");
      const shell = preview.locator(".code-shell");
      await expect(shell.locator("pre.shiki")).toBeVisible();
      await expect(shell).toHaveCSS("background-color", "rgb(30, 30, 30)");
      expect(await shell.locator("pre.shiki span[style]").count()).toBeGreaterThan(1);
      await shell.screenshot({ path: info.outputPath("first-click-dark-plus.png") });

      // Tabs.List uses manual activation by default: focus movement is not selection.
      const previewTab = preview.getByRole("tab").nth(0);
      await codeTab.press("Home");
      await expect(previewTab).toBeFocused();
      await expect(codeTab).toHaveAttribute("aria-selected", "true");
      await previewTab.press("Enter");
      await expect(previewTab).toHaveAttribute("aria-selected", "true");
      await expect(preview.locator(".component-example-panel")).toBeVisible();
      await previewTab.press("End");
      await expect(codeTab).toBeFocused();
      await expect(previewTab).toHaveAttribute("aria-selected", "true");
      await codeTab.press("Space");
      await expect(codeTab).toHaveAttribute("aria-selected", "true");
      await expect(shell.locator("pre.shiki")).toBeVisible();

      const sourceTab = installation.getByRole("tab").nth(1);
      await sourceTab.click();
      await expect(installation).toHaveAttribute("aria-busy", "false");
      await expect(sourceTab).toHaveAttribute("aria-selected", "true");
      await expect(installation.locator(".component-source-file pre.shiki").last()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`mobile menu ignores pre-hydration taps and opens on its first enabled touch: ${locale}`, async ({ page }, info) => {
    test.skip(!info.project.name.startsWith("mobile"), "Mobile navigation only.");
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    let releaseScripts!: () => void;
    const scriptsReleased = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(url => url.pathname.endsWith(".js"), async route => {
      await scriptsReleased;
      await route.continue();
    });
    try {
      await page.goto(`/${locale}/components/button`, { waitUntil: "commit" });
      const trigger = page.locator(".mobile-nav-trigger");
      await expect(trigger).toBeVisible();
      await expect(trigger).toBeDisabled();
      // A visible but still-static button cannot silently absorb the first tap.
      const firstBox = await trigger.boundingBox();
      expect(firstBox).not.toBeNull();
      await page.touchscreen.tap(firstBox!.x + firstBox!.width / 2, firstBox!.y + firstBox!.height / 2);
      await expect(page.locator("#mobile-docs-navigation")).toHaveCount(0);
      await page.screenshot({ path: info.outputPath("mobile-nav-before-hydration.png"), animations: "disabled" });
      releaseScripts();
      await expect(trigger).toBeEnabled({ timeout: 20_000 });
      const box = await trigger.boundingBox();
      expect(box).not.toBeNull();
      await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2);
      const dialog = page.locator("#mobile-docs-navigation");
      await expect(dialog).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await dialog.screenshot({ path: info.outputPath("mobile-nav-first-touch.png"), animations: "disabled" });
      await dialog.locator(".mobile-nav-close").click();
      await expect(dialog).toBeHidden();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      // Repeat real taps at the narrowest supported width without retrying failed clicks.
      await page.setViewportSize({ width: 320, height: 844 });
      for (let attempt = 0; attempt < 3; attempt++) {
        await expect(trigger).toBeEnabled();
        const nextBox = await trigger.boundingBox();
        expect(nextBox).not.toBeNull();
        await page.touchscreen.tap(nextBox!.x + nextBox!.width / 2, nextBox!.y + nextBox!.height / 2);
        await expect(dialog).toBeVisible();
        await dialog.locator(".mobile-nav-close").click();
        await expect(dialog).toBeHidden();
      }
      expect(errors).toEqual([]);
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

const blogFilters = {
  en: { topic: "Engineering", search: "Search posts", query: "Return keyboard focus after closing a dialog" },
  ko: { topic: "개발", search: "글 검색", query: "대화상자를 닫은 뒤 키보드 포커스 돌려주기" },
  ja: { topic: "開発", search: "記事を検索", query: "ダイアログを閉じた後にフォーカスを戻す" },
  zh: { topic: "开发", search: "搜索文章", query: "关闭对话框后恢复键盘焦点" },
} as const;

for (const [locale, labels] of Object.entries(blogFilters)) {
  test(`blog filters only accept the first touch after hydration: ${locale}`, async ({ page }, info) => {
    let releaseScripts!: () => void;
    const scriptsReleased = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(url => url.pathname.endsWith(".js"), async route => {
      await scriptsReleased;
      await route.continue();
    });
    try {
      await page.goto(`/${locale}/templates/blog`, { waitUntil: "commit" });
      const blog = page.locator('[data-slot="blog"]');
      const controls = blog.locator('section[aria-busy]');
      const search = blog.getByRole("searchbox", { name: labels.search });
      const topic = blog.getByRole("button", { name: labels.topic, exact: true });
      const sort = blog.locator('[data-slot="select"]');
      await expect(blog.locator("article")).toHaveCount(3);
      await expect(controls).toHaveAttribute("aria-busy", "true");
      await expect(search).toBeDisabled();
      await expect(topic).toBeDisabled();
      await expect(sort).toBeDisabled();
      await page.screenshot({ path: info.outputPath("blog-static-before-hydration.png"), animations: "disabled" });

      releaseScripts();
      await expect(controls).toHaveAttribute("aria-busy", "false", { timeout: 20_000 });
      await expect(search).toBeEnabled();
      await expect(topic).toBeEnabled();
      await expect(sort).toBeEnabled();
      // One real interaction must update both pressed state and the result set.
      if (info.project.use.isMobile) {
        const bounds = await topic.boundingBox();
        expect(bounds).not.toBeNull();
        await page.touchscreen.tap(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
      } else {
        await topic.click();
      }
      await expect(topic).toHaveAttribute("aria-pressed", "true");
      await expect(blog.locator("article")).toHaveCount(1);
      await search.fill(labels.query);
      await expect(search).toHaveValue(labels.query);
      await expect(blog.locator("article")).toHaveCount(1);
      await page.screenshot({ path: info.outputPath("blog-filtered-after-hydration.png"), animations: "disabled" });
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}
