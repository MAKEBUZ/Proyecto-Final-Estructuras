<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>Tu Carrito</h1>
      <p v-if="cartItems.length === 0" class="empty-cart-message">
        Tu carrito está vacío. <router-link to="/shop" class="continue-shopping">Continuar comprando</router-link>
      </p>
    </div>

    <div v-if="cartItems.length > 0" class="cart-content">
      <!-- Lista de productos -->
      <div class="cart-items">
        <div v-for="item in enrichedCartItems" :key="item.id" class="cart-item" :class="{ 'removing': removingItem === item.id }">
          <div class="item-image">
            <img :src="getProductImage(item.id)" :alt="item.name">
          </div>
          
          <div class="item-details">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ getProductPrice(item.id).toFixed(2) }}</p>
            </div>

            <div class="item-actions">
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="quantity-btn"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <input 
                  type="number" 
                  v-model.number="item.quantity"
                  @change="handleQuantityInput(item)"
                  class="quantity-input"
                  min="1"
                >
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="quantity-btn"
                >
                  +
                </button>
              </div>

              <button 
                @click="removeFromCart(item.id)"
                class="remove-btn"
                :disabled="removingItem === item.id"
              >
                <span class="remove-icon">×</span>
              </button>
            </div>

            <div class="item-subtotal">
              Subtotal: ${{ (getProductPrice(item.id) * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen del carrito -->
      <div class="cart-summary">
        <h2>Resumen del pedido</h2>
        
        <div class="summary-details">
          <div class="summary-line">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          
          <div class="summary-line">
            <span>Envío</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>

          <div v-if="discount > 0" class="summary-line discount">
            <span>Descuento</span>
            <span>-${{ discount.toFixed(2) }}</span>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button 
          @click="proceedToCheckout"
          class="checkout-btn"
          :disabled="isProcessing"
        >
          {{ isProcessing ? 'Procesando...' : 'Proceder al pago' }}
        </button>

        <router-link to="/shop" class="continue-shopping-link">
          Continuar comprando
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { CartItem } from '@/store'; // Asegúrate de importar el tipo desde donde esté definido

interface Product {
  id: number;
  price: number;
  image: string;
}

interface EnrichedCartItem extends CartItem {
  price: number;
  image: string;
}

export default defineComponent({
  name: 'CartView',
  
  setup() {
    const store = useStore();
    const router = useRouter();
    const isProcessing = ref(false);
    const removingItem = ref<number | null>(null);

    // Base de datos de productos (en producción vendría de una API)
    const productsDatabase = ref<Product[]>([
      {
        id: 1,
        price: 99.99,
        image: '/api/placeholder/200/200'
      },
      {
        id: 2,
        price: 149.99,
        image: '/api/placeholder/200/200'
      },
    ]);

    const cartItems = computed(() => store.getters.cartItems);

    const enrichedCartItems = computed(() => {
      return cartItems.value.map((item: CartItem) => ({
        ...item,
        price: getProductPrice(item.id),
        image: getProductImage(item.id)
      }));
    });

    const getProductImage = (productId: number): string => {
      const product = productsDatabase.value.find(p => p.id === productId);
      return product?.image || '/api/placeholder/200/200';
    };

    const getProductPrice = (productId: number): number => {
      const product = productsDatabase.value.find(p => p.id === productId);
      return product?.price || 0;
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
      if (newQuantity < 1) return;
      
      await store.dispatch('updateItemQuantity', {
        itemId,
        quantity: newQuantity
      });
    };

    const handleQuantityInput = (item: EnrichedCartItem) => {
      const quantity = parseInt(String(item.quantity));
      if (isNaN(quantity) || quantity < 1) {
        updateQuantity(item.id, 1);
      } else {
        updateQuantity(item.id, quantity);
      }
    };

    const removeFromCart = async (itemId: number) => {
      removingItem.value = itemId;
      await new Promise(resolve => setTimeout(resolve, 300));
      await store.dispatch('removeItemFromCart', itemId);
      removingItem.value = null;
    };

    const subtotal = computed(() => {
      return enrichedCartItems.value.reduce((total: number, item: EnrichedCartItem) => {
        return total + (getProductPrice(item.id) * item.quantity);
      }, 0);
    });

    const shipping = computed(() => {
      return subtotal.value > 100 ? 0 : 10;
    });

    const discount = computed(() => {
      return subtotal.value > 200 ? subtotal.value * 0.1 : 0;
    });

    const total = computed(() => {
      return subtotal.value + shipping.value - discount.value;
    });

    const proceedToCheckout = async () => {
      isProcessing.value = true;
      try {
        // Aquí iría la lógica de checkout
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push('/checkout');
      } catch (error) {
        console.error('Error en el checkout:', error);
      } finally {
        isProcessing.value = false;
      }
    };

    return {
      cartItems,
      enrichedCartItems,
      isProcessing,
      removingItem,
      subtotal,
      shipping,
      discount,
      total,
      getProductImage,
      getProductPrice,
      updateQuantity,
      handleQuantityInput,
      removeFromCart,
      proceedToCheckout
    };
  }
});
</script>

  <style scoped>
  .cart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .cart-header {
    margin-bottom: 2rem;
  }
  
  .cart-header h1 {
    color: #333333;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .empty-cart-message {
    color: #666;
    font-size: 1.1rem;
  }
  
  .cart-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
  }
  
  .cart-items {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #f4ece0;
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .cart-item.removing {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .item-image img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  
  .item-info h3 {
    color: #333333;
    margin: 0;
  }
  
  .item-price {
    color: #333333;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
  
  .quantity-input {
    width: 50px;
    text-align: center;
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #ff6f61;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.25rem;
    transition: color 0.3s;
  }
  
  .remove-btn:hover {
    color: #ff5546;
  }
  
  .item-subtotal {
    color: #666;
    font-size: 0.9rem;
    text-align: right;
  }
  
  .cart-summary {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    height: fit-content;
    position: sticky;
    top: 100px;
  }
  
  .summary-details {
    margin: 1.5rem 0;
  }
  
  .summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #666;
  }
  
  .summary-line.discount {
    color: #ff6f61;
  }
  
  .summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #f4ece0;
    font-weight: bold;
    font-size: 1.2rem;
    color: #333333;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 1rem;
    background-color: #a8e6cf;
    border: none;
    border-radius: 4px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 1rem;
  }
  
  .checkout-btn:hover {
    background-color: #95d1bc;
  }
  
  .checkout-btn:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
  
  .continue-shopping,
  .continue-shopping-link {
    color: #666;
    text-decoration: none;
    display: inline-block;
    margin-top: 1rem;
    transition: color 0.3s;
  }
  
  .continue-shopping:hover,
  .continue-shopping-link:hover {
    color: #333333;
    text-decoration: underline;
  }
  
  @media (max-width: 968px) {
    .cart-content {
      grid-template-columns: 1fr;
    }
  
    .cart-summary {
      position: static;
    }
  }
  
  @media (max-width: 480px) {
    .cart-item {
      grid-template-columns: 1fr;
    }
  
    .item-image {
      text-align: center;
    }
  
    .item-image img {
      width: 200px;
      height: 200px;
    }
  
    .item-actions {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .remove-btn {
      align-self: flex-end;
    }
  }
  </style>