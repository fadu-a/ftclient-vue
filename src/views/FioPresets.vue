<template>
  <div class="fio-presets">
    <b-container>
      <h1 class="mb-4">FIO Preset List</h1>

      <b-table
        :items="fioPresets"
        :fields="fields"
        hover>
        <template
          slot="actions"
          slot-scope="row">
          <b-button
            size="sm"
            variant="info">
            Show
          </b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FioPresets",
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  computed: {
    ...mapGetters(["fioPresets"])
  },
  created() {
    this.$store.dispatch("getPresets");
  }
};
</script>
