import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import getProductById from '../data/productCatalog';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const invoiceRef = ref(null);
const isProcessing = ref(false);
const orderDetails = ref(null);
// Verificar si existe una orden pagada y obtener sus detalles
onMounted(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (!lastOrder) {
        // Si no hay orden, redirigir al carrito
        router.replace('/cart');
        return;
    }
    try {
        orderDetails.value = JSON.parse(lastOrder);
    }
    catch (error) {
        console.error('Error parsing order details:', error);
        router.replace('/cart');
    }
});
// Enriquecer items con información del producto
const enrichedItems = computed(() => {
    if (!orderDetails.value)
        return [];
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
// Cálculos
const subtotal = computed(() => {
    return enrichedItems.value.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
});
const shipping = computed(() => subtotal.value > 100 ? 0 : 10);
const discount = computed(() => subtotal.value > 200 ? subtotal.value * 0.1 : 0);
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
const generatePDF = async () => {
    if (!invoiceRef.value)
        return;
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
    }
    catch (error) {
        console.error('Error generando PDF:', error);
    }
    finally {
        isProcessing.value = false;
    }
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
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
    __VLS_styleScopedClasses['invoice-title'];
    __VLS_styleScopedClasses['customer-details'];
    __VLS_styleScopedClasses['invoice-items'];
    __VLS_styleScopedClasses['invoice-items'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['btn-primary'];
    __VLS_styleScopedClasses['btn-primary'];
    __VLS_styleScopedClasses['btn-secondary'];
    __VLS_styleScopedClasses['invoice-container'];
    __VLS_styleScopedClasses['invoice-content'];
    __VLS_styleScopedClasses['invoice-actions'];
    __VLS_styleScopedClasses['btn-primary'];
    __VLS_styleScopedClasses['btn-secondary'];
    __VLS_styleScopedClasses['invoice-items'];
    __VLS_styleScopedClasses['invoice-items'];
    __VLS_styleScopedClasses['product-info'];
    __VLS_styleScopedClasses['product-thumbnail'];
    __VLS_styleScopedClasses['invoice-content'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.orderDetails) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-container") }, ...{ class: (({ 'processing': __VLS_ctx.isProcessing })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-content") }, ref: ("invoiceRef"), });
        // @ts-ignore navigation for `const invoiceRef = ref()`
        __VLS_ctx.invoiceRef;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-title") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (__VLS_ctx.orderDetails.orderId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("date") }, });
        (__VLS_ctx.formatDate(__VLS_ctx.orderDetails.date));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("customer-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.orderDetails.paymentDetails.cardNumber);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.orderDetails.paymentDetails.cardHolder);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-items") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.enrichedItems))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((item.id)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("product-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((item.image)), alt: ((item.name)), ...{ class: ("product-thumbnail") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (item.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (item.quantity);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (item.price.toFixed(2));
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            ((item.price * item.quantity).toFixed(2));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-summary") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-line") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.subtotal.toFixed(2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-line") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.shipping.toFixed(2));
        if (__VLS_ctx.discount > 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-line discount") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.discount.toFixed(2));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-total") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.orderDetails.total.toFixed(2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("invoice-actions") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.generatePDF) }, disabled: ((__VLS_ctx.isProcessing)), ...{ class: ("btn-primary") }, });
        (__VLS_ctx.isProcessing ? 'Generando PDF...' : 'Descargar PDF');
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/"), ...{ class: ("btn-secondary") }, }));
        const __VLS_2 = __VLS_1({ to: ("/"), ...{ class: ("btn-secondary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_nonNullable(__VLS_5.slots).default;
        var __VLS_5;
    }
    __VLS_styleScopedClasses['invoice-container'];
    __VLS_styleScopedClasses['processing'];
    __VLS_styleScopedClasses['invoice-content'];
    __VLS_styleScopedClasses['invoice-header'];
    __VLS_styleScopedClasses['invoice-title'];
    __VLS_styleScopedClasses['date'];
    __VLS_styleScopedClasses['customer-details'];
    __VLS_styleScopedClasses['invoice-items'];
    __VLS_styleScopedClasses['product-info'];
    __VLS_styleScopedClasses['product-thumbnail'];
    __VLS_styleScopedClasses['invoice-summary'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['discount'];
    __VLS_styleScopedClasses['summary-total'];
    __VLS_styleScopedClasses['invoice-actions'];
    __VLS_styleScopedClasses['btn-primary'];
    __VLS_styleScopedClasses['btn-secondary'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "invoiceRef": __VLS_nativeElements['div'],
    };
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
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            invoiceRef: invoiceRef,
            isProcessing: isProcessing,
            orderDetails: orderDetails,
            enrichedItems: enrichedItems,
            subtotal: subtotal,
            shipping: shipping,
            discount: discount,
            formatDate: formatDate,
            generatePDF: generatePDF,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
