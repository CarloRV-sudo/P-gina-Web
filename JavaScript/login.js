const appLogin = Vue.createApp({
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

        limpiarFormulario() {
            this.email = '';
            this.password = '';
            this.mensajeExito = '';
            this.errores = {
                email: '',
                password: ''
            };
        }
    }
});

appLogin.mount('#app-login');