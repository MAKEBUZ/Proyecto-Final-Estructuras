<script lang="ts">
import { defineComponent, ref } from 'vue';
import { 
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
} from 'lucide-vue-next';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

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
      const newContact: ContactForm = {
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
</script>

<template>
  <div class="contact-wrapper">
    <div class="contact-container">
      <div class="form-card">
        <h2 class="title">Contáctanos</h2>
        <form @submit.prevent="saveContact" class="contact-form">
          <div class="form-group">
            <label>
              <User class="input-icon" :size="18" />
              Nombre:
            </label>
            <input 
              type="text" 
              v-model="form.name" 
              required
              class="input-field"
              placeholder="Tu nombre"
            />
          </div>
          <div class="form-group">
            <label>
              <Mail class="input-icon" :size="18" />
              Email:
            </label>
            <input 
              type="email" 
              v-model="form.email" 
              required
              class="input-field"
              placeholder="tu@email.com"
            />
          </div>
          <div class="form-group">
            <label>
              <MessageSquare class="input-icon" :size="18" />
              Mensaje:
            </label>
            <textarea 
              v-model="form.message" 
              required
              class="input-field message-field"
              placeholder="Escribe tu mensaje aquí..."
              rows="4"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <Send class="icon" :size="20" />
            Enviar Mensaje
          </button>
        </form>
      </div>

      <div class="info-card">
        <h2 class="title">Información de Contacto</h2>
        <div class="contact-info">
          <div class="info-item">
            <MapPin class="icon" />
            <div>
              <strong>Ubicación:</strong>
              <p>Ciudad, País</p>
            </div>
          </div>
          <div class="info-item">
            <Phone class="icon" />
            <div>
              <strong>Teléfono:</strong>
              <p>+1234567890</p>
            </div>
          </div>
          <div class="info-item">
            <Mail class="icon" />
            <div>
              <strong>Email:</strong>
              <p>contacto@empresa.com</p>
            </div>
          </div>
        </div>
        <div class="social-links">
          <a href="https://facebook.com" target="_blank" class="social-link">
            <Facebook class="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" class="social-link">
            <Instagram class="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" class="social-link">
            <Linkedin class="social-icon" />
          </a>
          <a href="https://github.com" target="_blank" class="social-link">
            <Github class="social-icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 3rem 1rem;
}

.contact-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.form-card, .info-card {
  background: #F4ECE0;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-card:hover, .info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.3);
}

.title {
  font-size: 1.75rem;
  color: #5d554d;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #BE8151;
  transition: width 0.3s ease;
}

.form-card:hover .title::after,
.info-card:hover .title::after {
  width: 100px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #5d554d;
  font-weight: 500;
}

.input-icon {
  color: #BE8151;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d9bb98;
  border-radius: 8px;
  background: #fff;
  transition: all 0.3s ease;
  color: #5d554d;
}

.message-field {
  resize: vertical;
  min-height: 100px;
}

.input-field:focus {
  outline: none;
  border-color: #BE8151;
  box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.2);
}

.input-field::placeholder {
  color: #d9bb98;
}

.submit-btn {
  background: #BE8151;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-btn:hover {
  background: #B06D46;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

.contact-info {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.info-item:hover {
  transform: translateX(10px);
}

.icon {
  color: #BE8151;
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #fff;
  color: #BE8151;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #BE8151;
  color: white;
  transform: translateY(-5px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .contact-wrapper {
    padding: 1rem;
  }

  .form-card, .info-card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .social-links {
    flex-wrap: wrap;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-form {
  animation: slideIn 0.5s ease-out;
}
</style>