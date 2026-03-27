Vue.createApp({
    data() {
        return {
            busqueda: '',
            productos: [
                {
                    nombre: 'Latte Vainilla',
                    descripcion: 'Bebida suave y cremosa con un toque dulce de vainilla.',
                    imagen: 'assets/latteVainilla.jpg'
                },
                {
                    nombre: 'Capuchino',
                    descripcion: 'Espresso con espuma cremosa, ideal para cualquier momento del día.',
                    imagen: 'assets/capuchino.png'
                },
                {
                    nombre: 'Brownie',
                    descripcion: 'Postre de chocolate con nuez, perfecto para acompañar tu café.',
                    imagen: 'assets/brownie.jpg'
                }
            ]
        };
    },

    computed: {
        productosFiltrados() {
            return this.productos.filter((producto) =>
                producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
            );
        },

        mensajeResultados() {
            const total = this.productosFiltrados.length;

            if (total === 0) {
                return 'No se encontraron productos.';
            }

            if (total === 1) {
                return 'Mostrando 1 producto.';
            }

            return `Mostrando ${total} productos.`;
        }
    },

    methods: {
        actualizarBusqueda(event) {
            this.busqueda = event.target.value;
        }
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Productos destacados'),

            Vue.h('input', {
                type: 'text',
                value: this.busqueda,
                placeholder: 'Buscar producto...',
                onInput: this.actualizarBusqueda,
                style: {
                    marginBottom: '20px',
                    padding: '8px',
                    width: '100%',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                }
            }),

            Vue.h(
                'p',
                {
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }
                },
                this.mensajeResultados
            ),

            Vue.h(
                'div',
                { class: 'cards-destacados' },
                this.productosFiltrados.map((producto, index) =>
                    Vue.h('article', { class: 'card-destacado', key: index }, [
                        Vue.h('img', {
                            src: producto.imagen,
                            alt: producto.nombre
                        }),
                        Vue.h('h3', {}, producto.nombre),
                        Vue.h('p', {}, producto.descripcion)
                    ])
                )
            )
        ]);
    }
}).mount('#app-destacados');