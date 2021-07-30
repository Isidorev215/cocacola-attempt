<template>
  <metainfo>
    <template v-slot:title="{content}">{{content}} - Fizz in Eight Different Cans  | Cocacola</template>
  </metainfo>
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
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },
  setup(){
    //vue-meta
    useMeta({
      title: 'Cocacola App',
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      script: [{
        type: "application/Id+json",
        json: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://cocacola-attempt.web.app",
          "logo": "https://firebasestorage.googleapis.com/v0/b/cocacola-attempt.appspot.com/o/Images%2FHomePoster%2Fcocacola-logo.png?alt=media&token=0fa005dd-e651-49ea-883a-ec21caef9d67"
        }
      }],
      og: {
        title: "Cocacola-attempt",
        description: "This is a cocacola-attempt project by Isidorev215",
        image: "https://firebasestorage.googleapis.com/v0/b/cocacola-attempt.appspot.com/o/Images%2FHomePoster%2Fcocacola-attempt-poster.JPG?alt=media&token=4b4dfcef-0bd3-48f6-a5fa-429be3f01a62",
        url: "https://cocacola-attempt.web.app"
      },
      twitter: {
        title: "Cocacola-attempt",
        description: "This is a cocacola-attempt project by Isidorev215",
        image: "https://firebasestorage.googleapis.com/v0/b/cocacola-attempt.appspot.com/o/Images%2FHomePoster%2Fcocacola-attempt-poster.JPG?alt=media&token=4b4dfcef-0bd3-48f6-a5fa-429be3f01a62",
        url: "https://cocacola-attempt.web.app"
      }
    })

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
