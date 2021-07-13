<template>
  <fieldset :class="className" ref="fieldset">
        <legend>{{legendName}}</legend>
        <input type="text" name="title" :value="nutritionName" readonly>
        <input type="number" name="value" placeholder="Value input" v-model="valueInput" @blur="handleOnBlur">
        <input type="number" name="percent" placeholder="Percentage" v-model="percentInput" @blur="handleOnBlur">
    </fieldset>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "Fieldset",
    props: ['className', 'legendName', 'nutritionName'],
    setup(props, context){
        const titleInput = ref(props.nutritionName)
        const valueInput = ref(null)
        const percentInput = ref(null)
        const fieldset = ref(null)

        const handleOnBlur = () => {
            // console.log(typeof titleInput.value, typeof valueInput.value, typeof percentInput.value)
            if(titleInput.value && valueInput.value && percentInput.value){
                if(valueInput.value <= 100 && percentInput.value <= 100){
                    const err = null
                    context.emit('fieldsetComplete', err, {
                        title: titleInput.value,
                        value: valueInput.value,
                        percent: percentInput.value
                    })
                    // console.log(fieldset.value)
                    fieldset.value.style.border = "2px solid rgb(86, 126, 68)"
                    const legend = fieldset.value.getElementsByTagName('legend')
                    legend[0].style.color = "rgb(86, 126, 68)"
                }else{
                    const err = 'Max number allowed 100'
                    context.emit('fieldsetComplete', err, {
                        title: titleInput.value,
                        value: null,
                        percent: null,
                    })
                    // console.log(fieldset.value)
                    fieldset.value.style.border = "2px solid rgb(116, 10, 10)"
                    const legend = fieldset.value.getElementsByTagName('legend')
                    legend[0].style.color = "tomato"
                }
            }
            else if(valueInput.value === "" || percentInput.value === "" || valueInput.value === null || percentInput.value === null ){
                const err = `All Fields in ${props.legendName} are required`
                context.emit('fieldsetComplete', err, {
                    title: titleInput.value,
                    value: null,
                    percent: null
                })
                // console.log(fieldset.value)
                fieldset.value.style.border = "2px solid rgb(116, 10, 10)"
                const legend = fieldset.value.getElementsByTagName('legend')
                legend[0].style.color = "tomato"
            }
        }

        return { handleOnBlur, titleInput, valueInput, percentInput, fieldset }
    }

}
</script>

<style>
fieldset{
    margin-bottom: 5px;
    border-radius: 10px;
    border: 2px solid rgb(116, 10, 10);
}
fieldset legend{
    font-size: 0.7rem;
    text-align: left;
    color: tomato;
}
fieldset input:first-child{
    width: 50%;
}
fieldset input[name="value"]{
    width: 25%;
}
fieldset input:last-child{
    width: 25%;
}
</style>