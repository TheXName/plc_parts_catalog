<template>
  <div>
    <h1 class="mb-4">Cart</h1>

    <v-card v-for="row in cart.rows" :key="row.id" class="mb-3" variant="outlined">
      <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div class="d-flex flex-column">
          <strong>{{ row.name }}</strong>
          <span class="text-medium-emphasis">{{ row.category }}</span>
        </div>

        <div class="d-flex align-center ga-6">
          <span>{{ row.price.toFixed(2) }} €</span>

          <QuantityStepper
            :model-value="row.qty"
            :min="1"
            :max="row.stock"
            @update:modelValue="onQty(row.id, $event)"
          />

          <span class="text-high-emphasis"> = {{ (row.price * row.qty).toFixed(2) }} € </span>

          <v-btn variant="text" icon="mdi-delete" @click="remove(row.id)" />
        </div>
      </v-card-text>
    </v-card>

    <div v-if="!cart.hasItems" class="text-medium-emphasis">Your cart is empty.</div>
    <v-divider class="my-6" v-if="cart.hasItems" />

    <div v-if="cart.hasItems" class="d-flex align-center justify-space-between">
      <div class="text-h6">Total: {{ cart.totalPrice.toFixed(2) }} €</div>
      <div class="d-flex ga-3">
        <v-btn variant="outlined" @click="clear">Clear</v-btn>
        <v-btn color="primary" @click="checkout">Checkout</v-btn>
      </div>
    </div>

    <v-snackbar v-model="snackbar" timeout="2500">Thank you for your purchase!</v-snackbar>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'
import QuantityStepper from '@/components/QuantityStepper.vue'

export default {
  name: 'CartView',
  components: { QuantityStepper },

  data() {
    return { snackbar: false }
  },

  computed: {
    cart() {
      return useCartStore()
    },
  },

  methods: {
    onQty(id, qty) {
      this.cart.updateQty(id, qty)
    },
    remove(id) {
      this.cart.remove(id)
    },
    clear() {
      this.cart.clear()
    },
    checkout() {
      this.snackbar = true
      this.cart.clear()
    },
  },
}
</script>
