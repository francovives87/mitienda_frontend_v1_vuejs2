<template>
  <div class="tienda_entry_view">
    <tienda_entry_detail_desktop v-if="height > 1" :entry="entry_detail" />
    <tienda_entry_detail_mobile v-if="height == 1" :entry="entry_detail" />
  </div>
</template>

<script>
import tienda_entry_detail_desktop from "../../components/tienda/tienda_entry_detail_desktop.vue";
import tienda_entry_detail_mobile from "../../components/tienda/tienda_entry_detail_mobile.vue";

export default {
  name: "tienda_entry_view",
  components: {
    tienda_entry_detail_desktop,
    tienda_entry_detail_mobile,
  },
  props: ["entry"],
  data() {
    return {
      entry_detail: null,
    };
  },

  created() {
    this.entry_detail = this.entry;
  },

  mounted() {},
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },
};
</script>

<style scoped>
</style>