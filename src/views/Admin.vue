<template>
  <div class="admin-container">
    <div class="accordion-container">
      <header>
        <h1>Current Products</h1>
        <button @click="handleShowModal">Upload +</button>
      </header>
      <div class="displayImage">
        <img v-if="imageUrl" :src="imageUrl" alt="Click on a list item to stage an image">
        <p class="alternate" v-else>Click a Link item to stage image</p>
      </div>
      <div class="accordion">
        <Accordion @sendImage="receiveImage"/>
      </div>
    </div>
    <div id="uploadModal" class="modal" v-if="showModal" @click.self="showModal = false">
      <UploadForm  @closeModal="showModal = false" />
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import Accordion from '../components/Accordion'
import UploadForm from '../components/UploadForm'
import getUser from '../composables/getUser'
export default {
  props: ['admin'],
  data(){
    return {
      showModal: false,
      imageUrl: null
    }
  },
  components: {
    Accordion,
    UploadForm
  },
  methods: {
    handleShowModal(){
      this.showModal = true
    },
    receiveImage(url){
      this.imageUrl = null
      this.imageUrl = url
    }
  },
  setup(){
    const router = useRouter()
    const { user } = getUser()

    // watch for logged outing
    watch(user, () => {
      if(!user.value){
        router.push({ name: 'LoginAdmin'})
      }
    })
  },
  beforeRouteEnter(){
    const nav = document.querySelector('#nav')
    nav.style.backgroundColor = 'rgb(86, 126, 68)'
  }
}
</script>

<style>
.admin-container{
  height: 90vh;
  overflow-y: hidden;
}
.accordion-container{
  width: 100%;
  height: 100%;
  margin: auto;
  z-index: 1;
  display: grid;
  grid-template-columns: auto 70%;
  grid-template-rows: 8% auto;
  grid-gap: 0;
}
.accordion-container header{
  font-weight: lighter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: 1/1/2/3;
  padding: 0 8% 0 8%;
}
.accordion-container header h1{
  font-weight: lighter;
}
.accordion-container header button{
  border: 1px solid white;
  border-radius: 25px;
  background: none;
  color: white;
  padding: 1% 2%;
  cursor: pointer;
}
.accordion-container header button:hover{
  background-color: rgb(86, 126, 68);
}
.accordion{
  grid-area: 2/2/3/3;
  overflow: auto;
  padding-top: 7%;
}
.displayImage{
  grid-area: 2/1/3/2;
  margin-right: 5%;
}
.displayImage img{
  width: 100%;
  height: 100%;
}

.modal{
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgb(0, 0, 0, 0.7);
}

</style>