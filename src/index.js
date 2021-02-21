import Vue from 'vue';
import App from './js/App.vue';

Vue.config.productionTip = false;

const app = document.createElement('div');

document.body.appendChild(app);
app.setAttribute('id', 'app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
