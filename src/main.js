import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.config.globalProperties.$http = axios
const token = JSON.parse(localStorage.getItem('data')).token
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}
