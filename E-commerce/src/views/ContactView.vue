<script lang="ts">
import { defineComponent } from 'vue';
import ContactForm from '@/components/ContactForm.vue';
import Comments from '../components/Comments.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        ContactForm,
        Comments
    },
});
</script>
<template>
    <ContactForm />
    <Comments />
</template>

<style>
</style>
