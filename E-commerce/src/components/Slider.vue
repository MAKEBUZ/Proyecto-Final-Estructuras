<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import type { Offer } from '@/types';

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export default defineComponent({
  name: 'ProductSlider',
  props: {
    offers: {
      type: Array as () => Offer[],
      required: true
    },
    autoplayInterval: {
      type: Number,
      default: 5000
    }
  },
  setup(props) {
    const store = useStore();
    const currentSlide = ref(0);
    const autoplayTimer = ref<number | null>(null);
    const touchStart = ref(0);
    const touchEnd = ref(0);
    const isAdding = ref<number | null>(null);

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % props.offers.length;
    };

    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? props.offers.length - 1 
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

    const addToCart = async (offer: Offer) => {
      if (isAdding.value) return;

      isAdding.value = offer.id;
      try {
        const cartItem: CartItem = {
          id: offer.id,
          quantity: 1,
          name: offer.title,
          price: offer.price
        };

        await store.dispatch('addItemToCart', cartItem);
        showSuccessAlert(offer.title);
      } catch (error) {
        console.error('Error adding to cart:', error);
        showErrorAlert();
      } finally {
        setTimeout(() => {
          isAdding.value = null;
        }, 500);
      }
    };

    const showSuccessAlert = (title: string) => {
      const alert = document.createElement('div');
      alert.className = 'success-alert';
      alert.textContent = `¡${title} añadido al carrito!`;
      document.body.appendChild(alert);
      
      setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(alert);
        }, 300);
      }, 2000);
    };

    const showErrorAlert = () => {
      const alert = document.createElement('div');
      alert.className = 'error-alert';
      alert.textContent = 'Error al añadir al carrito. Inténtalo de nuevo.';
      document.body.appendChild(alert);
      
      setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(alert);
        }, 300);
      }, 2000);
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
      handleTouchEnd,
      isAdding,
      addToCart
    };
  }
});
</script>

<template>
  <div class="slider-container">
    <div 
      class="slider" 
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div 
        v-for="(offer, index) in offers" 
        :key="offer.id"
        class="slide"
        :class="{ active: currentSlide === index }"
        :style="{ transform: `translateX(${100 * (index - currentSlide)}%)` }"
      >
        <img :src="offer.image" :alt="offer.title">
        <div class="slide-content">
          <span class="discount-badge" v-if="offer.discount">-{{ offer.discount }}%</span>
          <h2>{{ offer.title }}</h2>
          <p>{{ offer.description }}</p>
          <div class="price-container">
            <span class="old-price" v-if="offer.oldPrice">€{{ offer.oldPrice }}</span>
            <span class="current-price">€{{ offer.price }}</span>
          </div>
          <button 
            class="shop-now-btn" 
            :class="{ 'is-adding': isAdding === offer.id }"
            @click="addToCart(offer)"
            :disabled="isAdding === offer.id"
          >
            {{ isAdding === offer.id ? 'Añadiendo...' : 'Comprar Ahora' }}
          </button>
        </div>
      </div>
    </div>

    <div class="slider-controls">
      <button class="slider-btn prev" @click="prevSlide" aria-label="Previous slide">
        &#10094;
      </button>
      <button class="slider-btn next" @click="nextSlide" aria-label="Next slide">
        &#10095;
      </button>
    </div>

    <div class="slider-dots">
      <button 
        v-for="(offer, index) in offers" 
        :key="offer.id"
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
    margin-bottom: 3rem; /* Aumentado para dar espacio al título */
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
    object-fit: contain; /* Cambiado a contain para mantener la proporción */
    background: #f5f5f5; /* Fondo para imágenes que no ocupen todo el espacio */
}

.slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.7); /* Fondo más oscuro y opaco */
    color: #ffffff;
    transform: translateY(0); /* Quitado el transform inicial */
    transition: transform 0.3s ease;
}

/* Títulos fuera del slider */
.slide h2 {
    position: absolute;
    bottom: -60px; /* Posición debajo del slider */
    left: 0;
    width: 100%;
    text-align: center;
    color: #333; /* Color oscuro para el título */
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    padding: 1rem 0;
}

/* Flechas estilizadas */
.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(190, 129, 81, 0.8); /* Color que coincide con tu esquema */
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.slider-btn:hover {
    background: rgba(190, 129, 81, 1);
    transform: translateY(-50%) scale(1.1);
}

.slider-btn.prev {
    left: 20px;
}

.slider-btn.next {
    right: 20px;
}

/* Estilo para las flechas usando pseudo-elementos */
.slider-btn::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    position: absolute;
}

.slider-btn.prev::before {
    transform: rotate(-135deg);
    margin-left: 4px;
}

.slider-btn.next::before {
    transform: rotate(45deg);
    margin-right: 4px;
}

/* Puntos indicadores */
.slider-dots {
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 1rem 0;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: #BE8151;
    transform: scale(1.2);
}

/* Ajustes responsive */
@media (max-width: 768px) {
    .slider-container {
        height: 300px;
        margin-bottom: 4rem; /* Más espacio para el título en móvil */
    }

    .slide h2 {
        font-size: 1.2rem;
        bottom: -50px;
    }

    .slider-btn {
        width: 30px;
        height: 30px;
    }

    .slider-btn::before {
        width: 8px;
        height: 8px;
    }
}
</style>