<template>
  <transition appear @before-enter="beforeEnterSvg" @enter="enterSvg" v-if="routeObj.name">
    <svg id="morph" height="100%" width="100%" viewBox="0 0 498 500" preserveAspectRatio="none">
      <path class="morph" 
        d="" 
        fill="rgb(31, 30, 30)">
      </path>
    </svg>
  </transition>

  <div class="showcase-container" v-if="routeObj.name">

    <main class="left flex-child">
      <h1>{{routeObj.title}}</h1>
      <p>{{routeObj.description}}</p>

      <div id="nutritional-facts">
        <h3>NUTRITIONAL FACTS</h3>
        <ul>
          <li v-for="nutrition in routeObj.nutrition" :key="nutrition.title">
            <h6>{{nutrition.title}}</h6>
            <p>{{nutrition.value}}</p>
            <p>{{nutrition.percent}}</p>
          </li>
        </ul>
      </div>
      <button class="buy-button">BUY NOW</button>
    </main>

    <aside class="right flex-child">
      <img :src="routeObj.src" :alt="routeObj.title" class="can-image">
    </aside>

    <div class="corner">
      <h1>330 ml</h1>
      <p>Covering: 5mm</p>
      <p>1 serving per container</p>
      <div class="empty"></div>
    </div>

    <nav class="route-nav-dots">
        <router-link :to="{ name: 'Showcase', params: { name: cokeImage.name }}"
          v-for="cokeImage in cokeImagesArray" :key="cokeImage.id" 
          :class="{ active: $route.params.name == cokeImage.name }"
          >
          .
        </router-link>
    </nav>

  </div>
  
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    props: [ "name" ],
    data(){
      return {
        cokeImagesArray: [],
        routeObj: {},
        previousBodyBg: '',
        green: "rgb(86, 126, 68)",
        purple: "#86606e",
        black: "rgb(31, 30, 30)",
        red: "rgb(116, 10, 10)"
        
      }
    },
    mounted(){
      fetch("http://localhost:3000/cokeImages")
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const arrayWithModifiedSrc = data.map(cokeImage => {
          return {...cokeImage, src: require(`../assets/cocacola-cans/${cokeImage.name}.png`)}
        })
        this.cokeImagesArray = arrayWithModifiedSrc
        const obj = arrayWithModifiedSrc.find(obj => {
          return obj.name == this.name 
        })
        this.routeObj = obj
        // console.log(this.routeObj, obj)
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    methods: {
      beforeEnterSvg(el){
        const body = document.getElementById('body');

        const path = el.querySelector('.morph');
        path.setAttribute('d', 'M -119.25 1.798 L -127.769 512.02 C -86.868 517.633 2.159 514.003 15.332 514.575 C 44.366 516.935 94.383 517.954 137.137 517.13 C 165.707 516.579 244.645 508.118 266.611 512.871 C 293.07 518.596 373.162 516.645 387.563 514.574 C 402.738 518.014 492.465 510.416 504.26 511.167 L 501.704 -3.313 L -120.953 -3.312')

        if(this.$route.params.name == 'cocacola-life'){
          body.style.backgroundColor = this.green
        }
        else if(this.$route.params.name == 'cocacola-cherry'){
          body.style.backgroundColor = this.purple
        }
        else if(this.$route.params.name == 'cocacola-zero' || this.$route.params.name == 'diet-coke' || this.$route.params.name == 'cocacola-light'){
          body.style.backgroundColor = this.black
          path.setAttribute('fill', this.red)
        }
        else{
          body.style.backgroundColor = this.red
        }
      },
      enterSvg(el){
        var morphing = anime({
          targets: '.morph',
          d: [
            { value: "M -116.695 0.946 L -114.991 171.304 C -122.468 316.822 -41.581 314.329 6.814 213.042 C 62.415 82.307 131.907 163.382 143.952 252.224 C 186.151 497.84 274.907 330.71 289.609 187.488 C 328.24 -93.388 393.973 39.85 414.821 251.372 C 450.439 415.8 495.871 271.915 499.148 169.6 L 501.704 0.946 L -116.695 0.947"},
            { value: "M -114.139 0.946 L -44.294 1.799 C -36.613 -0.254 37.934 1.226 51.107 1.798 C 63.105 2.454 121.64 1.77 164.394 0.946 C 192.964 0.395 267.987 2.029 290.46 1.797 C 313.512 1.559 391.901 1.313 407.154 2.649 C 421.477 3.534 485.651 1.046 497.446 1.797 L 498.297 1.798 C 530.358 0.239 -96.83 4.057 -114.139 1.799"}
          ],
          easing: 'linear',
          duration: 1000
        })
      }
    },
    beforeRouteUpdate(to, from, next){
      const body = document.getElementById('body');
      const path = document.querySelector('.morph');
      
      const arrayfromProxy = JSON.parse(JSON.stringify(this.cokeImagesArray))
      const obj = arrayfromProxy.find(obj => {
        return obj.name == to.params.name
      })
      this.routeObj = obj

      // the if checks for routing
      if(to.params.name == 'cocacola-life'){
        body.style.backgroundColor = this.green
      }
      else if(to.params.name == 'cocacola-cherry'){
        body.style.backgroundColor = this.purple
      }
      else if(to.params.name == 'cocacola-zero' || this.$route.params.name == 'diet-coke' || this.$route.params.name == 'cocacola-light'){
        body.style.backgroundColor = this.black
        path.setAttribute('fill', this.red)
      }
      else{
        body.style.backgroundColor = this.red
      }
      
      next()
    },
    beforeRouteLeave(to, from, next){
      const body = document.getElementById('body');
      const path = document.querySelector('.morph')
      body.style.backgroundColor = this.black
      next()
    }

}
</script>

<style>
/* the svg itself */
#morph{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* the showcase body */
.showcase-container{
  height: 90vh;
  width: 100vw;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  padding: 5% 10%;
}
.showcase-container .flex-child{
  flex-basis: 49%;
  height: 100%;
}
.showcase-container .left{
  text-align: left;
  margin-top: 10%;
}
.showcase-container .left h1{
  margin-bottom: 10px;
  font-size: 3rem;
}
.showcase-container .left > p{
  font-size: 1rem;
  margin-bottom: 50px;
}
#nutritional-facts{
  height: 25%;
  margin-bottom: 50px;
}
#nutritional-facts h3{
  font-size: 0.7rem;
  margin-bottom: 10px;
}
#nutritional-facts ul{
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  height: 60%;
  text-align: center;
}
#nutritional-facts ul li{
  flex-basis: 20%;
  margin-right: 5px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1% 0 0;
}
#nutritional-facts ul li h6{
  font-size: 0.5rem;
}
#nutritional-facts ul li p{
  font-size: 1.2rem;
}
#nutritional-facts ul li:first-child{
  background-color: white;
  color: black;
}
#nutritional-facts ul li p:last-child{
  font-size: 0.5rem;
  font-weight: bolder;
  background-color: white;
  color: black;
  flex-basis: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
#nutritional-facts ul li p:last-child::after{
  content: '';
  background-color: white;
  height: 100%;
  width: 10%;
  position: absolute;
  z-index: -1;
  right: -5px;
}
#nutritional-facts ul li:last-child p:last-child::after{
  right: 0;
}
.left .buy-button{
  border: 2px solid white;
  border-radius: 25px;
  padding: 3% 7%;
  background: none;
  color: white;
}

.showcase-container .corner{
  background-color: black;
  width: 130px;
  height: 160px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  padding: 2% 1% 2% 2%;
  text-align: left;
}
.showcase-container .corner h1{
  margin-bottom: 3px;
  font-size: 1.3rem;
}
.showcase-container .corner p{
  margin-bottom: 15px;
  font-size: 0.8rem;
}
.showcase-container .corner div.empty{
  width: 100%;
  height: 20%;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
}

.route-nav-dots{
  position: absolute;
  right: 5%;
  top: 30%;
  z-index: 2;
  height: 35%;
  width: 1%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.route-nav-dots a{
  background-color: black;
  width: 100%;
  height: 5%;
  border-radius: 50%;
  border: 2px solid white;
  text-indent: -999999px;
}
.route-nav-dots a.active{
  background-color: white;
}



</style>