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
        case 1:
          return "success";
        default:
          return "danger";
      }
    },
    badgeText() {
      switch (this.status) {
        case 1:
          return "Idle";
        default:
          return "Not Reachable";
      }
    }
  }
};
</script>
