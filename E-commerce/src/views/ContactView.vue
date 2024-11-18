<script lang="ts">
import { defineComponent } from 'vue';
import ContactForm from '@/components/ContactForm.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        ContactForm,
    },
});
</script>
<template>
    <ContactForm />
</template>

<style>
</style>
