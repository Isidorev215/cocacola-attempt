<template>
  <div class="accordion-container">
        <div class="one-accordion">
          <input type="radio" checked name="accordion" id="accordion1">
          <label for="accordion1">Accordion 1(note: replace from firestore)</label>
          <div class="accordion-content">
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
          </div>
        </div>
        <div class="one-accordion">
          <input type="radio" name="accordion" id="accordion2">
          <label for="accordion2">Accordion 1(note: replace from firestore)</label>
          <div class="accordion-content">
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
          </div>
        </div>
        <div class="one-accordion">
          <input type="radio" name="accordion" id="accordion3">
          <label for="accordion3">Accordion 1(note: replace from firestore)</label>
          <div class="accordion-content">
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
          </div>
        </div>
        <div class="one-accordion">
          <input type="radio" name="accordion" id="accordion4">
          <label for="accordion4">Accordion 1(note: replace from firestore)</label>
          <div class="accordion-content">
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
            <p>This is the Lorem ipsum of the accordion</p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name: 'Accordion'

}
</script>

<style>
.accordion-container{
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
}

.one-accordion:first-child label{
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.one-accordion:last-child .accordion-content{
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border: none;
}
.one-accordion:last-child label{
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.accordion-container input[type="radio"]{
  display: none;
}
.accordion-container label{
  display: block;
  padding: 10px;
  border-bottom: 1px solid black;
  color: black;
  background-color: grey;
}

.accordion-container .accordion-content{
  opacity: 0;
  max-height: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
  color: black;
  transition: all 0.5s linear;
}
.accordion-container input:checked ~ .accordion-content{
  opacity: 1;
  max-height: 400px;
  padding: 5px;
}
.accordion-container input:checked ~ label{
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>