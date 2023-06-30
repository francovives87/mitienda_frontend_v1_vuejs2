<template>
  <div class="col-12 col-sm-12 col-lg-6">
    <v-alert
      border="left"
      colored-border
      :color="navbar_color"
      elevation="3"
    >
      <div class="card-body">
        <h6 class="card-title">
          <v-icon>mdi-cart</v-icon> <br />
          RESUMEN DE LA COMPRA <br />
        </h6>
        <h6 class="card-subtitle mb-2">contenido del carrito</h6>
        <div class="card-text">
          <p class="resumen_carrito">
            Total productos: $ {{ total }} <br />
            Envio: $ {{ envio }} <br />
            Cantidad de productos: {{ count }} <br /> 
            Total: $ {{ sumatoria }} <br />
          </p>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tienda_cart_summary",

  methods: {
    ...mapMutations("cart", ["AddTotal", "AddTotalTotal"]),
  },

  computed: {
    ...mapState("cart", ["count", "total", "envio", "total_total"]),
    ...mapState("tienda", ["tienda"]),
    sumatoria() {
      let suma = parseInt(this.total) + parseInt(this.envio);
      this.AddTotalTotal(suma);
      return suma;
    },

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

<style scoped>
.resumen_carrito {
  font-size: 15px !important;
}
.relative{
  position:absolute;
}
</style>