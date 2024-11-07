<script lang="ts">
import { defineComponent } from 'vue';
import Slider from '@/components/Slider.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Slider,
    },
});
</script>

<template>
    <div class="home">
        <h1>Welcome to our E-commerce site!</h1>
        <p>Here you can find a wide range of products for all your needs.</p>
        <div class="slider-container">
            <Slider />
        </div>
    </div>
</template>

<style lang="css">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}

.slider-container {
    margin-top: 2rem;
}
</style>