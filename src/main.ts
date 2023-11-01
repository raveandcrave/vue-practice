import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import directives from '@/directives';

const pinia = createPinia();
const app = createApp(App);

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(pinia);
app.use(router);

app.mount('#app');
