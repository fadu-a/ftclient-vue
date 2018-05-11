<template>
  <b-container>
    <h1>New Scenario</h1>

    <br />

    <label for="scenarioTitle" id="label">Title:</label>
    <b-form-input
      id="scenarioTitle"
      v-model="scenario.name"
      class="w-75"
      type="text"
      placeholder="Enter the scenario name"/>

    <b-card
      border-variant="danger"
      header="<font size='5'><b>New Scenario</b></font> <font size='2'>You can move the card in order you want</font>"
      id="card">
      <draggable
        v-model="selected"
        class="dragArea">
          <b-btn
            v-for="(element, index) in selected"
            :key="element.id"
            variant="outline-secondary"
            class="mr-1 my-1">{{ index+1 }}. {{ element.name }}</b-btn>
      </draggable>
    </b-card>

    <b-card
      border-variant="secondary"
      header="<font size='5'><b>Test case list</b></font> <font size='2'>Select the testcases for scenario</font>"
      id="card">
        <b-btn
          v-for="(TC, index) in fioTestcases"
          :key="TC.id"
          variant="outline-secondary"
          class="mr-1"
          @click="addTC(TC)">{{ TC.name }}
        </b-btn>
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
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
  name: "FioScenarioNew",
  components: {
    draggable,
  },
  data() {
    return {
      selected: [],
      scenario: {
        name: ""
      },
      order: 1
    }
  },
  computed: {
    ...mapGetters(["fioTestcases"])
  },
  created() {
    this.$store.dispatch("getFioTestcases");
  },
  methods: {
    reset() {
      this.selected = []
    },
    save() {
      this.selected.forEach(function (value, i) {
        value.order = i+1
      }),
      console.log()
      this.$store.dispatch("addFioScenario", {
        name: this.scenario.name,
        testcases: this.selected,
        router: this.$router
      });
    },
    addTC(TC) {
      this.selected.push({id: TC.id, name: TC.name});
    }
  }
};
</script>

<style lang="scss">
#checkbox {
  width: 30px;
  margin-top: -26px;
  margin-left: 260px;
}
#card {
  margin-bottom: 20px;
  margin-top: 15px
}
#scenarioTitle {
  margin-left: 50px;
  margin-top: -40px;
}

</style>
