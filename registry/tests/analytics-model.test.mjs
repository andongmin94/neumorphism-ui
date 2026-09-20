import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { summarizeAnalytics, validateAnalytics, AnalyticsDataError, analyticsCsv } from "../src/lib/analytics-model.ts";
const row = (patch = {}) => ({ date: "2026-09-20", channel: "Organic", visits: 100, convertedVisits: 5, revenueCents: 12345, targetCents: 15000, ...patch });

test("weighted conversion uses sums rather than averaging rates", () => {
  const data = summarizeAnalytics([row({ visits: 10, convertedVisits: 5 }), row({ channel: "Direct", visits: 990, convertedVisits: 10 })], 7);
  assert.equal(data.conversion, 15 / 1000);
  assert.equal(data.points.at(-1).conversion, 15 / 1000);
  assert.equal(data.totals.revenueCents, 24690);
  assert.equal(data.observedDays, 1);
});
test("missing dates and observed zero values stay distinct", () => {
  const data = summarizeAnalytics([row({ date: "2026-09-18" }), row({ visits: 0, convertedVisits: 0, revenueCents: 0, targetCents: 0 })], 3);
  assert.equal(data.points[1].revenueCents, null);
  assert.equal(data.points[2].revenueCents, 0);
  assert.equal(data.points[2].conversion, null);
  assert.equal(data.observedDays, 2);
});
test("reporting window includes its bounds and ends at the data's last date", () => {
  const data = summarizeAnalytics([row({ date: "2026-09-13" }), row({ date: "2026-09-14" }), row()], 7);
  assert.equal(data.start, "2026-09-14"); assert.equal(data.end, "2026-09-20");
  assert.equal(data.points.length, 7); assert.equal(data.observedDays, 2);
  assert.equal(data.totals.visits, 200);
});
test("channel filtering keeps the same reporting window and supports arbitrary names", () => {
  const data = [row({ date: "2026-09-19", channel: "all" }), row({ channel: "channel:X" })];
  const one = summarizeAnalytics(data, 7, "all");
  assert.equal(one.end, "2026-09-20"); assert.equal(one.channels[0].channel, "all");
  assert.equal(one.totals.visits, 100);
  const empty = summarizeAnalytics(data, 7, "unknown");
  assert.equal(empty.observedDays, 0); assert.equal(empty.conversion, null);
  assert.ok(empty.points.every(point => point.visits === null));
});
test("empty input has no invented date range or conversion rate", () => {
  const data = summarizeAnalytics([]);
  assert.equal(data.start, null); assert.equal(data.end, null);
  assert.equal(data.conversion, null); assert.deepEqual(data.points, []);
});
test("invalid dates, metrics and duplicate keys fail explicitly", () => {
  for (const patch of [{ date: "2026-02-30" }, { date: "2026-9-1" }, { channel: " " }, { visits: -1 }, { visits: NaN }, { revenueCents: 0.5 }, { targetCents: Infinity }, { convertedVisits: 101 }]) {
    assert.throws(() => validateAnalytics([row(patch)]), AnalyticsDataError);
  }
  assert.throws(() => summarizeAnalytics([row(), row()]), AnalyticsDataError);
  for (const days of [0, -1, 1.5, 367, Infinity]) assert.throws(() => summarizeAnalytics([row()], days), AnalyticsDataError);
  assert.throws(() => summarizeAnalytics([row({ date: "1000-01-01" })], 7), AnalyticsDataError);
});
test("aggregation preserves immutable source data and catches integer overflow", () => {
  const input = Object.freeze([Object.freeze(row()), Object.freeze(row({ channel: "Direct" }))]);
  const before = JSON.stringify(input); summarizeAnalytics(input); assert.equal(JSON.stringify(input), before);
  assert.throws(() => summarizeAnalytics([row({ visits: Number.MAX_SAFE_INTEGER }), row({ channel: "Direct" })]), AnalyticsDataError);
});
test("leap dates and windows are independent of viewer time zones", () => {
  const source = `import { summarizeAnalytics } from ${JSON.stringify(new URL("../src/lib/analytics-model.ts", import.meta.url).href)};console.log(JSON.stringify(summarizeAnalytics([${JSON.stringify(row({ date: "2024-03-01" }))}],3).points.map(x=>x.date)))`;
  const outputs = ["UTC", "Asia/Seoul", "America/Los_Angeles"].map(TZ => execFileSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", source], { env: { ...process.env, TZ }, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim());
  assert.equal(new Set(outputs).size, 1);
  assert.deepEqual(JSON.parse(outputs[0]), ["2024-02-28", "2024-02-29", "2024-03-01"]);
});
test("CSV preserves cents, missing cells and unrounded rate values", () => {
  const data = summarizeAnalytics([row({ visits: 3, convertedVisits: 1 })], 2);
  const csv = analyticsCsv(data);
  assert.ok(csv.includes("2026-09-19,,,,,\r\n"));
  assert.ok(csv.includes("2026-09-20,3,1,12345,15000,0.3333333333333333\r\n"));
  assert.ok(csv.startsWith("date,visits,converted_visits,revenue_cents,target_cents,conversion_rate\r\n"));
});
test("CSV excludes untrusted channel text and rejects forged cell values", () => {
  const data = summarizeAnalytics([row({ channel: '=HYPERLINK("example")' })], 1);
  assert.ok(!analyticsCsv(data).includes("HYPERLINK"));
  assert.throws(() => analyticsCsv({ ...data, points: [{ ...data.points[0], date: "=1+1" }] }), AnalyticsDataError);
  assert.throws(() => analyticsCsv({ ...data, points: [{ ...data.points[0], revenueCents: "=1+1" }] }), AnalyticsDataError);
});
