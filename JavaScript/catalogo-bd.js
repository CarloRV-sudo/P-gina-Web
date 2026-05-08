Vue.createApp({
    data() {
        return {
            productos: [],
            cargando: true,
            error: '',
            busqueda: ''
        };
    },

    computed: {
        productosFiltrados() {
            const texto = this.busqueda.toLowerCase().trim();

            return this.productos.filter((producto) =>
                producto.nombre.toLowerCase().includes(texto) ||
                producto.categoria.toLowerCase().includes(texto) ||
                producto.descripcion.toLowerCase().includes(texto)
            );
        },

        mensajeResultados() {
            if (this.cargando) {
                return 'Cargando productos...';
            }

            if (this.error) {
                return this.error;
            }

            if (this.productosFiltrados.length === 0) {
                return 'No se encontraron productos.';
            }

            if (this.productosFiltrados.length === 1) {
                return 'Mostrando 1 producto.';
            }

            return `Mostrando ${this.productosFiltrados.length} productos.`;
        }
    },

    methods: {
        obtenerProductos() {
            fetch('api/obtener_productos.php')
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.productos = datos.data;
                    } else {
                        this.error = 'No se pudieron cargar los productos.';
                    }
                })
                .catch(() => {
                    this.error = 'Error de conexión con el servidor.';
                })
                .finally(() => {
                    this.cargando = false;
                });
        },

        actualizarBusqueda(event) {
            this.busqueda = event.target.value;
        }
    },

    mounted() {
        this.obtenerProductos();
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Nuestro Catálogo'),

            Vue.h(
                'p',
                {
                    style: {
                        textAlign: 'center',
                        marginBottom: '20px'
                    }
                },
                'Conoce nuestros productos disponibles actualmente en la cafetería.'
            ),

            Vue.h(
                'div',
                {
                    style: {
                        maxWidth: '650px',
                        margin: '0 auto 25px auto'
                    }
                },
                [
                    Vue.h('input', {
                        type: 'text',
                        placeholder: 'Buscar por nombre, categoría o descripción...',
                        value: this.busqueda,
                        onInput: this.actualizarBusqueda,
                        style: {
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid #C69C85',
                            fontSize: '16px'
                        }
                    })
                ]
            ),

            Vue.h(
                'p',
                {
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '25px'
                    }
                },
                this.mensajeResultados
            ),

            Vue.h(
                'div',
                {},
                this.productosFiltrados.map((producto) =>
                    Vue.h(
                        'article',
                        {
                            class: 'producto-horizontal',
                            key: producto.id_producto
                        },
                        [
                            Vue.h('div', { class: 'producto-info' }, [
                                Vue.h('h4', {}, producto.nombre),
                                Vue.h('p', {}, producto.descripcion),
                                Vue.h('p', {}, [
                                    Vue.h('strong', {}, 'Categoría: '),
                                    producto.categoria
                                ]),
                                Vue.h('p', { class: 'precio' }, `$${producto.precio} MXN`)
                            ]),

                            Vue.h('div', { class: 'producto-imagen' }, [
                                Vue.h('img', {
                                    src: producto.imagen,
                                    alt: producto.nombre
                                })
                            ])
                        ]
                    )
                )
            )
        ]);
    }
}).mount('#app-catalogo');