const appContacto = Vue.createApp({
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
        }
    }
});

appContacto.mount('#app-contacto');