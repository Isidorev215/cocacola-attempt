<template>
    <nav id="nav">
    
        <transition name="logoAnime" appear v-if="areWeInTheDomain">
        <div class="nav-item logo-home">
            <router-link :to="{ name: 'Home'}">Home</router-link>
        </div>
        </transition>
        <transition name="logoAnime" appear v-if="!areWeInTheDomain">
        <div class="nav-item logo-home">
            <router-link v-if="user" :to="{ name: 'Admin', params: {admin: user.uid}}">Admin</router-link>
            <span v-else>Admin</span>
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
        <ul class="nav-item nav-links " :class="{ nouser: !user }">
            <li v-if="user">Admin: {{user.email}}</li>
            <li><a @click="toMainWebsite">MAIN WEBSITE</a></li>
        </ul>
        </transition>
        
        <transition name="purchaseBtnAnime" appear v-if="areWeInTheDomain">
        <div class="nav-item purchase-btn">
            <router-link :to="{ name: 'Products'}">BUY PRODUCT</router-link>
        </div>
        </transition>

        <transition name="purchaseBtnAnime" appear v-if="!areWeInTheDomain">
        <div class="nav-item purchase-btn" v-if="user">
            <a @click="handleLogout">LOGOUT</a>
        </div>
        </transition>
    
    </nav>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
export default {
  name: 'Navbar',
  data(){
    return {
      areWeInTheDomain: true,
      nextDomainLink: ''
    } 
  },
  setup(props, context){
    const { user } = getUser()
    const handleLogout = async () => {
        const { error, logout } = useLogout()
        await logout()
        if(!error.value){
            console.log('user Logged out')
            context.emit('emitLogout')
        }
    }
    return { handleLogout, user }
  },
  methods: {
    toMainWebsite(){
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
#nav {
  padding: 3% 5% 3%;
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
  background-image: url("../assets/cocacola-logo.png");
  background-size: 90px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 50px;
  display: inline-block;
  text-indent: -9999999px;
}
#nav .logo-home span{
  background-image: url("../assets/cocacola-logo.png");
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
#nav .nav-links.nouser{
  flex: 2;
  display: flex;
  justify-content: flex-end;
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