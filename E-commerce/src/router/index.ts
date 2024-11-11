import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import MenShopView from '../views/shop/Mens/MenShopView.vue'
import MenTShirtView from '@/views/shop/Mens/T-Shirt/MenTShirtView.vue'
import MenShoesView from '@/views/shop/Mens/Shoes/MenShoesView.vue'
import MenPantsView from '@/views/shop/Mens/Pants/MenPantsView.vue'
import MenCoatsView from '@/views/shop/Mens/Coats/MenCoatsView.vue'
import UnisexShopView from '@/views/shop/Unisex/UnisexShopView.vue'
import UnisexTShirtView from '@/views/shop/Unisex/T-Shirt/UnisexTShirtView.vue'
import UnisexShoesView from '@/views/shop/Unisex/Shoes/UnisexShoesView.vue'
import UnisexPantsView from '@/views/shop/Unisex/Pants/UnisexPantsView.vue'
import UnisexColoniesView from '@/views/shop/Unisex/Colonies/UnisexColoniesView.vue'
import UnisexCoatsView from '@/views/shop/Unisex/Coats/UnisexCoatsView.vue'
import WomenShopView from '@/views/shop/Women/WomenShopView.vue'
import WomenTShirtView from '@/views/shop/Women/T-Shirt/WomenTShirtView.vue'
import WomenShoesView from '@/views/shop/Women/Shoes/WomenShoesView.vue'
import WomenPantsView from '@/views/shop/Women/Pants/WomenPantsView.vue'
import WomenColoniesView from '@/views/shop/Women/Colonies/WomenColoniesView.vue'
import WomenCoatsView from '@/views/shop/Women/Coats/WomenCoatsView.vue'
import KidsTShirtView from '../views/shop/Kid/T-Shirt/KidsTShirtView.vue'
import MenColoniesView from '@/views/shop/Mens/Colonies/MenColoniesView.vue'
import KidsCoatsView from '../views/shop/Kid/Coats/KidsCoatsView.vue'
import KidsPantsView from '../views/shop/Kid/Pants/KidsPantsView.vue'
import KidsShoesView from '../views/shop/Kid/Shoes/KidsShoesView.vue'
import KidsColoniesView from '../views/shop/Kid/Colonies/KidsColoniesView.vue'
import BillView from '../views/BillView.vue'
import KidShopView from '@/views/shop/Kid/KidShopView.vue'

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
      name: 'men-shop', 
      component: MenShopView,
    },
    {
      path: '/shop/men/t-shirt',
      name: 'men-tshirt', 
      component: MenTShirtView,
    },
    {
      path: '/shop/men/shoes',
      name: 'men-shoes', 
      component: MenShoesView,
    },
    {
      path: '/shop/men/colonies',
      name: 'men-colonies', 
      component: MenColoniesView,
    },
    {
      path: '/shop/men/pants',
      name: 'men-pants', 
      component: MenPantsView,
    },
    {
      path: '/shop/men/coats',
      name: 'men-coat',
      component: MenCoatsView,
    },
    {
      path: '/shop/unisex',
      name: 'unisex-shop', 
      component: UnisexShopView,
    },
    {
      path: '/shop/unisex/t-shirt',
      name: 'unisex-tshirt', 
      component: UnisexTShirtView,
    },
    {
      path: '/shop/unisex/shoes',
      name: 'unisex-shoes', 
      component: UnisexShoesView,
    },
    {
      path: '/shop/unisex/sants',
      name: 'unisex-pants', 
      component: UnisexPantsView,
    },
    {
      path: '/shop/unisex/colonies',
      name: 'unisex-colonies', 
      component: UnisexColoniesView,
    },
    {
      path: '/shop/unisex/coats',
      name: 'unisex-coats', 
      component: UnisexCoatsView,
    },
    {
      path: '/shop/women/',
      name: 'women-shop', 
      component: WomenShopView,
    },
    {
      path: '/shop/women/t-shirt',
      name: 'women-tshirt', 
      component: WomenTShirtView,
    },
    {
      path: '/shop/women/shoes',
      name: 'women-shoes', 
      component: WomenShoesView,
    },
    {
      path: '/shop/women/pants',
      name: 'women-pants', 
      component: WomenPantsView,
    },
    {
      path: '/shop/women/colonies',
      name: 'women-colonies', 
      component: WomenColoniesView,
    },
    {
      path: '/shop/women/coats',
      name: 'women-coats', 
      component: WomenCoatsView,
    },
    {
      path: '/shop/kid',
      name: 'kid-shop', 
      component: KidShopView,
    },
    {
      path: '/shop/kid/t-shirt',
      name: 'kid-tshirt', 
      component: KidsTShirtView,
    },
    {
      path: '/shop/kid/coats',
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