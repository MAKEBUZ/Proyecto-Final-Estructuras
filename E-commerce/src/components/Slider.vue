<template>
    <div class="slider-wrapper">
      <div ref="container" class="container">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="box"
          :class="[`box-${index + 1}`, {'active': currentSlide === index}]"
          :style="{ backgroundImage: `url(${slide.image})` }"
          @click="navigateToRoute(slide.route)"
        >
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <span class="view-more">
              <ArrowRight class="icon" />
              {{ slide.buttonText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import { ArrowRight } from 'lucide-vue-next';
  import { useRouter } from 'vue-router';
  import Slider1 from '../assets/Slider/slider1.jpg';
  import Slider2 from '../assets/Slider/slider2.jpg';
  import Slider3 from '../assets/Slider/slider3.jpg';
  import Slider4 from '../assets/Slider/slider4.jpg';
  import Slider5 from '../assets/Slider/slider5.jpg';
  
  interface Slide {
    image: string;
    title: string;
    buttonText: string;
    route: string;
  }
  
  const router = useRouter();
  const slides: Slide[] = [
    {
      image: Slider1,
      title: "Nueva Colección",
      buttonText: "Ver Colección",
      route: "/collection"
    },
    {
      image: Slider2,
      title: "Ofertas Especiales",
      buttonText: "Ver Ofertas",
      route: "/offers"
    },
    {
      image: Slider3,
      title: "Accesorios",
      buttonText: "Explorar",
      route: "/accessories"
    },
    {
      image: Slider4,
      title: "Categorías",
      buttonText: "Ver Categorías",
      route: "/categories"
    },
    {
      image: Slider5,
      title: "Novedades",
      buttonText: "Descubrir",
      route: "/new-arrivals"
    }
  ];
  
  const container = ref<HTMLElement | null>(null);
  const currentSlide = ref(0);
  
  const navigateToRoute = (route: string) => {
    router.push(route);
  };
  
  onMounted(() => {
    nextTick(() => {
      document.querySelectorAll<HTMLElement>('.box').forEach((box, index) => {
        box.addEventListener('mouseover', () => {
          if (container.value) {
            container.value.style.gridTemplateColumns = getComputedStyle(document.documentElement)
              .getPropertyValue(`--layout-${index + 1}`);
          }
        });
      });
  
      if (container.value) {
        container.value.addEventListener('mouseleave', () => {
          if (container.value) {
            container.value.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
          }
        });
      }
    });
  });
  </script>
  
  <style scoped>
  .slider-wrapper {
    position: relative;
    width: 60rem;
  }
  
  .container {
    position: relative;
    width: 100%;
    height: 70vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 0.5em;
    transition: all 400ms;
    padding: 0.5em;
    --layout-1: 3fr 1fr 1fr 1fr 1fr;
    --layout-2: 1fr 3fr 1fr 1fr 1fr;
    --layout-3: 1fr 1fr 3fr 1fr 1fr;
    --layout-4: 1fr 1fr 1fr 3fr 1fr;
    --layout-5: 1fr 1fr 1fr 1fr 3fr;
  }
  
  .box {
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 400ms;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    overflow: hidden;
  }
  
  .box:nth-child(odd) {
    transform: translateY(-16px);
  }
  
  .box:nth-child(even) {
    transform: translateY(16px);
  }
  
  .container:hover .box {
    filter: grayscale(100%) opacity(24%);
  }
  
  .container .box:hover {
    filter: grayscale(0%) opacity(100%);
  }
  
  .slide-content {
    position: absolute;
    bottom: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px 14px;
    transform: translateY(100px);
    transition: all 400ms;
    opacity: 0;
    width: auto;
    text-align: center;
  }
  
  .box:hover .slide-content {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 200ms;
  }
  
  .slide-content h2 {
    font-size: 1.2rem;
    margin: 0 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .view-more {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #a8e6cf;
  }
  
  .icon {
    width: 16px;
    height: 16px;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .container {
      height: 70vh;
    }
  }
  
  @media (max-width: 768px) {
    .container {
      height: 60vh;
    }
    
    .box:nth-child(odd),
    .box:nth-child(even) {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      height: 50vh;
      grid-template-columns: 1fr;
      --layout-1: 1fr;
      --layout-2: 1fr;
      --layout-3: 1fr;
      --layout-4: 1fr;
      --layout-5: 1fr;
    }
  
    .slide-content {
      transform: translateY(0);
      opacity: 1;
    }
  
    .box {
      height: 200px;
    }
  }
  </style>
  