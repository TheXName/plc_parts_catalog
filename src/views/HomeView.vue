<template>
  <div>
    <v-sheet class="py-10">
      <v-container>
        <h1 class="text-h4 text-md-h3 d-flex align-center mb-2">
          <v-icon size="36" class="mr-2">mdi-chip</v-icon>
          PLC Parts Catalog
        </h1>
        <p class="text-medium-emphasis mb-6">
          Catalog of sensors for industrial equipment and PLCs
        </p>
        <div class="d-flex ga-3">
          <v-btn color="primary" prepend-icon="mdi-view-grid-outline" :to="{ name: 'catalog' }">
            Browse Catalog
          </v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-cart" :to="{ name: 'cart' }">
            View Cart
          </v-btn>
        </div>
      </v-container>
    </v-sheet>

    <v-container class="py-8">
      <h2 class="text-h5 mb-3 d-flex align-center">
        <v-icon class="mr-2">mdi-shape</v-icon>
        Categories
      </h2>

      <v-row>
        <v-col v-for="cat in categories" :key="cat" cols="12" sm="6" md="3">
          <v-card
            hover
            variant="outlined"
            class="d-flex align-center justify-space-between px-4 py-4"
            :to="{ name: 'catalog', query: { category: cat } }"
          >
            <div>
              <div class="text-subtitle-1">{{ cat }}</div>
              <div class="text-caption text-medium-emphasis">Browse items</div>
            </div>
            <v-icon size="28">{{ iconFor(cat) }}</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/productsStore'

export default {
  name: 'HomeView',
  computed: {
    productsStore() {
      return useProductsStore()
    },
    categories() {
      return this.productsStore.categories
    },
  },
  methods: {
    iconFor(cat) {
      const map = {
        'Level Measurement': 'mdi-wave',
        'Pressure Transmitter': 'mdi-gauge',
        'Temperature Sensor': 'mdi-thermometer',
        'Flow Meter': 'mdi-water',
      }
      return map[cat] || 'mdi-shape'
    },
  },
}
</script>
