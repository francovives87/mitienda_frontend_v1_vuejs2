<template>
  <div class="off" v-if="productsOff.length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-lg-4">
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="48"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <a @click="GoToExplorer()">
                  <font-awesome-icon icon="fire" /> &nbsp;
                  <span class="title_font"> PRODUCTOS EN OFERTA </span>
                </a>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>
    <v-container>
      <carousel
        :per-page="height"
        :mouse-drag="true"
        :navigationEnabled="height > 2 ? true : false"
        paginationPosition="false"
        :loop="true"
      >
        <slide v-for="(item, i) in productsOff" :key="i">
          <div class="card products">
            <a @click="GoToDetail(item)">
              <img :src="item.image" alt="" />
              <div class="oferta" v-if="item.in_offer == true">En oferta</div>
            </a>
            <div class="card-body">
              <p class="product_description">
                <span class="product_title">{{ item.title }}</span> <br />
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
                  <div v-if="item.no_stock == false">
                    <span
                      :class="item.stock === 0 ? 'stock_red' : 'stock_green'"
                    >
                      DISPONIBLES: {{ item.stock }}
                    </span>
                  </div>
                  <div v-if="item.no_stock == true">
                    <span class="stock_green"> DISPONIBLES </span>
                  </div>
                </span>
                <span class="" v-if="item.has_variation == true">
                  stock en variaciones
                </span>
              </p>
            </div>
          </div>
        </slide>
      </carousel>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";
export default {
  name: "tienda_products_off",
  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      productsOff: [],
    };
  },
  mounted() {
    /* this.GetSalientsProducts(); */
    this.GetSalientsProducts();
  },

  methods: {
    GoToExplorer() {
      this.$router.push({
        name: "Explore",
        params: {
          name: this.tienda.name,
        },
      });
    },
    GoToDetail(product) {
      this.$router.push({
        name: "ProductDetail",
        params: { product: product.id },
      });
    },

    GetSalientsProducts() {
      axios
        .get(this.server + "/api/v1.0/products/off/list/" + this.tienda.id)
        .then((response) => {
          this.productsOff = response.data.results;
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
      console.log("this.$vuetify.breakpoint.name");
      console.log(this.$vuetify.breakpoint.width);
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (this.$vuetify.breakpoint.width < 360) {
            return 1;
          } else {
            return 2;
          }
        case "sm":
          return 2;
        case "md":
          return 2;
        case "lg":
          return 4;
        case "xl":
          return 4;
      }
    },
  },
};
</script>

<style scoped>
.category {
  font-size: 14px;
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
  width: 163px !important;
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
.title_font {
  font-size: 12px !important;
}

@media only screen and (min-width: 768px) {
  .title_font {
    font-size: 16px !important;
  }
  .products {
    width: 276px;
    height: 340px;
    position: relative;
  }
  .products img {
    width: 274px !important;
    height: 240px !important;
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
}
</style>