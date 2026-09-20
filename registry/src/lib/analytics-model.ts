export type AnalyticsRecord = {
  date: string;
  channel: string;
  visits: number;
  convertedVisits: number;
  revenueCents: number;
  targetCents: number;
};
export type AnalyticsTotals = Omit<AnalyticsRecord, "date" | "channel">;
export type AnalyticsDay = { date: string; conversion: number | null } & {
  [K in keyof AnalyticsTotals]: number | null;
};
export type AnalyticsChannel = AnalyticsTotals & {
  channel: string;
  conversion: number | null;
};
export type AnalyticsSummary = {
  start: string | null;
  end: string | null;
  observedDays: number;
  points: AnalyticsDay[];
  channels: AnalyticsChannel[];
  totals: AnalyticsTotals;
  conversion: number | null;
};

export class AnalyticsDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AnalyticsDataError";
  }
}

const fields = ["visits", "convertedVisits", "revenueCents", "targetCents"] as const;
const zero = (): AnalyticsTotals => ({ visits: 0, convertedVisits: 0, revenueCents: 0, targetCents: 0 });

function timestamp(value: string): number {
  if (typeof value !== "string" || !/^[1-9]\d{3}-\d{2}-\d{2}$/.test(value)) {
    throw new AnalyticsDataError("Use YYYY-MM-DD dates with a year between 1000 and 9999.");
  }
  const time = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) {
    throw new AnalyticsDataError("Invalid calendar date.");
  }
  return time;
}

function add(target: AnalyticsTotals, record: AnalyticsTotals): void {
  for (const field of fields) {
    const next = target[field] + record[field];
    if (!Number.isSafeInteger(next)) throw new AnalyticsDataError("An aggregate exceeds safe integer precision.");
    target[field] = next;
  }
}

export function conversionRate(convertedVisits: number, visits: number): number | null {
  return visits === 0 ? null : convertedVisits / visits;
}

export function validateAnalytics(records: readonly AnalyticsRecord[]): void {
  const seen = new Set<string>();
  for (const record of records) {
    timestamp(record.date);
    if (typeof record.channel !== "string" || !record.channel.trim()) {
      throw new AnalyticsDataError("A channel name is required.");
    }
    const key = JSON.stringify([record.date, record.channel]);
    if (seen.has(key)) throw new AnalyticsDataError("Each date/channel pair must be unique.");
    seen.add(key);
    for (const field of fields) {
      if (!Number.isSafeInteger(record[field]) || record[field] < 0) {
        throw new AnalyticsDataError("Metrics must be nonnegative safe integers; currency is stored in cents.");
      }
    }
    if (record.convertedVisits > record.visits) {
      throw new AnalyticsDataError("Converted visits cannot exceed visits.");
    }
  }
}

/** Date-only aggregation is independent of the viewer's local time zone.
 * The window ends at the latest date in the supplied data, not today's date.
 * Missing days remain null, recorded zero remains zero, and conversion uses
 * sum(convertedVisits) / sum(visits), not an average of daily/channel rates.
 * Missing individual channels do not imply zero: totals cover only supplied rows.
 */
export function summarizeAnalytics(records: readonly AnalyticsRecord[], days = 14, channel?: string): AnalyticsSummary {
  if (!Number.isInteger(days) || days < 1 || days > 366) {
    throw new AnalyticsDataError("The reporting window must contain 1–366 days.");
  }
  validateAnalytics(records);
  const totals = zero();
  if (!records.length) {
    return { start: null, end: null, observedDays: 0, points: [], channels: [], totals, conversion: null };
  }
  const end = records.reduce((latest, item) => item.date > latest ? item.date : latest, records[0].date);
  const startTime = timestamp(end) - (days - 1) * 86400000;
  if (startTime < Date.UTC(1000, 0, 1)) throw new AnalyticsDataError("The window starts before the supported date range.");
  const start = new Date(startTime).toISOString().slice(0, 10);
  const byDate = new Map<string, AnalyticsTotals>();
  const byChannel = new Map<string, AnalyticsTotals>();
  for (const record of records) {
    if (record.date < start || record.date > end || (channel !== undefined && record.channel !== channel)) continue;
    const day = byDate.get(record.date) ?? zero();
    add(day, record);
    byDate.set(record.date, day);
    const group = byChannel.get(record.channel) ?? zero();
    add(group, record);
    byChannel.set(record.channel, group);
    add(totals, record);
  }
  const points: AnalyticsDay[] = Array.from({ length: days }, (_, index) => {
    const date = new Date(startTime + index * 86400000).toISOString().slice(0, 10);
    const value = byDate.get(date);
    return value
      ? { date, ...value, conversion: conversionRate(value.convertedVisits, value.visits) }
      : { date, visits: null, convertedVisits: null, revenueCents: null, targetCents: null, conversion: null };
  });
  const channels = [...byChannel].map(([name, value]) => ({
    channel: name, ...value, conversion: conversionRate(value.convertedVisits, value.visits),
  })).sort((a, b) => b.visits - a.visits || (a.channel < b.channel ? -1 : a.channel > b.channel ? 1 : 0));
  return { start, end, observedDays: byDate.size, points, channels, totals, conversion: conversionRate(totals.convertedVisits, totals.visits) };
}

/** Aggregated export contains only validated ISO dates and finite numbers.
 * It deliberately excludes arbitrary channel labels and localized text, avoiding
 * spreadsheet formula injection. Empty cells mean missing/undefined, not zero.
 */
export function analyticsCsv(summary: AnalyticsSummary): string {
  for (const point of summary.points) {
    timestamp(point.date);
    for (const field of fields) {
      const value = point[field];
      if (value !== null && (!Number.isSafeInteger(value) || value < 0)) throw new AnalyticsDataError("Invalid CSV metric.");
    }
    if (point.conversion !== null && (!Number.isFinite(point.conversion) || point.conversion < 0 || point.conversion > 1)) throw new AnalyticsDataError("Invalid CSV rate.");
  }
  const rows = summary.points.map(point => [
    point.date, point.visits, point.convertedVisits, point.revenueCents, point.targetCents, point.conversion,
  ].map(value => value === null ? "" : String(value)).join(","));
  return ["date,visits,converted_visits,revenue_cents,target_cents,conversion_rate", ...rows].join("\r\n") + "\r\n";
}
