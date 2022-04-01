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
            v-if="$store.state.user['roles'] === 'approver'"
            key="Pending"
            rounded
            color="orange"
            dark
            class="mx-2 mb-2"
            @click="filter('Pending')"
            >{{ "pending" }}
          </v-chip>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.account"
                        label="Account"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.activity"
                        label="Activity"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.dynamic_information"
                        label="Request"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.status"
                        label="Status"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user_id"
                        label="User"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.remark"
                        label="Remark"
                        ref="remark"
                        :rules="Rules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Submit </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        <v-chip :color="getColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)" color="green">
          check
        </v-icon>
        <v-icon medium @click="deleteItem(item)" color="red"> close </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
export default {
  data: () => ({
    dialog: false,
    search: "Open",
    Rules: [(v) => !!v || "Required"],
    headers: [
      { text: "User", value: "user_id", show: true },
      {
        text: "Account",
        align: "start",
        sortable: false,
        value: "account",
        show: true,
      },
      { text: "Activity", value: "activity", show: true },
      { text: "Request", value: "dynamic_information", show: true },
      { text: "Remark", value: "remark", show: true },
      { text: "Status", value: "status", show: true },
      { text: "Actions", value: "actions", sortable: false, show: false },
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
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Approve Request" : "Delete Request";
    },
    take_action() {
      return this.editedIndex === -1 ? "approve" : "reject";
    },
    Computedheaders() {
      if (this.search != "Pending") {
        return this.headers.filter((x) => x.show);
      } else {
        return this.headers;
      }
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.init();
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
      } else {
        this.search = value;
      }
    },
    getColor(status) {
      if (status == "Open") return "blue";
      else if (status == "Approved") return "success";
      else if (status == "Pending") return "orange";
      else return "red";
    },
    editItem(item) {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.$refs.remark.reset();
      this.dialog = false;
      this.action = null;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.remark.validate()) {
        this.editedItem["action"] = this.take_action;
        event
          .make_action(this.editedItem)
          .then((response) => {
            this.message = response.message;
            this.$refs.remark.reset();
            this.init();
            this.$emit("notification", response.data);
          })
          .catch((error) => {
            this.$emit("notification", error.response.data);
          });
        this.close();
      }
    },
  },
};
</script>
