<template>
  <div class="fio-testcase-list">
    <h1 class="mb-4">FIO Testcase List</h1>

    <b-button
      variant="primary"
      class="float-right mb-2"
      to="">
      Add Testcase
    </b-button>

    <b-table
      :items="fioTestcaseList"
      :fields="fields"
      hover>
      <template
        slot="actions"
        slot-scope="row">
        <b-button
          size="sm"
          class="mr-1"
          variant="info"
          @click.stop="showTestcaseDetail(row.item, $event.target)">
          Show
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          variant="danger"
          @click.stop="">
          Delete
        </b-button>
      </template>
    </b-table>

    <b-modal 
      id="detail-modal"
      :title="testcaseDetail.name" 
      ok-only 
      @hide="resetTestcaseDetail">
      <pre>{{ testcaseDetail.configs }}</pre>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FioTestcaseList",
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      testcaseDetail: {
        name: "",
        configs: null
      }
    };
  },
  computed: {
    ...mapGetters(["fioTestcaseList"])
  },
  created() {
    this.$store.dispatch("getFioTestcaseList");
  },
  methods: {
    showTestcaseDetail(item, button) {
      this.testcaseDetail.name = item.name;
      this.testcaseDetail.configs = item.extra;
      this.$root.$emit("bv::show::modal", "detail-modal", button);
    },
    resetTestcaseDetail() {
      this.testcaseDetail.name = "";
      this.testcaseDetail.configs = null;
    }
  }
};
</script>
