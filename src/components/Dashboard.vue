<template>
  <v-container>
    <SideBarRight />
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
      <v-btn-toggle tile group v-model="toggle_exclusive" color="#49D9A0">
        <v-btn><v-icon>fas fa-arrow-left</v-icon></v-btn>
        <v-btn><v-icon>fas fa-arrow-right</v-icon></v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn color="#49D9A0" rounded dark>finish Sprint</v-btn>
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
      <v-toolbar-title>SLA Overview </v-toolbar-title>
      <v-btn color="#49D9A0" text class="ml-5">last sprint</v-btn>
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
                          ><strong>52</strong></v-list-item-title
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
                          ><strong>52</strong></v-list-item-title
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
                          ><strong>52</strong></v-list-item-title
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
                          ><strong>52</strong></v-list-item-title
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
                          ><strong>52</strong></v-list-item-title
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
          <v-toolbar-title>Sprint Stories </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn rounded small>sell all</v-btn>
        </v-toolbar>
        <v-simple-table class="grey lighten-3">
          <template v-slot:default>
            <tbody>
              <tr v-for="item in orders" :key="item.name">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.state }}</td>
                <td>{{ item.count }}</td>
                <td>
                  <v-icon small>{{ item.icon }}</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n8">
      <v-toolbar-title> SLA Owners </v-toolbar-title>
    </v-toolbar>
    <v-card class="rounded-lg">
      <v-row>
        <v-col cols="12" sm="3">
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
                <v-list-item-title>AAE Ideapro</v-list-item-title>

                <v-list-item-subtitle>32 Story point</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="3">
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
                <v-list-item-title>AAE Ideapro</v-list-item-title>

                <v-list-item-subtitle>32 Story point</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="3">
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
                <v-list-item-title>AAE Ideapro</v-list-item-title>

                <v-list-item-subtitle>32 Story point</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
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
      toggle_exclusive: 1,
      orders: [
        {
          id: "P42",
          title: "Onboarding",
          state: "Delivered",
          count: 3,
          icon: "fas fa-ellipsis-h",
        },
        {
          id: "P32",
          title: "User profile",
          state: "Delivered",
          count: 8,
          icon: "fas fa-ellipsis-h",
        },
        {
          id: "P56",
          title: "Landing page",
          state: "Approved",
          count: 12,
          icon: "fas fa-ellipsis-h",
        },
        {
          id: "P36",
          title: "Settings",
          state: "Approved",
          count: 9,
          icon: "fas fa-ellipsis-h",
        },
      ],
      option: {
        title: {
          text: "Burnsown chart",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "65%",
            center: ["45%", "50%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" },
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
