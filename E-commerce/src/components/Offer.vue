<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import type { Offer } from '@/types';
import Offer1 from '../assets/Offer/offer1.jpg';
import Offer2 from '../assets/Offer/offer2.jpg';
import Offer3 from '../assets/Offer/offer3.jpg';
import Offer4 from '../assets/Offer/offer4.jpg';

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export default defineComponent({
  name: 'OffersPage',
  props: {
    autoplayInterval: {
      type: Number,
      default: 5000
    }
  },
  setup(props) {
    const store = useStore();
    const isAdding = ref<number | null>(null);
    const currentSlide = ref(0);
    const autoplayTimer = ref<number | null>(null);
    const touchStart = ref(0);
    const touchEnd = ref(0);

    const offers = ref<Offer[]>([
      {
        id: 10000,
        title: "Camiseta del Deportivo Pasto",
        description: "Camiseta del Deportivo Pasto edicion especial 'La del Ascenso'",
        price: 100.00,
        oldPrice: 129.99,
        discount: 33,
        image: Offer1
      },
      {
      id: 10001,
      title: "Camiseta Arquero Pasto",
      description: "Camiseta de Arquero del Deportivo Pasto",
      price: 89.99,
      oldPrice: 119.99,
      discount: 25,
      image: Offer2,
    },
    {
      id: 10002,
      title: "Camiseta Seleccion Colombia - Local",
      description: "Camiseta Seleccion Colombia - Local",
      price: 150.00,
      oldPrice: 199.99,
      discount: 20,
      image: Offer3,
    },
    {
      id: 10003,
      title: "Camiseta Seleccion Colombia - Visitante",
      description: "Camiseta Seleccion Colombia - Visitante", 
      price: 150.00,
      oldPrice: 199.99,
      discount: 20,
      image: Offer4,
    }
    ]);

    // Funciones del slider
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % offers.value.length;
    };

    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? offers.value.length - 1 
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

    // Manejo de eventos táctiles
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

    // Funciones del carrito
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
      alert.textContent = `${title} añadido al carrito!`;
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
      offers,
      currentSlide,
      isAdding,
      nextSlide,
      prevSlide,
      goToSlide,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      addToCart
    };
  }
});
</script>

<template>
  <div class="offers-page">
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
          <div class="slide-inner">
            <div class="offer-image">
              <img :src="offer.image" :alt="offer.title">
              <span class="discount-badge">-{{ offer.discount }}%</span>
            </div>
            <div class="offer-content">
              <h2>{{ offer.title }}</h2>
              <p>{{ offer.description }}</p>
              <div class="price-container">
                <span class="old-price">€{{ offer.oldPrice }}</span>
                <span class="current-price">€{{ offer.price }}</span>
              </div>
              <button 
                class="buy-button" 
                :class="{ 'is-adding': isAdding === offer.id }"
                @click="addToCart(offer)"
                :disabled="isAdding === offer.id"
              >
                <span class="button-text">
                  {{ isAdding === offer.id ? 'Añadiendo...' : 'Comprar Ahora' }}
                </span>
              </button>
            </div>
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
  </div>
</template>

<style lang="css">
.offers-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin-bottom: 3rem;
  background: #F4ECE0;
}

.slider {
  height: 100%;
  touch-action: pan-y pinch-zoom;
  position: relative;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.slide-inner {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px; /* Espacio para los dots */
}

.offer-image {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F4ECE0;
  overflow: hidden;
}

.offer-image img {
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block;
}

.discount-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #BE8151;
  color: #F4ECE0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
}

.offer-content {
  width: 100%;
  background: #764836;
  padding: 1rem 1.5rem;
  position: relative;
}

.offer-content h2 {
  color: #e8d6c0;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.offer-content p {
  color: #d9bb98;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.old-price {
  text-decoration: line-through;
  color: #d9bb98;
}

.current-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #BE8151;
}

.buy-button {
  background: #BE8151;
  color: #F4ECE0;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.buy-button:hover {
  background: #B06D46;
}

.buy-button.is-adding {
  opacity: 0.7;
  cursor: not-allowed;
}

.slider-controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px; /* Ajustado para no interferir con los dots */
  pointer-events: none;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(190, 129, 81, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F4ECE0;
  font-size: 1.2rem;
}

.slider-btn:hover {
  background: #B06D46;
  transform: translateY(-50%) scale(1.1);
}

.slider-btn.prev {
  left: 20px;
}

.slider-btn.next {
  right: 20px;
}

.slider-dots {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #764836;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d9bb98;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot.active {
  background: #BE8151;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .slider-container {
    height: 500px;
  }

  .offer-content {
    padding: 0.8rem;
  }

  .offer-content h2 {
    font-size: 1.2rem;
  }

  .offer-content p {
    font-size: 0.9rem;
  }

  .slider-btn {
    width: 30px;
    height: 30px;
  }
}
</style>