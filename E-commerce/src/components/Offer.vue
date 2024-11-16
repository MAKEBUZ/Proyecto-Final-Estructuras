<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import type { Offer } from '@/types';

import Offer1 from '@/assets/Offer/offer1.jpg';

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export default defineComponent({
  name: 'OffersPage',
  setup() {
    const store = useStore();
    const isAdding = ref<number | null>(null);

    const offers = ref<Offer[]>([
      {
        id: 10000,
        title: "Camiseta del Deportivo Pasto",
        description: "Camiseta del Deportivo Pasto edicion especial 'La del Ascenso'",
        price: 100.00,
        oldPrice: 130.00,
        discount: 23,
        image: Offer1
      },
    ]);

    const isVisible = ref(false);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    };

    const addToCart = async (offer: Offer) => {
      if (isAdding.value) return;

      isAdding.value = offer.id;
      try {
        const cartItem: CartItem = {
          id: offer.id,
          quantity: 1,
          name: offer.title,
          price: offer.price // Precio con descuento ya aplicado
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

    return {
      offers,
      isVisible,
      isAdding,
      handleIntersection,
      addToCart
    };
  }
});
</script>

<template>
  <div class="offers-page">
    <div class="offers-grid">
      <div v-for="offer in offers" 
           :key="offer.id" 
           class="offer-card"
           v-intersection-observer="handleIntersection">
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
            <span class="button-text">{{ isAdding === offer.id ? 'Añadiendo...' : 'Comprar Ahora' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.offers-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #5d554d;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.offer-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.offer-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.offer-image {
  position: relative;
  overflow: hidden;
}

.offer-image img {
  width: 100%;
  height: auto; 
  display: block; 
  transition: transform 0.3s ease;
}

.offer-card:hover .offer-image img {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #BE8151;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(190, 129, 81, 0.3);
  transition: transform 0.3s ease;
}

.offer-card:hover .discount-badge {
  transform: scale(1.1);
}

.offer-content {
  padding: 1.5rem;
}

.offer-content h2 {
  color: #333333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.offer-content p {
  color: #5d554d;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.price-container {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.old-price {
  color: #ff0000;
  text-decoration: line-through;
  font-size: 1.1rem;
}

.current-price {
  color: #BE8151;
  font-size: 1.8rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.offer-card:hover .current-price {
  transform: scale(1.05);
}

.buy-button {
  width: 100%;
  padding: 1rem;
  background: #BE8151;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(190, 129, 81, 0.3);
}

.buy-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.buy-button:hover::before {
  width: 300px;
  height: 300px;
}

.buy-button:hover {
  background: #B06D46;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(190, 129, 81, 0.4);
}

.buy-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(190, 129, 81, 0.3);
}

.buy-button.is-adding {
  background: #B06D46;
  cursor: not-allowed;
  animation: pulse 1.5s infinite;
}

.buy-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(190, 129, 81, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(190, 129, 81, 0.3);
  }
}

/* Alerta de éxito */
.success-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #BE8151;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out forwards;
  font-weight: 500;
}

.success-alert.fade-out {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .offers-page {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .offers-grid {
    grid-template-columns: 1fr;
  }

  .offer-card:hover {
    transform: translateY(-5px);
  }

  .current-price {
    font-size: 1.5rem;
  }

  .success-alert {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    text-align: center;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .offer-card {
    background: #5d554d;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .offer-content h2 {
    color: #ffffff;
  }

  .offer-content p {
    color: #e8d6c0;
  }

  .buy-button {
    color: #ffffff;
  }

  .success-alert {
    background-color: #BE8151;
    color: #ffffff;
  }
}

/* Alerta de error */
.error-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #764836;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out forwards;
}

.error-alert.fade-out {
  animation: slideOut 0.3s ease-in forwards;
}

@media (max-width: 768px) {
  .error-alert {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    text-align: center;
  }
}
</style>