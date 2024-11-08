<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
});
</script>

<template>
  <div class="about">
    <h2>Acerca de Nosotros</h2>
    <p>
      Bienvenido a nuestra tienda en línea. Nos especializamos en ofrecer productos de alta calidad a precios competitivos.
      Nuestro equipo está comprometido con la satisfacción del cliente y la excelencia en el servicio.
    </p>
    <h3>Misión</h3>
    <p>
      Nuestra misión es proporcionar una experiencia de compra excepcional, ofreciendo una amplia gama de productos que se adaptan
      a las necesidades de nuestros clientes.
    </p>
    <h3>Visión</h3>
    <p>
      Nos esforzamos por ser líderes en el comercio electrónico, innovando constantemente y mejorando nuestros servicios
      para satisfacer las expectativas de nuestros clientes.
    </p>
    <h3>Valores</h3>
    <ul>
      <li>Calidad</li>
      <li>Compromiso</li>
      <li>Innovación</li>
      <li>Respeto</li>
      <li>Transparencia</li>
    </ul>
    <p>
      Si tienes preguntas o comentarios, no dudes en contactarnos a través de nuestro formulario.
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin-left: 50px ;
  margin-top: 4rem;
  text-align: center;
  background-color: #f9f9f9; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(233, 225, 213, 0.5); 
}

h2 {
  color: #333333; /* Dark gray text */
}

.about p, .about h3, .about ul {
  margin: 15px 0;
  color: #333333; /* Dark gray text */
}
</style>
