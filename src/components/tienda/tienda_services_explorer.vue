<template>
  <div class="services" v-if="Services.length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-lg-6">
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="48"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <font-awesome-icon icon="star" /> &nbsp;
                <span class="title_font"> SERVICIOS DESTACADOS </span>
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
        <slide v-for="(item, i) in Services" :key="i">
          <div class="card products">
            <a @click="GoToDetail(item)">
              <img :src="item.image" alt="" />
            </a>
            <div class="card-body">
              <p class="product_description">
                <span class="product_title">{{ item.title }}</span> <br />
                <span style="color: #000000">Precio: </span
                ><span style="color: green">{{ item.price }}</span> <br />
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
  name: "tienda_services_explorer",

  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      Services: [],
    };
  },
  created() {
    this.GetServices();
    console.log("CARGA SERVICES??");
  },
  mounted() {
    /* this.GetSalientsProducts(); */
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

  methods: {
    GoToExplorer() {
      this.$router.push({
        name: "Explore",
        params: {
          name: this.tienda.name,
        },
      });
    },

    GoToDetail(service) {
      this.$router.push({
        name: "TiendaServicios",
        params: { service: service.id },
      });
    },

    GetServices() {
      console.log("LLEGO A GETSERVICES");
      axios
        .get(this.server + "/api/v1.0/services/list/?tienda=" + this.tienda.id)
        .then((response) => {
          this.Services = response.data.results;

          console.log("SERVICES");
          console.log(response.data);
          console.log(this.Services);
        })
        .catch((error) => {
          console.log(error);
        });
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
.products {
  width: 165px;
  height: 255px;
  position: relative;
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
    width: 194px;
    height: 320px;
    position: relative;
  }
  .products img {
    width: 192px !important;
    height: 200px !important;
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