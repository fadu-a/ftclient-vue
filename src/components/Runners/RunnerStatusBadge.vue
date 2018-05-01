<template>
  <b-badge :variant="variantType">{{ badgeText }}</b-badge>
</template>

<script>
export default {
  name: "RunnerStatusBadge",
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    variantType() {
      switch (this.status) {
        case "ok":
          return "success";
        default:
          return "danger";
      }
    },
    badgeText() {
      switch (this.status) {
        case "ok":
          return "Idle";
        default:
          return "Not Reachable";
      }
    }
  }
};
</script>
