interface Fridge {
  fridge_id: number
  fridge_name: string
  location: string
  total_items: string
  total_quantity: string
  total_categories: string
}

interface FridgeResponse {
  success: boolean
  message: string
  data: Fridge[]
}

export type { Fridge, FridgeResponse }