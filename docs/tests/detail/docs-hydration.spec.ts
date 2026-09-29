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
