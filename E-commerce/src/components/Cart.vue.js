import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import getProductById from '../data/productCatalog';
export default defineComponent({
    name: 'CartView',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isProcessing = ref(false);
        const removingItem = ref(null);
        const actionStack = ref([]);
        const cartItems = computed(() => store.getters.cartItems);
        const enrichedCartItems = computed(() => {
            return cartItems.value.map((item) => {
                const product = getProductById(item.id);
                return {
                    ...item,
                    price: getProductPrice(item.id),
                    image: getProductImage(item.id),
                    isOffer: product?.isOffer
                };
            });
        });
        const getProductImage = (productId) => {
            const product = getProductById(productId);
            return product?.image || '/api/placeholder/200/200';
        };
        const getProductPrice = (productId) => {
            const product = getProductById(productId);
            return product?.price || 0;
        };
        const getMaxQuantity = (isOffer) => {
            return isOffer ? 5 : 99;
        };
        const updateQuantity = async (itemId, newQuantity, isOffer) => {
            const maxQuantity = getMaxQuantity(isOffer);
            if (newQuantity < 1 || newQuantity > maxQuantity)
                return;
            const item = cartItems.value.find((i) => i.id === itemId);
            if (item) {
                actionStack.value.push({ type: 'update', item: { ...item } });
                await store.dispatch('updateItemQuantity', { itemId, quantity: newQuantity });
            }
        };
        const handleQuantityInput = (item) => {
            const quantity = parseInt(String(item.quantity));
            const maxQuantity = getMaxQuantity(item.isOffer);
            if (isNaN(quantity) || quantity < 1) {
                updateQuantity(item.id, 1, item.isOffer);
            }
            else if (quantity > maxQuantity) {
                updateQuantity(item.id, maxQuantity, item.isOffer);
            }
            else {
                updateQuantity(item.id, quantity, item.isOffer);
            }
        };
        const removeFromCart = async (item) => {
            actionStack.value.push({ type: 'remove', item: { ...item } });
            removingItem.value = item.id;
            await new Promise(resolve => setTimeout(resolve, 300));
            await store.dispatch('removeItemFromCart', item.id);
            removingItem.value = null;
        };
        const undoLastAction = async () => {
            const lastAction = actionStack.value.pop();
            if (!lastAction)
                return;
            if (lastAction.type === 'remove') {
                await store.dispatch('addItemToCart', lastAction.item);
            }
            else if (lastAction.type === 'update') {
                await store.dispatch('updateItemQuantity', {
                    itemId: lastAction.item.id,
                    quantity: lastAction.item.quantity,
                });
            }
        };
        const subtotal = computed(() => {
            return enrichedCartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
        });
        const shipping = computed(() => (subtotal.value > 100 ? 0 : 10));
        const discount = computed(() => (subtotal.value > 200 ? subtotal.value * 0.1 : 0));
        const total = computed(() => subtotal.value + shipping.value - discount.value);
        const proceedToCheckout = async () => {
            isProcessing.value = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                router.push('/checkout');
            }
            finally {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("cart-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("cart-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    if (__VLS_ctx.cartItems.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("empty-cart-message") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/shop"), ...{ class: ("continue-shopping") }, }));
        const __VLS_2 = __VLS_1({ to: ("/shop"), ...{ class: ("continue-shopping") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_nonNullable(__VLS_5.slots).default;
        var __VLS_5;
    }
    if (__VLS_ctx.cartItems.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("cart-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("cart-items") }, });
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.enrichedCartItems))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((item.id)), ...{ class: ("cart-item") }, ...{ class: (({ 'removing': __VLS_ctx.removingItem === item.id })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item-image") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.getProductImage(item.id))), alt: ((item.name)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (item.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("item-price") }, ...{ class: (({ 'offer-price': item.isOffer })) }, });
            (__VLS_ctx.getProductPrice(item.id).toFixed(2));
            if (item.isOffer) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("old-price") }, });
                (item.oldPrice?.toFixed(2));
            }
            if (item.discount) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("discount-badge") }, });
                (item.discount);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item-actions") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("quantity-controls") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.cartItems.length > 0)))
                            return;
                        __VLS_ctx.updateQuantity(item.id, item.quantity - 1, item.isOffer);
                    } }, ...{ class: ("quantity-btn") }, disabled: ((item.quantity <= 1)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ onChange: (...[$event]) => {
                        if (!((__VLS_ctx.cartItems.length > 0)))
                            return;
                        __VLS_ctx.handleQuantityInput(item);
                    } }, type: ("number"), ...{ class: ("quantity-input") }, max: ((__VLS_ctx.getMaxQuantity(item.isOffer))), min: ("1"), });
            (item.quantity);
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.cartItems.length > 0)))
                            return;
                        __VLS_ctx.updateQuantity(item.id, item.quantity + 1, item.isOffer);
                    } }, ...{ class: ("quantity-btn") }, disabled: ((item.quantity >= __VLS_ctx.getMaxQuantity(item.isOffer))), });
            if (item.quantity >= __VLS_ctx.getMaxQuantity(item.isOffer)) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-quantity-warning") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.cartItems.length > 0)))
                            return;
                        __VLS_ctx.removeFromCart(item);
                    } }, ...{ class: ("remove-btn") }, disabled: ((__VLS_ctx.removingItem === item.id)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("remove-icon") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item-subtotal") }, });
            ((__VLS_ctx.getProductPrice(item.id) * item.quantity).toFixed(2));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("cart-summary") }, });
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.proceedToCheckout) }, ...{ class: ("checkout-btn") }, disabled: ((__VLS_ctx.isProcessing || __VLS_ctx.cartItems.length === 0)), });
        (__VLS_ctx.isProcessing ? 'Procesando...' : 'Proceder al pago');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.undoLastAction) }, ...{ class: ("undo-btn") }, disabled: ((__VLS_ctx.actionStack.length === 0)), });
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/shop"), ...{ class: ("continue-shopping-link") }, }));
        const __VLS_8 = __VLS_7({ to: ("/shop"), ...{ class: ("continue-shopping-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_nonNullable(__VLS_11.slots).default;
        var __VLS_11;
    }
    __VLS_styleScopedClasses['cart-container'];
    __VLS_styleScopedClasses['cart-header'];
    __VLS_styleScopedClasses['empty-cart-message'];
    __VLS_styleScopedClasses['continue-shopping'];
    __VLS_styleScopedClasses['cart-content'];
    __VLS_styleScopedClasses['cart-items'];
    __VLS_styleScopedClasses['cart-item'];
    __VLS_styleScopedClasses['removing'];
    __VLS_styleScopedClasses['item-image'];
    __VLS_styleScopedClasses['item-details'];
    __VLS_styleScopedClasses['item-info'];
    __VLS_styleScopedClasses['price-info'];
    __VLS_styleScopedClasses['item-price'];
    __VLS_styleScopedClasses['offer-price'];
    __VLS_styleScopedClasses['old-price'];
    __VLS_styleScopedClasses['discount-badge'];
    __VLS_styleScopedClasses['item-actions'];
    __VLS_styleScopedClasses['quantity-controls'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['quantity-input'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['max-quantity-warning'];
    __VLS_styleScopedClasses['remove-btn'];
    __VLS_styleScopedClasses['remove-icon'];
    __VLS_styleScopedClasses['item-subtotal'];
    __VLS_styleScopedClasses['cart-summary'];
    __VLS_styleScopedClasses['summary-details'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['summary-line'];
    __VLS_styleScopedClasses['discount'];
    __VLS_styleScopedClasses['summary-total'];
    __VLS_styleScopedClasses['checkout-btn'];
    __VLS_styleScopedClasses['undo-btn'];
    __VLS_styleScopedClasses['continue-shopping-link'];
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
