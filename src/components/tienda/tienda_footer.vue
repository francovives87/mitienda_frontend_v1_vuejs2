<template>
  <v-footer padless :color="navbar_color" class="hidden-sm-and-down">
    <v-col :style="navbar_font" class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>{{ tienda_name }}</strong>
      &nbsp; &nbsp;
      <!--       <v-btn
        elevation="4"
        icon
        style="background-color: white"
        @click="WhatsAppContact()"
      >
        <v-icon color="green">mdi-whatsapp</v-icon>
      </v-btn> -->
      <br />

      <span style="font-size: 12px">
        <a @click="$router.push({ name: 'Main' })"> mitienda.app</a>
      </span>
      <br />
    </v-col>
  </v-footer>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "tienda_footer",

  computed: {
    ...mapState("tienda", ["tienda"]),

    navbar_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].navbar;
      }
    },

    navbar_font() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].navbar_font + " !important;"
        );
      }
    },

    tienda_name() {
      if (!this.tienda.name) {
        return "Sin Nombre";
      } else {
        if (this.tienda.title) {
          return this.tienda.title;
        } else {
          return this.tienda.name;
        }
      }
    },
  },

  methods: {
    WhatsAppContact() {
      window.open(
        "https://api.whatsapp.com/send?phone=5493416560046",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.copyright {
  color: white !important;
}
</style>
