<template>
  <v-app-bar flat>
    <v-container class="d-flex align-center justify-space-between" fluid>
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-chip</v-icon>
        <RouterLink to="/" class="brand"> PLC Parts </RouterLink>
      </div>

      <div class="d-flex align-center">
        <v-btn variant="text" :to="{ name: 'home' }">Home</v-btn>
        <v-btn variant="text" :to="{ name: 'catalog' }">Catalog</v-btn>
        <v-btn variant="text" :to="{ name: 'favorites' }">Favorites</v-btn>
        <v-btn variant="text" :to="{ name: 'cart' }">Cart</v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppNav',
  components: { RouterLink },
}
</script>

<style scoped>
.brand {
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  color: inherit;
}
.mr-2 {
  margin-right: 0.5rem;
}
</style>
