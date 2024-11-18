<script lang="ts">
import { defineComponent } from 'vue';
import Comments from '../components/Comments.vue';

export default defineComponent({
    name: 'CommentsView',
    components: {
        Comments,
    },
});
</script>

<template>
    <Comments />
</template>

<style lang="css">
</style>