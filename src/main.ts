import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersistance from "pinia-plugin-persistedstate";

import App from "./App.vue";
// import router from "./router/index.ts";
import { registerBaseComponents } from "@/plugins/global-reusable-components";
import { registerLayouts } from "@/plugins/global-reusable-components";

const app = createApp(App);
const pinia = createPinia();

registerBaseComponents(app);
registerLayouts(app);

pinia.use(piniaPersistance);
app.use(pinia);
// app.use(router);

app.mount("#app");
