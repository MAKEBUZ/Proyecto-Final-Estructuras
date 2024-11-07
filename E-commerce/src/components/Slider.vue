<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import Slider1 from '../assets/Slider/slider1.jpg';
import Slider2 from '../assets/Slider/slider2.jpg';
import Slider3 from '../assets/Slider/slider3.jpg';
import Slider4 from '../assets/Slider/slider4.jpg';
import Slider5 from '../assets/Slider/slider5.jpg';


const images = [
    Slider1,
    Slider2,
    Slider3,
    Slider4,
    Slider5,
];

const container = ref<HTMLElement | null>(null);

onMounted(() => {
    nextTick(() => {
        document.querySelectorAll<HTMLElement>('.box').forEach((box, index) => {
            box.addEventListener('mouseover', () => {
                if (container.value) {
                    container.value.style.gridTemplateColumns = getComputedStyle(document.documentElement)
                        .getPropertyValue(`--layout-${index + 1}`);
                }
            });
        });

        if (container.value) {
            container.value.addEventListener('mouseleave', () => {
                if (container.value) {
                    container.value.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
                }
            });
        }
    }); 
});
</script>

<template>
  <div ref="container" class="container">
    <div 
      v-for="(image, index) in images" 
      :key="index"
      class="box"
      :class="`box-${index + 1}`"
      :style="{ backgroundImage: `url(${image})` }"
      :data-text="`hola${index + 1}`"
    ></div>
  </div>
</template>
  
<style scoped>
.container {
    position: relative;
    width: 800px;
    height: 500px;
    display: grid;
    font-family: "ja-med", sans-serif;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1em;
    transition: all 400ms;
    --layout-1: 3fr 1fr 1fr 1fr 1fr;
    --layout-2: 1fr 3fr 1fr 1fr 1fr;
    --layout-3: 1fr 1fr 3fr 1fr 1fr;
    --layout-4: 1fr 1fr 1fr 3fr 1fr;
    --layout-5: 1fr 1fr 1fr 1fr 3fr;
}

.box {
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 400ms;
    display: flex;
    justify-content: center;
}

.container:hover .box {
    filter: grayscale(100%) opacity(24%);
}

.container .box:hover {
    filter: grayscale(0%) opacity(100%);
}

.box:nth-child(odd) {
    transform: translateY(-16px);
}

.box:nth-child(even) {
    transform: translateY(16px);
}

.box::after {
    content: attr(data-text);
    position: absolute;
    font-size: large;
    color: #fff;
    background: #000;
    bottom: 20px;
    padding: 10px 10px 10px 14px;
    letter-spacing: 4px;
    text-transform: uppercase;
    transition: all 400ms;
    transform: translateY(60px);
    opacity: 0;
}

.box:hover::after {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 200ms;
}
</style>