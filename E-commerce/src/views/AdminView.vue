<script lang="ts">
import { defineComponent } from 'vue';
import ShowComments from '../components/ShowComments.vue';
import BillManager from '../components/BillManager.vue';
import ContactManager from '../components/ContactManager.vue';

export default defineComponent({
    name: 'AdminView',
    components: {
        ShowComments,
        BillManager,
        ContactManager
    },
});
</script>

<template>
    <BillManager />
    <ShowComments />
    <ContactManager />
</template>

<style lang="css">
</style>