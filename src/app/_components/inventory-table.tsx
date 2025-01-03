"use client"

import * as React from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { TableInstanceProvider } from "../../components/data-table/table-instance-provider"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Table } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTable } from "@/components/data-table/data-table"

import { getColumns } from "./inventory-table-columns"
import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"
import { getInventoryItems } from "../_lib/queries"
import { type InventoryItem } from "../_lib/types"

interface InventoryTableProps {
  inventoryItems: {
    data: InventoryItem[]
    total: number
  }
}

export function InventoryTable({ inventoryItems }: InventoryTableProps) {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  // Table states
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Create table instance
  const table = useReactTable({
    data: inventoryItems.data,
    columns: getColumns(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
      >
      </DataTable>
    </TableInstanceProvider>
  )
}