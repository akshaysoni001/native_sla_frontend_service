<template>
  <v-app>
    <SnackBar />
    <v-main class="grey lighten-5">
      <template v-if="this.isAuthenticated">
        <SideBar />
        <TopHeader @logout="logout" />
        <v-container> <router-view @notification="notification" /> </v-container
      ></template>
      <template v-else
        ><LoginView @loggedIn="login" @notification="notification" />
      </template>
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "@/components/SiderBar";
import TopHeader from "@/components/header";
import LoginView from "@/views/LoginView.vue";

export default {
  name: "App",
  data: () => ({
    isAuthenticated: false,
  }),
  created() {
    this.clear();
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
    logout(value, message) {
      this.isAuthenticated = value;
      this.snackbar.text = message;
      this.snackbar.visible = true;
    },
  },
  components: { SideBar, TopHeader, LoginView },
};
</script>
