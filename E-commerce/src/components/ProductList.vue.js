import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { productCatalog } from '../data/productCatalog';
export default defineComponent({
    name: 'ProductList',
    props: {
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const store = useStore();
        const searchQuery = ref('');
        const sortBy = ref('name');
        const isAddingToCart = ref(null);
        const currentPage = ref(1);
        const itemsPerPage = 6;
        // Reemplazar la definición local de productos por el catálogo importado
        const products = computed(() => {
            return productCatalog.filter(product => {
                const categoryMatch = product.category.toLowerCase() === props.category.toLowerCase();
                if (props.subcategory) {
                    return categoryMatch && product.subcategory.toLowerCase() === props.subcategory.toLowerCase();
                }
                return categoryMatch;
            });
        });
        const filteredProducts = computed(() => {
            let result = [...products.value];
            // Aplicar búsqueda
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(product => product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query));
            }
            // Aplicar ordenamiento
            result.sort((a, b) => {
                if (sortBy.value === 'price') {
                    return a.price - b.price;
                }
                return a.name.localeCompare(b.name);
            });
            return result;
        });
        const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
        const displayedProducts = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredProducts.value.slice(start, end);
        });
        const isInCart = (productId) => {
            return store.state.cart.items.some((item) => item.id === productId);
        };
        const getCartItemQuantity = (productId) => {
            const item = store.state.cart.items.find((item) => item.id === productId);
            return item ? item.quantity : 0;
        };
        const addToCart = async (product) => {
            isAddingToCart.value = product.id;
            await store.dispatch('addItemToCart', {
                id: product.id,
                name: product.name,
                quantity: 1
            });
            setTimeout(() => {
                isAddingToCart.value = null;
            }, 1000);
        };
        const increaseQuantity = (product) => {
            const currentQuantity = getCartItemQuantity(product.id);
            store.dispatch('updateItemQuantity', {
                itemId: product.id,
                quantity: currentQuantity + 1
            });
        };
        const decreaseQuantity = (product) => {
            const currentQuantity = getCartItemQuantity(product.id);
            if (currentQuantity > 1) {
                store.dispatch('updateItemQuantity', {
                    itemId: product.id,
                    quantity: currentQuantity - 1
                });
            }
        };
        // Reset página cuando cambian los filtros
        watch([searchQuery, sortBy], () => {
            currentPage.value = 1;
        });
        return {
            filteredProducts,
            totalPages,
            displayedProducts,
            getCartItemQuantity,
            searchQuery,
            sortBy,
            isAddingToCart,
            isInCart,
            currentPage,
            addToCart,
            increaseQuantity,
            decreaseQuantity
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
    __VLS_styleScopedClasses['product-card'];
    __VLS_styleScopedClasses['product-info'];
    __VLS_styleScopedClasses['add-to-cart-btn'];
    __VLS_styleScopedClasses['add-to-cart-btn'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['pagination-btn'];
    __VLS_styleScopedClasses['pagination-btn'];
    __VLS_styleScopedClasses['products-grid'];
    __VLS_styleScopedClasses['products-grid'];
    __VLS_styleScopedClasses['filters'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['sort-select'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("product-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("main-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.searchQuery)), placeholder: ("Buscar productos..."), ...{ class: ("search-input") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.sortBy)), ...{ class: ("sort-select") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("name"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("price"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("products-grid") }, });
    for (const [product] of __VLS_getVForSourceType((__VLS_ctx.displayedProducts))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((product.id)), ...{ class: ("product-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((product.image)), alt: ((product.name)), ...{ class: ("product-image") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("product-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (product.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("price") }, });
        (product.price.toFixed(2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("description") }, });
        (product.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("product-actions") }, });
        if (__VLS_ctx.isInCart(product.id)) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("quantity-controls") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.isInCart(product.id))))
                            return;
                        __VLS_ctx.decreaseQuantity(product);
                    } }, ...{ class: ("quantity-btn") }, disabled: ((__VLS_ctx.getCartItemQuantity(product.id) <= 1)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("quantity") }, });
            (__VLS_ctx.getCartItemQuantity(product.id));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.isInCart(product.id))))
                            return;
                        __VLS_ctx.increaseQuantity(product);
                    } }, ...{ class: ("quantity-btn") }, });
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.isInCart(product.id)))))
                            return;
                        __VLS_ctx.addToCart(product);
                    } }, ...{ class: ("add-to-cart-btn") }, ...{ class: (({ 'adding': __VLS_ctx.isAddingToCart === product.id })) }, });
            (__VLS_ctx.isAddingToCart === product.id ? '¡Agregado!' : 'Agregar al carrito');
        }
    }
    if (__VLS_ctx.totalPages > 1) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("pagination") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.totalPages > 1)))
                        return;
                    __VLS_ctx.currentPage--;
                } }, disabled: ((__VLS_ctx.currentPage === 1)), ...{ class: ("pagination-btn") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.currentPage);
        (__VLS_ctx.totalPages);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.totalPages > 1)))
                        return;
                    __VLS_ctx.currentPage++;
                } }, disabled: ((__VLS_ctx.currentPage >= __VLS_ctx.totalPages)), ...{ class: ("pagination-btn") }, });
    }
    __VLS_styleScopedClasses['product-container'];
    __VLS_styleScopedClasses['main-content'];
    __VLS_styleScopedClasses['filters'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['sort-select'];
    __VLS_styleScopedClasses['products-grid'];
    __VLS_styleScopedClasses['product-card'];
    __VLS_styleScopedClasses['product-image'];
    __VLS_styleScopedClasses['product-info'];
    __VLS_styleScopedClasses['price'];
    __VLS_styleScopedClasses['description'];
    __VLS_styleScopedClasses['product-actions'];
    __VLS_styleScopedClasses['quantity-controls'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['quantity'];
    __VLS_styleScopedClasses['quantity-btn'];
    __VLS_styleScopedClasses['add-to-cart-btn'];
    __VLS_styleScopedClasses['adding'];
    __VLS_styleScopedClasses['pagination'];
    __VLS_styleScopedClasses['pagination-btn'];
    __VLS_styleScopedClasses['pagination-btn'];
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
