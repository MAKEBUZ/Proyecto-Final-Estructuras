<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContactForm',

  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      console.log('Formulario enviado:', this.form);
      this.submitted = true;

      this.form.name = '';
      this.form.email = '';
      this.form.phone = '';
      this.form.message = '';
    }
  }
});
</script>

<template>
  <div class="contact">
    <h2>Formulario de Contacto</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico: </label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="phone">Teléfono de Contacto:</label>
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>
      <div class="form-group">
        <label for="message">Mensaje:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Enviar</button>
      <p v-if="submitted" class="thank-you">Gracias por tu mensaje, {{ form.name }}. Te responderemos pronto.</p>
    </form>
  </div>
</template>

<style scoped>
.contact {
  max-width: 600px;
  margin: auto;
  background-color: #f4ece0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(233, 225, 213, 0.5); 
  margin-bottom: 1rem;
}

h2 {
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333333;
}

input, textarea {
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #a8e6cf; 
  color: #333333; 
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #ff6f61;
  transform: translateY(-2px);
}

.thank-you {
  margin-top: 15px;
  color: #333333; 
  text-align: center;
}
</style>
