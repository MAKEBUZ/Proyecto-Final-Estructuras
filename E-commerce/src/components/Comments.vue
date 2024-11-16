<template>
    <div class="comment-container">
      <div class="comment-form" :class="{ 'replying': newComment.parentId }">
        <div v-if="newComment.parentId" class="reply-indicator">
          Respondiendo a un comentario
          <button @click="cancelReply" class="cancel-reply-button">
            Cancelar respuesta
          </button>
        </div>
        <input 
          v-model="newComment.username" 
          placeholder="Tu nombre" 
          class="input-field"
        />
        <select 
          v-model="newComment.category"
          class="select-field"
          :disabled="!!newComment.parentId"
        >
          <option value="">Selecciona una categoría</option>
          <option 
            v-for="category in categories" 
            :key="category" 
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <textarea 
          v-model="newComment.content" 
          placeholder="Escribe tu comentario..." 
          class="textarea-field"
          @focus="handleFocus"
          @blur="handleBlur"
        ></textarea>
        <button @click="addComment" class="submit-button">
          {{ newComment.parentId ? 'Responder' : 'Publicar comentario' }}
        </button>
      </div>
  
      <div class="filter-section">
        <select 
          v-model="selectedCategory"
          class="select-field"
          @change="filterComments"
        >
          <option value="">Todas las categorías</option>
          <option 
            v-for="category in categories" 
            :key="category" 
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
  
      <transition-group name="comment-list" tag="div" class="comments-graph">
        <div 
          v-for="comment in filteredRootComments" 
          :key="comment.id"
          class="comment-node"
        >
          <div class="comment-content">
            <span class="category-tag" :class="comment.category.toLowerCase()">
              {{ comment.category }}
            </span>
            <h4>{{ comment.username }}</h4>
            <p>{{ comment.content }}</p>
            <small>{{ formatDate(comment.timestamp) }}</small>
            <button 
              @click="showReplyForm(comment)"
              class="reply-button"
            >
              Responder
            </button>
          </div>
          <transition-group name="nested-comment" tag="div" class="nested-comments">
            <div 
              v-for="childComment in getChildComments(comment.id)"
              :key="childComment.id"
              class="comment-node child"
            >
              <div class="comment-content">
                <span class="category-tag" :class="childComment.category.toLowerCase()">
                  {{ childComment.category }}
                </span>
                <h4>{{ childComment.username }}</h4>
                <p>{{ childComment.content }}</p>
                <small>{{ formatDate(childComment.timestamp) }}</small>
                <button 
                  @click="showReplyForm(childComment)"
                  class="reply-button"
                >
                  Responder
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  interface Comment {
    id: string;
    username: string;
    content: string;
    timestamp: number;
    parentId: string | null;
    category: string;
  }
  
  export default defineComponent({
    name: 'CommentGraph',
    setup() {
      const categories = ['Moda', 'Colecciones', 'Ofertas', 'Preguntas', 'Sugerencias'];
      const comments = ref<Comment[]>([]);
      const selectedCategory = ref('');
      const newComment = ref<Partial<Comment>>({
        username: '',
        content: '',
        parentId: null,
        category: ''
      });
  
      const loadComments = () => {
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
          comments.value = JSON.parse(savedComments);
        }
      };
  
      const saveComments = () => {
        localStorage.setItem('comments', JSON.stringify(comments.value));
      };
  
      const addComment = () => {
        if (!newComment.value.username || !newComment.value.content || !newComment.value.category) {
          alert('Por favor completa todos los campos requeridos');
          return;
        }
  
        const comment: Comment = {
          id: Date.now().toString(),
          username: newComment.value.username!,
          content: newComment.value.content!,
          timestamp: Date.now(),
          parentId: newComment.value.parentId || null,
          category: newComment.value.category!
        };
  
        comments.value.push(comment);
        saveComments();
  
        // Reset form
        cancelReply();
      };
  
      const cancelReply = () => {
        newComment.value = {
          username: '',
          content: '',
          parentId: null,
          category: ''
        };
      };
  
      const formatDate = (timestamp: number): string => {
        return new Date(timestamp).toLocaleString();
      };
  
      const filteredRootComments = computed(() => {
        const rootComments = comments.value.filter(comment => !comment.parentId);
        if (!selectedCategory.value) return rootComments;
        return rootComments.filter(comment => comment.category === selectedCategory.value);
      });
  
      const getChildComments = (parentId: string): Comment[] => {
        return comments.value.filter(comment => comment.parentId === parentId);
      };
  
      const showReplyForm = (parentComment: Comment) => {
        newComment.value = {
          username: '',
          content: '',
          parentId: parentComment.id,
          category: parentComment.category // Set the same category as parent
        };
        document.querySelector('.comment-form')?.scrollIntoView({ behavior: 'smooth' });
      };
  
      const handleFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        target.closest('.textarea-field')?.classList.add('focused');
      };
  
      const handleBlur = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        target.closest('.textarea-field')?.classList.remove('focused');
      };
  
      const filterComments = () => {
        // Implementation if needed
      };
  
      loadComments();
  
      return {
        categories,
        newComment,
        selectedCategory,
        filteredRootComments,
        getChildComments,
        addComment,
        formatDate,
        showReplyForm,
        filterComments,
        cancelReply,
        handleFocus,
        handleBlur
      };
    }
  });
  </script>
  
  <style scoped>
.comment-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F4ECE0;
  margin-bottom: 10rem;
}

.comment-form, .filter-section {
  margin-bottom: 30px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  box-sizing: border-box; /* Añadido para incluir padding en el ancho total */
}

.input-field, .textarea-field, .select-field {
  width: 100%;
  margin-bottom: 10px;
  padding: 12px;
  border: 2px solid #d9bb98;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-sizing: border-box; /* Añadido para incluir padding y border en el ancho total */
  max-width: 100%; /* Asegura que no exceda el ancho del contenedor */
}

.input-field:focus, .textarea-field:focus, .select-field:focus {
  border-color: #BE8151;
  outline: none;
  box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.2);
}

.select-field {
  background-color: white;
  -webkit-appearance: none; /* Mejora la apariencia en Safari */
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23BE8151' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px; /* Espacio para la flecha */
}

.textarea-field {
  min-height: 100px;
  resize: vertical;
  font-family: inherit; /* Mantiene la consistencia con otros campos */
}

.comment-form.replying {
  background-color: #fdf5e6;
  border: 2px solid #BE8151;
}
  
  .reply-indicator {
    background-color: #BE8151;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cancel-reply-button {
    background: none;
    border: 1px solid white;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-reply-button:hover {
    background: white;
    color: #BE8151;
  }
  
  .input-field, .textarea-field, .select-field {
    width: 100%;
    margin-bottom: 10px;
    padding: 12px;
    border: 2px solid #d9bb98;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .input-field:focus, .textarea-field:focus, .select-field:focus {
    border-color: #BE8151;
    outline: none;
    box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.2);
  }
  
  .textarea-field {
    min-height: 100px;
    resize: vertical;
  }
  
  .textarea-field.focused {
    transform: translateY(-2px);
  }
  
  .submit-button, .reply-button {
    background-color: #BE8151;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .submit-button:hover, .reply-button:hover {
    background-color: #B06D46;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(176, 109, 70, 0.3);
  }
  
  .submit-button:active, .reply-button:active {
    transform: translateY(0);
  }
  
  /* Animaciones para la lista de comentarios */
  .comment-list-enter-active,
  .comment-list-leave-active,
  .nested-comment-enter-active,
  .nested-comment-leave-active {
    transition: all 0.5s ease;
  }
  
  .comment-list-enter-from,
  .comment-list-leave-to,
  .nested-comment-enter-from,
  .nested-comment-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .comment-list-move,
  .nested-comment-move {
    transition: transform 0.5s ease;
  }
  
  .comments-graph {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .comment-node {
    border-left: 2px solid #5d554d;
    padding-left: 20px;
    margin-left: 20px;
    transition: all 0.3s ease;
  }
  
  .comment-content {
    background-color: #e8d6c0;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .comment-content:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .category-tag {
    position: absolute;
    top: -10px;
    right: 10px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8em;
    color: white;
    transition: all 0.3s ease;
  }
  
  .category-tag:hover {
    transform: translateY(-2px);
  }
  
  .category-tag.moda { background-color: #BE8151; }
  .category-tag.colecciones { background-color: #764836; }
  .category-tag.ofertas { background-color: #B06D46; }
  .category-tag.preguntas { background-color: #5d554d; }
  .category-tag.sugerencias { background-color: #333333; }
  
  .nested-comments {
    margin-left: 20px;
  }
  
  .child {
    margin-top: 10px;
  }
  </style>