<template>
  <div>
    <!-- Barra APP -->
    <v-app-bar color="white" dense fixed>
      <v-btn icon @click="GoToExplorer()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="input-group">
        <input
          type="search"
          class="form-control form-control-dark"
          :placeholder="'Buscar en ' + category_to_show.name + '...'"
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
          @click="SearchProductOnCategory(kword)"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- CIERRA BARRA APP -->
    <!-- FILTROS -->
    <div
      class="accordion mt-10"
      id="accordionExample"
      v-if="subcategories.length == 0"
    >
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <v-icon>mdi-sort</v-icon> Filtros
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="container">
              <div class="row">
                <div class="col-4">
                  <v-btn
                    elevation="2"
                    small
                    outlined
                    @click="getPrudctsCheaps()"
                    >Mas barato</v-btn
                  >
                </div>
                <div class="col-4">
                  <v-btn
                    elevation="2"
                    small
                    outlined
                    @click="getPrudctsInOffert()"
                    >En oferta</v-btn
                  >
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <span style="font-size: 12px">Filtrar por marca</span>
                </div>
                <div class="col-12 col-sm-12">
                  <div
                    class="d-inline-block align-middle"
                    v-for="(item, index) in marcas"
                    :key="index"
                  >
                    <v-chip
                      class="m-1"
                      v-if="item.marca != null"
                      @click="FilterProductByMarca(item.marca)"
                    >
                      <a> {{ item.marca }} </a>
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row d-flex justify-content-end">
                <div class="col-5">
                  <v-btn
                    elevation="2"
                    outlined
                    x-small
                    @click="GetProductOfCategory(category_to_search)"
                    ><v-icon x-small> mdi-delete </v-icon> Limpiar Filtros
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FILTROS -->

    <!-- PRODUCT -->
    <div class="container mt-8">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div
            class="d-inline-block align-middle"
            v-for="(item, index) in breadcrumbs"
            :key="index"
          >
            <v-chip class="m-1" @click="GoToCategory(item.id)">
              {{ item.name }}
            </v-chip>
          </div>
        </div>
      </div>
    </div>

    <!-- SUBCATEGORIAS -->
    <div class="container" v-if="subcategories.length > 0">
      <div class="row">
        <div class="col-10 col-sm-10">
          <div class="tienda_nuevas_title">Subcategorias</div>
        </div>
      </div>
      <div class="container product">
        <div
          class="row"
          v-for="(category, index) in subcategories"
          :key="index"
        >
          <a @click="GoToCategory(category.id)">
            <div class="card col-md-12 mb-1">
              <div class="row">
                <div class="col-6 col-sm-6">
                  <img
                    :src="category.image"
                    class=""
                    alt="..."
                    style="height: 100px"
                  />
                </div>
                <div class="col-6 col-sm-6">
                  <div class="card-body">
                    <div class="card-title">{{ category.name }}</div>

                    <div class="contenido">
                      <p class="card-text text-category"></p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- SUBCATEGORIAS -->

    <!-- PRODUCTOS -->

    <div class="container mb-12">
      <div class="container product">
        <div class="row" v-for="(product, index) in products" :key="index">
          <router-link
            :to="{
              name: 'ProductDetail',
              params: { product: product.id, name: tienda.name },
            }"
          >
            <v-card class="col-md-12 mb-3">
              <div class="row">
                <div class="col-5 col-sm-5">
                  <img
                    :src="product.image"
                    class=""
                    alt="..."
                    style="width: 120px; height: 120px"
                  />
                </div>
                <div class="col-7 col-sm-7">
                  <div class="card-body">
                    <span style="font-size: 14px !important">
                      {{ product.title }}
                    </span>
                    <br />
                    <span style="font-size: 12px !important;color:black;" v-if="product.marca">{{product.marca}}</span>

                    <div class="contenido" v-if="product.in_offer == false">
                      <span class="text_decription">{{
                        product.category.name
                      }}</span>
                      <p>
                        <br />
                        <span class="newPrice">$ {{ product.price }}</span>
                      </p>
                    </div>
                    <div
                      class="contenidoEnOferta"
                      v-if="product.in_offer == true"
                    >
                      <p>
                        {{ product.category.name }} <br />
                        <span class="oldPrice">$ {{ product.price }}</span>
                        <br />
                        <span class="newPrice"
                          >$ {{ product.in_offer_price }}</span
                        >
                        <br />
                      </p>
                      <span class="enOferta">en oferta!</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";

export default {
  name: "tienda_category_view",
  props: ["category_id"],
  components: {
    tienda_barra_mobile,
  },
  data() {
    return {
      category: [],
      products: [],
      subcategories: [],
      category_to_search: 0,
      category_to_show: [],
      kword: "",
      Kwordctg: 0,
      breadcrumbs: [],
      marcas: [],
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return "1100px";
        case "xl":
          return "auto";
      }
    },
  },

  watch: {
    kword(value) {
      this.SearchProductOnCategory(value);
    },
  },

  created() {
    this.GetCategory(this.category_id);
  },
  methods: {
    GoToExplorer() {
      this.$router.push({
        name: "Explore",
        params: { tienda: this.tienda },
      });
    },
    GoToCategory(category_id) {
      this.category_to_search = category_id;
      this.GetProductOfCategory(category_id);
      this.GetCategoryToShow(category_id);
    },

    GetCategory(category) {
      axios
        .get(this.server + "/api/v1.0/category/detail/" + category)
        .then((response) => {
          console.log("GetCategory");
          console.log(response.data);
          this.category = response.data;
          this.category_to_show = response.data;
          this.category_to_search = response.data.id;
          console.log("category_to_search");
          console.log(this.category_to_search);
          this.GetProductOfCategory(this.category_id);
          this.Kwordctg = this.category.id;
          const checkUsername = (obj) => obj.id === category.id;
          const check = this.breadcrumbs.some(checkUsername);
          console.log(check);
          if (check == false) {
            console.log("este es false");
            this.breadcrumbs.push(response.data);
          } else {
            console.log("ya esta");
          }
          this.GetMarcasOnCategory(category);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetMarcasOnCategory(category) {
      axios
        .get(this.server + "/api/v1.0/product/categories/marcas/", {
          params: {
            category: category,
          },
        })
        .then((response) => {
          console.log("GET MARCAS");
          console.log(response.data.results);
          this.marcas = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetCategoryToShow(category) {
      axios
        .get(this.server + "/api/v1.0/category/detail/" + category)
        .then((response) => {
          console.log(response.data);
          this.category_to_show = response.data;
          const checkUsername = (obj) => obj.id === category;
          const check = this.breadcrumbs.some(checkUsername);
          console.log(check);
          if (check == false) {
            console.log("este es false");
            this.breadcrumbs.push(response.data);
          } else {
            console.log("ya esta");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetProductOfCategory(category) {
      axios
        .get(this.server + "/api/v1.0/category/product/list/?kword=" + category)
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
          if (this.products.length == 0) {
            console.log("Esta vacio");
            axios
              .get(
                this.server +
                  "/api/v1.0/tienda/search/product/categories/subcategories/",
                {
                  params: {
                    tienda: this.tienda.id,
                    category: category,
                  },
                }
              )
              .then((response) => {
                console.log("subcategorias");
                this.subcategories = response.data.results;
                console.log(this.subcategories);
              });
          } else {
            this.subcategories = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SearchProductOnCategory(kword) {
      if (kword === "") {
        this.GetProductOfCategory(this.category_to_search);
      }
      console.log("SearchProductOnCategory");
      console.log(kword);
      console.log(this.category_to_search);
      console.log(this.tienda.id);
      axios
        .get(this.server + "/api/v1.0/oncategory/product/list/", {
          params: {
            kword: kword,
            category: this.category_to_search,
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.count > 0) {
            this.products = response.data.results;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* FILTROS */

    getPrudctsCheaps() {
      axios
        .get(
          this.server +
            "/api/v1.0/categories/product/cheap/?Kwordctg=" +
            this.Kwordctg
        )
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPrudctsInOffert() {
      axios
        .get(
          this.server +
            "/api/v1.0/categories/product/inoffert/?Kwordctg=" +
            this.Kwordctg
        )
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    FilterProductByMarca(marca) {
      axios
        .get(this.server + "/api/v1.0/product/categories/marcas/filter/", {
          params: {
            category: this.category_id,
            marca: marca,
          },
        })
        .then((response) => {
          console.log("FILTRAR POR MARCA");
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

.card-body a {
  color: black !important;
}

.accordion-body {
  padding: 0.5px !important;
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
  font-size: 16px !important;
  color: gray;
}
</style>