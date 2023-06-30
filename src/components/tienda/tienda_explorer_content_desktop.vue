<template>
  <div class="explorer_content_desk">
    <!-- CONTENT -->
    <!-- buscador -->
    <div class="container">
      <div class="row">
        <div class="col-10 col-lg-10">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Buscar..."
            v-model="kword"
          />
        </div>
        <div class="col-2 col-lg-2">
          <button
            type="button"
            class="btn btn-primary"
            @click="MostrarBuscador()"
          >
            <font-awesome-icon icon="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
    <!-- buscador -->

    <!-- botonera rapida -->
    <div class="container">
      <div class="row">
        <div class="col-12">
          <button
            type="button"
            :style="botones_estilo"
            @click="ChangeContent('portada')"
          >
            <font-awesome-icon icon="fa-home" /> &nbsp; PORTADA
          </button>
        </div>
      </div>
    </div>
    <!-- botonera rapida -->

    <!-- portada -->
    <div v-if="resultador_por === 'portada'">
      <div class="row">
        <div class="col-12 col-lg-12"><tienda_products_destacados_explorer /></div>
        
        <div class="col-12 col-lg-12"><tienda_products_off_explorer /></div>

        <div class="col-12 col-lg-12"><tienda_products_news_explorer /></div>

        <div class="col-12 col-lg-12"><tienda_services_explorer /></div>
      </div>
    </div>
    <!-- portada -->

    <!-- busqueda -->
    <tienda_explorer_content_search
      :kword="kword"
      v-if="resultador_por === 'busqueda'"
    />
    <!-- busqueda -->

    <!-- categoria name -->
    <div class="col-12 col-lg-12">{{ category_name }}</div>
    <!-- categoria name -->

    <!-- PRODUCTOS -->

    <div class="container" v-if="resultador_por === 'products'">
      <div class="row">
        <v-card class="cards" v-for="(product, index) in products" :key="index">
          <router-link
            :to="{
              name: 'ProductDetail',
              params: { product: product.id, name: tienda.name },
            }"
          >
            <div class="row">
              <div class="col-12 col-lg-12">
                <img :src="product.image" class="cards_image" />
              </div>
              <div class="col-12 col-lg-12 p-0">
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 17px !important">
                    {{ product.title }}
                  </h5>

                  <div class="contenido" v-if="product.in_offer == false">
                    <span class="cards_category">{{
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
                    <span class="cards_category">
                      {{ product.category.name }}</span
                    >
                    <p>
                      <span class="oldPrice">$ {{ product.price }}</span>
                      <br />
                      <span class="newPrice"
                        >$ {{ product.in_offer_price }}</span
                      >
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </v-card>
      </div>
    </div>
    <!-- SERVICIOS -->
    <div class="container" v-if="resultador_por === 'services'">
      <div class="container product">
        <div class="row">
          <v-card
            class="cards"
            v-for="(service, index) in services"
            :key="index"
          >
            <router-link
              :to="{
                name: 'TiendaServicios',
                params: { service: service.id, name: tienda.name },
              }"
            >
              <div class="row">
                <div class="col-12 col-lg-12">
                  <img :src="service.image" class="cards_image" />
                </div>
                <div class="col-12 col-lg-12">
                  <div class="card-body">
                    <div class="card-title" style="font-size: 15px !important">
                      {{ service.title }}
                    </div>
                    <div class="contenido">
                      <span class="category_name">{{
                        service.category.name
                      }}</span>
                      <br />
                      <span class="newPrice">$ {{ service.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import tienda_services_explorer from "../../components/tienda/tienda_services_explorer.vue";
import tienda_products_destacados_explorer from "../../components/tienda/tienda_products_destacados_explorer.vue";
import tienda_products_off_explorer from "../../components/tienda/tienda_products_off_explorer.vue";
import tienda_blog_entry from "../../components/tienda/tienda_blog_entry.vue";
import tienda_products_news_explorer from "../../components/tienda/tienda_products_news_explorer.vue";
import tienda_explorer_content_search from "../../components/tienda/tienda_explorer_content_search.vue";

export default {
  name: "tienda_explorer_content_desktop",
  props: ["category_id", "service_id"],
  components: {
    tienda_services_explorer,
    tienda_products_destacados_explorer,
    tienda_products_off_explorer,
    tienda_blog_entry,
    tienda_products_news_explorer,
    tienda_explorer_content_search,
  },

  data() {
    return {
      products: [],
      services: [],
      resultador_por: "portada",
      category_name: "",
      category_product_id: 0,
      category_service_id: 0,
      kword: "",
    };
  },

  computed: {
    ...mapState("tienda", ["tienda"]),

    botones_estilo() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "background-color:" +
          this.tienda.tienda_colors[0].alerts +
          " !important; border-radius: 3% !important; width:100px; height:40px !important; color: " +
          this.tienda.tienda_colors[0].alerts_font +
          "!important;"
        );
      }
    },
  },

  watch: {
    category_id: function (value) {
      console.log("watch category_id");
      console.log(value);
      this.category_product_id = value;
    },
    service_id: function (value) {
      console.log("EJECUTO GET SERVICES");
      this.category_service_id = value;
    },

    category_product_id: function (value) {
      console.log("waht de caregory_product");
      console.log(value);
      if (value != 0) {
        this.GetCategoryDetail(value);
      }
    },
    category_service_id: function (value) {
      console.log("waht de caregory_product");
      console.log(value);
      if (value != 0) {
        this.GetCategoryServiceDetail(value);
      }
    },
    kword: function (value) {
      this.MostrarBuscador();
      if (value == "") {
        this.ChangeContent("portada");
      }
    },
  },

  methods: {
    MostrarBuscador() {
      if (this.kword != "") {
        this.ChangeContent("busqueda");
      }
    },

    ChangeContent(value) {
      this.resultador_por = value;
      if (value == "portada") {
        this.category_name = "";
      }
    },

    GetCategoryDetail(category) {
      axios
        .get(this.server + "/api/v1.0/category/detail/" + category)
        .then((response) => {
          this.category_name = response.data.name;
          this.GetProductsOfCategory(category);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetProductsOfCategory(category) {
      axios
        .get(this.server + "/api/v1.0/category/product/list/", {
          params: {
            kword: category,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
          this.ChangeContent("products");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetCategoryServiceDetail(category) {
      axios
        .get(this.server + "/api/v1.0/service/category/detail/" + category)
        .then((response) => {
          this.category_name = response.data.name;
          this.GetServicesOFCategory(category);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetServicesOFCategory(category) {
      axios
        .get(this.server + "/api/v1.0/service/category/list/", {
          params: {
            category: category,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.services = response.data.results;
          this.ChangeContent("services");
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
  font-size: 14px !important;
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
.cards_category {
  font-size: 12px !important;
  color: gray;
}
.cards {
  width: 186px;
  height: 290px;
  margin: 2px;
}
.cards_image {
  width: 100%;
  height: 150px;
  border-radius: 3% !important;
}
.category_name {
  font-size: 12px !important;
}
</style>
