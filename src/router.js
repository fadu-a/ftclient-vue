import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Runners from "./views/Runners.vue";
import RunnerList from "./views/Runners/RunnerList.vue";
import RunnerNew from "./views/Runners/RunnerNew.vue";
import RunnerEdit from "./views/Runners/RunnerEdit.vue";
import FioTestcases from "./views/FioTestcases.vue";
import FioTestcaseList from "./views/FioTestcases/FioTestcaseList.vue";
import FioTestcaseNew from "./views/FioTestcases/FioTestcaseNew.vue";
import FioPresets from "./views/FioPresets.vue";
import Results from "./views/Results.vue";
import FioScenarios from "./views/FioScenarios.vue";
import FioScenarioNew from "./views/FioScenarios/FioScenarioNew";
import FioScenarioList from "./views/FioScenarios/FioScenarioList";

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
      path: "/fio/presets",
      component: FioPresets
    },
    {
      path: "/fio/testcases",
      component: FioTestcases,
      children: [
        {
          path: "",
          component: FioTestcaseList
        },
        {
          path: "new",
          component: FioTestcaseNew
        }
      ]
    },
    {
      path: "/results",
      name: "results",
      component: Results
    },
    {
      path: "/fio/scenarios",
      component: FioScenarios,
      children: [
        {
          path: "",
          component: FioScenarioList
        },
        {
          path: "new",
          component: FioScenarioNew
        }
      ]
    }
  ]
});
