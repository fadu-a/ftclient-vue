<template>
  <div class="fio-testcase-new">
    <h1 class="mb-4">Add FIO Testcase</h1>

    <label for="testcase-name">Name:</label>
    <b-form-input
      id="testcase-name"
      v-model="testcase.name"
      type="text"
      placeholder="Enter name"/>

    <br>

    <label for="testcase-configs">Configurations:</label>
    <b-form-textarea
      id="testcase-configs"
      v-model="testcase.configs"
      :rows="10"
      :max-rows="15"
      placeholder="Enter fio configurations"/>
    <b-form-text>
      Should be a valid JSON format.
    </b-form-text>
    <br>

    <b-button
      variant="info"
      class="mr-2"
      @click.stop="goBack">
      Back
    </b-button>

    <b-button
      variant="danger"
      class="mr-2"
      @click.stop="reset">
      Reset
    </b-button>

    <b-button
      variant="primary"
      @click.stop="save">
      Save
    </b-button>
  </div>
</template>

<script>
export default {
  name: "FioTestcaseNew",
  data() {
    return {
      testcase: {
        name: "",
        configs: null
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push("/fio/testcases");
    },
    reset() {
      this.testcase.name = "";
      this.testcase.configs = null;
    },
    save() {
      this.$store.dispatch("addFioTestcase", {
        name: this.testcase.name,
        configs: this.testcase.configs,
        router: this.$router
      });
    }
  }
};
</script>
