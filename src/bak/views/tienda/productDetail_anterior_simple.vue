<template>
  <div class="detail">
    <div class="container mt-10">
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

          <div class="container hidden-sm-and-up">
            <h6>Mas imagenes:</h6>
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
                  STOCK: <span>{{ productDetail.stock }}</span>
                </h6>
              </div>
              <v-row>
                <tienda_add_to_cart
                  :product="productDetail"
                ></tienda_add_to_cart>
              </v-row>
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
                  STOCK: <span>{{ productDetail.stock }}</span>
                </h6>
              </div>
              <v-row>
                <tienda_add_to_cart
                  :product="productDetail"
                ></tienda_add_to_cart>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-container>
      <v-divider></v-divider>
    </v-container>

    <!-- tamaño grande -->
    <div class="container d-none d-sm-flex">
      <v-gallery :images="images" :caption="false"></v-gallery>
    </div>
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
  name: "productDetail",
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
    };
  },

  created() {

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
    ...mapMutations("cart", ["AddToCartVuex"]),

    getProduct() {
      axios
        .get(this.server + "/api/v1.0/products/detail/" + this.product_id)
        .then((response) => {
          console.log(response.data);
          this.productDetail = response.data;
          let images = response.data.images;

          images.map((img) => {
            this.images.push({
              title: "a",
              url: this.server + img,
            });
          });
          console.log("images");
          console.log(this.images);
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
</style>