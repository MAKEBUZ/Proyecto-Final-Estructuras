<script lang="ts">
import { defineComponent } from 'vue';
import Cart from '../components/Cart.vue';
export default defineComponent({
    name: 'HomeView',
    components: {
        Cart,
    },
});
</script>
<template>
    <Cart />
</template>
<style lang="css">
</style>