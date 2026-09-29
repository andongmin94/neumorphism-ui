import { expect, test } from "@playwright/test";

const workspaces = [
  { slug: "dashboard", root: "analytics-dashboard", count: 4, accent: "revenue" },
  { slug: "data-manager", root: "data-manager", count: 3, accent: "active" },
  { slug: "cms", root: "cms-workspace", count: 3, accent: "published" },
];

for (const locale of ["en", "ko", "ja", "zh"]) {
  for (const workspace of workspaces) {
    test(`workspace plates: ${workspace.slug} ${locale}`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`/${locale}/templates/${workspace.slug}`);
      await page.evaluate(() => document.fonts.ready);
      const root = page.locator(`[data-slot="${workspace.root}"]`);
      const group = root.locator('[data-slot="workspace-metrics"]');
      const cards = group.locator('[data-slot="card"]');
      await expect(cards).toHaveCount(workspace.count);
      await expect(group.locator('[data-variant="accent"]')).toHaveCount(1);
      await expect(group.locator('[data-variant="accent"] [data-metric]')).toHaveAttribute('data-metric', workspace.accent);
      const initialValues = await group.locator('dd').allTextContents();
      for (const width of [info.project.use.viewport!.width, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const card of await cards.all()) {
          const metrics = await card.evaluate(element => {
            const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
            const dt = element.querySelector('dt')!, dd = element.querySelector('dd')!;
            const d = dd.getBoundingClientRect(), t = dt.getBoundingClientRect();
            const textStyle = getComputedStyle(dd);
            return { shadow: style.boxShadow, width: rect.width, height: rect.height,
              overflow: element.scrollWidth > element.clientWidth + 1,
              label: { left: t.left - rect.left, right: rect.right - t.right, top: t.top },
              value: { left: d.left - rect.left, right: rect.right - d.right, bottom: d.bottom,
                height: d.height, lineHeight: parseFloat(textStyle.lineHeight), weight: textStyle.fontWeight },
              foreground: style.color, labelColor: getComputedStyle(dt).color, valueColor: textStyle.color,
              accent: element.getAttribute('data-variant') === 'accent' };
          });
          expect(metrics.shadow).not.toBe('none');
          expect(metrics.shadow).not.toContain('inset');
          expect(metrics.overflow).toBe(false);
          expect(metrics.height).toBeGreaterThanOrEqual(116);
          expect(metrics.value.weight).toBe('800');
          expect(metrics.value.bottom).toBeLessThanOrEqual(metrics.label.top);
          expect(metrics.value.height).toBeLessThanOrEqual(metrics.value.lineHeight + 1);
          for (const bound of [metrics.value.left, metrics.value.right, metrics.label.left, metrics.label.right]) expect(bound).toBeGreaterThanOrEqual(-1);
          if (metrics.accent) {
            expect(metrics.valueColor).toBe(metrics.foreground);
            expect(metrics.labelColor).toBe(metrics.foreground);
          }
        }
        const positions = await cards.evaluateAll(elements => elements.map(element => ({
          top: element.getBoundingClientRect().top,
          bottom: element.querySelector('dd')!.getBoundingClientRect().bottom,
        })));
        for (const a of positions) for (const b of positions) {
          if (Math.abs(a.top - b.top) < 1) expect(Math.abs(a.bottom - b.bottom)).toBeLessThanOrEqual(1);
        }
        await expect(group.locator('dd')).toHaveText(initialValues);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        await group.screenshot({ path: info.outputPath(`metrics-${width}.png`) });
        await root.screenshot({ path: info.outputPath(`workspace-${width}.png`) });
      }
      expect(errors).toEqual([]);
    });
  }

  test(`directory hierarchy: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/components`);
    await page.evaluate(() => document.fonts.ready);
    const cards = page.locator('.component-directory-card');
    const first = cards.first();
    await expect(first).toBeVisible();
    await expect(first.locator('h3')).toHaveCSS('font-size', '20px');
    await expect(first.locator('code').first()).toHaveCSS('box-shadow', 'none');
    const footer = first.locator('code').last();
    await expect(footer).toHaveCSS('white-space', 'normal');
    await expect(footer).toHaveCSS('text-overflow', 'clip');
    await page.mouse.move(0, 0);
    const idle = await first.evaluate(e => getComputedStyle(e).boxShadow);
    await first.hover();
    await expect(first).toHaveCSS('box-shadow', idle);
    await page.mouse.move(0, 0);
    await first.screenshot({ path: info.outputPath('directory-card.png') });
    await page.locator('.component-directory-results-head').scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath('directory.png') });
    await page.setViewportSize({ width: 320, height: 900 });
    for (const card of await cards.all()) expect(await card.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
    await first.screenshot({ path: info.outputPath('directory-320.png') });
    await first.focus();
    await expect(first).toHaveCSS('outline-width', '2px');
    const destination = await first.getAttribute('href');
    await first.press('Enter');
    await expect(page).toHaveURL(url => url.pathname === destination);
  });
}
