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
            variant="info"
            size="sm"
            class="mr-1"
            @click="showTestcases(row.item)">Show</b-btn>
          <b-btn
            variant="danger"
            size="sm"
            class="mr-1"
            @click="deleteScenario(row.item)">Delete</b-btn>
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
      ]
    };
  },
  computed: {
    ...mapGetters(["fioScenarios"])
  },
  created() {
    this.$store.dispatch("getFioScenarios");
  },
  methods: {
    deleteScenario(scenario) {
      if (window.confirm("Are you sure?")) {
        this.$store.dispatch("deleteFioScenario", scenario);
      }
    },
    showTestcases(scenario) {
      this.detail.name = scenario.name;
      this.detail.testcaseList = scenario.testcases;
      this.$root.$emit("bv::show::modal", "modal");
    }
  }
};
</script>
