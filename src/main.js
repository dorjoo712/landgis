import Vue from "vue";
import App from "./App.vue";
import router from './router/index';
import store from './plugins/store';
import "./plugins/vuetify";
import "./plugins/base";
import * as filters from './service/filter'

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export { router, store }