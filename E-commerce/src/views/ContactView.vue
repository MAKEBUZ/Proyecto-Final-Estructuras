<script lang="ts">
import { defineComponent } from 'vue';
import Form from '@/components/ContactForm.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Form,
    },
});
</script>
<template>
  <div class="about">
      <h1>Contact</h1>
      <p>Welcome to our E-commerce site! We offer a wide range of products for all your needs.</p>
  </div>
  <Form />
</template>

<style>
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}
</style>
