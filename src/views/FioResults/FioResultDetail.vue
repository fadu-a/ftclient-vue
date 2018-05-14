<template>
  <div class="fio-result-detail">
    <h1 class="mb-4">FIO Result Detail</h1>

    <h4>Test Date:</h4>
    <p>{{ test_date }}</p>

    <h4>Status:</h4>
    <p><FioResultStatusBadge :status="status"/></p>

    <h4>Logs:</h4>
    <p>TBD</p>
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
    test_date() {
      return this.result ? this.result.test_date : "";
    },
    status() {
      return this.result ? this.result.status : 0;
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
    }
  }
};
</script>

<style scoped>
</style>
