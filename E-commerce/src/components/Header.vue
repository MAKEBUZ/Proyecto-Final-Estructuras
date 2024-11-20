<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Header',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isHovered = ref(false);
        const isMobileMenuOpen = ref(false);
        const isCartUpdating = ref(false);
        const loginStatus = ref(false);

        const totalItems = computed(() => store.getters.cartItemCount);
        
        const isLoggedIn = computed(() => {
            const session = localStorage.getItem('session');
            return loginStatus.value || !!session;
        });

        const navItems = computed(() => {
            const items = ['Home', 'Shop', 'About', 'Contact'];
            if (!isLoggedIn.value) {
                items.push('Admin');
            }
            return items;
        });

        const handleLoginStatusChange = () => {
            loginStatus.value = true;
        };

        const handleLogoutStatusChange = () => {
            loginStatus.value = false;
        };

        onMounted(() => {
            window.addEventListener('login-status-changed', handleLoginStatusChange);
            window.addEventListener('logout-status-changed', handleLogoutStatusChange);

            const session = localStorage.getItem('session');
            if (session) {
                loginStatus.value = true;
            }
        });

        onUnmounted(() => {
            window.removeEventListener('login-status-changed', handleLoginStatusChange);
            window.removeEventListener('logout-status-changed', handleLogoutStatusChange);
        });

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
            if (isMobileMenuOpen.value) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        const handleLogout = () => {
            localStorage.removeItem('session');
            loginStatus.value = false;

            const event = new CustomEvent('logout-status-changed');
            window.dispatchEvent(event);
            
            router.push('/');
            toggleMobileMenu();
        };

        const getUserName = computed(() => {
            const session = localStorage.getItem('session');
            if (session) {
                const userData = JSON.parse(session);
                return userData.username;
            }
            return '';
        });

        return {
            isHovered,
            isMobileMenuOpen,
            isCartUpdating,
            totalItems,
            isLoggedIn,
            navItems,
            getUserName,
            toggleHover,
            toggleMobileMenu,
            handleLogout
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
                <ul class="nav-list">
                    <!-- Elementos de navegación normales -->
                    <li v-for="(item, index) in navItems" :key="index" class="nav-item">
                        <a 
                            :href="item === 'Home' ? '/' : `/${item.toLowerCase()}`"
                            class="nav-link"
                            @click="toggleMobileMenu"
                        >
                            <span class="link-text">{{ item }}</span>
                            <span class="link-underline"></span>
                        </a>
                    </li>
                    
                    <!-- Opciones de administrador cuando está logueado -->
                    <template v-if="isLoggedIn">
                        <li class="nav-item">
                            <a 
                                href="/admin/manager"
                                class="nav-link admin-link"
                                @click="toggleMobileMenu"
                            >
                                <span class="link-text">Admin</span>
                                <span class="link-underline"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <button 
                                @click="handleLogout" 
                                class="nav-link logout-button"
                            >
                                <span class="link-text">Cerrar Sesión ({{ getUserName }})</span>
                                <span class="link-underline"></span>
                            </button>
                        </li>
                    </template>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.header {
    font-family: 'Poppins', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #F4ECE0;
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
.nav-list {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    align-items: center;
    height: 100%;
}
.nav-item {
    height: 100%;
    display: flex;
    align-items: center;
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
    height: 100%;
    display: flex;
    align-items: center;
}

.admin-link,
.logout-button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem 0;
    color: #333333;
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
}

.logout-button {
    color: #BE8151;
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
    background-color: #BE8151;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #BE8151;
}

.nav-link:hover .link-underline {
    width: 100%;
}

.cart {
    position: relative;
    display: flex;
    align-items: center;
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
    background-color: #BE8151;
    color: #ffffff;
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
        background-color: #F4ECE0;
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

.admin-link,
.logout-button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem 0;
    color: #333333;
    display: inline-flex;
    align-items: center;
    width: 100%;
    text-decoration: none;
}

.logout-button {
    color: #BE8151;
}

.admin-link:hover,
.logout-button:hover {
    color: #BE8151;
}

@media (max-width: 768px) {
    .admin-link,
    .logout-button {
        font-size: 1.2rem;
        padding: 0.5rem 0;
    }
}

</style>