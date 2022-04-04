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

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                rounded
                color="#49D9A0"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Sla
              </v-btn>
            </template>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Account"
                          rules="required|alpha"
                        >
                          <v-text-field
                            v-model="editedItem.account"
                            label="Account"
                            :error-messages="errors"
                            required
                            :readonly="readonly"
                          ></v-text-field
                        ></validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Application"
                          rules="required|alpha"
                        >
                          <v-text-field
                            v-model="editedItem.application"
                            label="Application"
                            :error-messages="errors"
                            required
                            :readonly="readonly"
                          ></v-text-field
                        ></validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="SLA Number"
                          :rules="{ required: true, digits: 2 }"
                        >
                          <v-text-field
                            v-model="editedItem.sla_number"
                            label="SLA Number"
                            :error-messages="errors"
                            required
                            :readonly="readonly"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="SLA Type"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.sla_type"
                            label="SLA Type"
                            :error-messages="errors"
                            required
                            :readonly="readonly"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Target"
                          rules="required|integer|between:0,100"
                        >
                          <v-text-field
                            v-model="editedItem.target"
                            label="Target"
                            :error-messages="errors"
                            required
                            :readonly="readonly"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Remark"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.remark"
                            label="Remark"
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :disabled="invalid"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </validation-observer>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import {
  required,
  digits,
  alpha,
  integer,
  between,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("integer", {
  ...integer,
  message: "{_field_} can be only integer",
});
extend("between", {
  ...between,
  message: "{_field_} should be in range (0,100)",
});
extend("digits", {
  ...digits,
  message: "{_field_} should be integer and only {length} digit",
});
extend("alpha", {
  ...alpha,
  message: "{_field_} should be Character only",
});
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    readonly: false,
    action: "Add SLA",
    request: "add",
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
    editedIndex: -1,
    editedItem: {
      account: "",
      application: null,
      sla_number: null,
      sla_type: null,
      target: null,
      remark: "",
    },
    defaultItem: {
      account: "",
      application: null,
      sla_number: null,
      sla_type: null,
      target: null,
      remark: "",
    },
  }),

  computed: {
    formTitle() {
      return this.action;
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

  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    init() {
      event
        .get_sla_data()
        .then((response) => {
          this.slas = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.slas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.action = "Edit SLA";
      this.request = "update";
    },

    deleteItem(item) {
      this.editedIndex = this.slas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.readonly = true;
      this.action = "Delete SLA";
      this.request = "delete";
    },

    deleteItemConfirm() {
      this.slas.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.readonly = false;
      this.action = "Add SLA";
      this.request = "add";
      this.$refs.observer.reset();
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
      this.editedItem["request"] = this.request;
      event
        .post_sla_request(this.editedItem)
        .then((response) => {
          this.message = response.message;
          this.close();

          this.$emit("notification", response.data);
        })
        .catch((error) => {
          this.$emit("notification", error.response.data);
        });
      this.close();
      this.init();
    },
  },
};
</script>
