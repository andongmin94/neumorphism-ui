"use client";

import * as React from "react";
import { flexRender, type Column, type Table as TableInstance } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DataTableProps<TData> = { table: TableInstance<TData>; caption: string; emptyMessage?: string; children?: React.ReactNode; className?: string };

// The application owns TanStack state and data access; this component owns rendering.
function DataTable<TData>({ table, caption, emptyMessage = "No results.", children, className }: DataTableProps<TData>) {
  "use no memo"; // The caller-owned TanStack table is a stable mutable handle.
  return <section data-slot="data-table" className={cn("grid min-w-0 w-full gap-4", className)}>
    {children}
    <Table containerProps={{ role: "region", "aria-label": caption, tabIndex: 0, className: "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]" }}>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => {
        const sorted = header.column.getIsSorted();
        return <TableHead key={header.id} colSpan={header.colSpan} scope={header.colSpan > 1 ? "colgroup" : "col"} aria-sort={header.column.getCanSort() ? sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none" : undefined}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
      })}</TableRow>)}</TableHeader>
      <TableBody>{table.getRowModel().rows.length ? table.getRowModel().rows.map(row => <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={Math.max(1, table.getVisibleLeafColumns().length)} className="h-32 text-center"><span role="status">{emptyMessage}</span></TableCell></TableRow>}</TableBody>
    </Table>
  </section>;
}

function DataTableColumnHeader<TData, TValue>({ column, title }: { column: Column<TData, TValue>; title: string }) {
  "use no memo";
  if (!column.getCanSort()) return <span>{title}</span>;
  return <Button variant="ghost" size="sm" className="-ms-3 gap-2 text-inherit" onClick={column.getToggleSortingHandler()}>{title}<span aria-hidden="true" className="w-3">{column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}</span></Button>;
}

type PaginationLabels = { previous: string; next: string; rowsPerPage: string; page: (current: number, total: number) => string };
const defaultLabels: PaginationLabels = { previous: "Previous", next: "Next", rowsPerPage: "Rows per page", page: (current, total) => `Page ${current} of ${total}` };

function DataTablePagination<TData>({ table, labels = defaultLabels, pageSizes = [5, 10, 20, 50] }: { table: TableInstance<TData>; labels?: PaginationLabels; pageSizes?: readonly number[] }) {
  "use no memo";
  const id = React.useId();
  const count = table.getPageCount();
  const size = table.getState().pagination.pageSize;
  const sizes = Array.from(new Set([size, ...pageSizes])).sort((a, b) => a - b);
  return <div data-slot="data-table-pagination" className="flex flex-wrap items-center justify-between gap-3 text-sm">
    <div className="flex items-center gap-2"><label htmlFor={id} className="whitespace-nowrap text-[var(--muted-foreground)]">{labels.rowsPerPage}</label><div className="w-20 shrink-0"><Select id={id} value={size} className="h-9" onChange={event => table.setPageSize(Number(event.target.value))}>{sizes.map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</Select></div></div>
    <div className="flex flex-wrap items-center gap-3"><span aria-live="polite" className="tabular-nums text-[var(--muted-foreground)]">{labels.page(count ? table.getState().pagination.pageIndex + 1 : 0, count)}</span><Button size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>{labels.previous}</Button><Button size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>{labels.next}</Button></div>
  </div>;
}

export { DataTable, DataTableColumnHeader, DataTablePagination };
export type { DataTableProps, PaginationLabels };
