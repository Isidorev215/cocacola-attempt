<template>
    <div class="nutrition-popup">
        <div class="nutrition-1">
           <p class="nutrition-title">Sodium</p>
            <input type="number" name="value" placeholder="Value input" @input="handleOnInput">
            <input type="number" name="percent" placeholder="%" @input="handleOnInput">
            <button class="add" @click="handleClick">+</button>
        </div>
        <div class="nutrition-2">
            <p class="nutrition-title">Total Fats</p>
            <input type="number" name="value" placeholder="Value input" @input="handleOnInput">
            <input type="number" name="percent" placeholder="%" @input="handleOnInput">
            <button class="add" @click="handleClick">+</button>
        </div>
        <div class="nutrition-3">
            <p class="nutrition-title">Sodium (mg)</p>
            <input type="number" name="value" placeholder="Value input"  @input="handleOnInput">
            <input type="number" name="percent" placeholder="%" @input="handleOnInput"> 
            <button class="add" @click="handleClick">+</button>
        </div>
        <div class="nutrition-4">
            <p class="nutrition-title">Potasium</p>
            <input type="number" name="value" placeholder="Value input" @input="handleOnInput">
            <input type="number" name="percent" placeholder="%" @input="handleOnInput">
            <button class="add" @click="handleClick">+</button>
        </div>
        <div class="nutrition-5">
            <p class="nutrition-title">Calcium</p>
            <input type="number" name="value" placeholder="Value input"  @input="handleOnInput">
            <input type="number" name="percent" placeholder="%" @input="handleOnInput">
            <button class="add" @click="handleClick">+</button>
        </div>
        <div class="button">
            <button class="continue" @click="handleContinue">Continue</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "NutritionPopup",
    setup(props, context){

        const nutritionArray = ref([
            {},{},{},{},{}
        ])

        const addToArray = (index, obj) => {
            if(nutritionArray.value.length !== 5){
                nutritionArray.value.splice(index, 0, obj)
            }
            else{
                nutritionArray.value[index] = obj
            }
        }

        const handleOnInput = (event) => {
            event.target.parentElement.querySelector('.add').style.backgroundColor = 'rgb(116, 10, 10)'
            if(event.target.name === 'value'){
                if(event.target.value){
                    event.target.style.borderRight = '3px solid rgb(86, 126, 68)'
                }else{
                    event.target.style.borderRight = '3px solid rgb(116, 10, 10)'
                    event.target.parentElement.querySelector('.add').style.backgroundColor = 'rgb(116, 10, 10)'
                }
            }
            if(event.target.name === 'percent'){
                if(event.target.value){
                    event.target.style.borderRight = '3px solid rgb(86, 126, 68)'
                }else{
                    event.target.style.borderRight = '3px solid rgb(116, 10, 10)'
                    event.target.parentElement.querySelector('.add').style.backgroundColor = 'rgb(116, 10, 10)'
                }
            }

            
        }
        
        const handleClick = (event) => {
            const titleElementValue = event.target.parentElement.querySelector('.nutrition-title').textContent
            const valueInputValue = event.target.parentElement.querySelector('input[name="value"]').value
            const percentInputValue = event.target.parentElement.querySelector('input[name="percent"]').value

            // .parentElement.parentElement - there a better alt, but no. I will use this hahaha
            const topDivElement = event.target.parentElement.parentElement
            const childrenHTMLCollection = topDivElement.children
            const childrenArray = Array.from(childrenHTMLCollection)
            const currentnutritionDiv = event.target.parentElement
            const currentIndex = childrenArray.indexOf(currentnutritionDiv)

            if(valueInputValue && percentInputValue){
                addToArray(currentIndex, {
                    title: titleElementValue,
                    value: valueInputValue,
                    percent: percentInputValue
                })
                event.target.style.backgroundColor = 'rgb(86, 126, 68)'
            }
            else{
                //remove that element
                nutritionArray.value[currentIndex] = {}
            }
            
        }
        
        const handleContinue = (event) => {
            const length = (obj) => {
               return Object.keys(obj).length
            }
            
            if( length(nutritionArray.value[0]) !== 0 && length(nutritionArray.value[1]) !== 0 && length(nutritionArray.value[2]) !== 0 && length(nutritionArray.value[3]) !== 0 && length(nutritionArray.value[4]) !== 0){
                event.target.style.backgroundColor = 'rgb(86, 126, 68)'
                context.emit('nutriEmit', nutritionArray.value)
            }
            else{
                event.target.style.backgroundColor = 'rgb(116, 10, 10)'
                context.emit('nutriEmit', [])
            }
        }
        
        return { handleClick, handleOnInput, handleContinue }
    }

}
</script>

<style scoped>
.nutrition-popup{
    position: absolute;
    bottom: -300%;
    right: 105%;
    width: 100%;
    padding: 5%;
    background-color: white;
    border: 3px solid #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.nutrition-popup div{
    display: flex;
    margin: 5% 0;
    width: 100%;
}
.nutrition-popup div p{
    flex: 3;
    border: none;
    color: rgb(86, 126, 68);
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.nutrition-popup div input[name="value"]{
    flex: 2;
}
.nutrition-popup div input[name="percent"]{
    flex: 2;
}
.nutrition-popup div button.add{
    flex: 0.1;
    margin: 0;
    border: none;
    display: flex;
    justify-content: center;
    background-color: rgb(116, 10, 10);
}
.nutrition-popup div input{
    border-left: 1px solid grey;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    margin-right: 2%;
}
.nutrition-popup div.button button{
    border: none;
    text-align: center;
    display: flex;
    justify-content: center;
}
</style>