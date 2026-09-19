"use client";

import * as React from "react";
import type { DateRange } from "@daypicker/react";
import { enUS, ko, ja, zhCN } from "@daypicker/react/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
const locales = { en: enUS, ko, ja, zh: zhCN };
const copy = {
  en: { single: "Single date", range: "Date range", clear: "Clear range", empty: "No date selected" },
  ko: { single: "날짜 선택", range: "기간 선택", clear: "기간 초기화", empty: "선택한 날짜 없음" },
  ja: { single: "日付選択", range: "期間選択", clear: "期間をクリア", empty: "日付未選択" },
  zh: { single: "选择日期", range: "选择范围", clear: "清除范围", empty: "未选择日期" },
};
function stamp(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function CalendarExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  const text = copy[locale];
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 8, 12), to: new Date(2026, 8, 17) });
  return <div className="flex max-w-full flex-wrap items-start gap-6">
    <section data-calendar="single" aria-label={text.single} className="grid max-w-full gap-3"><h3 className="text-sm font-semibold">{text.single}</h3><Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} disabled={new Date(2026, 8, 20)} locale={locales[locale]} /><output aria-live="polite" data-testid="calendar-value" className="text-sm text-[var(--muted-foreground)]">{date ? stamp(date) : text.empty}</output></section>
    <section data-calendar="range" aria-label={text.range} className="grid max-w-full gap-3"><h3 className="text-sm font-semibold">{text.range}</h3><Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} locale={locales[locale]} /><output aria-live="polite" data-testid="calendar-range" className="text-sm text-[var(--muted-foreground)]">{range?.from ? `${stamp(range.from)} / ${range.to ? stamp(range.to) : "…"}` : text.empty}</output><Button size="sm" onClick={() => setRange(undefined)}>{text.clear}</Button></section>
  </div>;
}
