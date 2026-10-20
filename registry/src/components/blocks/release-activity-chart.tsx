"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

const copy = {
  "en": {
    "title": "Release activity",
    "description": "New installs and updates by release. Counts are events, not unique users.",
    "total": "Total activity",
    "updateShare": "Update share",
    "empty": "No release activity.",
    "view": "View",
    "count": "Event counts",
    "share": "Share per release",
    "table": "View release data",
    "caption": "Release activity data",
    "release": "Release",
    "installs": "New installs",
    "updates": "Updates"
  },
  "ko": {
    "title": "릴리스 활동",
    "description": "릴리스별 신규 설치와 업데이트 건수입니다. 고유 사용자 수가 아닌 이벤트 수입니다.",
    "total": "전체 활동",
    "updateShare": "업데이트 비율",
    "empty": "릴리스 활동이 없습니다.",
    "view": "보기 방식",
    "count": "이벤트 수",
    "share": "릴리스별 비율",
    "table": "릴리스 데이터 보기",
    "caption": "릴리스 활동 데이터",
    "release": "릴리스",
    "installs": "신규 설치",
    "updates": "업데이트"
  },
  "ja": {
    "title": "リリースの利用状況",
    "description": "リリース別の新規インストールと更新件数です。人数ではなくイベント数です。",
    "total": "合計イベント",
    "updateShare": "更新の割合",
    "empty": "リリースの利用記録はありません。",
    "view": "表示方法",
    "count": "イベント数",
    "share": "リリース別の割合",
    "table": "リリースデータを表示",
    "caption": "リリース利用状況データ",
    "release": "リリース",
    "installs": "新規インストール",
    "updates": "更新"
  },
  "zh": {
    "title": "版本活动",
    "description": "各版本的新安装和更新次数。计数为事件数，而非独立用户数。",
    "total": "总活动数",
    "updateShare": "更新占比",
    "empty": "暂无版本活动。",
    "view": "显示方式",
    "count": "事件数",
    "share": "各版本占比",
    "table": "查看版本数据",
    "caption": "版本活动数据",
    "release": "版本",
    "installs": "新安装",
    "updates": "更新"
  }
} as const;

export type ReleaseActivityPoint = {
  release: string;
  installs: number;
  updates: number;
};

export function ReleaseActivityChart({
  data,
  locale = "en",
}: {
  data: readonly ReleaseActivityPoint[];
  locale?: keyof typeof copy;
}) {
  const t = copy[locale];
  const [view, setView] = React.useState<"count" | "share">("count");
  const installs = data.reduce((sum, row) => sum + row.installs, 0);
  const updates = data.reduce((sum, row) => sum + row.updates, 0);
  const total = installs + updates;

  return (
    <ChartContainer
      data-chart="release-activity"
      title={t.title}
      description={t.description}
      summary={data.length ? `${t.total} ${total.toLocaleString(locale)} · ${t.updateShare} ${total ? ((updates / total) * 100).toFixed(1) : "0.0"}%` : t.empty}
      actions={
        <label className="grid gap-1.5 text-xs">
          {t.view}
          <Select value={view} onChange={(event) => setView(event.target.value as typeof view)}>
            <SelectItem value="count">{t.count}</SelectItem>
            <SelectItem value="share">{t.share}</SelectItem>
          </Select>
        </label>
      }
      tableLabel={t.table}
      emptyLabel={t.empty}
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr><th>{t.release}</th><th>{t.installs}</th><th>{t.updates}</th><th>{t.updateShare}</th></tr></thead>
          <tbody>{data.map((row) => {
            const rowTotal = row.installs + row.updates;
            return <tr key={row.release}><th scope="row">{row.release}</th><td>{row.installs}</td><td>{row.updates}</td><td>{rowTotal ? ((row.updates / rowTotal) * 100).toFixed(1) + "%" : "—"}</td></tr>;
          })}</tbody>
        </table>
      }
    >
      <AreaChart data={data} stackOffset={view === "share" ? "expand" : "none"} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="release" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={view === "share" ? [0, 1] : [0, "auto"]} width={52} tickFormatter={(value: number) => view === "share" ? `${Math.round(value * 100)}%` : String(value)} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartLegend />
        <ChartTooltip formatter={(value) => Number(value).toLocaleString(locale)} />
        <Area dataKey="installs" name={t.installs} legendType="plainline" stackId="activity" stroke="var(--foreground)" fill="var(--primary)" fillOpacity={0.22} strokeWidth={2} isAnimationActive={false} />
        <Area dataKey="updates" name={t.updates} legendType="plainline" stackId="activity" stroke="var(--muted-foreground)" fill="var(--muted)" fillOpacity={0.8} strokeWidth={2} strokeDasharray="6 4" isAnimationActive={false} />
      </AreaChart>
    </ChartContainer>
  );
}

const exampleActivity: ReleaseActivityPoint[] = [
  { release: "R1", installs: 148, updates: 62 },
  { release: "R2", installs: 232, updates: 104 },
  { release: "R3", installs: 196, updates: 88 },
  { release: "R4", installs: 284, updates: 132 },
  { release: "R5", installs: 341, updates: 176 },
  { release: "R6", installs: 378, updates: 209 },
];

export function ReleaseActivityExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  return <ReleaseActivityChart data={exampleActivity} locale={locale} />;
}
