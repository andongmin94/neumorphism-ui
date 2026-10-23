import { columnVisibilityFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, tableFeatures, useTable } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, DataTablePagination } from "@/components/ui/data-table";

const data = [{ name: "Atlas" }];

export function SupportedFeatures() {
  const table = useTable({
    features: tableFeatures({ columnVisibilityFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature }),
    data,
    columns: [{ accessorKey: "name" }],
  });
  return <>
    <DataTable table={table} caption="Projects" />
    <DataTableColumnHeader column={table.getAllLeafColumns()[0]} title="Name" />
    <DataTablePagination table={table} />
  </>;
}

export function MissingFeatures() {
  const table = useTable({
    features: tableFeatures({}),
    data,
    columns: [{ accessorKey: "name" }],
  });
  return <>
    {/* @ts-expect-error Rendering requires visibility, selection and sorting features. */}
    <DataTable table={table} caption="Projects" />
    {/* @ts-expect-error Sort controls require the sorting feature. */}
    <DataTableColumnHeader column={table.getAllLeafColumns()[0]} title="Name" />
    {/* @ts-expect-error Pagination controls require the pagination feature. */}
    <DataTablePagination table={table} />
  </>;
}
