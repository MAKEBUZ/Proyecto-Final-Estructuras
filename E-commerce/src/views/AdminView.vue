<script lang="ts">
import { defineComponent } from 'vue';
import ShowComments from '../components/ShowComments.vue';
import BillManager from '../components/BillManager.vue';

export default defineComponent({
    name: 'AdminView',
    components: {
        ShowComments,
        BillManager,
    },
});
</script>

<template>
    <BillManager />
    <ShowComments />
</template>

<style lang="css">
</style>