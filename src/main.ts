import './assets/main.css'

import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import vuetify from './plugins/vuetify'

// Composables
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
