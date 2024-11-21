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

    // Replace the local product definition with the imported catalog
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
      
      // Apply search
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      // Apply sorting
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

    // Reset page when filters change
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

      <!-- Product Grid -->
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

      <!-- Pagination -->
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.product-container {
  font-family: 'Poppins', sans-serif;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.product-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  height: 400px; 
  display: grid;
  grid-template-rows: 200px 1fr; /* Exact division between image and content */
  overflow: hidden;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 1rem;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 0.5rem;
  overflow: hidden;
}

.product-info h3 {
  margin: 0;
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.price {
  color: #BE8151;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  line-height: 1;
}

.description {
  color: #5d554d;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.product-actions {
  width: 100%;
  margin-top: auto;
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
  height: 36px; /* Fixed height for the button */
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn:hover {
  background-color: #B06D46;
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
  height: 36px; /* Same height as the add to cart button */
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
  color: #ffffff;
  padding: 0;
  line-height: 1;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: minmax(0, 1fr);
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