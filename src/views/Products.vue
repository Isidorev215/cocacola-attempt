<template>
  <div class="products-container">
    <transition-group class="flex-container" tag="ul" appear v-if="cokeImages.length"
      @before-enter="beforeEnter" 
      @enter="enter">
        <li class="dynamic-flex-children" v-for="cokeImage in cokeImages" :key="cokeImage.id">
            <router-link class="hover-on-me" :to="{ name: 'Showcase', params: { id: cokeImage.id, bgColor: cokeImage.backgroundColor }}">
              <img :src="cokeImage.imageUrl" :alt="cokeImage.title" class="can-image">
            </router-link>
          <p>{{cokeImage.title}}</p>
          <img :src="cokeImage.imageUrl" :alt="`${cokeImage.title} small size`" class="can-small-size">
        </li>
    </transition-group>
    <div class="alternate" v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import Spinner from '../components/Spinner'
import anime from 'animejs/lib/anime.es.js';
import getCollection from '../composables/getCollection'
export default {
  name: 'Products',
  setup(){
    useMeta({
      title: "Our Products",
      description: "Eight products: Cherry, Light, Diet, Vanilla, Classic, New, Light and Life. You decide!!!",
    })
  },
  data(){
    return {
      cokeImages: [],
      error: null
    }
  },
  components: {
    Spinner
  },
  mounted(){
    const { documents , collectionError } = getCollection('products')
    this.cokeImages = documents
    this.error = collectionError
    // fetch("http://localhost:3000/cokeImages")
    // .then(res => res.json())
    // .then(data => {
    //   const requireModified = data.map(cokeImage => {
    //     return {...cokeImage, src: require(`../assets/cocacola-cans/${cokeImage.name}.png`)}
    //   })
    //   this.cokeImages = requireModified
    // })
    // .catch(err => {
    //   console.log(err.message)
    // })
  },

  methods: {
    beforeEnter(el){
      el.style.transform = "translateX(-100%)"
      el.style.opacity = 0
    },
    enter(el){
      anime({
        targets: ".dynamic-flex-children",
        duration: 700,
        opacity: 1,
        translateX: 0,
        delay: anime.stagger(100, {start: 100, direction: "reverse"}),
        easing: 'easeInOutSine'
      })
    }
  },

  beforeRouteLeave(to, from, next){
    anime({
      targets: ".dynamic-flex-children",
      duration: 1000,
      translateY: 2500,
      delay: anime.stagger(200, {start: 100, direction: "reverse", easing: 'easeOutQuad'}),
      easing: 'easeInOutSine'
    })
    setTimeout(() => {
      next()
    }, 2050)
  }

}
</script>

<style>
.products-container{
  height: 90vh;
  width: 100vw;
  overflow-y: hidden;
}
.products-container .flex-container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5% 10%;
}
.products-container .dynamic-flex-children{
  list-style-type: none;
  flex-basis: 25%;
  position: relative;
}
.products-container .dynamic-flex-children .can-image{
  width: 50%;
  cursor: pointer;
}
.products-container .dynamic-flex-children p{
  font-size: 0.8rem;
}
.products-container .dynamic-flex-children .can-small-size{
  position: absolute;
  width: 30%;
  left: 50%;
  margin-left: -15%;
  top: 50%;
  margin-top: -20%;
  z-index: -1;
  transition: transform 0.5s ease-in-out;
}
.products-container .can-image:hover ~ .can-small-size, .hover-on-me:hover ~ .can-small-size{
  transform: translate(80px, -30px);
}
.products-container .alternate{
  transform: translateY(200px);
}

/* Media Queries */
@media (max-width: 768px){
  .products-container{
    overflow-y: auto;
  }
  .products-container .dynamic-flex-children{
    flex-basis: 50%;
  }
  .products-container .dynamic-flex-children:nth-child(2n){
    border-left: 1px solid green;
  }
  .products-container .dynamic-flex-children .can-image{
    width: 100%;
  }
  .products-container .dynamic-flex-children p{
    font-size: 1rem;
  }

  .products-container .dynamic-flex-children .can-small-size{
    display: none;
  }
}

@media (max-width: 576px){
  .products-container{
    overflow-y: auto;
  }
  .products-container .dynamic-flex-children{
    flex-basis: 100%;
    border-bottom: 1px solid green;
  }
  .products-container .dynamic-flex-children:nth-child(2n){
    border-left: none;
  }
  .products-container .dynamic-flex-children .can-image{
    width: 70%;
  }
  .products-container .dynamic-flex-children p{
    font-size: 1rem;
  }

  .products-container .dynamic-flex-children .can-small-size{
    display: none;
  }
  
}



</style>