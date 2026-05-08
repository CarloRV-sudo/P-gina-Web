Vue.createApp({
    data() {
        return {
            links: [
                { texto: 'Inicio', href: 'index.html' },
                { texto: 'Misión', href: 'mision.html' },
                { texto: 'Visión', href: 'vision.html' },
                { texto: 'Catálogo', href: 'catalogo.html' },
                { texto: 'Contacto', href: 'contacto.html' },
                { texto: 'Inicio de sesión', href: 'login.html' },
                { texto: 'Admin productos', href: 'admin-productos.html' },
                { texto: 'Admin usuarios', href: 'admin-usuarios.html' }
            ]
        };
    },

    methods: {
        navegar(event, href) {
            event.preventDefault();
            window.location.href = href;
        }
    },

    render() {
        return Vue.h(
            'div',
            {},
            this.links.map((link, index) =>
                Vue.h(
                    'a',
                    {
                        href: link.href,
                        key: index,
                        onClick: (event) => this.navegar(event, link.href)
                    },
                    link.texto
                )
            )
        );
    }
}).mount('#app-nav');