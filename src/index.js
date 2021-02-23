import Vue from 'vue';
import routes from './js/router.js';
import store from './js/store/store.js';
import App from './js/App.vue';

Vue.config.productionTip = false;

const app = document.createElement('div');

document.body.appendChild(app);
app.setAttribute('id', 'app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router: routes,
  store: store,
  template: '<App/>'
});
