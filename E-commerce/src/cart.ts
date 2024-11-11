import { createStore } from 'vuex';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export interface State {
  cart: {
    items: CartItem[];
  };
  user: {
    name: string;
    isLoggedIn: boolean;
  };
}

// Función para cargar el estado desde localStorage
const loadState = (): State => {
  try {
    const savedState = localStorage.getItem('vuex-cart-state');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  
  return {
    cart: {
      items: []
    },
    user: {
      name: '',
      isLoggedIn: false
    }
  };
};

// Estado inicial cargado desde localStorage
const state: State = loadState();

// Plugin para guardar el estado en localStorage
const persistStatePlugin = (store: any) => {
  // Guardar estado inicial
  localStorage.setItem('vuex-cart-state', JSON.stringify(store.state));

  // Suscribirse a las mutaciones
  store.subscribe((mutation: any, state: State) => {
    try {
      localStorage.setItem('vuex-cart-state', JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  });
};

const mutations = {
  addToCart(state: State, item: CartItem) {
    const existingItem = state.cart.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else {
      state.cart.items.push(item);
    }
  },
  
  removeFromCart(state: State, itemId: number) {
    state.cart.items = state.cart.items.filter(item => item.id !== itemId);
  },
  
  updateCartItemQuantity(state: State, { itemId, quantity }: { itemId: number; quantity: number }) {
    const item = state.cart.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  },
  
  setUser(state: State, userData: { name: string; isLoggedIn: boolean }) {
    state.user = userData;
  },

  // Mutation para restablecer el estado
  resetState(state: State) {
    const newState = loadState();
    Object.assign(state, newState);
  }
};

const actions = {
  addItemToCart({ commit }: any, item: CartItem) {
    commit('addToCart', item);
  },
  
  removeItemFromCart({ commit }: any, itemId: number) {
    commit('removeFromCart', itemId);
  },
  
  updateItemQuantity({ commit }: any, payload: { itemId: number; quantity: number }) {
    commit('updateCartItemQuantity', payload);
  },
  
  login({ commit }: any, userName: string) {
    commit('setUser', { name: userName, isLoggedIn: true });
  },
  
  logout({ commit }: any) {
    commit('setUser', { name: '', isLoggedIn: false });
  },

  // Acción para inicializar el estado
  initializeStore({ commit }: any) {
    commit('resetState');
  }
};

const getters = {
  cartItemCount: (state: State) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  
  cartItems: (state: State) => state.cart.items,
  
  isLoggedIn: (state: State) => state.user.isLoggedIn
};

// Crear el store con el módulo `cart`
export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
  },
  plugins: [persistStatePlugin]
});

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}
