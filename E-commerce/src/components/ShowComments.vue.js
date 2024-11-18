import { defineComponent, ref, computed, onMounted } from 'vue';
export default defineComponent({
    name: 'CommentDisplay',
    setup() {
        // Definición de categorías
        const mainCategories = [
            { id: 'hombres', name: 'Hombres' },
            { id: 'mujeres', name: 'Mujeres' },
            { id: 'ninos', name: 'Niños' },
            { id: 'unisex', name: 'Unisex' }
        ];
        const subCategories = [
            { id: 'moda', name: 'Moda' },
            { id: 'colecciones', name: 'Colecciones' },
            { id: 'ofertas', name: 'Ofertas' },
            { id: 'preguntas', name: 'Preguntas' },
            { id: 'sugerencias', name: 'Sugerencias' }
        ];
        const categorySubcategories = {
            hombres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            mujeres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            ninos: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            unisex: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias']
        };
        // Estado
        const comments = ref([]);
        const selectedMainCategory = ref('');
        const selectedSubCategory = ref('');
        const showDeleteModal = ref(false);
        const commentToDelete = ref(null);
        const parentCommentId = ref(null);
        // Computed properties
        const availableSubCategories = computed(() => {
            if (!selectedMainCategory.value)
                return [];
            const availableIds = categorySubcategories[selectedMainCategory.value] || [];
            return subCategories.filter(cat => availableIds.includes(cat.id));
        });
        const filteredRootComments = computed(() => {
            let filtered = comments.value.filter(comment => !comment.parentId);
            if (selectedMainCategory.value) {
                filtered = filtered.filter(comment => comment.mainCategory === selectedMainCategory.value);
                if (selectedSubCategory.value) {
                    filtered = filtered.filter(comment => comment.subCategory === selectedSubCategory.value);
                }
            }
            return filtered;
        });
        const totalComments = computed(() => comments.value.length);
        const currentCategoryComments = computed(() => {
            let filtered = comments.value;
            if (selectedMainCategory.value) {
                filtered = filtered.filter(comment => comment.mainCategory === selectedMainCategory.value);
                if (selectedSubCategory.value) {
                    filtered = filtered.filter(comment => comment.subCategory === selectedSubCategory.value);
                }
            }
            return filtered.length;
        });
        const currentCategoryDisplay = computed(() => {
            if (!selectedMainCategory.value)
                return 'todas las categorías';
            const mainCatName = mainCategories.find(c => c.id === selectedMainCategory.value)?.name;
            if (!selectedSubCategory.value)
                return mainCatName;
            const subCatName = subCategories.find(c => c.id === selectedSubCategory.value)?.name;
            return `${mainCatName} - ${subCatName}`;
        });
        // Métodos
        const selectMainCategory = (category) => {
            selectedMainCategory.value = category;
            selectedSubCategory.value = ''; // Reset subcategory when main category changes
        };
        const selectSubCategory = (category) => {
            selectedSubCategory.value = category;
        };
        const getCategoryName = (categoryId, isMain) => {
            const categories = isMain ? mainCategories : subCategories;
            return categories.find(c => c.id === categoryId)?.name || categoryId;
        };
        const loadComments = () => {
            const savedComments = localStorage.getItem('comments');
            if (savedComments) {
                comments.value = JSON.parse(savedComments);
            }
        };
        const saveComments = () => {
            localStorage.setItem('comments', JSON.stringify(comments.value));
        };
        const confirmDelete = (commentId, parentId) => {
            commentToDelete.value = commentId;
            parentCommentId.value = parentId;
            showDeleteModal.value = true;
        };
        const deleteComment = () => {
            if (!commentToDelete.value)
                return;
            if (parentCommentId.value) {
                comments.value = comments.value.filter(c => c.id !== commentToDelete.value);
            }
            else {
                comments.value = comments.value.filter(c => c.id !== commentToDelete.value && c.parentId !== commentToDelete.value);
            }
            saveComments();
            showDeleteModal.value = false;
            commentToDelete.value = null;
            parentCommentId.value = null;
        };
        const cancelDelete = () => {
            showDeleteModal.value = false;
            commentToDelete.value = null;
            parentCommentId.value = null;
        };
        const getChildComments = (parentId) => {
            return comments.value.filter(comment => comment.parentId === parentId);
        };
        const formatDate = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };
        const isReply = computed(() => !!parentCommentId.value);
        onMounted(() => {
            loadComments();
            setInterval(loadComments, 30000);
        });
        return {
            mainCategories,
            subCategories,
            selectedMainCategory,
            selectedSubCategory,
            availableSubCategories,
            filteredRootComments,
            totalComments,
            currentCategoryComments,
            currentCategoryDisplay,
            selectMainCategory,
            selectSubCategory,
            getCategoryName,
            getChildComments,
            formatDate,
            confirmDelete,
            deleteComment,
            cancelDelete,
            showDeleteModal,
            isReply
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("display-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("category-filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("main-category-filters") }, });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.mainCategories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.selectMainCategory(category.id);
                } }, key: ((category.id)), ...{ class: ((['category-button', { active: __VLS_ctx.selectedMainCategory === category.id }])) }, });
        (category.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectMainCategory('');
            } }, ...{ class: ((['category-button', { active: __VLS_ctx.selectedMainCategory === '' }])) }, });
    if (__VLS_ctx.selectedMainCategory) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sub-category-filters") }, });
        for (const [category] of __VLS_getVForSourceType((__VLS_ctx.availableSubCategories))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.selectedMainCategory)))
                            return;
                        __VLS_ctx.selectSubCategory(category.id);
                    } }, key: ((category.id)), ...{ class: ((['sub-category-button', { active: __VLS_ctx.selectedSubCategory === category.id }])) }, });
            (category.name);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.selectedMainCategory)))
                        return;
                    __VLS_ctx.selectSubCategory('');
                } }, ...{ class: ((['sub-category-button', { active: __VLS_ctx.selectedSubCategory === '' }])) }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stats-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.totalComments);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.currentCategoryDisplay);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.currentCategoryComments);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comments-grid") }, });
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.filteredRootComments))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((comment.id)), ...{ class: ("comment-card") }, ...{ class: (([comment.mainCategory, comment.subCategory])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
        (comment.username);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-header-right") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("main-category-badge") }, });
        (__VLS_ctx.getCategoryName(comment.mainCategory, true));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("sub-category-badge") }, });
        (__VLS_ctx.getCategoryName(comment.subCategory, false));
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.confirmDelete(comment.id, null);
                } }, ...{ class: ("delete-button") }, title: ("Eliminar comentario"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("comment-text") }, });
        (comment.content);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-footer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        (__VLS_ctx.formatDate(comment.timestamp));
        if (__VLS_ctx.getChildComments(comment.id).length > 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("replies-section") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({ ...{ class: ("replies-title") }, });
            for (const [reply] of __VLS_getVForSourceType((__VLS_ctx.getChildComments(comment.id)))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((reply.id)), ...{ class: ("reply-card") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("reply-header") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h6, __VLS_intrinsicElements.h6)({});
                (reply.username);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("reply-header-right") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("main-category-badge-small") }, });
                (__VLS_ctx.getCategoryName(reply.mainCategory, true));
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("sub-category-badge-small") }, });
                (__VLS_ctx.getCategoryName(reply.subCategory, false));
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.getChildComments(comment.id).length > 0)))
                                return;
                            __VLS_ctx.confirmDelete(reply.id, comment.id);
                        } }, ...{ class: ("delete-button-small") }, title: ("Eliminar respuesta"), });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("reply-text") }, });
                (reply.content);
                __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({ ...{ class: ("reply-date") }, });
                (__VLS_ctx.formatDate(reply.timestamp));
            }
        }
    }
    if (__VLS_ctx.showDeleteModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-overlay") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.isReply ? 'respuesta' : 'comentario');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-buttons") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.deleteComment) }, ...{ class: ("confirm-delete-button") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.cancelDelete) }, ...{ class: ("cancel-button") }, });
    }
    __VLS_styleScopedClasses['display-container'];
    __VLS_styleScopedClasses['category-filters'];
    __VLS_styleScopedClasses['main-category-filters'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['category-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['category-button'];
    __VLS_styleScopedClasses['sub-category-filters'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['sub-category-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['sub-category-button'];
    __VLS_styleScopedClasses['stats-section'];
    __VLS_styleScopedClasses['stat-card'];
    __VLS_styleScopedClasses['stat-card'];
    __VLS_styleScopedClasses['comments-grid'];
    __VLS_styleScopedClasses['comment-card'];
    __VLS_styleScopedClasses['comment-header'];
    __VLS_styleScopedClasses['comment-header-right'];
    __VLS_styleScopedClasses['main-category-badge'];
    __VLS_styleScopedClasses['sub-category-badge'];
    __VLS_styleScopedClasses['delete-button'];
    __VLS_styleScopedClasses['comment-text'];
    __VLS_styleScopedClasses['comment-footer'];
    __VLS_styleScopedClasses['replies-section'];
    __VLS_styleScopedClasses['replies-title'];
    __VLS_styleScopedClasses['reply-card'];
    __VLS_styleScopedClasses['reply-header'];
    __VLS_styleScopedClasses['reply-header-right'];
    __VLS_styleScopedClasses['main-category-badge-small'];
    __VLS_styleScopedClasses['sub-category-badge-small'];
    __VLS_styleScopedClasses['delete-button-small'];
    __VLS_styleScopedClasses['reply-text'];
    __VLS_styleScopedClasses['reply-date'];
    __VLS_styleScopedClasses['modal-overlay'];
    __VLS_styleScopedClasses['modal-content'];
    __VLS_styleScopedClasses['modal-buttons'];
    __VLS_styleScopedClasses['confirm-delete-button'];
    __VLS_styleScopedClasses['cancel-button'];
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
