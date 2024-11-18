<script lang="ts">
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

    const generateSessionToken = (username: string): string => {
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
        } else {
          errorMessage.value = 'Credenciales inválidas';
          showError.value = true;
          setTimeout(() => {
            showError.value = false;
          }, 3000);
        }
      } catch (error) {
        errorMessage.value = 'Error al iniciar sesión';
        console.error(error);
      } finally {
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
</script>

<template>
  <div class="login-container">
    <div class="background-animation"></div>
    <form @submit.prevent="login" class="login-form" :class="{ 'shake': showError }">
      <h2>Iniciar Sesión</h2>
      
      <div class="form-group">
        <input
          type="text"
          v-model="username"
          placeholder="Usuario"
          :class="{ 'error': showError }"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :class="{ 'error': showError }"
          required
        />
      </div>

      <button type="submit" :disabled="isLoading">
        <span class="button-content">
          {{ isLoading ? 'Cargando...' : 'Ingresar' }}
        </span>
      </button>

      <transition name="fade">
        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>
      </transition>
    </form>
  </div>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-container {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F4ECE0;
  position: relative;
  overflow: hidden;
  padding: 1rem;
}

.background-animation {
  position: fixed;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(45deg, #e8d6c0, #d9bb98, #BE8151);
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
  z-index: 1;
  transform: scale(1.5);
}

.login-form {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(190, 129, 81, 0.15);
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.login-form:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(190, 129, 81, 0.2);
}

h2 {
  color: #5d554d;
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.form-group {
  margin-bottom: 1.75rem;
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e8d6c0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: text !important; 
  display: block; /* Ensure input is block */
  box-sizing: border-box; 
}

input:hover {
  border-color: #d9bb98;
}

input:focus {
  outline: none;
  border-color: #BE8151;
  box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.15);
  background-color: white;
}

input.error {
  border-color: #ff4444;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

button {
  width: 100%;
  padding: 0.875rem;
  background-color: #BE8151;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  display: block; 
  box-sizing: border-box;/* Include padding and border in the width */
}

.button-content {
  position: relative;
  z-index: 1;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transition: transform 0.5s ease;
}

button:hover:not(:disabled) {
  background-color: #B06D46;
  transform: translateY(-1px);
}

button:hover:not(:disabled)::before {
  transform: translateX(200%);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background-color: #d9bb98;
}

.error-message {
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
}

/* Animations */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translateX(-1px);
  }
  20%, 80% {
    transform: translateX(2px);
  }
  30%, 50%, 70% {
    transform: translateX(-4px);
  }
  40%, 60% {
    transform: translateX(4px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .login-form {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input,
  button {
    padding: 0.75rem;
  }
}
</style>