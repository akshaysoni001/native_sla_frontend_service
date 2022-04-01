<template>
  <v-container>
    <RaiseRequest @notification="notification" />
  </v-container>
</template>
<script>
import RaiseRequest from "@/components/RaiseRequest";
export default {
  components: { RaiseRequest },
  methods: {
    notification(message) {
      this.$emit("notification", message, "success");
    },
  },
};
</script>
