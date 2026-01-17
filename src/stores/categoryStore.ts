import { defineStore } from 'pinia'
import api from '@/lib/axios'
import type { Category, ApiResponse } from '@/types/product'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const { data } = await api.get<ApiResponse<Category[]>>('/categories')
        if (data.success) {
          this.categories = data.data
        }
      } catch (err) {
        console.log(err)
        this.error = 'Error al cargar categorías'
      } finally {
        this.loading = false
      }
    },
  },
})
