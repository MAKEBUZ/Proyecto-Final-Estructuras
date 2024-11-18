import { defineComponent, ref, computed, onMounted } from 'vue';
import { Trash2, Inbox, MessageSquare } from 'lucide-vue-next';
export default defineComponent({
    name: 'ContactQueue',
    components: {
        Trash2,
        Inbox,
        MessageSquare
    },
    setup() {
        const contacts = ref([]);
        const selectedContact = ref(null);
        const deletingId = ref(null);
        const searchTerm = ref('');
        const filterStatus = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = 5;
        const loadContacts = () => {
            contacts.value = JSON.parse(localStorage.getItem('contacts') || '[]');
        };
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        const filteredContacts = computed(() => {
            let filtered = contacts.value;
            // Aplicar búsqueda
            if (searchTerm.value) {
                const search = searchTerm.value.toLowerCase();
                filtered = filtered.filter(contact => contact.name.toLowerCase().includes(search) ||
                    contact.email.toLowerCase().includes(search) ||
                    contact.message.toLowerCase().includes(search));
            }
            // Aplicar filtro de estado
            if (filterStatus.value !== 'all') {
                filtered = filtered.filter(contact => filterStatus.value === 'unread' ? !contact.read : contact.read);
            }
            // Aplicar paginación
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filtered.slice(start, end);
        });
        const totalPages = computed(() => Math.ceil(contacts.value.length / itemsPerPage));
        const deleteContact = async (id) => {
            deletingId.value = id;
            await new Promise(resolve => setTimeout(resolve, 500));
            contacts.value = contacts.value.filter(contact => contact.id !== id);
            localStorage.setItem('contacts', JSON.stringify(contacts.value));
            if (selectedContact.value?.id === id) {
                selectedContact.value = null;
            }
            deletingId.value = null;
        };
        const viewMessage = (contact) => {
            selectedContact.value = contact;
            if (!contact.read) {
                markAsRead(contact);
            }
        };
        const markAsRead = (contact) => {
            contact.read = true;
            localStorage.setItem('contacts', JSON.stringify(contacts.value));
        };
        // Cargar contactos al montar el componente
        onMounted(() => {
            loadContacts();
        });
        return {
            contacts,
            deleteContact,
            selectedContact,
            viewMessage,
            deletingId,
            searchTerm,
            filterStatus,
            currentPage,
            filteredContacts,
            totalPages,
            formatDate,
            markAsRead
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            Trash2,
            Inbox,
            MessageSquare
        },
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
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['action-btn'];
    __VLS_styleScopedClasses['delete-btn'];
    __VLS_styleScopedClasses['delete-btn'];
    __VLS_styleScopedClasses['preview-header'];
    __VLS_styleScopedClasses['reply-btn'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['queue-container'];
    __VLS_styleScopedClasses['queue-content'];
    __VLS_styleScopedClasses['filters'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['preview-header'];
    __VLS_styleScopedClasses['queue-container'];
    __VLS_styleScopedClasses['queue-list'];
    __VLS_styleScopedClasses['message-preview'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['message-content'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['filter-select'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['preview-header'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['delete-btn'];
    __VLS_styleScopedClasses['deleting'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['contact-actions'];
    __VLS_styleScopedClasses['contact-actions'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['filter-select'];
    __VLS_styleScopedClasses['reply-btn'];
    __VLS_styleScopedClasses['action-btn'];
    __VLS_styleScopedClasses['delete-btn'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("queue-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("title") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Inbox;
    /** @type { [typeof __VLS_components.Inbox, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("icon") }, }));
    const __VLS_2 = __VLS_1({ ...{ class: ("icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("search-input") }, placeholder: ("Buscar mensajes..."), value: ((__VLS_ctx.searchTerm)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.filterStatus)), ...{ class: ("filter-select") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("all"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("unread"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("read"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("queue-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("queue-list") }, });
    if (__VLS_ctx.filteredContacts.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-state") }, });
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Inbox;
        /** @type { [typeof __VLS_components.Inbox, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ size: ((48)), ...{ class: ("empty-icon") }, }));
        const __VLS_8 = __VLS_7({ size: ((48)), ...{ class: ("empty-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.TransitionGroup;
    /** @type { [typeof __VLS_components.TransitionGroup, typeof __VLS_components.TransitionGroup, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ name: ("list"), }));
    const __VLS_14 = __VLS_13({ name: ("list"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    for (const [contact] of __VLS_getVForSourceType((__VLS_ctx.filteredContacts))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.viewMessage(contact);
                } }, key: ((contact.id)), ...{ class: ("contact-item") }, ...{ class: (({
                    'selected': __VLS_ctx.selectedContact?.id === contact.id,
                    'deleting': __VLS_ctx.deletingId === contact.id,
                    'unread': !contact.read
                })) }, });
        if (!contact.read) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("notification-dot") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (contact.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (contact.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        (__VLS_ctx.formatDate(contact.date));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-actions") }, });
        if (!contact.read) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((!contact.read)))
                            return;
                        __VLS_ctx.markAsRead(contact);
                    } }, ...{ class: ("action-btn") }, title: ("Marcar como leído"), });
            const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.MessageSquare;
            /** @type { [typeof __VLS_components.MessageSquare, ] } */
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ size: ((18)), }));
            const __VLS_20 = __VLS_19({ size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.deleteContact(contact.id);
                } }, ...{ class: ("delete-btn") }, ...{ class: (({ 'deleting': __VLS_ctx.deletingId === contact.id })) }, title: ("Eliminar mensaje"), });
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Trash2;
        /** @type { [typeof __VLS_components.Trash2, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ size: ((18)), }));
        const __VLS_26 = __VLS_25({ size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ name: ("fade"), }));
    const __VLS_32 = __VLS_31({ name: ("fade"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    if (__VLS_ctx.selectedContact) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("message-preview") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("preview-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.selectedContact.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("date") }, });
        (__VLS_ctx.formatDate(__VLS_ctx.selectedContact.date));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("message-content") }, });
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.MessageSquare;
        /** @type { [typeof __VLS_components.MessageSquare, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("message-icon") }, }));
        const __VLS_38 = __VLS_37({ ...{ class: ("message-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        (__VLS_ctx.selectedContact.message);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("preview-actions") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("reply-btn") }, });
        const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.MessageSquare;
        /** @type { [typeof __VLS_components.MessageSquare, ] } */
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ size: ((18)), }));
        const __VLS_44 = __VLS_43({ size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    }
    __VLS_nonNullable(__VLS_35.slots).default;
    var __VLS_35;
    if (__VLS_ctx.totalPages > 1) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("pagination") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.totalPages > 1)))
                        return;
                    __VLS_ctx.currentPage--;
                } }, ...{ class: ("page-button") }, disabled: ((__VLS_ctx.currentPage === 1)), });
        for (const [page] of __VLS_getVForSourceType((__VLS_ctx.totalPages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.totalPages > 1)))
                            return;
                        __VLS_ctx.currentPage = page;
                    } }, key: ((page)), ...{ class: ("page-button") }, ...{ class: (({ active: __VLS_ctx.currentPage === page })) }, });
            (page);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.totalPages > 1)))
                        return;
                    __VLS_ctx.currentPage++;
                } }, ...{ class: ("page-button") }, disabled: ((__VLS_ctx.currentPage === __VLS_ctx.totalPages)), });
    }
    __VLS_styleScopedClasses['queue-container'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['filters'];
    __VLS_styleScopedClasses['search-input'];
    __VLS_styleScopedClasses['filter-select'];
    __VLS_styleScopedClasses['queue-content'];
    __VLS_styleScopedClasses['queue-list'];
    __VLS_styleScopedClasses['empty-state'];
    __VLS_styleScopedClasses['empty-icon'];
    __VLS_styleScopedClasses['contact-item'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['deleting'];
    __VLS_styleScopedClasses['unread'];
    __VLS_styleScopedClasses['notification-dot'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['contact-actions'];
    __VLS_styleScopedClasses['action-btn'];
    __VLS_styleScopedClasses['delete-btn'];
    __VLS_styleScopedClasses['deleting'];
    __VLS_styleScopedClasses['message-preview'];
    __VLS_styleScopedClasses['preview-header'];
    __VLS_styleScopedClasses['date'];
    __VLS_styleScopedClasses['message-content'];
    __VLS_styleScopedClasses['message-icon'];
    __VLS_styleScopedClasses['preview-actions'];
    __VLS_styleScopedClasses['reply-btn'];
    __VLS_styleScopedClasses['pagination'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['page-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['page-button'];
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
