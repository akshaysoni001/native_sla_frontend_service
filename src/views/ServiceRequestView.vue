<template>
  <v-container class="ma-5">
    <v-data-table
      :headers="Computedheaders"
      :items="requests"
      sort-by="account"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="teal--text">Service Request</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-chip
            v-for="chip in status"
            :key="chip.status"
            rounded
            :color="chip.color"
            dark
            class="mx-2 mb-2"
            @click="filter(chip.status)"
            >{{ chip.status }}
          </v-chip>
          <v-chip
            v-if="$store.state.user['roles'] === 'manager'"
            key="Pending"
            rounded
            color="orange"
            dark
            class="mx-2 mb-2"
            @click="filter('Pending')"
            >{{ "Pending" }}
          </v-chip>
        </v-toolbar>
      </template>

      <template v-slot:[`item.dynamic_information`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-chip dark v-on="on">{{ "New Data Info" }}</v-chip>
          </template>
          <span>{{ item.dynamic_information }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          v-if="
            $store.state.user['roles'] === 'manager' &&
            item.user_id != $store.state.user['id']
          "
          :color="getColor(item.status)"
          dark
        >
          {{ item.status }}
        </v-chip>
        <v-chip v-else-if="item.status === 'Pending'" color="blue" dark>
          Open
        </v-chip>
        <v-chip v-else :color="getColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <SlaServiceForm :item="item" @refresh="init" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import store from "@/store/index";
import SlaServiceForm from "@/components/SlaServiceForm.vue";
export default {
  data: () => ({
    search: "Pending",
    req_status: "Pending",
    headers: [
      { text: "User", value: "user_id", show: true, filterable: false },
      {
        text: "Account",
        align: "start",
        sortable: false,
        value: "account",
        show: true,
        filterable: false,
      },
      { text: "Activity", value: "activity", show: true, filterable: false },
      {
        text: "Request",
        value: "dynamic_information",
        show: true,
        filterable: false,
      },
      { text: "Remark", value: "remark", show: false, filterable: false },
      { text: "Status", value: "status", show: true },
      {
        text: "Actions",
        value: "actions",
        filterable: false,
        sortable: false,
        show: false,
      },
    ],
    status: [
      {
        status: "Open",
        color: "blue",
      },
      {
        status: "Closed",
        color: "success",
      },
    ],
    requests: [],
  }),
  components: { SlaServiceForm },
  computed: {
    Computedheaders() {
      return this.headers.filter((x) => x.show);
    },
  },
  watch: {
    Computedheaders() {
      if (this.search == "Pending" && store.state.user["roles"] === "manager") {
        return this.headers;
      } else {
        return this.headers.filter((x) => x.show);
      }
    },
  },
  created() {
    this.init();
    // setInterval(this.init, 5000);
  },
  methods: {
    init() {
      event
        .get_request_data()
        .then((response) => {
          this.requests = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filter(value) {
      if (value == "Closed") {
        this.search = "ed";
        this.headers[4]["show"] = true;
        this.headers[6]["show"] = false;
      } else {
        this.search = "Pending";
        if (store.state.user["roles"] === "manager") {
          this.headers[6]["show"] = true;
        }
        this.headers[4]["show"] = false;
      }
    },
    getColor(status) {
      if (status == "Open") return "blue";
      else if (status == "Approved") return "success";
      else if (status == "Pending") return "orange";
      else return "red";
    },
  },
};
</script>
