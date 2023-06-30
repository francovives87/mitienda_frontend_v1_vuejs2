<template>
  <div class="favorites" v-if="tiendas_favoritas.length > 0">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-4 col-sm-4 col-lg-5"><hr /></div>
        <div
          class="col-4 col-sm-4 col-lg-2 pr-0 pl-0 d-flex justify-content-center align-items-center"
        >
          <span class="title_bar"
            ><font-awesome-icon icon="fa-heart" /> TIENDAS FAVORITAS
          </span>
        </div>
        <div class="col-4 col-sm-4 col-lg-5"><hr /></div>
        <div class="row">
          <div class="col-12 col-sm-12 pb-0 mb-0">
            <carousel
              :per-page="height"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="false"
              :loop="true"
            >
              <slide
                style="height: 130px"
                v-for="(tienda, i) in tiendas_favoritas"
                :key="i"
              >
                <div class="circle">
                  <div class="container d-flex align-items-center">
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'TiendaHome',
                          params: { name: tienda.tienda.name },
                        }"
                      >
                        <div class="row">
                          <div class="col-12 col-sm-12 d-flex justify-content-center">
                            <img
                              :src="tienda.tienda.logo"
                              alt=""
                              style="width: auto !important; height: 38px !important"
                            />
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "main_favorites",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      tiendas_favoritas: [],
    };
  },
  computed: {
    ...mapState("user", ["user_store"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 3;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 8;
        case "xl":
          return 8;
      }
    },
  },

  mounted() {
    this.GetFavoritesStores();
  },

  methods: {
    GetFavoritesStores() {
      axios
        .get(this.server + "/api/v1.0/store/favorites/?user=" + this.user_store.id)
        .then((response) => {
          console.log("ACA FAVORITOS!!");
          console.log(response.data.results);
          this.tiendas_favoritas = response.data.results;
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
  color: #000000 !important;
  font-size: 10px !important;
}
hr {
  color: #a011ad !important;
}
.title_bar {
  font-size: 12px !important;
  color: #a011ad !important;
}

.circle {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  margin-left: 14px !important;
}

.products {
  width: 150px;
  height: 200px;
  position: relative;
  margin-left: 2px;
}
.products img {
  border-bottom: solid 1px #eeeeec !important;
  height: 130px !important;
  width: 130px !important;
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

.tienda_favoritas_title {
  border-bottom: solid 1px #e8c2fa;
}

.orden_nueva_title {
  color: black;
  padding: 0;
  margin: 0;
}

.orden_nueva {
  font-size: 12px !important;
}
.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
}
</style>
