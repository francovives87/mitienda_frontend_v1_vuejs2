<template>
  <div>
    <tienda_navbar />
    <tienda_barra_mobile :tienda="tienda" />
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-6">
          <h4><v-icon>mdi-cart</v-icon> carrito</h4>
        </div>
        <div class="col-4 col-sm-4">
          <v-btn color="grey" elevation="2" small outlined @click="ClearCart()">
            <v-icon>mdi-delete </v-icon> vaciar carrito
          </v-btn>
        </div>
      </div>
    </div>

    <div v-if="totalPrice !== 0">
      <!-- este div if es para mostra empty componente si no hay items -->
      <div class="container">
        <div class="row d-flex align-items-center">
          <tienda_cart_summary></tienda_cart_summary>
          <div class="col-4 col-sm-4">
            <v-btn
              color="green"
              elevation="2"
              large
              outlined
              @click="ConfirmarPedido()"
            >
              <font-awesome-icon icon="shopping-bag" /> &nbsp; ORDENAR!
            </v-btn>
          </div>
        </div>
      </div>
      <!-- PRODUCT -->
      <div class="container">
        <div class="container product">
          <div class="row" v-for="(product, index) in cart" :key="index">
            <div class="card d-flex align-items-center">
              <div class="row">
                <div class="col-4 col-sm-4 d-flex justify-content-start">
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
                      style="height: 100px; width: 120px !important"
                    />
                  </router-link>
                </div>
                <div class="col-8 col-sm-8">
                  <div class="card-body ml-8">
                    <router-link
                      :to="{
                        name: 'ProductsDetail',
                        params: { product: product.id },
                      }"
                    >
                      <h5 class="card-title">{{ product.title }}</h5>
                    </router-link>
                    <div class="contenido">
                      <p class="card-text text-category"></p>
                      <p>
                        {{ product.category.name }} <br />
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
                      </p>
                      <div class="container">
                        <div
                          class="variaciones mt-2"
                          v-if="product.variaciones"
                        >
                          <div class="items">
                            <div
                              class="d-inline p-2 mr-2 bg-success text-white"
                              v-for="(item, index) in product.variaciones"
                              :key="index"
                            >
                              {{ item }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p class="cantidad">
                      <br />
                      Cantidad: {{ product.quantity }}
                    </p>
                    <div class="contaier" v-if="product.variaciones == []">
                      <div class="row">
                        <div class="col-4">
                          <v-btn elevation="5" icon @click="addItem(product)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="removeItem(product)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    <!-- Si tiene variaciones -->

                    <div class="contaier" v-if="product.variaciones != []">
                      <div class="row">
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="addItemConVariacion(product)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                        <div class="col-4">
                          <v-btn
                            elevation="5"
                            icon
                            @click="RemoveItemVuexWithVariation(product)"
                          >
                            <v-icon>mdi-minus</v-icon>
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
    <tienda_bottom_navigation :tienda="tienda" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import tienda_empty_cart from "../../components/tienda/tienda_empty_cart.vue";
import tienda_cart_summary from "../../components/tienda/tienda_cart_summary.vue";
import tienda_navbar from "../../components/tienda/tienda_navbar.vue";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";
import tienda_bottom_navigation from "../../components/tienda/tienda_bottom_navigation.vue";

import axios from "axios";
export default {
  name: "tienda_cart",
  props: ["tienda"],
  components: {
    tienda_empty_cart,
    tienda_cart_summary,
    tienda_navbar,
    tienda_barra_mobile,
    tienda_bottom_navigation,
  },
  data() {
    return {};
  },

  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuex",
      "RemoveItemVuexWithVariation",
      "AddTotal",
      "ClearCart",
    ]),

    addItemConVariacion(product) {
      if (product.quantity != product.stock) {
        this.AddToCartWithVariationVuex(product);
      }
    },

    addItem(product) {
      if (product.quantity != product.stock) {
        this.AddToCartVuex(product);
      }
    },
    removeItem(product) {
      this.RemoveItemVuex(product);
    },
    ConfirmarPedido() {
      this.$router.push({
        name: "TiendaDatosVentas",
      });
    },
  },

  computed: {
    ...mapState("cart", ["cart", "count", "total"]),
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
  },
};
</script>

<style scoped>
.product a {
  color: black !important;
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
</style>