import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'LoginForm',
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');
        const showError = ref(false);
        const isLoading = ref(false);
        const errorMessage = ref('');
        const generateSessionToken = (username) => {
            const timestamp = Date.now();
            return btoa(`${username}_${timestamp}`);
        };
        const emitLoginEvent = () => {
            const event = new CustomEvent('login-status-changed', {
                detail: { status: 'logged-in' }
            });
            window.dispatchEvent(event);
        };
        const login = async () => {
            try {
                isLoading.value = true;
                errorMessage.value = '';
                if (username.value === 'admin6618' && password.value === '277353') {
                    const sessionToken = generateSessionToken(username.value);
                    localStorage.setItem('session', JSON.stringify({
                        username: username.value,
                        token: sessionToken,
                        role: 'admin'
                    }));
                    emitLoginEvent();
                    router.push('/admin/manager');
                }
                else {
                    errorMessage.value = 'Credenciales inválidas';
                    showError.value = true;
                    setTimeout(() => {
                        showError.value = false;
                    }, 3000);
                }
            }
            catch (error) {
                errorMessage.value = 'Error al iniciar sesión';
                console.error(error);
            }
            finally {
                isLoading.value = false;
            }
        };
        onMounted(() => {
            const session = localStorage.getItem('session');
            if (session) {
                router.push('/admin/manager');
            }
        });
        return {
            username,
            password,
            login,
            showError,
            isLoading,
            errorMessage,
        };
    },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("login-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("background-animation") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.login) }, ...{ class: ("login-form") }, ...{ class: (({ 'shake': __VLS_ctx.showError })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.username)), placeholder: ("Usuario"), ...{ class: (({ 'error': __VLS_ctx.showError })) }, required: (true), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), placeholder: ("Contraseña"), ...{ class: (({ 'error': __VLS_ctx.showError })) }, required: (true), });
    (__VLS_ctx.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), disabled: ((__VLS_ctx.isLoading)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("button-content") }, });
    (__VLS_ctx.isLoading ? 'Cargando...' : 'Ingresar');
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ name: ("fade"), }));
    const __VLS_2 = __VLS_1({ name: ("fade"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    if (__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("error-message") }, });
        (__VLS_ctx.errorMessage);
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_styleScopedClasses['login-container'];
    __VLS_styleScopedClasses['background-animation'];
    __VLS_styleScopedClasses['login-form'];
    __VLS_styleScopedClasses['shake'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['error'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['error'];
    __VLS_styleScopedClasses['button-content'];
    __VLS_styleScopedClasses['error-message'];
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
