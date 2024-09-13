import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login-page.vue"),
  },
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: () => import("@/views/dashboard-page.vue"),
  // },
  {
    path: "/personal-info",
    name: "personal-info",
    component: () => import("@/views/personal-info-page.vue"),
  },
  // {
  //   path: "/file-picker",
  //   name: "file-picker",
  //   component: () => import("@/views/file-picker-page.vue"),
  // },
  // {
  //   path: "/confirm-info",
  //   name: "confirm-info",
  //   component: () => import("@/views/confirm-info-page.vue"),
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "not-found",
  //   component: () => import("@/views/not-found-page.vue"), // Show a NotFound page first
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {});

export default router;
