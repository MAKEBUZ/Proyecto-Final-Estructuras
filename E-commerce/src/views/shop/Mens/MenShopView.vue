<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '@/components/ProductList.vue';
import APanel from '@/components/ArticlesPanel.vue';

export default defineComponent({
  name: 'MenShopView',
  components: {
    ProductList,
    APanel
  },
});
</script>
<template>
    <ProductList category="Mens"/>
    <APanel />
</template>
<style lang="css">
</style>