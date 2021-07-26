<template>
    <div class="modal-content">
        <div class="modal-header">
            <h2>Upload Form</h2>
            <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="upload-here modal-body">
            <div class="staging-area">
                <img v-if="stagingImage" class="staged-img" :src="stagingImage">
            </div>
            <form  id="uploadForm" class="upload-form" @submit.prevent="handleSubmit">
                <div class="file-input-div">
                    <input type="file" name="file" id="input-file" title="select Image to Upload" @change="handleFileChange" @blur="handleBlurEvent">
                    <p class="file-info">Requirements: PNG less than 100kb</p>
                </div>
                <div class="text-description-input">
                    <input type="text" name="title" placeholder="Image Title" v-model="imageTitle"  @blur="handleBlurEvent">
                    <textarea name="description" rows="3" placeholder="Description..." v-model="descriptionVModel" @input="handleInputEvent" @blur="handleBlurEvent"></textarea>
                </div>
                <div class="nutrition">
                    <button class="reveal-nutrition" @click="displayPopup = !displayPopup"> <span>&lt;</span><span>Nutritonal Info</span></button>
                    <NutritionPopup v-show="displayPopup" @nutriEmit="nutriEmit"/>
                </div>
                <div class="backgroundColor">
                    <label for="backgroundColor">Background Color</label>
                    <select name="backgroundColor" id="backgroundColor" v-model="backgroundColor" @blur="handleBlurEvent">
                        <option value="0" selected disabled></option>
                        <option value="rgb(116, 10, 10)">Red</option>
                        <option value="rgb(31, 30, 30)">Black</option>
                        <option value="rgb(86, 126, 68)">Green</option>
                        <option value="#86606e">Purple</option>
                    </select>
                </div>
                <div class="svgColor">
                    <label for="svgColor">SVG Color</label>
                    <select name="svgColor" id="svgColor" v-model="svgColor" @blur="handleBlurEvent">
                        <option value="0" selected disabled></option>
                        <option value="rgb(116, 10, 10)">Red</option>
                        <option value="rgb(31, 30, 30)">Black</option>
                        <option value="rgb(86, 126, 68)">Green</option>
                        <option value="#86606e">Purple</option>
                    </select>
                </div>
                <div class="error-submit">
                    <p class="error" v-show="true">{{error || "All fields are required"}}</p>
                    <button type="submit">
                      <span v-if="!isPending">Upload</span>
                      <span v-if="isPending">Uploading...</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import NutritionPopup from './NutritionPopup'
import useStorage from '../composables/useStorage'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import slugify from '../composables/slugify'
import validateBeforeSubmit from '../composables/validateBeforeSubmit'
import { timestamp } from '../firebase/config'
export default {
    name: 'UploadForm',
    components: {
        NutritionPopup
    },
    setup(props, context){
    const stagingImage = ref(null)
    
    const fileObjectToStorage = ref(null)
    const imageTitle = ref(null)

    const descriptionVModel = ref(null)
    const description = ref(null) 
    
    const nutritionArray = ref([])
    const displayPopup = ref(false)

    const backgroundColor = ref(null)
    const svgColor = ref(null)

    const error = ref(null)
    const isPending = ref(false)

    const { user } = getUser()
    const { storageError, url, filePath, uploadImage } = useStorage()
    const { firestoreError, addDoc } = useCollection('products')
    
    const closeModal = () => {
        context.emit('closeModal')
    }

    const nutriEmit = (array) => {
      console.log('')
      nutritionArray.value = array
      if(array.length){
        displayPopup.value = false
        event.target.offsetParent.offsetParent.querySelector('button.reveal-nutrition').style.borderRight = '3px solid rgb(86, 126, 68)'
        error.value = null
      }
      else{
        event.target.offsetParent.offsetParent.querySelector('button.reveal-nutrition').style.borderRight = '3px solid rgb(116, 10, 10)'
        error.value = 'All Nutrition data required'
      }
    }

    const handleFileChange = (event) => {
      error.value = null
      event.target.style.borderRight = '3px solid rgb(116, 10, 10)'
      event.target.style.borderBottom = 'none'
      event.target.style.borderTop = 'none'
      event.target.style.borderLeft = 'none'
      event.target.style.color = 'rgb(116, 10, 10)'

      const selectedFile = event.target.files[0]
      if(selectedFile){
        if(selectedFile.type && selectedFile.type !== "image/png"){
          error.value = 'Image must be png format'
          stagingImage.value = null
          event.target.style.borderRight = '3px solid rgb(116, 10, 10)'
          event.target.style.borderBottom = 'none'
          event.target.style.borderTop = 'none'
          event.target.style.borderLeft = 'none'
          event.target.value = null
        }
        else if(selectedFile.size > 102400){
          error.value = "Image must be less than 100kb"
          stagingImage.value  = null
          event.target.style.borderRight = '3px solid rgb(116, 10, 10)'
          event.target.style.borderBottom = 'none'
          event.target.style.borderTop = 'none'
          event.target.style.borderLeft = 'none'
          event.target.value = null
        }
        else{
          const reader = new FileReader();
          reader.addEventListener('load', (e) => {
            stagingImage.value = e.target.result;
          });
          reader.readAsDataURL(selectedFile);
          fileObjectToStorage.value = selectedFile
          error.value = null
          event.target.style.borderRight = '3px solid rgb(86, 126, 68)'
          event.target.style.borderBottom = 'none'
          event.target.style.borderTop = 'none'
          event.target.style.borderLeft = 'none'
          event.target.style.color = 'rgb(86, 126, 68)'
        }
      }else{
        error.value = "No Image Selected"
        stagingImage.value = null
        fileObjectToStorage.value = null
      }
    }
    const handleInputEvent = (event) => {
      const errorPara = document.querySelector('.upload-form .error')
      description.value = descriptionVModel.value
      const maxLength = 120
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
      errorPara.style.color = ''

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
          const maxLength = 120
          const valueLength = event.target.value.length
          if( valueLength > maxLength){
            errorPara.style.color = 'rgb(225, 0, 0)'
            event.target.style.borderRight = "3px solid rgb(116, 10, 10)"
            return;
          }
          event.target.style.borderRight = "3px solid rgb(86, 162, 68)"
          error.value = null
          return;
        }
        event.target.style.borderRight = '3px solid rgb(86, 162, 68)'
        error.value = null
        
        if(inputObject.title !== null && inputObject.description !== null && inputObject.file !== null && inputObject.backgroundColor !== null && inputObject.svgColor !== null && inputObject.nutrition.length === 5){
          errorPara.style.color = 'rgb(86, 162, 68)'
          error.value = "All Fields are good!"
          return;
        }
        return;
      }
      if(event.target.value == null || event.target.value == ''){
        event.target.style.borderRight = "3px solid rgb(116, 10, 10)"
        errorPara.style.color = 'rgb(225, 0, 0)'
        error.value = `The ${event.target.getAttribute("name")} field is required!`
        return;
      }
    }

    const handleSubmit = async (event) => {
      const errorPara = document.querySelector('.upload-form .error')
      const slugifiedName = slugify(imageTitle.value)
      const tempForValidation = {
        title: imageTitle.value == '' || imageTitle.value == null ? null : imageTitle.value,
        description: description.value == '' || description.value == null ? null : description.value,
        file: fileObjectToStorage.value,
        nutrition: nutritionArray.value.length === 5 ? JSON.parse(JSON.stringify(nutritionArray.value)) : null,
        backgroundColor: backgroundColor.value,
        svgColor: svgColor.value,
      }
      const validateResult = validateBeforeSubmit(tempForValidation)
      if (validateResult){
        isPending.value = true
        // do the form stuff
        await uploadImage(fileObjectToStorage.value, 'Images', 'showcase')
        if(!storageError.value){
          await addDoc({
            title: imageTitle.value,
            description: description.value,
            name: slugifiedName,
            nutrition: JSON.parse(JSON.stringify(nutritionArray.value)),
            imageUrl: url.value,
            imagePath: filePath.value,
            backgroundColor: backgroundColor.value,
            svgColor: svgColor.value,
            uploadedBy: [ user.value.uid, user.value.email],
            createdAt: timestamp(),
          })
          if(!firestoreError.value){
            isPending.value = false
            errorPara.style.color = 'rgb(86, 162, 68)'
            error.value = 'Upload Successfull'
            setTimeout(() => {
              closeModal()
            }, 3000)
          }else{
            error.value = firestoreError.value
            isPending.value = false
          }
        }else{
          error.value = storageError.value
          isPending.value = false
        }
      }
      else{
        error.value = 'Check the form fields: All are required'
      }
    }
    
    return { handleBlurEvent, handleInputEvent, handleFileChange, handleSubmit, closeModal, nutriEmit, 
             stagingImage, imageTitle, descriptionVModel, displayPopup, backgroundColor, svgColor, error, isPending }
  },
}
</script>

<style>
.modal-content{
    background-color: rgb(189, 189, 189);
    margin: 5% auto;
    width: 90%;
    height: 80%;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
.modal-header{
    background-color: rgb(86, 126, 68);
    color: white;
    padding: 1% 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
}
.modal-header h2{
    font-weight: lighter;
}
.modal-header span{
    cursor: pointer;
}
.modal-body{
    padding: 2px 16px;
    flex: 10;
}

.upload-here{
    display: flex;
}
.staging-area{
    width: 30%;
}
.staging-area .staged-img{
    height: 100%;
    width: 100%;
}
.upload-form{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
}
.upload-form div{
    width: 40%;
    text-align: justify;
}
.upload-form button{
  width: 100%;
  background-color: rgb(116, 10, 10);
  color: white;
  margin: 1% 0 3%;
  padding: 3.5%;
  cursor: pointer;
  border: none;
}
.upload-form input[type="file"]{
  background: none;
  padding-left: 0;
}
.upload-form .file-info{
  color: rgb(45, 104, 18);
  font-size: 12px;
}
.upload-form input, .upload-form textarea, .upload-form select{
  border-right: 3px solid rgb(116, 10, 10);
  border-left: none;
  border-top: none;
  border-bottom: none;
  width: 100%;
  padding: 3%;
  color: rgb(86, 126, 68);
  background: white;
}
.upload-form div.text-description-input input{
    margin-bottom: 5%;
}
.upload-form div.nutrition{
  margin: 0;
  position: relative;
}
.upload-form div.nutrition button{
  border-right: 3px solid rgb(116, 10, 10);
  border-left: none;
  border-top: none;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: rgb(71, 122, 252);
}
.upload-form div.backgroundColor, .upload-form div.svgColor{
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: flex-end;
}
.upload-form div.backgroundColor label, .upload-form div.svgColor label{
    font-size: 12px;
    color: rgb(45, 104, 18);
}
.upload-form .error{
  color: rgb(255, 0, 0);
  font-size: 12px;
}
</style>