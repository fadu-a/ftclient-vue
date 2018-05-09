import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const managerUrl = "http://localhost:8000/api";

export default new Vuex.Store({
  state: {
    runnerList: [],
    runner: {
      id: null,
      host: null,
      port: null,
      status: null,
      info: null
    },
    errorMessage: null,
    fioTestcaseList: {}
  },
  getters: {
    runnerList: state => state.runnerList,
    runner: state => state.runner,
    errorMessage: state => state.errorMessage,
    fioTestcaseList: state => Vue._.values(state.fioTestcaseList)
  },
  mutations: {
    SET_RUNNER_LIST(state, payload) {
      state.runnerList = payload;
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
      const runner = state.runnerList.find(runner => {
        return runner.id == runnerId;
      });
      state.runner = {
        id: runner.id,
        host: runner.host,
        port: runner.port,
        status: null,
        info: null
      };
    },
    ADD_RUNNER(state, payload) {
      state.runnerList.push(payload);
    },
    UPDATE_RUNNER(state, payload) {
      const index = state.runnerList.findIndex(r => r.id == payload.id);
      Vue.set(state.runnerList, index, payload);
    },
    DELETE_RUNNER(state, payload) {
      state.runnerList.splice(state.runnerList.indexOf(payload), 1);
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    RESET_ERROR_MESSAGE(state) {
      state.errorMessage = null;
    },
    SET_FIO_TESTCASE_LIST(state, testcaseList) {
      state.fioTestcaseList = Vue._.reduce(
        testcaseList,
        function(obj, testcase) {
          obj[testcase.id] = testcase;
          return obj;
        },
        {}
      );
    },
    ADD_FIO_TESTCASE(state, testcase) {
      state.fioTestcaseList[testcase.id] = testcase;
    },
    DELETE_FIO_TESTCASE(state, testcase) {
      state.fioTestcaseList = Vue._.omit(state.fioTestcaseList, testcase.id);
    }
  },
  actions: {
    getRunnerList(context) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .get(`${managerUrl}/runners/`)
        .then(res => res.data)
        .then(runnerList => {
          context.commit("SET_RUNNER_LIST", runnerList);
        });
    },
    resetRunner(context) {
      context.commit("RESET_ERROR_MESSAGE");
      context.commit("RESET_RUNNER");
    },
    setRunner(context, runnerId) {
      context.commit("RESET_ERROR_MESSAGE");
      context.commit("SET_RUNNER", runnerId);
    },
    addRunner(context, payload) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .post(`${managerUrl}/runners/`, {
          host: payload.host,
          port: payload.port
        })
        .then(res => res.data)
        .then(runner => {
          context.commit("ADD_RUNNER", runner);
          payload.router.push("/runners");
        })
        .catch(err => {
          console.log(err.response);
          context.commit("SET_ERROR_MESSAGE", "Runner 추가 실패");
        });
    },
    updateRunner(context, payload) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .put(`${managerUrl}/runners/${payload.id}/`, {
          host: payload.host,
          port: payload.port
        })
        .then(res => res.data)
        .then(runner => {
          context.commit("UPDATE_RUNNER", runner);
          payload.router.push("/runners");
        })
        .catch(err => {
          console.log(err.response);
          context.commit("SET_ERROR_MESSAGE", "Runner 수정 실패");
        });
    },
    deleteRunner(context, runner) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .delete(`${managerUrl}/runners/${runner.id}/`)
        .then(() => {
          context.commit("DELETE_RUNNER", runner);
        })
        .catch(function(err) {
          console.log(err.response);
        });
    },
    checkRunner(context, runner) {
      axios
        .get(`${managerUrl}/runners/${runner.id}/check/`)
        .then(res => res.data)
        .then(runner => {
          context.commit("UPDATE_RUNNER", runner);
        })
        .catch(function(err) {
          console.log(err.response);
        });
    },
    getFioTestcaseList(context) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .get(`${managerUrl}/fio/testcases/`)
        .then(res => res.data)
        .then(testcaseList => {
          context.commit("SET_FIO_TESTCASE_LIST", testcaseList);
        });
    },
    addFioTestcase(context, payload) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .post(`${managerUrl}/fio/testcases/`, {
          name: payload.name,
          extra: payload.configs
        })
        .then(res => res.data)
        .then(testcase => {
          context.commit("ADD_FIO_TESTCASE", testcase);
          payload.router.push("/fio/testcases");
        })
        .catch(err => {
          console.log(err.response);
          context.commit("SET_ERROR_MESSAGE", "FIO Testcase 추가 실패");
        });
    },
    deleteFioTestcase(context, payload) {
      context.commit("RESET_ERROR_MESSAGE");
      axios
        .delete(`${managerUrl}/fio/testcases/${payload.id}/`)
        .then(() => {
          context.commit("DELETE_FIO_TESTCASE", payload);
        })
        .catch(function(err) {
          console.log(err.response);
        });
    }
  }
});
