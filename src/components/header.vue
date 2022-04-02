<template>
  <v-app-bar flat color="rgba(0,0,0,0)">
    <v-spacer></v-spacer>
    <v-navigation-drawer expand-on-hover right>
      <template v-slot:prepend>
        <v-list-item three-line>
          <v-list-item-avatar>
            <img src="https://i.ibb.co/zmNdYDd/Akshay-Soni.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              $store.state.user.user_name
            }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            <v-list-item-subtitle>Account</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-btn right large text color="#49AD90" class="mt-3" @click="logout"
      ><v-icon>exit_to_app</v-icon></v-btn
    ></v-app-bar
  >
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    logout() {
      this.setUser("");
      this.setToken(null);
      localStorage.removeItem("token");
      sessionStorage.clear();
      this.$emit("logout");
    },
  },
};
</script>
