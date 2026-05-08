Vue.createApp({
    data() {
        return {
            productos: [],
            cargando: true,
            mensaje: '',
            tipoMensaje: '',

            alta: {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: '',
                imagen: null
            },

            mod: {
                id_producto: '',
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: '',
                imagen: ''
            },

            del: {
                id_producto: ''
            },

            erroresAlta: {},
            erroresMod: {},
            erroresDel: {}
        };
    },

    methods: {
        mostrarMensaje(texto, tipo) {
            this.mensaje = texto;
            this.tipoMensaje = tipo;

            setTimeout(() => {
                this.mensaje = '';
                this.tipoMensaje = '';
            }, 3500);
        },

        obtenerProductos() {
            this.cargando = true;

            fetch('api/obtener_productos.php')
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.productos = datos.data;
                    } else {
                        this.mostrarMensaje('No se pudieron cargar los productos.', 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error de conexión al obtener productos.', 'error');
                })
                .finally(() => {
                    this.cargando = false;
                });
        },

        validarAlta() {
            this.erroresAlta = {};
            let valido = true;

            if (!this.alta.nombre.trim()) {
                this.erroresAlta.nombre = 'El nombre es obligatorio.';
                valido = false;
            }

            if (!this.alta.categoria.trim()) {
                this.erroresAlta.categoria = 'La categoría es obligatoria.';
                valido = false;
            }

            if (!this.alta.precio || Number(this.alta.precio) <= 0) {
                this.erroresAlta.precio = 'El precio debe ser mayor a 0.';
                valido = false;
            }

            if (!this.alta.descripcion.trim()) {
                this.erroresAlta.descripcion = 'La descripción es obligatoria.';
                valido = false;
            }

            if (!this.alta.imagen) {
                this.erroresAlta.imagen = 'Debes seleccionar una imagen.';
                valido = false;
            }

            return valido;
        },

        validarModificacion() {
            this.erroresMod = {};
            let valido = true;

            if (!this.mod.id_producto) {
                this.erroresMod.id_producto = 'El ID del producto es obligatorio.';
                valido = false;
            }

            if (!this.mod.nombre.trim()) {
                this.erroresMod.nombre = 'El nombre es obligatorio.';
                valido = false;
            }

            if (!this.mod.categoria.trim()) {
                this.erroresMod.categoria = 'La categoría es obligatoria.';
                valido = false;
            }

            if (!this.mod.precio || Number(this.mod.precio) <= 0) {
                this.erroresMod.precio = 'El precio debe ser mayor a 0.';
                valido = false;
            }

            if (!this.mod.descripcion.trim()) {
                this.erroresMod.descripcion = 'La descripción es obligatoria.';
                valido = false;
            }

            if (!this.mod.imagen.trim()) {
                this.erroresMod.imagen = 'La ruta de la imagen es obligatoria.';
                valido = false;
            }

            return valido;
        },

        validarEliminacion() {
            this.erroresDel = {};
            let valido = true;

            if (!this.del.id_producto) {
                this.erroresDel.id_producto = 'El ID del producto es obligatorio.';
                valido = false;
            }

            return valido;
        },

        registrarProducto(event) {
            event.preventDefault();

            if (!this.validarAlta()) {
                return;
            }

            const formData = new FormData();
            formData.append('nombre', this.alta.nombre);
            formData.append('categoria', this.alta.categoria);
            formData.append('precio', this.alta.precio);
            formData.append('descripcion', this.alta.descripcion);
            formData.append('imagen', this.alta.imagen);

            fetch('api/registrar_producto.php', {
                method: 'POST',
                body: formData
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');

                        this.alta = {
                            nombre: '',
                            categoria: '',
                            precio: '',
                            descripcion: '',
                            imagen: null
                        };

                        const inputImagen = document.getElementById('alta-imagen');
                        if (inputImagen) {
                            inputImagen.value = '';
                        }

                        this.obtenerProductos();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al registrar producto.', 'error');
                });
        },

        cargarProductoParaEditar(producto) {
            this.mod = {
                id_producto: producto.id_producto,
                nombre: producto.nombre,
                categoria: producto.categoria,
                precio: producto.precio,
                descripcion: producto.descripcion,
                imagen: producto.imagen
            };

            this.mostrarMensaje('Producto cargado para modificación.', 'exito');
        },

        modificarProducto(event) {
            event.preventDefault();

            if (!this.validarModificacion()) {
                return;
            }

            fetch('api/modificar_producto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.mod)
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');

                        this.mod = {
                            id_producto: '',
                            nombre: '',
                            categoria: '',
                            precio: '',
                            descripcion: '',
                            imagen: ''
                        };

                        this.obtenerProductos();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al modificar producto.', 'error');
                });
        },

        eliminarProducto(event) {
            event.preventDefault();

            if (!this.validarEliminacion()) {
                return;
            }

            fetch('api/eliminar_producto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.del)
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');

                        this.del = {
                            id_producto: ''
                        };

                        this.obtenerProductos();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al eliminar producto.', 'error');
                });
        },

        limpiarAlta(event) {
            event.preventDefault();

            this.alta = {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: '',
                imagen: null
            };

            this.erroresAlta = {};

            const inputImagen = document.getElementById('alta-imagen');
            if (inputImagen) {
                inputImagen.value = '';
            }
        },

        limpiarModificacion(event) {
            event.preventDefault();

            this.mod = {
                id_producto: '',
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: '',
                imagen: ''
            };

            this.erroresMod = {};
        },

        limpiarEliminacion(event) {
            event.preventDefault();

            this.del = {
                id_producto: ''
            };

            this.erroresDel = {};
        },

        actualizarAltaNombre(event) {
            this.alta.nombre = event.target.value;
        },

        actualizarAltaCategoria(event) {
            this.alta.categoria = event.target.value;
        },

        actualizarAltaPrecio(event) {
            this.alta.precio = event.target.value;
        },

        actualizarAltaDescripcion(event) {
            this.alta.descripcion = event.target.value;
        },

        actualizarAltaImagen(event) {
            this.alta.imagen = event.target.files[0];
        },

        actualizarModId(event) {
            this.mod.id_producto = event.target.value;
        },

        actualizarModNombre(event) {
            this.mod.nombre = event.target.value;
        },

        actualizarModCategoria(event) {
            this.mod.categoria = event.target.value;
        },

        actualizarModPrecio(event) {
            this.mod.precio = event.target.value;
        },

        actualizarModDescripcion(event) {
            this.mod.descripcion = event.target.value;
        },

        actualizarModImagen(event) {
            this.mod.imagen = event.target.value;
        },

        actualizarDelId(event) {
            this.del.id_producto = event.target.value;
        }
    },

    mounted() {
        this.obtenerProductos();
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Administración de productos y servicios'),

            Vue.h(
                'p',
                {},
                'Módulo para registrar, modificar y eliminar productos almacenados en la base de datos.'
            ),

            this.mensaje
                ? Vue.h('p', {
                    class: this.tipoMensaje === 'exito' ? 'mensaje-exito-form' : 'mensaje-error'
                }, this.mensaje)
                : null,

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Productos registrados'),

                this.cargando
                    ? Vue.h('p', {}, 'Cargando productos...')
                    : Vue.h('table', { class: 'tabla-catalogo' }, [
                        Vue.h('thead', {}, [
                            Vue.h('tr', {}, [
                                Vue.h('th', {}, 'ID'),
                                Vue.h('th', {}, 'Nombre'),
                                Vue.h('th', {}, 'Categoría'),
                                Vue.h('th', {}, 'Precio'),
                                Vue.h('th', {}, 'Imagen'),
                                Vue.h('th', {}, 'Acción')
                            ])
                        ]),
                        Vue.h('tbody', {}, this.productos.map((producto) =>
                            Vue.h('tr', { key: producto.id_producto }, [
                                Vue.h('td', {}, producto.id_producto),
                                Vue.h('td', {}, producto.nombre),
                                Vue.h('td', {}, producto.categoria),
                                Vue.h('td', {}, `$${producto.precio}`),
                                Vue.h('td', {}, producto.imagen),
                                Vue.h('td', {}, [
                                    Vue.h('button', {
                                        type: 'button',
                                        onClick: () => this.cargarProductoParaEditar(producto)
                                    }, 'Editar')
                                ])
                            ])
                        ))
                    ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Alta de producto/servicio'),

                Vue.h('form', {
                    onSubmit: this.registrarProducto,
                    onReset: this.limpiarAlta,
                    novalidate: true
                }, [
                    Vue.h('label', { for: 'alta-nombre' }, 'Nombre:'),
                    Vue.h('input', {
                        id: 'alta-nombre',
                        type: 'text',
                        value: this.alta.nombre,
                        onInput: this.actualizarAltaNombre
                    }),
                    this.erroresAlta.nombre
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.nombre)
                        : null,

                    Vue.h('label', { for: 'alta-categoria' }, 'Categoría:'),
                    Vue.h('select', {
                        id: 'alta-categoria',
                        value: this.alta.categoria,
                        onChange: this.actualizarAltaCategoria
                    }, [
                        Vue.h('option', { value: '' }, 'Selecciona una opción'),
                        Vue.h('option', { value: 'Bebida' }, 'Bebida'),
                        Vue.h('option', { value: 'Postre' }, 'Postre'),
                        Vue.h('option', { value: 'Servicio' }, 'Servicio')
                    ]),
                    this.erroresAlta.categoria
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.categoria)
                        : null,

                    Vue.h('label', { for: 'alta-precio' }, 'Precio (MXN):'),
                    Vue.h('input', {
                        id: 'alta-precio',
                        type: 'number',
                        min: '0',
                        step: '0.01',
                        value: this.alta.precio,
                        onInput: this.actualizarAltaPrecio
                    }),
                    this.erroresAlta.precio
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.precio)
                        : null,

                    Vue.h('label', { for: 'alta-descripcion' }, 'Descripción:'),
                    Vue.h('textarea', {
                        id: 'alta-descripcion',
                        rows: '3',
                        value: this.alta.descripcion,
                        onInput: this.actualizarAltaDescripcion
                    }),
                    this.erroresAlta.descripcion
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.descripcion)
                        : null,

                    Vue.h('label', { for: 'alta-imagen' }, 'Imagen del producto:'),
                    Vue.h('input', {
                        id: 'alta-imagen',
                        type: 'file',
                        accept: 'image/png, image/jpeg, image/jpg, image/webp',
                        onChange: this.actualizarAltaImagen
                    }),
                    this.erroresAlta.imagen
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.imagen)
                        : null,

                    Vue.h('button', { type: 'submit' }, 'Guardar'),
                    Vue.h('button', { type: 'reset' }, 'Limpiar')
                ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Modificar producto/servicio'),

                Vue.h('form', {
                    onSubmit: this.modificarProducto,
                    onReset: this.limpiarModificacion,
                    novalidate: true
                }, [
                    Vue.h('label', { for: 'mod-id' }, 'ID del producto:'),
                    Vue.h('input', {
                        id: 'mod-id',
                        type: 'number',
                        value: this.mod.id_producto,
                        onInput: this.actualizarModId
                    }),
                    this.erroresMod.id_producto
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.id_producto)
                        : null,

                    Vue.h('label', { for: 'mod-nombre' }, 'Nombre:'),
                    Vue.h('input', {
                        id: 'mod-nombre',
                        type: 'text',
                        value: this.mod.nombre,
                        onInput: this.actualizarModNombre
                    }),
                    this.erroresMod.nombre
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.nombre)
                        : null,

                    Vue.h('label', { for: 'mod-categoria' }, 'Categoría:'),
                    Vue.h('input', {
                        id: 'mod-categoria',
                        type: 'text',
                        value: this.mod.categoria,
                        onInput: this.actualizarModCategoria
                    }),
                    this.erroresMod.categoria
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.categoria)
                        : null,

                    Vue.h('label', { for: 'mod-precio' }, 'Precio (MXN):'),
                    Vue.h('input', {
                        id: 'mod-precio',
                        type: 'number',
                        min: '0',
                        step: '0.01',
                        value: this.mod.precio,
                        onInput: this.actualizarModPrecio
                    }),
                    this.erroresMod.precio
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.precio)
                        : null,

                    Vue.h('label', { for: 'mod-descripcion' }, 'Descripción:'),
                    Vue.h('textarea', {
                        id: 'mod-descripcion',
                        rows: '3',
                        value: this.mod.descripcion,
                        onInput: this.actualizarModDescripcion
                    }),
                    this.erroresMod.descripcion
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.descripcion)
                        : null,

                    Vue.h('label', { for: 'mod-imagen' }, 'Ruta de imagen:'),
                    Vue.h('input', {
                        id: 'mod-imagen',
                        type: 'text',
                        value: this.mod.imagen,
                        onInput: this.actualizarModImagen
                    }),
                    this.erroresMod.imagen
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.imagen)
                        : null,

                    Vue.h('button', { type: 'submit' }, 'Actualizar'),
                    Vue.h('button', { type: 'reset' }, 'Limpiar')
                ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Eliminar producto/servicio'),

                Vue.h('form', {
                    onSubmit: this.eliminarProducto,
                    onReset: this.limpiarEliminacion,
                    novalidate: true
                }, [
                    Vue.h('label', { for: 'del-id' }, 'ID del producto a eliminar:'),
                    Vue.h('input', {
                        id: 'del-id',
                        type: 'number',
                        value: this.del.id_producto,
                        onInput: this.actualizarDelId
                    }),
                    this.erroresDel.id_producto
                        ? Vue.h('small', { class: 'mensaje-error' }, this.erroresDel.id_producto)
                        : null,

                    Vue.h('button', { type: 'submit' }, 'Eliminar'),
                    Vue.h('button', { type: 'reset' }, 'Limpiar')
                ])
            ])
        ]);
    }
}).mount('#app-admin');