<script lang="ts">
import { defineComponent } from 'vue';
import ProductSlider from '../components/Slider.vue';
import Slider1 from '../assets/Slider/slider1.jpg';
import Slider2 from '../assets/Slider/slider2.jpg';
import Slider3 from '../assets/Slider/slider3.jpg';
import Slider4 from '../assets/Slider/slider4.jpg';
import Slider5 from '../assets/Slider/slider5.jpg';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductSlider,
  },
  data() {
    return {
      slides: [
        {
          image: Slider1,
          title: 'Nueva Colección',
          description: 'Descubre las últimas tendencias',
          link: '/collection/new'
        },
        {
          image: Slider2,
          title: 'Colección de Verano',
          description: 'Descubre las últimas tendencias',
          link: '/collection/summer'
        },
        {
          image: Slider3,
          title: 'Colección de Invierno',
          description: 'Descubre las últimas tendencias',
          link: '/collection/winter'
        },
        {
          image: Slider4,
          title: 'Colección de Primavera',
          description: 'Descubre las últimas tendencias',
          link: '/collection/spring'
        },
        {
          image: Slider5,
          title: 'Colección de Otoño',
          description: 'Descubre las últimas tendencias',
          link: '/collection/autumn'
        },
      ],
    };
  },
  methods: {
    handleShopNow(slide: any) {
      this.$router.push(slide.link);
    },
    handleCategorySelect(category: any) {
      this.$router.push(`/category/${category.id}`);
    }
  }
});
</script>

<template>
    <div class="home">
        <h1>Home Page</h1>
        <p>Welcome to the home page</p>
    </div>
    <div class="home-page">
    <ProductSlider 
      :slides="slides"
      @shop-now="handleShopNow"
    />
  </div>
</template>

<style lang="css">
.home {
  background: #f9f9f9;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    text-align: center;
}

.slider-container {
    margin-top: 2rem;
}
</style>

