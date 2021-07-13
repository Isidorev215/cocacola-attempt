<template>
  <div class="admin-container">
    <div class="flex-child access-information">
      <h4>Current Products</h4>
      <Accordion />
    </div>
    <div class="flex-child upload-here">
      <div class="staging-area">
        <img v-if="stagingImage" class="staged-img" :src="stagingImage">
      </div>
      <form class="upload-form" @submit.prevent="handleSubmit">
        <input type="file" name="file" id="input-file" title="select Image to Upload" @change="handleFileChange" @blur="handleBlurEvent">
        <input type="text" name="title" placeholder="Image Title" v-model="imageTitle"  @blur="handleBlurEvent">
        <textarea name="description" cols="30" rows="5" placeholder="Description..." v-model="descriptionVModel" @input="handleInputEvent" @blur="handleBlurEvent"></textarea>
        <div class="nutrition">
          <Fieldset className="Nutriton-one" legendName="Nutrition-1" nutritionName="Sodium" @fieldsetComplete="nutrition1" @focusout="handleBlurEvent" />
          <Fieldset className="Nutriton-two" legendName="Nutrition-2" nutritionName="Total Fats" @fieldsetComplete="nutrition2" @focusout="handleBlurEvent" />
          <Fieldset className="Nutriton-three" legendName="Nutrition-3" nutritionName="Sodium (mg)" @fieldsetComplete="nutrition3" @focusout="handleBlurEvent" />
          <Fieldset className="Nutriton-four" legendName="Nutrition-4" nutritionName="Potasium" @fieldsetComplete="nutrition4" @focusout="handleBlurEvent" />
          <Fieldset className="Nutriton-five" legendName="Nutrition-5" nutritionName="Calcium" @fieldsetComplete="nutrition5" @focusout="handleBlurEvent" />
        </div>
        <div class="backgroundColor">
          <label for="backgroundColor">Background Color</label>
          <select name="backgroundColor" id="backgroundColor" v-model="backgroundColor" @blur="handleBlurEvent">
            <option value="rgb(116, 10, 10)">Red</option>
            <option value="rgb(31, 30, 30)">Black</option>
            <option value="rgb(86, 126, 68)">Green</option>
            <option value="#86606e">Purple</option>
          </select>
        </div>
        <div class="svgColor">
          <label for="svgColor">SVG Color</label>
          <select name="svgColor" id="svgColor" v-model="svgColor" @blur="handleBlurEvent">
            <option value="rgb(116, 10, 10)">Red</option>
            <option value="rgb(31, 30, 30)">Black</option>
            <option value="rgb(86, 126, 68)">Green</option>
            <option value="#86606e">Purple</option>
          </select>
        </div>
        
        <p class="error" v-show="true">{{error || "All fields are required"}}</p>
        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Accordion from '../components/Accordion'
import Fieldset from '../components/Fieldset'
import getUser from '../composables/getUser'
import slugify from '../composables/slugify'

export default {
  props: ['admin'],
  components: {
    Accordion,
    Fieldset
  },
  setup(){
    const router = useRouter()
    
    const stagingImage = ref(null)
    
    const fileObjectToStorage = ref(null)
    const imageTitle = ref(null)

    const descriptionVModel = ref(null)
    const description = ref(null) 
    
    const nutritionArray = ref([])
    const backgroundColor = ref(null)
    const svgColor = ref(null)

    const error = ref(null)
    

    // watch for logged outing
    const { user } = getUser()
    watch(user, () => {
      if(!user.value){
        router.push({ name: 'Loginadmin'})
      }
    })
    // methods for the fieldsets
    const nutrition1 = (err, obj1) => {
      // console.log(obj1)
      error.value = null
      if(obj1.value !== null && obj1.percent !== null){
        nutritionArray.value[0] = obj1
      }
      else{
        error.value = err
        nutritionArray.value.splice(0, 1)//remove that element
      }
    }
    const nutrition2 = (err, obj2) => {
      // console.log(obj2)
      error.value = null
      if(obj2.value !== null && obj2.percent !== null){
        nutritionArray.value[1] = obj2
      }
      else{
        error.value = err
        nutritionArray.value.splice(1, 1)//remove that element
      }
    }
    const nutrition3 = (err, obj3) => {
      // console.log(obj3)
      error.value = null
      if(obj3.value !== null && obj3.percent !== null){
        nutritionArray.value[2] = obj3
      }
      else{
        error.value = err
        nutritionArray.value.splice(2, 1)//remove that element
      }
    }
    const nutrition4 = (err, obj4) => {
      // console.log(obj4)
      error.value = null
      if(obj4.value !== null && obj4.percent !== null){
        nutritionArray.value[3] = obj4
      }
      else{
        error.value = err
        nutritionArray.value.splice(3, 1)//remove that element
      }
    }
    const nutrition5 = (err, obj5) => {
      // console.log(obj5)
      error.value = null
      if(obj5.value !== null && obj5.percent !== null){
        nutritionArray.value[4] = obj5
      }
      else{
        error.value = err
        nutritionArray.value.splice(4, 1)//remove that element
      }
    }

    const handleFileChange = (event) => {
      error.value = null
      event.target.style.border = ''

      const selectedFile = event.target.files[0]
      if(selectedFile){
        if(selectedFile.type && selectedFile.type !== "image/png"){
          console.log("This is not a png image")
          error.value = 'Image must be png format'
          stagingImage.value = null
          event.target.style.border = '1px solid rgb(116, 10, 10)'
          return;
        }
        if(selectedFile.size > 102400){
          console.log('file is too large')
          error.value = "Image must be less than 100kb"
          stagingImage.value  = null
          event.target.style.border = '1px solid rgb(116, 10, 10)'
          return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          stagingImage.value = e.target.result;
        });
        reader.readAsDataURL(selectedFile);
        fileObjectToStorage.value = selectedFile
        event.target.style.border = '1px solid rgb(86, 126, 68)'
      }else{
        error.value = "No Image Selected"
        stagingImage.value = null
      }
    }
    
    const handleInputEvent = (event) => {
      const errorPara = document.querySelector('.upload-form .error')
      description.value = descriptionVModel.value
      const maxLength = 80
      const valueLength = event.target.value.length
      if( valueLength > maxLength){
        error.value = `Limit: ${maxLength - valueLength} chars left`
        errorPara.style.color = 'rgb(225, 0, 0)'
        description.value = null
        return;
      }
      errorPara.style.color = 'rgb(86, 162, 68)'
      error.value = `${maxLength - valueLength} chars left`
      return;
    }
    const handleBlurEvent = (event) => {
      const errorPara = document.querySelector('.upload-form .error')
      errorPara.style.color = 'rgb(225, 0, 0)'

      const inputObject = {
        title: imageTitle.value,
        description: description.value,
        file: fileObjectToStorage.value,
        nutrition: JSON.parse(JSON.stringify(nutritionArray.value)),
        backgroundColor: backgroundColor.value,
        svgColor: svgColor.value
      }
      
      if(event.target.value){
        if(event.target.localName == 'textarea'){
          const maxLength = 80
          const valueLength = event.target.value.length
          if( valueLength > maxLength){
            errorPara.style.color = 'rgb(225, 0, 0)'
            event.target.style.border = "1px solid rgb(116, 10, 10)"
            return;
          }
            event.target.style.border = "1px solid rgb(86, 162, 68)"
            error.value = null
            return;
        }
        event.target.style.border = '1px solid rgb(86, 162, 68)'
        error.value = null
        if(inputObject.title !== null && inputObject.description !== null && inputObject.file !== null && inputObject.backgroundColor !== null && inputObject.svgColor !== null && inputObject.nutrition.length == 5){
          errorPara.style.color = 'rgb(86, 162, 68)'
          error.value = "All Fields are good!"
          return;
        }
        return;
      }
      if(event.target.value == null || event.target.value == ''){
        event.target.style.border = "1px solid rgb(116, 10, 10)"
        errorPara.style.color = 'rgb(225, 0, 0)'
        error.value = `The ${event.target.getAttribute("name")} field is required!`
        return;
      }
    }

    const handleSubmit = () => {
      // slugify imageTitle
      const slugifiedName = slugify(imageTitle.value)

      console.log({
        title: imageTitle.value,
        description: description.value,
        file: fileObjectToStorage.value,
        src: 'from the image upload',
        name: slugifiedName,
        nutrition: JSON.parse(JSON.stringify(nutritionArray.value)),
        backgroundColor: backgroundColor.value,
        svgColor: svgColor.value
      })
    }
    
    return { user, handleBlurEvent, handleInputEvent, handleFileChange, stagingImage, handleSubmit, nutrition1, nutrition2, nutrition3, nutrition4, nutrition5, 
             imageTitle, descriptionVModel, backgroundColor, svgColor, error }
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
  position: relative;
  display: flex;
}
.access-information{
  flex: 1;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-container .upload-here{
  flex: 3;
  padding-top: 10px;
  display: flex;
  border-left: 1px solid rgb(86, 126, 68);
}
.staging-area{
  /* flex: 1;
  flex-basis: 15%; */
  width: 45%;
}
.staging-area .staged-img{
  height: 100%;
  width: 100%;
}
.upload-form{
  /* flex: 2; */
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2%;
  margin-right: 5%;
}
.upload-form input:first-child{
  padding: 0;
  color: unset;
  background-color: unset;
  width: 40%;
}
.upload-form input, .upload-form textarea, .upload-form select{
  padding: 5px;
  color: white;
  background-color: black;
  border-radius: 5px;
  border: none;
  margin-right: 5px;
  margin-bottom: 5px;
  width: 40%;
}
.upload-form > input, .upload-form > textarea, .upload-form select{
  border: 1px solid rgb(116, 10, 10);
}
.upload-form div.nutrition{
  margin: 2% 0 2%;
}
.upload-form div.backgroundColor, .upload-form div.svgColor{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
}
.upload-form .error{
  color: rgb(255, 0, 0);
  font-size: 12px;
}
.upload-form button{
  width: 30%;
  background-color: transparent;
  color: white;
  margin: 2% 0 3%;
  padding: 3% 0 3%;
  border: 1px solid white;
  border-radius: 25px;
  align-self: center;
}
.upload-form button:hover{
  background-color: rgb(86, 126, 68);
  color: white;
}

</style>