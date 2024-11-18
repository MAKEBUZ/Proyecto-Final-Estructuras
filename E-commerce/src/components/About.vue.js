import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
    name: 'About',
    setup() {
        const stats = ref([
            { value: 0, target: 10000, suffix: '+', label: 'Clientes Satisfechos' },
            { value: 0, target: 50000, suffix: '+', label: 'Productos Vendidos' },
            { value: 0, target: 99, suffix: '%', label: 'Satisfacción' }
        ]);
        const values = ref([
            {
                title: 'Innovación',
                description: 'Buscamos constantemente nuevas formas de mejorar tu experiencia de compra.'
            },
            {
                title: 'Calidad',
                description: 'Garantizamos la mejor calidad en todos nuestros productos.'
            },
            {
                title: 'Compromiso',
                description: 'Estamos comprometidos con la satisfacción total de nuestros clientes.'
            },
            {
                title: 'Sostenibilidad',
                description: 'Trabajamos por un futuro más sostenible y responsable.'
            }
        ]);
        const animateCount = () => {
            stats.value.forEach(stat => {
                let current = 0;
                const increment = stat.target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.target) {
                        stat.value = stat.target;
                        clearInterval(timer);
                    }
                    else {
                        stat.value = Math.round(current);
                    }
                }, 20);
            });
        };
        const scrollToFeatures = () => {
            const featuresSection = document.querySelector('.features-section');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
        };
        onMounted(() => {
            // Iniciar animaciones cuando el componente se monta
            animateCount();
            // Observador para animaciones al hacer scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up, .animate-fade-in, .animate-scale')
                .forEach(el => observer.observe(el));
        });
        return {
            stats,
            values,
            scrollToFeatures
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("about-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("hero-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("title animate-fade-in") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("subtitle animate-slide-up") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("features-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("feature-card animate-slide-left") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("icon-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("icon") }, fill: ("none"), viewBox: ("0 0 24 24"), stroke: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("feature-card animate-slide-up") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("icon-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("icon") }, fill: ("none"), viewBox: ("0 0 24 24"), stroke: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("feature-card animate-slide-right") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("icon-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("icon") }, fill: ("none"), viewBox: ("0 0 24 24"), stroke: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("story-section animate-fade-in") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("story-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("story-text") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.scrollToFeatures) }, ...{ class: ("learn-more-btn") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stats-container") }, });
    for (const [stat] of __VLS_getVForSourceType((__VLS_ctx.stats))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item animate-count") }, key: ((stat.label)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (stat.value);
        (stat.suffix);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (stat.label);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("values-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("animate-fade-in") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("values-grid") }, });
    for (const [value] of __VLS_getVForSourceType((__VLS_ctx.values))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((value.title)), ...{ class: ("value-card animate-scale") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (value.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (value.description);
    }
    __VLS_styleScopedClasses['about-container'];
    __VLS_styleScopedClasses['hero-section'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['animate-fade-in'];
    __VLS_styleScopedClasses['subtitle'];
    __VLS_styleScopedClasses['animate-slide-up'];
    __VLS_styleScopedClasses['features-section'];
    __VLS_styleScopedClasses['feature-card'];
    __VLS_styleScopedClasses['animate-slide-left'];
    __VLS_styleScopedClasses['icon-wrapper'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['feature-card'];
    __VLS_styleScopedClasses['animate-slide-up'];
    __VLS_styleScopedClasses['icon-wrapper'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['feature-card'];
    __VLS_styleScopedClasses['animate-slide-right'];
    __VLS_styleScopedClasses['icon-wrapper'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['story-section'];
    __VLS_styleScopedClasses['animate-fade-in'];
    __VLS_styleScopedClasses['story-content'];
    __VLS_styleScopedClasses['story-text'];
    __VLS_styleScopedClasses['learn-more-btn'];
    __VLS_styleScopedClasses['stats-container'];
    __VLS_styleScopedClasses['stat-item'];
    __VLS_styleScopedClasses['animate-count'];
    __VLS_styleScopedClasses['values-section'];
    __VLS_styleScopedClasses['animate-fade-in'];
    __VLS_styleScopedClasses['values-grid'];
    __VLS_styleScopedClasses['value-card'];
    __VLS_styleScopedClasses['animate-scale'];
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
