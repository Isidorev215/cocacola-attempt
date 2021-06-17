import { createRouter, createWebHistory } from 'vue-router'

import Products from '../views/Products.vue'
import Whatsnew from '../views/Whatsnew.vue'
import Newsletter from '../views/Newsletter.vue'
import Contactus from '../views/Contactus.vue'

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
  },
  {
    path: '/whatsnew',
    name: 'Whatsnew',
    component: Whatsnew
  },
  {
    path: '/newsletter',
    name: 'Newsletter',
    component: Newsletter
  },
  {
    path: '/contactus',
    name: 'Contactus',
    component: Contactus
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
