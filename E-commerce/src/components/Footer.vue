<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section about">
                    <h2 class="logo-text">E-Commerce</h2>
                    <p>
                        Your one-stop shop for all your needs. We offer a wide range of products at the best prices.
                    </p>
                </div>
                <div class="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section contact">
                    <h2>Contact Us</h2>
                    <ul>
                        <li><i class="fas fa-phone"></i> +123 456 789</li>
                        <li><i class="fas fa-envelope"></i> support@ecommerce.com</li>
                        <li><i class="fas fa-map-marker-alt"></i> 123 E-commerce St, City, Country</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2023 E-Commerce | Designed by YourName
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    background: #B0B0B0;
    color: #fff;
    padding: 10px 0; /* Reduced padding */
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
}

.footer .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.footer .footer-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.footer .footer-section {
    flex: 1;
    padding: 5px; /* Reduced padding */
}

.footer .logo-text {
    font-size: 20px; /* Reduced font size */
    font-weight: bold;
}

.footer .links ul {
    list-style: none;
    padding: 0;
}

.footer .links ul li {
    margin: 3px 0; /* Reduced margin */
}

.footer .links ul li a {
    color: #fff;
    text-decoration: none;
}

.footer .contact ul {
    list-style: none;
    padding: 0;
}

.footer .contact ul li {
    margin: 3px 0; /* Reduced margin */
}

.footer .contact ul li i {
    margin-right: 5px; /* Reduced margin */
}

.footer-bottom {
    margin-top: 10px; /* Reduced margin */
    font-size: 12px; /* Reduced font size */
}
</style>