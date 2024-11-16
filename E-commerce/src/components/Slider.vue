<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

interface Slide {
  image: string;
  title: string;
  description: string;
  link: string;
}

export default defineComponent({
  name: 'ProductSlider',
  props: {
    slides: {
      type: Array as () => Slide[],
      required: true
    },
    autoplayInterval: {
      type: Number,
      default: 5000
    }
  },
  setup(props) {
    const currentSlide = ref(0);
    const autoplayTimer = ref<number | null>(null);
    const touchStart = ref(0);
    const touchEnd = ref(0);

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % props.slides.length;
    };

    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? props.slides.length - 1 
        : currentSlide.value - 1;
    };

    const goToSlide = (index: number) => {
      currentSlide.value = index;
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer.value = window.setInterval(nextSlide, props.autoplayInterval);
    };

    const stopAutoplay = () => {
      if (autoplayTimer.value) {
        clearInterval(autoplayTimer.value);
        autoplayTimer.value = null;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.value = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.value = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const difference = touchStart.value - touchEnd.value;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    onMounted(() => {
      startAutoplay();
    });

    onUnmounted(() => {
      stopAutoplay();
    });

    return {
      currentSlide,
      nextSlide,
      prevSlide,
      goToSlide,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    };
  }
});
</script>

<template>
  <div class="slider-container">
    <div class="slider" ref="slider">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="slide"
        :class="{ active: currentSlide === index }"
        :style="{ transform: `translateX(${100 * (index - currentSlide)}%)` }"
      >
        <img :src="slide.image" :alt="slide.title">
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <button class="shop-now-btn" @click="$emit('shop-now', slide)">
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>

    <button class="slider-btn prev" @click="prevSlide" aria-label="Previous slide">
      &#10094;
    </button>
    <button class="slider-btn next" @click="nextSlide" aria-label="Next slide">
      &#10095;
    </button>

    <div class="slider-dots">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        class="dot"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div>
  </div>
</template>

<style lang="css">
.slider-container {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin-bottom: 2rem;
}

.slider {
    height: 100%;
    touch-action: pan-y pinch-zoom;
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: linear-gradient(transparent, rgba(93, 85, 77, 0.9));
    color: #ffffff;
    transform: translateY(100%);
    transition: transform 0.5s ease;
}

.slide.active .slide-content {
    transform: translateY(0);
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(190, 129, 81, 0.7);
    color: #ffffff;
    border: none;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.slider-btn:hover {
    background: rgba(176, 109, 70, 0.9);
}

.prev {
    left: 1rem;
}

.next {
    right: 1rem;
}

.slider-dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(232, 214, 192, 0.5);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background: #e8d6c0;
}

.shop-now-btn {
    background: #BE8151;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s;
}

.shop-now-btn:hover {
    transform: scale(1.05);
    background: #B06D46;
}

@media (max-width: 768px) {
    .slider-container {
        height: 300px;
    }

    .slide-content {
        padding: 1rem;
    }

    .slide-content h2 {
        font-size: 1.5rem;
    }
}
</style>