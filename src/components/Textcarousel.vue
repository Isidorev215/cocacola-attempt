<template>
    <div class="control-btn">
        <i @click="prev" class="goback">&lt;</i>
        <i @click="next" class="goforward">&gt;</i>
    </div>
        <EachSlide v-for="(slide, index) in slides" :key="slide.id" 
        :slide="slide" :visibleSlide="visibleSlide" :index="index" 
        :direction="direction" />
</template>

<script>
import EachSlide from '../components/EachSlide.vue'
export default {
    components: { EachSlide },
    data(){
        return {
            slides: [
                {title: 'NEVER GO OUT OF STYLE', paragraph: 'Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!', id: 1},
                {title: 'ARE YOU OUT OF STYLE?', paragraph: 'Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!', id: 2},
                {title: 'WHERE IS A STYLE', paragraph: 'Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!', id: 3},
                {title: 'WHO IS A STYLE', paragraph: 'Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!', id: 4},
                {title: 'WHY IS A STYLE', paragraph: 'Loremi ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem similique qui recusandae doloremque perferendis!', id: 5},
            ],
            visibleSlide: 0,
            direction: ''
        }
    },
    methods:{
        next(){
            if(this.visibleSlide >= this.slides.length - 1){
                this.visibleSlide = 0;
            }else{
                this.visibleSlide++;
            }
            this.direction = 'left'
        },
        prev(){
            if(this.visibleSlide <= 0){
                this.visibleSlide = this.slides.length - 1;
            }else{
                this.visibleSlide--;
            }
            this.direction = 'right'
        }
    }
}
</script>

<style>
.control-btn{
    height: 20%;
    display: flex;
    justify-content: flex-end;
}
.control-btn i:first-child{
    border-right: 1px solid white;
}
.control-btn i{
    display: inline-block;
    height: 100%;
    width: 13%;
    background-color: rgb(107, 0, 0);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.4rem;
}
.control-btn i:hover{
    background-color: rgb(116, 114, 114);
}



</style>