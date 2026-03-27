const appAdmin = Vue.createApp({
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

        limpiarAlta() {
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

        limpiarModificacion() {
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

        limpiarEliminacion() {
            this.del = {
                id: ''
            };
            this.erroresDel = {
                id: ''
            };
            this.mensajeDel = '';
        }
    }
});

appAdmin.mount('#app-admin');