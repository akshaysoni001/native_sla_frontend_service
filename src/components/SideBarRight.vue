<template>
  <v-navigation-drawer right app color="white" width="290">
    <v-toolbar color="rgba(0,0,0,0)" flat>
      <v-toolbar-title> Applications </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded small>See All</v-btn>
    </v-toolbar>
    <v-list subheader two-line class="mt-n4">
      <v-list-item v-for="file in files" :key="file.title">
        <v-list-item-avatar>
          <v-icon :class="file.color" dark v-text="file.icon" small></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="file.title"></v-list-item-title>
          <v-list-item-subtitle
            grey--text
            v-text="file.subtitle"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon
            ><v-icon color="grey lighten-1" small
              >fas fa-ellipsis-h</v-icon
            ></v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-toolbar flat class="mt-n6" color="rgba(0,0,0,0)">
      <v-toolbar-title> Project Statics </v-toolbar-title>
    </v-toolbar>

    <v-card flat class="mx-2 rounded-l-xl pb-1" color="#EEEEEE">
      <v-row>
        <v-col cols="12" sm="5">
          <v-list-item two-line class="mt-n4">
            <v-list-item-content>
              <v-list-item-title class=" ">Project</v-list-item-title>
              <v-list-item-subtitle class=" ">progress</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" sm="4">
          <v-progress-circular
            :value="75"
            :size="50"
            :width="3"
            color="teal"
            class="mt-n1"
            >75</v-progress-circular
          >
        </v-col>
        <v-col cols="12" sm="3" class="mt-2">
          <span class="ml-n8">percentage</span>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="mt-2 mx-2">
      <v-btn rounded small block>Project Details</v-btn>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      files: [
        {
          color: "green",
          icon: "fas fa-mobile",
          subtitle: "Design",
          title: "Mobile",
        },
        {
          color: "red",
          icon: "fas fa-mobile",
          subtitle: "Design",
          title: "App Onboarding",
        },
        {
          color: "blue",
          icon: "fas fa-mobile",
          subtitle: "Design",
          title: "Mobile Onboarding",
        },
        {
          color: "pink",
          icon: "fas fa-mobile",
          subtitle: "Design",
          title: "Data Onboarding",
        },
      ],
    };
  },
};
</script>
