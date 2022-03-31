import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ServiceView from "../views/ServiceRequestView.vue";
import SlaDataView from "../views/SlaData.vue";
import ContactView from "../views/ContactView.vue";
import DownloadView from "../views/SlaDownload.vue";
import RequestView from "../views/RequestView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/service",
    name: "ServiceRequest",
    component: ServiceView,
  },
  {
    path: "/data",
    name: "sladata",
    component: SlaDataView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/download",
    name: "download",
    component: DownloadView,
  },
  {
    path: "/request",
    name: "request",
    component: RequestView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
