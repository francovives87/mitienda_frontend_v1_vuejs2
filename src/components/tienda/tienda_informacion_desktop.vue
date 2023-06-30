<template>
  <div>
    <div class="informacion" :style="tienda_info_style"></div>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <v-alert
            border="left"
            colored-border
            :color="alerts_color"
            elevation="2"
            :style="card_alert_style"
          >
            <div class="container">
              <div class="row d-flex justify-content-center">
                <div class="col-6 col-sm-6 col-lg-6">
                  <span :style="info_title_style"> {{ tienda.title }} </span>
                  <br />
                  <span :style="info_description_style">{{ tienda.description }}</span>
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="mobile-alt" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].telefono }}</span
                  >
                  <br />
                  <span :style="info_link_style"
                    ><a
                      data-bs-toggle="modal"
                      data-bs-target="#modalVerEnvios"
                      @click="GetEnvios()"
                      ><font-awesome-icon icon="truck" :style="info_icon_style" />ver
                      envios</a
                    ></span
                  >
                </div>
                <div class="col-6 col-sm-6 col-lg-6">
                  <div class="row">
                    <v-rating
                      background-color="purple lighten-3"
                      color="orange"
                      small
                      readonly
                      :value="tienda.average.rating__avg"
                      data-bs-toggle="modal"
                      data-bs-target="#opinionModal"
                    ></v-rating>
                  </div>
                  <div class="row">
                    <div class="col-8 col-sm-8 col-lg-8">
                      <span :style="info_link_style"
                        ><a data-bs-toggle="modal" data-bs-target="#opinionModal">
                          Ver opiniones
                        </a></span
                      >
                    </div>
                    <div class="col-4 col-sm-4 col-lg-4">
                      <span
                        class="dot"
                        data-bs-toggle="modal"
                        data-bs-target="#opinionModal"
                        >{{
                          (Math.round(tienda.average.rating__avg * 100) / 100).toFixed(1)
                        }}</span
                      >
                    </div>
                  </div>

                  <div class="d-flex justify-content-end align-items-center"></div>
                </div>
              </div>
            </div>
          </v-alert>
        </div>
        <div class="col-4">
          <v-alert
            border="left"
            colored-border
            :color="alerts_color"
            elevation="2"
            :style="card_alert_style"
          >
            <div class="container">
              <div class="row d-flex align-items-center justify-content-center">
                <div class="col-7 col-sm-7 col-lg-6">
                  <p>
                    <span :style="info_icon_style"
                      ><font-awesome-icon icon="store"
                    /></span>
                    <br />
                    <span :style="info_item_style">
                      &nbsp;<span v-if="tienda.geo_tienda.length > 0">
                        <span style="text-transform: uppercase; font-size: 13px">
                          {{ tienda.geo_tienda[0].direccion }}
                        </span>
                        <br />
                        <span style="text-transform: uppercase; font-size: 11px"
                          >{{ tienda.geo_tienda[0].region }} ,
                          {{ tienda.geo_tienda[0].subregion }} ,
                          {{ tienda.geo_tienda[0].ciudad }}</span
                        >
                      </span>
                      <span v-if="tienda.geo_tienda.length == 0"
                        >Aun no configurado</span
                      > </span
                    ><br />

                    <br />
                  </p>
                </div>
                <div class="col-5 col-sm-5 col-lg-6">
                  <span :style="info_vermapa_link_style"
                    ><a @click="ExisteGeoOpenModal()"
                      ><v-icon :style="info_icon_map_style">mdi-map</v-icon> ver en el
                      mapa</a
                    ></span
                  >
                </div>
              </div>
            </div>
          </v-alert>
        </div>
        <div class="col-4">
          <v-alert
            border="left"
            colored-border
            :color="alerts_color"
            elevation="2"
            :style="card_alert_style"
          >
            <div class="container">
              <div class="row d-flex justify-content-center">
                <div class="col-12 col-sm-12 col-lg-12">
                  <p>
                    <span :style="info_icon_style"
                      ><font-awesome-icon icon="calendar-alt" /></span
                    >&nbsp;
                    <span :style="info_item_style"
                      ><span :style="info_icon_style"
                        ><font-awesome-icon icon="clock" />
                      </span>
                      <br />
                      <span
                        v-html="this.tienda.tienda_informacion[0].dias_horarios"
                      ></span
                    ></span>
                  </p>
                </div>
              </div>
              <div class="row d-flex justify-content-end">
                <div class="col-2 col-sm-2 col-lg-2" v-if="user_store.id > 0">
                  <v-btn
                    elevation="4"
                    icon
                    style="background-color: white"
                    @click="AddToFavorites()"
                    class="mr-2"
                  >
                    <v-icon color="red" style="font-size: 24px">mdi-heart</v-icon>
                  </v-btn>
                </div>
                <div class="col-2 col-sm-2 col-lg-2">
                  <v-btn
                    elevation="4"
                    icon
                    style="background-color: white"
                    @click="WhatsAppContact()"
                  >
                    <v-icon color="green" style="font-size: 24px">mdi-whatsapp</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>
    <!-- MODALES -->
    <!-- Modal ver envios -->
    <div
      class="modal fade"
      id="modalVerEnvios"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Envios</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="card mb-2" v-for="(envio, index) in envios" :key="index">
                  <div class="card-body">
                    <h6>{{ envio.name }}</h6>
                    <p>{{ envio.description }}</p>
                    <span>$ {{ envio.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODALES -->

    <!-- OPINION -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="opinionModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Opiniones</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="CloseModalOpinion()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list_opinions" v-if="opinar == false">
              <h6>Lista de opiniones</h6>
              <div class="container">
                <div class="row">
                  <div
                    class="card mt-1"
                    v-for="(opinion, index) in opiniones"
                    :key="index"
                  >
                    <div class="card-body">
                      <div class="container">
                        <div class="row d-flex">
                          <v-rating
                            background-color="purple lighten-3"
                            color="orange"
                            small
                            readonly
                            :value="parseInt(opinion.rating)"
                          ></v-rating>
                          <span class="opinion_user">{{ opinion.user.username }}</span>
                          <br />
                          <span class="opinion">{{ opinion.opinion }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="opinar" v-if="opinar == true">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="container" v-if="canOpinar == true">
                      <h6>Calificar esta tienda:</h6>
                      <v-rating
                        v-model="userOpinion.rating"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                        :value="userOpinion.rating"
                      ></v-rating>
                      <v-divider></v-divider>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label"
                          >Escriba una opinion:</label
                        >
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="4"
                          v-model="userOpinion.opinion"
                        ></textarea>
                      </div>
                    </div>
                    <div class="container" v-if="canOpinar == false">
                      Debe registrarse para poder opinar.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="CloseModalOpinion()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="opinar == false"
              @click="Opinar()"
            >
              <font-awesome-icon icon="comment-dots" /> Opinar
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="opinar == true"
              data-bs-dismiss="modal"
              @click="GuardarOpinion()"
            >
              Guardar opinion
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- OPINION -->
    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "tienda_informacion_desktop",

  data() {
    return {
      envios: [],
      background_color: "",
      icons_color: "",
      font_color: "",
      navbar_color: "",
      tienda_info_style: {
        backgroundColor: this.navbar_color,
      },
      card_alert_style: {
        color: this.font_color,
        backgroundColor: this.background_color,
        height: "185px",
      },

      info_item_style: {
        fontSize: "12px",
        color: this.font_color,
        textTransform: "uppercase",
      },
      info_title_style: {
        fontSize: "20px",
        color: this.font_color,
      },
      info_description_style: {
        fontSize: "15px",
        color: this.font_color,
      },
      info_link_style: {
        marginRight: "10px",
        fontSize: "12px",
        textTransform: "uppercase",
        textDecoration: "underline",
        color: this.font_color,
      },
      info_vermapa_link_style: {
        marginRight: "10px",
        fontSize: "14px",
        textTransform: "uppercase",
        textDecoration: "underline",
        color: this.font_color,
      },

      info_icon_style: {
        fontSize: "16px",
        color: this.icons_color,
      },
      info_icon_map_style: {
        fontSize: "18px",
        color: this.icons_color,
      },
      accordion_button_style: {
        background: this.background_color,
        color: this.font_color,
      },
      tab_style: {
        background: this.background_color,
        color: this.font_color,
      },
      geoLatLng: {},
      geoExists: 0,
      opinar: false,
      opiniones: [],
      canOpinar: false,
      userOpinion: {
        id: 0,
        rating: 1,
        opinion: null,
      },
      vista: "tienda",
    };
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("user", ["user_store"]),

    alerts_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].alerts;
      }
    },
  },

  watch: {
    background_color: function (value) {
      this.accordion_button_style.background = this.background_color;
      this.tab_style.background = this.background_color;
      this.card_alert_style.backgroundColor = this.background_color;
    },
    icons_color: function (value) {
      this.info_icon_style.color = this.icons_color;
    },
    font_color: function (value) {
      this.info_item_style.color = this.font_color;
      this.info_title_style.color = this.font_color;
      this.info_description_style.color = this.font_color;
      this.accordion_button_style.color = this.font_color;
      this.info_link_style.color = this.font_color;
      this.tab_style.color = this.font_color;
      this.info_vermapa_link_style.color = this.font_color;
      this.info_icon_map_style.color = this.font_color;
      this.card_alert_style.color = this.font_color;
    },
    navbar_color: function (value) {
      this.tienda_info_style.backgroundColor = this.navbar_color;
    },
  },

  mounted() {
    this.background_color = this.tienda.tienda_colors[0].info_background_color;
    this.icons_color = this.tienda.tienda_colors[0].info_icons_color;
    this.font_color = this.tienda.tienda_colors[0].info_font_color;
    this.alert_color = this.tienda.tienda_colors[0].alerts;
    this.navbar_color = this.tienda.tienda_colors[0].navbar;
    this.GetOpiniones();
  },

  methods: {
    ChangeTienda(value) {
      this.vista = value;
    },
    GetOpiniones() {
      axios
        .get(this.server + "/api/v1.0/tienda/opinion/list/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          this.opiniones = response.data.results;
          console.log("opiniones");
          console.log(this.opiniones);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GuardarOpinion() {
      console.log(this.userOpinion);
      if (this.userOpinion.id > 0) {
        console.log("ejecuto update");
        this.UpdateUserOpinion();
      } else {
        console.log("ejecuto create");
        this.CreateUserOpinon();
      }
    },

    UpdateUserOpinion() {
      let data = {
        rating: this.userOpinion.rating,
        opinion: this.userOpinion.opinion,
      };
      axios
        .put(
          this.server + "/api/v1.0/tienda/opinion/user/update/" + this.userOpinion.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.GetOpiniones();
          this.$swal.fire(
            "Comentario Actualizado!",
            "Muchas gracias por comentar y ayudar a la comunidad.",
            "success"
          );
          this.CloseModalOpinion();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateUserOpinon() {
      let data = {
        rating: this.userOpinion.rating,
        opinion: this.userOpinion.opinion,
        tienda: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/tienda/opinion/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetOpiniones();
          this.$swal.fire(
            "Comentario Creado!",
            "Muchas gracias por comentar y ayudar a la comunidad.",
            "success"
          );
          this.CloseModalOpinion();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CloseModalOpinion() {
      this.opinar = false;
      this.userOpinion = {
        id: 0,
        rating: 1,
        opinion: null,
      };
    },

    Opinar() {
      console.log("opinar");

      axios
        .get(this.server + "/api/v1.0/tienda/opinion/user/", {
          params: {
            user: this.user_store.id,
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          if (response.data.count > 0) {
            this.userOpinion = {
              id: response.data.results[0].id,
              rating: parseInt(response.data.results[0].rating),
              opinion: response.data.results[0].opinion,
            };
            console.log(this.userOpinion);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.opinar = true;
        });
      if (localStorage.getItem("access")) {
        this.canOpinar = true;
      }
    },

    GetEnvios() {
      axios
        .get(this.server + "/api/v1.0/admin/envio/?tienda=" + this.tienda.id)
        .then((response) => {
          console.log(response.data.results);
          this.envios = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ExisteGeoOpenModal() {
      let data = {
        tienda: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/tienda/geo/exists/", data)
        .then((response) => {
          console.log(response.data);
          this.geoLatLng = response.data;
          this.geoExists = 1;
          console.log("geoData");
          console.log(this.geoLatLng);
          this.$router.push({
            name: "TiendViewMap",
            params: {
              geoLatLng: this.geoLatLng,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    AddToFavorites() {
      let data = {
        user: this.user_store.id,
        tienda: this.tienda.id,
      };

      axios
        .post(this.server + "/api/v1.0/store/favorites/exists/", data)
        .then((response) => {
          console.log(response.data);
          if (response.data.msj == "NO exists") {
            console.log("no existo lo creeo");
            this.CreateFavorite();
          } else {
            this.$swal
              .fire({
                title: "Esta tienda ya esta en sus favoritos!",
                text: "Desea Eliminarla?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, quitarla de favoritos!",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  axios
                    .delete(
                      this.server + "/api/v1.0/store/favorites/delete/" + response.data.id
                    )
                    .then(() => {
                      this.$swal.fire(
                        "Tienda eliminada de Favoritos!",
                        "esta tienda se ha eliminado de sus tiendas favoritas.",
                        "success"
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              });
          }
        })
        .catch((error) => {
          console.log("not found");
        });
    },

    CreateFavorite() {
      let data = {
        user: this.user_store.id,
        tienda: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/store/favorites/create/", data)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Agregado a Favoritos!",
            "esta tienda se ha agregado a sus tiendas favoritas.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    WhatsAppContact() {
      if (this.tienda.tienda_informacion[0].whatsapp == null) {
        this.$swal.fire(
          "WhatsApp NO conectado!",
          "el admnistrador de esta tienda, aun no ha conectado un numero valido para WhatsApp",
          "error"
        );
      } else {
        window.open(
          "https://api.whatsapp.com/send?phone=" +
            this.tienda.tienda_informacion[0].whatsapp +
            "&text=Hola!%20tengo%20una%20consulta%20de%20su%20tienda.",
          "_blank"
        );
      }
    },
  },
};
</script>

<style scoped>
.separador {
  -webkit-box-shadow: 0px 1px 1px #3c4043;
  -moz-box-shadow: 0px 1px 1px #3c4043;
  box-shadow: 0px 1px 1px #3c4043;
}
.informacion {
  height: 10px !important;
}

.information_container {
  height: 120px !important;
  width: 100%;
}
.tabs_container {
  -webkit-box-shadow: 0px 2px 2px #3c4043;
  -moz-box-shadow: 0px 2px 2px #3c4043;
  box-shadow: 0px 2px 2px #3c4043;
}

.btn-success {
  color: #ffffff !important;
  background-color: #a463bf;
  border-color: #a463bf !important;
}
.btn-success:hover {
  color: #ffffff !important;
  background-color: #a574df;
  border-color: #a463bf !important;
}
.dot {
  height: 30px;
  width: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  border: 2px solid orange;
  color: orange;
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

.accordion-button::after {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  content: "";
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.25rem;
  transition: transform 0.2s ease-in-out;
}
.information {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info_item {
  display: inline;
}

.info_item_avg {
  display: inline;
  margin-left: 120px;
}

.opinion_user {
  font-size: 17px !important;
}
.opinion {
  font-size: 13px !important;
}

@media only screen and (min-width: 768px) {
  .information {
    margin-left: auto;
  }
}
</style>
