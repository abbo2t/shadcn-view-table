import { ColumnDef } from "@tanstack/react-table"
import { type InventoryItem } from "../_lib/types"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Checkbox } from "@/components/ui/checkbox"

export function getColumns(): ColumnDef<InventoryItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      )
    },
    {
      accessorKey: "unit_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unit Number" />
      )
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      )
    },
    {
      accessorKey: "qty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      )
    },
    {
      accessorKey: "retail_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Retail Price" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("retail_price"))
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      }
    },
    {
      accessorKey: "retail_extended",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Extended Price" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("retail_extended"))
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      }
    }
  ]
}