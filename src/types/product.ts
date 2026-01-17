export interface Category {
  id: number
  name: string
  description: string
}

export interface Product {
  id?: number
  name: string
  description: string
  price: number
  stock: number
  category_id: number | null
  category?: Category
  created_at?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
