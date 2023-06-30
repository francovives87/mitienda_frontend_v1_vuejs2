<template>
  <v-carousel :height="height">
    <v-carousel-item
      v-for="(item, i) in sliders"
      :key="i"
      :src="item.image"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
import axios from "axios";
export default {
  name: "tienda_carousel",
  props:['tienda'],
  data() {
    return {
      sliders: [],
    };
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 500;
        case "xl":
          return 500;
      }
    },
  },
  mounted() {
    this.GetTiendaSliders();
  },
  methods: {
    GetTiendaSliders() {
      axios
        .get(this.server + "/api/v1.0/tienda/slider/"+this.tienda.id)
        .then((response) => {
           this.sliders = response.data.results;
           console.log(this.sliders);
        })
        .catch((error) => {
          console.log(error);
        });
      
    },
  },
};
</script>

<style>
</style>