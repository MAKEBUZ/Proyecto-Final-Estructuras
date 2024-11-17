<script lang="ts">
import { defineComponent } from 'vue';
import AdminForm from '../components/AdminForm.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        AdminForm
    },
});
</script>
<template>
  <AdminForm />
</template>

<style>
</style>
