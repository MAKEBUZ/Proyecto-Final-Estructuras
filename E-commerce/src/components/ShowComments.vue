<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  parentId: string | null;
  mainCategory: string;
  subCategory: string;
}

interface Category {
  id: string;
  name: string;
}

export default defineComponent({
  name: 'CommentDisplay',
  setup() {
    // Definition of categories
    const mainCategories: Category[] = [
      { id: 'hombres', name: 'Hombres' },
      { id: 'mujeres', name: 'Mujeres' },
      { id: 'ninos', name: 'Niños' },
      { id: 'unisex', name: 'Unisex' }
    ];

    const subCategories: Category[] = [
      { id: 'moda', name: 'Moda' },
      { id: 'colecciones', name: 'Colecciones' },
      { id: 'ofertas', name: 'Ofertas' },
      { id: 'preguntas', name: 'Preguntas' },
      { id: 'sugerencias', name: 'Sugerencias' }
    ];

    const categorySubcategories: Record<string, string[]> = {
      hombres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      mujeres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      ninos: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      unisex: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias']
    };

    // State
    const comments = ref<Comment[]>([]);
    const selectedMainCategory = ref('');
    const selectedSubCategory = ref('');
    const showDeleteModal = ref(false);
    const commentToDelete = ref<string | null>(null);
    const parentCommentId = ref<string | null>(null);

    // Computed properties
    const availableSubCategories = computed(() => {
      if (!selectedMainCategory.value) return [];
      const availableIds = categorySubcategories[selectedMainCategory.value] || [];
      return subCategories.filter(cat => availableIds.includes(cat.id));
    });

    const filteredRootComments = computed(() => {
      let filtered = comments.value.filter(comment => !comment.parentId);
      
      if (selectedMainCategory.value) {
        filtered = filtered.filter(comment => 
          comment.mainCategory === selectedMainCategory.value
        );
        
        if (selectedSubCategory.value) {
          filtered = filtered.filter(comment => 
            comment.subCategory === selectedSubCategory.value
          );
        }
      }
      
      return filtered;
    });

    const totalComments = computed(() => comments.value.length);

    const currentCategoryComments = computed(() => {
      let filtered = comments.value;
      
      if (selectedMainCategory.value) {
        filtered = filtered.filter(comment => 
          comment.mainCategory === selectedMainCategory.value
        );
        
        if (selectedSubCategory.value) {
          filtered = filtered.filter(comment => 
            comment.subCategory === selectedSubCategory.value
          );
        }
      }
      
      return filtered.length;
    });

    const currentCategoryDisplay = computed(() => {
      if (!selectedMainCategory.value) return 'todas las categorías';
      
      const mainCatName = mainCategories.find(c => c.id === selectedMainCategory.value)?.name;
      
      if (!selectedSubCategory.value) return mainCatName;
      
      const subCatName = subCategories.find(c => c.id === selectedSubCategory.value)?.name;
      return `${mainCatName} - ${subCatName}`;
    });

    // Methods
    const selectMainCategory = (category: string) => {
      selectedMainCategory.value = category;
      selectedSubCategory.value = '';  // Reset subcategory when main category changes
    };

    const selectSubCategory = (category: string) => {
      selectedSubCategory.value = category;
    };

    const getCategoryName = (categoryId: string, isMain: boolean): string => {
      const categories = isMain ? mainCategories : subCategories;
      return categories.find(c => c.id === categoryId)?.name || categoryId;
    };

    const loadComments = () => {
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        comments.value = JSON.parse(savedComments);
      }
    };

    const saveComments = () => {
      localStorage.setItem('comments', JSON.stringify(comments.value));
    };

    const confirmDelete = (commentId: string, parentId: string | null) => {
      commentToDelete.value = commentId;
      parentCommentId.value = parentId;
      showDeleteModal.value = true;
    };

    const deleteComment = () => {
      if (!commentToDelete.value) return;

      if (parentCommentId.value) {
        comments.value = comments.value.filter(c => c.id !== commentToDelete.value);
      } else {
        comments.value = comments.value.filter(c => 
          c.id !== commentToDelete.value && c.parentId !== commentToDelete.value
        );
      }

      saveComments();
      showDeleteModal.value = false;
      commentToDelete.value = null;
      parentCommentId.value = null;
    };

    const cancelDelete = () => {
      showDeleteModal.value = false;
      commentToDelete.value = null;
      parentCommentId.value = null;
    };

    const getChildComments = (parentId: string): Comment[] => {
      return comments.value.filter(comment => comment.parentId === parentId);
    };

    const formatDate = (timestamp: number): string => {
      return new Date(timestamp).toLocaleString();
    };

    const isReply = computed(() => !!parentCommentId.value);

    onMounted(() => {
      loadComments();
      setInterval(loadComments, 30000);
    });

    return {
      mainCategories,
      subCategories,
      selectedMainCategory,
      selectedSubCategory,
      availableSubCategories,
      filteredRootComments,
      totalComments,
      currentCategoryComments,
      currentCategoryDisplay,
      selectMainCategory,
      selectSubCategory,
      getCategoryName,
      getChildComments,
      formatDate,
      confirmDelete,
      deleteComment,
      cancelDelete,
      showDeleteModal,
      isReply
    };
  }
});
</script>

<template>
  <div class="display-container">
    <!-- Main Category Filters -->
    <div class="category-filters">
      <div class="main-category-filters">
        <button 
          v-for="category in mainCategories" 
          :key="category.id"
          @click="selectMainCategory(category.id)"
          :class="['category-button', { active: selectedMainCategory === category.id }]"
        >
          {{ category.name }}
        </button>
        <button 
          @click="selectMainCategory('')"
          :class="['category-button', { active: selectedMainCategory === '' }]"
        >
          Todos
        </button>
      </div>

      <!-- Subcategory filters -->
      <div class="sub-category-filters" v-if="selectedMainCategory">
        <button 
          v-for="category in availableSubCategories" 
          :key="category.id"
          @click="selectSubCategory(category.id)"
          :class="['sub-category-button', { active: selectedSubCategory === category.id }]"
        >
          {{ category.name }}
        </button>
        <button 
          @click="selectSubCategory('')"
          :class="['sub-category-button', { active: selectedSubCategory === '' }]"
        >
          Todas
        </button>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <h3>Total de comentarios</h3>
        <p>{{ totalComments }}</p>
      </div>
      <div class="stat-card">
        <h3>Comentarios en {{ currentCategoryDisplay }}</h3>
        <p>{{ currentCategoryComments }}</p>
      </div>
    </div>

    <div class="comments-grid">
      <div 
        v-for="comment in filteredRootComments" 
        :key="comment.id"
        class="comment-card"
        :class="[comment.mainCategory, comment.subCategory]"
      >
        <div class="comment-header">
          <h4>{{ comment.username }}</h4>
          <div class="comment-header-right">
            <span class="main-category-badge">
              {{ getCategoryName(comment.mainCategory, true) }}
            </span>
            <span class="sub-category-badge">
              {{ getCategoryName(comment.subCategory, false) }}
            </span>
            <button 
              @click="confirmDelete(comment.id, null)" 
              class="delete-button"
              title="Eliminar comentario"
            >
              <span>×</span>
            </button>
          </div>
        </div>
        <p class="comment-text">{{ comment.content }}</p>
        <div class="comment-footer">
          <small>{{ formatDate(comment.timestamp) }}</small>
        </div>

        <div class="replies-section" v-if="getChildComments(comment.id).length > 0">
          <h5 class="replies-title">Respuestas:</h5>
          <div 
            v-for="reply in getChildComments(comment.id)" 
            :key="reply.id"
            class="reply-card"
          >
            <div class="reply-header">
              <h6>{{ reply.username }}</h6>
              <div class="reply-header-right">
                <span class="main-category-badge-small">
                  {{ getCategoryName(reply.mainCategory, true) }}
                </span>
                <span class="sub-category-badge-small">
                  {{ getCategoryName(reply.subCategory, false) }}
                </span>
                <button 
                  @click="confirmDelete(reply.id, comment.id)" 
                  class="delete-button-small"
                  title="Eliminar respuesta"
                >
                  <span>×</span>
                </button>
              </div>
            </div>
            <p class="reply-text">{{ reply.content }}</p>
            <small class="reply-date">{{ formatDate(reply.timestamp) }}</small>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirmar eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar este {{ isReply ? 'respuesta' : 'comentario' }}?</p>
        <div class="modal-buttons">
          <button @click="deleteComment" class="confirm-delete-button">Eliminar</button>
          <button @click="cancelDelete" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
  --primary: #764836;          
  --primary-light: #BE8151;    
  
  --secondary: #B06D46;        
  --secondary-light: #e8d6c0;  
  
  --accent: #d9bb98;         
  --background: #F4ECE0;      
  --surface: #ffffff;         
  
  --text: #5d554d;           
  --text-light: #8a817a;     
  
  --border: #e8d6c0;         
  --shadow: rgba(118, 72, 54, 0.1); 
}


.display-container {
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  background-color: var(--background);
  min-height: 100vh;
}

.category-filters {
  margin-bottom: 2rem;
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow);
}

.main-category-filters,
.sub-category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-button,
.sub-category-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--background);
  color: var(--text);
}

.category-button {
  background: var(--primary-light);
  color: var(--surface);
}

.category-button:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

.sub-category-button {
  background: var(--surface);
  border: 2px solid var(--border);
}

.sub-category-button:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  transform: translateY(-2px);
}

.category-button.active {
  background: var(--secondary);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.sub-category-button.active {
  background: var(--secondary-light);
  color: var(--surface);
  border-color: var(--secondary-light);
}

/* Statistics section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px var(--shadow);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  color: var(--text-light);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.stat-card p {
  color: var(--primary);
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

/* Comments grid */
.comments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.comment-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.comment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px var(--shadow);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.comment-header h4 {
  margin: 0;
  color: var(--text);
  font-size: 1.1rem;
}

.comment-header-right {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Badges for categories */
.main-category-badge,
.sub-category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.main-category-badge {
  background: var(--primary-light);
  color: var(--surface);
}

.sub-category-badge {
  background: var(--secondary-light);
  color: var(--surface);
}

/* Delete buttons */
.delete-button,
.delete-button-small {
  background: var(--accent);
  color: var(--surface);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.delete-button:hover,
.delete-button-small:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Answer section */
.replies-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.replies-title {
  color: var(--text-light);
  margin: 0 0 1rem 0;
}

.reply-card {
  background: var(--background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease-out;
}

/* Confirmation modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  animation: scaleIn 0.3s ease-out;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.confirm-delete-button,
.cancel-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.confirm-delete-button {
  background: var(--accent);
  color: var(--surface);
}

.cancel-button {
  background: var(--background);
  color: var(--text);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .display-container {
    padding: 1rem;
  }

  .category-filters {
    padding: 1rem;
  }

  .main-category-filters,
  .sub-category-filters {
    flex-direction: column;
    gap: 0.5rem;
  }

  .category-button,
  .sub-category-button {
    width: 100%;
  }

  .comments-grid {
    grid-template-columns: 1fr;
  }

  .stat-card p {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .comment-header-right {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>