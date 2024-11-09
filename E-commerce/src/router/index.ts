import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import KidsTShirtView from '../views/shop/Kid/T-Shirt/KidsTShirtView.vue'
import KidsCoatsView from '../views/shop/Kid/Coats/KidsCoatsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/shop/kids/t-shirts',
      name: 'Kid T-shirt',
      component: KidsTShirtView
    },
    {
      path: '/shop/kids/coats',
      name: 'Kid Coats',
      component: KidsCoatsView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },

  ]
})

export default router


