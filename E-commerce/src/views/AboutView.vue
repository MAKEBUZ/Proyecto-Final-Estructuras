<script lang="ts">
import { defineComponent } from 'vue';
import About from '../components/About.vue';
import Comments from '../components/Comments.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        About,
        Comments
    },
});
</script>
<template>
  <About />
  <Comments />
</template>

<style>

</style>
