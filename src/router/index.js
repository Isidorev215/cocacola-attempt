import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Whatsnew from '../views/Whatsnew.vue'
import Newsletter from '../views/Newsletter.vue'
import Contactus from '../views/Contactus.vue'

// const delay = (to, from, next) => {
//   setTimeout(() => {
//     next()
//   }, 2000)
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    // beforeEnter: delay
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
