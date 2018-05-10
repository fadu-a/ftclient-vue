import axios from "axios";
import common from "./common";

export default {
  getRunners(cb) {
    axios
      .get(`${common.BASE_URL}/runners/`)
      .then(res => res.data)
      .then(runners => cb(runners))
      .catch(() => {
        window.alert("GET RUNNER LIST ERROR");
      });
  },
  addRunner(payload, cb) {
    axios
      .post(`${common.BASE_URL}/runners/`, {
        host: payload.host,
        port: payload.port
      })
      .then(res => res.data)
      .then(runner => cb(runner))
      .catch(() => {
        window.alert("POST RUNNER ERROR");
      });
  },
  updateRunner(payload, cb) {
    axios
      .put(`${common.BASE_URL}/runners/${payload.id}/`, {
        host: payload.host,
        port: payload.port
      })
      .then(res => res.data)
      .then(runner => cb(runner))
      .catch(() => {
        window.alert(`PUT RUNNER (ID=${payload.id}) ERROR`);
      });
  },
  deleteRunner(payload, cb) {
    axios
      .delete(`${common.BASE_URL}/runners/${payload.id}/`)
      .then(() => cb(payload))
      .catch(() => {
        window.alert(`DELETE RUNNER (ID=${payload.id}) ERROR`);
      });
  },
  checkRunner(payload, cb) {
    axios
      .get(`${common.BASE_URL}/runners/${payload.id}/check/`)
      .then(res => res.data)
      .then(runner => cb(runner))
      .catch(() => {
        window.alert(`GET RUNNER (ID=${payload.id}) STATUS ERROR`);
      });
  }
};
