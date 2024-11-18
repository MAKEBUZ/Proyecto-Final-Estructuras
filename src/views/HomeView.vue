<script lang="ts">
import { defineComponent, ref } from 'vue';
import OfferSlider from '../components/Offer.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    OfferSlider,
  },
});
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
    </div>
    <div class="slider-section">
      <OfferSlider :autoplayInterval="5000"/>
    </div>
  </div>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}
.home-container {
  min-height: 100vh;
  background: #f9f9f9;
}

.home-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.slider-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .home-header {
    padding: 1rem 0;
  }

  .slider-section {
    margin: 1rem auto;
  }
}
</style>