<template>
  <div class="tienda mb-14">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-6">
          <h6><font-awesome-icon icon="store" /> Mi tienda</h6>
        </div>
        <div class="col-6 col-sm-6">
          <div class="d-flex justify-content-center">
            <v-btn
              elevation="4"
              icon
              color="green"
              outlined
              @click="SaveChanges()"
            >
              <font-awesome-icon icon="save" />
            </v-btn>
          </div>
          <div class="d-flex justify-content-center">
            <p><span class="save">Guardar cambios</span></p>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="accordion" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTitleLogo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTitleLogo"
                >
                  Logo y Titulo
                </button>
              </h2>
              <div
                id="flush-collapseTitleLogo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="container">
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
                        </div>
                      </div>
                      <div class="col-12 col-sm-12">
                        <h6>Logo</h6>
                        <div class="logo">
                          <img
                            :src="this.tienda.logo"
                            alt=""
                            class="logo_img"
                          />
                          <v-btn
                            class="boton_botonera"
                            color="green"
                            small
                            elevation="2"
                            icon
                            outlined
                            data-bs-toggle="modal"
                            data-bs-target="#UpdateLogoModal"
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
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Informacion de la tienda WhatsApp y contacto
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-12 col-sm-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                          >Dias y Horarios</label
                        >
                        <br />
                        <span style="font-size: 12px"
                          >Para espaciar escriba la etiqueta br entre
                          corchetes</span
                        >
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="4"
                          v-model="dias_horarios"
                        ></textarea>
                      </div>

                      <div class="mb-3">
                        <label for="title" class="form-label">Direccion</label>
                        <input
                          type="text"
                          class="form-control"
                          id="direccion"
                          aria-describedby="emailHelp"
                          v-model="direccion"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="title" class="form-label">Envios</label>
                        <input
                          type="text"
                          class="form-control"
                          id="envios"
                          aria-describedby="emailHelp"
                          v-model="envio"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="title" class="form-label">Telefono</label>
                        <input
                          type="text"
                          class="form-control"
                          id="telefono"
                          aria-describedby="emailHelp"
                          v-model="telefono"
                        />
                      </div>
                      <div class="mb-3">
                        <p>
                          <span style="font-size: 12px">
                            Numero de WhatsApp para recibir consultas y
                            ordenes</span
                          >
                        </p>
                        <label for="exampleFormControlInput1" class="form-label"
                          >WhatsApp Numero:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="5493416554488"
                          v-model="whatsapp"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Metodos de cobro
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-12 col-sm-12">
                        <button
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#mercadopago_modal"
                          @click="MercadoPagoCredentialsExists()"
                        >
                          MercadoPago
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseEnvios"
                  aria-expanded="false"
                  aria-controls="flush-collapseEnvios"
                >
                  Envios
                </button>
              </h2>
              <div
                id="flush-collapseEnvios"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <div class="row d-flex justify-content-end">
                      <div class="col-2 col-sm-2">
                        <v-badge
                          bordered
                          overlap
                          icon="mdi-plus"
                          color="#7CB342"
                          data-bs-toggle="modal"
                          data-bs-target="#createEnvioModal"
                        >
                          <v-btn elevation="4" icon>
                            <font-awesome-icon icon="truck" />
                          </v-btn>
                        </v-badge>
                      </div>
                    </div>
                    <v-container><v-divider></v-divider></v-container>
                    <div class="row">
                      <div
                        class="card mb-2"
                        v-for="(envio, index) in envios"
                        :key="index"
                      >
                        <div class="card-body">
                          <h6>{{ envio.name }}</h6>
                          <p>{{ envio.description }}</p>
                          <span>$ {{ envio.price }}</span>
                          <div class="row">
                            <div class="botonera d-flex justify-content-end">
                              <v-btn
                                class="boton_botonera mr-2"
                                color="red"
                                small
                                elevation="2"
                                icon
                                outlined
                                @click="DeleteEnvio(envio)"
                                ><v-icon>mdi-delete</v-icon>
                              </v-btn>
                              <v-btn
                                class="boton_botonera"
                                color="yellow"
                                small
                                elevation="2"
                                icon
                                outlined
                                data-bs-toggle="modal"
                                data-bs-target="#editarEnvioModal"
                                @click="SetEditEnvio(envio)"
                                ><font-awesome-icon icon="pencil-alt" />
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales -->

    <!-- MODAL EDITAR ENVIO -->
    <div
      class="modal fade"
      id="editarEnvioModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Envio</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Nombre</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Envios en santa fe"
                v-model="edit_envio.name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Descripcion</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Envios en todo el territorio de la provincia de santa fe"
                v-model="edit_envio.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput2" class="form-label"
                >Precio:</label
              >
              <input
                type="number"
                min="0"
                class="form-control"
                id="exampleFormControlInput2"
                v-model="edit_envio.price"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateEnvio()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR ENVIO -->

    <!-- MODAL CREATE ENVIO -->

    <div
      class="modal fade"
      id="createEnvioModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar envio.</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Nombre</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Envios en santa fe"
                v-model="create_envio.name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Descripcion</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Envios en todo el territorio de la provincia de santa fe"
                v-model="create_envio.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput2" class="form-label"
                >Precio:</label
              >
              <input
                type="number"
                min="0"
                class="form-control"
                id="exampleFormControlInput2"
                placeholder=""
                v-model="create_envio.price"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="CreateEnvio()"
            >
              Crear Envio
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE ENVIO -->

    <!-- LOGO UPDATE MODAL -->
    <div
      class="modal fade"
      id="UpdateLogoModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modificar Logo</h5>
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
              <img
                :src="this.tienda.logo"
                alt=""
                style="width: 150px; heigth: 150px"
              />
            </div>
            <label for="image_edit" class="form-label"
              >Selecionar nueva imagen</label
            >
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                name="image_edit"
                id="image_edit"
                ref="imageEdit"
                @change="onFileSelectedUpdate"
              />
            </div>
            <p>Imagen nueva:</p>
            <div class="image_actual col-12 col-sm-12">
              <img :src="preview" alt="" style="width: 150px; heigth: 150px" />
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
              @click="UpdateTiendaLogo()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL MERCADOPAGO  -->
    <div
      class="modal fade"
      id="mercadopago_modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">MercadoPago</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-sm-12">
                Agregue sus credenciales de mercado pago para comenzar a recibir
                cobros.
              </div>
              <v-container><v-divider></v-divider></v-container>
              <div class="col-12 col-sm-12">
                <div
                  class="alert alert-success"
                  v-if="exists_config.status == 200"
                  role="alert"
                >
                  Ya existe una configuracion.
                </div>
              </div>
              <div class="col-12 col-sm-12">
                <p class="mp_danger">
                  Por seguridad, mitienda, nunca enviara las credenciales al
                  frontend. solamente permitira enviarlas a nuesto backend y
                  guardalas en la base de datos. todo el proceso de inicio del
                  pago, lo realiza nuestro servidor. si desea actualizarlas o
                  crearlas por primera vez solamente complete los campos, pero
                  el sistema nunca las mostrara de nuevo en pantalla.
                </p>
                <div class="mb-3">
                  <label for="public_key" class="form-label">Public key</label>
                  <input
                    type="text"
                    class="form-control"
                    id="public_key"
                    placeholder="public key"
                    v-model="public_key"
                  />
                </div>

                <div class="mb-3">
                  <label for="access_token" class="form-label"
                    >Acess token</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="access_token"
                    placeholder="access token"
                    v-model="access_token"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-12">
                <p class="mp_info">
                  Si pone las credenciales de prueba, iniciara en modo
                  prueba(sandbox),si esta listo para cobrar, inserte las
                  credenciales de produccion para comenzar a recibir pagos.
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="MercadoPagoCredentialsCreate()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL MERCADOPAGO -->

    <!-- Modales -->
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import admin_menu from "../../components/admin/admin_menu.vue";
export default {
  name: "admin_tienda",
  components: {
    admin_menu,
  },
  data() {
    return {
      title: "",
      dias_horarios: "",
      direccion: "",
      envio: "",
      telefono: "",
      whatsapp: "",
      logoToEdit: "",
      preview: "",
      exists_config: "",
      public_key: "",
      access_token: "",
      envios: [],
      create_envio: {
        name: "",
        description: "",
        price: 0,
        tienda: 0,
      },
      edit_envio: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        tienda: 0,
      },
    };
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  watch: {
    title: function (value) {
      this.tienda.title = this.title;
    },
  },

  mounted() {
    this.title = this.tienda.title;
    this.dias_horarios = this.tienda.tienda_informacion[0].dias_horarios;
    this.horario = this.tienda.tienda_informacion[0].horario;
    this.envio = this.tienda.tienda_informacion[0].envio;
    this.direccion = this.tienda.tienda_informacion[0].direccion;
    this.telefono = this.tienda.tienda_informacion[0].telefono;
    this.whatsapp = this.tienda.tienda_informacion[0].whatsapp;
    this.GetEnvios();
  },

  methods: {
    ...mapMutations("tienda", ["AddTienda"]),

    CreateEnvio() {
      this.create_envio.tienda = this.tienda.id;
      axios
        .post(this.server + "/api/v1.0/admin/envio/create/", this.create_envio)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Envio Creado!",
            "el envio fue creado correctamente.",
            "success"
          );
          this.GetEnvios();
          this.create_envio = {
            name: "",
            description: "",
            price: 0,
            tienda: 0,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    DeleteEnvio(envio) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar este envio.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Borrarlo!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(this.server + "/api/v1.0/admin/envio/delete/" + envio.id)
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Envio Eliminado!",
                  "el envio fue eliminado correctamente.",
                  "success"
                );
                this.GetEnvios();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdateEnvio() {
      axios
        .put(
          this.server + "/api/v1.0/admin/envio/update/" + this.edit_envio.id,
          this.edit_envio
        )
        .then((response) => {
          console.log(response.data);
          this.GetEnvios();
          this.$swal.fire(
            "Cambios Actualizados!",
            "Los cambios fueron actualizados correctamente.",
            "success"
          );
          this.edit_envio = {
            id: 0,
            name: "",
            description: "",
            price: 0,
            tienda: 0,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEditEnvio(envio) {
      this.edit_envio = {
        id: envio.id,
        name: envio.name,
        description: envio.description,
        price: envio.price,
        tienda: this.tienda.id,
      };
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

    MercadoPagoCredentialsCreate() {
      let data = {
        tienda: this.tienda.id,
        public_key: this.public_key,
        access_token: this.access_token,
      };
      axios
        .post(
          this.server +
            "/api/v1.0/admin/tienda/mercadopago/credentials/create/",
          data
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Cambios Actualizados!",
            "Los cambios fueron actualizados correctamente.",
            "success"
          );
          this.access_token = "";
          this.public_key = "";
          this.MercadoPagoCredentialsExists();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    MercadoPagoCredentialsExists() {
      let data = {
        tienda: this.tienda.id,
      };
      axios
        .post(
          this.server + "/api/v1.0/admin/tienda/mercadopago/credentials/",
          data
        )
        .then((response) => {
          this.exists_config = response;
          if (this.exists_config.status == 200) {
            console.log("status code 200");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdateTiendaLogo() {
      const data = new FormData();
      data.append("logo", this.logoToEdit);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/tienda/logo/update/" +
            this.tienda.id +
            "/",
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Logo Actualizado!",
            "El logo fue actualizada correctamente.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
          this.GetTienda();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SaveChanges() {
      this.UpdateTiendaTitle();
      this.UpdateTiendaInformacion();
    },

    UpdateTiendaTitle() {
      const data = new FormData();
      data.append("title", this.title);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/tienda/title/update/" +
            this.tienda.id +
            "/",
          data
        )
        .then((response) => {
          console.log(response);
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
          this.GetTienda();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetTienda() {
      let name_tienda = this.$route.params.name;
      console.log("name tienda");
      console.log(name_tienda);
      axios
        .get(this.server + "/api/v1.0/tienda/" + this.tienda.name)
        .then((response) => {
          console.log("getTienda");
          console.log(response.data.results);
          this.AddTienda(response.data.results[0]);
          console.log(this.tienda);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((final) => {
          console.log("termino la carga");
          this.load = true;
        });
    },

    onFileSelectedUpdate(event) {
      console.log(event);
      this.logoToEdit = event.target.files[0];
      this.preview = URL.createObjectURL(this.logoToEdit);
    },

    UpdateTiendaInformacion() {
      const data = new FormData();
      data.append("tienda", this.tienda.id);
      data.append("dias_horarios", this.dias_horarios);
      data.append("envio", this.envio);
      data.append("direccion", this.direccion);
      data.append("telefono", this.telefono);
      data.append("whatsapp", this.whatsapp);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/tienda/information/update/" +
            this.tienda.tienda_informacion[0].id +
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

<style scoped>
.logo_img {
  border-color: #dde6e8 !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 50px !important;
  height: 50px !important;
  margin-right: 15px !important;
}
.mp_info {
  font-size: 12px !important;
}
.mp_danger {
  font-size: 14px !important;
  color: black !important;
}
</style>