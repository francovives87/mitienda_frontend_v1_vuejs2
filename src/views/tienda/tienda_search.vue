<template>
  <div class="tienda_serach mt-8" :style="Home">
    <v-app-bar color="white" dense fixed height="60">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="col-11 col-sm-12 col-lg-6">
      <form v-on:submit.prevent="Buscar(kword)">
        <div class="input-group">
          <input
            type="search"
            class="form-control"
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
      </div>
    </v-app-bar>
    <div class="container">
      <div class="row d-flex justify-content-end">
        <div class="col-4 col-sm-4">
          <v-btn
            color="grey"
            elevation="2"
            small
            outlined
            @click="ClearSearch()"
            class="mt-2"
          >
            Limpiar <v-icon>mdi-delete </v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <!-- SERVICIOS -->
    <!-- CATEGORIAS SERVICIOS -->
    <div
      class="container"
      v-if="services.length > 0 || services_categories.length > 0"
    >
      <div class="row">
        <div class="col-10 col-sm-10">
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="40"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <font-awesome-icon icon="calendar-plus" /> &nbsp;<span
                  class="title_font"
                >
                  SERVICIOS
                </span>
              </div>
            </div>
          </v-alert>
        </div>
        <div
          class="col-12 col-sm-12 col-lg-4 cate_prod"
          v-if="services_categories.length > 0"
        >
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="38"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <font-awesome-icon icon="calendar-plus" /> &nbsp;<span
                  class="title_font_sub"
                >
                  Categorias de servicios
                </span>
              </div>
            </div>
          </v-alert>
        </div>
        <carousel
          :per-page="height"
          :mouse-drag="false"
          :navigationEnabled="height == 4 ? true : false"
          paginationPosition="false"
          :loop="true"
        >
          <slide
            v-for="(categorie, index) in services_categories"
            :key="index"
            class="categorias"
          >
            <router-link
              :to="{
                name: 'CategoriesServicesView',
                params: { category_id: categorie.id },
              }"
            >
              <div class="col-12 col-sm-12">
                <div class="card mb-3 text-center">
                  <img :src="categorie.image" alt="" class="img-fluid" />
                  <div class="card-body">
                    {{ categorie.name }}
                  </div>
                </div>
              </div>
            </router-link>
          </slide>
        </carousel>
      </div>
    </div>
    <!-- SERVICIOS -->
    <div class="container">
      <div class="container product">
        <div class="row">
          <div
            class="col-6 col-sm-6 col-lg-3"
            v-for="(service, index) in services"
            :key="index"
          >
            <router-link
              :to="{
                name: 'TiendaServicios',
                params: { service: service.id, name: tienda.name },
              }"
            >
              <div class="card col-md-12 mb-1">
                <div class="row">
                  <div class="col-12 col-sm-12 col-lg-12">
                    <img :src="service.image" class="cards_image" />
                  </div>
                  <div class="col-12 col-sm-12 col-lg-12">
                    <div class="card-body">
                      <div
                        class="card-title"
                        
                      >
                        {{ service.title }}
                      </div>

                      <div class="contenido">
                        <p>
                          <span class="item_text"
                            >{{ service.category.name }}
                          </span>
                          <br />
                          <span class="item_price">{{ service.price }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- FIN SERVICIOS -->

    <!-- PRODUCTOS -->
    <!-- CATEGORIAS PRODUCTOS -->
    <div class="container" v-if="products.length > 0 || categories.length > 0">
      <div class="row">
        <div class="col-12 col-sm-12">
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="40"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <font-awesome-icon icon="box" /> &nbsp;<span class="title_font">
                  PRODUCTOS
                </span>
              </div>
            </div>
          </v-alert>
        </div>
        <div
          class="col-9 col-sm-9 col-lg-4 cate_prod"
          v-if="categories.length > 0"
        >
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="38"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <font-awesome-icon icon="box" /> &nbsp;<span
                  class="title_font_sub"
                >
                  Categorias de productos
                </span>
              </div>
            </div>
          </v-alert>
        </div>
        <carousel
          :per-page="height"
          :mouse-drag="false"
          :navigationEnabled="height == 4 ? true : false"
          paginationPosition="false"
          :loop="true"
        >
          <slide
            class="categorias"
            v-for="(categorie, index) in categories"
            :key="index"
          >
            <router-link
              :to="{
                name: 'CategoriesView',
                params: { category_id: categorie.id },
              }"
            >
              <div class="col-12 col-sm-12">
                <div class="card mb-3 text-center">
                  <img :src="categorie.image" alt="" class="img-fluid" />
                  <div class="card-body">
                    {{ categorie.name }}
                  </div>
                </div>
              </div>
            </router-link>
          </slide>
        </carousel>
      </div>
    </div>
    <!-- PRODUCTOS -->
    <div class="container">
      <div class="container product">
        <div class="row">
          <div
            class="col-6 col-sm-6 col-lg-3"
            v-for="(product, index) in products"
            :key="index"
          >
            <router-link
              :to="{
                name: 'ProductDetail',
                params: { product: product.id, name: tienda.name },
              }"
            >
              <div class="card col-md-12 mb-1">
                <div class="row">
                  <div class="col-12 col-sm-12 col-lg-12">
                    <img :src="product.image" class="cards_image" />
                  </div>
                  <div class="col-12 col-sm-12 col-lg-12">
                    <div class="card-body">
                      <h5 class="card-title">
                        {{ product.title }}
                      </h5>

                      <div class="contenido" v-if="product.in_offer == false">
                        <p>
                          <span class="item_text"
                            >{{ product.category.name }}
                          </span>
                          <br />
                          <span class="item_price">{{ product.price }}</span>
                        </p>
                      </div>
                      <div
                        class="contenidoEnOferta"
                        v-if="product.in_offer == true"
                      >
                        <p>
                          <span class="item_text">{{ product.category.name }}</span> <br />
                          <span class="oldPrice">{{ product.price }}</span>
                          <br />
                          <span class="newPrice">{{
                            product.in_offer_price
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "tienda_search",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      kword: "",
      products: [],
      categories: [],
      services_categories: [],
      services: [],
      vacio: false,
    };
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
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
      this.SearchCategoryService(value);
      this.SearchService(value);
    },
  },
  methods: {
    Buscar(kword) {
      this.BuscarProducto(kword);
      this.SearchCategory(kword);
      this.SearchCategoryService(kword);
      this.SearchService(kword);
    },
    ClearSearch() {
      this.kword = "";
      this.products = [];
      this.categories = [];
      this.services_categories = [];
      this.services = [];
    },

    SearchCategoryService(kword) {
      axios
        .get(this.server + "/api/v1.0/tienda/search/services/categories/", {
          params: {
            kword: kword,
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          console.log("categorias de servicio");
          this.services_categories = response.data.results;
          console.log(this.services_categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SearchService(kword) {
      axios
        .get(this.server + "/api/v1.0/tienda/search/services/", {
          params: {
            kword: kword,
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          this.services = response.data.results;
          console.log("servicios");
          console.log(this.services);
        })
        .catch((error) => {
          console.log(error);
        });
    },

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
        .get(
          this.server +
            "/api/v1.0/category/search/?kword=" +
            kword +
            "&tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          console.log("categorias");
          this.categories = response.data.results;
          console.log(this.categories);
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
.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
}
.cate_prod {
  font-size: 12px;
  text-transform: uppercase;
}
.categorias span {
  color: yellowgreen;
  font-size: 19px;
  font-weight: 800;
  padding-left: 1px;
}

.categorias .card {
  border: 1px;
  border-radius: 3%;
  border: 5px gray;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 140px !important;
  height: 180px !important;
}

.categorias img {
  width: auto !important;
  border-radius: 3%;
  min-height: 130px !important;
}

.categorias .card:hover input {
  opacity: 1;
  transition: 1s;
}

.categorias input:hover {
  background-color: rgb(82, 75, 75);
  transition: 0.5s;
}

.card a {
  color: black !important;
}
.oldPrice {
  font-size: 12px !important;
  text-decoration: line-through;
}
.newPrice {
  color: green;
}
.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
}
.item_title {
  font-size: 12px;
  text-transform: uppercase;
  color: #000000;
}
.item_text {
  font-size: 13px;
}
.item_price {
  font-size: 13px;
  color: green;
}
.text_decription {
  font-size: 12px !important;
  color: gray;
}
.title_font {
  font-size: 12px !important;
}
.title_font_sub {
  font-size: 10px !important;
}

.cards_image {
  width: 100%;
  height: 100px !important;
}
.card{
  height: 264px !important;
}
.card-title{
  font-size: 15px !important;
}
@media only screen and (min-width: 768px) {
  .title_font {
    font-size: 16px !important;
  }
  .title_font_sub {
    font-size: 12px !important;
  }
  .card{
  height: 364px !important;
}
  .cards_image {
    width: 100%;
    height: 200px !important;
  }
}
</style>