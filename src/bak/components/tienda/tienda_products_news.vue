<template>
  <div class="product_new mb-12">
    <div class="container">
      <div class="row">
        <div
          class="col-6 col-sm-6"
          v-for="(item, i) in productsSalients"
          :key="i"
        >
          <div class="card products">
            <a @click="GoToDetail(item)">
              <img :src="item.image" alt="" />
              <div class="oferta" v-if="item.in_offer == true">En oferta</div>
            </a>
            <div class="card-body">
              <p class="product_description">
                <span class="product_title">{{ item.title.substring(0,20) }}</span> <br />
                {{ item.category.name }} <br />

                <span
                  :class="item.in_offer == true ? 'old_price' : 'product_price'"
                >
                  $ {{ item.price }}
                </span>

                <span
                  v-if="item.in_offer == true"
                  class="product_price_offert"
                  >{{ item.in_offer_price }}</span
                >
                <br />
                <span class="disponibles" v-if="item.has_variation == false">
                  <span :class="item.stock === 0 ? 'stock_red' : 'stock_green'">
                    DISPONIBLES: {{ item.stock }}
                  </span>
                </span>
                <span class="" v-if="item.has_variation == true">
                  stock en variaciones
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import tienda_add_to_cart from "../tienda/tienda_add_to_cart.vue";
import tienda_variacion_min_price from "../../components/tienda/tienda_variacion_min_price.vue";
import axios from "axios";
export default {
  name: "tienda_products_news",
  props: ["tienda"],
  components: {
    Carousel,
    Slide,
    tienda_add_to_cart,
    tienda_variacion_min_price,
  },

  data() {
    return {
      productsSalients: [],
    };
  },
  mounted() {
    /* this.GetSalientsProducts(); */
    this.GetSalientsProducts();
  },

  methods: {
    GoToDetail(product) {
      this.$router.push({
        name: "ProductDetail",
        params: { product: product.id },
      });
    },


    GetSalientsProducts() {
      axios
        .get(this.server + "/api/v1.0/products/news/" + this.tienda.id)
        .then((response) => {
          this.productsSalients = response.data.results;
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 2;
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
.category {
  font-size: 14px;
}
a {
  color: black !important;
}
.stock {
  font-size: 12px !important;
}

.stock_red {
  font-size: 12px !important;
  color: red;
}
.stock_green {
  font-size: 12px !important;
  color: green;
}
.products {
  width: 165px;
  height: 255px;
  position: relative;
}
.oferta {
  position: absolute;
  top: 10px;
  left: 0px;
  background-color: green;
  color: white;
  padding: 4px;
}
.old_price {
  text-decoration: line-through !important;
}

.products img {
  border-bottom: solid 1px #eeeeec !important;
  height: 165px !important;
  width: 165px !important;
}
.product_description {
  font-size: 12px !important;
  padding: 0px !important;
  margin: 0px !important;
}
.product_title {
  color: #000000 !important;
  font-size: 16px !important;
}
.product_price {
  color: green !important;
}
.product_price_offert {
  color: green;
  font-size: 15px !important;
  margin-left: 4px !important;
}
</style>