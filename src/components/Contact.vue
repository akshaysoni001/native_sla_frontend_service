<template>
  <v-container class="ma-5">
    <v-toolbar flat color="teal--text">
      <v-toolbar-title color=""> Contact Us </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row left class="ma-3">
      <v-col cols="12" sm="6" class="ma-2 white">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="formData.name"
                :counter="10"
                :error-messages="errors"
                label="Name"
                prepend-icon="person"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="phoneNumber"
              :rules="{
                required: true,
                digits: 10,
                regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{8}$',
              }"
            >
              <v-text-field
                v-model="formData.phoneNumber"
                :counter="10"
                :error-messages="errors"
                label="Phone Number"
                prepend-icon="phone"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="formData.email"
                :error-messages="errors"
                label="E-mail"
                prepend-icon="email"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="service"
              rules="required"
            >
              <v-select
                v-model="formData.select"
                :items="formData.services"
                :error-messages="errors"
                label="Service"
                data-vv-name="select"
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
                v-model="formData.message"
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
import event from "@/services/ApiCalls.js";
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
    message: "",
    formData: {
      name: "",
      phoneNumber: "",
      email: "",
      select: null,
      services: ["Item 1", "Item 2", "Item 3", "Item 4"],
      message: "",
    },
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      event
        .post_feedback(this.formData)
        .then((response) => {
          this.message = response.data.message;
          this.$emit("notification", response.data);
        })
        .catch((error) => {
          this.$emit("notification", error.response.data);
        });

      this.clear();
    },
    clear() {
      this.formData.name = "";
      this.formData.phoneNumber = "";
      this.formData.email = "";
      this.formData.select = null;
      this.formData.message = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
