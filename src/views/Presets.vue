<template>
  <div class="container">
    <h1 class>Preset List</h1>
    <template>
      <b-table :fields="fields" :items="presetList" hover>
        <template slot="actions" slot-scope="row">
          <b-btn variant="info" size="sm">Detail</b-btn>
        </template>
      </b-table>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Presets",
  computed: {
    ...mapGetters(["presetList"])
  },
  created() {
    this.$store.dispatch("getPresetList");
  },
  data() {
    return {
      fields: [
        { key: 'scenario.id', label:'ID', sortable: true},
        { key: 'name', label: 'Name', sortable: true },
        { key: 'actions', label: 'Actions'}
      ]
    }
  }
};
</script>
