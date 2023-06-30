<template>
  <div class="perzonalizar mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-8 col-sm-8">
          <h6><font-awesome-icon icon="paint-brush" /> Personalizar tienda</h6>
        </div>
        <div class="col-4 col-sm-4">
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" icon color="green" outlined @click="GuardarTodo()">
              <font-awesome-icon icon="save" />
            </v-btn>
          </div>
          <div class="d-flex justify-content-center">
            <p><span class="save">Guardar cambios</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-8">
      <div class="row">
        <div class="col-12">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Logo/Titulo/Fuente
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-12 col-12-sm">
                      <div class="mb-3">
                        <label for="title" class="form-label">Titulo:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          aria-describedby="emailHelp"
                          v-model="title"
                        />
                        <div id="emailHelp" class="form-text">
                          Sera el nombre que se mostrara en la barra superior
                        </div>
                        <div class="row">
                          <div class="col-4 col-sm-4">
                            <v-btn
                              elevation="2"
                              outlined
                              data-bs-toggle="modal"
                              data-bs-target="#TitleFontModal"
                            >
                              Fuente</v-btn
                            >
                          </div>
                          <div class="col-4 col-sm-4">
                            <v-btn
                              elevation="2"
                              outlined
                              data-bs-toggle="modal"
                              data-bs-target="#FontSizeModal"
                            >
                              Tamaño</v-btn
                            >
                          </div>

                          <div class="col-2 col-sm-2">
                            <v-btn
                              elevation="4"
                              icon
                              color="green"
                              outlined
                              @click="UpdateTiendaTitle()"
                            >
                              <font-awesome-icon icon="save" />
                            </v-btn>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-12">
                      <h6>Logo</h6>
                      <div class="logo">
                        <img :src="this.tienda.logo" alt="" class="logo_img" />
                        <v-btn
                          class="boton_botonera"
                          color="green"
                          small
                          elevation="2"
                          icon
                          outlined
                          data-bs-toggle="modal"
                          data-bs-target="#LogoModal"
                          ><font-awesome-icon icon="image" />
                        </v-btn>
                      </div>
                      <div id="emailHelp" class="form-text">
                        Tamaño recomendado 50px por 50px
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item mb-12">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Colores
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-12 col-sm-12">
                      <div class="colores">
                        <font-awesome-icon icon="palette" /> Barra superior
                      </div>
                    </div>

                    <div class="row mb-12">
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="navbar_color"
                                  v-model="navbar_color"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="navbar_font"
                                  v-model="navbar_font"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- INFORMACION -->

                    <div class="col-12 col-sm-12">
                      <div class="colores">
                        <font-awesome-icon icon="palette" /> Informacion
                        <span style="font-size: 11px">(ejemplo)</span>
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
                              ><span :style="info_item_style"> Lunes a viernes</span>
                              <br />
                              <span :style="info_icon_style"
                                ><font-awesome-icon icon="store" /></span
                              ><span :style="info_item_style"> San Martin 3500</span>
                            </p>
                          </div>
                          <div class="col-6 col-sm-6">
                            <p>
                              <span :style="info_icon_style"
                                ><font-awesome-icon icon="clock" /></span
                              ><span :style="info_item_style"> de 09:00 a 19:00</span>
                              <br />
                              <span :style="info_icon_style"
                                ><font-awesome-icon icon="truck" /></span
                              ><span :style="info_item_style"> Envios</span>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="info_background_color"
                                  v-model="info_background_color"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="info_icons_color"
                                  v-model="info_icons_color"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="info_font_color"
                                  v-model="info_font_color"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="alerts"
                                  v-model="alerts"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="alerts_font"
                                  v-model="alerts_font"
                                />
                              </div>
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
                              <div class="mt-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="bottom_navigation"
                                  v-model="bottom_navigation"
                                />
                              </div>
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
                            <div class="mt-3">
                              <input
                                type="text"
                                class="form-control"
                                id="background_color"
                                v-model="background_color"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-12">
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

                  <!-- MODALES -->
                  <!-- MODAL TEXTURAS -->

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
                                class="btn btn-outline-secondary d-flex justify-content-center mb-1"
                                v-for="(texture, index) in textures"
                                :key="index"
                                style="width: 310px !important; height: 260px !important"
                                @click="SelectTexture(texture)"
                              >
                                <img
                                  :src="texture.image"
                                  alt=""
                                  style="
                                    width: 300px !important;
                                    height: 250px !important;
                                  "
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

                    <!-- MODAL TEXTURAS -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="LogoModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Logo de la tienda</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <br />
            <p>Imagen actual:</p>
            <div class="image_actual col-12 col-sm-12">
              <img :src="this.tienda.logo" alt="" style="width: 60px; heigth: 60px" />
            </div>
            <label for="image_edit" class="form-label">Selecionar nueva imagen</label>
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                name="image_edit"
                id="image_edit"
                ref="imageEdit"
                @change="OnFileSelectedUpdate"
              />
            </div>
            <p>Imagen nueva:</p>
            <div class="image_actual col-12 col-sm-12">
              <img :src="preview" alt="" style="width: 150px; heigth: 150px" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateTiendaLogo()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL TITLE FONTS -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="TitleFontModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Tipo de letra para el titulo
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
                <div class="col-12">
                  <button
                    class="btn btn-outline-dark ml-2 mt-1"
                    v-for="(font, index) in fonts.results"
                    :key="index"
                    @click="SetTitleFont(font)"
                  >
                    <span :style="'font-family:' + font.css + ' !important;'">
                      {{ font.name }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <v-btn elevation="2" icon v-if="fonts.previous" @click="PreviousListaPage()"
              ><font-awesome-icon icon="fa-chevron-circle-left" style="color: blue"
            /></v-btn>

            <v-btn elevation="2" icon v-if="fonts.next" @click="NextFontListPage()"
              ><font-awesome-icon icon="fa-chevron-circle-right" style="color: blue"
            /></v-btn>

            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateFontTitle()"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL TAMAÑOS DE LA FUENTE -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="FontSizeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tamaño de la fuente.</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col-4">
                  <v-btn elevation="5" icon @click="DisminuirFontSize()">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
                <div class="col-2">
                  <span>{{ set_font_edit.font_title_size }}</span>
                </div>
                <div class="col-4">
                  <v-btn elevation="5" icon @click="AumentarFontSize()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateFontTitle()"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="3"
      class="botoon d-none d-block d-sm-none"
    >
      <div class="d-flex justify-content-center">
        <v-btn elevation="2" color="green" text @click="GuardarTodo()">
          <font-awesome-icon icon="save" />&nbsp; Guardar
        </v-btn>
      </div>
    </v-alert>
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
      title: "",
      logoToEdit: "",
      preview: "",
      set_font: "",
      font_size: 0,
      set_font_edit: {
        font_title: 0,
        font_title_size: 30,
      },

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
      fonts: [],
      font_current_page: 1,
      font_style_preview: {
        fontFamily: null,
        fontSize: "30px",
      },
      font_style_button_preview: {
        fontFamily: "'Rubik Moonrocks', cursive",
      },
    };
  },

  created() {
    this.Guard();
    this.navbar_color = this.tienda.tienda_colors[0].navbar;
    this.navbar_font = this.tienda.tienda_colors[0].navbar_font;
    this.alerts = this.tienda.tienda_colors[0].alerts;
    this.alerts_font = this.tienda.tienda_colors[0].alerts_font;
    this.bottom_navigation = this.tienda.tienda_colors[0].bottom_navigation;
    this.bottom_navigation_font = this.tienda.tienda_colors[0].bottom_navigation_font;
    this.background_color = this.tienda.tienda_colors[0].background_color;
    this.hasTexture = this.tienda.tienda_colors[0].hasTexture;
    this.info_background_color = this.tienda.tienda_colors[0].info_background_color;
    this.info_icons_color = this.tienda.tienda_colors[0].info_icons_color;
    this.info_font_color = this.tienda.tienda_colors[0].info_font_color;
    if (this.tienda.tienda_colors[0].font_title) {
      this.font_style_preview.fontFamily = this.tienda.tienda_colors[0].font_title.css;
    } else {
      this.font_style_preview.fontFamily = "'Oswald', sans-serif;";
    }
  },
  mounted() {
    if (this.tienda.title) {
      this.title = this.tienda.title;
    } else {
      this.title = this.tienda.name;
    }
    this.LoadFonts();
    this.set_font_edit = {
      font_title: this.tienda.tienda_colors[0].font_title.id,
      font_title_size: this.tienda.tienda_colors[0].font_title_size,
    };
    this.font_size = this.tienda.tienda_colors[0].font_title_size;
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    alerts_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return "color: " + this.tienda.tienda_colors[0].alerts_font + " !important;";
      }
    },
  },

  watch: {
    set_font: function (value) {
      this.tienda.tienda_colors[0].font_title.css = value;
    },
    font_size: function (value) {
      this.tienda.tienda_colors[0].font_title_size = value;
    },

    title: function (value) {
      this.tienda.title = this.title;
    },
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
    /* el metodo guard sirve de permiso, para que no se cargue una vista Admin si no es de su tienda */
    Guard() {
      console.log("GUARD!");
      if (this.tienda.user != localStorage.getItem("cod_ref")) {
        console.log("este es un loquito");
        this.$router.push({
          name: "Main",
        });
      }
    },

    GuardarTodo() {
      this.UpdateColors();
      this.UpdateTiendaTitle();
      this.UpdateFontTitle();
    },

    AumentarFontSize() {
      if (this.set_font_edit.font_title_size != 60) {
        this.set_font_edit.font_title_size++;
        this.font_size++;
      }
    },
    DisminuirFontSize() {
      if (this.set_font_edit.font_title_size != 10) {
        this.set_font_edit.font_title_size--;
        this.font_size--;
      }
    },
    UpdateFontTitle() {
      axios
        .put(
          this.server +
            "/api/v1.0/store/title/font/update/" +
            this.tienda.tienda_colors[0].id,
          this.set_font_edit
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

    SetTitleFont(font) {
      console.log("SetTitleFont");
      console.log(font);
      this.set_font = font.css;
      this.set_font_edit = {
        font_title: font.id,
        font_title_size: 30,
      };
      console.log(this.set_font_edit);
    },

    ChangeFontOnPreview(css) {
      this.font_style_preview.fontFamily = css;
    },

    NextFontListPage() {
      this.font_current_page += 1;
      this.LoadFonts();
    },
    PreviousListaPage() {
      this.font_current_page -= 1;
      this.LoadFonts();
    },

    LoadFonts() {
      console.log("LoadFonts");
      axios
        .get(this.server + "/api/v1.0/fonts/title/", {
          params: {
            page: this.font_current_page,
          },
        })
        .then((response) => {
          this.fonts = response.data;
          console.log(this.fonts);
          this.LoadsImportsOfFonts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    LoadsImportsOfFonts() {
      this.fonts.results.forEach((element) => {
        const div_flag_import_font = document.getElementById(element.name);
        if (div_flag_import_font == null) {
          var style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = " @import url('" + element.url + "'); ";
          document.getElementsByTagName("head")[0].appendChild(style);
          var style_ref = document.createElement("div");
          style_ref.setAttribute("id", element.name);
          document.getElementsByTagName("body")[0].appendChild(style_ref);
        }
      });
    },

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
      data.append("background_color", this.background_color);

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

    UpadateTitleTienda() {},

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
      data.append("this.background_color", this.background_color);

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

    UpdateTiendaTitle() {
      const data = new FormData();
      data.append("title", this.title);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/tienda/title/update/", data)
        .then((response) => {
          console.log(response);
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */

          this.$swal.fire(
            "Nombre Actualizado!",
            "El nombre fue actualizada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    OnFileSelectedUpdate(event) {
      console.log(event);
      this.logoToEdit = event.target.files[0];
      this.preview = URL.createObjectURL(this.logoToEdit);
    },

    UpdateTiendaLogo() {
      const data = new FormData();
      data.append("logo", this.logoToEdit);

      axios
        .put(
          this.server + "/api/v1.0/admin/tienda/logo/update/" + this.tienda.id + "/",
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Logo Actualizado!",
            "El logo fue actualizada correctamente! Debe recargar la pagina para ver los cambios.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.logo_img {
  border-color: #dde6e8 !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 60px !important;
  height: 60px !important;
  margin-right: 15px !important;
}
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
.botoon {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 50px !important;
}
</style>
