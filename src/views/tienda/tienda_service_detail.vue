<template>
  <div class="service_detail mt-10">

    <tienda_service_detail_mobile v-if="height == 1" :service="service_detail" />
    <tienda_service_detail_desktop v-if="height > 1" :service="service_detail" />


  </div>
</template>

<script>
import tienda_service_detail_desktop from "../../components/tienda/tienda_service_detail_desktop.vue";
import tienda_service_detail_mobile from "../../components/tienda/tienda_service_detail_mobile.vue";


export default {
  name: "tienda_service_detail",
  props: ["service"],
  components: {
    tienda_service_detail_desktop,
    tienda_service_detail_mobile,
  },
  data() {
    return {
      service_detail:[],
    };
  },

  created() {
    this.service_detail = this.service;
  },

  mounted() {
    window.scrollTo(0, 0);
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

  methods: {},
};
</script>

<style scoped>
</style>