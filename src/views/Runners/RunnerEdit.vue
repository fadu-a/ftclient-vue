<template>
  <div class="runner-edit">
    <h1 class="mb-4">Edit Test Runner</h1>
    <RunnerForm/>
  </div>
</template>

<script>
import RunnerForm from "../../components/Runners/RunnerForm.vue";

export default {
  name: "Runners",
  components: {
    RunnerForm
  },
  created() {
    this.$store.dispatch("setRunner", this.$route.params.runnerId);
  }
};
</script>
