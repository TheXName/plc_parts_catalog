<template>
  <div>
    <h1 class="mb-4">Catalog</h1>

    <FilterBar v-model="filters" :categories="productsStore.categories" class="mb-4" />

    <v-row>
      <v-col v-for="item in visible" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <EquipmentCard
          :item="item"
          :is-favorite="favoritesStore.isFav(item.id)"
          @favorite="onFavorite"
        />
      </v-col>
    </v-row>

    <div v-if="!visible.length" class="text-medium-emphasis mt-6">Nothing found</div>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/productsStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import EquipmentCard from '@/components/EquipmentCard.vue'
import FilterBar from '@/components/FilterBar.vue'

export default {
  name: 'CatalogView',
  components: { EquipmentCard, FilterBar },

  data: () => ({
    filters: { query: '', category: 'All', sort: 'price-asc' },
  }),

  computed: {
    productsStore() {
      return useProductsStore()
    },
    favoritesStore() {
      return useFavoritesStore()
    },

    visible() {
      const q = this.filters.query.trim().toLowerCase()
      const cat = this.filters.category

      const list = this.productsStore.items.filter(
        (p) => (!q || p.name.toLowerCase().includes(q)) && (cat === 'All' || p.category === cat),
      )

      switch (this.filters.sort) {
        case 'price-asc':
          return list.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return list.sort((a, b) => b.price - a.price)
        case 'name-asc':
          return list.sort((a, b) => a.name.localeCompare(b.name))
        case 'name-desc':
          return list.sort((a, b) => b.name.localeCompare(a.name))
        default:
          return list
      }
    },
  },

  methods: {
    onFavorite(id) {
      this.favoritesStore.toggle(id)
    },
  },
}
</script>
