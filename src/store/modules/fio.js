import Vue from "vue";
import fio from "../../api/fio";

const state = {
  fioPresets: {},
  fioTestcases: {},
  fioScenarios: {}
};

const getters = {
  fioPresets: state => Vue._.values(state.fioPresets),
  fioTestcases: state => Vue._.values(state.fioTestcases),
  fioScenarios: state => Vue._.values(state.fioScenarios)
};

const actions = {
  getPresets({ commit }) {
    fio.getPresets(presets => {
      commit("SET_FIO_PRESETS", presets);
    });
  },
  getFioTestcases({ commit }) {
    fio.getTestcases(testcases => {
      commit("SET_FIO_TESTCASES", testcases);
    });
  },
  addFioTestcase({ commit }, payload) {
    fio.addTestcase(payload, testcase => {
      commit("ADD_FIO_TESTCASE", testcase);
      payload.router.push("/fio/testcases");
    });
  },
  deleteFioTestcase({ commit }, payload) {
    fio.deleteTestcase(payload, testcase => {
      commit("DELETE_FIO_TESTCASE", testcase);
    });
  },
  getFioScenarios({ commit }) {
    fio.getScenarios(scenarios => {
      commit("SET_FIO_SCENARIOS", scenarios);
    });
  },
  deleteFioScenario({ commit }, payload) {
    fio.deleteScenario(payload, scenario => {
      commit("DELETE_FIO_SCENARIO", scenario);
    });
  },
  deleteFioPreset({ commit }, payload) {
    fio.deletePreset(payload, preset => {
      commit("DELETE_FIO_PRESET", preset);
    });
  }
};

const mutations = {
  SET_FIO_PRESETS(state, presets) {
    state.fioPresets = Vue._.reduce(
      presets,
      function(obj, preset) {
        obj[preset.id] = preset;
        return obj;
      },
      {}
    );
  },
  SET_FIO_TESTCASES(state, testcases) {
    state.fioTestcases = Vue._.reduce(
      testcases,
      function(obj, testcase) {
        obj[testcase.id] = testcase;
        return obj;
      },
      {}
    );
  },
  ADD_FIO_TESTCASE(state, testcase) {
    state.fioTestcases[testcase.id] = testcase;
  },
  DELETE_FIO_TESTCASE(state, testcase) {
    state.fioTestcases = Vue._.omit(state.fioTestcases, testcase.id);
  },
  SET_FIO_SCENARIOS(state, scenarios) {
    state.fioScenarios = Vue._.reduce(
      scenarios,
      function(obj, scenario) {
        obj[scenario.id] = scenario;
        return obj;
      },
      {}
    );
  },
  DELETE_FIO_SCENARIO(state, scenario) {
    state.fioScenarios = Vue._.omit(state.fioScenarios, scenario.id);
  },
  DELETE_FIO_PRESET(state, preset) {
    state.fioPresets = Vue._.omit(state.fioPresets, preset.id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
