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

const state: State = loadState();

const persistStatePlugin = (store: any) => {

  localStorage.setItem('vuex-cart-state', JSON.stringify(store.state));

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

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
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

export interface CartState {
  items: CartItem[];
}

export interface RootState {
  cart?: CartState;
}

