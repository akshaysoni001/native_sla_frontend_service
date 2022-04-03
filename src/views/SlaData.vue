<template>
  <v-container class="ma-5">
    <v-data-table
      :headers="headers"
      :items="slas"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="teal--text"
            >SLA Configurations</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn rounded color="#49D9A0" dark class="mb-2" @click="add_sla">
            Add Sla
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <SlaDataForm
          :item="item"
          :applications="applications"
          ref="SlaDataFormRef"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import SlaDataForm from "@/components/SlaDataForm";
export default {
  data: () => ({
    applications: [],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Creation Date",
        align: "start",
        sortable: false,
        value: "creation_date",
      },
      {
        text: "Account",
        align: "start",
        sortable: false,
        value: "account",
      },
      { text: "Application", value: "application" },
      { text: "SLA Number", value: "sla_number" },
      { text: "SLA Type", value: "sla_type" },
      { text: "Target", value: "target" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    slas: [],
  }),
  components: { SlaDataForm },
  created() {
    this.init();
  },
  methods: {
    init() {
      event
        .get_sla_data()
        .then((response) => {
          this.applications = response.data.data[0];
          response.data.data.shift();
          this.slas = response.data.data;
          // / this.slas.remove(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_sla() {
      this.$refs.SlaDataFormRef.add_sla();
    },
  },
};
</script>
