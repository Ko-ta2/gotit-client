import { createApp } from "vue";
import { router } from "@/router";
import { store, key } from "@/store";
import { i18n } from "@/i18n";
import "@/assets/css/main.css";

import App from "@/App.vue";

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(i18n);

app.mount("#app");
