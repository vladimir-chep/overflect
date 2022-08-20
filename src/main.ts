import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import '@/styles/main.scss';
import AppLayout from '@/layouts/AppLayout.vue';
import { onCheck } from '@/firebase/config';

onCheck.then((firebaseUser) => {
  console.log('firebaseUser', firebaseUser);

  if (firebaseUser) {
    // store.dispatch('auth/autoSignIn', firebaseUser);
  }
  createApp(App).use(router).component('AppLayout', AppLayout).mount('#app');
});
