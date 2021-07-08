<template>
  <Navbar @emitLogout="logout" />

  <!-- <router-view :key="$route.path" /> -->
  <router-view />

  <!-- <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->

</template>

<script>
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },
  setup(){
    const router = useRouter()
    const logout = () => {
      router.push({name: 'LoginAdmin'})
    }
    return { logout }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  height: 100vh;
}

</style>
