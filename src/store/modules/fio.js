import Vue from "vue";
import fio from "../../api/fio";

const state = {
  fioPresets: {},
  fioScenarios: {},
  fioTestcases: {},
  fioResults: {}
};

const getters = {
  fioPresets: state => Vue._.values(state.fioPresets),
  fioScenarios: state => Vue._.values(state.fioScenarios),
  fioTestcases: state => Vue._.values(state.fioTestcases),
  fioResults: state => Vue._.values(state.fioResults),
  fioResult: state => resultId => state.fioResults[resultId]
};

const actions = {
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
  addFioScenario({ commit }, payload) {
    fio.addScenario(payload, scenario => {
      commit("ADD_FIO_SCENARIO", scenario);
      payload.router.push("/fio/scenarios");
    });
  },
  deleteFioScenario({ commit }, payload) {
    fio.deleteScenario(payload, scenario => {
      commit("DELETE_FIO_SCENARIO", scenario);
    });
  },
  runFioScenario({ commit }, payload) {
    fio.runScenario(payload, result => {
      commit("ADD_FIO_RESULT", result);
      payload.router.push(`/fio/results/${result.id}`);
    });
  },
  getPresets({ commit }) {
    fio.getPresets(presets => {
      commit("SET_FIO_PRESETS", presets);
    });
  },
  deleteFioPreset({ commit }, payload) {
    fio.deletePreset(payload, preset => {
      commit("DELETE_FIO_PRESET", preset);
    });
  },
  getFioResults({ commit }) {
    fio.getResults(results => {
      commit("SET_FIO_RESULTS", results);
    });
  }
};

const mutations = {
  SET_FIO_RESULTS(state, results) {
    state.fioResults = Vue._.reduce(
      results,
      function(obj, result) {
        obj[result.id] = result;
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
  DELETE_FIO_PRESET(state, preset) {
    state.fioPresets = Vue._.omit(state.fioPresets, preset.id);
  },
  ADD_FIO_SCENARIO(state, scenario) {
    state.fioScenarios[scenario.id] = scenario;
  },
  ADD_FIO_RESULT(state, result) {
    state.fioResults[result.id] = result;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
