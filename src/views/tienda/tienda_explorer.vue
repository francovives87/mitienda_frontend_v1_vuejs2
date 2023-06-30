<template>
  <div class="exlporer mt-10" :style="Home">
    <div class="container">
      <div class="row">
        <tienda_category_services_mobile v-if="height == 1" />
        <tienda_category_products_mobile v-if="height == 1" />
        <tienda_explorer_desktop v-if="height == 2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tienda_category_services_mobile from "../../components/tienda/tienda_category_services_mobile.vue";
import tienda_category_products_mobile from "../../components/tienda/tienda_category_products_mobile.vue";
import tienda_explorer_desktop from "../../components/tienda/tienda_explorer_desktop.vue";
export default {
  name: "tienda_explorer",
  components: {
    tienda_category_services_mobile,
    tienda_category_products_mobile,
    tienda_explorer_desktop,
  },
  mounted() {
    window.scrollTo(0, 0);
  },

  computed: {
    ...mapState("tienda", ["tienda"]),

    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; min-height: 900px !important;"
          );
        }
      }
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 1;
        case "lg":
          return 2;
        case "xl":
          return 2;
      }
    },
  },
};
</script>

<style></style>
