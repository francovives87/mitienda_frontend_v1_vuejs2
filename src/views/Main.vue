<template>
  <div class="main mt-12" :style="MainHome">
    <div class="ubi">
      <div class="container pb-0">
        <div class="row d-flex justify-content-center">
          <div class="main-search-input-wrap">
            <div class="main-search-input fl-wrap">
              <form v-on:submit.prevent="SearchTiendaTriagram()">
                <div class="main-search-input-item">
                  <input
                    type="search"
                    value=""
                    placeholder=""
                    name="kword"
                    id="kword"
                    v-model="kword"
                  />
                </div>
                <button
                  class="main-search-button"
                  @click="SearchTiendaTriagram()"
                >
                  <v-icon style="color: white !important">mdi-magnify</v-icon>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="container pt-0">
        <div class="row p-0">
          <div class="col-sm-12 col-lg-12 d-flex justify-content-center">
            <router-link :to="{ name: 'main_geolocation_user' }">
              <span class="mi_ubicacion">Mi Ubicacion: </span
              ><span class="ubicacion">{{ miUbicacion }} </span>&nbsp;
              <span style="color: #a463bf !important">
                <font-awesome-icon icon="map-marker-alt" />
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="!user_store.id">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-lg-6 col-sm-12">
          <v-alert
            border="left"
            colored-border
            color="purple darken-3"
            elevation="2"
          >
            <div class="row d-flex align-items-center">
              <div class="col-2 col-lg-4 col-sm-2">
                <img
                  :src="
                    server + '/media_root/defaults/mitienda_logo_3_2_512.png'
                  "
                  alt=""
                  style="width: 38px; height: 45px"
                />
              </div>
              <div class="col-5 col-lg-4 col-sm-5">
                <v-btn
                  class="ml-4"
                  outlined
                  color="purple darken-3"
                  @click="GoToLogin()"
                >
                  <span style="font-size: 14px !important">INGRESAR </span>
                </v-btn>
              </div>
              <div class="col-5 col-lg-4 col-sm-5">
                <v-btn color="purple darken-3" @click="GoToRegister()">
                  <span style="font-size: 14px !important; color: white"
                    >REGISTRARME
                  </span>
                </v-btn>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>

    <div class="container" v-if="user_store.id && !mitienda.id">
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-6 col-sm-12">
          <v-alert
            border="left"
            colored-border
            color="purple darken-3"
            elevation="2"
          >
            <div class="row d-flex align-items-center">
              <div class="col-6 col-lg-10 col-sm-6">
                <img
                  :src="
                    server + '/media_root/defaults/mitienda_logo_3_2_512.png'
                  "
                  alt=""
                  style="width: 38px; height: 45px"
                />
              </div>
              <div class="col-6 col-lg-2 col-sm-6">
                <v-btn color="purple darken-3" @click="GoToCreateStore()">
                  <span style="font-size: 14px !important; color: white">
                    CREAR TIENDA
                  </span>
                </v-btn>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>

    <main_favorites v-if="user_store.id" />

    <main_tiendas_demos />

    <main_tiendas_destacas />

    <main_visitor_recientes />

    <main_tiendas_news />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import main_favorites from "../components/main/main_favorites.vue";
import main_tiendas_demos from "../components/main/main_tiendas_demos.vue";
import main_tiendas_destacas from "../components/main/main_tiendas_destacas.vue";
import axios from "axios";
import main_visitor_recientes from "../components/main/main_visitor_recientes.vue";
import main_tiendas_news from "../components/main/main_tiendas_news.vue";

export default {
  name: "Main",
  components: {
    Carousel,
    Slide,
    main_favorites,
    main_visitor_recientes,
    main_tiendas_destacas,
    main_tiendas_news,
    main_tiendas_demos
  },
  data() {
    return {
      kword: "",
      tiendas: [],
      tiendasByKeywords: [],
      tiendas_news: [],
      myPosition: [],
      lat: 0,
      lng: 0,
      radius: 5 /* En kms */,
      geoData: {
        pais: "",
        region: "",
        subregion: "",
        ciudad: "",
        barrio: "",
        lat: 0,
        lng: 0,
      },
      image_to_show: null,
      showModal: false,
      miUbicacion: null,
    };
  },
  computed: {
    ...mapState("tienda", ["tienda", "mitienda"]),
    ...mapState("user", ["user_store", "user_location"]),

    MainHome() {
      return "background-color:#f8f8f8 !important";
    },

    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 6;
        case "xl":
          return 6;
      }
    },
  },

  created() {
    /*  this.RandomImage(); */
  },
  mounted() {
    this.ClearCart();
    this.ObtenerLanLgnDelNavegador();
    if (localStorage.getItem("ciudad")) {
      this.miUbicacion = localStorage.getItem("ciudad");
      (this.geoData = {
        pais: localStorage.getItem("pais"),
        region: localStorage.getItem("region"),
        subregion: localStorage.getItem("subregion"),
        ciudad: localStorage.getItem("ciudad"),
        barrio: localStorage.getItem("barrio"),
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng"),
      }),
        this.AddUserLocation(this.geoData);
    }
  },

  watch: {
    miUbicacion: function (value) {
      this.miUbicacion = value;
    },
  },

  methods: {
    ...mapMutations("cart", ["ClearCart"]),
    ...mapMutations("user", ["AddUserLocation"]),

    GoToRegister() {
      this.$router.push({
        name: "MainRegister",
      });
    },
    GoToLogin() {
      this.$router.push({
        name: "MainLogin",
      });
    },
    GoToCreateStore() {
      this.$router.push({
        name: "main_create_tienda",
      });
    },

    ObtenerLanLgnDelNavegador() {
      var setLocation = parseInt(localStorage.getItem("setLocation"));
      console.log("setLocation");
      console.log(setLocation);

      if (
        localStorage.getItem("setLocation") == 1 ||
        !localStorage.getItem("setLocation")
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.ShowPosition);
        } else {
          console.log("rechazo geo");
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    },

    ShowPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this.myPosition.push(position.coords.latitude);
      this.myPosition.push(position.coords.longitude);

      console.log("this.myPosition");
      console.log(this.myPosition);
      localStorage.setItem("setLocation", 1);
      this.ReverseGeocode();
    },

    ReverseGeocode() {
      //Geocode Service
      let that = this;
      const geocodeService = L.esri.Geocoding.geocodeService({
        apikey:
          "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M",
      });
      geocodeService
        .reverse()
        .latlng(this.myPosition, 13)
        .run(function (error, resultado) {
          if (error) {
            console.log(error);
          }
          console.log("resultado reverse geo");
          console.log(resultado);

          localStorage.setItem("lat", parseFloat(that.myPosition[0]));
          localStorage.setItem("lng", parseFloat(that.myPosition[1]));
          localStorage.setItem(
            "pais",
            resultado.address.CountryCode.toLowerCase()
          );
          localStorage.setItem(
            "region",
            resultado.address.Region.toLowerCase()
          );
          localStorage.setItem(
            "subregion",
            resultado.address.Subregion.toLowerCase()
          );
          localStorage.setItem("ciudad", resultado.address.City.toLowerCase());
          localStorage.setItem(
            "direccion",
            resultado.address.Address.toLowerCase()
          );
          localStorage.setItem(
            "codigo_postal",
            resultado.address.Postal.toLowerCase()
          );
          localStorage.setItem(
            "barrio",
            resultado.address.Neighborhood.toLowerCase()
          );
          that.geoData = {
            pais: resultado.address.CountryCode.toLowerCase(),
            region: resultado.address.Region.toLowerCase(),
            subregion: resultado.address.Subregion.toLowerCase(),
            ciudad: resultado.address.City.toLowerCase(),
            barrio: resultado.address.Neighborhood.toLowerCase(),
            direccion: resultado.address.Address.toLowerCase(),
            codigo_postal: resultado.address.Postal.toLowerCase(),
            lat: that.myPosition[0],
            lng: that.myPosition[1],
          };
          console.log("latid y lng del geocode");
          that.lat = resultado.latlng.lat;
          that.lng = resultado.latlng.lng;
          console.log(that.lat);
          console.log(that.lng);

          that.AddUserLocation(that.geoData);
          that.miUbicacion = that.geoData.ciudad;
          console.log(that.geoData);
        });
    },

    SearchTiendaTriagram() {
      if (this.kword != "") {
        if (!localStorage.getItem("lat") || !localStorage.getItem("lng")) {
          this.$router.push({
            name: "main_geolocation_user",
          });
        } else {
          axios
            .get(this.server + "/api/v1.0/store/search/", {
              params: {
                lng: localStorage.getItem("lng"),
                lat: localStorage.getItem("lat"),
                radius: this.radius,
                title: this.kword,
              },
            })
            .then((response) => {
              console.log(response.data.results);
              this.tiendas = response.data.results;
            })
            .catch((error) => {
              console.log(error);
            });
          /* busco por keywords */
          axios
            .get(this.server + "/api/v1.0/store/search/description/", {
              params: {
                lng: localStorage.getItem("lng"),
                lat: localStorage.getItem("lat"),
                radius: this.radius,
                description: this.kword,
                page: 1,
              },
            })
            .then((response) => {
              console.log(response.data.results);
              this.tiendasByKeywords = response.data;
              this.$router.push({
                name: "main_search_tienda",
                params: {
                  tiendas: this.tiendas,
                  tiendasByKeywords: this.tiendasByKeywords,
                  previous_kword: this.kword,
                },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    ClearSearch() {
      this.tiendas = [];
      this.kword = "";
    },

    ShowModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
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

.msjRegister {
  background-color: red !important;
  font-size: 16px !important;
  color: white !important;
}
.busqueda_header {
  border: 1px solid #e8c2fa;
  border-radius: 4px !important;
  color: gray;
}

/* NAVBAR */

.nav_bar {
  width: 100%;
  height: 55px;
  background-color: #a463bf;
}
.sub_navbar {
  width: 100%;
  height: 65px;
  background-color: #a463bf;
  padding: 0px;
}
.sub_navbar_item {
  font-size: 12px;
}
.dropdown-toggle {
  background-color: #a463bf !important;
  border-color: #a463bf !important;
  color: #ffffff !important;
}
.mi_ubicacion {
  font-size: 12px !important;
  color: #ffffff !important;
  text-transform: uppercase;
}
.ubicacion {
  font-size: 12px !important;
  color: #ffffff;
  text-transform: uppercase;
}
.drop_item {
  font-size: 12px !important;
  text-transform: uppercase !important;
}

.ubi {
  background: #e9e9e9;
  padding: 2px !important;
  margin-top: 70px !important;
}

.search_container {
  background: #e9e9e9 !important;
}

.mi_ubicacion {
  font-size: 12px !important;
  color: #a463bf !important;
  text-transform: uppercase;
}
.ubicacion {
  font-size: 12px !important;
  color: #a463bf;
  text-transform: uppercase;
}

@media only screen and (max-width: 768px) {
  .fl-wrap {
    float: left;
    width: 100% !important;
    position: relative;
  }
  .main-search-input {
    background: #fff;
    padding: 0 40px 0 0;
    border-radius: 1px;
    margin-top: 0px;
    box-shadow: 0px 0px 0px 6px rgba(255, 255, 255, 0.3);
    text-align: center;
  }

  .main-search-input:before {
    position: absolute;
    bottom: -40px;
    width: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.41);
    left: 50%;
    margin-left: -25px;
  }

  .main-search-input-item {
    float: left;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    height: 40px;
    position: relative;
  }

  .main-search-input-item input:first-child {
    border-radius: 100%;
  }

  .main-search-input-item input {
    float: left;
    border: none;
    width: 100%;
    height: 40px;
    padding-left: 20px;
  }

  .main-search-button {
    background: #6a1b9a;
  }

  .main-search-button {
    position: absolute;
    right: 0px;
    height: 40px;
    width: 70px;
    color: #fff;
    top: 0;
    border: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor: pointer;
  }

  .main-search-input-wrap {
    max-width: 500px;
    margin: 20px auto;
    position: relative;
  }

  :focus {
    outline: 0;
  }
}

@media only screen and (min-width: 768px) {
  .fl-wrap {
    float: right;
    width: 600px;
    position: relative;
  }

  .main-search-input {
    background: #fff;
    padding: 0 40px 0 0;
    border-radius: 1px;
    margin-top: 0px;
    box-shadow: 0px 0px 0px 6px rgba(255, 255, 255, 0.3);
    text-align: center;
  }

  .main-search-input:before {
    position: absolute;
    bottom: -40px;
    width: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.41);
    left: 50%;
    margin-left: -25px;
  }

  .main-search-input-item {
    float: left;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    height: 40px;
    position: relative;
  }

  .main-search-input-item input:first-child {
    border-radius: 100%;
  }

  .main-search-input-item input {
    float: left;
    border: none;
    width: 100%;
    height: 40px;
    padding-left: 20px;
  }

  .main-search-button {
    background: #a463bf;
  }

  .main-search-button {
    position: absolute;
    right: 0px;
    height: 40px;
    width: 70px;
    color: #fff;
    top: 0;
    border: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor: pointer;
  }

  .main-search-input-wrap {
    max-width: 500px;
    margin: 20px auto;
    position: relative;
  }

  :focus {
    outline: 0;
  }
}
</style>
