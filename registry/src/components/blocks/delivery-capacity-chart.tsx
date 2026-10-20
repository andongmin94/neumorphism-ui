"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

const copy = {
  "en": {
    "title": "Delivery capacity",
    "description": "Planned and delivered item counts. This is not a productivity score.",
    "planned": "Planned",
    "delivered": "Delivered",
    "netVariance": "Net variance",
    "empty": "No delivery records.",
    "view": "View",
    "compare": "Planned vs delivered",
    "signed": "Signed variance",
    "table": "View delivery data",
    "caption": "Delivery capacity data",
    "period": "Period",
    "variance": "Variance",
    "difference": "Delivered − planned"
  },
  "ko": {
    "title": "계획·완료 수량",
    "description": "계획한 항목과 완료한 항목의 수를 비교합니다. 생산성 점수가 아닙니다.",
    "planned": "계획",
    "delivered": "완료",
    "netVariance": "순차이",
    "empty": "완료 기록이 없습니다.",
    "view": "보기 방식",
    "compare": "계획과 완료 비교",
    "signed": "증감 차이",
    "table": "계획·완료 데이터 보기",
    "caption": "계획·완료 수량 데이터",
    "period": "기간",
    "variance": "차이",
    "difference": "완료 − 계획"
  },
  "ja": {
    "title": "計画・完了件数",
    "description": "計画した項目と完了した項目の件数です。生産性スコアではありません。",
    "planned": "計画",
    "delivered": "完了",
    "netVariance": "合計差分",
    "empty": "完了記録はありません。",
    "view": "表示方法",
    "compare": "計画と完了を比較",
    "signed": "増減の差分",
    "table": "計画・完了データを表示",
    "caption": "計画・完了件数データ",
    "period": "期間",
    "variance": "差分",
    "difference": "完了 − 計画"
  },
  "zh": {
    "title": "计划与完成数量",
    "description": "比较计划和已完成的事项数量。这不是生产力评分。",
    "planned": "计划",
    "delivered": "完成",
    "netVariance": "净差额",
    "empty": "暂无完成记录。",
    "view": "显示方式",
    "compare": "计划与完成对比",
    "signed": "增减差额",
    "table": "查看计划与完成数据",
    "caption": "计划与完成数量数据",
    "period": "时段",
    "variance": "差额",
    "difference": "完成 − 计划"
  }
} as const;

export type DeliveryCapacityPoint = {
  period: string;
  planned: number;
  delivered: number;
};

export function DeliveryCapacityChart({
  data,
  locale = "en",
}: {
  data: readonly DeliveryCapacityPoint[];
  locale?: keyof typeof copy;
}) {
  const t = copy[locale];
  const [view, setView] = React.useState<"compare" | "variance">("compare");
  const planned = data.reduce((sum, row) => sum + row.planned, 0);
  const delivered = data.reduce((sum, row) => sum + row.delivered, 0);
  const chartData = data.map((row) => ({ ...row, variance: row.delivered - row.planned }));

  return (
    <ChartContainer
      data-chart="delivery-capacity"
      title={t.title}
      description={t.description}
      summary={data.length ? `${t.planned} ${planned} · ${t.delivered} ${delivered} · ${t.netVariance} ${delivered - planned >= 0 ? "+" : ""}${delivered - planned}` : t.empty}
      actions={
        <label className="grid gap-1.5 text-xs">
          {t.view}
          <Select value={view} onChange={(event) => setView(event.target.value as typeof view)}>
            <SelectItem value="compare">{t.compare}</SelectItem>
            <SelectItem value="variance">{t.signed}</SelectItem>
          </Select>
        </label>
      }
      tableLabel={t.table}
      emptyLabel={t.empty}
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr><th>{t.period}</th><th>{t.planned}</th><th>{t.delivered}</th><th>{t.variance}</th></tr></thead>
          <tbody>{chartData.map((row) => <tr key={row.period}><th scope="row">{row.period}</th><td>{row.planned}</td><td>{row.delivered}</td><td>{row.variance > 0 ? "+" + row.variance : row.variance}</td></tr>)}</tbody>
        </table>
      }
    >
      <BarChart data={chartData} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="period" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis width={44} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ReferenceLine y={0} stroke="var(--foreground)" />
        <ChartLegend />
        <ChartTooltip />
        {view === "variance" ? (
          <Bar dataKey="variance" name={t.difference} fill="var(--primary)" maxBarSize={52} isAnimationActive={false} />
        ) : (
          <>
            <Bar dataKey="planned" name={t.planned} fill="var(--muted)" stroke="var(--muted-foreground)" strokeDasharray="4 3" maxBarSize={40} isAnimationActive={false} />
            <Bar dataKey="delivered" name={t.delivered} fill="var(--primary)" maxBarSize={40} isAnimationActive={false} />
          </>
        )}
      </BarChart>
    </ChartContainer>
  );
}

const exampleCapacity: DeliveryCapacityPoint[] = [
  { period: "S1", planned: 32, delivered: 28 },
  { period: "S2", planned: 36, delivered: 39 },
  { period: "S3", planned: 34, delivered: 31 },
  { period: "S4", planned: 38, delivered: 42 },
];

export function DeliveryCapacityExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  return <DeliveryCapacityChart data={exampleCapacity} locale={locale} />;
}
