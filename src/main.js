import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import Preset from "./directives/Preset.js";
import Router from "./Router.js";
import store from "./store";

Vue.config.productionTip = false;

Vue.directive('preset', Preset)
Vue.use(BootstrapVue);

const app = new Vue({
  render: h => h(App),
  el: "#app",
  router: Router,
  store
});

