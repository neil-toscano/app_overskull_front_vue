import { defineStore } from 'pinia'
import api from '@/lib/axios'
import type { Product, ApiResponse } from '@/types/product'
import { toast } from 'vue-sonner'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get<ApiResponse<Product[]>>('/products')
        if (data.success) {
          this.products = data.data
        }
      } catch (err) {
        console.log(err)
        this.error = 'No se pudo conectar con el servidor'
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData: Product) {
      this.loading = true
      try {
        const { data } = await api.post<ApiResponse<Product>>('/products', productData)
        if (data.success) {
          this.products.unshift(data.data) // Agrega al inicio de la lista
          toast.success('¡Éxito!', { description: data.message })
          return true
        }
        return false
      } catch (err) {
        console.log(err)
        return false
      } finally {
        this.loading = false
      }
    },
  },
})
