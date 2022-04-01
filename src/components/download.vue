<template>
  <v-container class="ma-5">
    <v-toolbar flat color="teal--text">
      <v-toolbar-title color=""> SLA Download </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row left class="ma-3">
      <v-col cols="12" sm="6" class="ma-2 white">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="select"
              rules="required"
            >
              <v-select
                v-model="select"
                :items="items"
                :error-messages="errors"
                label="SLA"
                data-vv-name="items"
                prepend-icon="menu"
                required
              ></v-select> </validation-provider
            ><v-row>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Required"
                      rules="required"
                    >
                      <v-text-field
                        :value="from_date"
                        label="From"
                        prepend-icon="event"
                        readonly
                        :error-messages="errors"
                        required
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="fromDate"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Date Required"
                      rules="required"
                    >
                      <v-text-field
                        :value="to_date"
                        label="To"
                        prepend-icon="event"
                        readonly
                        :error-messages="errors"
                        required
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="toDate"
                    @change="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <validation-provider>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-switch v-model="switch1" label="Download"></v-switch>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="switch2"
                    label="Need on mail"
                  ></v-switch> </v-col></v-row
            ></validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import { format, parseISO } from "date-fns";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    fromDate: null,
    toDate: null,
    menu1: false,
    menu2: false,
    select: null,
    items: null,
    switch1: true,
    switch2: false,
  }),
  created() {
    event
      .get_sla_headers()
      .then((response) => {
        this.items = response.data.data;
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    switch1(value) {
      if (value) {
        this.switch2 = false;
      } else {
        this.switch2 = true;
      }
    },
    switch2(value) {
      if (value) {
        this.switch1 = false;
      } else {
        this.switch1 = true;
      }
    },
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.$emit("notification", "Downloaded", "success");
      this.clear();
    },
    clear() {
      this.fromDate = null;
      this.toDate = null;
      this.select = null;
      this.switch1 = true;
      this.switch2 = false;
      this.$refs.observer.reset();
    },
  },
  computed: {
    from_date() {
      return this.fromDate
        ? format(parseISO(this.fromDate), "EEEE, MMMM do yyyy")
        : "";
    },
    to_date() {
      return this.toDate
        ? format(parseISO(this.toDate), "EEEE, MMMM do yyyy")
        : "";
    },
  },
};
</script>
