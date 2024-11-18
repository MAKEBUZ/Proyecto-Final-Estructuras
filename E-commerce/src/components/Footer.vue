<script lang="ts">
import { defineComponent } from 'vue';
defineComponent({
    name: 'IcBaselineFacebook',
});

export default defineComponent({
    name: 'Footer',
    data() {
        return {
            currentYear: new Date().getFullYear() as number
        }
    },
});
</script>
<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Nuestra Empresa</h3>
          <ul>
            <li><a href="/about">Sobre Nosotros</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Ayuda</h3>
          <ul>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Información</h3>
          <ul>
            <li><a href="/contact">e-commerce@gmail.com</a></li>
            <li><a href="/contact">+57 318478963</a></li>
            <div class="social-media-container">
                <ul class="social-media">
                    <li>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#fff" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#fff" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#fff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.github.com/MAKEBUZ" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                            </svg> 
                        </a>
                    </li>
                </ul>
            </div>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Tu E-commerce. Todos los derechos reservados.</p>
      </div>
    </footer>
</template>
  
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.footer {
    font-family: 'Poppins', sans-serif;
    background-color: #764836;
    color: #ffffff;
    padding: 3rem 0 1rem 0;
    font-family: Arial, sans-serif;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1000;
    margin: 0;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    width: 100%;
    box-sizing: border-box;
}

.footer-section {
    display: flex;
    flex-direction: column;
}

.footer-section h3 {
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #F4ECE0;
}

.footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-section ul li {
    margin-bottom: 0.8rem;
}

.footer-section a {
    color: #e8d6c0;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.footer-section a:hover {
    opacity: 0.8;
    color: #ffffff;
}

.social-media-container {
    width: 100%;
    margin-top: 1rem;
}

.social-media {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style: none;
}

.social-media li {
    margin: 0;
}

.social-media svg {
    width: 30px;
    height: 30px;
    display: block;
}

.social-media a {
    background-color: #BE8151;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.social-media a:hover {
    background-color: #B06D46;
}

.footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(232, 214, 192, 0.2);
    width: 100%;
}

.footer-bottom p {
    color: #d9bb98;
}

@media (max-width: 768px) {
    .footer {
        position: static;
        padding: 2rem 0 1rem 0;
    }

    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1.5rem;
    }

    .social-media {
        justify-content: center;
    }

    .footer-section {
        align-items: center;
    }
}

@media (max-width: 480px) {
    .footer-content {
        padding: 0 1rem;
    }

    .social-media {
        gap: 0.5rem;
    }

    .social-media svg {
        width: 25px;
        height: 25px;
    }
}
</style>