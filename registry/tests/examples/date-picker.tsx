"use client";

import * as React from "react";
import { enUS, ko, ja, zhCN } from "@daypicker/react/locale";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
const locales = { en: enUS, ko, ja, zh: zhCN };
const copy = {
  en: { label: "Due date", choose: "Select date", clear: "Clear date", locked: "Locked date", reset: "Reset date", hint: "Dates are stored as local calendar dates, not UTC timestamps." },
  ko: { label: "마감일", choose: "날짜 선택", clear: "날짜 지우기", locked: "변경 불가 날짜", reset: "날짜 초기화", hint: "날짜는 UTC 시각이 아닌 현지 달력의 날짜로 저장됩니다." },
  ja: { label: "期限", choose: "日付を選択", clear: "日付をクリア", locked: "変更不可の日付", reset: "日付をリセット", hint: "UTC時刻ではなく、現地のカレンダー日付として保存します。" },
  zh: { label: "截止日期", choose: "选择日期", clear: "清除日期", locked: "锁定日期", reset: "重置日期", hint: "日期按本地日历保存，而非 UTC 时间戳。" },
};

export default function DatePickerExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  const text = copy[locale];
  const id = React.useId();
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  return <form className="grid w-full max-w-sm gap-4" onSubmit={event => event.preventDefault()} onReset={() => setDate(new Date(2026, 8, 15))}>
    <label htmlFor={id} className="text-sm font-semibold">{text.label}</label>
    <DatePicker id={id} name="dueDate" label={text.label} value={date} onValueChange={setDate} locale={locales[locale]} placeholder={text.choose} clearLabel={text.clear} describedBy={`${id}-hint`} disabledDates={{ before: new Date(2026, 8, 10) }} startMonth={new Date(2026, 8)} endMonth={new Date(2027, 11)} />
    <p id={`${id}-hint`} className="text-sm leading-relaxed text-[var(--muted-foreground)]">{text.hint}</p>
    <Button type="reset" size="sm" className="w-fit">{text.reset}</Button>
    <DatePicker label={text.locked} value={new Date(2026, 8, 15)} onValueChange={() => {}} disabled locale={locales[locale]} clearLabel={text.clear} />
  </form>;
}
