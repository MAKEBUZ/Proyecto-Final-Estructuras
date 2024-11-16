<script lang="ts">
import { ref, computed } from 'vue';

export interface Invoice {
    id: number;
    status: string;
    timestamp: Date;
}

interface InvoiceStack {
  items: Invoice[];
  push: (invoice: Invoice) => void;
  pop: () => Invoice | undefined;
  peek: () => Invoice | undefined;
}

export default {
  name: 'InvoiceQueueManager',
  setup() {
    const invoiceStack = ref<Invoice[]>([]);
    const shippingQueue = ref<Invoice[]>([]);
    const isProcessing = ref(false);

    // Crear una pila para las facturas
    const stack: InvoiceStack = {
      items: invoiceStack.value,
      push: (invoice: Invoice) => {
        invoiceStack.value.push({
          ...invoice,
          status: 'stacked',
          timestamp: new Date()
        });
      },
      pop: () => invoiceStack.value.pop(),
      peek: () => invoiceStack.value[invoiceStack.value.length - 1]
    };

    // Mover factura de la pila a la cola de envíos
    const moveToShippingQueue = () => {
      if (invoiceStack.value.length === 0) return;
      
      const invoice = stack.pop();
      if (invoice) {
        shippingQueue.value.push({
          ...invoice,
          status: 'queued'
        });
      }
    };

    // Procesar la cola de envíos
    const processShippingQueue = async () => {
      if (isProcessing.value || shippingQueue.value.length === 0) return;
      
      isProcessing.value = true;
      const invoice = shippingQueue.value[0];
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        invoice.status = 'shipped';
        shippingQueue.value.shift();
      } finally {
        isProcessing.value = false;
      }
    };

    const stats = computed(() => ({
      stackedInvoices: invoiceStack.value.length,
      queuedInvoices: shippingQueue.value.length,
      totalProcessed: shippingQueue.value.filter((inv: Invoice) => inv.status === 'shipped').length
    }));

    return {
      stack,
      shippingQueue,
      isProcessing,
      stats,
      moveToShippingQueue,
      processShippingQueue
    };
  }
};
</script>

<template>
    <div class="invoice-manager">
      <!-- Header -->
      <header class="manager-header">
        <h2>Gestión de Facturas</h2>
        <div class="stats">
          <div class="stat-item">
            <span>En Pila:</span>
            <strong>{{ stats.stackedInvoices }}</strong>
          </div>
          <div class="stat-item">
            <span>En Cola:</span>
            <strong>{{ stats.queuedInvoices }}</strong>
          </div>
          <div class="stat-item">
            <span>Procesadas:</span>
            <strong>{{ stats.totalProcessed }}</strong>
          </div>
        </div>
      </header>
  
      <!-- Contenido Principal -->
      <div class="manager-content">
        <!-- Pila de Facturas -->
        <div class="invoice-stack">
          <h3>Pila de Facturas</h3>
          <div class="stack-container">
            <div v-for="(invoice, index) in stack.items.slice().reverse()"
                 :key="invoice.id"
                 class="stack-item"
                 :style="{ marginTop: `${index * -4}px` }">
              <span>Factura #{{ invoice.id }}</span>
              <span class="timestamp">{{ new Date(invoice.timestamp).toLocaleTimeString() }}</span>
            </div>
            <div v-if="stack.items.length === 0" class="empty-state">
              No hay facturas en la pila
            </div>
          </div>
          <button 
            @click="moveToShippingQueue"
            class="action-button"
            :disabled="stack.items.length === 0">
            Mover a Cola de Envíos
          </button>
        </div>
  
        <!-- Cola de Envíos -->
        <div class="shipping-queue">
          <h3>Cola de Envíos</h3>
          <div class="queue-container">
            <div v-for="invoice in shippingQueue"
                 :key="invoice.id"
                 class="queue-item"
                 :class="invoice.status">
              <span>Factura #{{ invoice.id }}</span>
              <span class="status">{{ invoice.status }}</span>
            </div>
            <div v-if="shippingQueue.length === 0" class="empty-state">
              No hay facturas en la cola de envíos
            </div>
          </div>
          <button 
            @click="processShippingQueue"
            class="action-button"
            :disabled="isProcessing || shippingQueue.length === 0">
            {{ isProcessing ? 'Procesando...' : 'Procesar Cola' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .invoice-manager {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .manager-header {
    background-color: #F4ECE0;
    padding: 20px;
    color: #333333;
  }
  
  .manager-header h2 {
    margin: 0;
    color: #5d554d;
  }
  
  .stats {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  
  .stat-item {
    background-color: #e8d6c0;
    padding: 8px 16px;
    border-radius: 4px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .stat-item strong {
    color: #5d554d;
  }
  
  .manager-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .invoice-stack,
  .shipping-queue {
    background-color: #d9bb98;
    padding: 20px;
    border-radius: 8px;
  }
  
  .invoice-stack h3,
  .shipping-queue h3 {
    color: #5d554d;
    margin-top: 0;
  }
  
  .stack-container,
  .queue-container {
    min-height: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    position: relative;
  }
  
  .empty-state {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #5d554d;
    font-style: italic;
    opacity: 0.7;
  }
  
  .stack-item,
  .queue-item {
    background-color: #e8d6c0;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s ease;
  }
  
  .stack-item {
    position: relative;
    z-index: 1;
  }
  
  .queue-item.queued {
    background-color: #BE8151;
    color: #ffffff;
  }
  
  .queue-item.shipped {
    background-color: #5d554d;
    color: #ffffff;
  }
  
  .action-button {
    width: 100%;
    padding: 12px;
    background-color: #BE8151;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: 500;
  }
  
  .action-button:hover:not(:disabled) {
    background-color: #B06D46;
  }
  
  .action-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .timestamp {
    font-size: 0.9em;
    color: #5d554d;
  }
  
  .status {
    font-weight: 500;
    text-transform: capitalize;
  }
  
  @media (max-width: 768px) {
    .manager-content {
      grid-template-columns: 1fr;
    }
    
    .stats {
      flex-direction: column;
      gap: 10px;
    }
    
    .invoice-manager {
      margin: 10px;
    }
  }
  </style>