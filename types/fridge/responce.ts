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

interface FridgeProduct {
  id: number
  products_name: string
  category_id: number
  categories_name: string
  quantity: string
  unit: string
  expiry_date: string
  status: string
  icon: string
}

interface FridgeProductResponse {
  success: boolean
  message: string
  data: FridgeProduct[]
}

export type { Fridge, FridgeResponse, FridgeProduct, FridgeProductResponse }