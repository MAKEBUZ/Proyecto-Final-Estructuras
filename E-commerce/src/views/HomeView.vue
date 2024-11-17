<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductSlider from '../components/Slider.vue';
import type { Offer } from '@/types';

import Offer1 from '../assets/Offer/offer1.jpg';
import Offer2 from '../assets/Offer/offer2.jpg';
import Offer3 from '../assets/Offer/offer3.jpg';
import Offer4 from '../assets/Offer/offer4.jpg';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductSlider,
  },
  setup() {
    const offers = ref<Offer[]>([
      {
        id: 10000,
        title: "Camiseta del Deportivo Pasto",
        price: 100.00,
        oldPrice: 129.99,
        discount: 33,
        description: "Camiseta del Deportivo Pasto edicion especial 'La del Ascenso'",
        image: Offer1,
      },
      {
        id: 10001,
        title: "Camiseta Arquero Pasto",
        description: "Camiseta de Arquero del Deportivo Pasto",
        price: 89.99,
        oldPrice: 119.99,
        discount: 25,
        image: Offer2 
      },
      {
        id: 10002,
        title: "Camiseta Seleccion Colombia - Local",
        description: "Camiseta Seleccion Colombia - Local",
        price: 150.00,
        oldPrice: 199.99,
        discount: 20,
        image: Offer3
      },
      {
        id: 10003,
        title: "Camiseta Seleccion Colombia - Visitante",
        description: "Camiseta Seleccion Colombia - Visitante",
        price: 150.00,
        oldPrice: 199.99,
        discount: 20,
        image: Offer4
      }
    ]);

    return {
      offers
    };
  }
});
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
    </div>
    <div class="slider-section">
      <ProductSlider 
        :offers="offers" 
        :autoplayInterval="5000"
      />
    </div>
  </div>
</template>

<style lang="css">
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