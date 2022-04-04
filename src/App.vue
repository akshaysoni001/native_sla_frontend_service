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
              <strong>{{ snackbar.text }}</strong>
            </div>
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
      color: "success",
      icon: "check_circle",
      mode: "multi-line",
      position: "top",
      timeout: 2000,
      text: "",
      visible: false,
    },
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
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    login(value) {
      this.isAuthenticated = value;
    },
    logout(value, message) {
      this.isAuthenticated = value;
      this.snackbar.text = message;
      this.snackbar.visible = true;
    },
    notification(response) {
      if (response.success != true) {
        this.snackbar.icon = "error";
        this.snackbar.color = "error";
      }
      this.snackbar.text = response["message"];
      this.snackbar.visible = true;
      this.delay(8000).then(() => this.clear());
      // this.clear();
    },
    clear() {
      this.snackbar.visible = false;
      this.snackbar.color = "success";
      this.snackbar.icon = "check_circle";
      this.snackbar.mode = "multi-line";
      this.snackbar.position = "top";
      this.snackbar.timeout = 2000;
      this.snackbar.text = "";
    },
  },
  components: { SideBar, TopHeader, LoginView },
};
</script>
