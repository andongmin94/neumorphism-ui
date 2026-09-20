import type { AnalyticsRecord } from "@/lib/analytics-model";

/** Deterministic synthetic example; this is not business or live-service data. */
export const demoAnalytics: readonly AnalyticsRecord[] = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 8, index + 1)).toISOString().slice(0, 10);
  return ["Organic", "Direct", "Referral"].map((channel, group) => {
    const visits = 230 + (2 - group) * 115 + index * 8 + ((index * 17 + group * 29) % 85);
    const convertedVisits = Math.floor(visits * (0.035 + group * 0.012 + (index % 5) * 0.003));
    return { date, channel, visits, convertedVisits, revenueCents: convertedVisits * (4200 + group * 800), targetCents: 115000 + (2 - group) * 25000 + index * 1800 };
  });
}).flat();
