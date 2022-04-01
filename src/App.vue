<template>
  <v-app>
    <v-main class="grey lighten-5">
      <v-snackbar
        v-model="snackbar.visible"
        auto-height
        :color="snackbar.color"
        :multi-line="snackbar.mode === 'multi-line'"
        :timeout="snackbar.timeout"
        :top="snackbar.position === 'top'"
      >
        <v-layout align-center>
          <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
          <v-layout column>
            <div>
              <strong>{{ snackbar.title }}</strong>
            </div>
            <div>{{ snackbar.text }}</div>
          </v-layout>
          <v-btn icon @click="snackbar.visible = false">
            <v-icon class="">clear</v-icon>
          </v-btn>
        </v-layout>
      </v-snackbar>
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
    snackbar: {
      color: "info",
      icon: "info",
      mode: "multi-line",
      position: "top",
      timeout: 2000,
      title: "",
      text: "",
      visible: false,
    },
  }),
  created() {},
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.isAuthenticated = true;
    }
  },
  methods: {
    login(value) {
      this.isAuthenticated = value;
    },
    logout(value, message, status) {
      this.isAuthenticated = value;
      this.snackbar.title = "Success";
      this.snackbar.icon = "check_circle";
      this.snackbar.text = message;
      this.snackbar.color = status;
      this.snackbar.visible = true;
    },
    notification(message, status) {
      console.log("Notification", message, status);
      this.snackbar.text = message;
      this.snackbar.title = status;
      this.snackbar.color = status;
      this.snackbar.visible = true;
    },
  },
  components: { SideBar, TopHeader, LoginView },
};
</script>
