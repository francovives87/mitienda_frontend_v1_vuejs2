<template>
  <div class="carousel">
    <v-carousel :height="height" class="mt-12">
      <v-carousel-item
        v-for="(item, i) in sliders"
        :key="i"
        :src="item.image"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="linea" v-if="height > 360" :style="tienda_info_style"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "tienda_carousel",
  props: ["tienda"],
  data() {
    return {
      sliders: [],
      navbar_color: "",
      tienda_info_style: {
        backgroundColor: this.navbar_color,
      },
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 360;
        case "md":
          return 360;
        case "lg":
          return 540;
        case "xl":
          return 540;
      }
    },
  },
  watch: {
    navbar_color: function (value) {
      this.tienda_info_style.backgroundColor = this.navbar_color;
    },
  },
  mounted() {
    this.GetTiendaSliders();
    this.navbar_color = this.tienda.tienda_colors[0].navbar;
  },
  methods: {
    GetTiendaSliders() {
      console.log("tienda_carousel");
      axios
        .get(this.server + "/api/v1.0/tienda/slider/" + this.tienda.id)
        .then((response) => {
          this.sliders = response.data.results;
          console.log("this.sliders");
          console.log(this.sliders);
          if (this.sliders.length == 0) {
            this.sliders.push({
              image: this.server + "/media_root/defaults/default_slider_1.jpg",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.linea{
  height: 10px !important;
}
</style>
