<template>
  <v-container>
    <v-icon medium class="mr-2" @click="editItem(item)" color="green">
      check
    </v-icon>
    <v-icon medium @click="deleteItem(item)" color="red"> close </v-icon>
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
          <v-btn color="#49D9A0" text @click="close"> Cancel </v-btn>
          <v-btn color="#49D9A0" text @click="save"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import event from "@/services/ApiCalls.js";
import { eventBus } from "@/main";
export default {
  props: { item: {} },
  data: () => ({
    dialog: false,
    Rules: [(v) => !!v || "Required"],
    editedIndex: -1,
    editedItem: {},
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Approve Request" : "Delete Request";
    },
    take_action() {
      return this.editedIndex === -1 ? "approve" : "reject";
    },
  },

  methods: {
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

    close() {
      this.$refs.remark.reset();
      this.dialog = false;
      this.action = null;
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
            eventBus.$emit("notification", response.data);
          })
          .catch((error) => {
            console.log(error.response);
            eventBus.$emit("notification", error.response.data);
          });
        this.close();
      }
    },
  },
};
</script>
