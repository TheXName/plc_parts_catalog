// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { useProductsStore } from './productsStore'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // [{ id:number|string, qty:number }]
    items: [],
  }),

  getters: {
    hasItems: (s) => s.items.length > 0,
    totalCount: (s) => s.items.reduce((acc, it) => acc + it.qty, 0),
    byId: (s) => (id) => s.items.find((it) => it.id === id),

    // Склеенные строки для вёрстки
    rows: (s) => {
      const products = useProductsStore().items
      return s.items
        .map((it) => {
          const p = products.find((x) => x.id === it.id)
          return p ? { ...p, qty: it.qty } : null
        })
        .filter(Boolean)
    },

    // Общая сумма
    totalPrice: (s) => {
      const products = useProductsStore().items
      return s.items.reduce((sum, it) => {
        const p = products.find((x) => x.id === it.id)
        return sum + (p ? p.price * it.qty : 0)
      }, 0)
    },
  },

  actions: {
    add(id, qty = 1) {
      const found = this.items.find((it) => it.id === id)
      if (found) found.qty += qty
      else this.items.push({ id, qty })
    },

    updateQty(id, qty) {
      const found = this.items.find((it) => it.id === id)
      if (!found) return
      const n = Math.max(0, Math.floor(Number(qty) || 0))
      if (n === 0) this.remove(id)
      else found.qty = n
    },

    remove(id) {
      this.items = this.items.filter((it) => it.id !== id)
    },

    clear() {
      this.items = []
    },
  },

  // pinia-plugin-persistedstate
  persist: {
    key: 'cart:v1', // версионируй ключ — удобно для будущих миграций
    paths: ['items'],
  },
})
