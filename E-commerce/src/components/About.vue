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
      // Start animations when component is mounted
      animateCount();
      
      // Observer for scroll animations
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

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* Reset and base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Main container */
.about-container {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
  background-color: #ffffff;
}

/* General section styles */
section {
  width: 100%;
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333333;
  font-weight: 600;
}

/* Hero Section */
.hero-section {
  background-color: #F4ECE0;
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  color: #333333;
  font-weight: 700;
  line-height: 1.2;
  max-width: 800px;
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #5d554d;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 400;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  z-index: 2;
}

.feature-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-card h2 {
  font-size: 1.5rem;
  margin: 1rem 0;
  color: #333333;
}

.feature-card p {
  color: #666666;
  font-size: 1rem;
  line-height: 1.6;
}

.icon-wrapper {
  background-color: #e8d6c0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.icon {
  width: 40px;
  height: 40px;
  color: #333333;
  transition: all 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1);
  background-color: #BE8151;
}

.feature-card:hover .icon {
  color: #ffffff;
}

/* Story Section */
.story-section {
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  z-index: 1;
}

.story-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333333;
}

.story-text p {
  margin-bottom: 1.5rem;
}

.learn-more-btn {
  background-color: #BE8151;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-block;
  text-decoration: none;
}

.learn-more-btn:hover {
  background-color: #B06D46;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Stats Container */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  width: 100%;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.stat-item h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #BE8151;
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  width: 100%;
  word-break: break-word;
}

.stat-item p {
  color: #666666;
  margin-top: 0.5rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  width: 100%;
  word-wrap: break-word;
}

/* Values Section */
.values-section {
  padding: 6rem 2rem;
  background-color: #F4ECE0;
  position: relative;
  z-index: 1;
}

.values-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 2rem 0;
}

.value-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.value-card h3 {
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 1rem;
  font-weight: 600;
}

.value-card p {
  color: #666666;
  font-size: 1rem;
  line-height: 1.6;
}

/* Animations */
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
@media (max-width: 1200px) {
  .features-section,
  .story-content,
  .values-grid {
    max-width: 960px;
  }
}

@media (max-width: 1024px) {
  .story-content {
    gap: 3rem;
  }
  
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .stat-item {
    padding: 1.25rem;
    min-height: 120px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .feature-card {
    padding: 2rem;
  }

  .hero-section {
    padding: 6rem 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 1rem;
    min-height: 50vh;
  }

  .features-section,
  .story-section,
  .values-section {
    padding: 4rem 1rem;
  }

  .feature-card,
  .value-card {
    padding: 1.5rem;
  }

  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .stat-item {
    padding: 1rem;
    min-height: 100px;
  }

  .learn-more-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

/* Utilities */
.text-center {
  text-align: center;
}

.w-full {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Fix for horizontal scroll */
html, body {
  max-width: 100%;
  overflow-x: hidden;
}

/* Fix for containers */
.container {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Fix for z-index and positioning */
.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-30 {
  z-index: 30;
}
</style>