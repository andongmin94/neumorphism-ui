"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

const copy = {
  "en": {
    "title": "Build duration",
    "description": "Paired cold and cached build runs in seconds.",
    "meanCold": "Mean cold",
    "cached": "cached",
    "overBudget": "cold runs over budget",
    "empty": "No build runs.",
    "series": "Visible series",
    "both": "Both",
    "coldOnly": "Cold only",
    "cachedOnly": "Cached only",
    "table": "View build data",
    "caption": "Build duration data",
    "period": "Build",
    "cold": "Cold",
    "cachedHead": "Cached",
    "saved": "Saved",
    "coldBuild": "Cold build",
    "cachedBuild": "Cached build",
    "budget": "Budget"
  },
  "ko": {
    "title": "빌드 시간",
    "description": "캐시를 사용하지 않은 빌드와 캐시를 사용한 빌드의 소요 시간(초)입니다.",
    "meanCold": "캐시 미사용 평균",
    "cached": "캐시 사용 평균",
    "overBudget": "캐시 미사용 빌드가 목표 초과",
    "empty": "빌드 기록이 없습니다.",
    "series": "표시할 계열",
    "both": "모두",
    "coldOnly": "캐시 미사용",
    "cachedOnly": "캐시 사용",
    "table": "빌드 데이터 보기",
    "caption": "빌드 시간 데이터",
    "period": "빌드",
    "cold": "캐시 미사용",
    "cachedHead": "캐시 사용",
    "saved": "단축 시간",
    "coldBuild": "캐시 미사용",
    "cachedBuild": "캐시 사용",
    "budget": "목표"
  },
  "ja": {
    "title": "ビルド時間",
    "description": "キャッシュ未使用・使用時のビルド所要時間（秒）です。",
    "meanCold": "キャッシュ未使用の平均",
    "cached": "使用時の平均",
    "overBudget": "未使用ビルドが目標超過",
    "empty": "ビルド記録はありません。",
    "series": "表示する系列",
    "both": "両方",
    "coldOnly": "キャッシュ未使用",
    "cachedOnly": "キャッシュ使用",
    "table": "ビルドデータを表示",
    "caption": "ビルド時間データ",
    "period": "ビルド",
    "cold": "未使用",
    "cachedHead": "使用",
    "saved": "短縮時間",
    "coldBuild": "キャッシュ未使用",
    "cachedBuild": "キャッシュ使用",
    "budget": "目標"
  },
  "zh": {
    "title": "构建耗时",
    "description": "比较未使用缓存和使用缓存的构建耗时，单位为秒。",
    "meanCold": "未使用缓存平均",
    "cached": "使用缓存平均",
    "overBudget": "次无缓存构建超出目标",
    "empty": "暂无构建记录。",
    "series": "显示系列",
    "both": "全部",
    "coldOnly": "未使用缓存",
    "cachedOnly": "使用缓存",
    "table": "查看构建数据",
    "caption": "构建耗时数据",
    "period": "构建",
    "cold": "未使用缓存",
    "cachedHead": "使用缓存",
    "saved": "节省时间",
    "coldBuild": "未使用缓存",
    "cachedBuild": "使用缓存",
    "budget": "目标"
  }
} as const;

export type BuildDurationPoint = {
  label: string;
  coldSeconds: number;
  cachedSeconds: number;
};

export function BuildDurationChart({
  data,
  budgetSeconds = 220,
  locale = "en",
}: {
  data: readonly BuildDurationPoint[];
  budgetSeconds?: number;
  locale?: keyof typeof copy;
}) {
  const t = copy[locale];
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const [series, setSeries] = React.useState<"both" | "cold" | "cached">("both");
  const coldMean = data.length ? data.reduce((sum, row) => sum + row.coldSeconds, 0) / data.length : 0;
  const cachedMean = data.length ? data.reduce((sum, row) => sum + row.cachedSeconds, 0) / data.length : 0;
  const breaches = data.filter((row) => row.coldSeconds > budgetSeconds).length;

  return (
    <ChartContainer
      data-chart="build-duration"
      title={t.title}
      description={t.description}
      summary={data.length ? `${t.meanCold} ${number.format(coldMean)} s · ${t.cached} ${number.format(cachedMean)} s · ${breaches}/${data.length} ${t.overBudget}` : t.empty}
      actions={
        <label className="grid gap-1.5 text-xs">
          {t.series}
          <Select value={series} onChange={(event) => setSeries(event.target.value as typeof series)}>
            <SelectItem value="both">{t.both}</SelectItem>
            <SelectItem value="cold">{t.coldOnly}</SelectItem>
            <SelectItem value="cached">{t.cachedOnly}</SelectItem>
          </Select>
        </label>
      }
      tableLabel={t.table}
      emptyLabel={t.empty}
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr><th>{t.period}</th><th>{t.cold} (s)</th><th>{t.cachedHead} (s)</th><th>{t.saved} (s)</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.coldSeconds}</td><td>{row.cachedSeconds}</td><td>{row.coldSeconds - row.cachedSeconds}</td></tr>)}</tbody>
        </table>
      }
    >
      <LineChart data={data} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, "auto"]} width={52} tickFormatter={(value: number) => `${value}s`} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartLegend reference={{ value: `${t.budget} ${number.format(budgetSeconds)} s`, color: "var(--destructive)", dashArray: "4 4" }} />
        <ReferenceLine ifOverflow="extendDomain" y={budgetSeconds} stroke="var(--destructive)" strokeDasharray="4 4" />
        <ChartTooltip formatter={(value) => `${Number(value)} s`} />
        {series !== "cached" && <Line dataKey="coldSeconds" name={t.coldBuild} legendType="plainline" stroke="var(--foreground)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />}
        {series !== "cold" && <Line dataKey="cachedSeconds" name={t.cachedBuild} legendType="plainline" stroke="var(--primary)" strokeWidth={2.5} strokeDasharray="7 4" dot={{ r: 3 }} isAnimationActive={false} />}
      </LineChart>
    </ChartContainer>
  );
}

const exampleBuilds: BuildDurationPoint[] = [
  { label: "B1", coldSeconds: 210, cachedSeconds: 108 },
  { label: "B2", coldSeconds: 195, cachedSeconds: 102 },
  { label: "B3", coldSeconds: 238, cachedSeconds: 114 },
  { label: "B4", coldSeconds: 226, cachedSeconds: 109 },
  { label: "B5", coldSeconds: 204, cachedSeconds: 96 },
  { label: "B6", coldSeconds: 188, cachedSeconds: 93 },
];

export function BuildDurationExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  return <BuildDurationChart data={exampleBuilds} locale={locale} />;
}
