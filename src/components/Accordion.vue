<template>
      <div class="v-if-wrapper" v-if="products.length">
        <div class="one-accordion" v-for="product in products" :key="product.id">
          <button class="accordion-btn" @click="toggleAccordion($event, product.imageUrl)">{{product.title}}</button> 
          <div class="accordion-content">
            <h3 class="title" :style="{backgroundColor: product.backgroundColor, color: product.svgColor}" >Title: {{product.title}}</h3>
            <ul class="info">
              <li><span>Description: </span>{{product.description}}</li>
              <li><span>Slugified title: </span>{{product.name}}</li>
              <li><span>Backgrouund Color: </span>{{product.backgroundColor}}</li>
              <li><span>Added by: </span>{{product.uploadedBy[1]}}</li>
            </ul>
            <ul class="nutrition">
              <li v-for="(nutrition, index) in product.nutrition" :key="index" :style="{backgroundColor: product.backgroundColor, color: product.svgColor}">
                <h6>{{nutrition.title}}</h6>
                <p>{{nutrition.value}}</p>
                <p>{{nutrition.percent}}%</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="v-else" v-else>Loading...</div>
</template>

<script>
import getCollection from '../composables/getCollection'
export default {
    name: 'Accordion',
    emits: [ 'sendImage' ],
    methods: {
      toggleAccordion(event, url){
        event.target.classList.toggle('active');
        const content = event.target.nextElementSibling;
        if(content.style.maxHeight){
          content.style.maxHeight = null
          this.$emit('sendImage', '')
        }else{
          content.style.maxHeight = '600px'
          this.$emit('sendImage', url)
        }
      }
    },
    data(){
      return{
        products: [],
        error: null
      }
    },
    mounted(){
      const { documents , collectionError } = getCollection('products')
      this.products = documents
      this.error = collectionError 
    },
    // setup(){
    //   const products = ref(null)
    //   const error = ref(null)

    //   const { documents , collectionError } = getCollection('products')
    //   products.value = documents.value
    //   error.value = collectionError.value
      
    //   console.log(products.value, error.value)

    //   return { products, error }
    // }

}
</script>

<style>
.accordion-btn{
  background: none;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border-bottom: none;
  border-right: none;
  border-left: none;
  border-top: 1px solid rgb(86, 126, 68);
  outline: none;
  transition: 0.4s;
}
.one-accordion:first-child .accordion-btn{
  border-right: 1px solid rgb(86, 126, 68);
  border-left: 1px solid rgb(86, 126, 68);
}
.one-accordion:last-child .accordion-btn{
  border-bottom: 1px solid rgb(86, 126, 68);
  border-right: 1px solid rgb(86, 126, 68);
  border-left: 1px solid rgb(86, 126, 68);
}
.accordion-btn:hover{
  background-color: #eee;
  color: rgb(86, 126, 68);
}
.accordion-btn.active{
  background-color: rgb(86, 126, 68);
  color: white;
  border-bottom: 1px solid rgb(116, 10, 110);
}
.accordion-btn::after{
  content: '+';
  font-size: 13px;
  color: white;
  float: right;
  margin-left: 5px;
}
.accordion-btn.active::after{
  content: '-';
}

.accordion-content{
  padding: 0 0;
  background: white;
  color: rgb(38, 37, 37);
  max-height: 0;
  /* this overflow is suspect, you may need to change to auto if content is too large */
  overflow: auto;
  transition: max-height 0.2s ease-out;
  font-size: 0.8rem;
  text-align: justify;
}
.accordion-content .title{
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  width: 95%;
  padding: 1% 0 1% 1%;
  margin: 1% auto;
  border-radius: 5px;
  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
}
.accordion-content ul.info{
  list-style-type: none;
  width: 95%;
  margin: 1% auto;
  border-radius: 5px;
}
.accordion-content ul.info li{
  background-color: white;
  padding: 1%;
  font-size: 1rem;
}
.accordion-content ul.info li span{
  font-weight: bold;
}
.accordion-content .info li:nth-child(2n){
  background-color: grey;
}

.accordion-content ul.nutrition{
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 95%;
  margin: 2% auto 5% auto;
}
.accordion-content ul.nutrition li{
  flex-basis: 20%;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1% 0 1%;
  border-radius: 5px;
}
.accordion-content ul.nutrition li h6{
  font-size: 1rem;
}
.accordion-content ul.nutrition li p{
  font-size: 1rem;
}
.accordion-content ul.nutrition li p:last-child{
  font-size: 0.8rem;
}

</style>