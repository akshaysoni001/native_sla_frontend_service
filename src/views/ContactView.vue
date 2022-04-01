<template>
  <v-container>
    <ContactView @notification="notification" />
  </v-container>
</template>
<script>
import ContactView from "@/components/Contact";
export default {
  components: { ContactView },
  methods: {
    notification(message, status) {
      console.log("Notification", message, status);
      this.$emit("notification", message, "success");
    },
  },
};
</script>
