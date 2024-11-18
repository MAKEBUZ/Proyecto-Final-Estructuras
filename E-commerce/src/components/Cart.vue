<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { CartItem } from '../store';
import getProductById from '../data/productCatalog';

interface EnrichedCartItem extends CartItem {
  price: number;
  image: string;
  isOffer?: boolean;
}

export default defineComponent({
  name: 'CartView',
  
  setup() {
    const store = useStore();
    const router = useRouter();
    const isProcessing = ref(false);
    const removingItem = ref<number | null>(null);
    const actionStack = ref<{ type: string; item: CartItem }[]>([]);

    const cartItems = computed(() => store.getters.cartItems);

    const enrichedCartItems = computed(() => {
      return cartItems.value.map((item: CartItem) => {
        const product = getProductById(item.id);
        return {
          ...item,
          price: getProductPrice(item.id),
          image: getProductImage(item.id),
          isOffer: product?.isOffer
        };
      });
    });

    const getProductImage = (productId: number): string => {
      const product = getProductById(productId);
      return product?.image || '/api/placeholder/200/200';
    };

    const getProductPrice = (productId: number): number => {
      const product = getProductById(productId);
      return product?.price || 0;
    };

    const getMaxQuantity = (isOffer: boolean | undefined): number => {
      return isOffer ? 5 : 99;
    };

    const updateQuantity = async (itemId: number, newQuantity: number, isOffer: boolean | undefined) => {
      const maxQuantity = getMaxQuantity(isOffer);
      if (newQuantity < 1 || newQuantity > maxQuantity) return;
      
      const item = cartItems.value.find((i: CartItem) => i.id === itemId);
      if (item) {
        actionStack.value.push({ type: 'update', item: { ...item } });
        await store.dispatch('updateItemQuantity', { itemId, quantity: newQuantity });
      }
    };

    const handleQuantityInput = (item: EnrichedCartItem) => {
      const quantity = parseInt(String(item.quantity));
      const maxQuantity = getMaxQuantity(item.isOffer);
      
      if (isNaN(quantity) || quantity < 1) {
        updateQuantity(item.id, 1, item.isOffer);
      } else if (quantity > maxQuantity) {
        updateQuantity(item.id, maxQuantity, item.isOffer);
      } else {
        updateQuantity(item.id, quantity, item.isOffer);
      }
    };

    const removeFromCart = async (item: CartItem) => {
      actionStack.value.push({ type: 'remove', item: { ...item } });
      removingItem.value = item.id;
      await new Promise(resolve => setTimeout(resolve, 300));
      await store.dispatch('removeItemFromCart', item.id);
      removingItem.value = null;
    };

    const undoLastAction = async () => {
      const lastAction = actionStack.value.pop();
      if (!lastAction) return;

      if (lastAction.type === 'remove') {
        await store.dispatch('addItemToCart', lastAction.item);
      } else if (lastAction.type === 'update') {
        await store.dispatch('updateItemQuantity', {
          itemId: lastAction.item.id,
          quantity: lastAction.item.quantity,
        });
      }
    };

    const subtotal = computed(() => {
      return enrichedCartItems.value.reduce((total: number, item: EnrichedCartItem) => 
        total + item.price * item.quantity, 0);
    });

    const shipping = computed(() => (subtotal.value > 100 ? 0 : 10));
    const discount = computed(() => (subtotal.value > 200 ? subtotal.value * 0.1 : 0));
    const total = computed(() => subtotal.value + shipping.value - discount.value);

    const proceedToCheckout = async () => {
      isProcessing.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push('/checkout');
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
      proceedToCheckout,
      undoLastAction,
      actionStack,
      getMaxQuantity
    };
  }
});
</script>

<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>Tu Carrito</h1>
      <p v-if="cartItems.length === 0" class="empty-cart-message">
        Tu carrito está vacío. <router-link to="/shop" class="continue-shopping">Continuar comprando</router-link>
      </p>
    </div>

    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="cart-items">
        <div v-for="item in enrichedCartItems" :key="item.id" class="cart-item" :class="{ 'removing': removingItem === item.id }">
          <div class="item-image">
            <img :src="getProductImage(item.id)" :alt="item.name">
          </div>
          
          <div class="item-details">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <div class="price-info">
                <p class="item-price" :class="{ 'offer-price': item.isOffer }">
                  ${{ getProductPrice(item.id).toFixed(2) }}
                </p>
                <p v-if="item.isOffer" class="old-price">
                  ${{ item.oldPrice?.toFixed(2) }}
                </p>
                <span v-if="item.discount" class="discount-badge">
                  -{{ item.discount }}%
                </span>
              </div>
            </div>

            <div class="item-actions">
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1, item.isOffer)"
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
                  :max="getMaxQuantity(item.isOffer)"
                  min="1"
                >
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1, item.isOffer)"
                  class="quantity-btn"
                  :disabled="item.quantity >= getMaxQuantity(item.isOffer)"
                >
                  +
                </button>
              </div>

              <div v-if="item.quantity >= getMaxQuantity(item.isOffer)" class="max-quantity-warning">
                Cantidad máxima alcanzada
              </div>

              <button 
                @click="removeFromCart(item)"
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
          :disabled="isProcessing || cartItems.length === 0"
        >
          {{ isProcessing ? 'Procesando...' : 'Proceder al pago' }}
        </button>

        <button 
          @click="undoLastAction" 
          class="undo-btn" 
          :disabled="actionStack.length === 0"
        >
          Deshacer última acción
        </button>

        <router-link to="/shop" class="continue-shopping-link">
          Continuar comprando
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.cart-container {
  font-family: 'Poppins', sans-serif;
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
  color: #5d554d;
  font-size: 1.1rem;
}
  
  .cart-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
  }
  
  .cart-items {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
  
  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #F4ECE0;
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
  background-color: #BE8151;
  color: #ffffff;
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
  background-color: #B06D46;
}
  
.quantity-btn:disabled {
  background-color: #d9bb98;
  cursor: not-allowed;
}
  
  .quantity-input {
    width: 50px;
    text-align: center;
    padding: 0.25rem;
    border-radius: 4px;
    border: 1px solid #e8d6c0;
    border-radius: 4px;
  }
  
  .remove-btn {
  background: none;
  border: none;
  color: #5d554d;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  transition: color 0.3s;
}
  
.remove-btn:hover {
  color: #333333;
}
  
  .item-subtotal {
    color: #5d554d;
    font-size: 0.9rem;
    text-align: right;
  }
  
  .cart-summary {
    background: #ffffff;
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
    color: #5d554d;
  }
  
  .summary-line.discount {
    color: #764836;
  }
  
  .summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #F4ECE0;
    font-weight: bold;
    font-size: 1.2rem;
    color: #333333;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 1rem;
    background-color: #BE8151;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .checkout-btn:hover {
    background-color: #B06D46;
  }
  
  .checkout-btn:disabled {
    background-color: #d9bb98;
    cursor: not-allowed;
  }
  
  .continue-shopping,
  .continue-shopping-link {
    color: #5d554d;
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