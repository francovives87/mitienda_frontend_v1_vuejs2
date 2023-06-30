<template>
  <div class="detail mt-13">
    <tienda_barra_mobile></tienda_barra_mobile>
    <div class="container">
      <h4>{{ productDetail.title }}</h4>
      <v-divider></v-divider>
      <div class="row">
        <div class="col-12">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-sm-12">
                <img :src="productDetail.image" alt="" style="width: 100%" />
              </div>
            </div>
          </div>
          <div class="container">
            <h6>Mas imagenes:</h6>
          </div>
          <div class="container">
            <div class="row d-flex justify-content-center">
              <carousel
                :per-page="1"
                :mouse-drag="false"
                :navigationEnabled="height == 4 ? true : false"
                paginationPosition="false"
                :loop="true"
              >
                <slide
                  v-for="(image, index) in productDetail.images_product"
                  :key="index"
                >
                  <div class="container">
                    <div class="card" style="width: 16rem; height: 17rem">
                      <div class="card-body d-flex justify-content-center">
                        <img
                          style="width: 15rem; height: 15rem"
                          :src="image.image"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </slide>
              </carousel>
            </div>
          </div>
          <!-- tamaño grande -->
        </div>
      </div>
      <v-divider></v-divider>
      <div class="container">
        <div class="row">
          <div class="d-flex justify-content-end">
            <div class="mr-4">
              <p>
                <span style="font-size: 12px">
                  consultar sobre este producto por WhatsApp</span
                >
              </p>
            </div>
            <v-btn
              elevation="4"
              icon
              style="background-color: white"
              @click="WhatsAppContact()"
            >
              <v-icon color="green">mdi-whatsapp</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="container" v-if="productDetail.in_offer == false">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h3>$ {{ productDetail.price }}</h3>
            <p>
              {{ productDetail.category.name }}
            </p>
            <h6>Descrpcion:</h6>
            <p>
              {{ productDetail.description }}
            </p>
            <h6>
              <span v-if="productDetail.has_variation == false"
                >STOCK: {{ productDetail.stock }}</span
              >
            </h6>
          </div>
        </div>
      </div>
      <!-- Si esta en oferta! -->
      <div class="container" v-if="productDetail.in_offer == true">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h6>producto con descuento!</h6>
            <p>
              <span class="oldPrice">{{ productDetail.price }}</span>
            </p>

            <h3 class="newPrice">$ {{ productDetail.in_offer_price }}</h3>
            <p>
              {{ productDetail.category.name }}
            </p>
            <h6>Descrpcion:</h6>
            <p>
              {{ productDetail.description }}
            </p>
            <h6>
              <span v-if="productDetail.has_variation == false"
                >STOCK: {{ productDetail.stock }}</span
              >
            </h6>
          </div>
        </div>
      </div>

      <!-- Sin variacion -->
      <v-row v-if="productDetail.has_variation == false">
        <tienda_add_to_cart :product="productDetail"></tienda_add_to_cart>
      </v-row>
      <!-- Sin variacion -->

      <!-- Variaciones -->
      <div class="container" v-if="productDetail.has_variation == true">
        <div class="row">
          <div class="col-xl-6 col-sm-12">
            <h6>Variaciones</h6>
            <div class="row" v-if="atributos.length == 0">
              <h6>
                El administrador aun no agrego variantes para este producto.
              </h6>
            </div>
            <div
              class="row"
              v-for="(atributo, index) in atributos"
              :key="index"
            >
              <h6>{{ atributo.nombre }}</h6>
              <div class="btn-group" role="group" aria-label="Basic example">
                <v-btn
                  v-for="(item, index) in atributo.atributo_item"
                  :key="index"
                  elevation="3"
                  outlined
                  type="button"
                  class="mr-1"
                  @click="SelectVariation(item)"
                >
                  {{ item.item }}
                </v-btn>
              </div>
            </div>
            <div class="row mt-4" v-if="variationValuesforChild.length > 0">
              <h6>selecciono:</h6>
              <div class="col-xl-6 col-sm-12 mt-2">
                <div
                  class="d-inline p-2 mr-2 bg-dark text-white"
                  v-for="(item, index) in variationValuesforChild"
                  :key="index"
                >
                  {{ item.item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- variacion todavia no buscada -->
      <div class="container" v-if="flagResultadoBusquedaVariaciones == 0">
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-sm-12"></div>
        </div>
      </div>

      <!-- variacion NO encontrada -->
      <div class="container" v-if="flagResultadoBusquedaVariaciones == 2">
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-sm-12">Variacion no encontrada!</div>
        </div>
      </div>

      <!-- Variacion ENCONTRADA -->

      <!-- loading -->
      <div class="container mt-4" v-if="loading == true">
        <div class="row">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <strong>Cargando...</strong>
                <div
                  class="spinner-border ms-auto text-success"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" v-if="flagResultadoBusquedaVariaciones == 1">
        <v-container><v-divider></v-divider> </v-container>
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-sm-12">
            <div class="items">
              <div
                class="d-inline p-2 mr-2 bg-success text-white"
                v-for="(item, index) in variacionEncontrada.item"
                :key="index"
              >
                {{ item.item }}
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-12">
            <div class="card" style="width: 18rem">
              <div class="card-body">
                <p class="card-text">
                  <span class="variacion_titulos"> precio: $ </span
                  >{{ variacionEncontrada.price }} <br />
                  <span class="variacion_titulos"> stock: </span
                  >{{ variacionEncontrada.stock }}
                </p>

                <v-row class="d-flex justify-center">
                  <v-col cols="4">
                    <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
                      <v-btn
                        elevation="4"
                        icon
                        @click="AddToCartWithVariation()"
                      >
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                      elevation="4"
                      icon
                      @click="RemoveItemToCartWithVariation()"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="productDetail.has_variation == true">
        <div
          class="bottm"
          style="height: 500px"
          v-if="flagResultadoBusquedaVariaciones != 1"
        ></div>
      </div>
    </div>
    <v-container>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapState, mapMutations } from "vuex";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";
import tienda_add_to_cart from "../../components/tienda/tienda_add_to_cart.vue";
import axios from "axios";
import tienda_add_to_cartVue from "../../components/tienda/tienda_add_to_cart.vue";
export default {
  name: "productDetailWithVariacion",
  components: {
    Carousel,
    Slide,
    tienda_barra_mobile,
    tienda_add_to_cart,
  },
  props: ["product"],
  data() {
    return {
      productDetail: [],
      product_id: "",
      images: [],
      variaciones: [],
      atributos: [],
      variationValuesforChild: [],
      variacionEncontrada: [],
      flagResultadoBusquedaVariaciones: 0,
      loading: false,
    };
  },
  mounted() {
    this.product_id = this.product;
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
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuexWithVariation",
    ]),

    WhatsAppContact() {
      if (this.tienda.tienda_informacion[0].whatsapp == null) {
        this.$swal.fire(
          "WhatsApp NO conectado!",
          "el admnistrador de esta tienda, aun no ha conectado un numero valido para WhatsApp",
          "error"
        );
      } else {
        window.open(
          "https://api.whatsapp.com/send?phone=" +
            this.tienda.tienda_informacion[0].whatsapp +
            "&text=Hola!%20tengo%20una%20consulta%20de%20su%20tienda.%20sobre%20el%20producto:%20%0A" +
            this.productDetail.title,
          "_blank"
        );
      }
    },

    AddToCartWithVariation() {
      let variaciones = [];

      this.variationValuesforChild.forEach(function callback(value, index) {
        variaciones.push(value.item);
      });
      console.log(variaciones);

      this.productDetail.variaciones = variaciones;

      console.log(this.productDetail);

      console.log("variacion seleccionada");
      console.log(this.variacionEncontrada);

      /* REEMPLAZO EL PRECIO DE LA BASE DE DATOS, POR EL DE LA VARIACIONE ENCONTRADA */
      this.productDetail.price = this.variacionEncontrada.price;

      this.AddToCartWithVariationVuex(this.productDetail);
    },

    RemoveItemToCartWithVariation() {
      this.RemoveItemVuexWithVariation(this.productDetail);
    },

    SelectVariation(value) {
      if (this.variationValuesforChild.length == this.atributos.length) {
        this.variationValuesforChild.splice(
          0,
          this.variationValuesforChild.length
        );
      }

      if (this.variationValuesforChild.some((elem) => elem.id === value.id)) {
        var index = this.variationValuesforChild.findIndex(
          (item) => item.id === value.id
        );
        this.variationValuesforChild.splice(index, 1, value);
      } else {
        this.variationValuesforChild.push(value);
      }

      console.log(this.variationValuesforChild);

      let items = [];

      this.variationValuesforChild.forEach((item) => {
        items.push(item.id);
      });

      console.log("====items=====");
      console.log(items);
      console.log("====items=====");

      if (this.variationValuesforChild.length == this.atributos.length) {
        console.log("aca ejecuto funcion para buscar");
        this.buscarVariacion(items);
      }
    },

    buscarVariacion(items) {
      let data = {
        product: this.product_id,
        item: items,
      };

      let variSelect = 0;

      axios
        .post(this.server + "/api/v1.0/admin/product/variations/search/", data)
        .then((response) => {
          this.loading = true;
          console.log(response.data);
          let variacion = response.data;
          variacion.forEach((vari) => {
            if (vari.repeticiones === this.atributos.length) {
              console.log("esta es");
              variSelect = vari.pk;
              console.log(variSelect);
            }
          });
          if (variSelect == 0) {
            console.log("variacion no encontrada!");
            this.variacionEncontrada = [];
            this.flagResultadoBusquedaVariaciones = 2;
            this.loading = false;
          } else {
            axios
              .get(
                this.server + "/api/v1.0/admin/product/variation/" + variSelect
              )
              .then((response) => {
                this.variacionEncontrada = response.data;
                /* Le agrego la variacion al productDetail, para agregar y elimar */
                this.productDetail.variacion_id = this.variacionEncontrada.id;
                console.log("variacion encontrada");
                console.log(this.variacionEncontrada);
              });
            this.flagResultadoBusquedaVariaciones = 1;
            this.loading = false;
            window.scrollTo(
              0,
              document.body.scrollHeight ||
                document.documentElement.scrollHeight
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProduct() {
      axios
        .get(this.server + "/api/v1.0/products/detail/" + this.product_id)
        .then((response) => {
          console.log(response.data);
          this.productDetail = response.data;

          this.GetAtributosOfProduct();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetAtributosOfProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/atributos/?kword=" +
            this.product
        )
        .then((response) => {
          console.log(response.data.results);
          console.log("atributos");
          this.atributos = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetVariacionesOfProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/variations/?kword=" +
            this.product
        )
        .then((response) => {
          this.variaciones = response.data.results;
          console.log("*****variaciones*****");
          console.log(this.variaciones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    product_id: function (value) {
      console.log("aca");
      this.getProduct();
    },
  },
};
</script>

<style scoped>
.oldPrice {
  text-decoration: line-through;
}

.newPrice {
  color: green;
}
.atributo_name {
  display: inline-block !important;
}

.variacion_titulos {
  color: black !important;
}
</style>