<template>
  <div :style="Home">
    <tienda_loading v-if="load == false" />
    <div id="tienda">
      <tienda_navbar />

      <div id="content" v-if="load == true">
        <tienda_carousel :tienda="tienda"></tienda_carousel>
        <tienda_informacion />
        <v-container>
          <v-alert
            border="left"
            :color="alerts_color"
            :style="alerts_font_color"
          >
            Blog / Novedades
          </v-alert>
          <tienda_blog_entry :tienda="tienda"></tienda_blog_entry>
        </v-container>

        <v-container>
          <v-alert
            border="left"
            :color="alerts_color"
            :style="alerts_font_color"
          >
            Productos Destacados
          </v-alert>
        </v-container>
        <tienda_products_destacados
          :tienda="tienda"
        ></tienda_products_destacados>
        <v-container>
          <v-alert
            border="left"
            :color="alerts_color"
            :style="alerts_font_color"
          >
            Productos en ofertas!
          </v-alert>
        </v-container>
        <tienda_products_off :tienda="tienda"></tienda_products_off>
        <v-container>
          <v-alert
            border="left"
            :color="alerts_color"
            :style="alerts_font_color"
          >
            Productos recientemente agregados.
          </v-alert>
          <tienda_products_news :tienda="tienda"></tienda_products_news>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import tienda_navbar from "../components/tienda/tienda_navbar.vue";
import tienda_barra_mobile from "../components/tienda/tienda_barra_mobile.vue";
import tienda_carousel from "../components/tienda/tienda_carousel.vue";
import tienda_products_destacados from "../components/tienda/tienda_products_destacados.vue";
import tienda_products_off from "../components/tienda/tienda_products_off.vue";
import tienda_blog_entry from "../components/tienda/tienda_blog_entry.vue";
import tienda_products_news from "../components/tienda/tienda_products_news.vue";
import tienda_loading from "../components/tienda/tienda_loading.vue";
import tienda_informacion from "../components/tienda/tienda_informacion.vue"
export default {
  name: "Home",

  components: {
    tienda_carousel,
    tienda_products_destacados,
    tienda_products_off,
    tienda_blog_entry,
    tienda_products_news,
    tienda_barra_mobile,
    tienda_navbar,
    tienda_loading,
    tienda_informacion,
  },
  data() {
    return {
      load: false,
    };
  },

  created() {
    this.GetTienda();
  },

  mounted() {},
  computed: {
    ...mapState("tienda", ["tienda"]),

    alerts_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].alerts;
      }
    },

    alerts_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].alerts_font + " !important;"
        );
      }
    },

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
            ")  !important; background-repeat: repeat !important;"
          );
        }
      }
    },
  },
  methods: {
    ...mapMutations("tienda", ["AddTienda"]),
    GetTienda() {
      let name_tienda = this.$route.params.name;
      console.log("name tienda");
      console.log(name_tienda);
      axios
        .get(this.server + "/api/v1.0/tienda/" + name_tienda)
        .then((response) => {
          console.log("getTienda");
          console.log(response.data.results);
          if (response.data.count == 0) {
            this.$router.push({ name: "error404" });
          }

          this.AddTienda(response.data.results[0]);
          console.log(this.tienda);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((final) => {
          console.log("termino la carga");
          this.load = true;
        });
    },
  },
};
</script>

<style scoped>
/*  .Home{
  background-image: url('http://127.0.0.1:8000/media_root/watercolor.png')  !important;
  background-color: #F5D0D0;
  background-repeat:repeat
}  */



</style>