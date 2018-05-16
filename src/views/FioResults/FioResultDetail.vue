<template>
  <div class="fio-result-detail">
    <h1 class="mb-4">FIO Result Detail</h1>

    <div v-if="!!result">
      <h4>Test Date:</h4>
      <p>{{ result.test_date }}</p>

      <h4>Status:</h4>
      <p><FioResultStatusBadge :status="result.status"/></p>

      <h4>Logs:</h4>

      <div
        v-for="ioLog in sortedIoLogs"
        :key="ioLog.id">
        <h5>{{ ioLog.testcase_name }} (Order: {{ ioLog.order }})</h5>

        <b-table
          :items="parsedIoLogs(ioLog.data)"
          hover/>
      </div>
    </div>
  </div>
</template>

<script>
import FioResultStatusBadge from "../../components/FioResults/FioStatusBadge";

export default {
  name: "FioResultDetail",
  components: {
    FioResultStatusBadge
  },
  data() {
    return {
      timer: ""
    };
  },
  computed: {
    result() {
      return this.$store.getters.fioResult(this.$route.params.resultId);
    },
    sortedIoLogs() {
      return this.result.io_logs
        .slice(0)
        .sort((a, b) => a.testcase_id - b.testcase_id);
    }
  },
  mounted() {
    this.timer = setInterval(this.pollResultList, 2000);
  },
  updated() {
    if (this.result.status !== 0) {
      clearInterval(this.timer);
    }
  },
  methods: {
    pollResultList() {
      this.$store.dispatch("getFioResults");
    },
    parsedIoLogs(logData) {
      return logData.map(log => {
        const logArray = log.split(";");

        return {
          read_bw: logArray[6],
          read_iops: logArray[7],
          write_bw: logArray[47],
          write_iops: logArray[48],
          read_lat_max: logArray[14],
          read_lat_mean: logArray[15],
          write_lat_max: logArray[55],
          write_lat_mean: logArray[56]
        };
      });
    }
  }
};
</script>

<style scoped>
</style>
