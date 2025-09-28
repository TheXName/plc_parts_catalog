import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/catalog',
    name: 'catalog.view',
    component: () => import('@/views/CatalogView.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites.view',
    component: () => import('@/views/FavoritesView.vue'),
  },
  {
    path: '/cart',
    name: 'cart.view',
    component: () => import('@/views/CartView.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
