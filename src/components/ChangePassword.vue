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
                name="New_Password"
                rules="required|password:@Confirm_Password"
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
                name="Confirm_Password"
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
import { required } from "vee-validate/dist/rules";
import event from "@/services/ApiCalls.js";
import { mapMutations } from "vuex";
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

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
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
    ...mapMutations(["setUser", "setToken"]),
    OpenForm() {
      this.dialog = true;
    },
    changePassword() {
      event
        .changePassword(this.changepassword)
        .then((response) => {
          this.clear();
          console.log("IIIII");
          eventBus.$emit("notification", response.data);
        })
        .catch((error) => {
          this.clear();
          eventBus.$emit("notification", error.response.data);
        });
      this.setUser("");
      this.setToken(null);
      localStorage.removeItem("token");
      sessionStorage.clear();
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
