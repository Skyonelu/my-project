import { createApp } from 'vue'
import App from './App.vue'
import MapComponent from './MapComponent.vue'

const app = createApp(App)
app.component('MapComponent', MapComponent)
app.mount('#app')
