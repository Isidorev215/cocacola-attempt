import { createRouter, createWebHistory } from 'vue-router'


const Adminauth = () => import('../views/Adminauth.vue')
const Admin = () => import('../views/Admin.vue')

const routes = [
  {
    path: '/',
    name: 'Adminauth',
    component: Adminauth
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
