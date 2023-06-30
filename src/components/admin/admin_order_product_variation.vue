<template>
  <div class="col-8 col-sm-8" v-if="variaciones.length > 0">
    <span style="font-size: 13px">variaciones:</span>
    <div v-for="(vari, index) in variaciones" :key="index">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(items, index) in vari.item"
          :key="index"
        >
          {{ items.item }}
        </li>
      </ul>
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
  created() {},
  mounted() {
    console.log(this.product);
    this.GetVariacionOffProduct();
  },
  methods: {
    GetVariacionOffProduct() {
      console.log("esto viene del componente");
      if (this.product.variacion_id != null) {
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
      }
    },
  },
};
</script>

<style>
</style>