Vue.createApp({
    data() {
        return {
            email: '',
            password: '',
            mensajeExito: '',
            errores: {
                email: '',
                password: ''
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
                email: '',
                password: ''
            };

            let valido = true;

            if (!this.email.trim()) {
                this.errores.email = 'El correo es obligatorio.';
                valido = false;
            } else if (!this.validarCorreo(this.email.trim())) {
                this.errores.email = 'Ingresa un correo válido.';
                valido = false;
            }

            if (!this.password.trim()) {
                this.errores.password = 'La contraseña es obligatoria.';
                valido = false;
            } else if (this.password.trim().length < 6) {
                this.errores.password = 'La contraseña debe tener al menos 6 caracteres.';
                valido = false;
            }

            return valido;
        },

        iniciarSesion(event) {
            event.preventDefault();
            this.mensajeExito = '';

            if (!this.validarFormulario()) {
                return;
            }

            this.mensajeExito = 'Inicio de sesión válido.';
        },

        limpiarFormulario(event) {
            event.preventDefault();
            this.email = '';
            this.password = '';
            this.mensajeExito = '';
            this.errores = {
                email: '',
                password: ''
            };
        },

        actualizarEmail(event) {
            this.email = event.target.value;
        },

        actualizarPassword(event) {
            this.password = event.target.value;
        }
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h(
                'form',
                {
                    novalidate: true,
                    onSubmit: this.iniciarSesion,
                    onReset: this.limpiarFormulario
                },
                [
                    Vue.h('label', { for: 'email' }, 'Correo:'),
                    Vue.h('input', {
                        type: 'email',
                        id: 'email',
                        name: 'email',
                        placeholder: 'correo@ejemplo.com',
                        value: this.email,
                        onInput: this.actualizarEmail
                    }),
                    this.errores.email
                        ? Vue.h('small', { class: 'mensaje-error' }, this.errores.email)
                        : null,

                    Vue.h('label', { for: 'password' }, 'Contraseña:'),
                    Vue.h('input', {
                        type: 'password',
                        id: 'password',
                        name: 'password',
                        placeholder: '********',
                        value: this.password,
                        onInput: this.actualizarPassword
                    }),
                    this.errores.password
                        ? Vue.h('small', { class: 'mensaje-error' }, this.errores.password)
                        : null,

                    Vue.h('button', { type: 'submit' }, 'Entrar'),
                    Vue.h('button', { type: 'reset' }, 'Limpiar')
                ]
            ),

            this.mensajeExito
                ? Vue.h('p', { class: 'mensaje-exito-form' }, this.mensajeExito)
                : null
        ]);
    }
}).mount('#app-login');