<template>
  <nav id="nav">
    
    <transition name="logoAnime" appear v-if="areWeInTheDomain">
      <div class="nav-item logo-home">
        <router-link :to="{ name: 'Home'}">Home</router-link>
      </div>
    </transition>
    <transition name="logoAnime" appear v-if="!areWeInTheDomain">
      <div class="nav-item logo-home">
        <router-link :to="{ name: 'Adminauth'}">Admin Login</router-link>
      </div>
    </transition>

    <transition name="navLinksAnime" appear v-if="areWeInTheDomain">
      <ul class="nav-item nav-links">
        <li><router-link :to="{ name: 'Products'}">PRODUCTS</router-link></li>
        <li><a>WHAT'S NEW</a></li>
        <li><a>NEWSLETTER</a></li>
        <li><a>CONTACT US</a></li>
      </ul>
    </transition>
    <transition name="navLinksAnime" appear v-if="!areWeInTheDomain">
      <ul class="nav-item nav-links">
        <li><router-link :to="{ name: 'Admin'}">ADMIN</router-link></li>
        <li><a @click="mainWebsite">MAIN WEBSITE</a></li>
      </ul>
    </transition>
    
    <transition name="purchaseBtnAnime" appear v-if="areWeInTheDomain">
      <div class="nav-item purchase-btn">
        <router-link :to="{ name: 'Products'}">BUY PRODUCT</router-link>
      </div>
    </transition>

    <transition name="purchaseBtnAnime" appear v-if="!areWeInTheDomain">
      <div class="nav-item purchase-btn">
        <router-link :to="{ name: 'Adminauth'}">LOGIN</router-link>
      </div>
    </transition>
    
  </nav>

  <!-- <router-view :key="$route.path" /> -->
  <router-view />

  <!-- <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->

</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      areWeInTheDomain: true,
      nextDomainLink: ''
    } 
  },
  methods: {
    mainWebsite(){
      window.location.assign(this.nextDomainLink)
    }
  },
  created(){
    const host =  window.location.host;
    const parts = host.split('.'); 
    const domainLength = 3;

    // variables used to assign this.nextdomainlink
    let copyParts = [...parts]
    let tempDomainLink = ''

    // get the particulat protocol
    const protocol = window.location.protocol

    if (parts.length === (domainLength - 1) || parts[0] === 'www'){
      this.areWeInTheDomain = true

      if (parts.length === (domainLength - 1)){ 
        copyParts.unshift('admin')
        tempDomainLink = copyParts.join('.')
      }
      if (parts[0] === 'www'){
        copyParts[0] = 'admin'
        tempDomainLink = copyParts.join('.')
      }
      
    } 
    else if (parts[0] === 'admin'){
      this.areWeInTheDomain = false
      copyParts.shift()
      tempDomainLink = copyParts.join('.')
    } 
    else {
      this.areWeInTheDomain = true
    }
    
    // check for the protocol to know which to use
    if (protocol === "http:"){
      this.nextDomainLink = `http://${tempDomainLink}`
    }
    if (protocol === "https:"){
      this.nextDomainLink = `https://${tempDomainLink}`
    }
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
#nav {
  padding: 3% 5% 0;
  position: relative;
  z-index: 1000;
  height: 10vh;
}
#nav .nav-item a {
  font-weight: light;
  font-size: 0.6rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: rgb(116, 10, 10);
}

/* My styling comes in */
#nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav .logo-home{
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
#nav .logo-home a{
  background-image: url("./assets/cocacola-logo.png");
  background-size: 90px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 50px;
  display: inline-block;
  text-indent: -9999999px;
}

#nav .nav-links{
  flex: 2;
  display: flex;
  justify-content: space-between;
  list-style: none;
}
#nav .purchase-btn{
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
#nav .purchase-btn a{
  border: 2px solid white;
  border-radius: 25px;
  padding: 4% 7%;
}
#nav .purchase-btn a:hover{
  background-color: rgb(255, 54, 54);
} 
#nav .purchase-btn a.router-link-exact-active{
  color: white;
  border: 2px solid rgb(255, 54, 54);
}

/* Animation things */
.logoAnime-enter-from{
  opacity: 0;
  transform: translateX(-100%);
}
.logoAnime-enter-active{
  transition: all 1.1s ease;
}

.navLinksAnime-enter-from{
  opacity: 0;
  transform: translateY(-100%);
}
.navLinksAnime-enter-active{
  transition: all 1.1s ease;
}

.purchaseBtnAnime-enter-from{
  opacity: 0;
  transform: translateX(100%);
}
.purchaseBtnAnime-enter-active{
  transition: all 1.3s ease;
}

/* route transition - homeslide and productSlide*/
/* .homeslide-leave-to{
  transform: translateY(100%);
}
.homeslide-leave-active{
  transition: all 0.1s ease-out;
}
.productslide-leave-to{
  transform: translateY(100%);
}
.productslide-leave-active{
  transition: all 0.1s ease-out;
} */
</style>
