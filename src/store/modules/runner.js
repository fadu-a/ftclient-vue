import Vue from "vue";
import runner from "../../api/runner";

const state = {
  runners: {},
  runner: {
    id: null,
    host: null,
    port: null,
    status: null,
    info: null
  }
};

const getters = {
  runners: state => Vue._.values(state.runners),
  runner: state => state.runner
};

const actions = {
  getRunners({ commit }) {
    runner.getRunners(runners => {
      commit("SET_RUNNERS", runners);
    });
  },
  addRunner({ commit }, payload) {
    runner.addRunner(payload, runner => {
      commit("ADD_RUNNER", runner);
      payload.router.push("/runners");
    });
  },
  updateRunner({ commit }, payload) {
    runner.updateRunner(payload, runner => {
      commit("UPDATE_RUNNER", runner);
      payload.router.push("/runners");
    });
  },
  deleteRunner({ commit }, payload) {
    runner.deleteRunner(payload, runner => {
      commit("DELETE_RUNNER", runner);
    });
  },
  checkRunner({ commit }, payload) {
    runner.checkRunner(payload, runner => {
      commit("UPDATE_RUNNER", runner);
    });
  },
  resetRunner({ commit }) {
    commit("RESET_RUNNER");
  },
  setRunner({ commit }, runnerId) {
    commit("SET_RUNNER", runnerId);
  }
};

const mutations = {
  SET_RUNNERS(state, runners) {
    state.runners = Vue._.reduce(
      runners,
      function(obj, runner) {
        obj[runner.id] = runner;
        return obj;
      },
      {}
    );
  },
  RESET_RUNNER(state) {
    state.runner = {
      id: null,
      host: null,
      port: null,
      status: null,
      info: null
    };
  },
  SET_RUNNER(state, runnerId) {
    runnerId = parseInt(runnerId);
    const runner = state.runners[runnerId];

    state.runner = {
      id: runner.id,
      host: runner.host,
      port: runner.port,
      status: null,
      info: null
    };
  },
  ADD_RUNNER(state, runner) {
    state.runners[runner.id] = runner;
  },
  UPDATE_RUNNER(state, runner) {
    state.runners[runner.id] = runner;
  },
  DELETE_RUNNER(state, runner) {
    state.runners = Vue._.omit(state.runners, runner.id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
