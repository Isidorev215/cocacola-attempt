import { createRouter, createWebHistory } from 'vue-router'

import Products from '../views/Products.vue'

// Lazy loading
// import Home from '../views/Home.vue'
const Home = () => import('../views/Home.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'homeslide' }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { transition: 'productslide' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
