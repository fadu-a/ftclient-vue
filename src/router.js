import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Runners from "./views/Runners.vue";
import RunnerList from "./views/Runners/RunnerList.vue";
import RunnerNew from "./views/Runners/RunnerNew.vue";
import RunnerEdit from "./views/Runners/RunnerEdit.vue";
import Results from "./views/Results.vue";
import Scripts from "./views/Scripts.vue";
import Presets from "./views/Presets.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/runners",
      component: Runners,
      children: [
        {
          path: "",
          component: RunnerList
        },
        {
          path: "new",
          component: RunnerNew
        },
        {
          path: ":runnerId/edit",
          name: "runner-edit",
          component: RunnerEdit,
          props: true
        }
      ]
    },
    {
      path: "/scripts",
      name: "scripts",
      component: Scripts
    },
    {
      path: "/results",
      name: "results",
      component: Results
    },
    {
      path: "/presets",
      name: "presets",
      component: Presets
    }
  ]
});
