import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import '@/styles/main.scss';
import AppLayout from '@/layouts/AppLayout.vue';

createApp(App).use(router).component('AppLayout', AppLayout).mount('#app');
