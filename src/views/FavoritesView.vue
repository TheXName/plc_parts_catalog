<template>
  <div>
    <h1 class="mb-4">Favorites</h1>

    <v-row>
      <v-col v-for="item in favItems" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <EquipmentCard
          :item="item"
          :is-favorite="favoritesStore.isFav(item.id)"
          @favorite="onFavorite"
        />
      </v-col>
    </v-row>

    <div v-if="!favItems.length" class="text-medium-emphasis mt-6">You have no favorites yet.</div>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/productsStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import EquipmentCard from '@/components/EquipmentCard.vue'

export default {
  name: 'FavoritesView',
  components: { EquipmentCard },

  computed: {
    productsStore() {
      return useProductsStore()
    },
    favoritesStore() {
      return useFavoritesStore()
    },
    favItems() {
      const byId = this.productsStore.byId
      return this.favoritesStore.ids.map((id) => byId(id)).filter(Boolean)
    },
  },

  methods: {
    onFavorite(id) {
      this.favoritesStore.toggle(id)
    },
  },
}
</script>
