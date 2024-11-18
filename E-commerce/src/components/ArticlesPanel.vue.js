import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'TopNavigation',
    setup() {
        const router = useRouter();
        const expandedCategory = ref(null);
        const isMobileMenuOpen = ref(false);
        const closeTimeout = ref(null);
        const categories = [
            {
                name: "Men",
                subcategories: [
                    { name: "T-Shirt", subcategories: [] },
                    { name: "Shoes", subcategories: [] },
                    { name: "Pants", subcategories: [] },
                    { name: "Coats", subcategories: [] },
                    { name: "Colonies", subcategories: [] }
                ]
            },
            {
                name: "Women",
                subcategories: [
                    { name: "T-Shirt", subcategories: [] },
                    { name: "Shoes", subcategories: [] },
                    { name: "Pants", subcategories: [] },
                    { name: "Coats", subcategories: [] },
                    { name: "Colonies", subcategories: [] }
                ]
            },
            {
                name: "Kid",
                subcategories: [
                    { name: "T-Shirt", subcategories: [] },
                    { name: "Shoes", subcategories: [] },
                    { name: "Pants", subcategories: [] },
                    { name: "Coats", subcategories: [] },
                    { name: "Colonies", subcategories: [] }
                ]
            },
            {
                name: "Unisex",
                subcategories: [
                    { name: "T-Shirt", subcategories: [] },
                    { name: "Shoes", subcategories: [] },
                    { name: "Pants", subcategories: [] },
                    { name: "Coats", subcategories: [] },
                    { name: "Colonies", subcategories: [] }
                ]
            }
        ];
        const openCategory = (categoryName) => {
            if (closeTimeout.value) {
                window.clearTimeout(closeTimeout.value);
                closeTimeout.value = null;
            }
            expandedCategory.value = categoryName;
        };
        const closeCategory = () => {
            closeTimeout.value = window.setTimeout(() => {
                expandedCategory.value = null;
            }, 300);
        };
        const navigateToMainCategory = (category) => {
            const route = `/shop/${category.toLowerCase()}`;
            router.push(route);
            expandedCategory.value = null;
            if (window.innerWidth <= 768) {
                isMobileMenuOpen.value = false;
            }
        };
        const navigateToSubcategory = (category, subcategory) => {
            const route = `/shop/${category.toLowerCase()}/${subcategory.toLowerCase()}`;
            router.push(route);
            expandedCategory.value = null;
            if (window.innerWidth <= 768) {
                isMobileMenuOpen.value = false;
            }
        };
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
            document.documentElement.classList.toggle('menu-open', isMobileMenuOpen.value);
        };
        return {
            expandedCategory,
            categories,
            isMobileMenuOpen,
            openCategory,
            closeCategory,
            navigateToMainCategory,
            navigateToSubcategory,
            toggleMobileMenu,
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, ...{ class: ("categories-menu-button") }, ...{ class: (({ 'active': __VLS_ctx.isMobileMenuOpen })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hamburger-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("categories-nav") }, ...{ class: (({ 'mobile-open': __VLS_ctx.isMobileMenuOpen })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("category-list") }, });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onMouseover: (...[$event]) => {
                    !__VLS_ctx.isMobileMenuOpen && __VLS_ctx.openCategory(category.name);
                } }, ...{ onMouseleave: (...[$event]) => {
                    !__VLS_ctx.isMobileMenuOpen && __VLS_ctx.closeCategory();
                } }, key: ((category.name)), ...{ class: ("category-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("category-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.navigateToMainCategory(category.name);
                } }, ...{ class: ("category-button") }, ...{ class: (({ 'active': __VLS_ctx.expandedCategory === category.name })) }, });
        (category.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.openCategory(category.name);
                } }, ...{ class: ("dropdown-toggle") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("arrow") }, ...{ class: (({ 'arrow-down': __VLS_ctx.expandedCategory === category.name })) }, });
        if (__VLS_ctx.expandedCategory === category.name) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onMouseover: (...[$event]) => {
                        if (!((__VLS_ctx.expandedCategory === category.name)))
                            return;
                        __VLS_ctx.openCategory(category.name);
                    } }, ...{ onMouseleave: (...[$event]) => {
                        if (!((__VLS_ctx.expandedCategory === category.name)))
                            return;
                        __VLS_ctx.closeCategory();
                    } }, ...{ class: ("subcategory-dropdown") }, ...{ class: (({ 'mobile': __VLS_ctx.isMobileMenuOpen })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("subcategory-list") }, });
            for (const [subcategory] of __VLS_getVForSourceType((category.subcategories))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((subcategory.name)), ...{ class: ("subcategory-item") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.expandedCategory === category.name)))
                                return;
                            __VLS_ctx.navigateToSubcategory(category.name, subcategory.name);
                        } }, ...{ class: ("subcategory-link") }, });
                (subcategory.name);
                if (subcategory.subcategories.length > 0) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("subcategory-list") }, });
                    for (const [child] of __VLS_getVForSourceType((subcategory.subcategories))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((child.name)), ...{ class: ("subcategory-item") }, });
                        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                                    if (!((__VLS_ctx.expandedCategory === category.name)))
                                        return;
                                    if (!((subcategory.subcategories.length > 0)))
                                        return;
                                    __VLS_ctx.navigateToSubcategory(category.name, child.name);
                                } }, ...{ class: ("subcategory-link") }, });
                        (child.name);
                    }
                }
            }
        }
    }
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, ...{ class: ("mobile-overlay") }, });
    }
    __VLS_styleScopedClasses['categories-menu-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['hamburger-icon'];
    __VLS_styleScopedClasses['categories-nav'];
    __VLS_styleScopedClasses['mobile-open'];
    __VLS_styleScopedClasses['category-list'];
    __VLS_styleScopedClasses['category-item'];
    __VLS_styleScopedClasses['category-container'];
    __VLS_styleScopedClasses['category-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['dropdown-toggle'];
    __VLS_styleScopedClasses['arrow'];
    __VLS_styleScopedClasses['arrow-down'];
    __VLS_styleScopedClasses['subcategory-dropdown'];
    __VLS_styleScopedClasses['mobile'];
    __VLS_styleScopedClasses['subcategory-list'];
    __VLS_styleScopedClasses['subcategory-item'];
    __VLS_styleScopedClasses['subcategory-link'];
    __VLS_styleScopedClasses['subcategory-list'];
    __VLS_styleScopedClasses['subcategory-item'];
    __VLS_styleScopedClasses['subcategory-link'];
    __VLS_styleScopedClasses['mobile-overlay'];
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
