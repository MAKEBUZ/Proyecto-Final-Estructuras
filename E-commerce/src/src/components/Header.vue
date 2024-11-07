<script>
export default {
    name: 'Header',
    data() {
        return {
            cartCount: 0,
        };
    },
};
</script>

<template>
    <header class="header">
        <div class="logo">
            <img src="@/assets/Logo/Logo-cuaso.png" alt="E-Commerce Logo" />
        </div>
        <nav class="nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        <div class="cart">
            <a href="/cart">
                <img src="@/assets/Icons/shop.png" alt="Cart" />
                <span class="cart-count">{{ cartCount }}</span>
            </a>
        </div>
    </header>
</template>

<style lang="css">
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f4ece0;
    border-bottom: 1px solid #E9E1D5;
    z-index: 100;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header.scrolled {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
    height: 50px;
}

.nav ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
}

.nav a {
    text-decoration: none;
    color: #333333;
    transition: color 0.3s ease;
}

.nav a:hover {
    color: #FF6F61;
}

.cart {
    position: relative;
    cursor: pointer;
}

.cart img {
    height: 30px;
    transition: transform 0.3s ease;
}

.cart:hover img {
    transform: scale(1.1);
}

.cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #FF6F61;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
}
</style>