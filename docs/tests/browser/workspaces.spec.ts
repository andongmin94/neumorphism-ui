import { test, expect } from "@playwright/test";

for (const locale of ["ko", "en", "ja", "zh"]) {
  test(`${locale}: template gallery and installed-source previews`, async ({ page }, info) => {
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/templates`); await expect(page.locator('.template-gallery-header h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath('gallery.png'), fullPage: true });
    for (const slug of ["settings", "data-manager", "link-hub", "portfolio", "blog", "blog-post", "cms"]) {
      await page.goto(`/${locale}/templates/${slug}`);
      await expect(page.locator(`[data-template="${slug}"]`)).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.locator('#installed-source details').first().locator('summary').click();
      await expect(page.locator('#installed-source pre').first()).toContainText((slug === "portfolio" || slug === "blog-post") ? "export function" : '"use client"');
      await page.locator('#installed-source details').first().locator('summary').click();
      await page.locator('.docs-page-header h1').click();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: info.outputPath(`${slug}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
  });
  for (const slug of ["navigation-menu", "menubar"]) test(`${locale}/${slug}: preview and source`, async ({ page }) => {
    await page.goto(`/${locale}/components/${slug}`); const preview = page.locator('#preview');
    await expect(preview.getByRole('tabpanel')).toBeVisible();
    await preview.getByRole('tab').nth(1).click(); await expect(preview.locator('pre')).toContainText('export default function Example');
    await preview.getByRole('tab').nth(0).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('blog post documentation renders article sections', async ({ page }) => {
  await page.goto('/en/templates/blog-post');
  const preview = page.locator('[data-template="blog-post"]');
  await expect(preview.getByRole('heading', { name: 'Keep a draft after a failed save', exact: true })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Separate the draft from the saved copy', exact: true })).toBeVisible();
  await expect(preview.getByRole('listitem')).toHaveCount(3);
});

test('blog documentation filters by topic and search', async ({ page }) => {
  await page.goto('/en/templates/blog');
  const preview = page.locator('[data-template="blog"]');
  await expect(preview.getByRole('status')).toContainText('3 posts');
  await preview.getByRole('button', { name: 'Engineering', exact: true }).click();
  await expect(preview.getByRole('status')).toContainText('1 post');
  const search = preview.getByRole('searchbox', { name: 'Search posts' });
  await search.fill('keyboard');
  await expect(preview.getByRole('link', { name: 'Return keyboard focus after closing a dialog' })).toBeVisible();
});

test('CMS documentation preserves edits through a failed save', async ({ page }) => {
  await page.goto('/en/templates/cms');
  const preview = page.locator('[data-template="cms"]');
  const fail = preview.getByRole('checkbox', { name: 'Fail the next save', exact: true });
  await fail.check();
  const title = preview.getByLabel('Title', { exact: true });
  await title.fill('Edited title');
  await preview.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(preview.getByRole('alert')).toBeVisible();
  await expect(title).toHaveValue('Edited title');
  await preview.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(preview.getByRole('status')).toHaveText('Saved.');
});

test('CMS documentation disables editing while saving and allows the next edit afterward', async ({ page }) => {
  await page.goto('/en/templates/cms');
  const preview = page.locator('[data-template="cms"]');
  const title = preview.getByLabel('Title', { exact: true });
  await title.fill('Saved snapshot');
  await page.clock.install();
  await page.clock.pauseAt(Date.now() + 1000);
  await preview.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(title).toBeDisabled();
  await expect(preview.getByRole('textbox', { name: 'Summary', exact: true })).toBeDisabled();
  await expect(preview.getByRole('textbox', { name: 'Content', exact: true })).toBeDisabled();
  await expect(preview.getByRole('switch', { name: 'Published', exact: true })).toBeDisabled();
  await page.clock.runFor(250);
  await expect(preview.getByRole('status')).toHaveText('Saved.');
  await expect(title).toHaveValue('Saved snapshot');
  await title.fill('Next edit');
  await expect(preview.getByRole('button', { name: 'Save', exact: true })).toBeEnabled();
});

test('CMS documentation removes an unsaved new post when discarded', async ({ page }) => {
  await page.goto('/en/templates/cms');
  const preview = page.locator('[data-template="cms"]');
  await preview.getByRole('button', { name: 'New post', exact: true }).click();
  await preview.getByLabel('Title', { exact: true }).fill('Throwaway draft');
  await preview.getByRole('button', { name: 'Discard', exact: true }).click();
  await expect(preview.getByLabel('Title', { exact: true })).toHaveValue('September editor update');
  await expect(preview.getByText('Throwaway draft', { exact: true })).toHaveCount(0);
  await expect(preview.getByRole('status')).toHaveText('Discarded the unsaved post.');
  await expect(preview.locator('[data-slot="workspace-metrics"] dd')).toHaveText(['3', '2', '0']);
});

test('portfolio documentation exposes case study detail', async ({ page }) => {
  await page.goto('/en/templates/portfolio');
  const preview = page.locator('[data-template="portfolio"]');
  const project = preview.locator('details').first();
  await project.locator('summary').click();
  await expect(project.getByText('The challenge', { exact: true })).toBeVisible();
  await expect(project.getByText('The outcome', { exact: true })).toBeVisible();
});

test('link hub documentation filters destinations', async ({ page }) => {
  await page.goto('/en/templates/link-hub');
  const preview = page.locator('[data-template="link-hub"]');
  await expect(preview.getByRole('link')).toHaveCount(5);
  await preview.getByRole('button', { name: 'Guides', exact: true }).click();
  await expect(preview.getByRole('link')).toHaveCount(2);
  await expect(preview.getByRole('status').first()).toContainText('2 links');
});

test('settings documentation exercises failed save and retry', async ({ page }) => {
  await page.goto('/en/templates/settings'); const preview = page.locator('[data-template="settings"]');
  const input = preview.getByRole('textbox', { name: 'Display name', exact: true }); await input.fill('Preview User');
  await preview.getByRole('checkbox', { name: 'Fail the next save', exact: true }).check();
  await preview.getByRole('button', { name: 'Save changes', exact: true }).click(); await expect(preview.getByRole('alert')).toBeVisible();
  await expect(input).toHaveValue('Preview User'); await preview.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(preview.getByRole('status')).toHaveText('All changes saved');
});
