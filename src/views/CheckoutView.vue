<script lang="ts">
import { defineComponent } from 'vue';
import Payment from '../components/Payment.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Payment
    },
});
</script>
<template>
  <Payment />
</template>

<style>
</style>
