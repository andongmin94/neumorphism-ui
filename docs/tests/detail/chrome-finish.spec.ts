import { expect, test } from "@playwright/test";

const labels = { en: "English", ko: "한국어", ja: "日本語", zh: "简体中文" };

for (const [locale, label] of Object.entries(labels)) {
  test(`documentation chrome has one material owner: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/components/hover-card`);
    await page.evaluate(() => document.fonts.ready);
    const example = page.locator(".component-example");
    await expect(example).toHaveAttribute("aria-busy", "false");
    const installation = page.locator(".component-installation");
    await expect(installation).toHaveAttribute("aria-busy", "false");
    const previewTab = example.getByRole("tab").first();
    const installTab = installation.getByRole("tab").first();
    const tabStyle = await previewTab.evaluate(e => {
      const s = getComputedStyle(e); return { background: s.backgroundColor, color: s.color, shadow: s.boxShadow };
    });
    await expect(installTab).toHaveCSS("background-color", tabStyle.background);
    await expect(installTab).toHaveCSS("color", tabStyle.color);
    await expect(installTab).toHaveCSS("box-shadow", tabStyle.shadow);
    await expect(installTab).toHaveCSS("font-size", "14px");
    await expect(installation.getByRole("tablist")).toHaveCSS("height", "44px");
    const meta = page.locator(".component-doc-meta");
    await expect(meta.locator("code")).toHaveText("@neumorphism-ui/hover-card");
    await expect(meta.locator("code")).toHaveCSS("text-transform", "none");
    for (const part of await meta.locator(":scope > *").all()) {
      await expect(part).toHaveCSS("font-size", "12px");
      await expect(part).toHaveCSS("line-height", "20px");
    }
    if (info.project.use.viewport!.width > 560) {
      const boxes = await meta.locator(":scope > *").evaluateAll(elements => elements.map(element => {
        const r = element.getBoundingClientRect(); return { center: r.y + r.height / 2, height: r.height };
      }));
      expect(Math.abs(boxes[0].center - boxes[1].center)).toBeLessThanOrEqual(1);
      expect(boxes[0].height).toBe(boxes[1].height);
      const current = page.locator('.docs-site-sidebar a[aria-current="page"]');
      await expect(current).toHaveCount(1);
      expect(await current.evaluate(element => getComputedStyle(element, "::before").content)).toBe("none");
      await expect(current).toHaveCSS("border-left-color", "rgba(0, 0, 0, 0)");
      await current.scrollIntoViewIfNeeded();
      await current.focus();
      await expect(current).toHaveCSS("outline-width", "2px");
      await page.locator("h1").click();
    }
    for (const selector of [".component-example", ".component-example-toolbar", ".component-example-panel"]) {
      await expect(page.locator(selector)).toHaveCSS("border-width", "0px");
      await expect(page.locator(selector)).toHaveCSS("box-shadow", "none");
      await expect(page.locator(selector)).toHaveCSS("overflow", "visible");
    }
    const selected = example.getByRole("tab").first();
    await expect(selected).toHaveAttribute("aria-selected", "true");
    expect(await selected.evaluate(element => getComputedStyle(element).boxShadow)).not.toBe("none");
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: info.outputPath("hover-card-page.png"), animations: "disabled" });
    // Controls retain their behavior; only documentation framing has changed.
    const trigger = example.locator(".component-example-panel a").first();
    await expect(trigger).toHaveAttribute("href", /.+/);
    if (!info.project.use.isMobile) {
      await trigger.hover();
      const popup = page.locator('[data-slot="hover-card-content"]');
      await expect(popup).toBeVisible();
      await popup.screenshot({ path: info.outputPath("hover-popup.png") });
      await page.mouse.move(0, 0);
      await expect(popup).toBeHidden();
    }
    await example.getByRole("tab").nth(1).click();
    await expect(example.locator("pre.shiki")).toBeVisible();
    await expect(example.locator(".code-shell")).toHaveCSS("background-color", "rgb(30, 30, 30)");
    await expect(example.locator("pre.shiki")).toContainText("HoverCard");
    await example.screenshot({ path: info.outputPath("code-panel.png") });
    await example.getByRole("tab").first().click();
    await expect(example.locator(".component-example-panel")).toBeVisible();

    const switcher = page.locator(".language-switcher");
    await switcher.locator("summary").focus();
    await switcher.locator("summary").press("Enter");
    const menu = switcher.getByRole("navigation");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(4);
    for (const item of await menu.getByRole("link").all()) {
      await expect(item).toHaveCSS("font-weight", "500");
      await expect(item).toHaveCSS("font-size", "14px");
      await expect(item).toHaveCSS("line-height", "20px");
      await expect(item).toHaveCSS("border-width", "0px");
      expect((await item.boundingBox())!.height).toBe(40);
    }
    await expect(menu.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(menu.locator('a[aria-current="page"] svg')).toHaveCSS("visibility", "visible");
    await expect(menu.locator('a:not([aria-current]) svg').first()).toHaveCSS("visibility", "hidden");
    await page.evaluate(() => document.fonts.ready);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const doc = await cdp.send("DOM.getDocument");
    const nodes = await cdp.send("DOM.querySelectorAll", { nodeId: doc.root.nodeId, selector: ".language-switcher nav a span" });
    const fonts = await Promise.all(nodes.nodeIds.map(nodeId => cdp.send("CSS.getPlatformFontsForNode", { nodeId })));
    await info.attach("language-fonts", { body: JSON.stringify(fonts, null, 2), contentType: "application/json" });
    for (const labelFonts of fonts) {
      expect(labelFonts.fonts.length).toBeGreaterThan(0);
      expect(labelFonts.fonts.every(font => font.isCustomFont)).toBe(true);
    }
    await cdp.detach();
    await menu.screenshot({ path: info.outputPath("language-menu.png"), animations: "disabled" });
    await page.setViewportSize({ width: 320, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const box = (await menu.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
    await page.screenshot({ path: info.outputPath("language-menu-320.png"), animations: "disabled" });
    const next = locale === "en" ? "ja" : "en";
    await menu.getByRole("link", { name: labels[next], exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(url => url.pathname === `/${next}/components/hover-card`);
    await expect(page.locator(".language-switcher summary")).toHaveText(next.toUpperCase());
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}
