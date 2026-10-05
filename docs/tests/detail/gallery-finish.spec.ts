import { expect, test } from "@playwright/test";

const labels = {
  en: { open: "View template", count: "8 templates" },
  ko: { open: "템플릿 보기", count: "템플릿 8개" },
  ja: { open: "テンプレートを見る", count: "8件のテンプレート" },
  zh: { open: "查看模板", count: "8个模板" },
};

for (const [locale, copy] of Object.entries(labels)) {
  test(`gallery has readable references and width-fitted previews: ${locale}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const width of [...new Set([info.project.use.viewport!.width, 768, 320])]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}/templates`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".template-gallery-header > span")).toHaveText(copy.count);
      await expect(page.locator(".template-card")).toHaveCount(8);
      await expect(page.locator(".template-tags, .template-card-arrow, .template-card-heading > div > span")).toHaveCount(0);
      const cards = page.locator(".template-card");
      for (const card of await cards.all()) {
        const thumbnail = card.locator(".template-card-preview");
        await expect(thumbnail).toHaveAttribute("inert", "");
        await expect(thumbnail).toHaveAttribute("aria-hidden", "true");
        await expect(card.getByRole("link")).toHaveCount(1);
        await expect(card.getByRole("link")).toContainText(copy.open);
        await expect(card.getByRole("link")).toHaveCSS("box-shadow", "none");
        await expect(card.locator(".template-card-heading h2")).toHaveCSS("font-weight", "700");
        await expect(card.locator(".template-card-preview")).toHaveCSS("border-bottom-width", "1px");
        const geometry = await card.evaluate(e => {
          const stage = e.querySelector(".template-preview-stage")!.getBoundingClientRect();
          const scaled = e.querySelector(".template-preview-scale")!.getBoundingClientRect();
          const body = e.querySelector(".template-card-body")!;
          const code = body.querySelector("code")!;
          const range = document.createRange(); range.selectNodeContents(code);
          const text = range.getBoundingClientRect(), bounds = code.getBoundingClientRect();
          return { left: scaled.left-stage.left, right: stage.right-scaled.right,
            codeExcess: code.scrollWidth-code.clientWidth,
            textLeft: text.left-bounds.left, textRight: bounds.right-text.right,
            previewExcess: e.querySelector(".template-preview-scale")!.scrollWidth-e.querySelector(".template-preview-scale")!.clientWidth,
            bodyExcess: body.scrollWidth-body.clientWidth };
        });
        expect(Math.abs(geometry.left)).toBeLessThanOrEqual(1);
        expect(Math.abs(geometry.right)).toBeLessThanOrEqual(1);
        expect(geometry.previewExcess).toBeLessThanOrEqual(1);
        expect(geometry.codeExcess).toBeLessThanOrEqual(1); expect(geometry.bodyExcess).toBeLessThanOrEqual(1);
        expect(geometry.textLeft).toBeGreaterThanOrEqual(-1); expect(geometry.textRight).toBeGreaterThanOrEqual(-1);
      }
      const row = await cards.evaluateAll(elements => elements.map(e => {
        const r = e.getBoundingClientRect(); const a = e.querySelector(".template-card-link")!.getBoundingClientRect();
        return { top: r.top, bottom: a.bottom };
      }));
      for (let i=1;i<row.length;i++) if (Math.abs(row[i].top-row[i-1].top)<1) {
        expect(Math.abs(row[i].bottom-row[i-1].bottom)).toBeLessThanOrEqual(1);
      }
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({ path: info.outputPath(`gallery-${width}.png`) });
      await cards.nth(1).screenshot({ path: info.outputPath(`settings-card-${width}.png`) });
    }
    // The literal reference points to the shipped item, not an invented badge.
    for (const card of await page.locator(".template-card").all()) {
      const reference = (await card.locator(".template-card-body code").innerText()).replace("@neumorphism-ui/", "");
      const response = await page.request.get(`/r/${reference}.json`);
      expect(response.status()).toBe(200); expect((await response.json()).name).toBe(reference);
    }
    const link = page.locator(".template-card-link").first();
    await link.focus(); await expect(link).toHaveCSS("outline-width", "2px");
    await link.press("Enter");
    await expect(page).toHaveURL(url => url.pathname === `/${locale}/templates/dashboard`);
    await expect(page.locator("[data-template-frame]")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test(`grouped selection is visible in the real documentation: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/components/toggle-group`);
    const example = page.locator(".component-example");
    await expect(example).toHaveAttribute("aria-busy", "false");
    const group = example.locator('[data-slot="toggle-group"]');
    const buttons = group.getByRole("button");
    const first = buttons.first(), next = buttons.nth(1);
    await expect(first).toHaveAttribute("aria-pressed", "true");
    const active = await first.evaluate(e => ({background:getComputedStyle(e).backgroundColor, color:getComputedStyle(e).color}));
    expect(active.background).not.toBe(await next.evaluate(e => getComputedStyle(e).backgroundColor));
    await next.click(); await expect(next).toHaveAttribute("aria-pressed", "true");
    await expect(next).toHaveCSS("background-color", active.background);
    await expect(next).toHaveCSS("color", active.color);
    await first.click();
    await page.evaluate(() => document.fonts.ready);
    await example.locator(".component-example-panel").screenshot({path:info.outputPath("toggle-group.png")});
    await example.getByRole("tab").nth(1).click();
    await expect(example.locator("pre.shiki")).toContainText("ToggleGroup");
    await expect(example.locator(".code-shell")).toHaveCSS("background-color", "rgb(30, 30, 30)");
  });
}
