import { defineAsyncComponent } from "vue";

export const loadComponent = (componentName: string) =>
  defineAsyncComponent(() => import(`@/layouts/${componentName}.vue`));

export const TheHeader = loadComponent("the-header");
export const TheSidebar = loadComponent("the-sidebar");
