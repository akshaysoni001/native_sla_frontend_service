<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <Dashboard />
  </v-app>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { Dashboard },
};
</script>
