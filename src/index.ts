import './reset.scss';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp({
  components: { App },
  template: '<App />',
});

app.mount('.js-app');
