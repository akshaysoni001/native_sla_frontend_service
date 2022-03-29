<template>
  <v-app-bar flat color="rgba(0,0,0,0)">
    <v-spacer></v-spacer>
    <v-navigation-drawer expand-on-hover right>
      <template v-slot:prepend>
        <v-list-item three-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            <v-list-item-subtitle>Account</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-btn right large text color="#49AD90" class="mt-3"
      ><v-icon>exit_to_app</v-icon></v-btn
    ></v-app-bar
  >
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
};
</script>
