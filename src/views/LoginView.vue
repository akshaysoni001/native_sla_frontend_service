<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-16 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-2">
                    <h1 class="text-center">
                      <span class="teal--text"> Native SLA Monitor </span>
                    </h1>
                    <h4 class="text-center mt-10">Login in to Your Account</h4>
                    <h6 class="text-center grey--text">
                      Log in to your sla account
                      <br />and start enjoying Native SLA Monitor
                    </h6>
                    <validation-observer ref="loginForm" v-slot="{ invalid }">
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Name"
                            rules="required|max:10"
                          >
                            <v-text-field
                              label="User Name"
                              v-model="user.username"
                              outlined
                              dense
                              :error-messages="errors"
                              required
                              color="teal"
                              autocomplete="false"
                              class="mt-16"
                            />
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Password"
                            rules="required|max:10"
                          >
                            <v-text-field
                              label="Password"
                              v-model="user.password"
                              outlined
                              :error-messages="errors"
                              required
                              dense
                              color="teal"
                              autocomplete="false"
                              type="password"
                            />
                          </validation-provider>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Account"
                                rules="required|max:20"
                              >
                                <v-select
                                  :items="accounts"
                                  v-model="user.account"
                                  :error-messages="errors"
                                  required
                                  label="Account"
                                ></v-select>
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-btn
                                color="teal"
                                dark
                                block
                                tile
                                type="submit"
                                @click="login"
                                :disabled="invalid"
                                >Log in</v-btn
                              >
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-btn color="teal" text @click="dialog = true"
                                >forgot password</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </validation-observer>
                  </v-card-text>
                </v-col>
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
                      <validation-observer ref="observer" v-slot="{ invalid }">
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
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
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
                <v-col cols="12" md="6" class="teal rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Don't Have an Account Yet?</h3>
                      <h6 class="text-center">
                        Let's get you all set up so you can start creating your
                        your first<br />
                        onboarding experience
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="teal rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Already Signed up?</h3>
                      <h6 class="text-center">
                        Log in to your account so you can continue building
                        and<br />
                        editing your onboarding flows
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <validation-observer ref="signUpForm" v-slot="{ invalid }">
                      <h4 class="text-center">Sign Up for an Account</h4>
                      <h6 class="text-center grey--text">
                        Let's get you all set up so you can start creatin your
                        <br />
                        first onboarding experience
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-row>
                            <v-col cols="12" sm="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Account"
                                rules="required|max:20"
                              >
                                <v-select
                                  :items="accounts"
                                  v-model="signup.account"
                                  :error-messages="errors"
                                  required
                                  label="Account"
                                ></v-select>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Id"
                                rules="required|max:10"
                              >
                                <v-text-field
                                  label="User id"
                                  v-model="signup.id"
                                  :error-messages="errors"
                                  required
                                  outlined
                                  dense
                                  color="teal"
                                  autocomplete="false"
                                  class="mt-4"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Name"
                                rules="required|max:10"
                              >
                                <v-text-field
                                  label="Name"
                                  v-model="signup.name"
                                  :error-messages="errors"
                                  required
                                  outlined
                                  dense
                                  color="teal"
                                  autocomplete="false"
                                />
                              </validation-provider>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Email"
                                rules="required|email"
                              >
                                <v-text-field
                                  label="Email"
                                  v-model="signup.email"
                                  :error-messages="errors"
                                  required
                                  outlined
                                  dense
                                  color="teal"
                                  autocomplete="false"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Remark"
                            rules="required|max:20"
                          >
                            <v-text-field
                              label="Remark"
                              v-model="signup.remark"
                              :error-messages="errors"
                              required
                              outlined
                              dense
                              color="teal"
                              autocomplete="false"
                            />
                          </validation-provider>
                          <v-btn
                            color="teal"
                            dark
                            block
                            tile
                            @click="SignUp"
                            :disabled="invalid"
                            >Sign up</v-btn
                          >

                          <h5 class="text-center grey--text mt-4 mb-3">
                            Or Sign up using
                          </h5>
                          <div
                            class="d-flex justify-space-between align-center mx-10 mb-11"
                          >
                            <v-btn depressed outlined color="grey">
                              <v-icon color="red">fab fa-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="teal">fab fa-facebook-f</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="light-teal lighten-3"
                                >fab fa-twitter</v-icon
                              >
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </validation-observer>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import event from "@/services/ApiCalls.js";
import { mapMutations } from "vuex";
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
    resetpassword: {
      id: "",
      request: "reset_password",
    },
    dialog: false,
    Rules: [(v) => !!v || "value is required"],
    user: {
      username: "",
      password: "",
      account: "",
    },
    signup: {
      account: "",
      name: "",
      id: "",
      email: "",
      remark: "",
      request: "signup",
    },
    isAuthenticated: false,
    step: 1,
    accounts: null,
  }),
  props: {
    source: String,
  },
  created() {
    event
      .get_init_data()
      .then((response) => {
        this.accounts = response.data.data[0]["all_account"];
        console.log(this.accounts);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    login() {
      event
        .login(this.user)
        .then((response) => {
          this.isAuthenticated = response.data.success;
          localStorage.setItem("token", response.data.data[0]);
          const token = response.data.data[0];
          const user = response.data.data[1];
          console.log(user, token);
          this.setUser(user);
          this.setToken(token);
          this.$emit("loggedIn", this.isAuthenticated);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    SignUp() {
      event
        .signup(this.signup)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    reset() {
      event
        .reset_password(this.resetpassword)
        .then((response) => {
          this.dialog = false;
          this.resetpassword.id = "";
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
      this.resetpassword.id = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
