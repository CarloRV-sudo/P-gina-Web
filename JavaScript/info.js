Vue.createApp({
    data() {
        return {
            verMas: false,
            textoCompleto: 'Café Santa Rosa es una cafetería pensada para quienes disfrutan de un ambiente tranquilo, un buen café y una experiencia agradable. Nuestro objetivo es crear un espacio cómodo para estudiantes, trabajadores y personas que desean relajarse mientras disfrutan de bebidas y postres de calidad.'
        };
    },

    computed: {
        textoMostrado() {
            if (this.verMas) {
                return this.textoCompleto;
            }
            return this.textoCompleto.substring(0, 120) + '...';
        },

        textoBoton() {
            return this.verMas ? 'Ver menos' : 'Ver más';
        }
    },

    methods: {
        toggleTexto() {
            this.verMas = !this.verMas;
        }
    },

    render() {
        return Vue.h('div', {}, [
            Vue.h('h2', {}, 'Sobre Café Santa Rosa'),
            Vue.h('p', {}, this.textoMostrado),
            Vue.h(
                'div',
                {
                    style: {
                        textAlign: 'center',
                        marginTop: '15px'
                    }
                },
                [
                    Vue.h(
                        'button',
                        {
                            type: 'button',
                            class: 'btn-principal',
                            onClick: () => this.toggleTexto()
                        },
                        this.textoBoton
                    )
                ]
            )
        ]);
    }
}).mount('#app-info');