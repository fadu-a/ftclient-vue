<template>
  <div class="runners">
    <b-container>
      <b-alert 
        :show="errorMessage" 
        variant="danger">
        {{ errorMessage }}
      </b-alert>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Runners",
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  }
};
</script>
