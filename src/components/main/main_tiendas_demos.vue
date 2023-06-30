<template>
  <div class="main_visitor_recientes">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-4 col-sm-4 col-lg-5"><hr /></div>
        <div
          class="col-4 col-sm-4 col-lg-2 pr-0 pl-0 d-flex justify-content-center align-items-center"
        >
          <span class="title_bar"
            ><font-awesome-icon icon="fa-star" /> TIENDAS DE MUESTRA
          </span>
        </div>
        <div class="col-4 col-sm-4 col-lg-5"><hr /></div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <carousel
              :per-page="height"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="false"
              :loop="true"
            >
              <slide v-for="(tienda, i) in tiendas" :key="i">
                <v-card elevation="2" outlined class="mb-1 ml-1" height="240" width="150">
                  <div class="container d-flex align-items-center">
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'TiendaHome',
                          params: { name: tienda.name },
                        }"
                      >
                        <div class="row">
                          <div class="col-12 col-sm-12 d-flex justify-content-center">
                            <img
                              :src="tienda.logo"
                              alt=""
                              style="width: auto !important; height: 60px !important"
                            />
                          </div>
                          <div class="info_item_avg">
                            <div class="rating_container">
                              <v-icon small color="orange" class="dot">mdi-star</v-icon>
                              &nbsp;
                              <span
                                class="rating_number"
                                v-if="tienda.average.rating__avg > 0"
                                >{{
                                  (
                                    Math.round(tienda.average.rating__avg * 100) / 100
                                  ).toFixed(1)
                                }}</span
                              >
                              <span
                                class="rating_number"
                                v-if="tienda.average.rating__avg == null"
                                >0</span
                              >
                            </div>
                          </div>
                          <div class="col-12 col-sm-12">
                            <span class="tienda_title"> {{ tienda.title }}</span>
                            <p class="tienda_description">
                              {{ tienda.description }} <br />
                              <span class="location" v-if="tienda.geo_tienda[0]">
                                {{ tienda.geo_tienda[0].ciudad }}</span
                              >
                              <br />
                              <span class="address" v-if="tienda.geo_tienda[0]">{{
                                tienda.geo_tienda[0].direccion
                              }}</span>
                            </p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </v-card>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "main_tiendas_demos",
  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      tiendas: [],
    };
  },

  computed: {
    ...mapState("user", ["user_store", "user_location"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 8;
        case "xl":
          return 6;
      }
    },
  },

  watch: {
    user_location: function (value) {
      this.GetTiendasDestacadas();
    },
  },

  mounted() {
    this.GetTiendasDestacadas();
  },

  methods: {
    GetTiendasDestacadas() {
      axios
        .get(this.server + "/api/v1.0/store/demos/")
        .then((response) => {
          console.log("GetTiendasDestacadas");
          this.tiendas = response.data.results;
          console.log(this.tiendas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
}
hr {
  color: #a011ad !important;
}
.title_bar {
  font-size: 12px !important;
  color: #a011ad !important;
}

.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
}
.info_item_avg {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  height: 20px;
  width: 20px;
  background-color: #efefef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating_container {
  border: 1px solid #a1a1a1;
  border-radius: 10% !important;
  width: 50px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating_number {
  padding-right: 3px;
}
.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
}
.tienda_title {
  color: #000000;
  font-size: 16px !important;
}
.tienda_description {
  font-size: 10px !important;
  color: gray !important;
  text-transform: uppercase !important;
  margin-top: 2px !important;
}
.location {
  color: gray;
  font-size: 10px;
  text-transform: uppercase !important;
  margin-top: 2px !important;
}
.address {
  color: #000000 !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
}
</style>
