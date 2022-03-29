<template>
  <v-app>
    <v-main class="grey lighten-5">
      <SideBar />
      <TopHeader />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SiderBar";
import TopHeader from "@/components/header";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: { SideBar, TopHeader },
};
</script>
