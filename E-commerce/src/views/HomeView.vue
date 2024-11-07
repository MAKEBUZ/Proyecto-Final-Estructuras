<script lang="ts">
import {defineOptions} from 'vue';
import Slider from '@/components/Slider.vue';
defineOptions({
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
        <Slider />
    </div>
</template>

<style lang="css">
</style>
