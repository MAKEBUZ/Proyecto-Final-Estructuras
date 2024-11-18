import { ref, computed, watch } from 'vue';
export default (await import('vue')).defineComponent({
    name: 'InvoiceQueueManager',
    setup() {
        const invoiceStack = ref([]);
        const shippingQueue = ref([]);
        const isProcessing = ref(false);
        // Crear una pila para las facturas
        const stack = {
            items: invoiceStack.value,
            push: (invoice) => {
                // Verificar si la factura ya ha sido procesada
                const history = JSON.parse(localStorage.getItem('shippingHistory') || '[]');
                const isProcessed = history.some((inv) => inv.id === invoice.id);
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
        watch(() => localStorage.getItem('lastOrder'), (newOrder) => {
            if (newOrder) {
                try {
                    const orderDetails = JSON.parse(newOrder);
                    const newInvoice = {
                        id: `INV-${orderDetails.orderId}`,
                        status: 'stacked',
                        timestamp: new Date(),
                        orderDetails
                    };
                    stack.push(newInvoice);
                }
                catch (error) {
                    console.error('Error processing new invoice:', error);
                }
            }
        }, { immediate: true });
        // Mover factura de la pila a la cola de envíos
        const moveToShippingQueue = () => {
            if (invoiceStack.value.length === 0)
                return;
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
            if (isProcessing.value || shippingQueue.value.length === 0)
                return;
            isProcessing.value = true;
            const invoice = shippingQueue.value[0];
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                invoice.status = 'shipped';
                saveToShippingHistory(invoice);
                shippingQueue.value.shift();
                // Remover la factura procesada de pendingInvoices
                const pendingInvoices = JSON.parse(localStorage.getItem('pendingInvoices') || '[]');
                const updatedPendingInvoices = pendingInvoices.filter((inv) => inv.id !== invoice.id);
                localStorage.setItem('pendingInvoices', JSON.stringify(updatedPendingInvoices));
            }
            catch (error) {
                console.error('Error processing invoice:', error);
            }
            finally {
                isProcessing.value = false;
            }
        };
        // Guardar facturas procesadas en el historial
        const saveToShippingHistory = (invoice) => {
            try {
                const history = JSON.parse(localStorage.getItem('shippingHistory') || '[]');
                history.push({
                    ...invoice,
                    shippedAt: new Date().toISOString()
                });
                localStorage.setItem('shippingHistory', JSON.stringify(history));
            }
            catch (error) {
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
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-manager") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("manager-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stats") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.stats.stackedInvoices);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.stats.queuedInvoices);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.stats.totalProcessed);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("manager-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-stack") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stack-container") }, });
    for (const [invoice, index] of __VLS_getVForSourceType((__VLS_ctx.stack.items.slice().reverse()))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((invoice.id)), ...{ class: ("stack-item") }, ...{ style: (({ marginTop: `${index * -4}px` })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("invoice-id") }, });
        (invoice.orderDetails.orderId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("timestamp") }, });
        (new Date(invoice.timestamp).toLocaleTimeString());
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-body") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("amount-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount-label") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount") }, });
        (invoice.orderDetails.total.toFixed(2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("items-count") }, });
        (invoice.orderDetails.items.length);
    }
    if (__VLS_ctx.stack.items.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-state") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.moveToShippingQueue) }, ...{ class: ("action-button") }, disabled: ((__VLS_ctx.stack.items.length === 0)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("shipping-queue") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("queue-container") }, });
    for (const [invoice] of __VLS_getVForSourceType((__VLS_ctx.shippingQueue))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((invoice.id)), ...{ class: ("queue-item") }, ...{ class: ((invoice.status)) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("invoice-id") }, });
        (invoice.orderDetails.orderId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("status-badge") }, });
        (invoice.status);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-body") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("amount-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount-label") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount") }, });
        (invoice.orderDetails.total.toFixed(2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("customer-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("customer-name") }, });
        (invoice.orderDetails.paymentDetails.cardHolder);
    }
    if (__VLS_ctx.shippingQueue.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-state") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.processShippingQueue) }, ...{ class: ("action-button") }, disabled: ((__VLS_ctx.isProcessing || __VLS_ctx.shippingQueue.length === 0)), });
    (__VLS_ctx.isProcessing ? 'Procesando...' : 'Procesar Cola');
    __VLS_styleScopedClasses['invoice-manager'];
    __VLS_styleScopedClasses['manager-header'];
    __VLS_styleScopedClasses['stats'];
    __VLS_styleScopedClasses['stat-item'];
    __VLS_styleScopedClasses['stat-item'];
    __VLS_styleScopedClasses['stat-item'];
    __VLS_styleScopedClasses['manager-content'];
    __VLS_styleScopedClasses['invoice-stack'];
    __VLS_styleScopedClasses['stack-container'];
    __VLS_styleScopedClasses['stack-item'];
    __VLS_styleScopedClasses['invoice-card'];
    __VLS_styleScopedClasses['invoice-header'];
    __VLS_styleScopedClasses['invoice-id'];
    __VLS_styleScopedClasses['timestamp'];
    __VLS_styleScopedClasses['invoice-body'];
    __VLS_styleScopedClasses['amount-section'];
    __VLS_styleScopedClasses['amount-label'];
    __VLS_styleScopedClasses['amount'];
    __VLS_styleScopedClasses['items-section'];
    __VLS_styleScopedClasses['items-count'];
    __VLS_styleScopedClasses['empty-state'];
    __VLS_styleScopedClasses['action-button'];
    __VLS_styleScopedClasses['shipping-queue'];
    __VLS_styleScopedClasses['queue-container'];
    __VLS_styleScopedClasses['queue-item'];
    __VLS_styleScopedClasses['invoice-card'];
    __VLS_styleScopedClasses['invoice-header'];
    __VLS_styleScopedClasses['invoice-id'];
    __VLS_styleScopedClasses['status-badge'];
    __VLS_styleScopedClasses['invoice-body'];
    __VLS_styleScopedClasses['amount-section'];
    __VLS_styleScopedClasses['amount-label'];
    __VLS_styleScopedClasses['amount'];
    __VLS_styleScopedClasses['customer-section'];
    __VLS_styleScopedClasses['customer-name'];
    __VLS_styleScopedClasses['empty-state'];
    __VLS_styleScopedClasses['action-button'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
