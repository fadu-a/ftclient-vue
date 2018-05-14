<template>
  <b-badge :variant="variantType">{{ badgeText }}</b-badge>
</template>

<script>
export default {
  name: "RunnerStatusBadge",
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  computed: {
    variantType() {
      switch (this.status) {
        case 0:
          return "info";
        case 1:
          return "success";
        default:
          return "danger";
      }
    },
    badgeText() {
      switch (this.status) {
        case 0:
          return "In progress";
        case 1:
          return "Finished";
        default:
          return "Error";
      }
    }
  }
};
</script>
