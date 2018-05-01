<template>
  <div class="runner-new">
    <h1 class="mb-4">Add Test Runner</h1>
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
    this.$store.dispatch("resetRunner");
  }
};
</script>
