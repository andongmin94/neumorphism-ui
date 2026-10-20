"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";

const copy = {
  "en": {
    "title": "Service latency",
    "description": "Daily p50 and p95 response time against a p95 budget.",
    "worst": "Worst p95",
    "overBudget": "periods over budget",
    "empty": "No latency samples.",
    "table": "View latency data",
    "caption": "Service latency data",
    "period": "Period",
    "budget": "Budget",
    "over": "Over",
    "within": "Within",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ]
  },
  "ko": {
    "title": "서비스 지연 시간",
    "description": "일별 p50·p95 응답 시간과 p95 목표값을 비교합니다.",
    "worst": "최대 p95",
    "overBudget": "기간에서 목표 초과",
    "empty": "지연 시간 데이터가 없습니다.",
    "table": "지연 시간 데이터 보기",
    "caption": "서비스 지연 시간 데이터",
    "period": "기간",
    "budget": "목표",
    "over": "초과",
    "within": "이내",
    "days": [
      "월",
      "화",
      "수",
      "목",
      "금",
      "토",
      "일"
    ]
  },
  "ja": {
    "title": "サービスの応答時間",
    "description": "日別のp50・p95応答時間をp95の目標値と比較します。",
    "worst": "最大p95",
    "overBudget": "期間で目標超過",
    "empty": "応答時間データはありません。",
    "table": "応答時間データを表示",
    "caption": "サービス応答時間データ",
    "period": "期間",
    "budget": "目標",
    "over": "超過",
    "within": "以内",
    "days": [
      "月",
      "火",
      "水",
      "木",
      "金",
      "土",
      "日"
    ]
  },
  "zh": {
    "title": "服务延迟",
    "description": "比较每日p50、p95响应时间与p95目标值。",
    "worst": "最高p95",
    "overBudget": "个时段超出目标",
    "empty": "暂无延迟数据。",
    "table": "查看延迟数据",
    "caption": "服务延迟数据",
    "period": "时段",
    "budget": "目标",
    "over": "超出",
    "within": "范围内",
    "days": [
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日"
    ]
  }
} as const;

export type ServiceLatencyPoint = {
  label: string;
  p50Ms: number;
  p95Ms: number;
};

export function ServiceLatencyChart({
  data,
  budgetMs = 300,
  locale = "en",
}: {
  data: readonly ServiceLatencyPoint[];
  budgetMs?: number;
  locale?: keyof typeof copy;
}) {
  const t = copy[locale];
  const number = new Intl.NumberFormat(locale);
  const worst = data.length ? Math.max(...data.map((row) => row.p95Ms)) : 0;
  const breaches = data.filter((row) => row.p95Ms > budgetMs);

  return (
    <ChartContainer
      data-chart="service-latency"
      title={t.title}
      description={t.description}
      summary={data.length ? `${t.worst} ${number.format(worst)} ms · ${breaches.length}/${data.length} ${t.overBudget}` : t.empty}
      tableLabel={t.table}
      emptyLabel={t.empty}
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr><th>{t.period}</th><th>p50 (ms)</th><th>p95 (ms)</th><th>{t.budget}</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.p50Ms}</td><td>{row.p95Ms}</td><td>{row.p95Ms > budgetMs ? t.over : t.within}</td></tr>)}</tbody>
        </table>
      }
    >
      <LineChart data={data} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, "auto"]} width={52} tickFormatter={(value: number) => `${value}ms`} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartLegend reference={{ value: `${t.budget} ${number.format(budgetMs)} ms`, color: "var(--destructive)", dashArray: "4 4" }} />
        <ReferenceLine ifOverflow="extendDomain" y={budgetMs} stroke="var(--destructive)" strokeDasharray="4 4" />
        <ChartTooltip formatter={(value) => `${Number(value)} ms`} />
        <Line dataKey="p50Ms" name="p50" legendType="plainline" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="7 4" dot={false} isAnimationActive={false} />
        <Line dataKey="p95Ms" name="p95" legendType="plainline" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  );
}

const exampleLatency: ServiceLatencyPoint[] = [
  { label: "Mon", p50Ms: 80, p95Ms: 210 },
  { label: "Tue", p50Ms: 76, p95Ms: 195 },
  { label: "Wed", p50Ms: 95, p95Ms: 340 },
  { label: "Thu", p50Ms: 130, p95Ms: 470 },
  { label: "Fri", p50Ms: 100, p95Ms: 330 },
  { label: "Sat", p50Ms: 82, p95Ms: 240 },
  { label: "Sun", p50Ms: 79, p95Ms: 215 },
];

export function ServiceLatencyExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  const data = exampleLatency.map((point, index) => ({ ...point, label: copy[locale].days[index] }));
  return <ServiceLatencyChart data={data} locale={locale} />;
}
