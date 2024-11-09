import { createStore } from 'vuex';

export interface State {
  cart: {
    items: Array<{ id: number; name: string; quantity: number }>;
  };
  user: {
    name: string;
    isLoggedIn: boolean;
  };
}

const state: State = {
  cart: {
    items: []
  },
  user: {
    name: '',
    isLoggedIn: false
  }
};

const mutations = {
  addToCart(state: State, item: { id: number; name: string; quantity: number }) {
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
  setUser(state: State, userData: { name: string; isLoggedIn: boolean }) {
    state.user = userData;
  }
};

const actions = {
  addItemToCart({ commit }: any, item: { id: number; name: string; quantity: number }) {
    commit('addToCart', item);
  },
  removeItemFromCart({ commit }: any, itemId: number) {
    commit('removeFromCart', itemId);
  },
  login({ commit }: any, userName: string) {
    commit('setUser', { name: userName, isLoggedIn: true });
  },
  logout({ commit }: any) {
    commit('setUser', { name: '', isLoggedIn: false });
  }
};

const getters = {
  cartItemCount: (state: State) => state.cart.items.length,
  cartTotalItems: (state: State) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  isLoggedIn: (state: State) => state.user.isLoggedIn
};

export const store = createStore({
  state,
  mutations,
  actions,
  getters
});