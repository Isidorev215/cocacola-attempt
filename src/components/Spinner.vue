<template>
  <div class="spin"></div>
</template>

<script>
export default {

}
</script>

<style>
.spin{
    display: block;
    width: 40px;
    height: 40px;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(116, 10, 10);
    border-bottom-color: rgb(116, 10, 10);
    border-left-color: none;
    border-right-color:  rgb(116, 10, 10);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotateZ(360deg) }
}
</style>