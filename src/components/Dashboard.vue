<template>
  <v-container>
    <SideBarRight ref="SlaRightBar" />
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
      <v-btn-toggle tile group v-model="toggle_exclusive" color="#49D9A0">
        <v-btn><v-icon>fas fa-arrow-left</v-icon></v-btn>
        <v-btn><v-icon>fas fa-arrow-right</v-icon></v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn color="#49D9A0" rounded dark disabled="invalid"
        >finish Sprint</v-btn
      >
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
      <v-toolbar-title>SLA Overview </v-toolbar-title>
      <!-- <v-btn color="#49D9A0" text class="ml-5" >last sprint</v-btn> -->
    </v-toolbar>

    <v-item-group mandatory class="mt-n4">
      <v-container>
        <v-row justify="center" class="space">
          <v-col cols="12" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon x-large :color="active ? 'white' : '#49D9A0'"
                            >fas fa-chart-bar</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >Total Applications</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                          ><strong>{{
                            total_application_count
                          }}</strong></v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card></v-item
            >
          </v-col>

          <v-col cols="12" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon x-large :color="active ? 'white' : '#49D9A0'"
                            >fas fa-chart-bar</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >Total SLA's</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                          ><strong>{{
                            total_sla_count
                          }}</strong></v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card></v-item
            >
          </v-col>

          <v-col cols="12" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon x-large :color="active ? 'white' : '#49D9A0'"
                            >fas fa-chart-bar</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >Sla Met</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                          ><strong>{{
                            sla_met_count
                          }}</strong></v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card></v-item
            >
          </v-col>

          <v-col cols="12" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon x-large :color="active ? 'white' : '#49D9A0'"
                            >fas fa-chart-bar</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >Sla Breached</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                          ><strong>{{
                            sla_breached_count
                          }}</strong></v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card></v-item
            >
          </v-col>

          <v-col cols="12" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon x-large :color="active ? 'white' : '#49D9A0'"
                            >fas fa-chart-bar</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >Top Application</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                          ><strong>app_1</strong></v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card></v-item
            >
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-row>
      <v-col cols="12" sm="7">
        <v-chart class="chart mt-4" :option="option"></v-chart>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n2">
          <v-toolbar-title>SLA Stories </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn rounded small>sell all</v-btn>
        </v-toolbar>
        <v-simple-table class="grey lighten-3">
          <template v-slot:default>
            <thead>
              <tr>
                <td>Id</td>
                <td>Application</td>
                <td>Number</td>
                <td>Percentage</td>
              </tr>
            </thead>
            <v-divider vertical-sm></v-divider>
            <tbody>
              <tr v-for="sla in data['sla_data']" :key="sla.id">
                <td>{{ sla.id }}</td>
                <td>{{ sla.application }}</td>
                <td>{{ sla.sla_number }}</td>
                <td>{{ sla.sla_percentage }}</td>
                <!-- <td>
                  <v-icon small>{{ sla.sla_type }}</v-icon>
                </td> -->
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n8">
      <v-toolbar-title> SLA Owners </v-toolbar-title>
    </v-toolbar>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="owner in data['sla_owners']"
        :key="owner.account"
      >
        <v-card class="rounded-lg">
          <v-responsive class="pt-4">
            <v-list subheader two-line>
              <v-list-item>
                <v-badge
                  bordered
                  bottom
                  color="#49D9A0"
                  dot
                  offset-x="12"
                  offset-y="8"
                >
                  <v-list-item-avatar>
                    <v-avatar size="40">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                      ></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-badge>
                <v-list-item-content class="mx-2">
                  <v-list-item-title>{{
                    owner["user_name"]
                  }}</v-list-item-title>

                  <v-list-item-subtitle>{{
                    owner["account"]
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBarRight from "@/components/SideBarRight";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

import event from "@/services/ApiCalls.js";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "Home",
  data() {
    return {
      flag: false,
      toggle_exclusive: 1,
      data: [],
      option: {
        title: {
          text: "Graph Representation",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "SLA Overview",
            type: "pie",
            radius: "65%",
            center: ["45%", "50%"],
            data: [
              { value: 335, name: "Faild SLA" },
              { value: 310, name: "SLA Breached" },
              { value: 234, name: "Account Status" },
              { value: 135, name: "Penalty SLA" },
              { value: 1548, name: "Application Status" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    event
      .get_initial_data()
      .then((response) => {
        this.data = response.data.data;
        console.log(this.data);
        console.log("sla-dataa", this.data["sla_data"]);
        this.flag = true;
        let project_progress =
          (this.data["sla_met"].length / this.data["slas"].length) * 100;
        this.$refs.SlaRightBar.init(
          this.data["applications"],
          Math.round(project_progress)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
  computed: {
    total_application_count() {
      if (this.flag == true) {
        var L = this.data["applications"].length;
      }
      return L;
    },
    total_sla_count() {
      if (this.flag == true) {
        console.log(this.data);
        var L = this.data["slas"].length;
      }
      return L;
    },
    sla_met_count() {
      if (this.flag == true) {
        console.log(this.data);
        var L = this.data["sla_met"].length;
      }
      return L;
    },
    sla_breached_count() {
      if (this.flag == true) {
        var L = this.data["sla_breached"].length;
      }
      return L;
    },
  },
  components: { SideBarRight, VChart },
  provide: { [THEME_KEY]: "green" },
};
</script>

<style>
.space {
  margin-left: -100px;
  margin-right: -100px;
}
</style>
