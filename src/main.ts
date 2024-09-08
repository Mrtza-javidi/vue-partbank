import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersistance from "pinia-plugin-persistedstate";

import App from "./App.vue";
// import router from "./router/index.ts";

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPersistance);
app.use(pinia);
// app.use(router);

app.mount("#app");
