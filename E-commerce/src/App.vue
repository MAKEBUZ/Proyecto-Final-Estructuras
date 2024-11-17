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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}

body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
}
.content {
        margin-top: 7rem;
        flex: 1;
}
</style>