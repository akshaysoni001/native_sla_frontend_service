import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CxltToastr from "cxlt-vue2-toastr";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  CxltToastr,
  render: (h) => h(App),
}).$mount("#app");
