import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import router from './router';

createApp(App).use(router).mount('#app')
