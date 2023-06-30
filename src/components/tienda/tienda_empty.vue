<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <v-alert border="right" colored-border :color="alert_borde_color" elevation="2">
            <div class="container">
              <div class="row">
                <div class="col-3 col-sm-3 col-lg-2 pl-0">
                  <img
                    :src="server + '/media_root/defaults/shop2_300.png'"
                    alt=""
                    style="width: 70px; heigth: 70px"
                  />
                </div>
                <div class="col-9 col-sm-9 col-lg-10">
                  <h3>Esta tienda esta vacia!</h3>
                  <p style="font-size: 14px !important">
                    El dueño de esta tienda aun no a cargado nada.
                  </p>
                </div>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_empty",
  computed: {
    ...mapState("tienda", ["tienda"]),

    alert_borde_color() {
      if (!this.tienda.name) {
        return "#9c06a8";
      } else {
        return this.tienda.tienda_colors[0].navbar;
      }
    },
  },
};
</script>

<style></style>
