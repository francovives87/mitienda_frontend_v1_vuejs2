<template>
  <div class="perzonalizar mb-10">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-8 col-sm-8">
          <h6><font-awesome-icon icon="paint-brush" /> Personalizar tienda</h6>
        </div>
        <div class="col-4 col-sm-4">
          <div class="d-flex justify-content-center">
            <v-btn
              elevation="4"
              icon
              color="green"
              outlined
              @click="UpdateColors()"
            >
              <font-awesome-icon icon="save" />
            </v-btn>
          </div>
          <div class="d-flex justify-content-center">
            <p><span class="save">Guardar cambios</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="colores">
            <font-awesome-icon icon="palette" /> Barra superior
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="navbar_color"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Barra superior</div>
                  </div>
                  {{ navbar_color }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="navbar_font"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">
                      Color de la fuente de la barra superior
                    </div>
                  </div>
                  {{ navbar_font }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- INFORMACION -->

        <div class="col-12 col-sm-12">
          <div class="colores">
            <font-awesome-icon icon="palette" /> Informacion
          </div>
        </div>

        <!-- ejemplo -->
        <div class="informacion" :style="tienda_info_style">
          <div class="container">
            <div class="row">
              <div class="col-6 col-sm-6">
                <p>
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="calendar-alt" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].dias_habiles }}</span
                  >
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="store" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].direccion }}</span
                  >
                </p>
              </div>
              <div class="col-6 col-sm-6">
                <p>
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="clock" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].horario }}</span
                  >
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="truck" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].envio }}</span
                  >
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="mobile-alt" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].telefono }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- ejemplo -->

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="info_background_color"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Color de fondo</div>
                  </div>
                  {{ info_background_color }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="info_icons_color"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Color de los iconos</div>
                  </div>
                  {{ info_icons_color }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="info_font_color"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Color de la fuente</div>
                  </div>
                  {{ info_font_color }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SEPARADORES -->

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="colores">
              <font-awesome-icon icon="palette" /> Separadores
            </div>
          </div>
        </div>

        <div class="row">
          <v-container>
            <v-alert border="left" :color="alerts" :style="alerts_font_color">
              Separadores
            </v-alert>
          </v-container>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="alerts"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Color fondo</div>
                  </div>
                  {{ alerts }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="alerts_font"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Color de la fuente</div>
                  </div>
                  {{ alerts_font }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTONERA DE NAVEGACION -->
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="colores">
              <font-awesome-icon icon="palette" /> Botonera de navegacion
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-swatches
                        v-model="bottom_navigation"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      ></v-swatches>
                    </div>
                    <div class="col-6 col-sm-6">Botonera de navegacion</div>
                  </div>
                  {{ bottom_navigation }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <v-switch
                        v-model="bottom_navigation_font"
                        label="Fuente blanca"
                      ></v-switch>
                    </div>
                    <div class="col-6 col-sm-6">Color de la fuente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FONDO -->
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="colores">
              <font-awesome-icon icon="palette" /> Fondo
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="hasTexture == false">
        <div class="col-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <v-swatches
                      v-model="background_color"
                      show-fallback
                      fallback-input-type="color"
                      popover-x="left"
                    ></v-swatches>
                  </div>
                  <div class="col-6 col-sm-6">Color de fondo</div>
                </div>
                {{ background_color }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <v-switch v-model="hasTexture" label="Textura"></v-switch>
                  </div>
                  <div class="col-6 col-sm-6">Textura de fondo</div>
                  <div class="row">
                    <button
                      class="btn btn-primary"
                      v-if="hasTexture == true"
                      data-bs-toggle="modal"
                      data-bs-target="#TextureModal"
                      @click="GetTextures()"
                    >
                      Seleccionar textura
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL TEXTURAS -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="TextureModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Seleccione un textura de fondo
              </h5>
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
                  <button
                    class="
                      btn btn-outline-secondary
                      d-flex
                      justify-content-center
                      mb-1
                    "
                    v-for="(texture, index) in textures"
                    :key="index"
                    style="width: 310px !important; height: 260px !important"
                    @click="SelectTexture(texture)"
                  >
                    <img
                      :src="texture.image"
                      alt=""
                      style="width: 300px !important; height: 250px !important"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="GuardarTextura()"
                data-bs-dismiss="modal"
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL TEXTURAS -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";
import axios from "axios";

export default {
  name: "admin_personalizar",
  components: {
    admin_menu,
    VSwatches,
  },
  data() {
    return {
      navbar_color: "",
      navbar_font: "",
      info_background_color: "",
      info_icons_color: "",
      info_font_color: "",
      alerts: "",
      alerts_font: "",
      bottom_navigation: "",
      bottom_navigation_font: true,
      background_color: "",
      hasTexture: false,
      texture_id: null,
      textures: [],

      tienda_info_style: {
        background: this.info_background_color,
      },

      info_item_style: {
        fontSize: "12px",
        color: this.info_font_color,
      },

      info_icon_style: {
        fontSize: "12px",
        color: this.info_icons_color,
      },
    };
  },

  created() {
    this.navbar_color = this.tienda.tienda_colors[0].navbar;
    this.navbar_font = this.tienda.tienda_colors[0].navbar_font;
    this.alerts = this.tienda.tienda_colors[0].alerts;
    this.alerts_font = this.tienda.tienda_colors[0].alerts_font;
    this.bottom_navigation = this.tienda.tienda_colors[0].bottom_navigation;
    this.bottom_navigation_font =
      this.tienda.tienda_colors[0].bottom_navigation_font;
    this.background_color = this.tienda.tienda_colors[0].background_color;
    this.hasTexture = this.tienda.tienda_colors[0].hasTexture;
    this.info_background_color = this.tienda.tienda_colors[0].info_background_color;
    this.info_icons_color = this.tienda.tienda_colors[0].info_icons_color;
    this.info_font_color = this.tienda.tienda_colors[0].info_font_color;
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    alerts_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].alerts_font + " !important;"
        );
      }
    },
  },

  watch: {
    navbar_color: function (value) {
      this.tienda.tienda_colors[0].navbar = value;
    },
    navbar_font: function (value) {
      this.tienda.tienda_colors[0].navbar_font = value;
    },

    alerts: function (value) {
      this.tienda.tienda_colors[0].alerts = value;
    },

    alerts_font: function (value) {
      this.tienda.tienda_colors[0].alerts_font = value;
    },

    bottom_navigation: function (value) {
      this.tienda.tienda_colors[0].bottom_navigation = value;
    },

    bottom_navigation_font: function (value) {
      this.tienda.tienda_colors[0].bottom_navigation_font = value;
    },

    background_color: function (value) {
      this.tienda.tienda_colors[0].background_color = value;
    },

    hasTexture: function (value) {
      this.tienda.tienda_colors[0].hasTexture = value;
    },
    info_background_color: function (value) {
      this.tienda.tienda_colors[0].info_background_color = value;
      this.tienda_info_style.background = this.info_background_color;
    },
    info_icons_color: function (value) {
      this.tienda.tienda_colors[0].info_icons_color = value;
      this.info_icon_style.color = this.info_icons_color;
    },
    info_font_color: function (value) {
      this.tienda.tienda_colors[0].info_font_color = value;
      this.info_item_style.color = this.info_font_color;
    },
  },

  methods: {
    UpdateColors() {
      const data = new FormData();
      data.append("tienda", this.tienda.id);
      data.append("navbar", this.navbar_color);
      data.append("navbar_font", this.navbar_font);
      data.append("bottom_navigation", this.bottom_navigation);
      data.append("bottom_navigation_font", this.bottom_navigation_font);
      data.append("alerts", this.alerts);
      data.append("alerts_font", this.alerts_font);
      data.append("hasTexture", this.hasTexture);
      data.append("texture", this.hasTexture);
      data.append("info_background_color", this.info_background_color);
      data.append("info_icons_color", this.info_icons_color);
      data.append("info_font_color", this.info_font_color);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/colors/update/" +
            this.tienda.tienda_colors[0].id +
            "/",
          data
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Cambios Actualizados!",
            "Los cambios fueron actualizados correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetTextures() {
      axios
        .get(this.server + "/api/v1.0/admin/textures/")
        .then((response) => {
          console.log(response.data.results);
          this.textures = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SelectTexture(texture) {
      this.texture_id = texture.id;
    },

    GuardarTextura() {
      const data = new FormData();
      data.append("tienda", this.tienda.id);
      data.append("navbar", this.navbar_color);
      data.append("navbar_font", this.navbar_font);
      data.append("bottom_navigation", this.bottom_navigation);
      data.append("bottom_navigation_font", this.bottom_navigation_font);
      data.append("alerts", this.alerts);
      data.append("alerts_font", this.alerts_font);
      data.append("hasTexture", this.hasTexture);
      data.append("texture", this.texture_id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/colors/update/texture/" +
            this.tienda.tienda_colors[0].id +
            "/",
          data
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Cambios Actualizados!",
            "Los cambios fueron actualizados correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.colores {
  border-bottom: 2px solid gray;
}
.vue-swatches__trigger {
  border-color: #000 !important;
  border-style: solid !important;
}

.save {
  font-size: 12px;
  color: gray;
}
</style>