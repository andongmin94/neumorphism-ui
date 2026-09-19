"use client";

import * as React from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, DataTablePagination } from "@neumorphism-ui/registry/ui/data-table";
import { Checkbox } from "@neumorphism-ui/registry/ui/checkbox";
import { Input } from "@neumorphism-ui/registry/ui/input";
import { Select, SelectItem } from "@neumorphism-ui/registry/ui/select";
import { Button } from "@neumorphism-ui/registry/ui/button";

type Project = { id: string; name: string; status: "active" | "paused"; seats: number };
const data: Project[] = [
  { id: "p1", name: "Atlas", status: "active", seats: 12 },
  { id: "p2", name: "Beacon", status: "paused", seats: 4 },
  { id: "p3", name: "Cedar", status: "active", seats: 8 },
  { id: "p4", name: "Delta", status: "active", seats: 20 },
  { id: "p5", name: "Echo", status: "paused", seats: 6 },
  { id: "p6", name: "Foxtrot", status: "active", seats: 16 },
  { id: "p7", name: "Grove", status: "active", seats: 3 },
  { id: "p8", name: "Harbor", status: "paused", seats: 10 },
];
const copy = {
  en: { name: "Project", status: "Status", seats: "Seats", search: "Search projects", all: "All statuses", active: "Active", paused: "Paused", selectPage: "Select current page", select: "Select", selected: "Selected across all pages", clear: "Clear selection", empty: "No matching projects.", caption: "Workspace projects — illustrative data", previous: "Previous", next: "Next", rows: "Rows per page", page: "Page" },
  ko: { name: "프로젝트", status: "상태", seats: "좌석", search: "프로젝트 검색", all: "전체 상태", active: "활성", paused: "일시 중지", selectPage: "현재 페이지 전체 선택", select: "선택", selected: "전체 페이지에서 선택됨", clear: "선택 해제", empty: "일치하는 프로젝트가 없습니다.", caption: "워크스페이스 프로젝트 — 예시 데이터", previous: "이전", next: "다음", rows: "페이지당 행", page: "페이지" },
  ja: { name: "プロジェクト", status: "状態", seats: "座席", search: "プロジェクトを検索", all: "すべての状態", active: "有効", paused: "一時停止", selectPage: "現在のページを選択", select: "選択", selected: "全ページの選択数", clear: "選択解除", empty: "一致するプロジェクトはありません。", caption: "ワークスペース — サンプルデータ", previous: "前へ", next: "次へ", rows: "ページあたりの行", page: "ページ" },
  zh: { name: "项目", status: "状态", seats: "座位", search: "搜索项目", all: "全部状态", active: "活跃", paused: "暂停", selectPage: "选择当前页", select: "选择", selected: "所有页面已选", clear: "清除选择", empty: "没有匹配的项目。", caption: "工作区项目 — 示例数据", previous: "上一页", next: "下一页", rows: "每页行数", page: "页" },
};

export default function DataTableExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  const text = copy[locale];
  const columns = React.useMemo<ColumnDef<Project>[]>(() => [
    { id: "selection", enableSorting: false, enableGlobalFilter: false,
      header: ({ table }) => <Checkbox aria-label={text.selectPage} checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false} onCheckedChange={checked => table.toggleAllPageRowsSelected(checked === true)} />,
      cell: ({ row }) => <Checkbox aria-label={`${text.select} ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={checked => row.toggleSelected(checked === true)} /> },
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title={text.name} /> },
    { accessorKey: "status", header: text.status, enableSorting: false, filterFn: "equalsString", cell: ({ row }) => <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium"><span aria-hidden="true">{row.original.status === "active" ? "●" : "Ⅱ"}</span>{text[row.original.status]}</span> },
    { accessorKey: "seats", header: ({ column }) => <DataTableColumnHeader column={column} title={text.seats} />, cell: ({ row }) => <span className="tabular-nums">{row.original.seats}</span> },
  ], [text]);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageIndex: 0, pageSize: 5 } } });
  return <div className="grid w-full min-w-0 gap-4">
    <DataTable table={table} caption={text.caption} emptyMessage={text.empty}>
      <div className="flex flex-wrap items-center gap-3"><Input aria-label={text.search} placeholder={text.search} className="min-w-0 flex-1 basis-44" value={(table.getState().globalFilter as string) ?? ""} onChange={event => { table.setGlobalFilter(event.target.value); table.setPageIndex(0); }} /><div className="w-40 max-w-full"><Select aria-label={text.status} value={(table.getColumn("status")?.getFilterValue() as string) ?? ""} onChange={event => { table.getColumn("status")?.setFilterValue(event.target.value || undefined); table.setPageIndex(0); }}><SelectItem value="">{text.all}</SelectItem><SelectItem value="active">{text.active}</SelectItem><SelectItem value="paused">{text.paused}</SelectItem></Select></div></div>
    </DataTable>
    <div className="flex flex-wrap items-center justify-between gap-2"><output data-testid="selected-rows" className="text-sm text-[var(--muted-foreground)]">{text.selected}: {table.getSelectedRowModel().rows.length}</output><Button variant="ghost" size="sm" disabled={!table.getSelectedRowModel().rows.length} onClick={() => table.resetRowSelection()}>{text.clear}</Button></div>
    <DataTablePagination table={table} labels={{ previous: text.previous, next: text.next, rowsPerPage: text.rows, page: (current, total) => `${text.page} ${current} / ${total}` }} />
  </div>;
}
