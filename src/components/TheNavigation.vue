<template>
  <header class="nav">
    <div class="nav__inner">
      <RouterLink class="brand" to="/">PLC Parts</RouterLink>

      <nav class="menu">
        <RouterLink to="/" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/catalog">Catalog</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default { name: 'TheNavigation' }
</script>

<style scoped>
.nav { background:#233745; color:#fff; }
.nav__inner { max-width:1100px; margin:0 auto; padding:0 16px;
  height:56px; display:flex; align-items:center; justify-content:space-between; }
.brand { font-weight:700; }
.menu { display:flex; gap:16px; }
.menu a { color:#fff; opacity:.85; text-decoration:none; padding:8px 6px; border-radius:6px; }
.menu a:hover, .menu a.active, .menu :global(.router-link-active) { opacity:1; background:#2f4556; }
</style>
