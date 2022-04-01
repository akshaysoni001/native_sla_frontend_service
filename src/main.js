import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Handle all Vue errors
// Vue.config.errorHandler = (error) => ErrorService.onError(error);
import SnackBar from "@/components/Snackbar";

Vue.component("SnackBar", SnackBar);

export const eventBus = new Vue();
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
