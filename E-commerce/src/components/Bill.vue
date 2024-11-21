<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import getProductById from '../data/productCatalog';

interface OrderDetails {
  orderId: string;
  items: any[];
  total: number;
  date: string;
  paymentDetails: {
    cardNumber: string;
    cardHolder: string;
  };
}

interface EnrichedCartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const router = useRouter();
const invoiceRef = ref<HTMLElement | null>(null);
const isProcessing = ref(false);
const orderDetails = ref<OrderDetails | null>(null);

// Check if a paid order exists and get its details
onMounted(() => {
  const lastOrder = localStorage.getItem('lastOrder');
  
  if (!lastOrder) {
    // If there is no order, redirect to cart
    router.replace('/cart');
    return;
  }

  try {
    orderDetails.value = JSON.parse(lastOrder);
  } catch (error) {
    console.error('Error parsing order details:', error);
    router.replace('/cart');
  }
});

// Enrich items with product information
const enrichedItems = computed(() => {
  if (!orderDetails.value) return [];
  
  return orderDetails.value.items.map(item => {
    const product = getProductById(item.id);
    return {
      ...item,
      price: product?.price || 0,
      image: product?.image || '/api/placeholder/200/200',
      name: product?.name || 'Producto no encontrado'
    };
  });
});

// Calculations
const subtotal = computed(() => {
  return enrichedItems.value.reduce((total: number, item: EnrichedCartItem) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const shipping = computed(() => subtotal.value > 100 ? 0 : 10);
const discount = computed(() => subtotal.value > 200 ? subtotal.value * 0.1 : 0);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const generatePDF = async () => {
  if (!invoiceRef.value) return;
  
  isProcessing.value = true;
  
  const options = {
    margin: 1,
    filename: `factura-${orderDetails.value?.orderId}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    await html2pdf().from(invoiceRef.value).set(options).save();
  } catch (error) {
    console.error('Error generando PDF:', error);
  } finally {
    isProcessing.value = false;
  }
};

// Cleanup function
onUnmounted(() => {
  // Do not remove lastOrder here so that BillManager can process it
});
</script>
<template>
  <div v-if="orderDetails" class="invoice-container" :class="{ 'processing': isProcessing }">
    <div class="invoice-content" ref="invoiceRef">
      <!-- Invoice header -->
      <div class="invoice-header">
        <div class="invoice-title">
          <h2>Factura #{{ orderDetails.orderId }}</h2>
          <p class="date">Fecha: {{ formatDate(orderDetails.date) }}</p>
        </div>
      </div>

      
      <!-- Customer details -->
      <div class="customer-details">
        <h3>Detalles del Pago</h3>
        <p>Tarjeta terminada en: **** **** **** {{ orderDetails.paymentDetails.cardNumber }}</p>
        <p>Titular: {{ orderDetails.paymentDetails.cardHolder }}</p>
      </div>

      <!-- List of products -->
      <div class="invoice-items">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in enrichedItems" :key="item.id">
              <td>
                <div class="product-info">
                  <img :src="item.image" :alt="item.name" class="product-thumbnail">
                  <span>{{ item.name }}</span>
                </div>
              </td>
              <td>{{ item.quantity }}</td>
              <td>${{ item.price.toFixed(2) }}</td>
              <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cost summary -->
      <div class="invoice-summary">
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
          <span>${{ orderDetails.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Download button -->
    <div class="invoice-actions">
      <button 
        @click="generatePDF" 
        :disabled="isProcessing"
        class="btn-primary"
      >
        {{ isProcessing ? 'Generando PDF...' : 'Descargar PDF' }}
      </button>
      <router-link to="/" class="btn-secondary">
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.invoice-container {
  font-family: 'Poppins', sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.invoice-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  background-color: #f4ece0;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.invoice-title h2 {
  color: #333;
  margin: 0;
  font-size: 1.5rem;
}

.invoice-title .date {
  color: #666;
  margin-top: 0.5rem;
}

.customer-details {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #f4ece0;
  border-radius: 8px;
  background-color: #fdfbf8;
}

.customer-details h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
}

.invoice-items table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.invoice-items th {
  background-color: #f8f4ed;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
}

.invoice-items td {
  padding: 1rem;
  border-bottom: 1px solid #f4ece0;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f4ece0;
}

.invoice-summary {
  margin-top: 2rem;
  padding: 1.5rem;
  border-top: 2px solid #f4ece0;
  background-color: #fdfbf8;
  border-radius: 8px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
}

.summary-line.discount {
  color: #be8151;
  background-color: #fdf6f0;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.summary-total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f4ece0;
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
}

.invoice-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary {
  background-color: #be8151;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #b06d46;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: 1px solid #be8151;
  color: #be8151;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #fdf6f0;
}

.invoice-selector {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f4ed;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.invoice-selector select {
  padding: 0.5rem;
  border: 1px solid #be8151;
  border-radius: 4px;
  background-color: white;
  color: #333;
}

@media (max-width: 768px) {
  .invoice-container {
    margin: 1rem;
    padding: 1rem;
  }

  .invoice-content {
    padding: 1.5rem;
  }

  .invoice-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .invoice-items th:nth-child(3),
  .invoice-items td:nth-child(3) {
    display: none;
  }

  .product-info {
    flex-direction: column;
    text-align: center;
  }

  .product-thumbnail {
    margin: 0 auto;
  }

  .invoice-content {
    padding: 1rem;
  }
}
</style>