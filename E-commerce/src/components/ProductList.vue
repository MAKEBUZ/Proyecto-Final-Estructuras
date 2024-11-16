<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { productCatalog, type Product, type CartItem } from '../data/productCatalog';

export default defineComponent({
  name: 'ProductList',
  props: {
    category: {
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useStore();
    const searchQuery = ref('');
    const sortBy = ref('name');
    const isAddingToCart = ref<number | null>(null);
    const currentPage = ref(1);
    const itemsPerPage = 6;

    // Reemplazar la definición local de productos por el catálogo importado
    const products = computed(() => {
      return productCatalog.filter(product => {
        const categoryMatch = product.category.toLowerCase() === props.category.toLowerCase();
        if (props.subcategory) {
          return categoryMatch && product.subcategory.toLowerCase() === props.subcategory.toLowerCase();
        }
        return categoryMatch;
      });
    });

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

    const totalPages = computed(() => 
      Math.ceil(filteredProducts.value.length / itemsPerPage)
    );

    const displayedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
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
      store.dispatch('updateItemQuantity', {
        itemId: product.id,
        quantity: currentQuantity + 1
      });
    };

    const decreaseQuantity = (product: Product) => {
      const currentQuantity = getCartItemQuantity(product.id);
      if (currentQuantity > 1) {
        store.dispatch('updateItemQuantity', {
          itemId: product.id,
          quantity: currentQuantity - 1
        });
      }
    };

    // Reset página cuando cambian los filtros
    watch([searchQuery, sortBy], () => {
      currentPage.value = 1;
    });

    return {
      filteredProducts,
      totalPages,
      displayedProducts,
      getCartItemQuantity,
      searchQuery,
      sortBy,
      isAddingToCart,
      isInCart,
      currentPage,
      addToCart,
      increaseQuantity,
      decreaseQuantity
    };
  }
});
</script>

<template>
  <div class="product-container">
    <main class="main-content">
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
        <div v-for="product in displayedProducts" :key="product.id" class="product-card">
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
                  :disabled="getCartItemQuantity(product.id) <= 1">
                  -
                </button>
                <span class="quantity">{{ getCartItemQuantity(product.id) }}</span>
                <button 
                  @click="increaseQuantity(product)"
                  class="quantity-btn">
                  +
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

      <!-- Paginación -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="pagination-btn">
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage >= totalPages"
          class="pagination-btn">
          Siguiente
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.product-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F4ECE0;
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
  border: 1px solid #d9bb98;
  border-radius: 4px;
  min-width: 200px;
  background-color: #ffffff;
  color: #333333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.product-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.product-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333333;
}

.price {
  color: #BE8151;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.description {
  color: #5d554d;
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
  background-color: #BE8151;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.add-to-cart-btn:hover {
  background-color: #B06D46;
  transform: translateY(-2px);
}

.add-to-cart-btn.adding {
  background-color: #B06D46;
  pointer-events: none;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.quantity-btn {
  background-color: #BE8151;
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
  color: #ffffff;
}

.quantity-btn:hover {
  background-color: #B06D46;
}

.quantity-btn:disabled {
  background-color: #e8d6c0;
  cursor: not-allowed;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
  color: #333333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  color: #333333;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #BE8151;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  transition: background-color 0.3s;
}

.pagination-btn:hover {
  background-color: #B06D46;
}

.pagination-btn:disabled {
  background-color: #e8d6c0;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .search-input,
  .sort-select {
    width: 100%;
  }
}
</style>