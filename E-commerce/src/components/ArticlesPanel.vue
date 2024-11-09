<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Category {
  name: string;
  subcategories: string[];
}

export default defineComponent({
  name: 'TopNavigation',
  setup() {
    const router = useRouter();
    const expandedCategory = ref<string | null>(null);
    const isMobileMenuOpen = ref(false);
    const isMouseOverDropdown = ref(false);

    const categories: Category[] = [
      {
        name: "Hombres",
        subcategories: ["Camisetas", "Zapatos", "Pantalones", "Abrigos", "Colonias", "Variado"]
      },
      {
        name: "Mujeres",
        subcategories: ["Camisetas", "Zapatos", "Pantalones", "Abrigos", "Colonias", "Variado"]
      },
      {
        name: "Niños",
        subcategories: ["Camisetas", "Zapatos", "Pantalones", "Abrigos", "Colonias", "Variado"]
      },
      {
        name: "Unisex",
        subcategories: ["Camisetas", "Zapatos", "Pantalones", "Abrigos", "Colonias", "Variado"]
      }
    ];

    const toggleCategory = (categoryName: string) => {
      expandedCategory.value = categoryName;
    };

    const handleMouseLeave = (categoryName: string) => {
      if (!isMouseOverDropdown.value && !isMobileMenuOpen.value) {
        expandedCategory.value = null;
      }
    };

    const navigateToSubcategory = (category: string, subcategory: string) => {
      const route = `/productos/${category.toLowerCase()}/${subcategory.toLowerCase()}`;
      router.push(route);
      expandedCategory.value = null;
      isMouseOverDropdown.value = false;
      if (window.innerWidth <= 768) {
        isMobileMenuOpen.value = false;
      }
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      document.documentElement.classList.toggle('menu-open', isMobileMenuOpen.value);
    };

    return {
      expandedCategory,
      categories,
      isMobileMenuOpen,
      isMouseOverDropdown,
      toggleCategory,
      handleMouseLeave,
      navigateToSubcategory,
      toggleMobileMenu
    };
  }
});
</script>

<template>
  <!-- Botón hamburguesa para móvil -->
  <button 
    class="categories-menu-button"
    @click="toggleMobileMenu"
    :class="{ 'active': isMobileMenuOpen }"
  >
    <span class="hamburger-icon"></span>
  </button>

  <!-- Barra de navegación de categorías -->
  <nav class="categories-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
    <ul class="category-list">
      <li v-for="category in categories" 
          :key="category.name" 
          class="category-item"
          @mouseover="!isMobileMenuOpen && toggleCategory(category.name)"
          @mouseleave="handleMouseLeave(category.name)"
      >
        <button 
          class="category-button"
          :class="{ 'active': expandedCategory === category.name }"
          @click="isMobileMenuOpen && toggleCategory(category.name)"
        >
          {{ category.name }}
          <span class="arrow" :class="{ 'arrow-down': expandedCategory === category.name }">
            ▼
          </span>
        </button>
        
        <div v-if="expandedCategory === category.name" 
             class="subcategory-dropdown"
             :class="{ 'mobile': isMobileMenuOpen }"
             @mouseover="isMouseOverDropdown = true"
             @mouseleave="isMouseOverDropdown = false"
        >
          <ul class="subcategory-list">
            <li v-for="subcategory in category.subcategories" 
                :key="subcategory" 
                class="subcategory-item"
            >
              <a 
                @click.prevent="navigateToSubcategory(category.name, subcategory)"
                href="#"
                class="subcategory-link"
              >
                {{ subcategory }}
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>

  <!-- Overlay para móvil -->
  <div 
    v-if="isMobileMenuOpen" 
    class="mobile-overlay"
    @click="toggleMobileMenu"
  ></div>
</template>

<style scoped>
.categories-nav {
  background-color: #f4ece0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 90;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.category-item {
  position: relative;
}

.category-button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #333333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.category-button:hover,
.category-button.active {
  background-color: #E9E1D5;
}

.arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.arrow-down {
  transform: rotate(180deg);
}

.subcategory-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f4ece0;
  min-width: 200px;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 95;
}

.subcategory-dropdown.mobile {
  position: static;
  background-color: transparent;
  box-shadow: none;
  margin-top: 0.5rem;
  padding-left: 1rem;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subcategory-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subcategory-item {
  padding: 0.2rem 0.5rem;
}

.subcategory-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333333;
  transition: all 0.2s ease;
  border-radius: 0.25rem;
}

.subcategory-link:hover {
  background-color: #E9E1D5;
  transform: translateX(5px);
}

/* Estilos móviles */
.categories-menu-button {
  display: none;
  position: fixed;
  top: 5.5rem;
  left: 1rem;
  z-index: 91;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  position: relative;
  transition: background 0.3s;
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #333;
  transition: all 0.3s;
}

.hamburger-icon::before {
  top: -6px;
}

.hamburger-icon::after {
  bottom: -6px;
}

.categories-menu-button.active .hamburger-icon {
  background: transparent;
}

.categories-menu-button.active .hamburger-icon::before {
  transform: rotate(45deg);
  top: 0;
}

.categories-menu-button.active .hamburger-icon::after {
  transform: rotate(-45deg);
  bottom: 0;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 89;
}

@media (max-width: 768px) {
  .categories-menu-button {
    display: block;
  }

  .categories-nav {
    transform: translateY(-100%);
    top: 80px;
    height: calc(100vh - 80px);
    padding: 1rem;
    transition: transform 0.3s ease;
    overflow-y: auto;
  }

  .categories-nav.mobile-open {
    transform: translateY(0);
  }

  .category-list {
    flex-direction: column;
    padding-top: 4rem;
  }

  .category-item {
    width: 100%;
  }

  .category-button {
    width: 100%;
    justify-content: space-between;
    padding: 1rem;
  }

  .subcategory-dropdown {
    width: 100%;
    max-height: none;
    opacity: 1;
  }

  .subcategory-link {
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
  }

  .mobile-overlay {
    display: block;
    top: 80px;
  }
}

/* Ajustes para el contenido principal */
main {
  padding-top: 140px;
}

/* Prevenir scroll cuando el menú móvil está abierto */
:root.menu-open {
  overflow: hidden;
}
</style>
