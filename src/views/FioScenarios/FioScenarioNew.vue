<template>
  <div class="fio-scenario-new">
    <h1 class="mb-4">New Scenario</h1>

    <label for="scenario-name">Title:</label>
    <b-form-input
      id="scenario-name"
      v-model="scenario.name"
      type="text"
      placeholder="Enter the scenario name"/>

    <br>

    <label>Selected Testcases:</label>
    <b-card>
      <b-list-group>
        <draggable
          v-model="scenario.testcases">
          <b-list-group-item
            v-for="(testcase, index) in scenario.testcases"
            :key="index"
            class="d-flex align-items-center">
            <b-badge 
              variant="primary" 
              pill 
              class="mr-4">{{ index + 1 }}</b-badge>
            {{ testcase.name }}
          </b-list-group-item>
        </draggable>
      </b-list-group>
    </b-card>

    <br>

    <label>Available Testcases:</label>
    <b-card>
      <b-row>
        <b-col
          v-for="testcase in fioTestcases"
          :key="testcase.id"
          cols="3"
          class="my-1">
          <b-btn
            variant="outline-secondary"
            @click="selectTestcase(testcase)">
            {{ testcase.name }}
          </b-btn>
        </b-col>
      </b-row>
    </b-card>

    <br>

    <b-button
      variant="info"
      to="/fio/scenarios"
      class="mr-1">Back</b-button>
    <b-button
      variant="danger"
      class="mr-1"
      @click.stop="reset()">Reset</b-button>
    <b-button
      variant="primary"
      class="mr-1"
      @click.stop="save()">Save</b-button>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters } from "vuex";

export default {
  name: "FioScenarioNew",
  components: {
    draggable
  },
  data() {
    return {
      scenario: {
        name: "",
        testcases: []
      }
    };
  },
  computed: {
    ...mapGetters(["fioTestcases"])
  },
  created() {
    this.$store.dispatch("getFioTestcases");
  },
  methods: {
    reset() {
      this.scenario.name = "";
      this.scenario.testcases = [];
    },
    save() {
      this.$store.dispatch("addFioScenario", {
        name: this.scenario.name,
        testcases: this.scenario.testcases.map((testcase, index) => {
          testcase.order = index + 1;
          return testcase;
        }),
        router: this.$router
      });
    },
    selectTestcase(testcase) {
      this.scenario.testcases.push(testcase);
    }
  }
};
</script>
