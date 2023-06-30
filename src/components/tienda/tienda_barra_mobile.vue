<template>
  <v-app-bar :color="navbar_color" dense fixed class="hidden-md-and-up">
    <v-btn icon @click="$router.go(-1)" v-if="!isTiendaHome && !isTiendaAdmin">
      <v-icon :style="navbar_font_color">mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn icon @click="$router.push({ name: 'Main' })" v-if="isTiendaHome">
      <v-icon :style="navbar_font_color">mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="$router.push({ name: 'TiendaHome', params: { name: tienda.name } })"
      v-if="isTiendaAdmin"
    >
      <v-icon :style="navbar_font_color">mdi-chevron-left</v-icon>
    </v-btn>

    <img :src="tienda.logo" alt="" style="width: 45; height: 45px" class="mr-4" />

    <v-toolbar-title :style="navbar_font">
      {{ tienda_name }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      :to="{ name: 'tiendaSearch', params: { tienda: this.tienda.name } }"
      :style="navbar_font"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_barra_mobile",
  data() {
    return {
      title_font_db: [],
      font_title: {
        fontFamily: null,
      },
    };
  },
  created() {},

  mounted() {},

  methods: {
    ChangeFont() {
      /* que capo dios mio!! */
      /* como no puedo modificar la variable en css, creo la regla css cuando se crea el componente! */
      if (this.tienda.tienda_colors[0].font_title) {
        /* busco el div testigo con el nombre de la fuente */
        /* si ya esta es porque ya se creo y no vuevlo a crear el style con el @import */
        const div_flag_import_font = document.getElementById(
          this.tienda.tienda_colors[0].font_title.name
        );
        if (div_flag_import_font == null) {
          console.log("CAMBIO LA FUENTE");
          console.log(this.tienda.tienda_colors[0].font_title);
          console.log("URL");
          var url = this.tienda.tienda_colors[0].font_title.url;
          var css = this.tienda.tienda_colors[0].font_title.css;
          console.log(url);
          console.log(css);
          this.font_title.fontFamily = css;
          var style = document.createElement("style");
          /* creo un div con el nombre de la fuente que importe, para no volver a importarla */
          /* despues al princio del codigo, si ya existe un div con el nombre de esa fuente, */
          /* no lo cargo otra vez */
          var style_ref = document.createElement("div");
          style_ref.setAttribute("id", this.tienda.tienda_colors[0].font_title.name);
          style.type = "text/css";
          style_ref.type = "text/css";
          style.innerHTML = " @import url('" + url + "'); ";
          document.getElementsByTagName("head")[0].appendChild(style);
          document.getElementsByTagName("body")[0].appendChild(style_ref);
        } else {
          /* si ya existe un div testigo con el nombre de la fuente */
          /* es porque ya esta creado y cambio el stilo dinamicamente */
          this.font_title.fontFamily = this.tienda.tienda_colors[0].font_title.css;
        }
        /* busco si ya esta cargado */
        console.log("RESULTADO DE LA BUSQUEDA EN EL DOM");
        console.log(div_flag_import_font);
      } else {
        this.font_title.fontFamily = "'Oswald', sans-serif;";
      }
    },
  },

  computed: {
    ...mapState("tienda", ["tienda"]),

    isTiendaHome() {
      return this.$route.name === "TiendaHome";
    },
    isTiendaAdmin() {
      return this.$route.name === "AdminHome";
    },

    tienda_name() {
      if (!this.tienda.name) {
        return "Sin Nombre";
      } else {
        if (this.tienda.title) {
          this.ChangeFont();
          return this.tienda.title;
        } else {
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
        return (
          "color: " +
          this.tienda.tienda_colors[0].navbar_font +
          " !important; font-family:" +
          this.font_title.fontFamily +
          " !important; font-size:" +
          this.tienda.tienda_colors[0].font_title_size +
          "px !important;"
        );
      }
    },
    navbar_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " +
          this.tienda.tienda_colors[0].navbar_font +" !important;"
        );
      }
    },
  },
};
</script>

<style scoped></style>
