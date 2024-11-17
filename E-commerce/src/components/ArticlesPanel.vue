<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CategoryNode } from '@/types';


export default defineComponent({
  name: 'TopNavigation',
  setup() {
    const router = useRouter();
    const expandedCategory = ref<string | null>(null);
    const isMobileMenuOpen = ref(false);
    const closeTimeout = ref<number | null>(null);

    const categories: CategoryNode[] = [
      {
        name: "Men",
        subcategories: [
          { name: "T-Shirt", subcategories: [] },
          { name: "Shoes", subcategories: [] },
          { name: "Pants", subcategories: [] },
          { name: "Coats", subcategories: [] },
          { name: "Colonies", subcategories: [] }
        ]
      },
      {
        name: "Women",
        subcategories: [
          { name: "T-Shirt", subcategories: [] },
          { name: "Shoes", subcategories: [] },
          { name: "Pants", subcategories: [] },
          { name: "Coats", subcategories: [] },
          { name: "Colonies", subcategories: [] }
        ]
      },
      {
        name: "Kid",
        subcategories: [
          { name: "T-Shirt", subcategories: [] },
          { name: "Shoes", subcategories: [] },
          { name: "Pants", subcategories: [] },
          { name: "Coats", subcategories: [] },
          { name: "Colonies", subcategories: [] }
        ]
      },
      {
        name: "Unisex",
        subcategories: [
          { name: "T-Shirt", subcategories: [] },
          { name: "Shoes", subcategories: [] },
          { name: "Pants", subcategories: [] },
          { name: "Coats", subcategories: [] },
          { name: "Colonies", subcategories: [] }
        ]
      }
    ];

    const openCategory = (categoryName: string) => {
      if (closeTimeout.value) {
        window.clearTimeout(closeTimeout.value);
        closeTimeout.value = null;
      }
      expandedCategory.value = categoryName;
    };

    const closeCategory = () => {
      closeTimeout.value = window.setTimeout(() => {
        expandedCategory.value = null;
      }, 300);
    };


    const navigateToMainCategory = (category: string) => {
      const route = `/shop/${category.toLowerCase()}`;
      router.push(route);
      expandedCategory.value = null;
      if (window.innerWidth <= 768) {
        isMobileMenuOpen.value = false;
      }
    };

    const navigateToSubcategory = (category: string, subcategory: string) => {
      const route = `/shop/${category.toLowerCase()}/${subcategory.toLowerCase()}`;
      router.push(route);
      expandedCategory.value = null;
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
      openCategory,
      closeCategory,
      navigateToMainCategory,
      navigateToSubcategory,
      toggleMobileMenu,
    };
  }
});
</script>

<template>
  <button 
    class="categories-menu-button"
    @click="toggleMobileMenu"
    :class="{ 'active': isMobileMenuOpen }"
  >
    <span class="hamburger-icon"></span>
  </button>

  <nav class="categories-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
    <ul class="category-list">
      <li v-for="category in categories" 
          :key="category.name" 
          class="category-item"
          @mouseover="!isMobileMenuOpen && openCategory(category.name)"
          @mouseleave="!isMobileMenuOpen && closeCategory()"
      >
        <div class="category-container">
          <button 
            class="category-button"
            :class="{ 'active': expandedCategory === category.name }"
            @click="navigateToMainCategory(category.name)"
          >
            {{ category.name }}
          </button>
          <button 
            class="dropdown-toggle"
            @click.stop="openCategory(category.name)"
          >
            <span class="arrow" :class="{ 'arrow-down': expandedCategory === category.name }">
              ▼
            </span>
          </button>
        </div>

        <div v-if="expandedCategory === category.name" 
             class="subcategory-dropdown"
             :class="{ 'mobile': isMobileMenuOpen }"
             @mouseover="openCategory(category.name)"
             @mouseleave="closeCategory()"
        >
          <ul class="subcategory-list">
            <li v-for="subcategory in category.subcategories" 
                :key="subcategory.name"
                class="subcategory-item">
              <button 
                @click="navigateToSubcategory(category.name, subcategory.name)" 
                class="subcategory-link"
              >
                {{ subcategory.name }}
              </button>
              <div v-if="subcategory.subcategories.length > 0">
                <ul class="subcategory-list">
                  <li v-for="child in subcategory.subcategories" 
                      :key="child.name"
                      class="subcategory-item">
                    <button 
                      @click="navigateToSubcategory(category.name, child.name)" 
                      class="subcategory-link"
                    >
                      {{ child.name }}
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>

  <div 
    v-if="isMobileMenuOpen" 
    class="mobile-overlay"
    @click="toggleMobileMenu"
  ></div>
</template>

<style lang="css">
.category-container {
  display: flex;
  align-items: center;
  gap: 0;  /* Eliminamos el gap para que no haya espacio entre el botón y la flecha */
  min-width: 120px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.category-button {
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #333333;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-radius: 4px 0 0 4px; /* Redondear solo las esquinas izquierdas */
  flex-grow: 1;
  text-align: left;
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: 80px;
}

.dropdown-toggle {
  background: none;
  border: none;
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  border-radius: 0 4px 4px 0; /* Redondear solo las esquinas derechas */
  transition: all 0.2s ease;
}

.category-button:hover,
.category-button.active {
  color: #333333;
  background-color: #e8d6c0;
}

.categories-nav {
  background-color: #F4ECE0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 90;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid #d9bb98;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem; /* Reducido el gap para dar más espacio */
  width: 100%;
  justify-content: center;
}

.category-item {
  position: relative;
  display: flex;
  align-items: center;
}

.arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  opacity: 0.7; /* Aumentado la opacidad para mejor visibilidad */
}

.arrow-down {
  transform: rotate(180deg);
}

.subcategory-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  min-width: 220px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 0;
  z-index: 95;
  border: 1px solid #e8d6c0;
}

.subcategory-dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-left: 1px solid #e8d6c0;
  border-top: 1px solid #e8d6c0;
}

.subcategory-dropdown.mobile {
  position: static;
  transform: none;
  background-color: transparent;
  box-shadow: none;
  border: none;
  margin-top: 0.5rem;
  padding-left: 1rem;
  animation: slideDown 0.3s ease-out;
}

.subcategory-dropdown.mobile::before {
  display: none;
}

.subcategory-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subcategory-item {
  padding: 0.2rem 0.75rem;
}

.subcategory-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.65rem 1rem;
  text-decoration: none;
  color: #5d554d;
  transition: all 0.2s ease;
  border-radius: 4px;
  border: none;
  background: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.subcategory-link:hover {
  color: #333333;
  background-color: #e8d6c0;
}

/* Mobile Styles */
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

.category-button:hover,
.category-button.active {
  color: #333333;
  background-color: #e8d6c0;
}

.hamburger-icon,
.hamburger-icon::before,
.hamburger-icon::after {
  background: #333333;
}

.hamburger-icon {
  display: block;
  width: 24px;
  height: 2px;
  position: relative;
  transition: background 0.3s;
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
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
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 89;
}

@media (max-width: 768px) {
  .category-container {
    min-width: 100%; /* En móvil ocupará todo el ancho */
  }

  .categories-nav {
    transform: translateX(-100%);
    top: 80px;
    height: calc(100vh - 80px);
    padding: 1rem;
    transition: transform 0.3s ease;
    overflow-y: auto;
    background-color: #ffffff;
  }

  .categories-nav.mobile-open {
    transform: translateX(0);
  }

  .category-list {
    flex-direction: column;
    padding-top: 4rem;
    gap: 0.5rem;
  }

  .category-item {
    width: 100%;
  }

  .category-button {
    padding: 1rem;
    min-width: auto;
  }

  .subcategory-dropdown {
    width: 100%;
    max-height: none;
    opacity: 1;
  }

  .subcategory-link {
    padding: 0.75rem 1rem;
  }

  .mobile-overlay {
    display: block;
    top: 80px;
  }

  .dropdown-toggle {
    padding: 1rem 0.5rem;
  }
}

main {
  padding-top: 140px;
}

:root.menu-open {
  overflow: hidden;
}
</style>