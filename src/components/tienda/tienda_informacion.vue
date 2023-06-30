<template>
  <div>
    <tienda_informacion_mobile v-if="height == 1" />
    <tienda_informacion_desktop v-if="height > 1" />
  </div>
</template>

<script>
import tienda_informacion_mobile from "../../components/tienda/tienda_informacion_mobile.vue";
import tienda_informacion_desktop from "../../components/tienda/tienda_informacion_desktop.vue";
export default {
  name: "tienda_informacion.vue",
  components: {
    tienda_informacion_mobile,
    tienda_informacion_desktop,
  },

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