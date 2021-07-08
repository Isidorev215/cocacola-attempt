import { createRouter, createWebHistory } from 'vue-router'
import { theAuth } from '../firebase/config.js'
// import LoginAdmin from '../views/LoginAdmin.vue'
// import Admin from '../views/Admin.vue'
const LoginAdmin = () => import('../views/LoginAdmin.vue')
const Admin = () => import('../views/Admin.vue')

const requireAuth = (to, from, next) => {
  let user = theAuth.currentUser;
  if(!user){
    next({name: "LoginAdmin"})
    console('illegal: are you an admin')
  }else{
    next()
  }
}
const whyDoYouEnterLogin = (to, from, next) => {
  let user = theAuth.currentUser;
  if(user){
    console.log('why do you want to do that?')
    next({name: "Admin", params: {admin: user.uid}})
  }else{
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'LoginAdmin',
    component: LoginAdmin,
    beforeEnter: whyDoYouEnterLogin
  },
  {
    path: '/:admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
