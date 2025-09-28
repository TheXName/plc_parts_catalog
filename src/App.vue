<template>
  <TheNavigation />
  <main class="container">
    <router-view />
  </main>
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue'
export default{
  name: 'App',
  components: {
    TheNavigation,
  }
}
</script>

<style>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}
</style>
