import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import MenShopView from '../views/shop/Mens/MenShopView.vue'
import KidsTShirtView from '../views/shop/Kid/T-Shirt/KidsTShirtView.vue'
import KidsCoatsView from '../views/shop/Kid/Coats/KidsCoatsView.vue'
import KidsPantsView from '../views/shop/Kid/Pants/KidsPantsView.vue'
import KidsShoesView from '../views/shop/Kid/Shoes/KidsShoesView.vue'
import KidsColoniesView from '../views/shop/Kid/Colonies/KidsColoniesView.vue'
import BillView from '../views/BillView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/shop/men',
      name: 'men', 
      component: MenShopView,
    },
    {
      path: '/shop/kid/t-shirt',
      name: 'kid-tshirt', 
      component: KidsTShirtView,
    },
    {
      path: '/shop/kid/coat',
      name: 'kid-coat',
      component: KidsCoatsView,
    },
    {
      path: '/shop/kid/pants',
      name: 'kid-pants',
      component: KidsPantsView,
    },
    {
      path: '/shop/kid/colonies',
      name: 'kid-colonies',
      component: KidsColoniesView,
    },
    {
      path: '/shop/kid/shoes',
      name: 'kid-shoes',
      component: KidsShoesView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: BillView,
    }
  ],
})

export default router