const appInfo = Vue.createApp({
    data() {
        return {
            verMas: false,
            textoCompleto: `Café Santa Rosa es una cafetería pensada para quienes disfrutan de un ambiente tranquilo, un buen café y una experiencia agradable. Nuestro objetivo es crear un espacio cómodo para estudiantes, trabajadores y personas que desean relajarse mientras disfrutan de bebidas y postres de calidad.`
        };
    },

    computed: {
        textoMostrado() {
            if (this.verMas) {
                return this.textoCompleto;
            }
            return this.textoCompleto.substring(0, 120) + '...';
        }
    },

    methods: {
        toggleTexto() {
            this.verMas = !this.verMas;
        }
    }
});

appInfo.mount('#app-info');