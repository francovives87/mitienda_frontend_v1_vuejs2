<template>
  <div>
    <!-- Barra APP -->
    <v-app-bar color="white" dense fixed>
      <v-btn icon @click="GoToCategories()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="input-group">
        <input
          type="search"
          class="form-control form-control-dark"
          :placeholder="'Buscar en ' + category.name + '...'"
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
          @click="SearchProductOnCategoryIcontains()"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- CIERRA BARRA APP -->
    <!-- FILTROS -->
    <div class="accordion mt-10" id="accordionExample">
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
    </div>
    <!-- FILTROS -->
    <!-- PRODUCT -->
    <div class="container">
      <h6>{{ category.name }}</h6>
    </div>
    <div class="container">
      <div class="container product">
        <div class="row" v-for="(product, index) in products" :key="index">
          <div class="card col-md-12 mb-1">
            <div class="row">
              <div class="col-6 col-sm-6">
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
              <div class="col-6 col-sm-6">
                <div class="card-body">
                  <router-link
                    :to="{
                      name: 'ProductsDetail',
                      params: { product: product.id },
                    }"
                  >
                    <h5 class="card-title">{{ product.title }}</h5>
                  </router-link>
                  <div class="contenido" v-if="product.in_offer == false">
                    <p class="card-text text-category"></p>
                    <p>
                      {{ product.category.name }} <br />
                      {{ product.price }}
                    </p>
                  </div>
                  <div
                    class="contenidoEnOferta"
                    v-if="product.in_offer == true"
                  >
                    <p class="card-text text-category"></p>
                    <p>
                      {{ product.category.name }} <br />
                      <span class="oldPrice">{{ product.price }}</span> <br />
                      <span class="newPrice">{{ product.in_offer_price }}</span>
                      <br />
                    </p>
                    <span class="enOferta">en oferta!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";

export default {
  name: "tienda_category_view",
  props: ["tienda","category_id"],
  components: {
    tienda_barra_mobile,
  },
  data() {
    return {
      category: [],
      products: [],
      kword: "",
      Kwordctg: 0,
      masBarato: false,
      enOferta: false,
    };
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        /*           case "xs":
            return 1;
          case "sm":
            return 1;
          case "md":
            return 3; */
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
    masBarato(value) {
      console.log(this.masBarato);
      if (this.masBarato == true) {
        this.getPrudctsCheaps();
      } else {
        this.GetProductOfCategory();
      }
    },
    enOferta(value){
      if (this.enOferta == true){
        this.getPrudctsInOffert()
      } else {
        this.GetProductOfCategory();
      }
    }
  },

  mounted() {
    this.GetCategory();
  },
  methods: {

    GoToCategories(){
      this.$router.push({name:"Categories",params:{tienda:this.tienda}})
    },

    GetCategory() {
      axios
        .get(this.server + "/api/v1.0/category/detail/" + this.category_id)
        .then((response) => {
          console.log(response.data);
          this.category = response.data;
          this.GetProductOfCategory();
          this.Kwordctg = this.category.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetProductOfCategory() {
      axios
        .get(
          this.server +
            "/api/v1.0/category/product/list/?kword=" +
            this.category.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SearchProductOnCategory(kword) {
      axios
        .get(
          this.server +
            "/api/v1.0/oncategory/product/list/?kword=" +
            kword +
            "&Kwordctg=" +
            this.Kwordctg
        )
        .then((response) => {
          console.log(response.data);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SearchProductOnCategoryIcontains() {
      axios
        .get(
          this.server +
            "/api/v1.0/oncategory/search/icontains/?kword=" +
            this.kword +
            "&Kwordctg=" +
            this.Kwordctg
        )
        .then((response) => {
          console.log(response.data);
          this.products = response.data.results;
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
.product a {
  color: black;
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
</style>