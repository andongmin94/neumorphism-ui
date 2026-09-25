import fs from "node:fs";
import { test, expect } from "@playwright/test";
import { demoAnalytics } from "../../../registry/src/components/blocks/analytics-demo";
import { analyticsCsv, summarizeAnalytics } from "../../../registry/src/lib/analytics-model";
import { analyticsFormats } from "../../../registry/src/lib/analytics-copy";

for (const locale of ["ko", "en", "ja", "zh"]) {
  test(`${locale}: chart workbench and dashboard source`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}/charts`);
    await expect(page.locator('[data-slot="chart-plot"]')).toHaveCount(8);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#chart-installation details').first().locator('summary').click();
    await expect(page.locator('#chart-installation details pre').first()).toContainText('export function RevenueChart');
    await page.goto(`/${locale}/templates/dashboard`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('[data-slot="analytics-dashboard"]')).toBeVisible();
    await page.locator('#installed-source summary').first().click();
    await expect(page.locator('#installed-source pre').first()).toContainText('export function AnalyticsDashboard');
    await page.locator('#installed-source summary').first().click();
    await page.locator('[data-slot="analytics-dashboard"]').screenshot({ path: info.outputPath('dashboard.png') });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('filters keep metrics, exact table and CSV on the same data', async ({ page }) => {
  await page.goto('/en/templates/dashboard');
  const dashboard = page.locator('[data-slot="analytics-dashboard"]');
  await dashboard.getByRole('combobox', { name: 'Reporting period' }).selectOption('7');
  await dashboard.getByRole('combobox', { name: 'Acquisition channel' }).selectOption('channel:Organic');
  const expected = summarizeAnalytics(demoAnalytics, 7, 'Organic');
  const f = analyticsFormats('en');
  await expect(dashboard.locator('[data-metric="visits"]')).toHaveText(f.number(expected.totals.visits));
  await expect(dashboard.locator('[data-metric="conversion"]')).toHaveText(f.percent(expected.conversion));
  await expect(dashboard.locator('[data-metric="revenue"]')).toHaveText(f.money(expected.totals.revenueCents));
  const revenue = dashboard.locator('[data-chart="revenue"]');
  await revenue.locator('summary').click();
  await expect(revenue.locator('tbody tr')).toHaveCount(7);
  await expect(revenue.locator('tbody tr').last()).toContainText(f.money(expected.points.at(-1)!.revenueCents));
  const downloading = page.waitForEvent('download');
  await dashboard.getByRole('button', { name: 'Export CSV', exact: true }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe('analytics-2026-09-24-2026-09-30.csv');
  const file = await download.path();
  expect(file).not.toBeNull();
  expect(fs.readFileSync(file!, 'utf8')).toBe(analyticsCsv(expected));
});

test('empty data is not represented as zero revenue', async ({ page }) => {
  await page.goto('/en/templates/dashboard');
  await page.getByRole('checkbox', { name: 'Preview empty data' }).check();
  const dashboard = page.locator('[data-slot="analytics-dashboard"]');
  await expect(dashboard.locator('[data-metric="revenue"]')).toHaveText('—');
  await expect(dashboard.locator('[data-metric="conversion"]')).toHaveText('—');
  await expect(dashboard.getByRole('button', { name: 'Export CSV', exact: true })).toBeDisabled();
  await expect(dashboard.locator('[data-slot="chart-plot"]')).toHaveCount(0);
});

test('Chart primitive exposes its exact-data table', async ({ page }) => {
  await page.goto('/en/components/chart');
  const preview = page.locator('#preview');
  await preview.locator('[data-slot="chart"] summary').click();
  await expect(preview.locator('table')).toBeVisible();
  await expect(preview.locator('tbody tr')).toHaveCount(3);
  await preview.getByRole('tab').nth(1).click();
  await expect(preview.locator('pre')).toContainText('ChartContainer');
});


test('operational chart recipes expose controls and exact data', async ({ page }) => {
  await page.goto('/en/charts');
  const gallery = page.locator('[data-slot="operational-chart-gallery"]');
  await expect(gallery.locator('[data-chart="build-duration"]')).toBeVisible();
  await expect(gallery.locator('[data-chart="install-diagnostics"]')).toBeVisible();

  const build = gallery.locator('[data-chart="build-duration"]');
  await build.getByRole('combobox', { name: 'Visible series' }).selectOption('cached');
  await build.locator('summary').click();
  await expect(build.locator('tbody tr')).toHaveCount(6);

  const diagnostics = gallery.locator('[data-chart="install-diagnostics"]');
  await diagnostics.getByRole('combobox', { name: 'Unit' }).selectOption('s');
  await diagnostics.locator('summary').click();
  await expect(diagnostics.locator('tbody tr')).toHaveCount(4);
});
