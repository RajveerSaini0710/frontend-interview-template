import { createApp } from "vue";
import App from "./App.vue";
import "./assets/input.css";
import store from "./store";

const app = createApp(App);
app.use(store);

app.mount("#app");
