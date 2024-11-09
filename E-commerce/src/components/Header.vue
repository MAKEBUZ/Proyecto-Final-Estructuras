<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Header',
    setup() {
        const store = useStore();
        const isHovered = ref(false);
        const isMobileMenuOpen = ref(false);
        const isCartUpdating = ref(false);

        const totalItems = computed(() => store.getters.cartItemCount);

        watch(totalItems, () => {
            isCartUpdating.value = true;
            setTimeout(() => {
                isCartUpdating.value = false;
            }, 300);
        });

        const toggleHover = (value: boolean) => {
            isHovered.value = value;
        };

        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
            // Añadir/remover clase al body para prevenir scroll
            if (isMobileMenuOpen.value) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        return {
            isHovered,
            isMobileMenuOpen,
            isCartUpdating,
            totalItems,
            toggleHover,
            toggleMobileMenu
        };
    }
});
</script>

<template>
    <header class="header" :class="{ 'menu-open': isMobileMenuOpen }">
        <div class="header-container">
            <div class="logo">
                <img src="@/assets/Logo/Logo-cuaso.png" alt="E-Commerce Logo" class="logo-image" />
            </div>
            
            <button class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'is-active': isMobileMenuOpen }">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>

            <nav class="nav" :class="{ 'nav-open': isMobileMenuOpen }">
                <ul>
                    <li v-for="(item, index) in ['Home', 'Shop', 'About', 'Contact']" :key="index">
                        <a 
                            :href="item === 'Home' ? '/' : `/${item.toLowerCase()}`"
                            class="nav-link"
                            @click="toggleMobileMenu"
                        >
                            <span class="link-text">{{ item }}</span>
                            <span class="link-underline"></span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div 
                class="cart"
                @mouseenter="toggleHover(true)"
                @mouseleave="toggleHover(false)"
            >
                <a href="/cart" class="cart-link">
                    <img 
                        src="@/assets/Icons/shop.png" 
                        alt="Cart"
                        :class="{ 'cart-bounce': isHovered || isCartUpdating }"
                    />
                    <span 
                        v-if="totalItems > 0" 
                        class="cart-count" 
                        :class="{ 
                            'count-pulse': isHovered,
                            'count-update': isCartUpdating 
                        }"
                    >
                        {{ totalItems }}
                    </span>
                </a>
            </div>
        </div>
    </header>
</template>

<style lang="css">
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f4ece0;
    box-shadow: 0 2px 8px rgba(233, 225, 213, 0.5);
    z-index: 100;
    animation: slideDown 0.5s ease-out;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.logo-image {
    height: 50px;
    transition: transform 0.3s ease;
}

.logo-image:hover {
    transform: rotate(5deg) scale(1.05);
}

.mobile-menu-button {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 110;
}

.hamburger-line {
    width: 100%;
    height: 3px;
    background-color: #333333;
    transition: all 0.3s ease;
}

.mobile-menu-button.is-active .hamburger-line:nth-child(1) {
    transform: translateY(11px) rotate(45deg);
}

.mobile-menu-button.is-active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.mobile-menu-button.is-active .hamburger-line:nth-child(3) {
    transform: translateY(-11px) rotate(-45deg);
}

.nav ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
}

.nav-link {
    text-decoration: none;
    color: #333333;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
}

.link-text {
    position: relative;
    z-index: 1;
}

.link-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FF6F61;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #FF6F61;
}

.nav-link:hover .link-underline {
    width: 100%;
}

.cart {
    position: relative;
}

.cart-link {
    text-decoration: none;
    display: block;
    position: relative;
}

.cart img {
    height: 30px;
    transition: transform 0.3s ease;
}

.cart-bounce {
    animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #FF6F61;
    color: white;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    padding: 0 4px;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.count-pulse {
    animation: pulse 1s ease infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

/* Responsive Styles */
@media (max-width: 768px) {
    .header-container {
        padding: 0.75rem 1.5rem;
    }

    .mobile-menu-button {
        display: flex;
        margin-left: auto;
        margin-right: 1rem;
    }

    .nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background-color: #f4ece0;
        padding: 6rem 2rem 2rem 2rem;
        transition: transform 0.3s ease;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    }

    .nav-open {
        transform: translateX(-100%);
    }

    .nav ul {
        flex-direction: column;
        gap: 2rem;
    }

    .nav-link {
        font-size: 1.2rem;
        display: block;
        padding: 0.5rem 0;
    }

    .cart {
        margin-left: 0;
    }

    .menu-open .hamburger-line {
        background-color: #333333;
    }
}

@media (max-width: 480px) {
    .header-container {
        padding: 0.75rem 1rem;
    }

    .logo-image {
        height: 40px;
    }

    .nav {
        width: 85%;
    }
}
</style>