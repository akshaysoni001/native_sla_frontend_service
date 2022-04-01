<template>
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
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "Snackbar",
  data: () => ({
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
    eventBus.$on("notification", (response) => {
      this.notification(response);
    });
  },
  methods: {
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    notification(response) {
      console.log("in Snackbar Component");
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
  components: {},
};
</script>
