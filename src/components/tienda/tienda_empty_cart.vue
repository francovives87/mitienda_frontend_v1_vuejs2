<template>
  <div class="container">
    <v-alert border="left" colored-border :color="navbar_color" elevation="2">
      <h6>El carrito esta vacio!</h6>
    </v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_empty_cart",
  computed: {
        ...mapState("tienda", ["tienda"]),
    navbar_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].navbar;
      }
    },
  },
};
</script>

<style>
</style>