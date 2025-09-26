<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/cart">Cart</router-link>
  </nav>
</template>

<script>
export default { name: 'TheNavigation' }
</script>

<style scoped>
.nav{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;
     padding:12px 20px;border-bottom:1px solid #e5e7eb;background:#fff}
.brand{font-weight:700;text-decoration:none}
.links{display:flex;gap:16px}
.links a{text-decoration:none}
.router-link-active{font-weight:600}
</style>
