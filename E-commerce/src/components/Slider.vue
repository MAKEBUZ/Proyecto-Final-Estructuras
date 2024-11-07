<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';

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
  <div class="container">
    <div class="box box-1" style="--img: url('@/assets/Slider/slider1.jpg');" data-text="hola1"></div>
    <div class="box box-2" style="--img: url('@/assets/Slider/slider2.jpg');" data-text="hola2"></div>
    <div class="box box-3" style="--img: url('@/assets/Slider/slider3.jpg');" data-text="hola3"></div>
    <div class="box box-4" style="--img: url('@/assets/Slider/slider4.jpg');" data-text="hola4"></div>
    <div class="box box-5" style="--img: url('@/assets/Slider/slider5.jpg');" data-text="hola5"></div>
  </div>
</template>
  
<style lang="css">
@font-face {
    font-family: "ja-med";
    src: url("https://cdn.jsdelivr.net/gh/codetheworld-io/static-files/ja-med.otf");
}

body {
    margin: 0;
    padding: 0;
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
    overflow: hidden;
}

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
    background: var(--img) center center;
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