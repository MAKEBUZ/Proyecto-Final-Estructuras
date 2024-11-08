<script lang="ts">
import { defineComponent } from 'vue';
import About from '@/components/About.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        About,
    },
});
</script>
<template>
  <About />
</template>

<style>
</style>
