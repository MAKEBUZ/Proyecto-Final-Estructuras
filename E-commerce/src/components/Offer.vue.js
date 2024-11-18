import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Offer1 from '../assets/Offer/offer1.jpg';
import Offer2 from '../assets/Offer/offer2.jpg';
import Offer3 from '../assets/Offer/offer3.jpg';
import Offer4 from '../assets/Offer/offer4.jpg';
export default defineComponent({
    name: 'OffersPage',
    props: {
        autoplayInterval: {
            type: Number,
            default: 5000
        }
    },
    setup(props) {
        const store = useStore();
        const isAdding = ref(null);
        const currentSlide = ref(0);
        const autoplayTimer = ref(null);
        const touchStart = ref(0);
        const touchEnd = ref(0);
        const offers = ref([
            {
                id: 10000,
                title: "Camiseta del Deportivo Pasto",
                description: "Camiseta del Deportivo Pasto edicion especial 'La del Ascenso'",
                price: 100.00,
                oldPrice: 129.99,
                discount: 33,
                image: Offer1
            },
            {
                id: 10001,
                title: "Camiseta Arquero Pasto",
                description: "Camiseta de Arquero del Deportivo Pasto",
                price: 89.99,
                oldPrice: 119.99,
                discount: 25,
                image: Offer2,
            },
            {
                id: 10002,
                title: "Camiseta Seleccion Colombia - Local",
                description: "Camiseta Seleccion Colombia - Local",
                price: 150.00,
                oldPrice: 199.99,
                discount: 20,
                image: Offer3,
            },
            {
                id: 10003,
                title: "Camiseta Seleccion Colombia - Visitante",
                description: "Camiseta Seleccion Colombia - Visitante",
                price: 150.00,
                oldPrice: 199.99,
                discount: 20,
                image: Offer4,
            }
        ]);
        // Funciones del slider
        const nextSlide = () => {
            currentSlide.value = (currentSlide.value + 1) % offers.value.length;
        };
        const prevSlide = () => {
            currentSlide.value = currentSlide.value === 0
                ? offers.value.length - 1
                : currentSlide.value - 1;
        };
        const goToSlide = (index) => {
            currentSlide.value = index;
        };
        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer.value = window.setInterval(nextSlide, props.autoplayInterval);
        };
        const stopAutoplay = () => {
            if (autoplayTimer.value) {
                clearInterval(autoplayTimer.value);
                autoplayTimer.value = null;
            }
        };
        // Manejo de eventos táctiles
        const handleTouchStart = (e) => {
            touchStart.value = e.touches[0].clientX;
        };
        const handleTouchMove = (e) => {
            touchEnd.value = e.touches[0].clientX;
        };
        const handleTouchEnd = () => {
            const difference = touchStart.value - touchEnd.value;
            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    nextSlide();
                }
                else {
                    prevSlide();
                }
            }
        };
        // Funciones del carrito
        const addToCart = async (offer) => {
            if (isAdding.value)
                return;
            isAdding.value = offer.id;
            try {
                const cartItem = {
                    id: offer.id,
                    quantity: 1,
                    name: offer.title,
                    price: offer.price
                };
                await store.dispatch('addItemToCart', cartItem);
                showSuccessAlert(offer.title);
            }
            catch (error) {
                console.error('Error adding to cart:', error);
                showErrorAlert();
            }
            finally {
                setTimeout(() => {
                    isAdding.value = null;
                }, 500);
            }
        };
        const showSuccessAlert = (title) => {
            const alert = document.createElement('div');
            alert.className = 'success-alert';
            alert.textContent = `${title} añadido al carrito!`;
            document.body.appendChild(alert);
            setTimeout(() => {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(alert);
                }, 300);
            }, 2000);
        };
        const showErrorAlert = () => {
            const alert = document.createElement('div');
            alert.className = 'error-alert';
            alert.textContent = 'Error al añadir al carrito. Inténtalo de nuevo.';
            document.body.appendChild(alert);
            setTimeout(() => {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(alert);
                }, 300);
            }, 2000);
        };
        onMounted(() => {
            startAutoplay();
        });
        onUnmounted(() => {
            stopAutoplay();
        });
        return {
            offers,
            currentSlide,
            isAdding,
            nextSlide,
            prevSlide,
            goToSlide,
            handleTouchStart,
            handleTouchMove,
            handleTouchEnd,
            addToCart
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("offers-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("slider-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onTouchstart: (__VLS_ctx.handleTouchStart) }, ...{ onTouchmove: (__VLS_ctx.handleTouchMove) }, ...{ onTouchend: (__VLS_ctx.handleTouchEnd) }, ...{ class: ("slider") }, });
    for (const [offer, index] of __VLS_getVForSourceType((__VLS_ctx.offers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((offer.id)), ...{ class: ("slide") }, ...{ class: (({ active: __VLS_ctx.currentSlide === index })) }, ...{ style: (({ transform: `translateX(${100 * (index - __VLS_ctx.currentSlide)}%)` })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("slide-inner") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("offer-image") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((offer.image)), alt: ((offer.title)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("discount-badge") }, });
        (offer.discount);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("offer-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (offer.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (offer.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("old-price") }, });
        (offer.oldPrice);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("current-price") }, });
        (offer.price);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.addToCart(offer);
                } }, ...{ class: ("buy-button") }, ...{ class: (({ 'is-adding': __VLS_ctx.isAdding === offer.id })) }, disabled: ((__VLS_ctx.isAdding === offer.id)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("button-text") }, });
        (__VLS_ctx.isAdding === offer.id ? 'Añadiendo...' : 'Comprar Ahora');
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("slider-controls") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.prevSlide) }, ...{ class: ("slider-btn prev") }, "aria-label": ("Previous slide"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.nextSlide) }, ...{ class: ("slider-btn next") }, "aria-label": ("Next slide"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("slider-dots") }, });
    for (const [offer, index] of __VLS_getVForSourceType((__VLS_ctx.offers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.goToSlide(index);
                } }, key: ((offer.id)), ...{ class: ("dot") }, ...{ class: (({ active: __VLS_ctx.currentSlide === index })) }, "aria-label": (('Go to slide ' + (index + 1))), });
    }
    __VLS_styleScopedClasses['offers-page'];
    __VLS_styleScopedClasses['slider-container'];
    __VLS_styleScopedClasses['slider'];
    __VLS_styleScopedClasses['slide'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['slide-inner'];
    __VLS_styleScopedClasses['offer-image'];
    __VLS_styleScopedClasses['discount-badge'];
    __VLS_styleScopedClasses['offer-content'];
    __VLS_styleScopedClasses['price-container'];
    __VLS_styleScopedClasses['old-price'];
    __VLS_styleScopedClasses['current-price'];
    __VLS_styleScopedClasses['buy-button'];
    __VLS_styleScopedClasses['is-adding'];
    __VLS_styleScopedClasses['button-text'];
    __VLS_styleScopedClasses['slider-controls'];
    __VLS_styleScopedClasses['slider-btn'];
    __VLS_styleScopedClasses['prev'];
    __VLS_styleScopedClasses['slider-btn'];
    __VLS_styleScopedClasses['next'];
    __VLS_styleScopedClasses['slider-dots'];
    __VLS_styleScopedClasses['dot'];
    __VLS_styleScopedClasses['active'];
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
