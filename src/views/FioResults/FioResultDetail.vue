<template>
<div class="fio-result-detail">
  <h1 class="mb-4">FIO Result Detail</h1>
  <div>
    <h4>Test Date:</h4>
    <p>{{ result.test_date }}</p>

    <p>
      <FioResultStatusBadge :status="result.status"/>
    </p>
    <div>
      <ResultGraph :chart-data="Iops_datacollection" :options="{ animation:false }" :width="400" :height="200"/>
      <ResultGraph :chart-data="Bw_datacollection" :options="{ animation:false }" :width="400" :height="200"/>
      <ResultGraph :chart-data="Lat_Max_datacollection" :options="{ animation:false }" :width="400" :height="200"/>
      <ResultGraph :chart-data="Lat_Mean_datacollection" :options="{ animation:false }" :width="400" :height="200"/>
    </div>
  </div>
</div>
</template>

<script>
import FioResultStatusBadge from "../../components/FioResults/FioStatusBadge";
import ResultGraph from "../../components/FioResults/ResultGraph";
export default {
  name: "FioResultDetail",
  components: {
    FioResultStatusBadge,
    ResultGraph
  },
  data() {
    return {
      timer: "",
      Iops_datacollection: null,
      Bw_datacollection: null,
      Lat_Max_datacollection: null,
      Lat_Mean_datacollection: null
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
  created() {
    this.initdata();
    this.initResultList();
  },
  mounted() {
    this.fillData();
    this.timer = setInterval(this.pollResultList, 1000);
  },
  updated() {
    if (this.result.status !== 0) {
      clearInterval(this.timer);
    }
  },
  methods: {
    initResultList() {
      while (this.$store.getters.fioResult(this.$route.params.resultId) == undefined) {
        this.$store.dispatch("getFioResults");
      }
      this.$store.dispatch("getFioResults");
    },
    pollResultList() {
      while (this.$store.getters.fioResult(this.$route.params.resultId) == undefined) {
        this.$store.dispatch("getFioResults");
      }
      this.$store.dispatch("getFioResults");
      this.fillData();
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
    },
    initdata() {
      this.Iops_datacollection = {
        labels: [0],
        datasets: [{
          label: 'Data One',
          backgroundColor: '#f77979',
          data: [0]
        }]
      }

    },
    fillData() {
      var Labels = [0];
      var Iops_values = [0];
      var Bw_values = [0];
      var Lat_max_values = [0];
      var Lat_mean_values = [0];
      var x = this.$store.getters.fioResult(this.$route.params.resultId).io_logs;

      x.sort(function (a,b) {
        return a.testcase_id - b.testcase_id;
      })


      var idx = 0;
      for (var b = 0; b < x.length; ++b) {
        for (var a = 0; a < x[b].data.length; ++a) {
          Labels.push(idx++ + 1);
          Iops_values.push(this.parsedIoLogs(x[b].data)[a].read_iops + this.parsedIoLogs(x[b].data)[a].write_iops);
          Bw_values.push(this.parsedIoLogs(x[b].data)[a].read_bw + this.parsedIoLogs(x[b].data)[a].write_bw);
          Lat_max_values.push(Math.max(this.parsedIoLogs(x[b].data)[a].read_lat_max, this.parsedIoLogs(x[b].data)[a].write_lat_max));
          Lat_mean_values.push(Math.max(this.parsedIoLogs(x[b].data)[a].read_lat_mean, this.parsedIoLogs(x[b].data)[a].write_lat_mean));
        }

      }

      this.Iops_datacollection = {
        labels: Labels,
        datasets: [{
          label: 'iops',
          borderColor: '#000000',
          backgroundColor: '#ff0000',
          fill: false,
          data: Iops_values
        }]
      }
      this.Bw_datacollection = {
        labels: Labels,
        datasets: [{
          label: 'bw',
          borderColor: '#000000',
          backgroundColor: '#00ff00',
          fill: false,
          data: Bw_values
        }]
      }
      this.Lat_Max_datacollection = {
        labels: Labels,
        datasets: [{
          label: 'lat_max',
          borderColor: '#000000',
          backgroundColor: '#0000ff',
          fill: false,
          data: Lat_max_values
        }]
      }
      this.Lat_Mean_datacollection = {
        labels: Labels,
        datasets: [{
          label: 'lat_mean',
          borderColor: '#000000',
          backgroundColor: '#000000',
          fill: false,
          data: Lat_mean_values
        }]
      }

    }
  }
};
</script>

<style scoped>
</style>
