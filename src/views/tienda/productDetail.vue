<template>
  <div class="detail mt-12">
    
    <tienda_product_detail_mobile v-if="height == 1" :product="product_detail" />
    <tienda_product_detail_desktop v-if="height > 1" :product="product_detail" />
 
  </div>
</template>

<script>
import tienda_product_detail_mobile from '../../components/tienda/tienda_product_detail_mobile.vue';
import tienda_product_detail_desktop from '../../components/tienda/tienda_product_detail_desktop.vue';
export default {
  name: "productDetailWithVariacion",
  components:{
    tienda_product_detail_mobile,
    tienda_product_detail_desktop
  },

  props: ["product"],
  data() {
    return {
      product_detail:[]
    };
  },

  created(){
    this.product_detail = this.product
  },



  computed: {
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
};
</script>

<style scoped>

</style>