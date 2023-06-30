<template>
  <div class="col-7 col-sm-7">
    <div class="card" style="width: auto">
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
            Cantidad de productos: {{ count }} Total: $ {{ sumatoria }} <br>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tienda_cart_summary",

  methods: {
    ...mapMutations("cart", ["AddTotal","AddTotalTotal"]),
  },

  computed: {
    ...mapState("cart", ["count", "total", "envio","total_total"]),
    sumatoria() {
      let suma = parseInt(this.total) + parseInt(this.envio);
      this.AddTotalTotal(suma) 
      return suma;
    },
  },
};
</script>

<style scoped>
.resumen_carrito {
  font-size: 15px !important;
}
</style>