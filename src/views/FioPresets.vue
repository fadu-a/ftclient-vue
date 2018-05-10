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
            @click="showTestcases(row.item)">
            Show
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            class="mr-1"
            disabled
            @click="deletePreset(row.item)">
            Delete
          </b-button>
        </template>
      </b-table>

      <b-modal
        id="modal"
        :title="detail.title"
        centered>
        <h5>Testcase List</h5>
        <div class="d-block">
          <b-table
            :fields="testcaseFields"
            :items="detail.testcaseList"
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
        title: "",
        testcaseList: []
      },
      presetFields: [
        { key: "", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      testcaseFields: [
        { key: "order", label: "Order" },
        { key: "id", label: "ID" },
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
        this.$store.dispatch("deleteFioPreset", preset);
      }
    },
    showTestcases(preset) {
      this.detail.title = `${preset.name} (Scenario ID : ${
        preset.scenario.id
      })`;
      this.detail.testcaseList = preset.scenario.testcases;
      this.$root.$emit("bv::show::modal", "modal");
    }
  }
};
</script>
