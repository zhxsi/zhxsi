import layout from "@/views/layout/index.vue";
const route = {
  path: "/testimonials",
  component: layout,
  redirect: "/testimonials/index",
  meta: { title: "testimonialsindex", group: "musiclibrary" },
  children: [
    {
      path: "/testimonials/index",
      name: "testimonialsindex",
      meta: { title: "testimonialsindex" },
      component: () => import("@/views/testimonials/index.vue"),
    },
  ],
};
export default route;
