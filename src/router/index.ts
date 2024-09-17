import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { useAccountDataStore } from "@/stores/account-data-store";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login-page.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/personal-info",
    name: "personal-info",
    component: () => import("@/views/personal-info-page.vue"),
    meta: { requiresAuth: true, notHasAccount: true },
  },
  {
    path: "/file-picker",
    name: "file-picker",
    component: () => import("@/views/file-picker-page.vue"),
    meta: { requiresAuth: true, notHasAccount: true },
  },
  {
    path: "/confirm-info",
    name: "confirm-info",
    component: () => import("@/views/confirm-info-page.vue"),
    meta: { requiresAuth: true, notHasAccount: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found-page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const accountDataStore = useAccountDataStore();

  const isAuthenticated = authStore.isAuthenticated;
  const hasAccount = Object.keys(accountDataStore.data).length > 0;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (to.meta.notHasAccount && hasAccount) {
    return next("/dashboard");
  }

  next();
});

export default router;
