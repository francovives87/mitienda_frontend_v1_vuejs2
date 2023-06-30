<template>
  <div>
    <v-app-bar :color="navbar_color" dense fixed class="hidden-md-and-up">
      <v-btn icon @click="$router.go(-1)" v-if="!isTiendaHome">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <img :src="tienda.logo" alt="" style="width:35px; height:42px;" class="mr-4">

      <v-toolbar-title 
      :style="navbar_font"
      >
        {{ tienda_name }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon 
      :to="{ name: 'tiendaSearch', params: { tienda: tienda } }"
      :style="navbar_font"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_barra_mobile",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState("tienda", ["tienda"]),

    isTiendaHome() {
      return this.$route.name === "TiendaHome";
    },

    tienda_name() {
      if (!this.tienda.name) {
        return "Sin Nombre";
      } else {
        if(this.tienda.title){
          return this.tienda.title
        }else {
          return this.tienda.name;
        }
        
      }
    },

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
        return 'color: '+this.tienda.tienda_colors[0].navbar_font + ' !important;';
      }
    },
  },
  /*  watch: {
    tienda: function (value) {
      this.navbar_color = this.tienda.tienda_colors[0].navbar;
      this.tienda_name = this.tienda.name;
    },
  }, */
};
</script>

<style scoped>

</style>