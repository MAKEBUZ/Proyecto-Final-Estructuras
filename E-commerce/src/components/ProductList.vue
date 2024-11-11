<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

// Clase para implementar la tabla hash de productos
class ProductHashTable {
  private table: Map<string, Product[]>;
  private nameIndex: Map<string, Product>;
  private categoryIndex: Map<string, Set<Product>>;
  private subcategoryIndex: Map<string, Set<Product>>;

  constructor(products: Product[]) {
    this.table = new Map();
    this.nameIndex = new Map();
    this.categoryIndex = new Map();
    this.subcategoryIndex = new Map();
    this.initializeTable(products);
  }

  private initializeTable(products: Product[]): void {
    // Indexar por nombre (para búsqueda rápida)
    products.forEach(product => {
      this.nameIndex.set(product.name.toLowerCase(), product);
      
      // Indexar por categoría
      if (!this.categoryIndex.has(product.category.toLowerCase())) {
        this.categoryIndex.set(product.category.toLowerCase(), new Set());
      }
      this.categoryIndex.get(product.category.toLowerCase())?.add(product);
      
      // Indexar por subcategoría
      const subcategoryKey = `${product.category.toLowerCase()}-${product.subcategory.toLowerCase()}`;
      if (!this.subcategoryIndex.has(subcategoryKey)) {
        this.subcategoryIndex.set(subcategoryKey, new Set());
      }
      this.subcategoryIndex.get(subcategoryKey)?.add(product);
    });
  }

  public searchProducts(query: string, category: string, subcategory: string = ''): Product[] {
    const results = new Set<Product>();
    const searchQuery = query.toLowerCase();
    
    // Primero filtramos por categoría y subcategoría
    let baseProducts: Set<Product> | undefined;
    
    if (subcategory) {
      const subcategoryKey = `${category.toLowerCase()}-${subcategory.toLowerCase()}`;
      baseProducts = this.subcategoryIndex.get(subcategoryKey);
    } else {
      baseProducts = this.categoryIndex.get(category.toLowerCase());
    }
    
    if (!baseProducts) return [];
    
    // Si no hay query de búsqueda, retornamos todos los productos de la categoría/subcategoría
    if (!searchQuery) {
      return Array.from(baseProducts);
    }
    
    // Buscar coincidencias en los productos filtrados
    baseProducts.forEach(product => {
      if (
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      ) {
        results.add(product);
      }
    });
    
    return Array.from(results);
  }

  public getProductById(id: number): Product | undefined {
    for (const products of this.categoryIndex.values()) {
      for (const product of products) {
        if (product.id === id) return product;
      }
    }
    return undefined;
  }
}


// Catálogo de productos organizados por categoría y subcategoría
const productCatalog: Product[] = [
  // Kids
  {
    id: 1,
    name: "Kid's Basic T-Shirt",
    price: 19.99,
    description: "Comfortable cotton t-shirt for children",
    image: "https://via.placeholder.com/200?text=Kid+TShirt",
    category: "Kids",
    subcategory: "T-Shirt"
  },
  {
    id: 2,
    name: "Kid's Graphic T-Shirt",
    price: 24.99,
    description: "Fun graphic t-shirt with cartoon prints",
    image: "https://via.placeholder.com/200?text=Kid+Graphic",
    category: "Kids",
    subcategory: "T-Shirt"
  },
  {
    id: 3,
    name: "Kid's Jeans",
    price: 29.99,
    description: "Durable denim jeans for active kids",
    image: "https://via.placeholder.com/200?text=Kid+Jeans",
    category: "Kids",
    subcategory: "Pants"
  },
  {
    id: 4,
    name: "Kid's Jeans-Pro",
    price: 39.99,
    description: "Durable denim jeans for active kids",
    image: "https://via.placeholder.com/200?text=Kid+Jeans",
    category: "Kids",
    subcategory: "Pants"
  },
  // Men
  {
    id: 4,
    name: "Men's Classic T-Shirt",
    price: 24.99,
    description: "Classic fit cotton t-shirt for men",
    image: "https://via.placeholder.com/200?text=Men+TShirt",
    category: "Men",
    subcategory: "T-Shirt"
  },
  {
    id: 5,
    name: "Men's Shoes",
    price: 64.99,
    description: "comfortable shoes for men",
    image: "https://via.placeholder.com/200?text=Men+TShirt",
    category: "Men",
    subcategory: "Shoes"
  },

  {
    id: 6,
    name: "Men's Classic Pants",
    price: 54.99,
    description: "classic pants for men",
    image: "https://via.placeholder.com/200?text=Men+TShirt",
    category: "Men",
    subcategory: "Pants"
  },
  {
    id: 7,
    name: "Men's Colonies",
    price: 39.99,
    description: "fragrances for men",
    image: "https://via.placeholder.com/200?text=Men+Jeans",
    category: "Men",
    subcategory: "Colonies"
  },
  {
    id: 8,
    name: "Men's Coats",
    price: 79.99,
    description: "delicate cotton coats",
    image: "https://via.placeholder.com/200?text=Men+Jeans",
    category: "Men",
    subcategory: "Coats"
  },
  // Women
  {
    id: 9,
    name: "Women's Fashion T-Shirt",
    price: 29.99,
    description: "Trendy and comfortable women's t-shirt",
    image: "https://via.placeholder.com/200?text=Women+TShirt",
    category: "Women",
    subcategory: "T-Shirt"
  },
  {
    id: 10,
    name: "Women's Shoes",
    price: 89.99,
    description: "elegant shoes for women",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Women",
    subcategory: "Shoes"
  },
  {
    id: 11,
    name: "Women's Skinny Jeans",
    price: 54.99,
    description: "Stylish high-waisted skinny jeans",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Women",
    subcategory: "Pants"
  },
  {
    id: 12,
    name: "Women's Colonies",
    price: 54.99,
    description: "delicate fragrance for women",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Women",
    subcategory: "Colonies"
  },
  {
    id: 12,
    name: "Women's Coats",
    price: 54.99,
    description: "Faux fur coats for women",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Women",
    subcategory: "Coats"
  },

  
  //Unisex
  {
    id: 13,
    name: "Unisex T-Shirt",
    price: 34.99,
    description: "classic cotton t-shirt",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Unisex",
    subcategory: "T-Shirt"
  },
  {
    id: 14,
    name: "Unisex Shoes",
    price: 69.99,
    description: "comfortable leather shoes",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Unisex",
    subcategory: "Shoes"
  },
  {
    id: 15,
    name: "Unisex Pants",
    price: 49.99,
    description: "straight and wide pants",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Unisex",
    subcategory: "Pants"
  },
  {
    id: 16,
    name: "Unisex Colonies",
    price: 49.99,
    description: "delicious fragrance",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Unisex",
    subcategory: "Colonies"
  },
  {
    id: 17,
    name: "Unisex Coats",
    price: 79.99,
    description: "long cotton coats",
    image: "https://via.placeholder.com/200?text=Women+Jeans",
    category: "Unisex",
    subcategory: "Coats"
  },

];

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
    
    // Inicializar la tabla hash con el catálogo de productos
    const productHashTable = new ProductHashTable(productCatalog);
    
    // Productos filtrados usando la tabla hash
    const filteredProducts = computed(() => {
      let results = productHashTable.searchProducts(
        searchQuery.value,
        props.category,
        props.subcategory
      );
      
      // Aplicar ordenamiento
      results.sort((a, b) => {
        if (sortBy.value === 'price') {
          return a.price - b.price;
        }
        return a.name.localeCompare(b.name);
      });
      
      return results;
    });

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

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
      displayedProducts,
      totalPages,
      searchQuery,
      sortBy,
      currentPage,
      getCartItemQuantity,
      isAddingToCart,
      isInCart,
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
  line-clamp: 2;
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
