import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/gallery"
    },
    ...routes
  ]
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
