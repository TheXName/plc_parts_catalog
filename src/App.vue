<template>
  <v-app>
    <AppNav />
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
import AppNav from '@/components/TheNavigation.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { AppNav, AppFooter, RouterView },
}
</script>
