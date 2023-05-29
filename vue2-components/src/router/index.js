import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import("@/views/HomeView.vue"),
  },
  {
    path: "/sheet",
    name: "sheet",
    component: () =>
      import("@/views/SheetView.vue"),
  },
  {
    path: "/iti",
    name: "iti",
    component: () =>
      import("@/views/ItiView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
