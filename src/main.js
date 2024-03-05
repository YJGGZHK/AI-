import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
// 字体引入
import 'element-plus/dist/index.css'
import '@/assets/font/font.css'

createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
