<template>
  <div class="products-container">
    <transition-group class="flex-container" tag="ul" appear 
      @before-enter="beforeEnter" 
      @enter="enter">
        <li class="dynamic-flex-children" v-for="cokeImage in cokeImages" :key="cokeImage.id">
            <router-link class="hover-on-me" :to="{ name: 'Showcase', params: { name: cokeImage.name }}">
              <img :src="cokeImage.src" :alt="cokeImage.title" class="can-image">
            </router-link>
          <p>{{cokeImage.title}}</p>
          <img :src="cokeImage.src" :alt="`${cokeImage.title} small size`" class="can-small-size">
        </li>
    </transition-group>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
  name: 'Products',
  data(){
    return {
      cokeImages: []
    }
  },
  mounted(){
    fetch("http://localhost:3000/cokeImages")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const requireModified = data.map(cokeImage => {
        return {...cokeImage, src: require(`../assets/cocacola-cans/${cokeImage.name}.png`)}
      })
      this.cokeImages = requireModified
      // console.log(modifiedArray)
      // console.log(this.cokeImages)
    })
    .catch(err => {
      console.log(err.message)
    })
  },
  // computed: {
  //   stringCokeImages(){
  //     return JSON.stringify(this.cokeImages)
  //   }
  // },

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
      translateY: 1000,
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


</style>