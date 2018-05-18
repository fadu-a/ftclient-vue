import axios from "axios";
import common from "./common";

export default {
  getTestcases(cb) {
    axios
      .get(`${common.BASE_URL}/fio/testcases/`)
      .then(res => res.data)
      .then(testcases => cb(testcases))
      .catch(() => {
        window.alert("GET FIO TESTCASE LIST ERROR");
      });
  },
  addTestcase(payload, cb) {
    axios
      .post(`${common.BASE_URL}/fio/testcases/`, {
        name: payload.name,
        extra: payload.configs
      })
      .then(res => res.data)
      .then(testcase => cb(testcase))
      .catch(() => {
        window.alert("POST FIO TESTCASE ERROR");
      });
  },
  deleteTestcase(payload, cb) {
    axios
      .delete(`${common.BASE_URL}/fio/testcases/${payload.id}/`)
      .then(() => cb(payload))
      .catch(() => {
        window.alert(`DELETE FIO TESTCASE (ID=${payload.id}) ERROR`);
      });
  },

  getScenarios(cb) {
    axios
      .get(`${common.BASE_URL}/fio/scenarios`)
      .then(res => res.data)
      .then(scenarios => cb(scenarios))
      .catch(() => {
        window.alert("GET FIO SCENARIO LIST ERROR");
      });
  },
  addScenario(payload, cb) {
    axios
      .post(`${common.BASE_URL}/fio/scenarios/`, {
        name: payload.name,
        testcases: payload.testcases
      })
      .then(res => res.data)
      .then(scenario => cb(scenario))
      .catch(() => {
        window.alert("POST FIO SCENARIO ERROR");
      });
  },
  deleteScenario(payload, cb) {
    axios
      .delete(`${common.BASE_URL}/fio/scenarios/${payload.id}/`)
      .then(() => cb(payload))
      .catch(() => {
        window.alert(`DELETE FIO SCENARIO (ID=${payload.id}) ERROR`);
      });
  },
  runScenario(payload, cb) {
    axios
      .post(`${common.BASE_URL}/fio/results/`, {
        scenario: payload.scenarioId,
        runner: payload.runnerId
      })
      .then(res => res.data)
      .then(result => cb(result))
      .catch(() => {
        window.alert("RUN FIO SCENARIO ERROR");
      });
  },
  getPresets(cb) {
    axios
      .get(`${common.BASE_URL}/fio/presets`)
      .then(res => res.data)
      .then(presets => cb(presets))
      .catch(() => {
        window.alert("GET FIO PRESET LIST ERROR");
      });
  },
  deletePreset(payload, cb) {
    axios
      .delete(`${common.BASE_URL}/fio/presets/${payload.id}/`)
      .then(() => cb(payload))
      .catch(() => {
        window.alert(`DELETE FIO PRESET (ID=${payload.id}) ERROR`);
      });
  },
  getResults(cb) {
    axios
      .get(`${common.BASE_URL}/fio/results`)
      .then(res => res.data)
      .then(results => cb(results))
      .catch(() => {
        window.alert("GET FIO RESULT LIST ERROR");
      });
  }
};
