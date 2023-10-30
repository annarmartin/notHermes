import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Modal } from 'flowbite'
import App from './App.vue'

import './assets/main.css'
import './index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

const modal = new Modal($targetEl, options);