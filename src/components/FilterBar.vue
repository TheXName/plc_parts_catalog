<template>
  <v-card flat>
    <v-card-text class="py-2">
      <div class="d-flex flex-wrap ga-4">
        <v-text-field
          v-model="query"
          label="Search"
          variant="outlined"
          density="comfortable"
          clearable
          hide-details
        />

        <v-select
          v-model="category"
          :items="categoryItems"
          label="Category"
          variant="outlined"
          density="comfortable"
          hide-details
        />

        <v-select
          v-model="sort"
          :items="sortOptions"
          item-title="label"
          item-value="value"
          label="Sort"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
const SORT_OPTIONS = [
  { label: 'Price ↑', value: 'price-asc' },
  { label: 'Price ↓', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name-asc' },
  { label: 'Name Z–A', value: 'name-desc' },
]

export default {
  name: 'FilterBar',
  props: {
    modelValue: { type: Object, required: true },
    categories: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue'],

  computed: {
    query: {
      get() {
        return this.modelValue.query
      },
      set(v) {
        this.update('query', v)
      },
    },
    category: {
      get() {
        return this.modelValue.category
      },
      set(v) {
        this.update('category', v)
      },
    },
    sort: {
      get() {
        return this.modelValue.sort
      },
      set(v) {
        this.update('sort', v)
      },
    },

    categoryItems() {
      return ['All', ...this.categories]
    },
    sortOptions() {
      return SORT_OPTIONS
    },
  },

  methods: {
    update(key, val) {
      this.$emit('update:modelValue', { ...this.modelValue, [key]: val })
    },
  },
}
</script>
