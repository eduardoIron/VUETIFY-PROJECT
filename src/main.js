
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Tu archivo de rutas

// 1. IMPORTAR VUETIFY
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 2. CREAR INSTANCIA DE VUETIFY
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// 3. USAR VUETIFY (¡Sin esto, tu login falla!)
app.use(vuetify)
app.use(router)

app.mount('#app')