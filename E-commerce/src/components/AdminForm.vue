<script lang="ts">
import { defineComponent, ref } from 'vue';
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

        const handleLogin = async () => {
            error.value = '';
            if (!username.value || !password.value) {
                error.value = 'Por favor complete todos los campos';
                return;
            }

            const success = await store.dispatch('login', {
                username: username.value,
                password: password.value
            });

            if (success) {
                router.push('/admin/manager');
            } else {
                error.value = 'Credenciales inválidas';
            }
        };

        return {
            username,
            password,
            error,
            handleLogin
        };
    }
});
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Admin Login</h2>
            
            <div class="form-group">
                <label for="username">Usuario:</label>
                <input 
                    id="username"
                    v-model="username"
                    type="text"
                    class="form-input"
                    placeholder="Ingrese su usuario"
                />
            </div>

            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input 
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-input"
                    placeholder="Ingrese su contraseña"
                />
            </div>

            <p v-if="error" class="error-message">{{ error }}</p>

            <button type="submit" class="login-button">
                Ingresar
            </button>
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
    background-color: #f5f5f5;
}

.login-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 0.5rem;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #BE8151;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #a36b3f;
}

.error-message {
    color: #dc3545;
    margin-bottom: 1rem;
    font-size: 0.875rem;
}
</style>