<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export default defineComponent({
  name: 'ProductList',
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const sortBy = ref('name');
    const isAddingToCart = ref<number | null>(null);

    // Productos de ejemplo
    const products = ref<Product[]>([
      {
        id: 1,
        name: 'Producto 1',
        price: 99.99,
        description: 'Descripción del producto 1',
        image: 'https://via.placeholder.com/200'
      },
      {
        id: 2,
        name: 'Producto 2',
        price: 149.99,
        description: 'Descripción del producto 2',
        image: 'https://via.placeholder.com/200'
      },
      // Añade más productos aquí
    ]);

    const filteredProducts = computed(() => {
      let result = [...products.value];
      
      // Aplicar búsqueda
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      // Aplicar ordenamiento
      result.sort((a, b) => {
        if (sortBy.value === 'price') {
          return a.price - b.price;
        }
        return a.name.localeCompare(b.name);
      });

      return result;
    });

    const isInCart = (productId: number) => {
      return store.state.cart.items.some((item: CartItem) => item.id === productId);
    };

    const getCartItemQuantity = (productId: number) => {
      const item = store.state.cart.items.find((item: CartItem) => item.id === productId);
      return item ? item.quantity : 0;
    };

    const addToCart = async (product: Product) => {
      isAddingToCart.value = product.id;
      
      await store.dispatch('addItemToCart', {
        id: product.id,
        name: product.name,
        quantity: 1
      });

      setTimeout(() => {
        isAddingToCart.value = null;
      }, 1000);
    };

    const increaseQuantity = (product: Product) => {
      const currentQuantity = getCartItemQuantity(product.id);
      store.dispatch('addItemToCart', {
        id: product.id,
        name: product.name,
        quantity: currentQuantity + 1
      });
    };

    const decreaseQuantity = (product: Product) => {
      const currentQuantity = getCartItemQuantity(product.id);
      if (currentQuantity > 1) {
        store.dispatch('addItemToCart', {
          id: product.id,
          name: product.name,
          quantity: currentQuantity - 1
        });
      }
    };

    return {
      filteredProducts,
      searchQuery,
      sortBy,
      isAddingToCart,
      isInCart,
      getCartItemQuantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity
    };
  }
});
</script>

<template>
  <div class="product-container">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Filtros -->
      <div class="filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar productos..."
          class="search-input"
        >
        <select v-model="sortBy" class="sort-select">
          <option value="name">Ordenar por nombre</option>
          <option value="price">Ordenar por precio</option>
        </select>
      </div>

      <!-- Grid de Productos -->
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">${{ product.price.toFixed(2) }}</p>
            <p class="description">{{ product.description }}</p>
            <div class="product-actions">
              <div class="quantity-controls" v-if="isInCart(product.id)">
                <button 
                  @click="decreaseQuantity(product)"
                  class="quantity-btn"
                  :disabled="getCartItemQuantity(product.id) <= 1"> -
                </button>
                <span class="quantity">{{ getCartItemQuantity(product.id) }}</span>
                <button 
                  @click="increaseQuantity(product)"
                  class="quantity-btn"> +
                </button>
              </div>
              <button 
                v-else
                @click="addToCart(product)"
                class="add-to-cart-btn"
                :class="{ 'adding': isAddingToCart === product.id }">
                {{ isAddingToCart === product.id ? '¡Agregado!' : 'Agregar al carrito' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.product-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.filters {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input,
.sort-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.price {
  color: #333333;
  font-weight: bold;
  font-size: 1.2rem;
}

.description {
  color: #666;
  margin: 0.5rem 0;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-actions {
  margin-top: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #a8e6cf;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.add-to-cart-btn:hover {
  background-color: #ff6f61;
  transform: translateY(-2px);
}

.add-to-cart-btn.adding {
  background-color: #e1bee7;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.quantity-btn {
  background-color: #a8e6cf;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #95d1bc;
}

.quantity-btn:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>