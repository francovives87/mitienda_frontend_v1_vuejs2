<template>
  <div>
    <tienda_loading v-if="load == false" />
    <div id="tienda" :style="Home">
      <div class="content" v-if="load == true">
        <div class="mobile mt-12 mb-12" v-if="height === 1">
          <tienda_carousel :tienda="tienda"></tienda_carousel>
          <tienda_informacion />

          <tienda_empty v-if="store_empty == true" />

          <tienda_blog_entry />

          <tienda_services />

          <tienda_products_destacados />
          <tienda_products_off />

          <tienda_products_news />
        </div>
        <div class="desktop" v-if="height > 1">
          <tienda_carousel :tienda="tienda"></tienda_carousel>

          <tienda_empty v-if="store_empty == true" />

          <tienda_blog_entry />

          <tienda_services />

          <tienda_products_destacados />

          <tienda_products_off />

          <tienda_products_news />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import tienda_explorer_desktop from "../components/tienda/tienda_explorer_desktop.vue";
import tienda_carousel from "../components/tienda/tienda_carousel.vue";
import tienda_products_destacados from "../components/tienda/tienda_products_destacados.vue";
import tienda_products_off from "../components/tienda/tienda_products_off.vue";
import tienda_blog_entry from "../components/tienda/tienda_blog_entry.vue";
import tienda_products_news from "../components/tienda/tienda_products_news.vue";
import tienda_loading from "../components/tienda/tienda_loading.vue";
import tienda_informacion from "../components/tienda/tienda_informacion.vue";
import tienda_services from "../components/tienda/tienda_services.vue";
import tienda_empty from "../components/tienda/tienda_empty.vue";
export default {
  name: "Home",

  components: {
    tienda_carousel,
    tienda_products_destacados,
    tienda_products_off,
    tienda_blog_entry,
    tienda_products_news,
    tienda_loading,
    tienda_informacion,
    tienda_services,
    tienda_empty,
    tienda_explorer_desktop,
  },
  data() {
    return {
      load: false,
      store_empty: true,
    };
  },

  created() {
    this.GetTienda();
  },

  mounted() {},
  computed: {
    ...mapState("tienda", ["tienda"]),

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

    alert_borde_color() {
      if (!this.tienda.name) {
        return "#9c06a8";
      } else {
        return this.tienda.tienda_colors[0].navbar;
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
            ")  !important; background-repeat: repeat !important; min-height: 900px !important;"
          );
        }
      }
    },
  },
  methods: {
    ...mapMutations("tienda", [
      "AddTienda",
      "AddMitienda",
      "ChangeTiendaEmpty",
    ]),

    GetTienda() {
      let name_tienda = this.$route.params.name;
      console.log("name tienda");
      console.log(name_tienda);
      axios
        .get(this.server + "/api/v1.0/tienda/" + name_tienda)
        .then((response) => {
          console.log("getTienda");
          console.log(response.data.results);
          var tienda_id = response.data.results[0].id;
          if (response.data.count == 0) {
            this.$router.push({ name: "error404" });
          }
          this.AddTienda(response.data.results[0]);
          /* busco si hay objetos en la tienda */
          axios
            .get(
              this.server +
                "/api/v1.0/admin/tienda/objects/?tienda=" +
                response.data.results[0].id
            )
            .then((response) => {
              console.log("BUSCO OBJETOS EN TIENDA");
              console.log(response.data);
              var objetos_basicos =
                response.data.productos +
                response.data.sliders +
                response.data.services;
              console.log(objetos_basicos);
              if (objetos_basicos == 0) {
                console.log("esta tienda es nueva y esta vacia");
                this.ChangeTiendaEmpty("empty");
                this.store_empty = true;
              } else {
                this.ChangeTiendaEmpty("no_empty");
                this.store_empty = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(this.tienda);
          /* Visitor, Creo el TiendaVisitor, para guardar la visita */
          console.log("ejecuto TiendaVisitorCreate");
          var data = {
            tienda: tienda_id,
            visitor: localStorage.getItem("visitor"),
          };
          axios
            .post(this.server + "/api/v1.0/store/visitor/create/", data)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
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
