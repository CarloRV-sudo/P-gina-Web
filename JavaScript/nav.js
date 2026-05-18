Vue.createApp({
    data() {
        return {
            logueado: false,
            usuario: null,

            linksPublicos: [
                { texto: 'Inicio', href: 'index.html' },
                { texto: 'Misión', href: 'mision.html' },
                { texto: 'Visión', href: 'vision.html' },
                { texto: 'Catálogo', href: 'catalogo.html' },
                { texto: 'Contacto', href: 'contacto.html' },
                { texto: 'Inicio de sesión', href: 'login.html' }
            ],

            linksAdmin: [
                { texto: 'Admin productos', href: 'admin-productos.html' },
                { texto: 'Admin usuarios', href: 'admin-usuarios.html' }
            ]
        };
    },

    computed: {
        linksVisibles() {
            if (this.logueado && this.usuario && this.usuario.rol === 'Administrador') {
                return [
                    { texto: 'Inicio', href: 'index.html' },
                    { texto: 'Misión', href: 'mision.html' },
                    { texto: 'Visión', href: 'vision.html' },
                    { texto: 'Catálogo', href: 'catalogo.html' },
                    { texto: 'Contacto', href: 'contacto.html' },
                    ...this.linksAdmin
                ];
            }

            return this.linksPublicos;
        }
    },

    methods: {
        verificarSesion() {
            fetch('api/verificar_sesion.php')
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    this.logueado = datos.logueado;
                    this.usuario = datos.usuario;

                    window.dispatchEvent(new CustomEvent('sesion-actualizada', {
                        detail: {
                            logueado: this.logueado,
                            usuario: this.usuario
                        }
                    }));
                })
                .catch(() => {
                    this.logueado = false;
                    this.usuario = null;

                    window.dispatchEvent(new CustomEvent('sesion-actualizada', {
                        detail: {
                            logueado: false,
                            usuario: null
                        }
                    }));
                });
        },

        navegar(event, href) {
            event.preventDefault();
            window.location.href = href;
        }
    },

    mounted() {
        this.verificarSesion();
    },

    render() {
        return Vue.h(
            'div',
            { class: 'nav-links' },
            this.linksVisibles.map((link, index) =>
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


/* Bloque independiente para mostrar usuario y cerrar sesión */
const contenedorSesion = document.createElement('div');
contenedorSesion.id = 'app-session';
document.body.appendChild(contenedorSesion);

Vue.createApp({
    data() {
        return {
            logueado: false,
            usuario: null
        };
    },

    methods: {
        cerrarSesion() {
            fetch('api/cerrar_sesion.php')
                .then((respuesta) => respuesta.json())
                .then(() => {
                    sessionStorage.removeItem('usuario');
                    window.location.href = 'login.html';
                })
                .catch(() => {
                    window.location.href = 'login.html';
                });
        }
    },

    mounted() {
        window.addEventListener('sesion-actualizada', (event) => {
            this.logueado = event.detail.logueado;
            this.usuario = event.detail.usuario;
        });
    },

    render() {
        if (!this.logueado || !this.usuario) {
            return null;
        }

        return Vue.h('div', { class: 'usuario-sesion-fijo' }, [
            Vue.h('span', {}, `${this.usuario.nombre} | ${this.usuario.rol}`),
            Vue.h(
                'button',
                {
                    type: 'button',
                    class: 'btn-cerrar-sesion',
                    onClick: this.cerrarSesion
                },
                'Cerrar sesión'
            )
        ]);
    }
}).mount('#app-session');