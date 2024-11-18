<template>
    <div class="queue-container">
      <h2 class="title">
        <Inbox class="icon" />
        Cola de Mensajes
      </h2>
      
      <!-- Filtros y Búsqueda -->
      <div class="filters">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Buscar mensajes..."
          v-model="searchTerm"
        />
        <select v-model="filterStatus" class="filter-select">
          <option value="all">Todos los mensajes</option>
          <option value="unread">No leídos</option>
          <option value="read">Leídos</option>
        </select>
      </div>
  
      <div class="queue-content">
        <div class="queue-list">
          <!-- Estado vacío -->
          <div v-if="filteredContacts.length === 0" class="empty-state">
            <Inbox :size="48" class="empty-icon" />
            <p>No hay mensajes pendientes</p>
          </div>
  
          <!-- Lista de contactos -->
          <TransitionGroup name="list">
            <div 
              v-for="contact in filteredContacts" 
              :key="contact.id" 
              class="contact-item"
              :class="{
                'selected': selectedContact?.id === contact.id,
                'deleting': deletingId === contact.id,
                'unread': !contact.read
              }"
              @click="viewMessage(contact)"
            >
              <div class="notification-dot" v-if="!contact.read"></div>
              <div class="contact-info">
                <strong>{{ contact.name }}</strong>
                <span>{{ contact.email }}</span>
                <small>{{ formatDate(contact.date) }}</small>
              </div>
              <div class="contact-actions">
                <button 
                  @click.stop="markAsRead(contact)"
                  class="action-btn"
                  v-if="!contact.read"
                  title="Marcar como leído"
                >
                  <MessageSquare :size="18" />
                </button>
                <button 
                  @click.stop="deleteContact(contact.id)"
                  class="delete-btn"
                  :class="{ 'deleting': deletingId === contact.id }"
                  title="Eliminar mensaje"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
  
        <!-- Vista previa del mensaje -->
        <Transition name="fade">
          <div v-if="selectedContact" class="message-preview">
            <div class="preview-header">
              <h3>Mensaje de {{ selectedContact.name }}</h3>
              <span class="date">{{ formatDate(selectedContact.date) }}</span>
            </div>
            <div class="message-content">
              <MessageSquare class="message-icon" />
              {{ selectedContact.message }}
            </div>
            <div class="preview-actions">
              <button class="reply-btn">
                <MessageSquare :size="18" />
                Responder
              </button>
            </div>
          </div>
        </Transition>
      </div>
  
      <!-- Paginación -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="page-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Anterior
        </button>
        <button 
          v-for="page in totalPages" 
          :key="page"
          class="page-button"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button 
          class="page-button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Siguiente
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { Trash2, Inbox, MessageSquare } from 'lucide-vue-next';
  
  interface ContactForm {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
    read: boolean;
  }
  
  export default defineComponent({
    name: 'ContactQueue',
    components: {
      Trash2,
      Inbox,
      MessageSquare
    },
    
    setup() {
      const contacts = ref<ContactForm[]>([]);
      const selectedContact = ref<ContactForm | null>(null);
      const deletingId = ref<string | null>(null);
      const searchTerm = ref('');
      const filterStatus = ref('all');
      const currentPage = ref(1);
      const itemsPerPage = 5;
  
      const loadContacts = () => {
        contacts.value = JSON.parse(localStorage.getItem('contacts') || '[]');
      };
  
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });
      };
  
      const filteredContacts = computed(() => {
        let filtered = contacts.value;
  
        // Aplicar búsqueda
        if (searchTerm.value) {
          const search = searchTerm.value.toLowerCase();
          filtered = filtered.filter(contact => 
            contact.name.toLowerCase().includes(search) ||
            contact.email.toLowerCase().includes(search) ||
            contact.message.toLowerCase().includes(search)
          );
        }
  
        // Aplicar filtro de estado
        if (filterStatus.value !== 'all') {
          filtered = filtered.filter(contact => 
            filterStatus.value === 'unread' ? !contact.read : contact.read
          );
        }
  
        // Aplicar paginación
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filtered.slice(start, end);
      });
  
      const totalPages = computed(() => 
        Math.ceil(contacts.value.length / itemsPerPage)
      );
  
      const deleteContact = async (id: string) => {
        deletingId.value = id;
        await new Promise(resolve => setTimeout(resolve, 500));
        contacts.value = contacts.value.filter(contact => contact.id !== id);
        localStorage.setItem('contacts', JSON.stringify(contacts.value));
        if (selectedContact.value?.id === id) {
          selectedContact.value = null;
        }
        deletingId.value = null;
      };
  
      const viewMessage = (contact: ContactForm) => {
        selectedContact.value = contact;
        if (!contact.read) {
          markAsRead(contact);
        }
      };
  
      const markAsRead = (contact: ContactForm) => {
        contact.read = true;
        localStorage.setItem('contacts', JSON.stringify(contacts.value));
      };
  
      // Cargar contactos al montar el componente
      onMounted(() => {
        loadContacts();
      });
  
      return {
        contacts,
        deleteContact,
        selectedContact,
        viewMessage,
        deletingId,
        searchTerm,
        filterStatus,
        currentPage,
        filteredContacts,
        totalPages,
        formatDate,
        markAsRead
      };
    }
  });
  </script>
  
  <style scoped>
  .queue-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: #F4ECE0;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(118, 72, 54, 0.1);
  }
  
  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #5d554d;
    margin-bottom: 2rem;
    font-size: 1.75rem;
  }
  
  .icon {
    color: #BE8151;
  }
  
  /* Filtros */
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #d9bb98;
    border-radius: 8px;
    background: white;
    color: #5d554d;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #BE8151;
    box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.2);
  }
  
  .filter-select {
    padding: 0.75rem 2rem 0.75rem 1rem;
    border: 2px solid #d9bb98;
    border-radius: 8px;
    background: white;
    color: #5d554d;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  /* Contenido principal */
  .queue-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .queue-list {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(118, 72, 54, 0.1);
    overflow: hidden;
  }
  
  /* Items de contacto */
  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e8d6c0;
    background: white;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
  }
  
  .notification-dot {
    position: absolute;
    left: 1rem;
    width: 8px;
    height: 8px;
    background: #BE8151;
    border-radius: 50%;
  }
  
  .contact-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #BE8151;
    transform: scaleY(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .contact-item:hover {
    background: #F4ECE0;
  }
  
  .contact-item:hover::before,
  .contact-item.selected::before {
    transform: scaleY(1);
  }
  
  .contact-item.selected {
    background: #BE8151;
    color: white;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-left: 2rem;
  }
  
  .contact-info strong {
    font-size: 1.1rem;
    color: #5d554d;
  }
  
  .contact-info span {
    color: #764836;
    font-size: 0.9rem;
  }
  
  .contact-info small {
    color: #B06D46;
    font-size: 0.8rem;
  }
  
  .selected .contact-info strong,
  .selected .contact-info span,
  .selected .contact-info small {
    color: white;
  }
  
  /* Botones de acción */
  .contact-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-btn,
  .delete-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #764836;
  }
  
  .action-btn:hover,
  .delete-btn:hover {
    background: #BE8151;
    color: white;
    transform: scale(1.1);
  }
  
  .delete-btn:hover {
    animation: wiggle 0.3s ease-in-out;
  }
  
  /* Vista previa del mensaje */
  .message-preview {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(118, 72, 54, 0.1);
  }
  
  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #BE8151;
  }
  
  .preview-header h3 {
    color: #5d554d;
    font-size: 1.25rem;
  }
  
  .date {
    color: #B06D46;
    font-size: 0.9rem;
  }
  
  .message-content {
    background: #F4ECE0;
    padding: 1.5rem;
    border-radius: 8px;
    color: #5d554d;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .message-icon {
    color: #BE8151;
    margin-right: 0.75rem;
  }
  
  .preview-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .reply-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #BE8151;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .reply-btn:hover {
    background: #B06D46;
    transform: translateY(-2px);
  }
  
  /* Paginación */
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }
  
  .page-button {
    padding: 0.5rem 1rem;
    border: none;
    background: #e8d6c0;
    color: #5d554d;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .page-button:hover:not(:disabled) {
    background: #BE8151;
    color: white;
  }
  
  .page-button.active {
    background: #BE8151;
    color: white;
  }
  
  .page-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Animaciones */
  @keyframes wiggle {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-15deg); }
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .list-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Estado vacío */
.empty-state {
  padding: 3rem;
  text-align: center;
  color: #5d554d;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  color: #BE8151;
  opacity: 0.5;
}

/* Estados de carga y error */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #5d554d;
}

.error-state {
  padding: 2rem;
  text-align: center;
  color: #B06D46;
  background: rgba(176, 109, 70, 0.1);
  border-radius: 8px;
  margin: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .queue-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .queue-content {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .contact-item {
    padding: 1rem;
  }

  .contact-info {
    padding-left: 1.5rem;
  }

  .preview-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
  .queue-container {
    background: #5d554d;
  }

  .queue-list,
  .message-preview {
    background: #4a4542;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .contact-item {
    background: #4a4542;
    border-bottom-color: #764836;
  }

  .contact-item:hover {
    background: #5d554d;
  }

  .contact-info strong {
    color: #F4ECE0;
  }

  .contact-info span {
    color: #e8d6c0;
  }

  .contact-info small {
    color: #d9bb98;
  }

  .message-content {
    background: #5d554d;
    color: #F4ECE0;
  }

  .search-input,
  .filter-select {
    background: #4a4542;
    color: #F4ECE0;
    border-color: #764836;
  }

  .search-input::placeholder {
    color: #d9bb98;
  }

  .title,
  .preview-header h3 {
    color: #F4ECE0;
  }

  .page-button {
    background: #4a4542;
    color: #F4ECE0;
  }

  .page-button:hover:not(:disabled),
  .page-button.active {
    background: #BE8151;
  }
}

/* Animaciones adicionales */
.contact-item.deleting {
  animation: slideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.delete-btn.deleting {
  animation: deleteRotate 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes deleteRotate {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(0);
  }
}

/* Hover effects */
.contact-item:hover .contact-actions {
  opacity: 1;
  transform: translateX(0);
}

.contact-actions {
  opacity: 0.7;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

/* Focus styles */
.search-input:focus,
.filter-select:focus,
.reply-btn:focus,
.action-btn:focus,
.delete-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(190, 129, 81, 0.3);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-item {
  animation: pulse 1.5s infinite;
  background: linear-gradient(90deg, #e8d6c0 25%, #d9bb98 50%, #e8d6c0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s infinite, shimmer 2s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>