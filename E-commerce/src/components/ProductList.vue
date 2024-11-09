<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
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
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const sortBy = ref('name');
    const isAddingToCart = ref<number | null>(null);
    const currentPage = ref(1);
    const itemsPerPage = 15; // 3 columnas x 5 filas

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
      {
        id: 3,
        name: 'Producto 3',
        price: 199.99,
        description: 'Descripción del producto 3',
        image: 'https://via.placeholder.com/200'
      },
      // ... Añade más productos aquí hasta tener al menos 15 para llenar la primera página
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

    const displayedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / itemsPerPage);
    });

    const isInCart = (productId: number): boolean => {
      return store.state.cart.items.some((item: CartItem) => item.id === productId);
    };

    const getCartItemQuantity = (productId: number): number => {
      const item = store.state.cart.items.find((item: CartItem) => item.id === productId);
      return item ? item.quantity : 0;
    };

    const addToCart = async (product: Product): Promise<void> => {
      isAddingToCart.value = product.id;
      
      try {
        await store.dispatch('addItemToCart', {
          id: product.id,
          name: product.name,
          quantity: 1
        });

        // Mostrar el mensaje de éxito por 1 segundo
        setTimeout(() => {
          isAddingToCart.value = null;
        }, 1000);
      } catch (error) {
        console.error('Error al añadir al carrito:', error);
        isAddingToCart.value = null;
      }
    };

    const increaseQuantity = async (product: Product): Promise<void> => {
      const currentQuantity = getCartItemQuantity(product.id);
      try {
        await store.dispatch('addItemToCart', {
          id: product.id,
          name: product.name,
          quantity: currentQuantity + 1
        });
      } catch (error) {
        console.error('Error al aumentar cantidad:', error);
      }
    };

    const decreaseQuantity = async (product: Product): Promise<void> => {
      const currentQuantity = getCartItemQuantity(product.id);
      if (currentQuantity > 1) {
        try {
          await store.dispatch('addItemToCart', {
            id: product.id,
            name: product.name,
            quantity: currentQuantity - 1
          });
        } catch (error) {
          console.error('Error al disminuir cantidad:', error);
        }
      }
    };

    const changePage = (newPage: number): void => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
        // Opcional: Hacer scroll al inicio de la lista de productos
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const handleSearch = (): void => {
      // Resetear a la primera página cuando se realiza una búsqueda
      currentPage.value = 1;
    };

    const handleSort = (): void => {
      // Opcional: Resetear a la primera página cuando se cambia el ordenamiento
      currentPage.value = 1;
    };

    // Watchers para búsqueda y ordenamiento
    watch(searchQuery, () => {
      handleSearch();
    });

    watch(sortBy, () => {
      handleSort();
    });

    return {
      // Estado
      searchQuery,
      sortBy,
      currentPage,
      isAddingToCart,
      
      // Computed
      filteredProducts,
      displayedProducts,
      totalPages,
      
      // Métodos
      isInCart,
      getCartItemQuantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      changePage
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
      <div class="pagination">
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
  border: 1px solid #E9E1D5;
  border-radius: 4px;
  min-width: 200px;
  background-color: #f4ece0;
  color: #333333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px #E9E1D5;
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
  color: #333333;
  margin: 0.5rem 0;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #a8e6cf;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333333;
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
  color: #333333;
}

.quantity-btn:hover {
  background-color: #95d1bc;
}

.quantity-btn:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
  color: #ffffff;
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
  background-color: #a8e6cf;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333333;
  transition: background-color 0.3s;
}

.pagination-btn:hover {
  background-color: #95d1bc;
}

.pagination-btn:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
  color: #ffffff;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>