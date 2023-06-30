<template>
  <div class="cart" :style="Home">
    <div class="container mt-8">
      <div class="row mt-2">
        <v-alert
          border="top"
          colored-border
          :color="navbar_color"
          elevation="2"
        >
          <div class="row">
            <div class="col-6 col-sm-6">
              <h4><v-icon>mdi-cart</v-icon>Carrito</h4>
            </div>
            <div class="col-4 col-sm-4 d-none d-block d-sm-none">
              <v-btn
                color="grey"
                elevation="2"
                small
                outlined
                @click="ClearCart()"
              >
                <v-icon>mdi-delete </v-icon> vaciar carrito
              </v-btn>
            </div>
          </div>
        </v-alert>
      </div>
    </div>

    <div v-if="totalPrice !== 0">
      <!-- este div if es para mostra empty componente si no hay items -->
      <div class="container">
        <div class="row">
          <tienda_cart_summary></tienda_cart_summary>

          <div
            class="
              col-6 col-lg-6
              d-none d-md-block d-lg-block d-xl-block d-sm-block
            "
          >
            <v-alert
              border="left"
              colored-border
              :color="navbar_color"
              elevation="2"
              min-height="227"
            >
              <div class="col-12 d-flex justify-content-center">
                <v-btn
                  elevation="2"
                  x-large
                  :style="text_button"
                  @click="ConfirmarPedido()"
                >
                  <font-awesome-icon icon="shopping-bag" /> &nbsp; ORDENAR!
                </v-btn>
              </div>
              <br />
              <div class="col-12 d-flex justify-content-center mt-6">
                <v-btn
                  color="grey"
                  elevation="2"
                  small
                  outlined
                  @click="ClearCart()"
                >
                  <v-icon>mdi-delete </v-icon> vaciar carrito
                </v-btn>
              </div>
            </v-alert>
          </div>
        </div>
      </div>
      <!-- PRODUCT -->
      <div class="container">
        <div class="container product">
          <div class="row mb-12" v-for="(product, index) in cart" :key="index">
            <div class="card">
              <div class="row">
                <div class="col-4 col-sm-4">
                  <img :src="product.image" class="product_image" />
                </div>
                <div class="col-8 col-sm-8 col-lg-6">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>

                    <div class="contenido">
                      <p>
                        <span style="font-size: 12px">
                          {{ product.category.name }}
                        </span>
                        <br />
                        <span
                          class="No_variations"
                          v-if="product.has_variation == false"
                        >
                          <span
                            :class="
                              product.in_offer == true ? 'oldPrice' : 'newPrice'
                            "
                            >{{ product.price }} <br
                          /></span>
                          <span v-if="product.in_offer == true" class="newPrice"
                            >{{ product.in_offer_price }} <br
                          /></span>
                        </span>
                        <span
                          class="with_variacion"
                          v-if="product.has_variation == true"
                        >
                          <span class="newPrice">{{ product.price }}</span>
                        </span>
                        <br />
                        <span
                          style="font-size: 12px; color: #000000"
                          v-if="product.has_variation == true"
                          >Variaciones:</span
                        >
                        <span
                          style="font-size: 12px; color: #000000"
                          v-if="product.has_options == true"
                          ><span v-if="product.only_attribute == true">
                            Opciones:
                          </span></span
                        >
                      </p>
                      <div class="variaciones mt-2" v-if="product.variaciones">
                        <ul class="list-group list-group-flush">
                          <li
                            class="list-group-item"
                            v-for="(vari, index) in product.variaciones"
                            :key="index"
                          >
                            {{ vari }}
                          </li>
                        </ul>

                        <!-- <div class="items">
                            <div
                              class="d-inline p-2 mr-2 bg-success text-white"

                            >
                              {{ item }}
                            </div>
                          </div> -->
                      </div>

                      <!-- Solo atributos -->
                      <div v-if="product.atributos">
                        <div v-if="product.atributos.length > 0">
                          <ul
                            class="list-group list-group-flush"
                            v-if="product.opciones.length > 0"
                          >
                            <li
                              class="list-group-item"
                              v-for="(op, index) in product.opciones"
                              :key="index"
                            >
                              {{ op }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <p class="cantidad">
                      <br />
                      Cantidad: {{ product.quantity }}
                    </p>
                    <div class="container" v-if="product.has_options == false">
                      <div class="row">
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="removeItem(product)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                        <div class="col-4">
                          <v-btn elevation="5" icon @click="addItem(product)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    <!-- Si tiene variaciones -->

                    <div class="container" v-if="product.has_variation == true">
                      <div class="row">
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="RemoveItemVuexWithVariation(product)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="addItemConVariacion(product)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>

                    <!-- Si es onlyattributes -->

                    <div class="container" v-if="product.atributos">
                      <div class="row" v-if="product.atributos.length > 0">
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="RemoveOnlyAttribute(product)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="AddOnlyAttribute(product)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>

                    <!--  -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- este div if es para mostra empty componente si no hay items -->

    <tienda_empty_cart v-else></tienda_empty_cart>
    <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="3"
      class="botoon d-none d-block d-sm-none"
    >
      <div class="d-flex justify-content-center">
        <v-btn
          elevation="2"
          x-large
          :style="text_button"
          @click="ConfirmarPedido()"
          :disabled="cart.length == 0"
        >
          <font-awesome-icon icon="shopping-bag" />&nbsp; Ordenar!
        </v-btn>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import tienda_empty_cart from "../../components/tienda/tienda_empty_cart.vue";
import tienda_cart_summary from "../../components/tienda/tienda_cart_summary.vue";
import tienda_navbar from "../../components/tienda/tienda_navbar.vue";
import tienda_bottom_navigation from "../../components/tienda/tienda_bottom_navigation.vue";

import axios from "axios";
export default {
  name: "tienda_cart",
  components: {
    tienda_empty_cart,
    tienda_cart_summary,
    tienda_navbar,
    tienda_bottom_navigation,
  },
  data() {
    return {};
  },
  mounted() {
    window.scrollTo(0, 0);
    console.log(this.cart);
  },

  computed: {
    ...mapState("cart", ["cart", "count", "total"]),
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

    totalPrice() {
      let price = 0;
      this.cart.map((el) => {
        if (el["has_variation"] == true) {
          price += el["quantity"] * el["price"];
          this.AddTotal(price);
        } else {
          if (el["in_offer"] == false) {
            price += el["quantity"] * el["price"];
            this.AddTotal(price);
          }
          if (el["in_offer"] == true) {
            price += el["quantity"] * el["in_offer_price"];
            this.AddTotal(price);
          }
        }
      });
      return price;
    },

    navbar_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].navbar;
      }
    },
    text_button() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return (
          "color: " +
          this.tienda.tienda_colors[0].navbar +
          "!important; font-weight: bold; background-color:#ffffff !important;"
        );
      }
    },
  },

  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuex",
      "RemoveItemVuexWithVariation",
      "AddTotal",
      "ClearCart",
      "AddToCartOnlyAttributeVuex",
      "RemoveItemtOnlyAttributeVuex",
    ]),

    AddOnlyAttribute(product) {
      product.flag = "fromCart";
      this.AddToCartOnlyAttributeVuex(product);
    },

    RemoveOnlyAttribute(product) {
      this.RemoveItemtOnlyAttributeVuex(product);
    },

    addItemConVariacion(product) {
      if (product.quantity != product.stock) {
        product.flag = "fromCart";
        this.AddToCartWithVariationVuex(product);
      }
    },

    addItem(product) {
      if (product.quantity != product.stock) {
        product.flag = "fromCart";
        this.AddToCartVuex(product);
      }
    },
    removeItem(product) {
      this.RemoveItemVuex(product);
    },
    ConfirmarPedido() {
      let data = {
        tienda: this.tienda.id,
      };

      axios
        .post(this.server + "/api/v1.0/tienda/orders/permission/", data)
        .then((response) => {
          this.$router.push({
            name: "TiendaDatosVentas",
          });
        })
        .catch((error) => {
          this.$swal.fire(
            "Limite de ordenes excedido!",
            "Esta tienda alcanzo el limite de ordenes que puede recibir segun su plan!",
            "error"
          );
        });
    },
  },
};
</script>

<style scoped>
.product a {
  color: black !important;
}
.product_image {
  height: 100px;
  width: 100px !important;
}
.category {
  font-size: 14px;
}
p {
  padding: 0px !important;
  margin: 0px;
}
.cantidad {
  padding: 0.3px !important;
}
h5 {
  margin-bottom: 0.5px !important;
  padding: 0.3px !important;
}
.oldPrice {
  font-size: 12px !important;
  text-decoration: line-through;
}
.newPrice {
  color: green;
}
.botoon {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 50px !important;
}

@media only screen and (min-width: 768px) {
  .product_image {
    height: 250px;
    width: 250px !important;
  }
}
</style>