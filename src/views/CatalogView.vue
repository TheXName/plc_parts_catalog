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
          @add-to-cart="onAdd"
        />
      </v-col>
    </v-row>

    <div v-if="!visible.length" class="text-medium-emphasis mt-6">Nothing found</div>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/productsStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'
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
    cartStore() {
      return useCartStore()
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

  watch: {
    '$route.query.category': {
      immediate: true,
      handler() {
        const cat = this.$route.query.category
        this.filters.category = cat && this.productsStore.categories.includes(cat) ? cat : 'All'
      },
    },
    'filters.category'(val) {
      const q = { ...this.$route.query }
      if (val && val !== 'All') q.category = val
      else delete q.category
      this.$router.replace({ name: 'catalog', query: q })
    },
  },

  methods: {
    onFavorite(id) {
      this.favoritesStore.toggle(id)
    },
    onAdd(id) {
      this.cartStore.add(id, 1)
    },
  },
}
</script>
