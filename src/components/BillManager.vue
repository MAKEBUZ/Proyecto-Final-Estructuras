<script lang="ts">
import { ref, computed, watch } from 'vue';

// Interfaces
export interface Invoice {
    id: string;
    status: 'stacked' | 'queued' | 'shipped';
    timestamp: Date;
    orderDetails: {
        orderId: string;
        items: any[];
        total: number;
        date: string;
        paymentDetails: {
            cardNumber: string;
            cardHolder: string;
        };
    };
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
                // Verificar si la factura ya ha sido procesada
                const history = JSON.parse(localStorage.getItem('shippingHistory') || '[]');
                const isProcessed = history.some((inv: Invoice) => inv.id === invoice.id);
                
                if (!isProcessed) {
                    invoiceStack.value.push({
                        ...invoice,
                        status: 'stacked',
                        timestamp: new Date()
                    });
                }
            },
            pop: () => invoiceStack.value.pop(),
            peek: () => invoiceStack.value[invoiceStack.value.length - 1]
        };

        // Cargar facturas existentes al inicio
        const loadExistingInvoices = () => {
            const existingInvoices = localStorage.getItem('pendingInvoices');
            if (existingInvoices) {
                invoiceStack.value = JSON.parse(existingInvoices);
            }
        };

        // Guardar facturas pendientes
        const savePendingInvoices = () => {
            localStorage.setItem('pendingInvoices', JSON.stringify(invoiceStack.value));
        };

        // Observar cambios en la pila de facturas
        watch(invoiceStack, () => {
            savePendingInvoices();
        }, { deep: true });

        // Observar cambios en localStorage para nuevas facturas
        watch(
            () => localStorage.getItem('lastOrder'),
            (newOrder) => {
                if (newOrder) {
                    try {
                        const orderDetails = JSON.parse(newOrder);
                        const newInvoice: Invoice = {
                            id: `INV-${orderDetails.orderId}`,
                            status: 'stacked',
                            timestamp: new Date(),
                            orderDetails
                        };
                        stack.push(newInvoice);
                    } catch (error) {
                        console.error('Error processing new invoice:', error);
                    }
                }
            },
            { immediate: true }
        );

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
                saveToShippingHistory(invoice);
                shippingQueue.value.shift();
                
                // Remover la factura procesada de pendingInvoices
                const pendingInvoices = JSON.parse(localStorage.getItem('pendingInvoices') || '[]');
                const updatedPendingInvoices = pendingInvoices.filter(
                    (inv: Invoice) => inv.id !== invoice.id
                );
                localStorage.setItem('pendingInvoices', JSON.stringify(updatedPendingInvoices));
            } catch (error) {
                console.error('Error processing invoice:', error);
            } finally {
                isProcessing.value = false;
            }
        };

        // Guardar facturas procesadas en el historial
        const saveToShippingHistory = (invoice: Invoice) => {
            try {
                const history = JSON.parse(localStorage.getItem('shippingHistory') || '[]');
                history.push({
                    ...invoice,
                    shippedAt: new Date().toISOString()
                });
                localStorage.setItem('shippingHistory', JSON.stringify(history));
            } catch (error) {
                console.error('Error saving to shipping history:', error);
            }
        };

        // Cargar facturas existentes al montar el componente
        loadExistingInvoices();

        const stats = computed(() => ({
            stackedInvoices: invoiceStack.value.length,
            queuedInvoices: shippingQueue.value.length,
            totalProcessed: JSON.parse(localStorage.getItem('shippingHistory') || '[]').length
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
                        <div class="invoice-card">
                            <div class="invoice-header">
                                <span class="invoice-id">Factura #{{ invoice.orderDetails.orderId }}</span>
                                <span class="timestamp">{{ new Date(invoice.timestamp).toLocaleTimeString() }}</span>
                            </div>
                            <div class="invoice-body">
                                <div class="amount-section">
                                    <span class="amount-label">Total:</span>
                                    <span class="amount">${{ invoice.orderDetails.total.toFixed(2) }}</span>
                                </div>
                                <div class="items-section">
                                    <span class="items-count">{{ invoice.orderDetails.items.length }} items</span>
                                </div>
                            </div>
                        </div>
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
                        <div class="invoice-card">
                            <div class="invoice-header">
                                <span class="invoice-id">Factura #{{ invoice.orderDetails.orderId }}</span>
                                <span class="status-badge">{{ invoice.status }}</span>
                            </div>
                            <div class="invoice-body">
                                <div class="amount-section">
                                    <span class="amount-label">Total:</span>
                                    <span class="amount">${{ invoice.orderDetails.total.toFixed(2) }}</span>
                                </div>
                                <div class="customer-section">
                                    <span class="customer-name">{{ invoice.orderDetails.paymentDetails.cardHolder }}</span>
                                </div>
                            </div>
                        </div>
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

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.invoice-manager {
    font-family: 'Poppins', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: #F4ECE0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(93, 85, 77, 0.2);
}

.manager-header {
    background-color: #F4ECE0;
    padding: 24px;
    color: #5d554d;
}

.manager-header h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #5d554d;
}

.stats {
    display: flex;
    gap: 24px;
    margin-top: 16px;
}

.stat-item {
    background-color: #e8d6c0;
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    gap: 12px;
    align-items: center;
    color: #5d554d;
}

.stat-item strong {
    font-size: 1.2rem;
    font-weight: 600;
    color: #764836;
}

.manager-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 24px;
    background-color: #d9bb98;
}

.invoice-stack,
.shipping-queue {
    background-color: #F4ECE0;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(93, 85, 77, 0.1);
}

.invoice-stack h3,
.shipping-queue h3 {
    color: #764836;
    margin-top: 0;
    font-size: 1.4rem;
    margin-bottom: 16px;
}

.stack-container,
.queue-container {
    min-height: 300px;
    background-color: #e8d6c0;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    position: relative;
}

.invoice-card {
    background-color: #F4ECE0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(93, 85, 77, 0.1);
    padding: 16px;
    border-left: 4px solid #BE8151;
    margin-bottom: 12px;
    transition: transform 0.2s ease;
}

.invoice-card:hover {
    transform: translateY(-2px);
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d9bb98;
}

.invoice-id {
    font-weight: 600;
    color: #764836;
}

.timestamp {
    color: #5d554d;
    font-size: 0.9rem;
}

.invoice-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.amount-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.amount-label {
    color: #5d554d;
}

.amount {
    font-weight: 600;
    color: #764836;
    font-size: 1.1rem;
}

.items-section,
.customer-section {
    color: #5d554d;
    font-size: 0.9rem;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    text-transform: capitalize;
    background-color: #e8d6c0;
    color: #764836;
}

.queue-item.queued .invoice-card {
    border-left: 4px solid #BE8151;
}

.queue-item.shipped .invoice-card {
    border-left: 4px solid #764836;
}

.queue-item.queued .status-badge {
    background-color: #BE8151;
    color: #F4ECE0;
}

.queue-item.shipped .status-badge {
    background-color: #764836;
    color: #F4ECE0;
}

.action-button {
    width: 100%;
    padding: 14px;
    background-color: #BE8151;
    color: #F4ECE0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1rem;
}

.action-button:hover:not(:disabled) {
    background-color: #B06D46;
    transform: translateY(-1px);
}

.action-button:disabled {
    background-color: #e8d6c0;
    color: #5d554d;
    cursor: not-allowed;
    transform: none;
}

.empty-state {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #5d554d;
    font-style: italic;
    text-align: center;
}

@media (max-width: 768px) {
    .manager-content {
        grid-template-columns: 1fr;
    }
    
    .stats {
        flex-direction: column;
        gap: 12px;
    }
    
    .invoice-manager {
        margin: 16px;
    }
    
    .stack-container,
    .queue-container {
        min-height: 200px;
    }
}

/* Animaciones suaves para interacciones */
.invoice-card,
.action-button,
.status-badge {
    transition: all 0.3s ease;
}

/* Efecto hover para las tarjetas */
.invoice-card:hover {
    box-shadow: 0 4px 8px rgba(93, 85, 77, 0.2);
}
</style>