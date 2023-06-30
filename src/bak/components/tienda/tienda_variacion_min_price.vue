<template>
    <div class="price">
    <span class="desde">desde: </span>$  {{minPrice}}
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "tienda_variacion_min_price",
  props: ["product"],
  data() {
    return {
        product_id:0,
        minPrice:0,
    };
  },
  mounted(){
      this.GetMinPriceVariacionForProduct()
  },
  methods:{
      GetMinPriceVariacionForProduct(){
          axios
          .get(this.server+'/api/v1.0/admin/product/variation/min/'+this.product.id)
          .then(response =>{
              console.log("hasta aca estamos bien")
              console.log(response.data.results)
              this.minPrice =response.data.results[0].price
              console.log(this.minPrice)
          })
          .catch(error => {
              console.log(error)
          })
      },
  },
};
</script>

<style scoped>
.price{
    font-size: 15px !important;
}
.price .desde{
    color: black !important;
}
</style>