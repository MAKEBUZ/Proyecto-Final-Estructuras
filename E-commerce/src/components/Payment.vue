<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { CartItem } from '../store';
import getProductById from '../data/productCatalog';

interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export default defineComponent({
  name: 'CheckoutView',
  
  setup() {
    const store = useStore();
    const router = useRouter();
    const isProcessing = ref(false);
    
    const paymentDetails = ref<PaymentDetails>({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });

    const cartItems = computed(() => store.getters.cartItems);

    const subtotal = computed(() => {
      return cartItems.value.reduce((total: number, item: CartItem) => {
        const product = getProductById(item.id);
        return total + (product?.price || 0) * item.quantity;
      }, 0);
    });

    const shipping = computed(() => (subtotal.value > 100 ? 0 : 10));
    const discount = computed(() => (subtotal.value > 200 ? subtotal.value * 0.1 : 0));
    const total = computed(() => subtotal.value + shipping.value - discount.value);

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        return parts.join(' ');
      } else {
        return value;
      }
    };

    const handleCardNumberInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      paymentDetails.value.cardNumber = formatCardNumber(input.value);
    };

    const formatExpiryDate = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
      }
      return v;
    };

    const handleExpiryDate = (event: Event) => {
      const input = event.target as HTMLInputElement;
      paymentDetails.value.expiryDate = formatExpiryDate(input.value);
    };

    const isFormValid = computed(() => {
      return (
        paymentDetails.value.cardNumber.replace(/\s/g, '').length === 16 &&
        paymentDetails.value.cardHolder.length > 0 &&
        paymentDetails.value.expiryDate.length === 5 &&
        paymentDetails.value.cvv.length === 3
      );
    });
    

    const processPayment = async () => {
  if (!isFormValid.value) return;
  
  isProcessing.value = true;
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store order details in localStorage
    const orderDetails = {
      orderId: Date.now(),
      items: cartItems.value,
      total: total.value,
      paymentDetails: {
        cardNumber: paymentDetails.value.cardNumber.slice(-4),
        cardHolder: paymentDetails.value.cardHolder
      },
      date: new Date().toISOString()
    };
    
    // Guardar la orden y la fecha
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    localStorage.setItem('lastOrderDate', new Date().toISOString());
    
    // Clear cart
    localStorage.removeItem('cart');
    await store.dispatch('clearCart');
    
    router.push('/bill');
  } catch (error) {
    console.error('Payment processing failed:', error);
  } finally {
    isProcessing.value = false;
  }
};

    return {
      cartItems,
      paymentDetails,
      isProcessing,
      subtotal,
      shipping,
      discount,
      total,
      handleCardNumberInput,
      handleExpiryDate,
      isFormValid,
      processPayment
    };
  }
});
</script>

<template>
  <div class="checkout-container">
    <div class="checkout-content">
      <!-- Formulario de pago -->
      <div class="payment-form">
        <h2>Detalles del pago</h2>
        
        <div class="form-group">
          <label for="cardNumber">Número de tarjeta</label>
          <input
            id="cardNumber"
            type="text"
            v-model="paymentDetails.cardNumber"
            @input="handleCardNumberInput"
            maxlength="19"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div class="form-group">
          <label for="cardHolder">Titular de la tarjeta</label>
          <input
            id="cardHolder"
            type="text"
            v-model="paymentDetails.cardHolder"
            placeholder="Nombre completo"
          />
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label for="expiryDate">Fecha de expiración</label>
            <input
              id="expiryDate"
              type="text"
              v-model="paymentDetails.expiryDate"
              @input="handleExpiryDate"
              maxlength="5"
              placeholder="MM/YY"
            />
          </div>

          <div class="form-group half">
            <label for="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              v-model="paymentDetails.cvv"
              maxlength="3"
              placeholder="123"
            />
          </div>
        </div>
      </div>

      <!-- Resumen del pedido -->
      <div class="order-summary">
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
            <span>Total a pagar</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button 
          @click="processPayment"
          class="payment-btn"
          :disabled="!isFormValid || isProcessing"
        >
          {{ isProcessing ? 'Procesando...' : 'Pagar ahora' }}
        </button>

        <router-link to="/cart" class="back-to-cart">
          Volver al carrito
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  background-color: #faf7f4;
  min-height: 100vh;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2.5rem;
}

.payment-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(190, 129, 81, 0.08);
  transition: transform 0.3s ease;
}

.payment-form h2,
.order-summary h2 {
  color: #333333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #F4ECE0;
}

.form-group {
  margin-bottom: 1.75rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #5d554d;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #e8d6c0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.form-group input:hover {
  border-color: #d4b594;
}

.form-group input:focus {
  outline: none;
  border-color: #BE8151;
  box-shadow: 0 0 0 4px rgba(190, 129, 81, 0.1);
}

.form-group input::placeholder {
  color: #bcb4aa;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.order-summary {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(190, 129, 81, 0.08);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.summary-details {
  margin: 1.75rem 0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  color: #5d554d;
  font-size: 1rem;
}

.summary-line.discount {
  color: #764836;
  background: rgba(118, 72, 54, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #F4ECE0;
  font-weight: 600;
  font-size: 1.25rem;
  color: #333333;
}

.payment-btn {
  width: 100%;
  padding: 1.125rem;
  background-color: #BE8151;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.payment-btn:hover {
  background-color: #B06D46;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(190, 129, 81, 0.2);
}

.payment-btn:active {
  transform: translateY(0);
}

.payment-btn:disabled {
  background-color: #d9bb98;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-to-cart {
  color: #5d554d;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  padding: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 6px;
}

.back-to-cart:hover {
  color: #333333;
  background-color: #faf7f4;
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
    margin-top: 1.5rem;
  }
  
  .payment-form,
  .order-summary {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .checkout-container {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .payment-form h2,
  .order-summary h2 {
    font-size: 1.25rem;
  }
}
</style>