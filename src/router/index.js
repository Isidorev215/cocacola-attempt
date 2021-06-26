import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import('../views/Home.vue')
const Products = () => import('../views/Products.vue')
const Showcase = () => import('../views/Showcase.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { transition: 'homeslide' }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    // meta: { transition: 'productslide' },
  },
  {
    path: '/products/:name',
    name: 'Showcase',
    component: Showcase,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
