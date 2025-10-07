<template>
  <v-app>
    <TheNavigation />
    <v-main>
      <v-container class="py-8">
        <RouterView />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router'
import TheNavigation from '@/components/TheNavigation.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'App',
  components: { TheNavigation, AppFooter, RouterView },
}
</script>
