import Vue from "vue";
import store from "@/store";
import App from "@/App.vue";
import router from "@/router";
import moment from "moment";
import VueGeolocationApi from "vue-geolocation-api";
import MaterialKit from "./plugins/material-kit";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(MaterialKit);
Vue.use(VueGeolocationApi /*, { ...options } */);
Vue.config.productionTip = false;

const NavbarStore = {
  showNavbar: false,
};

Vue.mixin({
  data() {
    return {
      NavbarStore,
    };
  },
});

new Vue({
  router,
  store,
  moment,
  VueGeolocationApi,
  render: (h) => h(App),
}).$mount("#app");
