import { defineStore } from 'pinia'
import { productsSeed } from '@/data/products'

export const useProductsStore = defineStore('products', {
  state: () => ({ items: productsSeed }),
  getters: {
    categories: (state) => Array.from(new Set(state.items.map((p) => p.category))).sort(),
    byId: (state) => (id) => state.items.find((p) => p.id === Number(id)),
  },
})
