<template>
  <div>
    <h1>Running Test</h1>
    <br >
    <b-card-group>
      <template
        v-for="test in runningTest">
        <FioResultDashboardCard
          :key="test.id"
          :result-id="test.id"
          :runner-host="filterRunnerId(test.runner)[0].host"
          :runner-port="filterRunnerId(test.runner)[0].port"
          :scenario-name="filterScenarioId(test.scenario)[0].name"
          class="mr-3 mb-3"/>
      </template>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FioResultDashboardCard from "../../components/FioResults/FioStatusDashboardCard";

export default {
  name: "FioResultDashboard",
  components: {
    FioResultDashboardCard
  },
  computed: {
    ...mapGetters(["runningTest", "fioScenarios", "runners"])
  },
  methods: {
    filterScenarioId: function(id) {
      return this.fioScenarios.filter(item => {
        return item.id === id;
      });
    },
    filterRunnerId: function(id) {
      return this.runners.filter(item => {
        return item.id === id;
      });
    }
  }
};
</script>

<style scoped>
</style>
