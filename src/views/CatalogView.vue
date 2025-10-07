<template>
  <div>
    <h1 class="mb-4">Catalog</h1>

    <v-row>
      <v-col v-for="item in products" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <EquipmentCard
          :item="item"
          :is-favorite="favoritesStore.isFav(item.id)"
          @favorite="onFavorite"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/productsStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import EquipmentCard from '@/components/EquipmentCard.vue'

export default {
  name: 'CatalogView',
  components: { EquipmentCard },

  computed: {
    products() {
      return useProductsStore().items
    },
    favoritesStore() {
      return useFavoritesStore()
    },
  },

  methods: {
    onFavorite(id) {
      this.favoritesStore.toggle(id)
    },
  },
}
</script>
