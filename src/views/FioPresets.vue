<template>
  <div class="fio-presets">
    <b-container>
      <h1 class="mb-4">FIO Preset List</h1>

      <b-table
        :items="fioPresets"
        :fields="presetFields"
        hover>
        <template
          slot="actions"
          slot-scope="row">
          <b-button
            size="sm"
            variant="info"
            class="mr-1"
            @click="showTC(row.item)">
            Show
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            class="mr-1"
            @click="deletePreset(row.item)">
            Delete
          </b-button>
        </template>
      </b-table>

      <b-modal
        id="modal"
        :title="detail.name+' (Scenario_ID : '+detail.scenarioID+')'"
        centered>
        <div class="d-block">
          <b-table
            :fields="scenarioFields"
            :items="detail.testcases"
            hover/>
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
  name: "FioPresets",
  data() {
    return {
      detail: {
        name: "",
        testcases: [],
        scenarioID: ""
      },
      presetFields: [
        { key: "", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      scenarioFields: [
        { key: "order", label: "Order" },
        { key: "id", label: "TC_ID" },
        { key: "name", label: "Name" }
      ]
    };
  },
  computed: {
    ...mapGetters(["fioPresets"])
  },
  created() {
    this.$store.dispatch("getPresets");
  },
  methods: {
    deletePreset(preset) {
      if (window.confirm("Are you sure?")) {
        this.$store.dispatch("deletePreset", preset);
      }
    },
    showTC(preset) {
      this.detail.name = preset.name;
      this.detail.testcases = preset.scenario.testcases;
      this.detail.scenarioID = preset.scenario.id;
      this.$root.$emit("bv::show::modal", "modal");
    }
  }
};
</script>
