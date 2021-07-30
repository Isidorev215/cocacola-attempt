<template>
  <main id="landing-page">
    <transition appear @before-enter="beforeEnterImg" @enter="enterImg">
      <img class="center-coke-img" src="../assets/cocacola-classic.png" alt="Classic Cocacola can">
    </transition>

    <transition-group tag="section" class="main-section grid-container" appear 
      @before-enter="beforeEnter" @enter="enter">

      <article class="item1 grid-children" key="1">
        <h1>Things go better with Coke.</h1>
        <h6>All your favourite flavour. The gang all here compare flavours, get numerous faces and check out ingredients</h6>
        <button class="to-product-route" @click="toProducts">VIEW PRODUCT</button>
      </article>

      <aside class="item2 grid-children" key="2">
        <Textcarousel/>
      </aside>
      
      <div class="item3 grid-children" key="3">
        <video ref="vid" autoplay loop>
          <source src="https://firebasestorage.googleapis.com/v0/b/cocacola-attempt.appspot.com/o/videos%2FProjectVideos%2Fpouring-coke-1-videvo-compressed.mp4?alt=media&token=66861f48-4592-4bdc-93f8-44e4ecda04ce" type="video/mp4">
        </video>
        <button @click="toggleplay">
          <span v-if="isPlaying" class="material-icons">pause</span>
          <span v-else class="material-icons">play_arrow</span>
        </button>
        <div class="inner-text">
          <h4>COKE ZERO</h4>
          <p>Loremi ipsum dolor sit amet consectetur adipisicing eliti. Aspernatur autem similique qui recusandae doloremque perferendis!</p>
        </div>
      </div>
      
      <div class="item4 grid-children" key="4">
        <div class="inner-text">
          <h4>COKE HISTORY</h4>
          <p>Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!</p>
        </div>
      </div>

    </transition-group>
  </main>
</template>

<script>
import { useMeta } from 'vue-meta'
import anime from 'animejs/lib/anime.es.js';
import Textcarousel from '@/components/Textcarousel.vue'
export default {
  name: 'Home',
  components: { Textcarousel },
  setup(){
    useMeta({
      title: "Cocacola",
      description: "Cocacola, I love this drink! Grab a can of Cocacola from our eight products now. What are you waiting for?",
    })
  },
  data(){
    return{
      isPlaying: true
    }
  },
  methods: {
    toProducts(){
      this.$router.push({ name: 'Products'})
    },
    toggleplay(){
      if(this.$refs.vid.paused){
        this.$refs.vid.play()
        this.isPlaying = true
      }else{
        this.$refs.vid.pause()
        this.isPlaying = false
      }
    },
    
    beforeEnterImg(el){
      el.style.transform = "translateY(100%)"
      el.style.opacity = 0
    },
    enterImg(el){
      anime({
        targets: el,
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: 500,
        easing: 'easeInOutSine'
      })
    },

    beforeEnter(el){
      el.style.transform = "translateY(100%)"
      el.style.opacity = 0
    },
    enter(el){
      anime({
        targets: '.grid-children',
        translateY: 0,
        opacity: 1,
        duration: 1000,
        delay: anime.stagger(300, {start: 50, direction: 'reverse'}),
        easing: 'easeInOutSine'
      })
    },
  },
  beforeRouteLeave(to, from, next){
    anime({
      targets: ".center-coke-img",
      duration: 1000,
      translateY: 100,
      delay: 600,
      easing: 'easeInOutSine'
    })
    anime({
      targets: ".grid-children",
      duration: 1000,
      translateY: 200,
      delay: anime.stagger(300, {start: 50, direction: "reverse", easing: 'easeOutSine'}),
      easing: 'easeInOutSine'
    })
    setTimeout(() => {
      next()
    }, 2000)
  }
}
</script>

<style>
#landing-page{
  height: 90vh;
  overflow-y: hidden;
  position: relative;
}
#landing-page img{
  height: 120%;
}
#landing-page .grid-container{
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 40% 5% auto auto;
  grid-template-rows: auto 5% 40%;
  grid-gap: 0;
}

#landing-page .grid-container .item1{
  grid-area: 1/1/3/2;
  padding: 0 15% 0;
  text-align: left;
}
#landing-page .grid-container .item1 h1{
  font-size: 2.5rem;
  margin-bottom: 20px;
}
#landing-page .grid-container .item1 h6{
  font-size: 0.8rem;
  font-weight: normal;
  margin-bottom: 30px;
}
#landing-page .grid-container .item1 button{
  background: none;
  padding: 15px 30px;
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  cursor: pointer;
}
#landing-page .grid-container .item1 button:hover{
  background-color: rgb(116, 10, 10);
}

/* the carousel grid */
#landing-page .grid-container .item2{
  grid-area: 3/1/4/3;
  position: relative;
}

/* the video grid */
#landing-page .grid-container .item3{
  grid-area: 3/3/4/4;
  position: relative;
  z-index: 3;
}
#landing-page .grid-container .item3 video{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
}
#landing-page .grid-container .item3 button{
  position: absolute;
  top: -18px;
  right: -18px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  z-index: 2;
  color: rgb(116, 10, 10);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* this is for the inner-text for both grid item3 and item4  */
#landing-page .grid-container .inner-text{
    height: 100%;
    width: 100%;
    padding: 15% 15% 15% 5%;
    color: rgb(248, 247, 247);
    text-align: left;
    font-size: 0.8rem;
    position: absolute;
}
#landing-page .grid-container .inner-text h4{
  margin-bottom: 10px;
}

/* the last grid */
#landing-page .grid-container .item4{
  grid-area: 3/4/4/5;
  position: relative;
  z-index: 2;
  background-color: rgb(116, 10, 10);
  background-image: url('../assets/diet-coke.png');
  background-repeat: no-repeat;
  background-size: 75px;
  background-position: 100% 150%;
}

</style>
