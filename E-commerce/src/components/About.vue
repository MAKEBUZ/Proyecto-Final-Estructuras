<template>
  <div class="about-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <h1 class="title animate-fade-in">Bienvenido a nuestra tienda</h1>
      <p class="subtitle animate-slide-up">Descubre una nueva forma de comprar online</p>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="feature-card animate-slide-left">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2>Entrega Rápida</h2>
        <p>Garantizamos entregas en tiempo récord para que disfrutes de tus compras lo antes posible.</p>
      </div>

      <div class="feature-card animate-slide-up">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2>Compra Segura</h2>
        <p>Tu seguridad es nuestra prioridad. Todas las transacciones están protegidas.</p>
      </div>

      <div class="feature-card animate-slide-right">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>
        <h2>Soporte 24/7</h2>
        <p>Nuestro equipo de soporte está disponible las 24 horas para ayudarte.</p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section animate-fade-in">
      <h2>Nuestra Historia</h2>
      <div class="story-content">
        <div class="story-text">
          <p>Desde nuestros inicios, nos hemos comprometido a ofrecer la mejor experiencia de compra online. Nuestra pasión por la excelencia y el servicio al cliente nos ha convertido en líderes del mercado.</p>
          <button class="learn-more-btn" @click="scrollToFeatures">Conoce más</button>
        </div>
        <div class="stats-container">
          <div class="stat-item animate-count" v-for="stat in stats" :key="stat.label">
            <h3>{{ stat.value }}{{ stat.suffix }}</h3>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <h2 class="animate-fade-in">Nuestros Valores</h2>
      <div class="values-grid">
        <div v-for="value in values" :key="value.title" class="value-card animate-scale">
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    const stats = ref([
      { value: 0, target: 10000, suffix: '+', label: 'Clientes Satisfechos' },
      { value: 0, target: 50000, suffix: '+', label: 'Productos Vendidos' },
      { value: 0, target: 99, suffix: '%', label: 'Satisfacción' }
    ]);

    const values = ref([
      {
        title: 'Innovación',
        description: 'Buscamos constantemente nuevas formas de mejorar tu experiencia de compra.'
      },
      {
        title: 'Calidad',
        description: 'Garantizamos la mejor calidad en todos nuestros productos.'
      },
      {
        title: 'Compromiso',
        description: 'Estamos comprometidos con la satisfacción total de nuestros clientes.'
      },
      {
        title: 'Sostenibilidad',
        description: 'Trabajamos por un futuro más sostenible y responsable.'
      }
    ]);

    const animateCount = () => {
      stats.value.forEach(stat => {
        let current = 0;
        const increment = stat.target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            stat.value = stat.target;
            clearInterval(timer);
          } else {
            stat.value = Math.round(current);
          }
        }, 20);
      });
    };

    const scrollToFeatures = () => {
      const featuresSection = document.querySelector('.features-section');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    };

    onMounted(() => {
      // Iniciar animaciones cuando el componente se monta
      animateCount();
      
      // Observador para animaciones al hacer scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up, .animate-fade-in, .animate-scale')
        .forEach(el => observer.observe(el));
    });

    return {
      stats,
      values,
      scrollToFeatures
    };
  }
});
</script>

<style scoped>
.about-container {
  background-color: #f9f9f9;
  color: #333333;
}

.hero-section {
  background-color: #f4ece0;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
}

.features-section {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px #E9E1D5;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.icon-wrapper {
  background-color: #a8e6cf;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.icon {
  width: 32px;
  height: 32px;
  color: #333333;
}

.story-section {
  padding: 4rem 2rem;
  background-color: white;
}

.story-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-text {
  font-size: 1.1rem;
  line-height: 1.6;
}

.learn-more-btn {
  background-color: #a8e6cf;
  color: #333333;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.3s ease;
}

.learn-more-btn:hover {
  background-color: #ff6f61;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  color: #ff6f61;
  margin: 0;
}

.values-section {
  padding: 4rem 2rem;
  background-color: #f4ece0;
}

.values-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px #E9E1D5;
  text-align: center;
}

/* Animaciones */
.animate-fade-in {
  opacity: 0;
  transition: opacity 1s ease;
}

.animate-slide-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s ease;
}

.animate-slide-right {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease;
}

.animate-scale {
  opacity: 0;
  transform: scale(0.8);
  transition: all 1s ease;
}

.visible {
  opacity: 1;
  transform: translate(0) scale(1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }
}
</style>