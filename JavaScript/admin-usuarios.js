Vue.createApp({
    data() {
        return {
            usuarios: [],
            cargando: true,
            mensaje: '',
            tipoMensaje: '',

            nuevoUsuario: {
                nombre: '',
                correo: '',
                password: '',
                id_rol: ''
            },

            usuarioEditar: {
                id_usuario: '',
                nombre: '',
                correo: '',
                password: '',
                id_rol: ''
            },

            idEliminar: '',

            roles: [
                { id_rol: 1, nombre_rol: 'Administrador' },
                { id_rol: 2, nombre_rol: 'Empleado' },
                { id_rol: 3, nombre_rol: 'Cliente' }
            ]
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

        obtenerUsuarios() {
            this.cargando = true;

            fetch('api/obtener_usuarios.php')
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.usuarios = datos.data;
                    } else {
                        this.mostrarMensaje('No se pudieron cargar los usuarios.', 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error de conexión al obtener usuarios.', 'error');
                })
                .finally(() => {
                    this.cargando = false;
                });
        },

        registrarUsuario(event) {
            event.preventDefault();

            fetch('api/registrar_usuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.nuevoUsuario)
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');
                        this.nuevoUsuario = {
                            nombre: '',
                            correo: '',
                            password: '',
                            id_rol: ''
                        };
                        this.obtenerUsuarios();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al registrar usuario.', 'error');
                });
        },

        cargarUsuarioParaEditar(usuario) {
            let idRol = '';

            if (usuario.nombre_rol === 'Administrador') {
                idRol = 1;
            } else if (usuario.nombre_rol === 'Empleado') {
                idRol = 2;
            } else if (usuario.nombre_rol === 'Cliente') {
                idRol = 3;
            }

            this.usuarioEditar = {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                password: '',
                id_rol: idRol
            };

            this.mostrarMensaje('Usuario cargado para edición.', 'exito');
        },

        modificarUsuario(event) {
            event.preventDefault();

            fetch('api/modificar_usuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.usuarioEditar)
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');
                        this.usuarioEditar = {
                            id_usuario: '',
                            nombre: '',
                            correo: '',
                            password: '',
                            id_rol: ''
                        };
                        this.obtenerUsuarios();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al modificar usuario.', 'error');
                });
        },

        eliminarUsuario(event) {
            event.preventDefault();

            fetch('api/eliminar_usuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario: this.idEliminar
                })
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    if (datos.success) {
                        this.mostrarMensaje(datos.message, 'exito');
                        this.idEliminar = '';
                        this.obtenerUsuarios();
                    } else {
                        this.mostrarMensaje(datos.message, 'error');
                    }
                })
                .catch(() => {
                    this.mostrarMensaje('Error al eliminar usuario.', 'error');
                });
        },

        actualizarNuevoNombre(event) {
            this.nuevoUsuario.nombre = event.target.value;
        },

        actualizarNuevoCorreo(event) {
            this.nuevoUsuario.correo = event.target.value;
        },

        actualizarNuevoPassword(event) {
            this.nuevoUsuario.password = event.target.value;
        },

        actualizarNuevoRol(event) {
            this.nuevoUsuario.id_rol = event.target.value;
        },

        actualizarEditarId(event) {
            this.usuarioEditar.id_usuario = event.target.value;
        },

        actualizarEditarNombre(event) {
            this.usuarioEditar.nombre = event.target.value;
        },

        actualizarEditarCorreo(event) {
            this.usuarioEditar.correo = event.target.value;
        },

        actualizarEditarPassword(event) {
            this.usuarioEditar.password = event.target.value;
        },

        actualizarEditarRol(event) {
            this.usuarioEditar.id_rol = event.target.value;
        },

        actualizarIdEliminar(event) {
            this.idEliminar = event.target.value;
        }
    },

    mounted() {
        this.obtenerUsuarios();
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Administración de usuarios'),

            Vue.h('p', {}, 'Módulo para registrar, modificar y eliminar usuarios de la página web.'),

            this.mensaje
                ? Vue.h('p', {
                    class: this.tipoMensaje === 'exito' ? 'mensaje-exito-form' : 'mensaje-error'
                }, this.mensaje)
                : null,

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Usuarios registrados'),

                this.cargando
                    ? Vue.h('p', {}, 'Cargando usuarios...')
                    : Vue.h('table', { class: 'tabla-catalogo' }, [
                        Vue.h('thead', {}, [
                            Vue.h('tr', {}, [
                                Vue.h('th', {}, 'ID'),
                                Vue.h('th', {}, 'Nombre'),
                                Vue.h('th', {}, 'Correo'),
                                Vue.h('th', {}, 'Rol'),
                                Vue.h('th', {}, 'Fecha de registro'),
                                Vue.h('th', {}, 'Acción')
                            ])
                        ]),
                        Vue.h('tbody', {}, this.usuarios.map((usuario) =>
                            Vue.h('tr', { key: usuario.id_usuario }, [
                                Vue.h('td', {}, usuario.id_usuario),
                                Vue.h('td', {}, usuario.nombre),
                                Vue.h('td', {}, usuario.correo),
                                Vue.h('td', {}, usuario.nombre_rol),
                                Vue.h('td', {}, usuario.fecha_registro),
                                Vue.h('td', {}, [
                                    Vue.h('button', {
                                        type: 'button',
                                        onClick: () => this.cargarUsuarioParaEditar(usuario)
                                    }, 'Editar')
                                ])
                            ])
                        ))
                    ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Registrar usuario'),

                Vue.h('form', { onSubmit: this.registrarUsuario, novalidate: true }, [
                    Vue.h('label', { for: 'reg-nombre' }, 'Nombre:'),
                    Vue.h('input', {
                        id: 'reg-nombre',
                        type: 'text',
                        value: this.nuevoUsuario.nombre,
                        onInput: this.actualizarNuevoNombre
                    }),

                    Vue.h('label', { for: 'reg-correo' }, 'Correo:'),
                    Vue.h('input', {
                        id: 'reg-correo',
                        type: 'email',
                        value: this.nuevoUsuario.correo,
                        onInput: this.actualizarNuevoCorreo
                    }),

                    Vue.h('label', { for: 'reg-password' }, 'Contraseña:'),
                    Vue.h('input', {
                        id: 'reg-password',
                        type: 'password',
                        value: this.nuevoUsuario.password,
                        onInput: this.actualizarNuevoPassword
                    }),

                    Vue.h('label', { for: 'reg-rol' }, 'Rol:'),
                    Vue.h('select', {
                        id: 'reg-rol',
                        value: this.nuevoUsuario.id_rol,
                        onChange: this.actualizarNuevoRol
                    }, [
                        Vue.h('option', { value: '' }, 'Selecciona un rol'),
                        this.roles.map((rol) =>
                            Vue.h('option', { value: rol.id_rol, key: rol.id_rol }, rol.nombre_rol)
                        )
                    ]),

                    Vue.h('button', { type: 'submit' }, 'Registrar')
                ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Modificar usuario'),

                Vue.h('form', { onSubmit: this.modificarUsuario, novalidate: true }, [
                    Vue.h('label', { for: 'edit-id' }, 'ID usuario:'),
                    Vue.h('input', {
                        id: 'edit-id',
                        type: 'number',
                        value: this.usuarioEditar.id_usuario,
                        onInput: this.actualizarEditarId
                    }),

                    Vue.h('label', { for: 'edit-nombre' }, 'Nombre:'),
                    Vue.h('input', {
                        id: 'edit-nombre',
                        type: 'text',
                        value: this.usuarioEditar.nombre,
                        onInput: this.actualizarEditarNombre
                    }),

                    Vue.h('label', { for: 'edit-correo' }, 'Correo:'),
                    Vue.h('input', {
                        id: 'edit-correo',
                        type: 'email',
                        value: this.usuarioEditar.correo,
                        onInput: this.actualizarEditarCorreo
                    }),

                    Vue.h('label', { for: 'edit-password' }, 'Nueva contraseña opcional:'),
                    Vue.h('input', {
                        id: 'edit-password',
                        type: 'password',
                        value: this.usuarioEditar.password,
                        onInput: this.actualizarEditarPassword
                    }),

                    Vue.h('label', { for: 'edit-rol' }, 'Rol:'),
                    Vue.h('select', {
                        id: 'edit-rol',
                        value: this.usuarioEditar.id_rol,
                        onChange: this.actualizarEditarRol
                    }, [
                        Vue.h('option', { value: '' }, 'Selecciona un rol'),
                        this.roles.map((rol) =>
                            Vue.h('option', { value: rol.id_rol, key: rol.id_rol }, rol.nombre_rol)
                        )
                    ]),

                    Vue.h('button', { type: 'submit' }, 'Modificar')
                ])
            ]),

            Vue.h('hr'),

            Vue.h('section', {}, [
                Vue.h('h3', {}, 'Eliminar usuario'),

                Vue.h('form', { onSubmit: this.eliminarUsuario, novalidate: true }, [
                    Vue.h('label', { for: 'del-id' }, 'ID usuario:'),
                    Vue.h('input', {
                        id: 'del-id',
                        type: 'number',
                        value: this.idEliminar,
                        onInput: this.actualizarIdEliminar
                    }),

                    Vue.h('button', { type: 'submit' }, 'Eliminar')
                ])
            ])
        ]);
    }
}).mount('#app-admin-usuarios');