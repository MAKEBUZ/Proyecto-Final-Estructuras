import { defineComponent, ref, computed } from 'vue';
class CommentGraph {
    CommentNodes = new Map();
    addComment(comment) {
        const CommentNode = { id: comment.id, comment, children: [] };
        this.CommentNodes.set(comment.id, CommentNode);
        if (comment.parentId) {
            const parent = this.CommentNodes.get(comment.parentId);
            parent?.children.push(CommentNode);
        }
    }
    getRootCommentNodes() {
        return Array.from(this.CommentNodes.values()).filter(CommentNode => !CommentNode.comment.parentId);
    }
    getChildCommentNodes(parentId) {
        const parent = this.CommentNodes.get(parentId);
        return parent ? parent.children : [];
    }
}
export default defineComponent({
    name: 'CommentGraph',
    setup() {
        const mainCategories = [
            { id: 'hombres', name: 'Hombres' },
            { id: 'mujeres', name: 'Mujeres' },
            { id: 'ninos', name: 'Niños' },
            { id: 'unisex', name: 'Unisex' }
        ];
        const categorySubcategories = {
            hombres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            mujeres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            ninos: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
            unisex: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias']
        };
        const subCategories = [
            { id: 'moda', name: 'Moda' },
            { id: 'colecciones', name: 'Colecciones' },
            { id: 'ofertas', name: 'Ofertas' },
            { id: 'preguntas', name: 'Preguntas' },
            { id: 'sugerencias', name: 'Sugerencias' }
        ];
        const commentsGraph = new CommentGraph();
        const comments = ref([]);
        const selectedMainCategory = ref('');
        const selectedSubCategory = ref('');
        const newComment = ref({
            username: '',
            content: '',
            parentId: null,
            mainCategory: '',
            subCategory: ''
        });
        const getSubCategories = computed(() => {
            if (!newComment.value.mainCategory)
                return [];
            return subCategories.filter(subCat => categorySubcategories[newComment.value.mainCategory]?.includes(subCat.id));
        });
        const filteredComments = computed(() => {
            return commentsGraph
                .getRootCommentNodes()
                .filter(CommentNode => {
                const { mainCategory, subCategory } = CommentNode.comment;
                return ((!selectedMainCategory.value || mainCategory === selectedMainCategory.value) &&
                    (!selectedSubCategory.value || subCategory === selectedSubCategory.value));
            });
        });
        const addComment = () => {
            if (!newComment.value.username ||
                !newComment.value.content ||
                !newComment.value.mainCategory ||
                !newComment.value.subCategory) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }
            const comment = {
                id: Date.now().toString(),
                username: newComment.value.username,
                content: newComment.value.content,
                timestamp: Date.now(),
                parentId: newComment.value.parentId || null,
                mainCategory: newComment.value.mainCategory,
                subCategory: newComment.value.subCategory
            };
            commentsGraph.addComment(comment);
            comments.value.push(comment);
            saveComments();
            resetForm();
        };
        const getChildComments = (parentId) => {
            return commentsGraph.getChildCommentNodes(parentId).map(CommentNode => CommentNode.comment);
        };
        const showReplyForm = (parentComment) => {
            newComment.value = {
                username: '',
                content: '',
                parentId: parentComment.id,
                mainCategory: parentComment.mainCategory,
                subCategory: parentComment.subCategory
            };
        };
        const resetForm = () => {
            newComment.value = {
                username: '',
                content: '',
                parentId: null,
                mainCategory: '',
                subCategory: ''
            };
        };
        const loadComments = () => {
            const savedComments = localStorage.getItem('comments');
            if (savedComments) {
                const loadedComments = JSON.parse(savedComments);
                loadedComments.forEach(comment => commentsGraph.addComment(comment));
                comments.value = loadedComments;
            }
        };
        const saveComments = () => {
            localStorage.setItem('comments', JSON.stringify(comments.value));
        };
        const formatDate = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };
        loadComments();
        return {
            mainCategories,
            subCategories,
            comments,
            newComment,
            selectedMainCategory,
            selectedSubCategory,
            getSubCategories,
            filteredComments,
            addComment,
            getChildComments,
            showReplyForm,
            resetForm,
            formatDate
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
    __VLS_styleScopedClasses['textarea-field'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['reply-button'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['cancel-reply-button'];
    __VLS_styleScopedClasses['comment-CommentNode'];
    __VLS_styleScopedClasses['comment-form'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['textarea-field'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['reply-button'];
    __VLS_styleScopedClasses['cancel-reply-button'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['comments-graph'];
    __VLS_styleScopedClasses['comments-graph'];
    __VLS_styleScopedClasses['comments-graph'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['reply-button'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['textarea-field'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['reply-button'];
    __VLS_styleScopedClasses['cancel-reply-button'];
    __VLS_styleScopedClasses['filter-group'];
    __VLS_styleScopedClasses['comment-container'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['category-tags'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['nested-comments'];
    __VLS_styleScopedClasses['page-wrapper'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("page-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-form") }, ...{ class: (({ 'replying': __VLS_ctx.newComment.parentId })) }, });
    if (__VLS_ctx.newComment.parentId) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("reply-indicator") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.resetForm) }, ...{ class: ("cancel-reply-button") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Tu nombre"), ...{ class: ("input-field") }, });
    (__VLS_ctx.newComment.username);
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.newComment.mainCategory)), ...{ class: ("select-field") }, disabled: ((!!__VLS_ctx.newComment.parentId)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.mainCategories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((category.id)), value: ((category.id)), });
        (category.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.newComment.subCategory)), ...{ class: ("select-field") }, disabled: ((!__VLS_ctx.newComment.mainCategory || !!__VLS_ctx.newComment.parentId)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.getSubCategories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((category.id)), value: ((category.id)), });
        (category.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.newComment.content)), placeholder: ("Escribe tu comentario..."), ...{ class: ("textarea-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.addComment) }, ...{ class: ("submit-button") }, disabled: ((!__VLS_ctx.newComment.mainCategory || !__VLS_ctx.newComment.subCategory)), });
    (__VLS_ctx.newComment.parentId ? 'Responder' : 'Publicar comentario');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filter-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filter-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.selectedMainCategory)), ...{ class: ("select-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.mainCategories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((category.id)), value: ((category.id)), });
        (category.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.selectedSubCategory)), ...{ class: ("select-field") }, disabled: ((!__VLS_ctx.selectedMainCategory)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.getSubCategories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((category.id)), value: ((category.id)), });
        (category.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comments-graph") }, });
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.filteredComments))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((comment.id)), ...{ class: ("comment-CommentNode") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("category-tags") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("category-tag main-category") }, ...{ class: ((comment.comment.mainCategory)) }, });
        (__VLS_ctx.mainCategories.find(c => c.id === comment.comment.mainCategory)?.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("category-tag sub-category") }, ...{ class: ((comment.comment.subCategory)) }, });
        (__VLS_ctx.subCategories.find(c => c.id === comment.comment.subCategory)?.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
        (comment.comment.username);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (comment.comment.content);
        __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        (__VLS_ctx.formatDate(comment.comment.timestamp));
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.showReplyForm(comment.comment);
                } }, ...{ class: ("reply-button") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("nested-comments") }, });
        for (const [childComment] of __VLS_getVForSourceType((__VLS_ctx.getChildComments(comment.id)))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((childComment.id)), ...{ class: ("comment-CommentNode child") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("category-tags") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("category-tag main-category") }, ...{ class: ((childComment.mainCategory)) }, });
            (__VLS_ctx.mainCategories.find(c => c.id === childComment.mainCategory)?.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("category-tag sub-category") }, ...{ class: ((childComment.subCategory)) }, });
            (__VLS_ctx.subCategories.find(c => c.id === childComment.subCategory)?.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
            (childComment.username);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (childComment.content);
            __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
            (__VLS_ctx.formatDate(childComment.timestamp));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        __VLS_ctx.showReplyForm(childComment);
                    } }, ...{ class: ("reply-button") }, });
        }
    }
    __VLS_styleScopedClasses['page-wrapper'];
    __VLS_styleScopedClasses['comment-container'];
    __VLS_styleScopedClasses['comment-form'];
    __VLS_styleScopedClasses['replying'];
    __VLS_styleScopedClasses['reply-indicator'];
    __VLS_styleScopedClasses['cancel-reply-button'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['textarea-field'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['filter-section'];
    __VLS_styleScopedClasses['filter-group'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['select-field'];
    __VLS_styleScopedClasses['comments-graph'];
    __VLS_styleScopedClasses['comment-CommentNode'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['category-tags'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['reply-button'];
    __VLS_styleScopedClasses['nested-comments'];
    __VLS_styleScopedClasses['comment-CommentNode'];
    __VLS_styleScopedClasses['child'];
    __VLS_styleScopedClasses['comment-content'];
    __VLS_styleScopedClasses['category-tags'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['main-category'];
    __VLS_styleScopedClasses['category-tag'];
    __VLS_styleScopedClasses['sub-category'];
    __VLS_styleScopedClasses['reply-button'];
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
