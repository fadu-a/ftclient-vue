<template>
  <div>
    <b-container>
      <h1 class>FIO Scenario List</h1>

      <b-button 
        variant="primary" 
        class="float-right mb-2" 
        to="/fio/scenarios/new">
        Add Scenario
      </b-button>

      <b-table 
        :fields="fields" 
        :items="fioScenarios" 
        hover>
        <template 
          slot="actions" 
          slot-scope="row">
          <b-btn 
            variant="info" 
            size="sm" 
            class="mr-1">TC List</b-btn>
          <b-btn 
            variant="danger" 
            size="sm" 
            class="mr-1" 
            @click="deleteScenario(row.item)">Delete</b-btn>
        </template>
      </b-table>

      <b-modal 
        id="modal1" 
        :title="detail.name" 
        centered>
        <div class="d-block">
          <ol>
            <li 
              v-for="testcase in detail.testcaseList" 
              :key="testcase.id">
              {{ testcase.name }}
            </li>
          </ol>
        </div>
        <b-btn 
          size="sm" 
          variant="outline-primary" 
          class="float-right">More Detail</b-btn>
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
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      detail: {
        name: "",
        testcaseList: []
      }
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
    }
  }
};
</script>
