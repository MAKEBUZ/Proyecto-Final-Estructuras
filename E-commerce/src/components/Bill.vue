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
  
      <!-- Botones de acción -->
      <div class="invoice-actions">
        <button 
          @click="generatePDF" 
          :disabled="isProcessing"
          class="btn-primary"
        >
          {{ isProcessing ? 'Generando PDF...' : 'Descargar PDF' }}
        </button>
        <button 
          @click="addToInvoiceQueue" 
          :disabled="isProcessing"
          class="btn-secondary"
        >
          Agregar a cola de impresión
        </button>
      </div>
  
      <!-- Estado de la cola -->
      <div v-if="invoiceQueue.length > 0" class="queue-status">
        <h3>Cola de impresión</h3>
        <div v-for="invoice in invoiceQueue" :key="invoice.id" class="queue-item">
          <span>Factura #{{ invoice.id }}</span>
          <span :class="invoice.status">{{ invoice.status }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import html2pdf from 'html2pdf.js';
  import { v4 as uuidv4 } from 'uuid';
  
  const props = defineProps<{
    customerName?: string;
    customerEmail?: string;
  }>();
  
  const store = useStore();
  
  interface Invoice {
    id: string;
    date: Date;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    status: string;
  }
  
  interface CartItem {
    id: number;
    quantity: number;
  }
  const invoiceRef = ref<HTMLElement | null>(null);
  const isProcessing = ref(false);
  const invoiceQueue = ref<Invoice[]>([]);
  
  const invoiceNumber = computed(() => uuidv4().slice(0, 8));
  const formattedDate = computed(() => new Date().toLocaleDateString());
  
  // Obtener items del carrito enriquecidos con información del producto
  const enrichedCartItems = computed(() => {
    const cartItems = store.getters.cartItems;
    const productsDatabase = [
      { id: 1, price: 99.99, image: '/api/placeholder/200/200', name: 'Producto 1' },
      { id: 2, price: 149.99, image: '/api/placeholder/200/200', name: 'Producto 2' },
    ];
  
    return cartItems.map((item: CartItem) => {
      const product = productsDatabase.find(p => p.id === item.id);
      return {
        ...item,
        price: product?.price || 0,
        image: product?.image || '/api/placeholder/200/200'
      };
    });
  });
  
  // Cálculos
  const subtotal = computed(() => {
    return enrichedCartItems.value.reduce((total: number, item: { price: number; quantity: number }) => {
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
  
  const addToInvoiceQueue = () => {
    const invoice: Invoice = {
      id: invoiceNumber.value,
      date: new Date(),
      items: [...enrichedCartItems.value],
      subtotal: subtotal.value,
      shipping: shipping.value,
      discount: discount.value,
      total: total.value,
      status: 'pending'
    };
    
    invoiceQueue.value.push(invoice);
    processQueue();
  };
  
  const processQueue = async () => {
    const pending = invoiceQueue.value.find((inv: Invoice) => inv.status === 'pending');
    if (pending) {
      pending.status = 'processing';
      await new Promise(resolve => setTimeout(resolve, 2000));
      pending.status = 'completed';
    }
  };
  
  // Procesar la cola automáticamente
  onMounted(() => {
    setInterval(processQueue, 3000);
  });
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
  
  .btn-secondary {
    background-color: #e1bee7;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-primary:disabled,
  .btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .queue-status {
    margin-top: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
  }
  
  .queue-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #f4ece0;
  }
  
  .pending {
    color: #ff6f61;
  }
  
  .processing {
    color: #e1bee7;
  }
  
  .completed {
    color: #a8e6cf;
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
  
    .btn-primary,
    .btn-secondary {
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