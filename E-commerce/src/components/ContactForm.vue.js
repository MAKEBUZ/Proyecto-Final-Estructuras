import { defineComponent, ref } from 'vue';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Github, Send, User, MessageSquare } from 'lucide-vue-next';
export default defineComponent({
    name: 'ContactForm',
    components: {
        MapPin,
        Phone,
        Mail,
        Facebook,
        Instagram,
        Linkedin,
        Github,
        Send,
        User,
        MessageSquare
    },
    setup() {
        const form = ref({
            name: '',
            email: '',
            message: ''
        });
        const saveContact = () => {
            const newContact = {
                id: crypto.randomUUID(),
                name: form.value.name,
                email: form.value.email,
                message: form.value.message,
                date: new Date().toISOString()
            };
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(newContact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            form.value.name = '';
            form.value.email = '';
            form.value.message = '';
            alert('Mensaje enviado correctamente');
        };
        return {
            form,
            saveContact
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            MapPin,
            Phone,
            Mail,
            Facebook,
            Instagram,
            Linkedin,
            Github,
            Send,
            User,
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
    __VLS_styleScopedClasses['form-card'];
    __VLS_styleScopedClasses['info-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['form-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['info-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['submit-btn'];
    __VLS_styleScopedClasses['submit-btn'];
    __VLS_styleScopedClasses['info-item'];
    __VLS_styleScopedClasses['social-link'];
    __VLS_styleScopedClasses['contact-wrapper'];
    __VLS_styleScopedClasses['form-card'];
    __VLS_styleScopedClasses['info-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['social-links'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.saveContact) }, ...{ class: ("contact-form") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.User;
    /** @type { [typeof __VLS_components.User, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("input-icon") }, size: ((18)), }));
    const __VLS_2 = __VLS_1({ ...{ class: ("input-icon") }, size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.form.name)), required: (true), ...{ class: ("input-field") }, placeholder: ("Tu nombre"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Mail;
    /** @type { [typeof __VLS_components.Mail, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("input-icon") }, size: ((18)), }));
    const __VLS_8 = __VLS_7({ ...{ class: ("input-icon") }, size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), required: (true), ...{ class: ("input-field") }, placeholder: ("tu@email.com"), });
    (__VLS_ctx.form.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.MessageSquare;
    /** @type { [typeof __VLS_components.MessageSquare, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: ("input-icon") }, size: ((18)), }));
    const __VLS_14 = __VLS_13({ ...{ class: ("input-icon") }, size: ((18)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.form.message)), required: (true), ...{ class: ("input-field message-field") }, placeholder: ("Escribe tu mensaje aquí..."), rows: ("4"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("submit-btn") }, });
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.Send;
    /** @type { [typeof __VLS_components.Send, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("icon") }, size: ((20)), }));
    const __VLS_20 = __VLS_19({ ...{ class: ("icon") }, size: ((20)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.MapPin;
    /** @type { [typeof __VLS_components.MapPin, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ class: ("icon") }, }));
    const __VLS_26 = __VLS_25({ ...{ class: ("icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.Phone;
    /** @type { [typeof __VLS_components.Phone, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("icon") }, }));
    const __VLS_32 = __VLS_31({ ...{ class: ("icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.Mail;
    /** @type { [typeof __VLS_components.Mail, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("icon") }, }));
    const __VLS_38 = __VLS_37({ ...{ class: ("icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("social-links") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://facebook.com"), target: ("_blank"), ...{ class: ("social-link") }, });
    const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Facebook;
    /** @type { [typeof __VLS_components.Facebook, ] } */
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("social-icon") }, }));
    const __VLS_44 = __VLS_43({ ...{ class: ("social-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://instagram.com"), target: ("_blank"), ...{ class: ("social-link") }, });
    const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.Instagram;
    /** @type { [typeof __VLS_components.Instagram, ] } */
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("social-icon") }, }));
    const __VLS_50 = __VLS_49({ ...{ class: ("social-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://linkedin.com"), target: ("_blank"), ...{ class: ("social-link") }, });
    const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.Linkedin;
    /** @type { [typeof __VLS_components.Linkedin, ] } */
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("social-icon") }, }));
    const __VLS_56 = __VLS_55({ ...{ class: ("social-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://github.com"), target: ("_blank"), ...{ class: ("social-link") }, });
    const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.Github;
    /** @type { [typeof __VLS_components.Github, ] } */
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{ class: ("social-icon") }, }));
    const __VLS_62 = __VLS_61({ ...{ class: ("social-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_styleScopedClasses['contact-wrapper'];
    __VLS_styleScopedClasses['contact-container'];
    __VLS_styleScopedClasses['form-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['contact-form'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-icon'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-icon'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-icon'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['message-field'];
    __VLS_styleScopedClasses['submit-btn'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['info-card'];
    __VLS_styleScopedClasses['title'];
    __VLS_styleScopedClasses['contact-info'];
    __VLS_styleScopedClasses['info-item'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['info-item'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['info-item'];
    __VLS_styleScopedClasses['icon'];
    __VLS_styleScopedClasses['social-links'];
    __VLS_styleScopedClasses['social-link'];
    __VLS_styleScopedClasses['social-icon'];
    __VLS_styleScopedClasses['social-link'];
    __VLS_styleScopedClasses['social-icon'];
    __VLS_styleScopedClasses['social-link'];
    __VLS_styleScopedClasses['social-icon'];
    __VLS_styleScopedClasses['social-link'];
    __VLS_styleScopedClasses['social-icon'];
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
