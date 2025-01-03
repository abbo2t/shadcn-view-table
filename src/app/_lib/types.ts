export interface InventoryItem {
    id: number
    unit_number: number
    date: string
    type: string
    item: string | null
    qty: number
    retail_price: number
    retail_extended: number
    position: number
    created_at: string
    updated_at: string
  }