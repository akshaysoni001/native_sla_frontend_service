<template>
  <v-app>
    <v-main>
      <SideBar />
      <v-container>
        <router-view />
      </v-container> </v-main
    >u
  </v-app>
</template>

<script>
import SideBar from "@/components/SiderBar";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: { SideBar },
};
</script>
