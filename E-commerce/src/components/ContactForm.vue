<template>
  <div class="contact-container">
    <div class="animated-background"></div>
    
    <div class="contact-content">
      <div class="contact-form-container">
        <div class="form-card">
          <div class="form-header">
            <h2>
              <span class="icon-wrapper">
                <Mail :size="20" />
              </span>
              Contáctanos
            </h2>
          </div>
          
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <div class="input-wrapper">
                <input type="text" v-model="formData.name" :class="{ filled: formData.name }">
                <span class="floating-label">Nombre</span>
                <div class="input-underline"></div>
              </div>
              
              <div class="input-wrapper">
                <input type="email" v-model="formData.email" :class="{ filled: formData.email }">
                <span class="floating-label">Email</span>
                <div class="input-underline"></div>
              </div>
              
              <div class="input-wrapper">
                <textarea v-model="formData.message" :class="{ filled: formData.message }"></textarea>
                <span class="floating-label">Mensaje</span>
                <div class="input-underline"></div>
              </div>
              
              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="!loading">Enviar Mensaje</span>
                <span v-else class="spinner"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Información de Contacto -->
      <div class="contact-info-container">
        <div class="info-card">
          <h2>
            <span class="icon-wrapper">
              <Info :size="20" />
            </span>
            Información de Contacto
          </h2>
          
          <div class="info-items">
            <div class="info-item">
              <div class="info-icon">
                <MapPin />
              </div>
              <div class="info-text">
                <h3>Ubicación</h3>
                <p>Tu dirección aquí</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <Phone />
              </div>
              <div class="info-text">
                <h3>Teléfono</h3>
                <p>+34 123 456 789</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <Mail />
              </div>
              <div class="info-text">
                <h3>Email</h3>
                <p>contacto@ejemplo.com</p>
              </div>
            </div>
          </div>
          
          <div class="social-media">
            <h3>Síguenos</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <Facebook />
                <span class="social-tooltip">Facebook</span>
              </a>
              <a href="#" class="social-icon">
                <Twitter />
                <span class="social-tooltip">Twitter</span>
              </a>
              <a href="#" class="social-icon">
                <Instagram />
                <span class="social-tooltip">Instagram</span>
              </a>
              <a href="#" class="social-icon">
                <Linkedin />
                <span class="social-tooltip">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Mail, 
  Info, 
  MapPin, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-vue-next'

interface FormData {
  name: string
  email: string
  message: string
}

const loading = ref(false)
const formData = ref<FormData>({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    // Aquí iría tu lógica de envío
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Resetear formulario
    formData.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    console.error('Error al enviar:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="css">
.contact-container {
  min-height: 100vh;
  position: relative;
  padding: 2rem;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Fondo Animado */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #F4ECE0, #e8d6c0, #d9bb98, #e8d6c0);
  z-index: -1;
  animation: gradientAnimation 15s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Grid Layout */
.contact-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  position: relative;
  perspective: 1000px;
}

/* Contenedores de Formulario e Info */
.contact-form-container,
.contact-info-container {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.contact-form-container.active,
.contact-info-container.active {
  transform: scale(1.02);
  z-index: 2;
}

/* Tarjetas */
.form-card,
.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
}

/* Encabezados */
.form-header {
  margin-bottom: 2.5rem;
}

.form-header h2,
.info-card h2 {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #333333;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Iconos en Encabezados */
.icon-wrapper {
  background: #BE8151;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all 0.3s ease;
}

.icon-wrapper:hover {
  transform: rotate(15deg);
}

/* Grupos de Formulario */
.form-group {
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Contenedor de Input */
.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

/* Inputs y TextArea */
input,
textarea {
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  background: transparent;
  color: #333333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
}

.floating-label {
  position: absolute;
  left: 0;
  top: 0.75rem;
  pointer-events: none;
  transition: 0.3s ease all;
  color: #5d554d;
}


input:focus ~ .floating-label,
input.filled ~ .floating-label,
textarea:focus ~ .floating-label,
textarea.filled ~ .floating-label {
  transform: translateY(-20px);
  font-size: 0.8em;
  color: #BE8151;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #d9bb98;
}

.input-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #BE8151;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

input:focus ~ .input-underline::after,
textarea:focus ~ .input-underline::after {
  transform: scaleX(1);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #BE8151;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  background: #B06D46;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(190, 129, 81, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.info-items {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  background: rgba(232, 214, 192, 0.5);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
}

.info-item:hover {
  transform: translateX(10px);
  background: rgba(190, 129, 81, 0.1);
}

.info-icon {
  background: #BE8151;
  color: #ffffff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.info-item:hover .info-icon {
  transform: scale(1.1) rotate(10deg);
}

.info-text h3 {
  color: #333333;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.info-text p {
  color: #5d554d;
  font-size: 0.95rem;
}

.social-media {
  margin-top: 2.5rem;
}

.social-media h3 {
  color: #333333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-icon {
  position: relative;
  background: #F4ECE0;
  color: #333333;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
}

.social-icon:hover {
  background: #BE8151;
  color: #ffffff;
  transform: translateY(-5px);
}

.notification-system {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  background: white;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease forwards;
  position: relative;
  overflow: hidden;
}

.notification.success {
  border-left: 4px solid #BE8151;
}

.notification.error {
  border-left: 4px solid #B06D46;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #a8e6cf;
  animation: progress linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.error-message {
  color: #ff6f61;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-form-container,
  .contact-info-container {
    transform: none !important;
  }

  .form-card,
  .info-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 1rem;
  }

  .form-header h2,
  .info-card h2 {
    font-size: 1.5rem;
  }

  .social-icons {
    justify-content: center;
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.form-card:hover,
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(93, 85, 77, 0.1);
}

input.error,
textarea.error {
  border-color: #ff6f61;
}

input.error ~ .input-underline::after,
textarea.error ~ .input-underline::after {
  background: #B06D46;
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #333333;
  color: #ffffff;
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.social-icon:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -40px;
}
</style>