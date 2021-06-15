<template>
  <main id="landing-page">
    <img src="../assets/cocacola-cans/classic-coke-two.png" alt="Classic Cocacola can">
    <section class="main-section grid-container">
      <article class="item1 grid-children">
        <h1>Things go better with Coke.</h1>
        <h6>All your favourite flavour. The gang all here compare flavours, get numerous faces and check out ingredients</h6>
        <button class="to-product-route" @click="toProducts">VIEW PRODUCT</button>
      </article>
      <aside class="item2 grid-children">
        <Textcarousel/>
      </aside>
      <div class="item3 grid-children">
        <video ref="vid" autoplay loop>
          <source src="../assets/a-glass-of-fizzy-coke.mp4" type="video/mp4">
        </video>
        <button @click="toggleplay">
          <span v-if="isPlaying" class="material-icons">pause</span>
          <span v-else class="material-icons">play_arrow</span>
        </button>
        <div class="inner-text">
          <h4>COKE ZERO</h4>
          <p>Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!</p>
        </div>
      </div>
      <div class="item4 grid-children">
        <div class="inner-text">
          <h4>COKE HISTORY</h4>
          <p>Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Textcarousel from '@/components/Textcarousel.vue'
export default {
  name: 'Home',
  components: { Textcarousel },
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
    }
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

.grid-container .item1{
  grid-area: 1/1/3/2;
  padding: 0 15% 0;
  text-align: left;
}
.grid-container .item1 h1{
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.grid-container .item1 h6{
  font-size: 0.8rem;
  font-weight: normal;
  margin-bottom: 30px;
}
.grid-container .item1 button{
  background: none;
  padding: 15px 30px;
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  cursor: pointer;
}
.grid-container .item1 button:hover{
  background-color: rgb(116, 10, 10);
}

/* the carousel grid */
.grid-container .item2{
  grid-area: 3/1/4/3;
  position: relative;
}

/* the video grid */
.grid-container .item3{
  grid-area: 3/3/4/4;
  position: relative;
}
.grid-container .item3 video{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
}
.grid-container .item3 button{
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
.grid-container .inner-text{
    height: 100%;
    width: 100%;
    padding: 15% 15% 15% 5%;
    color: rgb(248, 247, 247);
    text-align: justify;
    font-size: 0.8rem;
    position: absolute;
}
.grid-container .inner-text h4{
  margin-bottom: 10px;
}

/* the last grid */
.grid-container .item4{
  grid-area: 3/4/4/5;
  position: relative;
  background-color: rgb(116, 10, 10);
  background-image: url('../assets/cocacola-cans/diet-coke.png');
  background-repeat: no-repeat;
  background-size: 75px;
  background-position: 100% 150%;
}

</style>
