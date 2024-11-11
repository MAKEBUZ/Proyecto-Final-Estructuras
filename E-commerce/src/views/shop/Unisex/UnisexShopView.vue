<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '@/components/ProductList.vue';
import APanel from '@/components/ArticlesPanel.vue';

export default defineComponent({
  name: 'UnisexShopView',
  components: {
    ProductList,
    APanel
  },
});
</script>
<template>
    <ProductList category="Unisex"/>
    <APanel />
</template>
<style lang="css">
</style>