import axios from "axios";
import common from "./common";

export default {
  getPresets(cb) {
    axios
      .get(`${common.BASE_URL}/fio/presets`)
      .then(res => res.data)
      .then(presets => cb(presets))
      .catch(() => {
        window.alert("GET FIO PRESET LIST ERROR");
      });
  },
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
  }
};
