import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/sheet",
    name: "sheet",
    component: () =>
      import(/* webpackChunkName: "sheet" */ "@/views/SheetView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
