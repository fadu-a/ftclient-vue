<template>
  <div class="fio-testcase-list">
    <h1 class="mb-4">FIO Testcase List</h1>

    <b-button
      variant="primary"
      class="float-right mb-2"
      to="/fio/testcases/new">
      Add Testcase
    </b-button>

    <b-table
      :items="fioTestcases"
      :fields="fields"
      hover>
      <template
        slot="actions"
        slot-scope="row">
        <b-button
          size="sm"
          class="mr-1"
          variant="info"
          @click.stop="showDetail(row.item, $event.target)">
          Show
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          variant="danger"
          @click.stop="deleteTestcase(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>

    <b-modal 
      id="detail-modal"
      :title="detail.name"
      ok-only 
      @hide="resetDetail">
      <pre>{{ detail.configs }}</pre>
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
      detail: {
        name: "",
        configs: null
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
    showDetail(item, button) {
      this.detail.name = item.name;
      this.detail.configs = item.extra;
      this.$root.$emit("bv::show::modal", "detail-modal", button);
    },
    resetDetail() {
      this.detail.name = "";
      this.detail.configs = null;
    },
    deleteTestcase(testcase) {
      if (window.confirm("Are you sure?")) {
        this.$store.dispatch("deleteFioTestcase", testcase);
      }
    }
  }
};
</script>
