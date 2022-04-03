<template>
  <v-container>
    <v-icon small class="mr-2" @click="editItem(item)" color="orange">
      mdi-pencil
    </v-icon>
    <v-icon small @click="deleteItem(item)" color="red"> mdi-delete</v-icon>
    <v-dialog v-model="dialog" max-width="500px">
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
                      readonly
                    ></v-text-field
                  ></validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Application"
                    rules="required|alpha"
                  >
                    <v-select
                      v-model="editedItem.application"
                      :items="applications"
                      :error-messages="errors"
                      label="Application"
                      data-vv-name="select"
                      :readonly="readonly_imp"
                      required
                    ></v-select
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
                      :readonly="readonly_imp"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="SLA Description"
                    :rules="{ required: true }"
                  >
                    <v-text-field
                      v-model="editedItem.sla_description"
                      label="SLA Description"
                      :error-messages="errors"
                      required
                      :readonly="readonly"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Penalty"
                    :rules="{ required: true }"
                  >
                    <v-select
                      v-model="editedItem.penalty"
                      :items="penalty_list"
                      :error-messages="errors"
                      label="Penalty"
                      data-vv-name="select"
                      required
                    ></v-select>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="SLA Type"
                    rules="required"
                  >
                    <v-select
                      v-model="editedItem.sla_type"
                      :items="sla_types"
                      :error-messages="errors"
                      label="Sla Type"
                      data-vv-name="select"
                      required
                    ></v-select>
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
                    name="Reason"
                    rules="required"
                  >
                    <v-text-field
                      v-model="editedItem.reason"
                      label="Reason"
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
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save" :disabled="invalid">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import { eventBus } from "@/main";

import store from "@/store/index";
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
  props: { item: {}, applications: [] },
  data: () => ({
    dialog: false,
    readonly: false,
    readonly_imp: true,
    penalty_list: [true, false],
    sla_types: ["monthly", "weekly", "daily"],
    penalty: false,
    sla_type: null,
    action: "Add SLA",
    request: "add",
    editedIndex: -1,
    editedItem: {
      account: store.state.user.account,
      application: null,
      sla_number: null,
      sla_type: null,
      target: null,
      sla_description: null,
      penalty: null,
      reason: "",
    },
    defaultItem: {
      account: store.state.user.account,
      application: null,
      sla_number: null,
      sla_type: null,
      target: null,
      sla_description: null,
      penalty: false,
      reason: "",
    },
    slas: [],
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
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
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
    add_sla() {
      this.dialog = true;
      this.readonly_imp = false;
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
    save() {
      this.editedItem["request"] = this.request;
      event
        .post_sla_request(this.editedItem)
        .then((response) => {
          this.message = response.message;
          this.close();

          eventBus.$emit("notification", response.data);
        })
        .catch((error) => {
          eventBus.$emit("notification", error.response.data);
        });
      this.close();
    },
  },
};
</script>
