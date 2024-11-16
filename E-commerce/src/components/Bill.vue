<template>
  <div class="invoice-container" :class="{ 'processing': isProcessing }">
    <div class="invoice-content" ref="invoiceRef">
      <!-- Cabecera de la factura -->
      <div class="invoice-header">
        <div class="invoice-title">
          <h2>Factura #{{ invoiceNumber }}</h2>
          <p class="date">Fecha: {{ formattedDate }}</p>
        </div>
      </div>

      <!-- Detalles del cliente -->
      <div class="customer-details">
        <h3>Detalles del Cliente</h3>
        <p>{{ customerName }}</p>
        <p>{{ customerEmail }}</p>
      </div>

      <!-- Lista de productos -->
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
            <tr v-for="item in enrichedCartItems" :key="item.id">
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

      <!-- Resumen de costos -->
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
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Botón de descarga -->
    <div class="invoice-actions">
      <button 
        @click="generatePDF" 
        :disabled="isProcessing"
        class="btn-primary"
      >
        {{ isProcessing ? 'Generando PDF...' : 'Descargar PDF' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import html2pdf from 'html2pdf.js';
import { v4 as uuidv4 } from 'uuid';
import getProductById from '../data/productCatalog';

const props = defineProps<{
  customerName?: string;
  customerEmail?: string;
}>();

const store = useStore();

interface EnrichedCartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const invoiceRef = ref<HTMLElement | null>(null);
const isProcessing = ref(false);

const invoiceNumber = computed(() => uuidv4().slice(0, 8));
const formattedDate = computed(() => new Date().toLocaleDateString());

// Obtener items del carrito enriquecidos con información del producto
const enrichedCartItems = computed(() => {
  const cartItems = store.getters.cartItems;
  
  return cartItems.map((item: { id: number; quantity: number; name: string }) => {
    const product = getProductById(item.id);
    return {
      ...item,
      price: product?.price || 0,
      image: product?.image || '/api/placeholder/200/200',
      name: product?.name || item.name
    };
  });
});

// Cálculos
const subtotal = computed(() => {
  return enrichedCartItems.value.reduce((total: number, item: EnrichedCartItem) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const shipping = computed(() => subtotal.value > 100 ? 0 : 10);
const discount = computed(() => subtotal.value > 200 ? subtotal.value * 0.1 : 0);
const total = computed(() => subtotal.value + shipping.value - discount.value);

const generatePDF = async () => {
  if (!invoiceRef.value) return;
  
  isProcessing.value = true;
  
  const options = {
    margin: 1,
    filename: `factura-${invoiceNumber.value}.pdf`,
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
</script>

<style scoped>
.invoice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.invoice-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  background-color: #f4ece0;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 4px #E9E1D5;
  margin-bottom: 20px;
}

.customer-details {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #f4ece0;
}

.invoice-items table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.invoice-items th,
.invoice-items td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f4ece0;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.invoice-summary {
  margin-top: 20px;
  padding: 20px;
  border-top: 2px solid #f4ece0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-line.discount {
  color: #ff6f61;
}

.summary-total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #f4ece0;
  font-weight: bold;
  font-size: 1.2em;
}

.invoice-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-primary {
  background-color: #a8e6cf;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .invoice-container {
    padding: 10px;
  }

  .invoice-content {
    padding: 15px;
  }

  .invoice-actions {
    flex-direction: column;
  }

  .btn-primary {
    width: 100%;
  }

  .product-info {
    flex-direction: column;
    text-align: center;
  }

  .product-thumbnail {
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .invoice-items th:nth-child(3),
  .invoice-items td:nth-child(3) {
    display: none;
  }

  .customer-details {
    padding: 10px;
  }
}
</style>