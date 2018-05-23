<template>
  <div>
    <b-card
      :header="runner"
      :border-variant="variantType"
      :header-bg-variant="variantType"
      header-text-variant="white">
      <h4>
        <RunnerStatusBadge
          :status="result.status"/>
      </h4>
      <p><b>{{ scenarioName }}</b></p>
      <b-button
        :to="detailUrl"
        variant="outline-secondary"
        class="float-right"
        size="sm">Detail</b-button>
    </b-card>
  </div>
</template>

<script>
import RunnerStatusBadge from "./FioStatusBadge";
export default {
  name: "FioResultDashboardCard",
  components: {
    RunnerStatusBadge
  },
  props: {
    resultId: {
      type: Number,
      required: true
    },
    runnerHost: {
      type: Number,
      required: true
    },
    scenarioName: {
      type: String,
      required: true
    },
    runnerPort: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      timer: "",
      runner: this.runnerHost + ":" + this.runnerPort,
      detailUrl: "/fio/results/" + this.resultId
    };
  },
  computed: {
    result() {
      return this.$store.getters.fioResult(this.resultId);
    },
    variantType() {
      switch (this.result.status) {
        case 0:
          return "success";
        case 1:
          return "secondary";
        default:
          return "danger";
      }
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
