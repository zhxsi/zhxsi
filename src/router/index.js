import { createRouter, createWebHistory } from "vue-router";
import layout from "@/views/layout/index.vue";
import testimonials from "./testimonials.js";
import mv from "./mv.js";
import songsheet from "./songsheet.js";
import aa from "./SingerPage.js";
const routes = [
  {
    path: "/",
    component: layout,
    redirect: "/testimonials/index",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  testimonials,
  mv,
  songsheet,
  aa,
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
