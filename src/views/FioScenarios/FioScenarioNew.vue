<template>
  <b-container>
    <h2>Test case list     <font size="3">Select the testcases for scenario</font></h2>
    <b-table
      :fields="fields"
      :items="fioTestcases">
      <template
        slot="checkbox"
        slot-scope="row">
        <b-form-group>
          <b-form-checkbox-group
            v-model="selected">
            <b-form-checkbox
              :value="{id:row.item.id, name:row.item.name, order: Number}"/>
          </b-form-checkbox-group>
        </b-form-group>
      </template>
    </b-table>

    <br>

    <label 
      id="label" 
      for="scenarioTitle">Title:</label>
    <b-form-input
      id="scenarioTitle"
      v-model="scenario.name"
      class="w-75"
      type="text"
      placeholder="Enter the scenario name"/>

    <b-card
      id="card"
      border-variant="danger"
      header="<font size='4'><b>New Scenario</b></font> <font size='2'>You can move the card in order you want</font>">
      <draggable
        v-model="selected"
        class="dragArea">
        <b-btn
          v-for="(element, index) in selected"
          :key="element.id"
          variant="outline-secondary"
          class="mr-1"
          @click="orderReplace(index)">{{ index }}. {{ element.name }}</b-btn>
      </draggable>
    </b-card>

    <b-button
      variant="info"
      to="/fio/scenarios"
      class="mr-1">Back</b-button>
    <b-button
      variant="danger"
      class="mr-1"
      @click.stop="reset()">Reset</b-button>
    <b-button
      variant="primary"
      class="mr-1"
      @click.stop="save()">Save</b-button>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters } from "vuex";

export default {
  name: "FioScenarioNew",
  components: {
    draggable
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "checkbox", label: "Select" }
      ],
      selected: [],
      scenario: {
        name: ""
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
    reset() {
      this.selected = [];
      this.scenario.name = "";
    },
    save() {
      this.selected.forEach(function(value, i) {
        value.order = i + 1;
      }),
        this.$store.dispatch("addFioScenario", {
          name: this.scenario.name,
          testcases: this.selected,
          router: this.$router
        });
    }
  }
};
</script>

<style lang="scss">
#checkbox {
  width: 30px;
  margin-top: -25px;
  margin-left: 230px;
}
#card {
  margin-bottom: 20px;
  margin-top: 15px;
}
#scenarioTitle {
  margin-left: 50px;
  margin-top: -40px;
}
</style>
