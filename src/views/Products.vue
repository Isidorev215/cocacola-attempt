<template>
  <div class="products-container">
    <transition-group class="flex-container" tag="ul" appear 
      @before-enter="beforeEnter" 
      @enter="enter">
        <li class="dynamic-flex-children" v-for="cokeImage in cokeImages" :key="cokeImage.id">
          <img :src="cokeImage.src" :alt="cokeImage.title" class="can-image">
          <p>{{cokeImage.title}}</p>
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
      cokeImages: [
        { title: 'Cocacola Life', src: require('@/assets/cocacola-cans/cocacola-life.png'), id: 1 },
        { title: 'Cocacola Zero', src: require('@/assets/cocacola-cans/cocacola-zero.png'), id: 2 },
        { title: 'Diet Coke', src: require('@/assets/cocacola-cans/diet-coke.png'), id: 3 },
        { title: 'Cocacola Classic', src: require('@/assets/cocacola-cans/classic-coke-two.png'), id: 4 },
        { title: 'New Cocacola', src: require('@/assets/cocacola-cans/classic-cocacola.png'), id: 5 },
        { title: 'Vanilla', src: require('@/assets/cocacola-cans/cocacola-vanilla.png'), id: 6 },
        { title: 'Cocacola Light', src: require('@/assets/cocacola-cans/cocacola-light.png'), id: 7 },
        { title: 'Cocacola Cherry', src: require('@/assets/cocacola-cans/cocacola-cherry.png'), id: 8 }
      ]
    }
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
      translateY: 1000,
      delay: anime.stagger(200, {start: 100, direction: "reverse", easing: 'easeOutQuad'}),
      easing: 'easeInOutSine'
    })
    console.log("this")
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
.flex-container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5% 10%;
}
.dynamic-flex-children{
  list-style-type: none;
  flex-basis: 25%;
}
.dynamic-flex-children img{
  width: 40%;
}
.dynamic-flex-children p{
  font-size: 0.7rem;
}

</style>