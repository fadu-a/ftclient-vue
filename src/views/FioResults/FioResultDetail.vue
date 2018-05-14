<template>
  <div class="fio-result-detail">
    <h1 class="mb-4">FIO Result Detail</h1>

    <h4>Test Date:</h4>
    <p>{{ Date(result.test_date) }}</p>

    <h4>Status:</h4>
    <p><FioResultStatusBadge :status="result.status"/></p>

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
  computed: {
    result() {
      return this.$store.getters.fioResult(this.$route.params.resultId);
    }
  }
};
</script>

<style scoped>
</style>
