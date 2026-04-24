export interface Proudct {
    product_id: number
    category_id: number
    name: string
    quantity: number
    unit: string
    expiry_date: string
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Proudct[];
}