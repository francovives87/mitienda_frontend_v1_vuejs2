<template>
  <div class="variation">
    <div v-for="(vari, index) in variaciones" :key="index">
        <p>variaciones</p>
      <p
        class="d-inline p-2 bg-primary text-white mr-1"
        v-for="(items, index) in vari.item"
        :key="index"
      >
        {{ items.item }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "admin_order_product_variation",
  props: ["product"],
  data() {
    return {
      variaciones: [],
    };
  },
  created() {
    console.log(this.product);
    this.GetVariacionOffProduct();
  },
  methods: {
    GetVariacionOffProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/variation/detail/?product=" +
            this.product.product.id +
            "&variation=" +
            this.product.variacion_id
        )
        .then((response) => {
          console.log(response.data.results);
          this.variaciones = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>