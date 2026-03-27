const appDestacados = Vue.createApp({
    data() {
        return {
            busqueda: '',
            productos: [
                {
                    nombre: "Latte Vainilla",
                    descripcion: "Bebida suave y cremosa con un toque dulce de vainilla.",
                    imagen: "assets/latteVainilla.jpg"
                },
                {
                    nombre: "Capuchino",
                    descripcion: "Espresso con espuma cremosa, ideal para cualquier momento del día.",
                    imagen: "assets/capuchino.png"
                },
                {
                    nombre: "Brownie",
                    descripcion: "Postre de chocolate con nuez, perfecto para acompañar tu café.",
                    imagen: "assets/brownie.jpg"
                }
            ]
        };
    },

    computed: {
        productosFiltrados() {
            return this.productos.filter(producto =>
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
    }
});

appDestacados.mount('#app-destacados');