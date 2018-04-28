import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Runners from "./views/Runners.vue";
import Results from "./views/Results.vue";
import Scripts from "./views/Scripts.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/runners",
      name: "Runners",
      component: Runners
    },
    {
      path: "/scripts",
      name: "Scripts",
      component: Scripts
    },
    {
      path: "/results",
      name: "Results",
      component: Results
    }
  ]
});
