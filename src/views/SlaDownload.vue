<template>
  <v-container>
    <DownloadView @notification="notification" />
  </v-container>
</template>
<script>
import DownloadView from "@/components/download";
export default {
  components: { DownloadView },
  methods: {
    notification(message) {
      this.$emit("notification", message, "success");
    },
  },
};
</script>
