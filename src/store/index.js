import Vue from "vue";
import Vuex from "vuex";
import runner from "./modules/runner";
import fio from "./modules/fio";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    runner,
    fio
  }
});
