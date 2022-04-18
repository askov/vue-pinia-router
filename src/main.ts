import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Profile from "./views/Profile.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(createPinia()).use(router).mount("#app");
