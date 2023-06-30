<template>
  <div class="tienda_explorer_content_search">
    <!-- SERVICIOS -->
    <!-- SERVICIOS -->
    <div class="container">
      <div class="container product">
        <div class="row">
          <div
            class="col-6 col-sm-6 col-lg-4"
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
                      <div class="card-title">
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
    <div class="container">
      <div class="container product">
        <div class="row">
          <div
            class="col-6 col-sm-6 col-lg-4"
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
                          <span class="item_text">{{
                            product.category.name
                          }}</span>
                          <br />
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
  name: "tienda_explorer_content_search",
  props: ["kword"],
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      products: [],
      services: [],
      vacio: false,
    };
  },
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
      console.log("HOLA");
      this.BuscarProducto(value);

      this.SearchService(value);
    },
  },
  methods: {
    Buscar(kword) {
      this.BuscarProducto(kword);

      this.SearchService(kword);
    },
    ClearSearch() {
      this.kword = "";
      this.products = [];
      this.services = [];
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
.card {
  height: 264px !important;
}
.card-title {
  font-size: 15px !important;
}
@media only screen and (min-width: 768px) {
  .title_font {
    font-size: 16px !important;
  }
  .title_font_sub {
    font-size: 12px !important;
  }
  .card {
    height: 364px !important;
    width: 280px !important;
  }
  .cards_image {
    width: 100%;
    height: 200px !important;
  }
}
</style>