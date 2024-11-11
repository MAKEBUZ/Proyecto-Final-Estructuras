import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import MenShopView from '../views/shop/Mens/MenShopView.vue'
import MenTShirtView from '../views/shop/Mens/T-Shirt/MenTShirtView.vue'
import MenShoesView from '@/views/shop/Mens/Shoes/MenShoesView.vue'
import MenPantsView from '@/views/shop/Mens/Pants/MenPantsView.vue'
import MenCoatsView from '@/views/shop/Mens/Coats/MenCoatsView.vue'
import UnisexTShirtView from '@/views/shop/Unisex/T-Shirt/UnisexTShirtView.vue'
import UnisexShoesView from '@/views/shop/Unisex/Shoes/UnisexShoesView.vue'
import UnisexPantsView from '@/views/shop/Unisex/Pants/UnisexPantsView.vue'
import UnisexColoniesView from '@/views/shop/Unisex/Colonies/UnisexColoniesView.vue'
import UnisexCoatsView from '@/views/shop/Unisex/Coats/UnisexCoatsView.vue'
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
      name: 'men', 
      component: MenShopView,
    },
    {
      path: '/shop/men/t-shirt',
      name: 'men-tshirt', 
      component: MenTShirtView,
    },
    {
      path: '/shop/men/Shoes',
      name: 'men-shoes', 
      component: MenShoesView,
    },
    {
      path: '/shop/men/Colonies',
      name: 'men-colonies', 
      component: MenColoniesView,
    },
    {
      path: '/shop/men/Pants',
      name: 'men-pants', 
      component: MenPantsView,
    },
    {
      path: '/shop/men/Coats',
      name: 'men-coats', 
      component: MenCoatsView,
    },
    {
      path: '/shop/Unisex/T-Shirt',
      name: 'men-tshirt', 
      component: UnisexTShirtView,
    },
    {
      path: '/shop/Unisex/Shoes',
      name: 'men-shoes', 
      component: UnisexShoesView,
    },
    {
      path: '/shop/Unisex/Pants',
      name: 'men-pants', 
      component: UnisexPantsView,
    },
    {
      path: '/shop/Unisex/Colonies',
      name: 'men-colonies', 
      component: UnisexColoniesView,
    },
    {
      path: '/shop/Unisex/Coats',
      name: 'men-coats', 
      component: UnisexCoatsView,
    },
    {
      path: '/shop/Women/T-Shirt',
      name: 'men-tshirt', 
      component: WomenTShirtView,
    },
    {
      path: '/shop/Women/Shoes',
      name: 'men-shoes', 
      component: WomenShoesView,
    },
    {
      path: '/shop/Women/Pants',
      name: 'men-pants', 
      component: WomenPantsView,
    },
    {
      path: '/shop/Women/Colonies',
      name: 'men-colonies', 
      component: WomenColoniesView,
    },
    {
      path: '/shop/Women/Coats',
      name: 'men-coats', 
      component: WomenCoatsView,
    },
    {
      path: '/shop/kid',
      name: 'men-coats', 
      component: KidShopView,
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