import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'Header',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isHovered = ref(false);
        const isMobileMenuOpen = ref(false);
        const isCartUpdating = ref(false);
        const loginStatus = ref(false);
        const totalItems = computed(() => store.getters.cartItemCount);
        const isLoggedIn = computed(() => {
            const session = localStorage.getItem('session');
            return loginStatus.value || !!session;
        });
        const navItems = computed(() => {
            const items = ['Home', 'Shop', 'About', 'Contact'];
            if (!isLoggedIn.value) {
                items.push('Admin');
            }
            return items;
        });
        const handleLoginStatusChange = () => {
            loginStatus.value = true;
        };
        const handleLogoutStatusChange = () => {
            loginStatus.value = false;
        };
        onMounted(() => {
            window.addEventListener('login-status-changed', handleLoginStatusChange);
            window.addEventListener('logout-status-changed', handleLogoutStatusChange);
            const session = localStorage.getItem('session');
            if (session) {
                loginStatus.value = true;
            }
        });
        onUnmounted(() => {
            window.removeEventListener('login-status-changed', handleLoginStatusChange);
            window.removeEventListener('logout-status-changed', handleLogoutStatusChange);
        });
        watch(totalItems, () => {
            isCartUpdating.value = true;
            setTimeout(() => {
                isCartUpdating.value = false;
            }, 300);
        });
        const toggleHover = (value) => {
            isHovered.value = value;
        };
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
            if (isMobileMenuOpen.value) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = '';
            }
        };
        const handleLogout = () => {
            localStorage.removeItem('session');
            loginStatus.value = false;
            const event = new CustomEvent('logout-status-changed');
            window.dispatchEvent(event);
            router.push('/');
            toggleMobileMenu();
        };
        const getUserName = computed(() => {
            const session = localStorage.getItem('session');
            if (session) {
                const userData = JSON.parse(session);
                return userData.username;
            }
            return '';
        });
        return {
            isHovered,
            isMobileMenuOpen,
            isCartUpdating,
            totalItems,
            isLoggedIn,
            navItems,
            getUserName,
            toggleHover,
            toggleMobileMenu,
            handleLogout
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("header") }, ...{ class: (({ 'menu-open': __VLS_ctx.isMobileMenuOpen })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("logo") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Logo/Logo-cuaso.png"), alt: ("E-Commerce Logo"), ...{ class: ("logo-image") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, ...{ class: ("mobile-menu-button") }, ...{ class: (({ 'is-active': __VLS_ctx.isMobileMenuOpen })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hamburger-line") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hamburger-line") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hamburger-line") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("nav") }, ...{ class: (({ 'nav-open': __VLS_ctx.isMobileMenuOpen })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("nav-list") }, });
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, href: ((item === 'Home' ? '/' : `/${item.toLowerCase()}`)), ...{ class: ("nav-link") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-text") }, });
        (item);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-underline") }, });
    }
    if (__VLS_ctx.isLoggedIn) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, href: ("/admin/manager"), ...{ class: ("nav-link admin-link") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-text") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-underline") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleLogout) }, ...{ class: ("nav-link logout-button") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-text") }, });
        (__VLS_ctx.getUserName);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-underline") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.toggleHover(true);
            } }, ...{ onMouseleave: (...[$event]) => {
                __VLS_ctx.toggleHover(false);
            } }, ...{ class: ("cart") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("/cart"), ...{ class: ("cart-link") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Icons/shop.png"), alt: ("Cart"), ...{ class: (({ 'cart-bounce': __VLS_ctx.isHovered || __VLS_ctx.isCartUpdating })) }, });
    if (__VLS_ctx.totalItems > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("cart-count") }, ...{ class: (({
                    'count-pulse': __VLS_ctx.isHovered,
                    'count-update': __VLS_ctx.isCartUpdating
                })) }, });
        (__VLS_ctx.totalItems);
    }
    __VLS_styleScopedClasses['header'];
    __VLS_styleScopedClasses['menu-open'];
    __VLS_styleScopedClasses['header-container'];
    __VLS_styleScopedClasses['logo'];
    __VLS_styleScopedClasses['logo-image'];
    __VLS_styleScopedClasses['mobile-menu-button'];
    __VLS_styleScopedClasses['is-active'];
    __VLS_styleScopedClasses['hamburger-line'];
    __VLS_styleScopedClasses['hamburger-line'];
    __VLS_styleScopedClasses['hamburger-line'];
    __VLS_styleScopedClasses['nav'];
    __VLS_styleScopedClasses['nav-open'];
    __VLS_styleScopedClasses['nav-list'];
    __VLS_styleScopedClasses['nav-item'];
    __VLS_styleScopedClasses['nav-link'];
    __VLS_styleScopedClasses['link-text'];
    __VLS_styleScopedClasses['link-underline'];
    __VLS_styleScopedClasses['nav-item'];
    __VLS_styleScopedClasses['nav-link'];
    __VLS_styleScopedClasses['admin-link'];
    __VLS_styleScopedClasses['link-text'];
    __VLS_styleScopedClasses['link-underline'];
    __VLS_styleScopedClasses['nav-item'];
    __VLS_styleScopedClasses['nav-link'];
    __VLS_styleScopedClasses['logout-button'];
    __VLS_styleScopedClasses['link-text'];
    __VLS_styleScopedClasses['link-underline'];
    __VLS_styleScopedClasses['cart'];
    __VLS_styleScopedClasses['cart-link'];
    __VLS_styleScopedClasses['cart-bounce'];
    __VLS_styleScopedClasses['cart-count'];
    __VLS_styleScopedClasses['count-pulse'];
    __VLS_styleScopedClasses['count-update'];
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
