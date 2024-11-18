import { createStore } from 'vuex';
const loadState = () => {
    try {
        const savedState = localStorage.getItem('vuex-cart-state');
        if (savedState) {
            return JSON.parse(savedState);
        }
    }
    catch (e) {
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
const state = loadState();
const persistStatePlugin = (store) => {
    localStorage.setItem('vuex-cart-state', JSON.stringify(store.state));
    store.subscribe((mutation, state) => {
        try {
            localStorage.setItem('vuex-cart-state', JSON.stringify(state));
        }
        catch (e) {
            console.error('Error saving state:', e);
        }
    });
};
const mutations = {
    addToCart(state, item) {
        const existingItem = state.cart.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity = item.quantity;
        }
        else {
            state.cart.items.push(item);
        }
    },
    removeFromCart(state, itemId) {
        state.cart.items = state.cart.items.filter(item => item.id !== itemId);
    },
    updateCartItemQuantity(state, { itemId, quantity }) {
        const item = state.cart.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = quantity;
        }
    },
    resetState(state) {
        const newState = loadState();
        Object.assign(state, newState);
    }
};
const actions = {
    addItemToCart({ commit }, item) {
        commit('addToCart', item);
    },
    removeItemFromCart({ commit }, itemId) {
        commit('removeFromCart', itemId);
    },
    updateItemQuantity({ commit }, payload) {
        commit('updateCartItemQuantity', payload);
    },
    initializeStore({ commit }) {
        commit('resetState');
    }
};
const getters = {
    cartItemCount: (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0),
    cartItems: (state) => state.cart.items,
    isLoggedIn: (state) => state.user.isLoggedIn
};
export const store = createStore({
    state,
    mutations,
    actions,
    getters,
    plugins: [persistStatePlugin]
});
