<script lang="ts">
import { defineComponent } from 'vue';
import APanel from '../components/ArticlesPanel.vue'
import ProductList from '../components/ProductList.vue'

export default defineComponent({
  components: {
    APanel,
    ProductList,
  },
});
</script>
<template>
    <ProductList />
    <APanel />
</template>
<style lang="css">
</style>