import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const { expect } = createRequire(path.join(root, "../docs/package.json"))("@playwright/test");

export function decorateAnalyticsFixture(directory) {
  const file = path.join(directory, "src/consumer.tsx");
  let source = fs.readFileSync(file, "utf8");
  assert.ok(source.includes("export default function Consumer()") && source.includes("  </main>;"));
  source = source.replace("export default function Consumer()", 'import { AnalyticsExample } from "@/design-system/blocks/analytics-dashboard";\nexport default function Consumer()');
  source = source.replace("  </main>;", '<section data-workspace="analytics" className="mt-16 border-t border-[var(--border)] pt-10"><AnalyticsExample /></section>\n  </main>;');
  fs.writeFileSync(file, source);
}

export async function exerciseAnalytics(page, { target, scenario, engineName, mode, evidenceRoot }) {
  const view = page.locator('[data-workspace="analytics"]');
  const dashboard = view.locator('[data-slot="analytics-dashboard"]');
  await dashboard.scrollIntoViewIfNeeded();
  await expect(dashboard.locator('[data-slot="chart-plot"]')).toHaveCount(3);
  const original = await dashboard.locator('[data-metric="visits"]').textContent();
  await dashboard.getByRole('combobox', { name: 'Reporting period' }).selectOption('7');
  await expect(dashboard.locator('[data-slot="analytics-window"]')).toContainText('2026-09-24 – 2026-09-30');
  await expect(dashboard.locator('[data-metric="visits"]')).not.toHaveText(original);
  await dashboard.getByRole('combobox', { name: 'Acquisition channel' }).selectOption('channel:Organic');
  const chart = dashboard.locator('[data-chart="revenue"]');
  await chart.locator('summary').click();
  await expect(chart.locator('tbody tr')).toHaveCount(7);
  await chart.locator('summary').click();
  await chart.getByRole('checkbox', { name: 'Show target' }).uncheck();
  await expect(chart.locator('.recharts-line')).toHaveCount(0);
  await chart.getByRole('checkbox', { name: 'Show target' }).check();
  await expect(chart.locator('.recharts-line')).toHaveCount(1);
  await dashboard.getByRole('combobox', { name: 'Channel metric' }).selectOption('convertedVisits');
  const graph = chart.locator('svg.recharts-surface');
  await graph.focus(); await page.keyboard.press('ArrowRight');
  await expect(chart.locator('.recharts-tooltip-wrapper')).toBeVisible();
  await page.keyboard.press('Tab');
  fs.mkdirSync(evidenceRoot, { recursive: true });
  await dashboard.screenshot({ path: path.join(evidenceRoot, `${target}-${scenario}-${engineName}-${mode}-analytics-filtered.png`) });
  await view.getByRole('checkbox', { name: 'Preview empty data' }).check();
  await expect(dashboard.getByRole('button', { name: 'Export CSV', exact: true })).toBeDisabled();
  await expect(dashboard.locator('[data-metric="revenue"]')).toHaveText('—');
  await expect(dashboard.locator('[data-slot="chart-plot"]')).toHaveCount(0);
  await view.getByRole('checkbox', { name: 'Preview empty data' }).uncheck();
  await dashboard.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await expect(dashboard.locator('[data-metric="visits"]')).toHaveText(original);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'analytics causes horizontal page overflow');
}
