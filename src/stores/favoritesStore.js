import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: [],
  }),
  persist: {
    paths: ['ids'],
  },
  getters: {
    isFav: (state) => (id) => state.ids.includes(Number(id)),
  },
  actions: {
    toggle(id) {
      const n = Number(id)
      if (this.ids.includes(n)) {
        this.ids = this.ids.filter((x) => x !== n)
      } else {
        this.ids.push(n)
      }
    },
  },
})
