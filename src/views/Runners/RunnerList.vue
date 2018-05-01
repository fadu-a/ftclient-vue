<template>
  <div class="runner-list">
    <h1 class="mb-4">Test Runner List</h1>

    <b-button
      variant="primary"
      class="float-right mb-2"
      to="/runners/new">
      Add Runner
    </b-button>

    <b-table
      :items="runnerList"
      :fields="fields"
      hover>
      <template
        slot="status"
        slot-scope="row">
        <RunnerStatusBadge status="row.value"/>
      </template>
      <template
        slot="actions"
        slot-scope="row">
        <b-button
          size="sm"
          class="mr-1"
          variant="info"
          @click.stop="">
          Show
        </b-button>
        <b-button
          :to="{ name: 'runner-edit', params: { runnerId: row.item.id } }"
          size="sm"
          class="mr-1"
          variant="primary">
          Edit
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          variant="danger"
          @click.stop="deleteRunner(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import RunnerStatusBadge from "../../components/Runners/RunnerStatusBadge.vue";

export default {
  name: "RunnerList",
  components: {
    RunnerStatusBadge
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "host", label: "IP Address", sortable: true },
        { key: "port", label: "Port" },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  computed: {
    runnerList() {
      return this.$store.getters.runnerList;
    }
  },
  created() {
    this.$store.dispatch("getRunnerList");
  },
  methods: {
    deleteRunner(runner) {
      if (window.confirm("Are you sure?")) {
        this.$store.dispatch("deleteRunner", runner);
      }
    }
  }
};
</script>
