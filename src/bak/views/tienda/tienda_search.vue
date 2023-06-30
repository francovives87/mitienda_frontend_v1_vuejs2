<template>
  <div>
    <v-app-bar color="white" dense fixed>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <form v-on:submit.prevent="SearchProductIcontains()">
        <div class="input-group">
          <input
            type="search"
            class="form-control form-control-dark"
            :placeholder="'Buscar en ' + tienda.name + '...'"
            aria-label="buscar"
            aria-describedby="button-addon2"
            name="kword"
            id="kword"
            v-model="kword"
          />
          <v-btn
            class="
              btn btn-outline-primary
              bg-white
              border-start-0 border
              rounded-pill
              ms-n3
            "
            type="submit"
            id="button-addon2"
            data-mdb-ripple-color="dark"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </form>
    </v-app-bar>
    <!-- CATEGORIAS -->
    <div class="container">
      <div class="row">
        <carousel
          :per-page="height"
          :mouse-drag="false"
          :navigationEnabled="height == 4 ? true : false"
          paginationPosition="false"
          :loop="true"
        >
          <slide
            class="d-inline-block align-middle mt-12"
            v-for="(categorie, index) in categories"
            :key="index"
          >
            <router-link
              :to="{
                name: 'CategoriesView',
                params: { category_id: categorie.id },
              }"
            >
              <v-chip class="m-1">
                {{ categorie.name }}
              </v-chip>
            </router-link>
          </slide>
        </carousel>
      </div>
    </div>
    <!-- PRODUCTOS -->
    <div class="container">
      <div class="container product">
        <div class="row" v-for="(product, index) in products" :key="index">
          <div class="card col-md-12 mb-1">
            <div class="row">
              <div class="col-6">
                <router-link
                  :to="{
                    name: 'ProductsDetail',
                    params: { product: product.id },
                  }"
                >
                  <img
                    :src="product.image"
                    class=""
                    alt="..."
                    style="height: 100px"
                  />
                </router-link>
              </div>
              <div class="col-6 col-sm-6 d-flex justify-content-center">
                <div class="card-body ">
                  <div class="linkTitle">
                    <router-link
                      active-link="active"
                      :to="{
                        name: 'ProductsDetail',
                        params: { product: product.id },
                      }"
                    >
                      <h5 class="card-title">{{ product.title }}</h5>
                    </router-link>
                  </div>
                  <p class="card-text"></p>
                  <p>{{ product.category.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tienda_bottom_navigation :tienda="tienda" />
  </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";
import tienda_bottom_navigation from "../../components/tienda/tienda_bottom_navigation.vue";
export default {
  name: "tienda_search",
  props: ["tienda"],
  components: {
    tienda_barra_mobile,
    tienda_bottom_navigation,
    Carousel,
    Slide,
  },
  data() {
    return {
      kword: "",
      products: [],
      categories: [],
    };
  },

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 4;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  watch: {
    kword(value) {
      this.BuscarProducto(value);
      this.SearchCategory(value);
    },
  },
  methods: {
    BuscarProducto(kword) {
      axios
        .get(
          this.server +
            "/api/v1.0/products/search/?kword=" +
            kword +
            "&tienda=" +
            this.tienda.id
        )
        .then((response) => {
          this.products = response.data.results;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SearchCategory(kword) {
      axios
        .get(this.server + "/api/v1.0/category/search/?kword=" + kword+'&tienda='+this.tienda.id)
        .then((response) => {
          console.log(response.data.results);
          console.log("categorias");
          this.categories = response.data.results;
          console.log(this.categories);
        })
        .catch((erorr) => {
          console.log(error);
        });
    },
    SearchProductIcontains() {
      axios
        .get(
          this.server +
            "/api/v1.0/products/search/icontains/?kword=" +
            this.kword + '&tienda='+this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
}
</style>