<template>
  <div>
    <b-container>
      <h1 class>FIO Scenario List</h1>

      <b-button
        variant="primary"
        class="float-right mb-2"
        to="/fio/scenarios/new">
        Make Scenario
      </b-button>

      <b-table
        :fields="scenarioFields"
        :items="fioScenarios"
        hover>
        <template
          slot="actions"
          slot-scope="row">
          <b-btn
            variant="primary"
            size="sm"
            class="mr-1"
            @click="showRunnerListModal(row.item)">
            Run
          </b-btn>
          <b-btn
            variant="info"
            size="sm"
            class="mr-1"
            @click="showTestcaseListModal(row.item)">
            Show
          </b-btn>
          <b-btn
            variant="danger"
            size="sm"
            @click="deleteScenario(row.item)">
            Delete
          </b-btn>
        </template>
      </b-table>

      <b-modal
        id="modal"
        :title="detail.name"
        centered>
        <h5>Testcase List</h5>
        <div class="d-block">
          <b-table
            :fields="testcaseFields"
            :items="detail.testcaseList"/>
        </div>
        <b-btn
          size="sm"
          variant="outline-primary"
          class="float-right"
          to="/fio/testcases/">More Detail</b-btn>
      </b-modal>

      <b-modal
        id="runner"
        centered
        hide-footer
        size="sm"
        title="Idle Runner List">
        <b-form-group>
          <b-form-checkbox-group
            v-model="selectedRunnerIds"
            stacked>
            <b-form-checkbox
              v-for="runner in runners"
              v-if="runner.status == 1"
              :value="runner.id"
              :key="runner.id"
              class="mr-2">
              ID : {{ runner.id }} - {{ runner.host }}:{{ runner.port }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-btn
          class="mt-3"
          variant="outline-primary"
          block
          @click="runScenario()">RUN</b-btn>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FioScenarioList",
  data() {
    return {
      scenarioFields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      detail: {
        name: "",
        testcaseList: []
      },
      testcaseFields: [
        { key: "order", label: "Order" },
        { key: "id", label: "ID" },
        { key: "name", label: "Name" }
      ],
      selectedRunnerIds: [],
      selectedScenarioId: ""
    };
  },
  computed: {
    ...mapGetters(["fioScenarios", "runners"])
  },
  created() {
    this.$store.dispatch("getFioScenarios");
    this.$store.dispatch("getRunners");
  },
  methods: {
    runScenario() {
      for (let index in this.selectedRunnerIds) {
        this.$store.dispatch("runFioScenario", {
          scenarioId: this.selectedScenarioId,
          router: this.$router,
          runnerId: this.selectedRunnerIds[index]
        });
      }
    },
    deleteScenario(scenario) {
      if (window.confirm("Are you sure?")) {
        this.$store.dispatch("deleteFioScenario", scenario);
      }
    },
    showTestcaseListModal(scenario) {
      this.detail.name = scenario.name;
      this.detail.testcaseList = scenario.testcases;
      this.$root.$emit("bv::show::modal", "modal");
    },
    showRunnerListModal(scenario) {
      this.selectedScenarioId = scenario.id;
      this.$root.$emit("bv::show::modal", "runner");
    }
  }
};
</script>
