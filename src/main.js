import { createApp } from 'vue'
import { Modal } from 'flowbite'
import App from './App.vue'

import './assets/main.css'
import './index.css'

createApp(App).mount('#app')

const modal = new Modal($targetEl, options);