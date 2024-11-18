import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import getProductById from '../data/productCatalog';
export default defineComponent({
    name: 'CheckoutView',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isProcessing = ref(false);
        const paymentDetails = ref({
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: ''
        });
        const cartItems = computed(() => store.getters.cartItems);
        const subtotal = computed(() => {
            return cartItems.value.reduce((total, item) => {
                const product = getProductById(item.id);
                return total + (product?.price || 0) * item.quantity;
            }, 0);
        });
        const shipping = computed(() => (subtotal.value > 100 ? 0 : 10));
        const discount = computed(() => (subtotal.value > 200 ? subtotal.value * 0.1 : 0));
        const total = computed(() => subtotal.value + shipping.value - discount.value);
        const formatCardNumber = (value) => {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const matches = v.match(/\d{4,16}/g);
            const match = (matches && matches[0]) || '';
            const parts = [];
            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }
            if (parts.length) {
                return parts.join(' ');
            }
            else {
                return value;
            }
        };
        const handleCardNumberInput = (event) => {
            const input = event.target;
            paymentDetails.value.cardNumber = formatCardNumber(input.value);
        };
        const formatExpiryDate = (value) => {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            if (v.length >= 2) {
                return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
            }
            return v;
        };
        const handleExpiryDate = (event) => {
            const input = event.target;
            paymentDetails.value.expiryDate = formatExpiryDate(input.value);
        };
        const isFormValid = computed(() => {
            return (paymentDetails.value.cardNumber.replace(/\s/g, '').length === 16 &&
                paymentDetails.value.cardHolder.length > 0 &&
                paymentDetails.value.expiryDate.length === 5 &&
                paymentDetails.value.cvv.length === 3);
        });
        const processPayment = async () => {
            if (!isFormValid.value)
                return;
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
            }
            catch (error) {
                console.error('Payment processing failed:', error);
            }
            finally {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("checkout-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("checkout-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("payment-form") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("cardNumber"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.handleCardNumberInput) }, id: ("cardNumber"), type: ("text"), value: ((__VLS_ctx.paymentDetails.cardNumber)), maxlength: ("19"), placeholder: ("0000 0000 0000 0000"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("cardHolder"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("cardHolder"), type: ("text"), value: ((__VLS_ctx.paymentDetails.cardHolder)), placeholder: ("Nombre completo"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-row") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group half") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("expiryDate"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.handleExpiryDate) }, id: ("expiryDate"), type: ("text"), value: ((__VLS_ctx.paymentDetails.expiryDate)), maxlength: ("5"), placeholder: ("MM/YY"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group half") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("cvv"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("cvv"), type: ("password"), maxlength: ("3"), placeholder: ("123"), });
    (__VLS_ctx.paymentDetails.cvv);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("order-summary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("summary-details") }, });
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
    (__VLS_ctx.total.toFixed(2));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.processPayment) }, ...{ class: ("payment-btn") }, disabled: ((!__VLS_ctx.isFormValid || __VLS_ctx.isProcessing)), });
    (__VLS_ctx.isProcessing ? 'Procesando...' : 'Pagar ahora');
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/cart"), ...{ class: ("back-to-cart") }, }));
    const __VLS_2 = __VLS_1({ to: ("/cart"), ...{ class: ("back-to-cart") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_styleScopedClasses['checkout-container'];
    __VLS_styleScopedClasses['checkout-content'];
    __VLS_styleScopedClasses['payment-form'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['form-row'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['half'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['half'];
    __VLS_styleScopedClasses['order-summary'];
    __VLS_styleScopedClasses['summary-details'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['discount'];
    __VLS_styleScopedClasses['summary-total'];
    __VLS_styleScopedClasses['payment-btn'];
    __VLS_styleScopedClasses['back-to-cart'];
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
