<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  parentId: string | null;
  mainCategory: string;
  subCategory: string;
}

interface CommentNode {
  id: string;
  comment: Comment;
  children: CommentNode[];
}

class CommentGraph {
  private CommentNodes = new Map<string, CommentNode>();

  addComment(comment: Comment): void {
    const CommentNode: CommentNode = { id: comment.id, comment, children: [] };
    this.CommentNodes.set(comment.id, CommentNode);

    if (comment.parentId) {
      const parent = this.CommentNodes.get(comment.parentId);
      parent?.children.push(CommentNode);
    }
  }

  getRootCommentNodes(): CommentNode[] {
    return Array.from(this.CommentNodes.values()).filter(CommentNode => !CommentNode.comment.parentId);
  }

  getChildCommentNodes(parentId: string): CommentNode[] {
    const parent = this.CommentNodes.get(parentId);
    return parent ? parent.children : [];
  }
}

export default defineComponent({
  name: 'CommentGraph',
  setup() {
    const mainCategories = [
      { id: 'hombres', name: 'Hombres' },
      { id: 'mujeres', name: 'Mujeres' },
      { id: 'ninos', name: 'Niños' },
      { id: 'unisex', name: 'Unisex' }
    ];

    const categorySubcategories = {
      hombres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      mujeres: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      ninos: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias'],
      unisex: ['moda', 'colecciones', 'ofertas', 'preguntas', 'sugerencias']
    };

    const subCategories = [
      { id: 'moda', name: 'Moda' },
      { id: 'colecciones', name: 'Colecciones' },
      { id: 'ofertas', name: 'Ofertas' },
      { id: 'preguntas', name: 'Preguntas' },
      { id: 'sugerencias', name: 'Sugerencias' }
    ];

    const commentsGraph = new CommentGraph();
    const comments = ref<Comment[]>([]);
    const selectedMainCategory = ref('');
    const selectedSubCategory = ref('');
    const newComment = ref<Partial<Comment>>({
      username: '',
      content: '',
      parentId: null,
      mainCategory: '',
      subCategory: ''
    });

    const getSubCategories = computed(() => {
      if (!newComment.value.mainCategory) return [];
      return subCategories.filter(subCat =>
        categorySubcategories[newComment.value.mainCategory as keyof typeof categorySubcategories]?.includes(subCat.id)
      );
    });

    const filteredComments = computed(() => {
      return commentsGraph
        .getRootCommentNodes()
        .filter(CommentNode => {
          const { mainCategory, subCategory } = CommentNode.comment;
          return (
            (!selectedMainCategory.value || mainCategory === selectedMainCategory.value) &&
            (!selectedSubCategory.value || subCategory === selectedSubCategory.value)
          );
        });
    });

    const addComment = () => {
      if (
        !newComment.value.username ||
        !newComment.value.content ||
        !newComment.value.mainCategory ||
        !newComment.value.subCategory
      ) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      const comment: Comment = {
        id: Date.now().toString(),
        username: newComment.value.username!,
        content: newComment.value.content!,
        timestamp: Date.now(),
        parentId: newComment.value.parentId || null,
        mainCategory: newComment.value.mainCategory!,
        subCategory: newComment.value.subCategory!
      };

      commentsGraph.addComment(comment);
      comments.value.push(comment);
      saveComments();
      resetForm();
    };

    const getChildComments = (parentId: string): Comment[] => {
      return commentsGraph.getChildCommentNodes(parentId).map(CommentNode => CommentNode.comment);
    };

    const showReplyForm = (parentComment: Comment) => {
      newComment.value = {
        username: '',
        content: '',
        parentId: parentComment.id,
        mainCategory: parentComment.mainCategory,
        subCategory: parentComment.subCategory
      };
    };

    const resetForm = () => {
      newComment.value = {
        username: '',
        content: '',
        parentId: null,
        mainCategory: '',
        subCategory: ''
      };
    };

    const loadComments = () => {
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        const loadedComments: Comment[] = JSON.parse(savedComments);
        loadedComments.forEach(comment => commentsGraph.addComment(comment));
        comments.value = loadedComments;
      }
    };

    const saveComments = () => {
      localStorage.setItem('comments', JSON.stringify(comments.value));
    };

    const formatDate = (timestamp: number): string => {
      return new Date(timestamp).toLocaleString();
    };

    loadComments();

    return {
      mainCategories,
      subCategories,
      comments,
      newComment,
      selectedMainCategory,
      selectedSubCategory,
      getSubCategories,
      filteredComments,
      addComment,
      getChildComments,
      showReplyForm,
      resetForm,
      formatDate
    };
  }
});
</script>


<template>
  <div class="page-wrapper">
    <div class="comment-container">
      <!-- Comment form -->
      <div class="comment-form" :class="{ 'replying': newComment.parentId }">
        <!-- Response indicator -->
        <div v-if="newComment.parentId" class="reply-indicator">
          Respondiendo a un comentario
          <button @click="resetForm" class="cancel-reply-button">
            Cancelar respuesta
          </button>
        </div>

        <!-- Form fields -->
        <input 
          v-model="newComment.username" 
          placeholder="Tu nombre" 
          class="input-field"
        />

        <!-- Parent Category Selector -->
        <select 
          v-model="newComment.mainCategory"
          class="select-field"
          :disabled="!!newComment.parentId"
        >
          <option value="">Selecciona una categoría principal</option>
          <option 
            v-for="category in mainCategories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

       <!-- Subcategory selector -->
        <select 
          v-model="newComment.subCategory"
          class="select-field"
          :disabled="!newComment.mainCategory || !!newComment.parentId"
        >
          <option value="">Selecciona una subcategoría</option>
          <option 
            v-for="category in getSubCategories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <!-- Text area for the comment -->
        <textarea 
          v-model="newComment.content" 
          placeholder="Escribe tu comentario..." 
          class="textarea-field"
        ></textarea>

        <!-- Submit button -->
        <button 
          @click="addComment" 
          class="submit-button"
          :disabled="!newComment.mainCategory || !newComment.subCategory"
        >
          {{ newComment.parentId ? 'Responder' : 'Publicar comentario' }}
        </button>
      </div>

      <!-- Filters section -->
      <div class="filter-section">
        <div class="filter-group">
          <select 
            v-model="selectedMainCategory"
            class="select-field"
          >
            <option value="">Todas las categorías principales</option>
            <option 
              v-for="category in mainCategories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>

          <select 
            v-model="selectedSubCategory"
            class="select-field"
            :disabled="!selectedMainCategory"
          >
            <option value="">Todas las subcategorías</option>
            <option 
              v-for="category in getSubCategories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- List of comments -->
      <div class="comments-graph">
        <div 
          v-for="comment in filteredComments" 
          :key="comment.id"
          class="comment-CommentNode"
        >
          <div class="comment-content">
            <!-- Category Tags -->
            <div class="category-tags">
              <span class="category-tag main-category" :class="comment.comment.mainCategory">
                {{ mainCategories.find(c => c.id === comment.comment.mainCategory)?.name }}
              </span>
              <span class="category-tag sub-category" :class="comment.comment.subCategory">
                {{ subCategories.find(c => c.id === comment.comment.subCategory)?.name }}
              </span>
            </div>

            <!-- Comment content -->
            <h4>{{ comment.comment.username }}</h4>
            <p>{{ comment.comment.content }}</p>
            <small>{{ formatDate(comment.comment.timestamp) }}</small>
            
            <button 
              @click="showReplyForm(comment.comment)"
              class="reply-button"
            >
              Responder
            </button>
          </div>

          <!-- Nested Comments -->
          <div class="nested-comments">
            <div 
              v-for="childComment in getChildComments(comment.id)"
              :key="childComment.id"
              class="comment-CommentNode child"
            >
              <div class="comment-content">
                <div class="category-tags">
                  <span class="category-tag main-category" :class="childComment.mainCategory">
                    {{ mainCategories.find(c => c.id === childComment.mainCategory)?.name }}
                  </span>
                  <span class="category-tag sub-category" :class="childComment.subCategory">
                    {{ subCategories.find(c => c.id === childComment.subCategory)?.name }}
                  </span>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.page-wrapper {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.comment-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #F4ECE0;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comment-form, .filter-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  gap: 10px;
}

.input-field, .textarea-field, .select-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #d9bb98;
  border-radius: 4px;
}

.textarea-field {
  min-height: 100px;
  resize: vertical;
}

.comment-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 25px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-tags {
  position: absolute;
  top: -12px;
  left: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: calc(100% - 20px);
  z-index: 1;
}

.category-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: white;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  height: 24px;
  line-height: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-tag.main-category {
  font-weight: 600;
}

.category-tag.sub-category {
  font-weight: normal;
  opacity: 0.9;
}

/* Styles for main categories */
.category-tag.main-category.hombres { background-color: #2C3E50; }
.category-tag.main-category.mujeres { background-color: #8E44AD; }
.category-tag.main-category.ninos { background-color: #27AE60; }
.category-tag.main-category.unisex { background-color: #D35400; }

/* Styles for subcategories */
.category-tag.sub-category.moda { background-color: #BE8151; }
.category-tag.sub-category.colecciones { background-color: #764836; }
.category-tag.sub-category.ofertas { background-color: #B06D46; }
.category-tag.sub-category.preguntas { background-color: #5d554d; }
.category-tag.sub-category.sugerencias { background-color: #333333; }

.nested-comments {
  margin-left: 20px;
  border-left: 2px solid #d9bb98;
  padding-left: 20px;
}

.submit-button, .reply-button {
  background-color: #BE8151;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover,
.reply-button:hover {
  background-color: #a66d42;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.reply-indicator {
  background-color: #BE8151;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
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
  transition: all 0.2s ease;
}

.cancel-reply-button:hover {
  background: white;
  color: #BE8151;
}

/* Animations */
.comment-CommentNode {
  transition: all 0.3s ease;
}

.comment-CommentNode:hover {
  transform: translateX(5px);
}

.comment-form.replying {
  border-left: 4px solid #BE8151;
  padding-left: 16px;
}

/* Accessibility improvements */
.input-field:focus,
.textarea-field:focus,
.select-field:focus,
.submit-button:focus,
.reply-button:focus,
.cancel-reply-button:focus {
  outline: 2px solid #BE8151;
  outline-offset: 2px;
}

.select-field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.comment-content h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.comment-content p {
  margin: 0 0 12px 0;
  line-height: 1.5;
  color: #444;
}

.comment-content small {
  display: block;
  margin-bottom: 10px;
  color: #666;
}

.comments-graph {
  max-height: 800px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #BE8151 #f4ece0;
}

.comments-graph::-webkit-scrollbar {
  width: 8px;
}

.comments-graph::-webkit-scrollbar-track {
  background: #f4ece0;
}

.comments-graph::-webkit-scrollbar-thumb {
  background-color: #BE8151;
  border-radius: 4px;
  border: 2px solid #f4ece0;
}


.submit-button:hover:not(:disabled),
.reply-button:hover {
  background-color: #a66d42;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Styles for error messages */
.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: -8px;
  margin-bottom: 8px;
}

/* Styles for the loading state */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Smooth transitions */
.input-field,
.textarea-field,
.select-field,
.submit-button,
.reply-button,
.cancel-reply-button {
  transition: all 0.2s ease-in-out;
}

/* Media Queries for responsiveness */
@media (max-width: 640px) {
  .filter-group {
    flex-direction: column;
  }
  
  .comment-container {
    padding: 10px;
  }

  .comment-content {
    margin-top: 35px;
    padding: 15px;
  }

  .category-tags {
    top: -25px;
    left: 0;
    right: 0;
    justify-content: flex-start;
    padding: 0 10px;
  }

  .category-tag {
    font-size: 0.7rem;
    padding: 3px 8px;
    height: 20px;
  }

  .nested-comments {
    margin-left: 10px;
    padding-left: 10px;
  }

  .page-wrapper {
    padding: 20px 10px;
  }
}
</style>