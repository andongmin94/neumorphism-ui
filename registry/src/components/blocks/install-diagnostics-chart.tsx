"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

const copy = {
  "en": {
    "title": "Installation diagnostics",
    "description": "Sequential stage durations for one installation trace.",
    "total": "Total",
    "longest": "Longest stage",
    "empty": "No installation trace.",
    "unit": "Unit",
    "ms": "Milliseconds",
    "seconds": "Seconds",
    "table": "View installation data",
    "caption": "Installation diagnostic data",
    "stage": "Stage",
    "duration": "Duration",
    "share": "Share",
    "stages": [
      "Resolve",
      "Download",
      "Transform",
      "Write"
    ]
  },
  "ko": {
    "title": "설치 단계 진단",
    "description": "한 번의 설치에서 순서대로 실행된 각 단계의 소요 시간입니다.",
    "total": "전체 시간",
    "longest": "가장 오래 걸린 단계",
    "empty": "설치 기록이 없습니다.",
    "unit": "단위",
    "ms": "밀리초",
    "seconds": "초",
    "table": "설치 데이터 보기",
    "caption": "설치 단계 진단 데이터",
    "stage": "단계",
    "duration": "소요 시간",
    "share": "비율",
    "stages": [
      "의존성 확인",
      "다운로드",
      "변환",
      "파일 쓰기"
    ]
  },
  "ja": {
    "title": "インストール診断",
    "description": "1回のインストールで順番に実行された各工程の所要時間です。",
    "total": "合計時間",
    "longest": "最長の工程",
    "empty": "インストール記録はありません。",
    "unit": "単位",
    "ms": "ミリ秒",
    "seconds": "秒",
    "table": "インストールデータを表示",
    "caption": "インストール診断データ",
    "stage": "工程",
    "duration": "所要時間",
    "share": "割合",
    "stages": [
      "依存関係",
      "ダウンロード",
      "変換",
      "書き込み"
    ]
  },
  "zh": {
    "title": "安装诊断",
    "description": "一次安装中按顺序执行的各阶段耗时。",
    "total": "总耗时",
    "longest": "最耗时阶段",
    "empty": "暂无安装记录。",
    "unit": "单位",
    "ms": "毫秒",
    "seconds": "秒",
    "table": "查看安装数据",
    "caption": "安装诊断数据",
    "stage": "阶段",
    "duration": "耗时",
    "share": "占比",
    "stages": [
      "解析依赖",
      "下载",
      "转换",
      "写入"
    ]
  }
} as const;

export type InstallDiagnosticPoint = {
  stage: string;
  durationMs: number;
};

export function InstallDiagnosticsChart({
  data,
  locale = "en",
}: {
  data: readonly InstallDiagnosticPoint[];
  locale?: keyof typeof copy;
}) {
  const t = copy[locale];
  const [unit, setUnit] = React.useState<"ms" | "s">("ms");
  const total = data.reduce((sum, row) => sum + row.durationMs, 0);
  const largest = data.length ? data.reduce((best, row) => row.durationMs > best.durationMs ? row : best) : null;
  const format = (value: number) => unit === "ms" ? `${value} ms` : `${(value / 1000).toFixed(2)} s`;

  return (
    <ChartContainer
      data-chart="install-diagnostics"
      title={t.title}
      description={t.description}
      summary={largest ? `${t.total} ${format(total)} · ${t.longest} ${largest.stage} (${format(largest.durationMs)})` : t.empty}
      actions={
        <label className="grid gap-1.5 text-xs">
          {t.unit}
          <Select value={unit} onChange={(event) => setUnit(event.target.value as typeof unit)}>
            <SelectItem value="ms">{t.ms}</SelectItem>
            <SelectItem value="s">{t.seconds}</SelectItem>
          </Select>
        </label>
      }
      tableLabel={t.table}
      emptyLabel={t.empty}
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr><th>{t.stage}</th><th>{t.duration}</th><th>{t.share}</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.stage}><th scope="row">{row.stage}</th><td>{format(row.durationMs)}</td><td>{total ? ((row.durationMs / total) * 100).toFixed(1) + "%" : "—"}</td></tr>)}</tbody>
        </table>
      }
    >
      <BarChart data={data} layout="vertical" accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis type="number" tickFormatter={(value: number) => format(value)} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="stage" width={locale === "en" ? 72 : 88} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartTooltip formatter={(value) => format(Number(value))} />
        <Bar dataKey="durationMs" name={t.duration} fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={42} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
}

const exampleTrace: InstallDiagnosticPoint[] = [
  { stage: "Resolve", durationMs: 120 },
  { stage: "Download", durationMs: 840 },
  { stage: "Transform", durationMs: 210 },
  { stage: "Write", durationMs: 90 },
];

export function InstallDiagnosticsExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  const data = exampleTrace.map((point, index) => ({ ...point, stage: copy[locale].stages[index] }));
  return <InstallDiagnosticsChart data={data} locale={locale} />;
}
