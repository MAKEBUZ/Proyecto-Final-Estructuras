<script lang="ts">
export default {
  name: 'SidePanel',
  data() {
    return {
      expandedCategory: null as string | null,
      categories: [
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
      ]
    }
  },
  methods: {
    toggleCategory(categoryName: string) {
      if (this.expandedCategory === categoryName) {
        this.expandedCategory = null;
      } else {
        this.expandedCategory = categoryName;
      }
    }
  }
}
</script>

<template>
    <div class="side-panel">
      <nav class="panel-nav">
        <ul class="category-list">
          <li v-for="category in categories" :key="category.name" class="category-item">
            <button 
              @click="toggleCategory(category.name)"
              class="category-button"
              :class="{ 'active': expandedCategory === category.name }"
            >
              <span class="category-name">{{ category.name }}</span>
              <span class="arrow" :class="{ 'arrow-down': expandedCategory === category.name }">
                ▶
              </span>
            </button>
            
            <transition name="slide">
              <ul v-if="expandedCategory === category.name" class="subcategory-list">
                <li v-for="subcategory in category.subcategories" 
                    :key="subcategory" 
                    class="subcategory-item"
                >
                  <a :href="`#${category.name}-${subcategory}`" class="subcategory-link">
                    <span class="dot">•</span>
                    {{ subcategory }}
                  </a>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <style scoped>
  .side-panel {
    height: 100vh;
    width: 220px;
    background-color: #f4ece0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: auto;
    display: flex;
    align-items: center;
  }
  
  .panel-nav {
    padding: 0.75rem;
    width: 100%;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  
  .category-item {
    color: #333333;
    text-align: center;
  }
  
  .category-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    gap: 0.4rem;
    font-size: 0.95rem;
  }
  
  .category-button:hover {
    background-color: #E9E1D5;
    transform: translateY(-1px);
  }
  
  .category-button.active {
    background-color: #d8cfc3;
    transform: scale(0.98);
  }
  
  .arrow {
    font-size: 0.7rem;
    transition: transform 0.3s ease;
  }
  
  .arrow-down {
    transform: rotate(90deg);
  }
  
  .subcategory-list {
    list-style: none;
    padding-left: 1.5rem; 
    padding-right: 1.5rem;
    margin-top: 0.3rem;
    overflow: hidden;
  }
  
  .subcategory-item {
    margin-top: 0.2rem;
    text-align: left; 
  }
  
  .subcategory-link {
    display: flex;
    align-items: center;
    padding: 0.3rem; 
    text-decoration: none;
    color: #333333;
    font-size: 0.8rem; 
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    gap: 0.4rem;
  }
  
  .dot {
    color: #666;
    font-size: 1.2rem;
    line-height: 0;
    margin-top: -2px;
  }
  
  .subcategory-link:hover {
    background-color: #E9E1D5;
    transform: translateX(3px); 
  }
  
  .subcategory-link:hover .dot {
    color: #333;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
    max-height: 300px;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  
  .side-panel::-webkit-scrollbar {
    width: 6px;
  }
  
  .side-panel::-webkit-scrollbar-track {
    background: #f4ece0;
  }
  
  .side-panel::-webkit-scrollbar-thumb {
    background: #d8cfc3;
    border-radius: 3px;
  }
  
  .side-panel::-webkit-scrollbar-thumb:hover {
    background: #c4bbb0;
  }
  </style>