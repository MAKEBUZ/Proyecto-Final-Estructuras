<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '@/components/ProductList.vue';
import APanel from '@/components/ArticlesPanel.vue';

export default defineComponent({
  name: 'KidsTShirtView',
  components: {
    ProductList,
    APanel
  },
});
</script>

<template>
  <div>
    <APanel/>
    <ProductList category="Kids" subcategory="T-Shirt" />
  </div>
</template>

<style lang="css">
</style>
