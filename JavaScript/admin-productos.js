Vue.createApp({
    data() {
        return {
            alta: {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            },
            mod: {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''
            },
            del: {
                id: ''
            },

            erroresAlta: {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            },
            erroresMod: {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''
            },
            erroresDel: {
                id: ''
            },

            mensajeAlta: '',
            mensajeMod: '',
            mensajeDel: ''
        };
    },

    methods: {
        validarId(id) {
            const regex = /^[A-Za-z]-\d{3}$/;
            return regex.test(id.trim());
        },

        validarAlta() {
            this.erroresAlta = {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            };

            let valido = true;

            if (!this.alta.nombre.trim()) {
                this.erroresAlta.nombre = 'El nombre es obligatorio.';
                valido = false;
            } else if (this.alta.nombre.trim().length < 3) {
                this.erroresAlta.nombre = 'El nombre debe tener al menos 3 caracteres.';
                valido = false;
            }

            if (!this.alta.categoria) {
                this.erroresAlta.categoria = 'Selecciona una categoría.';
                valido = false;
            }

            if (this.alta.precio === '' || this.alta.precio === null) {
                this.erroresAlta.precio = 'El precio es obligatorio.';
                valido = false;
            } else if (Number(this.alta.precio) <= 0) {
                this.erroresAlta.precio = 'El precio debe ser mayor a 0.';
                valido = false;
            }

            if (!this.alta.descripcion.trim()) {
                this.erroresAlta.descripcion = 'La descripción es obligatoria.';
                valido = false;
            } else if (this.alta.descripcion.trim().length < 10) {
                this.erroresAlta.descripcion = 'La descripción debe tener al menos 10 caracteres.';
                valido = false;
            }

            return valido;
        },

        validarModificacion() {
            this.erroresMod = {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''
            };

            let valido = true;

            if (!this.mod.id.trim()) {
                this.erroresMod.id = 'El ID es obligatorio.';
                valido = false;
            } else if (!this.validarId(this.mod.id)) {
                this.erroresMod.id = 'El ID debe tener formato como P-001.';
                valido = false;
            }

            if (!this.mod.nombre.trim() && !this.mod.precio && !this.mod.descripcion.trim()) {
                this.erroresMod.nombre = 'Debes capturar al menos un dato para actualizar.';
                valido = false;
            }

            if (this.mod.nombre.trim() && this.mod.nombre.trim().length < 3) {
                this.erroresMod.nombre = 'El nuevo nombre debe tener al menos 3 caracteres.';
                valido = false;
            }

            if (this.mod.precio !== '' && Number(this.mod.precio) <= 0) {
                this.erroresMod.precio = 'El nuevo precio debe ser mayor a 0.';
                valido = false;
            }

            if (this.mod.descripcion.trim() && this.mod.descripcion.trim().length < 10) {
                this.erroresMod.descripcion = 'La nueva descripción debe tener al menos 10 caracteres.';
                valido = false;
            }

            return valido;
        },

        validarEliminacion() {
            this.erroresDel = {
                id: ''
            };

            let valido = true;

            if (!this.del.id.trim()) {
                this.erroresDel.id = 'El ID es obligatorio.';
                valido = false;
            } else if (!this.validarId(this.del.id)) {
                this.erroresDel.id = 'El ID debe tener formato como P-001.';
                valido = false;
            }

            return valido;
        },

        guardarAlta(event) {
            event.preventDefault();
            this.mensajeAlta = '';

            if (!this.validarAlta()) {
                return;
            }

            this.mensajeAlta = 'Alta validada correctamente.';
        },

        guardarModificacion(event) {
            event.preventDefault();
            this.mensajeMod = '';

            if (!this.validarModificacion()) {
                return;
            }

            this.mensajeMod = 'Modificación validada correctamente.';
        },

        guardarEliminacion(event) {
            event.preventDefault();
            this.mensajeDel = '';

            if (!this.validarEliminacion()) {
                return;
            }

            this.mensajeDel = 'Eliminación validada correctamente.';
        },

        limpiarAlta(event) {
            event.preventDefault();
            this.alta = {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            };
            this.erroresAlta = {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            };
            this.mensajeAlta = '';
        },

        limpiarModificacion(event) {
            event.preventDefault();
            this.mod = {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''
            };
            this.erroresMod = {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''
            };
            this.mensajeMod = '';
        },

        limpiarEliminacion(event) {
            event.preventDefault();
            this.del = {
                id: ''
            };
            this.erroresDel = {
                id: ''
            };
            this.mensajeDel = '';
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

        actualizarModId(event) {
            this.mod.id = event.target.value;
        },

        actualizarModNombre(event) {
            this.mod.nombre = event.target.value;
        },

        actualizarModPrecio(event) {
            this.mod.precio = event.target.value;
        },

        actualizarModDescripcion(event) {
            this.mod.descripcion = event.target.value;
        },

        actualizarDelId(event) {
            this.del.id = event.target.value;
        }
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Administración de productos y servicios'),
            Vue.h(
                'p',
                {},
                'Esta página contiene formularios básicos para dar de alta, modificar y eliminar productos/servicios.'
            ),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Alta de producto/servicio'),
                Vue.h(
                    'form',
                    {
                        novalidate: true,
                        onSubmit: this.guardarAlta,
                        onReset: this.limpiarAlta
                    },
                    [
                        Vue.h('label', { for: 'alta-nombre' }, 'Nombre:'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'text',
                            id: 'alta-nombre',
                            name: 'alta-nombre',
                            value: this.alta.nombre,
                            onInput: this.actualizarAltaNombre
                        }),
                        this.erroresAlta.nombre
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.nombre)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'alta-categoria' }, 'Categoría:'),
                        Vue.h('br'),
                        Vue.h(
                            'select',
                            {
                                id: 'alta-categoria',
                                name: 'alta-categoria',
                                value: this.alta.categoria,
                                onChange: this.actualizarAltaCategoria
                            },
                            [
                                Vue.h('option', { value: '' }, 'Selecciona una opción'),
                                Vue.h('option', { value: 'bebida' }, 'Bebida'),
                                Vue.h('option', { value: 'postre' }, 'Pan/Postre'),
                                Vue.h('option', { value: 'servicio' }, 'Servicio')
                            ]
                        ),
                        this.erroresAlta.categoria
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.categoria)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'alta-precio' }, 'Precio (MXN):'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'number',
                            id: 'alta-precio',
                            name: 'alta-precio',
                            min: '0',
                            step: '0.01',
                            value: this.alta.precio,
                            onInput: this.actualizarAltaPrecio
                        }),
                        this.erroresAlta.precio
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.precio)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'alta-descripcion' }, 'Descripción:'),
                        Vue.h('br'),
                        Vue.h('textarea', {
                            id: 'alta-descripcion',
                            name: 'alta-descripcion',
                            rows: '3',
                            value: this.alta.descripcion,
                            onInput: this.actualizarAltaDescripcion
                        }),
                        this.erroresAlta.descripcion
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresAlta.descripcion)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('button', { type: 'submit' }, 'Guardar'),
                        Vue.h('button', { type: 'reset' }, 'Limpiar')
                    ]
                ),
                this.mensajeAlta
                    ? Vue.h('p', { class: 'mensaje-exito-form' }, this.mensajeAlta)
                    : null
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Modificar producto/servicio'),
                Vue.h(
                    'form',
                    {
                        novalidate: true,
                        onSubmit: this.guardarModificacion,
                        onReset: this.limpiarModificacion
                    },
                    [
                        Vue.h('label', { for: 'mod-id' }, 'ID del producto:'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'text',
                            id: 'mod-id',
                            name: 'mod-id',
                            placeholder: 'Ej: P-001',
                            value: this.mod.id,
                            onInput: this.actualizarModId
                        }),
                        this.erroresMod.id
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.id)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'mod-nombre' }, 'Nuevo nombre:'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'text',
                            id: 'mod-nombre',
                            name: 'mod-nombre',
                            value: this.mod.nombre,
                            onInput: this.actualizarModNombre
                        }),
                        this.erroresMod.nombre
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.nombre)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'mod-precio' }, 'Nuevo precio (MXN):'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'number',
                            id: 'mod-precio',
                            name: 'mod-precio',
                            min: '0',
                            step: '0.01',
                            value: this.mod.precio,
                            onInput: this.actualizarModPrecio
                        }),
                        this.erroresMod.precio
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.precio)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('label', { for: 'mod-descripcion' }, 'Nueva descripción:'),
                        Vue.h('br'),
                        Vue.h('textarea', {
                            id: 'mod-descripcion',
                            name: 'mod-descripcion',
                            rows: '3',
                            value: this.mod.descripcion,
                            onInput: this.actualizarModDescripcion
                        }),
                        this.erroresMod.descripcion
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresMod.descripcion)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('button', { type: 'submit' }, 'Actualizar'),
                        Vue.h('button', { type: 'reset' }, 'Limpiar')
                    ]
                ),
                this.mensajeMod
                    ? Vue.h('p', { class: 'mensaje-exito-form' }, this.mensajeMod)
                    : null
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Eliminar producto/servicio'),
                Vue.h(
                    'form',
                    {
                        novalidate: true,
                        onSubmit: this.guardarEliminacion,
                        onReset: this.limpiarEliminacion
                    },
                    [
                        Vue.h('label', { for: 'del-id' }, 'ID del producto a eliminar:'),
                        Vue.h('br'),
                        Vue.h('input', {
                            type: 'text',
                            id: 'del-id',
                            name: 'del-id',
                            placeholder: 'Ej: P-001',
                            value: this.del.id,
                            onInput: this.actualizarDelId
                        }),
                        this.erroresDel.id
                            ? Vue.h('small', { class: 'mensaje-error' }, this.erroresDel.id)
                            : null,
                        Vue.h('br'),
                        Vue.h('br'),

                        Vue.h('p', {}, [
                            Vue.h('strong', {}, 'Nota:'),
                            ' Esta acción es solo demostrativa (sin base de datos).'
                        ]),

                        Vue.h('button', { type: 'submit' }, 'Eliminar'),
                        Vue.h('button', { type: 'reset' }, 'Limpiar')
                    ]
                ),
                this.mensajeDel
                    ? Vue.h('p', { class: 'mensaje-exito-form' }, this.mensajeDel)
                    : null
            ])
        ]);
    }
}).mount('#app-admin');