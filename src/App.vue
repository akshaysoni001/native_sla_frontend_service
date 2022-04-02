<template>
  <v-app>
    <SnackBar />
    <v-main class="grey lighten-5">
      <template v-if="this.isAuthenticated">
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
import { eventBus } from "./main";

export default {
  name: "App",
  data: () => ({
    isAuthenticated: false,
  }),
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.isAuthenticated = true;
    }
  },
  methods: {
    login(value) {
      this.isAuthenticated = value;
    },
    logout() {
      this.isAuthenticated = false;
      eventBus.$emit("notification", {
        message: "Logout Successfully",
        success: true,
      });
    },
  },
  components: { SideBar, TopHeader, LoginView },
};
</script>
