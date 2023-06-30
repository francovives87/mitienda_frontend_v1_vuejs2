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
          @click="SearchServiceOnCategory(kword)"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- CIERRA BARRA APP -->
    <!-- FILTROS -->
    <!-- <div class="accordion mt-10" id="accordionExample">
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
                <div class="col">
                  <v-switch v-model="masBarato" label="Mas Barato"></v-switch>
                </div>
                <div class="col">
                  <v-switch v-model="enOferta" label="En Oferta"></v-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- FILTROS -->
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
            <v-card class="col-md-12 mb-1">
              <div class="row d-flex align-items-center">
                <div class="col-6 col-sm-6">
                  <img
                    :src="category.image"
                    class=""
                    alt="..."
                    style="height: 120px; width:120px"
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
            </v-card>
          </a>
        </div>
      </div>
    </div>

    <!-- SUBCATEGORIAS -->

    <!-- SERVICES -->
    <div class="container" v-if="services.length > 0">
      <h6>{{ category.name }}</h6>
    </div>
    <div class="container">
      <div class="container product">
        <div class="row" v-for="(service, index) in services" :key="index">
          <router-link
            :to="{
              name: 'TiendaServicios',
              params: { service: service.id, name: tienda.name },
            }"
          >
            <v-card class="col-md-12 mb-2">
              <div class="row">
                <div class="col-5 col-sm-5">
                  <img
                    :src="service.image"
                    class=""
                    alt="..."
                    style="height: 120px; width: 120px"
                  />
                </div>
                <div class="col-7 col-sm-7">
                  <div class="card-body">
                    <div class="card-title" style="font-size: 17px !important">
                      {{ service.title }}
                    </div>

                    <div class="contenido">
                      <span class="text_decription">{{
                        service.description
                      }}</span>
                      <p>
                        <span class="item_title">categoria:</span>
                        <span class="item_text"
                          > {{ service.category.name }}
                        </span>
                        <br />
                        <span class="item_title">precio: </span>
                        <span class="item_price">$ {{ service.price }}</span>
                      </p>
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

export default {
  name: "tienda_category_service_view",
  props: ["category_id"],
  components: {},
  data() {
    return {
      category: [],
      services: [],
      kword: "",
      Kwordctg: 0,
      subcategories: [],
      category_to_search: 0,
      category_to_show: [],
      breadcrumbs: [],
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
      this.SearchServiceOnCategory(value);
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

    GetCategory(category) {
      axios
        .get(this.server + "/api/v1.0/service/category/detail/" + category)
        .then((response) => {
          console.log(response.data);
          this.category = response.data;
          this.category_to_show = response.data;
          this.category_to_search = response.data.id;
          this.GetServiceOffCategory(this.category_id);
          const checkUsername = (obj) => obj.id === category.id;
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

    GetCategoryToShow(category) {
      axios
        .get(this.server + "/api/v1.0/service/category/detail/" + category)
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

    GoToCategory(category_id) {
      this.category_to_search = category_id;
      this.GetServiceOffCategory(category_id);
      this.GetCategoryToShow(category_id);
    },

    GetServiceOffCategory(category) {
      axios
        .get(this.server + "/api/v1.0/service/category/list/", {
          params: {
            category: category,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.services = response.data.results;
          if (this.services.length == 0) {
            console.log("Esta vacio");
            axios
              .get(
                this.server +
                  "/api/v1.0/tienda/search/services/categories/subcategories/",
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

    SearchServiceOnCategory(kword) {
      if (kword === "") {
        this.GetServiceOffCategory(this.category_to_search);
      }
      axios
        .get(this.server + "/api/v1.0/tienda/search/services/on/categories/", {
          params: {
            kword: kword,
            category: this.category_to_search,
          },
        })
        .then((response) => {
          console.log("response");
          console.log(response.data);
          if (response.data.count > 0){
          this.services = response.data.results;
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
  font-size: 15px !important;
  color: gray;
}
</style>