<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginForm',
    setup() {
        const store = useStore();
        const router = useRouter();

        const username = ref('');
        const password = ref('');
        const error = ref('');
        const isLoading = ref(false);
        const showPassword = ref(false);
        const formMounted = ref(false);

        const handleLogin = async () => {
            if (isLoading.value) return;

            error.value = '';
            if (!username.value || !password.value) {
                error.value = 'Por favor complete todos los campos';
                return;
            }

            isLoading.value = true;

            try {
                const success = await store.dispatch('login', {
                    username: username.value.trim(),
                    password: password.value,
                });

                if (success) {
                    router.push('/admin');
                } else {
                    error.value = 'Credenciales inválidas';
                    const form = document.querySelector('.login-form');
                    form?.classList.add('shake');
                    setTimeout(() => {
                        form?.classList.remove('shake');
                    }, 500);
                }
            } catch (e) {
                error.value = 'Error de conexión. Por favor intente más tarde.';
                console.error('Error durante el login:', e);
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {
            formMounted.value = true;
            store.dispatch('initializeAuth');
        });

        return {
            username,
            password,
            error,
            isLoading,
            showPassword,
            formMounted,
            handleLogin,
            togglePassword: () => {
                showPassword.value = !showPassword.value;
            },
        };
    },
});
</script>


<template>
    <div class="login-container">
        <form 
            @submit.prevent="handleLogin" 
            class="login-form"
            :class="{ 'mounted': formMounted }"
        >
            <div class="form-header">
                <h2>Panel Administrativo</h2>
                <p>Ingresa tus credenciales para continuar</p>
            </div>

            <div class="form-group">
                <label for="username">Usuario:</label>
                <div class="input-wrapper">
                    <input 
                        id="username"
                        v-model="username"
                        type="text"
                        class="form-input"
                        :class="{ 'has-error': error }"
                        placeholder="Ingrese su usuario"
                        autocomplete="username"
                    />
                    <span class="input-icon">👤</span>
                </div>
            </div>

            <div class="form-group">
                <label for="password">Contraseña:</label>
                <div class="input-wrapper">
                    <input 
                        id="password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-input"
                        :class="{ 'has-error': error }"
                        placeholder="Ingrese su contraseña"
                        autocomplete="current-password"
                    />
                    <button 
                        type="button"
                        class="toggle-password"
                        @click="togglePassword"
                    >
                        {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                    </button>
                </div>
            </div>

            <transition name="fade">
                <p v-if="error" class="error-message">
                ❌ {{ error }}
                </p>
            </transition>
            
            <button 
                type="submit" 
                class="login-button"
                :disabled="isLoading"
            >
                <span v-if="!isLoading">Ingresar</span>
                <span v-else class="loader"></span>
            </button>

            <<div class="demo-credentials">
                <p>Credenciales de prueba:</p>
                <code>usuario: admin6618 | contraseña: admin*277353</code>
            </div>

        </form>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #f4ece0 0%, #be8151 100%);
}

.login-form {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 420px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
}

.login-form.mounted {
    opacity: 1;
    transform: translateY(0);
}

.form-header {
    text-align: center;
    margin-bottom: 2rem;
}

.form-header h2 {
    color: #333;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: #666;
    font-size: 0.9rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.input-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-input:focus {
    border-color: #BE8151;
    box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.2);
    outline: none;
}

.form-input.has-error {
    border-color: #dc3545;
    animation: shake 0.5s;
}

.input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
}

.login-button {
    width: 100%;
    padding: 0.875rem;
    background-color: #BE8151;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.login-button:hover:not(:disabled) {
    background-color: #a36b3f;
    transform: translateY(-1px);
}

.login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.error-message {
    color: #dc3545;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: rgba(220, 53, 69, 0.1);
}

.demo-credentials {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.8rem;
    color: #666;
}

.demo-credentials code {
    display: block;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;
}

/* Animaciones */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.loader {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
    .login-form {
        padding: 1.5rem;
    }

    .form-header h2 {
        font-size: 1.5rem;
    }
}
</style>