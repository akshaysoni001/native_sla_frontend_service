<template>
  <v-container>
    <v-btn color="#49D9A0" text @click="dialog = true">forgot password</v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Reset Password </v-card-title>
        <v-card-text>
          <validation-observer ref="resetPassword" v-slot="{ invalid }">
            <v-row>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Id"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="resetpassword.id"
                    label="id"
                    prepend-icon="person"
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
                @click="reset"
                :disabled="invalid"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import { eventBus } from "@/main";
import { required } from "vee-validate/dist/rules";
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
export default {
  data: () => ({
    dialog: false,
    resetpassword: {
      id: "",
      request: "reset_password",
    },
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    reset() {
      event
        .reset_password(this.resetpassword)
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
      this.resetpassword.id = "";
      this.dialog = false;
      this.$refs.resetPassword.reset();
      //
      //
    },
  },
};
</script>
