import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersist from "pinia-plugin-persist"; // Pinia 持久化
import router from "./router";
import "./assets/main.css";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const store = createPinia();
store.use(piniaPluginPersist);

app.use(router).use(store);

app.mount("#app");
