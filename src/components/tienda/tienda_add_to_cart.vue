<template>
  <v-col>
    <v-row class="d-flex justify-center">
      <v-col cols="4">
        <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
          <v-btn elevation="4" icon @click="AddToCart()">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </v-col>
      <v-col cols="4">
        <v-btn elevation="4" icon @click="RemoveItem()">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "tienda_add_to_cart",
  props: ["product"],
  data() {
    return {
      count: 0,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations("cart", [
      "AddToCartVuex",
      "RemoveItemVuex",
      "AddToCartOnlyAttributeVuex",
    ]),
    AddToCart() {
      if (this.product.no_stock == false) {
        if (this.count != this.product.stock) {
          this.count++;
          this.AddToCartVuex(this.product);
        }
      } else {
        this.count++;
        this.AddToCartVuex(this.product);
      }
    },
    RemoveItem() {
      this.RemoveItemVuex(this.product);
      if (this.count != 0) {
        this.count--;
      }
    },
  },
};
</script>

<style>
</style>