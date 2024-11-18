<script lang="ts">
import { defineComponent } from 'vue';
import APanel from '../components/ArticlesPanel.vue';
import Offer from '../components/Offer.vue';

export default defineComponent({
  name: 'ShopView',
  components: {
    APanel,
    Offer,
  },
});
</script>

<template>
  <div>
    <Offer />
    <APanel />
  </div>
</template>

<style lang="css">
</style>
