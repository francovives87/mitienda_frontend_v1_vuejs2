<template>
  <div class="tienda mb-10">
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
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#acordion_plan"
                  aria-expanded="false"
                  aria-controls="acordion_plan"
                >
                  Mi tienda / Mi plan
                </button>
              </h2>
              <div
                id="acordion_plan"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <div class="card" style="width: auto">
                        <div class="card-header">Mi tienda:</div>
                        <ul
                          class="list-group list-group-flush"
                          style="font-size: 12px !important"
                        >
                          <li class="list-group-item">
                            Diapositivas: {{ count_objects.sliders }}
                          </li>
                          <li class="list-group-item">
                            Categorias: {{ count_objects.categorias }}
                          </li>
                          <li class="list-group-item">
                            Productos: {{ count_objects.productos }}
                          </li>
                          <li class="list-group-item">
                            Servicios: {{ count_objects.services }}
                          </li>
                          <li class="list-group-item">
                            Categorias blog:
                            {{ count_objects.categorias_blog }}
                          </li>
                          <li class="list-group-item">
                            Entradas: {{ count_objects.entries_blog }}
                          </li>
                          <li class="list-group-item">
                            Ordenes generadas este mes: <br />
                            <span style="color: green; font-size: 16px">{{
                              count_objects.orders
                            }}</span>
                          </li>
                          <li class="list-group-item">
                            Reservas generadas este mes: <br />
                            {{ count_objects.reservas }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6">
                      <div class="card" style="width: auto">
                        <div class="card-header">
                          Plan: {{ tienda.plan.name }}
                        </div>
                        <ul
                          class="list-group list-group-flush"
                          style="font-size: 12px !important"
                        >
                          <li class="list-group-item">
                            Diapositivas: {{ tienda.plan.images_sliders }}
                          </li>
                          <li class="list-group-item">
                            Categorias: {{ tienda.plan.product_categories }}
                          </li>
                          <li class="list-group-item">
                            Productos: {{ tienda.plan.product_products }}
                          </li>
                          <li class="list-group-item">
                            Servicios: {{ tienda.plan.services }}
                          </li>
                          <li class="list-group-item">
                            Categorias blog: {{ tienda.plan.blog_categories }}
                          </li>
                          <li class="list-group-item">
                            Entradas: {{ tienda.plan.blog_entries }}
                          </li>
                          <li class="list-group-item">
                            Ordenes x mes: {{ tienda.plan.orders }}
                          </li>
                          <li class="list-group-item">
                            Reservas x mes: {{ tienda.plan.bookings }}
                          </li>
                        </ul>
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
                  data-bs-target="#flush-collapseGeoMapa"
                  aria-expanded="false"
                  aria-controls="flush-collapseGeoMapa"
                >
                  Geolocalizacion y mapa
                </button>
              </h2>
              <div
                id="flush-collapseGeoMapa"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-12 col-12-sm">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="GoToGeo()"
                        >
                          Configurar Geolocalizacion
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
                  data-bs-target="#flush-collapseTipoTienda"
                  aria-expanded="false"
                  aria-controls="flush-collapseTipoTienda"
                >
                  Tipo de tienda
                </button>
              </h2>
              <div
                id="flush-collapseTipoTienda"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <div class="row">
                      <div class="container">
                        <div class="row">
                          <div class="col-12 col-sm-12">
                            <div class="col-12 col-sm-12">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  value="1"
                                  v-model="tipo_tienda"
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  Completa <br />
                                  <span class="order_info">
                                    Al momento que el cliente deba ordenar,se le
                                    pediran mas informacion, como pais,provincia
                                    o estado, codigo postal etc...
                                  </span>
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  value="2"
                                  v-model="tipo_tienda"
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Tienda de envios <br />
                                  <span class="order_info">
                                    Al momento que el cliente deba ordenar,se le
                                    pediran datos basicos para un delivery,
                                    suponiendo que no hace falta aclarar, pais,
                                    provincia, ciudad
                                  </span>
                                </label>
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
                        <div class="row">
                          <v-switch
                            v-model="payment_methods.only_order"
                            label="Solo Ordenar"
                            @change="UpdatePaymentMethods()"
                          ></v-switch>
                        </div>
                        <div class="row d-flex align-items-center">
                          <div class="col-6">
                            <v-switch
                              v-model="payment_methods.transfer"
                              label="Transferencia"
                              @change="UpdatePaymentMethods()"
                            ></v-switch>
                          </div>
                          <div class="col-6">
                            <v-btn
                              v-if="payment_methods.transfer == true"
                              elevation="2"
                              icon
                              data-bs-toggle="modal"
                              data-bs-target="#TransferData"
                              @click="TransferDataCredentialsExists()"
                              ><font-awesome-icon icon="fa-edit"
                            /></v-btn>
                          </div>
                        </div>
                        <div class="row d-flex align-items-center">
                          <div class="col-6">
                            <v-switch
                              v-model="payment_methods.mercadopago"
                              label="MercadoPago"
                              @change="UpdatePaymentMethods()"
                            ></v-switch>
                          </div>
                          <div class="col-6">
                            <v-btn
                              v-if="payment_methods.mercadopago == true"
                              elevation="2"
                              icon
                              data-bs-toggle="modal"
                              data-bs-target="#mercadopago_modal"
                              @click="MercadoPagoCredentialsExists()"
                              ><font-awesome-icon icon="fa-edit"
                            /></v-btn>
                          </div>
                        </div>
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

    <!-- MODAL TRANSFERENCIA DATA -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="TransferData"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Datos de transferencia
            </h5>
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
                >Banco/Entidad</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="banco/entidad"
                v-model="trasferDataInputs.bank"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Alias</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="alias"
                v-model="trasferDataInputs.alias"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >CBU</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="000000012345"
                v-model="trasferDataInputs.cbu"
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
              @click="TransferDataCredentialsCreate()"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL TRANSFERENCIA DATA -->

    <!-- Modales -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
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
      exists_config: "",
      transferData: null,
      public_key: "",
      access_token: "",
      envios: [],
      tipo_tienda: 0,
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
      payment_methods: {
        only_order: null,
        transfer: null,
        mercadopago: null,
      },
      trasferDataInputs: {
        bank: null,
        alias: null,
        cbu: null,
      },
    };
  },

  created() {
    this.Guard();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("tienda", ["count_objects"]),
  },
  watch: {
    title: function (value) {
      this.tienda.title = this.title;
    },
  },

  mounted() {
    if (this.tienda.title) {
      this.title = this.tienda.title;
    } else {
      this.title = this.tienda.name;
    }
    this.dias_horarios = this.tienda.tienda_informacion[0].dias_horarios;
    this.horario = this.tienda.tienda_informacion[0].horario;
    this.envio = this.tienda.tienda_informacion[0].envio;
    this.direccion = this.tienda.tienda_informacion[0].direccion;
    this.telefono = this.tienda.tienda_informacion[0].telefono;
    this.whatsapp = this.tienda.tienda_informacion[0].whatsapp;
    this.GetEnvios();
    this.load_count_objects();
    this.tipo_tienda = this.tienda.tipo_tienda;
    console.log(this.tipo_tienda);
    this.payment_methods.only_order = this.tienda.payment_methods[0].only_order;
    this.payment_methods.transfer = this.tienda.payment_methods[0].transfer;
    this.payment_methods.mercadopago =
      this.tienda.payment_methods[0].mercadopago;
    console.log("PAYMENTS_METHODS");
    console.log(this.payment_methods);
  },

  methods: {
    ...mapMutations("tienda", ["AddTienda"]),
    ...mapActions("tienda", ["load_count_objects"]),

    /* el metodo guard sirve de permiso, para que no se cargue una vista Admin si no es de su tienda */

    UpdatePaymentMethods() {
      console.log("UpdatePaymentsMethods");
      console.log(this.payment_methods);
      console.log(this.tienda.id);
      let data = {
        tienda: this.tienda.id,
        only_order: this.payment_methods.only_order,
        transfer: this.payment_methods.transfer,
        mercadopago: this.payment_methods.mercadopago,
      };
      axios
        .post(
          this.server + "/api/v1.0/admin/tienda/paymentmethods/update/",
          data
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Guard() {
      console.log("GUARD!");
      if (this.tienda.user != localStorage.getItem("cod_ref")) {
        console.log("este es un loquito");
        this.$router.push({
          name: "Main",
        });
      }
    },

    UpdateTipoTienda() {
      let data = {
        tipo_tienda: this.tipo_tienda,
      };
      axios
        .put(this.server + "/api/v1.0/admin/store/type/" + this.tienda.id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GoToGeo() {
      this.$router.push({
        name: "AdminGeo",
      });
    },

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

    TransferDataCredentialsExists() {
      let data = {
        tienda: this.tienda.id,
      };
      axios
        .post(
          this.server + "/api/v1.0/admin/tienda/transfer/credentials/",
          data
        )
        .then((response) => {
          if (response.status == 200) {
            this.transferData = response.data;
            this.trasferDataInputs.bank = this.transferData.bank;
            this.trasferDataInputs.alias = this.transferData.alias;
            this.trasferDataInputs.cbu = this.transferData.cbu;
          }
          console.log("TransferDataCredentialsExists");
          console.log(response.status);
          console.log(this.transferData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    TransferDataCredentialsCreate() {
      let data = {
        tienda: this.tienda.id,
        bank: this.trasferDataInputs.bank,
        alias: this.trasferDataInputs.alias,
        cbu: this.trasferDataInputs.cbu,
      };
      axios
        .post(
          this.server + "/api/v1.0/admin/tienda/transfer/credentials/create/",
          data
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Cambios Actualizados!",
            "Los cambios fueron actualizados correctamente.",
            "success"
          );
          this.trasferDataInputs.bank = null;
          this.trasferDataInputs.alias = null;
          this.trasferDataInputs.cbu = null;
          this.TransferDataCredentialsExists();
        })
        .catch((error) => {
          let errors = [];
          let have_error = false;
          console.log(error.response.data);

          if (error.response.data.cbu) {
            errors.push("cbu");
            have_error = true;
          }
          if (error.response.data.alias) {
            errors.push("alias");
            have_error = true;
          }
          if (error.response.data.bank) {
            errors.push("bank");
            have_error = true;
          }
          if (have_error == true) {
            this.$swal.fire(
              "Faltan Datos!",
              ""+errors,
              "error"
            );
          }

          console.log(errors);
        });
    },

    SaveChanges() {
      this.UpdateTiendaInformacion();
      this.UpdateTipoTienda();
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
.order_info {
  color: gray;
  font-size: 13px;
}
</style>
