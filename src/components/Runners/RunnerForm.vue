<template>
  <div>
    <label for="runner-host">Host:</label>
    <b-form-input 
      id="runner-host"
      v-model="runner.host"
      type="text"
      placeholder="Enter IP address"/>

    <br>

    <label for="runner-host">Port:</label>
    <b-form-input
      id="runner-host"
      v-model="runner.port"
      type="text"
      placeholder="Enter port number"/>

    <br>

    <b-button
      variant="info"
      class="mr-2"
      @click.stop="backToRunnerList">
      Back
    </b-button>

    <b-button
      variant="danger"
      class="mr-2"
      @click.stop="resetRunner">
      Reset
    </b-button>

    <b-button
      variant="primary"
      @click.stop="saveRunner">
      Save
    </b-button>
  </div>

</template>

<script>
export default {
  name: "RunnerForm",
  computed: {
    runner() {
      return this.$store.getters.runner;
    }
  },
  methods: {
    backToRunnerList() {
      this.$router.push("/runners");
    },
    resetRunner() {
      if (this.runner.id) {
        this.$store.dispatch("setRunner", this.runner.id);
      } else {
        this.$store.dispatch("resetRunner");
      }
    },
    saveRunner() {
      const action = this.runner.id ? "updateRunner" : "addRunner";

      this.$store.dispatch(action, {
        id: this.runner.id,
        host: this.runner.host,
        port: this.runner.port,
        router: this.$router
      });
    }
  }
};
</script>
