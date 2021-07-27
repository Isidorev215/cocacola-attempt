import { createApp } from 'vue'
import App from './App.vue'
import index from './router/index'
import admin from './router/admin'
import { theAuth } from './firebase/config'
import styles from './styles.css'

const host = window.location.host;
const parts = host.split('.');
const domainLength = 3; // route1.example.com => domain length = 3

const routerSelect = () => {
  let routes;
  if (parts.length === (domainLength - 1) || parts[0] === 'www') {
    routes = index;
  } else if (parts[0] === 'admin' || parts[0] === 'admin-cocacola-attempt') {
    routes = admin;
  } else {
    routes = index;
  }
  return routes;
};
const router = routerSelect(); 

// refreshing problem
let app;
theAuth.onAuthStateChanged(() => {
  if(!app){
    app = createApp(App).use(router).mount('#app')
  }
})

