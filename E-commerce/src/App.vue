<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import router from './router';

</script>

<template>
   <Header />
    <RouterView />
   <Footer />
</template>

<style lang="css">
body {
    font-family: 'Libre Baskerville', serif;
}
</style>
