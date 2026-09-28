import { expect, test } from "@playwright/test";

for (const locale of ["en", "ko", "ja", "zh"]) {
  test(`micro finish docs and copied examples: ${locale}`, async ({ page }, info) => {
    await page.goto(`/${locale}/components/pagination`);
    await page.evaluate(() => document.fonts.ready);
    let panel = page.locator('.component-example-panel').first();
    const labels = panel.locator('[data-slot="pagination-label"]');
    await expect(labels).toHaveCount(2);
    for (const label of await labels.all()) {
      const link = label.locator('..');
      await expect(link).toBeVisible(); expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(40);
      await link.focus(); await expect(link).toBeFocused();
    }
    await labels.nth(1).locator('..').click();
    await expect(panel.locator('[aria-current=page]')).toHaveText('3');
    await labels.first().locator('..').press('Enter');
    await expect(panel.locator('[aria-current=page]')).toHaveText('2');
    await panel.screenshot({path:info.outputPath('pagination.png')});
    await page.goto(`/${locale}/components/resizable`);
    panel = page.locator('.component-example-panel').first();
    const group = panel.locator('[data-slot="resizable-panel-group"]');
    await expect(group).toHaveCSS('height','160px');
    await panel.screenshot({path:info.outputPath('resizable.png')});
    await page.goto(`/${locale}/components/marquee`);
    panel = page.locator('.component-example-panel').first();
    await expect(panel.locator('[data-slot="marquee-toggle"]')).toBeHidden();
    const viewport = panel.locator('[data-slot="marquee-viewport"]');
    for (const item of await panel.locator('[data-slot="marquee-items"] [data-slot="marquee-item"]').all()) {
      const a = (await item.boundingBox())!, b = (await viewport.boundingBox())!;
      expect(a.x+a.width).toBeLessThanOrEqual(b.x+b.width+1);
      expect(a.y+a.height).toBeLessThanOrEqual(b.y+b.height+1);
    }
    await panel.screenshot({path:info.outputPath('marquee.png')});
    await page.goto(`/${locale}/components/image-card`);
    const image = page.locator('.component-example-panel img');
    const asset = decodeURIComponent((await image.getAttribute('src'))!);
    expect(asset).not.toMatch(/\brx=/);
    await page.goto(`/${locale}/components/breadcrumb`);
    panel = page.locator('.component-example-panel').first();
    await expect(panel.locator('[data-slot="breadcrumb-list"] > [data-slot="breadcrumb-separator"]')).toHaveCount(0);
    await panel.screenshot({path:info.outputPath('breadcrumb.png')});
    for (const slug of ['toggle','sidebar','collapsible','accordion']) {
      await page.goto(`/${locale}/components/${slug}`);
      panel=page.locator('.component-example-panel').first();
      expect(await panel.innerText()).not.toMatch(/[◆⌂⚙⋮×]/);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  });
}
