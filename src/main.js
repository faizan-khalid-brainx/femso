import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/scss/bootstrap.scss'
import axios from 'axios'
import Echo from 'laravel-echo'

window.axios = axios
window.Pusher = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
  forceTLS: true
})

createApp(App).use(store).use(router).mount('#app')
