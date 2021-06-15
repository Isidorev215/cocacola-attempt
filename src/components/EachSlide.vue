<template>
    <transition :name='direction'>
        <div class="text-carousel" v-if="visibleSlide === index" >
            <h4>{{slide.title}}</h4>
            <p>{{slide.paragraph}}</p>
        </div>
    </transition>
</template>

<script>
export default {
    props: [ 'slide', 'visibleSlide', 'index', 'direction' ]
}
</script>

<style>
.text-carousel{
    height: 80%;
    padding: 5% 15% 5%;
    background-color: rgb(248, 247, 247);
    color:  rgb(17, 15, 15);
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 0.8rem;
    position: absolute;
    top: 20%;
    bottom: 0;
    left: 0;
    right: 0;
}

.left-enter-active{
    animation: leftInAnimation 0.4s ease-in-out;
}
.left-leave-active{
    animation: leftOutAnimation 0.4s ease-in-out;
}
@keyframes leftInAnimation{
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}
@keyframes leftOutAnimation{
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}

.right-enter-active{
    animation: rightInAnimation 0.4s ease-in-out;
}
.right-leave-active{
    animation: rightOutAnimation 0.4s ease-in-out;
}
@keyframes rightInAnimation{
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
@keyframes rightOutAnimation{
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
}
</style>