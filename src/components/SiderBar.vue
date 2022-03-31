<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="white"
    mini-variant
    mini-variant-width="80"
  >
    <v-avatar class="d-block text-centre mx-auto mt-4" size="40">
      <v-icon color="#49D9A0" large>fab fa-atlassian</v-icon>
    </v-avatar>
    <v-divider class="mx-3 my-5"></v-divider>
    <v-list flat class="mt-5">
      <v-list-item-group v-model="selectedItem">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          active-class="border"
          :ripple="false"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      drawer: null,
      items: [
        { icon: "fas fa-chart-line", route: "/" },
        { icon: "fas fa-th-large", route: "/data" },
        { icon: "fas fa-align-center", route: "/service" },
        { icon: "fas fa-download", route: "/download" },
        { icon: "fas fa-hand", route: "/request" },
        { icon: "fas fa-gitter", route: "/contact" },
        { icon: "fas fa-users", route: "/about" },
      ],
    };
  },
};
</script>

<style>
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #49d9a0;
  border-radius: 50%;
  text-decoration: none;
}
.v-list-item-group .v-list-item-active {
  color: white !important;
}
</style>
