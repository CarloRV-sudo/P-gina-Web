const appNav = Vue.createApp({
    data() {
        return {
            links: [
                { texto: 'Inicio', href: 'index.html' },
                { texto: 'Misión', href: 'mision.html' },
                { texto: 'Visión', href: 'vision.html' },
                { texto: 'Catálogo', href: 'catalogo.html' },
                { texto: 'Contacto', href: 'contacto.html' },
                { texto: 'Inicio de sesión', href: 'login.html' }
            ]
        };
    },
    methods: {
        navegar(event, href) {
            event.preventDefault();
            window.location.href = href;
        }
    }
});

appNav.mount('#app-nav');