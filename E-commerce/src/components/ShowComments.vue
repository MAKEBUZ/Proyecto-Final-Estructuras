// CommentDisplay.vue
<template>
  <div class="display-container">
    <div class="category-filters">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectCategory(category)"
        :class="['category-button', { active: selectedCategory === category }]"
      >
        {{ category }}
      </button>
      <button 
        @click="selectCategory('')"
        :class="['category-button', { active: selectedCategory === '' }]"
      >
        Todos
      </button>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <h3>Total de comentarios</h3>
        <p>{{ totalComments }}</p>
      </div>
      <div class="stat-card">
        <h3>Comentarios en {{ selectedCategory || 'todas las categorías' }}</h3>
        <p>{{ currentCategoryComments }}</p>
      </div>
    </div>

    <div class="comments-grid">
      <!-- Comentarios principales -->
      <div 
        v-for="comment in filteredRootComments" 
        :key="comment.id"
        class="comment-card"
        :class="comment.category.toLowerCase()"
      >
        <div class="comment-header">
          <h4>{{ comment.username }}</h4>
          <span class="category-badge">{{ comment.category }}</span>
        </div>
        <p class="comment-text">{{ comment.content }}</p>
        <div class="comment-footer">
          <small>{{ formatDate(comment.timestamp) }}</small>
        </div>

        <!-- Respuestas al comentario -->
        <div class="replies-section" v-if="getChildComments(comment.id).length > 0">
          <h5 class="replies-title">Respuestas:</h5>
          <div 
            v-for="reply in getChildComments(comment.id)" 
            :key="reply.id"
            class="reply-card"
          >
            <div class="reply-header">
              <h6>{{ reply.username }}</h6>
              <span class="category-badge-small">{{ reply.category }}</span>
            </div>
            <p class="reply-text">{{ reply.content }}</p>
            <small class="reply-date">{{ formatDate(reply.timestamp) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  parentId: string | null;
  category: string;
}

export default defineComponent({
  name: 'CommentDisplay',
  setup() {
    const categories = ['Moda', 'Colecciones', 'Ofertas', 'Preguntas', 'Sugerencias'];
    const comments = ref<Comment[]>([]);
    const selectedCategory = ref('');

    const loadComments = () => {
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        comments.value = JSON.parse(savedComments);
      }
    };

    const selectCategory = (category: string) => {
      selectedCategory.value = category;
    };

    const filteredRootComments = computed(() => {
      const rootComments = comments.value.filter(comment => !comment.parentId);
      if (!selectedCategory.value) return rootComments;
      return rootComments.filter(comment => comment.category === selectedCategory.value);
    });

    const totalComments = computed(() => comments.value.length);

    const currentCategoryComments = computed(() => {
      if (!selectedCategory.value) return totalComments.value;
      return comments.value.filter(comment => comment.category === selectedCategory.value).length;
    });

    const getChildComments = (parentId: string): Comment[] => {
      return comments.value.filter(comment => comment.parentId === parentId);
    };

    const formatDate = (timestamp: number): string => {
      return new Date(timestamp).toLocaleString();
    };

    onMounted(() => {
      loadComments();
      setInterval(loadComments, 30000);
    });

    return {
      categories,
      selectedCategory,
      filteredRootComments,
      totalComments,
      currentCategoryComments,
      selectCategory,
      getChildComments,
      formatDate
    };
  }
});
</script>

<style scoped>
.display-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F4ECE0;
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.category-button {
  background-color: #BE8151;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-button:hover {
  background-color: #B06D46;
}

.category-button.active {
  background-color: #764836;
}

.stats-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  color: #5d554d;
  margin: 0 0 10px 0;
}

.stat-card p {
  color: #BE8151;
  font-size: 24px;
  margin: 0;
}

.comments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.comment-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #BE8151;
}

.comment-card.moda { border-top-color: #BE8151; }
.comment-card.colecciones { border-top-color: #764836; }
.comment-card.ofertas { border-top-color: #B06D46; }
.comment-card.preguntas { border-top-color: #5d554d; }
.comment-card.sugerencias { border-top-color: #333333; }

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-header h4 {
  color: #333333;
  margin: 0;
  font-size: 1.1em;
}

.category-badge {
  background-color: #e8d6c0;
  color: #5d554d;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.comment-text {
  color: #5d554d;
  margin: 10px 0;
  line-height: 1.5;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #e8d6c0;
}

.comment-footer small {
  color: #764836;
}

.replies-section {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #d9bb98;
}

.replies-title {
  color: #764836;
  margin: 0 0 15px 0;
  font-size: 0.9em;
}

.reply-card {
  background-color: #f8f4ed;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reply-header h6 {
  margin: 0;
  color: #333333;
  font-size: 0.9em;
}

.category-badge-small {
  background-color: #e8d6c0;
  color: #5d554d;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7em;
}

.reply-text {
  color: #5d554d;
  margin: 5px 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.reply-date {
  color: #764836;
  font-size: 0.8em;
  display: block;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .comments-grid {
    grid-template-columns: 1fr;
  }

  .stats-section {
    flex-direction: column;
  }

  .category-filters {
    justify-content: center;
  }
}
</style>