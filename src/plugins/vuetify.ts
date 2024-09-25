import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importa los estilos globales
import { es } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  locale: {
    locale: 'es',
    messages: { es }
  },
  components,
  directives
})
