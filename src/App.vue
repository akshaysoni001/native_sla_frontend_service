<template>
  <v-app>
    <v-main class="grey lighten-5">
      <template v-if="this.isAuthenticated">
        <CxltToastr></CxltToastr>
        <SideBar />
        <TopHeader @logout="logout" />
        <v-container> <router-view /> </v-container
      ></template>
      <template v-else><LoginView @loggedIn="login" /> </template>
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "@/components/SiderBar";
import TopHeader from "@/components/header";
import LoginView from "@/views/LoginView.vue";

import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
  name: "App",
  data: () => ({
    isAuthenticated: false,
  }),
  created() {
    console.log(this.$toast);
    this.$toast.info({
      title: "Hello",
      message: "Testing",
    });
  },
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.isAuthenticated = true;
    }
  },
  methods: {
    login(value) {
      this.isAuthenticated = value;
    },
    logout(value) {
      this.isAuthenticated = value;
    },
  },
  components: { SideBar, TopHeader, LoginView },
};
</script>
