<template>
  <v-container class="ma-5">
    <v-toolbar
      color="#49D9A0"
      elevation="12"
      outlined
      shaped
      width="200"
      class="mx-5"
    >
      <v-app-bar-title> Raise Request </v-app-bar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row class="left ma-3">
      <v-col cols="12" sm="6" class="ma-2 white" outlined>
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
                label="Request"
                data-vv-name="select"
                prepend-icon="menu"
                required
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="account"
              rules="required"
            >
              <v-select
                v-model="add_account"
                v-if="add_account"
                :items="items"
                :error-messages="errors"
                label="Select Account"
                data-vv-name="account"
                prepend-icon="menu"
                required
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="access"
              rules="required"
            >
              <v-select
                v-model="select"
                v-if="access"
                :items="items"
                :error-messages="errors"
                label="Select Rights"
                data-vv-name="rights"
                prepend-icon="menu"
                required
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="textarea"
            >
              <v-textarea
                v-model="textarea"
                :error-messages="errors"
                value="1"
                label="Message"
                prepend-icon="message"
                type="textarea"
                required
              ></v-textarea>
            </validation-provider>
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
    add_account: null,
    access: null,
    menu1: false,
    menu2: false,
    select: null,
    textarea: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  }),
  watch: {
    select(value) {
      if (value == "Item 1") {
        this.add_account = true;
        this.access = false;
      } else if (value == "Item 2") {
        this.access = true;
        this.add_account = false;
      } else {
        this.add_account = false;
        this.access = false;
      }
    },
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.fromDate = null;
      this.toDate = null;
      this.select = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
