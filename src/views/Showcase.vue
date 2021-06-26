<template>
  <!-- <svg id="morph" height="100%" width="100%" viewBox="0 0 496 500" preserveAspectRatio="none">
    <path class="morph" 
      d="M 0 0 L 0 344.976 C 47.256 438.867 23.723 224.754 81.771 311.754 C 142.172 509.34 131.041 331.322 133.73 373.935 C 136.419 416.548 117.617 238.665 201.022 321.125 C 232.412 325.033 241.172 164.777 264.054 228.279 C 308.144 589.171 347.64 392.28 348.381 345.826 C 358.676 299.444 357.38 170.011 409.711 336.456 C 440.33 433.845 505.405 490.347 496.593 335.605 L 500.852 0 L 0 0" 
      fill="#002E3A">
    </path>
  </svg> -->

  <div class="showcase-container">

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
export default {
    props: [ "name" ],
    data(){
      return {
        cokeImagesArray: [],
        routeObj: {},
        trackActiveRoute: true
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
    }

}
</script>

<style>
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
  right: -8px;
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