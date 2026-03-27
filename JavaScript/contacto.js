Vue.createApp({
    data() {
        return {
            nombre: '',
            correo: '',
            mensaje: '',
            mensajeExito: '',
            errores: {
                nombre: '',
                correo: '',
                mensaje: ''
            }
        };
    },

    methods: {
        validarCorreo(correo) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(correo);
        },

        validarFormulario() {
            this.errores = {
                nombre: '',
                correo: '',
                mensaje: ''
            };

            let valido = true;

            if (!this.nombre.trim()) {
                this.errores.nombre = 'El nombre es obligatorio.';
                valido = false;
            } else if (this.nombre.trim().length < 3) {
                this.errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
                valido = false;
            }

            if (!this.correo.trim()) {
                this.errores.correo = 'El correo es obligatorio.';
                valido = false;
            } else if (!this.validarCorreo(this.correo.trim())) {
                this.errores.correo = 'Ingresa un correo válido.';
                valido = false;
            }

            if (!this.mensaje.trim()) {
                this.errores.mensaje = 'El mensaje es obligatorio.';
                valido = false;
            } else if (this.mensaje.trim().length < 10) {
                this.errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
                valido = false;
            }

            return valido;
        },

        enviarFormulario(event) {
            event.preventDefault();
            this.mensajeExito = '';

            if (!this.validarFormulario()) {
                return;
            }

            this.mensajeExito = 'Formulario enviado correctamente.';
            this.nombre = '';
            this.correo = '';
            this.mensaje = '';
        },

        actualizarNombre(event) {
            this.nombre = event.target.value;
        },

        actualizarCorreo(event) {
            this.correo = event.target.value;
        },

        actualizarMensaje(event) {
            this.mensaje = event.target.value;
        }
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h3', {}, 'Realiza tu pedido!!'),

            Vue.h(
                'form',
                {
                    novalidate: true,
                    onSubmit: this.enviarFormulario
                },
                [
                    Vue.h('label', { for: 'nombre' }, 'Nombre:'),
                    Vue.h('br'),
                    Vue.h('input', {
                        id: 'nombre',
                        name: 'nombre',
                        type: 'text',
                        value: this.nombre,
                        onInput: this.actualizarNombre
                    }),
                    this.errores.nombre
                        ? Vue.h('small', { class: 'mensaje-error' }, this.errores.nombre)
                        : null,
                    Vue.h('br'),
                    Vue.h('br'),

                    Vue.h('label', { for: 'correo' }, 'Correo:'),
                    Vue.h('br'),
                    Vue.h('input', {
                        id: 'correo',
                        name: 'correo',
                        type: 'email',
                        value: this.correo,
                        onInput: this.actualizarCorreo
                    }),
                    this.errores.correo
                        ? Vue.h('small', { class: 'mensaje-error' }, this.errores.correo)
                        : null,
                    Vue.h('br'),
                    Vue.h('br'),

                    Vue.h('label', { for: 'mensaje' }, 'Mensaje:'),
                    Vue.h('br'),
                    Vue.h('textarea', {
                        id: 'mensaje',
                        name: 'mensaje',
                        rows: '4',
                        value: this.mensaje,
                        onInput: this.actualizarMensaje
                    }),
                    this.errores.mensaje
                        ? Vue.h('small', { class: 'mensaje-error' }, this.errores.mensaje)
                        : null,
                    Vue.h('br'),
                    Vue.h('br'),

                    Vue.h('button', { type: 'submit' }, 'Enviar')
                ]
            ),

            this.mensajeExito
                ? Vue.h('p', { class: 'mensaje-exito-form' }, this.mensajeExito)
                : null
        ]);
    }
}).mount('#app-contacto');