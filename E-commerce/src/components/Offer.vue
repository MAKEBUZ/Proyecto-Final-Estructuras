<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Offer } from '@/types';

export default defineComponent({
  name: 'OffersPage',
  setup() {
    const offers = ref<Offer[]>([
      {
        id: 1,
        title: "Oferta Especial 1",
        description: "Descripción de la oferta especial 1",
        price: 99.99,
        oldPrice: 149.99,
        discount: 33,
        image: "/images/offer1.jpg"
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

    return {
      offers,
      isVisible,
      handleIntersection
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
          <button class="buy-button">Comprar Ahora</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.offers-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.offer-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.offer-card:hover {
  transform: translateY(-10px);
}

.offer-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

.offer-content {
  padding: 1.5rem;
}

.price-container {
  margin: 1rem 0;
}

.old-price {
  color: #999;
  text-decoration: line-through;
  margin-right: 1rem;
}

.current-price {
  color: #2ecc71;
  font-size: 1.5rem;
  font-weight: bold;
}

.buy-button {
  width: 100%;
  padding: 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.buy-button:hover {
  background: #2980b9;
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
}
</style>