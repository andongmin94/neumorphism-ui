import { analyticsFormats } from '../src/lib/analytics-copy.ts';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
for (const [slug, file, accent] of [
  ['template-analytics', 'analytics-dashboard', 'revenue'],
  ['template-data-manager', 'data-manager', 'active'],
  ['template-cms', 'cms', 'published'],
]) {
  test(`${slug} composes installed Card and declares its dependency`, () => {
    const source = readFileSync(new URL(`../src/components/blocks/${file}.tsx`, import.meta.url), 'utf8');
    assert.match(source, /import \{ Card \} from "@\/components\/ui\/card"/);
    assert.ok(catalog.items.find(item => item.name === slug).registryDependencies.includes('@neumorphism-ui/card'));
    const summary = source.slice(source.indexOf('<dl data-slot="workspace-metrics"'), source.indexOf('</dl>', source.indexOf('<dl data-slot="workspace-metrics"')));
    assert.match(summary, /<Card/);
    assert.ok(summary.includes(`=== "${accent}" ? "accent" : "raised"`));
    assert.doesNotMatch(summary, /shadow-inset|first:/);
  });
}

for (const locale of ['en', 'ko', 'ja', 'zh']) {
  for (const currency of ['USD', 'EUR', 'JPY', 'KRW']) {
    test(`currency typography preserves every source character: ${locale} ${currency}`, () => {
      const format = analyticsFormats(locale, currency);
      for (const cents of [0, 1, 12345, 6064400, 123456789]) {
        assert.equal(format.moneyParts(cents).map(part => part.value).join(''), format.money(cents));
      }
    });
  }
}
