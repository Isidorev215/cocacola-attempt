<template>
  <transition appear @before-enter="beforeEnterSvg" @enter="enterSvg" @after-enter="afterEnter" v-if="routeObj">
    <svg id="morph" height="100%" width="100%" viewBox="5 5 495 495" preserveAspectRatio="none">
      <path class="morph" d="" fill=""></path>
    </svg>
  </transition>

  <div class="showcase-container" v-if="routeObj">
    <main class="left flex-child">
      <h1>{{routeObj.title}}</h1>
      <p>{{routeObj.description}}</p>

      <div id="nutritional-facts">
        <h3>NUTRITIONAL FACTS</h3>
        <ul>
          <li v-for="nutrition in routeObj.nutrition" :key="nutrition.title">
            <h6>{{nutrition.title}}</h6>
            <p>{{nutrition.value}}</p>
            <p>{{nutrition.percent}} %</p>
          </li>
        </ul>
      </div>
      <button class="buy-button">BUY NOW</button>
    </main>

    <aside class="right flex-child">
      <img :src="routeObj.imageUrl" :alt="routeObj.title" class="can-image">
    </aside>

    <div class="corner">
      <h1>330 ml</h1>
      <p>Covering: 5mm</p>
      <p>1 serving per container</p>
      <div class="empty"></div>
    </div>

    <nav class="route-nav-dots">
        <router-link :to="{ name: 'Showcase', params: { id: cokeImage.id, bgColor: cokeImage.backgroundColor }}"
          v-for="cokeImage in cokeImagesArray" :key="cokeImage.id" 
          :class="{ active: $route.params.id == cokeImage.id }"
          >
          .
        </router-link>
    </nav>

  </div>
  <div class="alternate" v-else>
    <Spinner />
  </div>
  
</template>

<script>
import { useMeta } from 'vue-meta'
import Spinner from '../components/Spinner'
import getCollection from '../composables/getCollection'
import getDocument from '../composables/getDocument'
import anime from 'animejs/lib/anime.es.js';
export default {
    props: [ "id", "bgColor" ],
    components: { Spinner },
    setup(){
      useMeta({
        title: "Our Products",
        description: "Eight products: Cherry, Light, Diet, Vanilla, Classic, New, Light and Life. You decide!!!",
      })
    },
    data(){
      return {
        cokeImagesArray: [],
        routeObj: {},
        docError: null,
        collectionError: null,
      }
    },
    methods: {
      beforeEnterSvg(el){
        el.style.zIndex = "3";
        const path = el.querySelector('.morph');
        path.setAttribute('d', 'M -119.25 1.798 L -127.769 512.02 C -86.868 517.633 2.159 514.003 15.332 514.575 C 44.366 516.935 94.383 517.954 137.137 517.13 C 165.707 516.579 244.645 508.118 266.611 512.871 C 293.07 518.596 373.162 516.645 387.563 514.574 C 402.738 518.014 492.465 510.416 504.26 511.167 L 501.704 -3.313 L -120.953 -3.312')
        path.setAttribute('fill', 'rgb(31,30, 30)')
      },
      enterSvg(el, done){
        const body = document.getElementById('body');
        var morphing = anime({
          targets: '.morph',
          d: [
            { value: "M -116.695 0.946 L -114.991 171.304 C -122.468 316.822 -41.581 314.329 6.814 213.042 C 62.415 82.307 131.907 163.382 143.952 252.224 C 186.151 497.84 274.907 330.71 289.609 187.488 C 328.24 -93.388 393.973 39.85 414.821 251.372 C 450.439 415.8 495.871 271.915 499.148 169.6 L 501.704 0.946 L -116.695 0.947"},
            { value: "M -114.139 0.946 L -44.294 1.799 C -36.613 -0.254 37.934 1.226 51.107 1.798 C 63.105 2.454 121.64 1.77 164.394 0.946 C 192.964 0.395 267.987 2.029 290.46 1.797 C 313.512 1.559 391.901 1.313 407.154 2.649 C 421.477 3.534 485.651 1.046 497.446 1.797 L 498.297 1.798 C 530.358 0.239 -96.83 4.057 -114.139 1.799"}
          ],
          easing: 'linear',
          duration: 1000,
          delay: 1000,
          change: (anim) => {
            body.style.backgroundColor = this.bgColor
          },
          complete: (anim) => {
            done()
          }
        })
      },
      afterEnter(el){
        el.style.zIndex = "-1";
        const path = el.querySelector('.morph');
        path.setAttribute('d', "M 500.708 -0.309 L 0.708 -0.309 L 0.708 499.691 L 500.708 499.691 C 500.708 499.691 500.708 455.55 500.708 399.691 C 500.708 329.261 500.708 368.532 500.708 299.691 C 500.708 253.305 500.708 314.507 500.708 199.691 C 500.708 160.042 500.708 150.016 500.708 99.691 C 500.708 28.961 500.708 -0.309 500.708 -0.309 Z")
        path.setAttribute('fill', this.bgColor)
      }
    },
    beforeRouteEnter(to, from, next){
      const { documents , collectionError } = getCollection('products')
      const { oneDoc, docError } = getDocument('products', to.params.id)
      next (vm => {
        vm.cokeImagesArray = documents
        vm.collectionError = collectionError

        vm.routeObj = oneDoc
        vm.docError = docError
      })
    },
    beforeRouteUpdate(to, from, next){
      const body = document.getElementById('body');
      const path = document.querySelector('.morph');
      const svg = document.querySelector("#morph")
      
      // update the current routeObj
      const arrayfromProxy = JSON.parse(JSON.stringify(this.cokeImagesArray))
      const obj = arrayfromProxy.find(obj => {
        return obj.id == to.params.id
      })
      this.routeObj = obj

      // trigger anime.js
      svg.style.zIndex = "1"
      var animation = anime({
        targets: '.morph',
          d: [
            { value: "M 401.725 -0.309 L 0.708 -0.309 L 0.708 499.691 L 200.708 499.691 C 200.708 499.691 422.674 440.291 340.381 399.691 C 277.454 368.646 500.25 382.529 501.725 299.691 C 503.348 208.523 198.328 245.22 301.725 199.691 C 389.039 161.244 101.725 191.242 101.725 99.691 C 101.725 -0.309 401.766 126.817 401.725 -0.309 Z"},
            { value: "M 1.725 -0.309 L 0.708 -0.309 L 0.708 499.691 L 1.725 499.691 C 1.725 499.691 0.024 491.439 1.725 399.691 C 2.885 337.111 0.25 382.529 1.725 299.691 C 3.348 208.523 1.725 251.324 1.725 199.691 C 1.725 104.287 1.725 191.242 1.725 99.691 C 1.725 -0.309 1.766 126.817 1.725 -0.309 Z"}
          ],
          easing: 'linear',
          duration: 1000,
          endDelay: 1000,
          begin: (anim) => {
            if(from.params.bgColor === to.params.bgColor){
              path.setAttribute('fill', 'rgb(31, 30, 30)')
            }
            else{
              body.style.backgroundColor = to.params.bgColor
            }
          }
      })
      
      animation.finished.then(() => {
        svg.style.zIndex = "-1"
        path.setAttribute('d', 'M 500.708 -0.309 L 0.708 -0.309 L 0.708 499.691 L 500.708 499.691 C 500.708 499.691 500.708 455.55 500.708 399.691 C 500.708 329.261 500.708 368.532 500.708 299.691 C 500.708 253.305 500.708 314.507 500.708 199.691 C 500.708 160.042 500.708 150.016 500.708 99.691 C 500.708 28.961 500.708 -0.309 500.708 -0.309 Z')
        path.setAttribute('fill', to.params.bgColor)
        
      })
      next()
    },
    beforeRouteLeave(to, from, next){
      const body = document.getElementById('body');
      const path = document.querySelector('.morph')
      body.style.backgroundColor = 'rgb(31, 30, 30)'
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

div.alternate{
  transform: translateY(200px);
}

@media (max-width: 768px){
  .showcase-container{
    flex-direction: column;
    overflow-y: auto;
  }
  .showcase-container .flex-child{
    flex-basis: 100%;
  }
  .showcase-container .left{
    margin-top: 0;
  }
  .showcase-container .left h1{
    text-align: center;
    font-size: 1.5rem;
  }
  .showcase-container .left > p{
    font-size: 0.7rem;
    margin-bottom: 10px;
  }
  #nutritional-facts{
    height: 45%;
    margin-bottom: unset;
  }
  .left .buy-button{
    border-radius: unset;
    width: 100%;
  }


  .showcase-container .corner{
    display: none;
  }
  .route-nav-dots{
    width: 80%;
    height: 1.5%;
    top: unset;
    right: unset;
    bottom: 5%;
    flex-direction: row;
  }
  .route-nav-dots a{
    width: 3%;
    height: 100%;
  }
}
</style>