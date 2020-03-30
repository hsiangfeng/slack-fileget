import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';

import timestampFilter from './filter/timestamp';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.component('loading', Loading);

Vue.use(VueAxios, axios);
Vue.filter('timestamp', timestampFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
