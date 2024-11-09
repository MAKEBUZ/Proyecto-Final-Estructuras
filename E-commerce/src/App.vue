<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const store = useStore();
const isMobileMenuOpen = ref(false);

onMounted(() => {
  store.dispatch('initializeStore');
watch(() => isMobileMenuOpen.value, (isOpen: boolean) => {
  document.documentElement.classList.toggle('menu-open', isOpen);
document.documentElement.classList.toggle('menu-open', isOpen);
});
});
</script>
<template>
    <div class="header-main">
        <Header/>
    </div>
   <div class="content">
    <RouterView />
   </div>
   <div class="footer-main">
    <Footer/>
   </div> 
</template>

<style lang="css">
body {
    font-family: 'Libre Baskerville', serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.content {
    margin-top: 7rem;
    flex: 1;
}
.header-main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
</style>
