<template>
  <v-card class="h-100">
    <v-img :src="item.image || placeholder" :alt="item.name" height="220" />

    <v-card-title class="py-3">
      <div class="text-truncate" :title="item.name">{{ item.name }}</div>
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ item.category }}
    </v-card-subtitle>

    <v-card-text class="pt-2">
      <strong>{{ priceText }}</strong>
    </v-card-text>

    <v-card-actions class="pt-0">
      <v-btn
        variant="tonal"
        prepend-icon="mdi-cart-plus"
        :disabled="item.stock === 0"
        @click="$emit('add-to-cart', item.id)"
      >
        Add
      </v-btn>

      <v-spacer />

      <v-btn
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click="$emit('favorite', item.id)"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EquipmentCard',
  props: {
    item: {
      type: Object,
      required: true,
      validator(i) {
        const hasBase =
          i &&
          typeof i.id !== 'undefined' &&
          typeof i.name === 'string' &&
          typeof i.category === 'string' &&
          (typeof i.price === 'number' || !isNaN(Number(i.price)))

        if (!hasBase) return false

        if (typeof i.stock !== 'undefined') {
          const n = Number(i.stock)
          if (!Number.isFinite(n) || n < 0) return false
        }

        return true
      },
    },
    isFavorite: { type: Boolean, default: false },
    currency: { type: String, default: '€' },
  },
  emits: ['favorite', 'add-to-cart'],
  computed: {
    priceText() {
      const n = Number(this.item?.price ?? 0)
      return `${n.toFixed(2)} ${this.currency}`
    },
    placeholder() {
      return 'https://via.placeholder.com/600x400?text=PLC+Part'
    },
  },
}
</script>

<style scoped>
.text-truncate { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.h-100 { height: 100%; }
</style>
