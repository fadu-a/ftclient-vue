<template>
  <div class="fio-results">
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "FioResults",
  created() {
    this.$store.dispatch("getFioResults");
  }
};
</script>
