<template>
  <v-dialog
    v-model="dialog"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title> Change Password </v-card-title>
      <v-card-text>
        <validation-observer ref="changePassword" v-slot="{ invalid }">
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Old Password"
                rules="required"
              >
                <v-text-field
                  v-model="changepassword.old_password"
                  label="Old Password"
                  prepend-icon="password"
                  :error-messages="errors"
                  required
                ></v-text-field
              ></validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="New Password"
                rules="required"
              >
                <v-text-field
                  v-model="changepassword.new_password"
                  label="New Password"
                  prepend-icon="password"
                  :error-messages="errors"
                  required
                ></v-text-field
              ></validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Confirm Password"
                rules="required"
              >
                <v-text-field
                  v-model="changepassword.confirm_password"
                  label="Confirm Password"
                  prepend-icon="password"
                  :error-messages="errors"
                  required
                ></v-text-field
              ></validation-provider>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="clear"> Cancel </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              @click="changePassword"
              :disabled="invalid"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { eventBus } from "@/main";

import event from "@/services/ApiCalls.js";
export default {
  data: () => ({
    dialog: false,
    changepassword: {
      old_password: "",
      new_password: "",
      confirm_password: "",
      request: "change_password",
    },
  }),
  methods: {
    changePassword() {
      event
        .changePassword(this.changepassword)
        .then((response) => {
          this.clear();
          eventBus.$emit("notification", response.data);
        })
        .catch((error) => {
          this.clear();
          eventBus.$emit("notification", error.response.data);
        });
    },
    clear() {
      this.dialog = false;
      this.changepassword.old_password = "";
      this.changepassword.new_password = "";
      this.changepassword.confirm_password = "";
      this.$refs.changePassword.reset();
    },
  },
};
</script>
