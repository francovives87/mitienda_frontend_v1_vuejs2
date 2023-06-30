<template>
  <div class="tienda_service_detail_mobile mt-12 mb-12" :style="Home">
    <div class="container mt-12">
      <div class="row card mt-2">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12">
              <h6>{{ service_db.title }}</h6>
              <v-divider></v-divider>
            </div>
          </div>

          <div class="row d-flex justify-content-center">
            <carousel
              :per-page="1"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="true"
              :loop="true"
            >
              <slide v-for="(image, index) in imagenes_array" :key="index">
                <div class="card product">
                  <div class="card-body">
                    <img class="product_image" :src="image.image" alt="" />
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
          <v-divider></v-divider>
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-7">
                <v-rating
                  v-model="product_rating"
                  background-color="orange lighten-3"
                  color="orange"
                  size="18"
                  readonly
                  :value="product_rating"
                ></v-rating>
              </div>
              <div class="col-2">
                <div class="dot">
                  <span>{{ product_rating }}</span>
                </div>
              </div>
              <div class="col-3">
                <span class="cant_opiniones"
                  >opiniones: {{ count_opinion }}</span
                >
              </div>
            </div>
            <div class="row d-flex justify-content-end">
              <v-btn
                elevation="4"
                icon
                style="background-color: white; font-size: 16px !important"
                data-bs-toggle="modal"
                data-bs-target="#opinionModal"
                class="boton_opinar"
              >
                <font-awesome-icon icon="comments" />
              </v-btn>
            </div>
          </div>

          <v-divider></v-divider>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12">
              <p>
                <span style="color: #000000">Descripcion: </span>
                <span>{{ service_db.description }}</span
                ><br />
                <span style="color: #000000">Precio: </span
                ><span>{{ service_db.price }}</span
                ><br />
              </p>
              <v-divider></v-divider>
            </div>
          </div>
        </div>

        <!-- WhatsApp contact -->
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-6 col-lg-1">
              <span class="consul_wapp">Consultar por WhatsApp</span>
            </div>
            <div class="col-2 col-sm-2 col-lg-1">
              <v-btn
                elevation="4"
                icon
                style="background-color: white"
                @click="WhatsAppContact()"
              >
                <v-icon color="green" style="font-size: 18px"
                  >mdi-whatsapp</v-icon
                >
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
        </div>

        <!-- Preguntas al vendedor -->
        <div class="container mt-2 mb-2">
          <div class="row">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item"></div>
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
                    Preguntas al vendedor ({{ cant_preguntas }})
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="botonera mt-4 mb-4 d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#preguntarModal"
                        v-if="user_store.id"
                      >
                        Preguntar
                      </button>
                      <span v-if="!user_store.id"
                        >Debe ingresar para poder preguntar.</span
                      >
                    </div>
                    <div
                      class="card mb-2"
                      v-for="(pregunta, index) in preguntas"
                      :key="index"
                    >
                      <div class="hay_preguntas" v-if="cant_preguntas > 0">
                        <div class="pregunta_container">
                          <div class="row">
                            <div class="col-6">
                              <span class="pregunta_username">{{
                                pregunta.user.username
                              }}</span>
                            </div>
                            <div class="col-6">
                              <span class="created_user">
                                {{ pregunta.created }}
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <span class="pregunta">{{
                                pregunta.pregunta
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="respuesta_container"
                          v-if="pregunta.respuesta != null"
                        >
                          <div class="row">
                            <div class="col-6">
                              <span class="respuesta_tienda">
                                {{ tienda.title }}
                              </span>
                            </div>
                            <div class="col-6">
                              <span class="respuesta_modified">
                                {{ pregunta.modified }}
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <font-awesome-icon icon="reply" class="ml-4" />
                              <span class="respuesta">
                                {{ pregunta.respuesta }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="container" v-if="tienda.id === mitienda.id">
                          <div class="col-12 d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn btn-outline-danger mr-4"
                              @click="DeleteQuestion(pregunta)"
                            >
                              Eliminar
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#responseQuestionModal"
                              @click="SetPregunta(pregunta)"
                            >
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="no_hay_preguntas" v-if="cant_preguntas == 0">
                      <h6>Aun no hay preguntas.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container" v-if="service_db.booking == true">
          <div class="row">
            <div class="col-12 col-sm-12">
              <h6>
                <span style="color: blue"
                  ><font-awesome-icon icon="calendar-alt"
                /></span>
                Reservar Turno
              </h6>
              <v-row justify="center">
                <v-date-picker
                  v-model="picker"
                  :min="today"
                  locale="es-ar"
                  :allowed-dates="allowedDates"
                  first-day-of-week="1"
                ></v-date-picker>
              </v-row>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-12">
              <h6>Dia seleccionado: {{ picker }}</h6>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <div class="card">
                    <div class="card-header">Horarios disponibles</div>
                    <div class="card-body">
                      <button
                        type="button"
                        class="btn btn-primary m-1"
                        v-for="(time, index) in loop_time"
                        :key="index"
                        data-bs-toggle="modal"
                        data-bs-target="#createBooking"
                        @click="SetDayHourToBooking(time)"
                      >
                        {{ time }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODALES -->

      <!-- Modal CREAR BOOKING -->
      <div
        class="modal fade"
        id="createBooking"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Reservar Turno</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                <span>DIA: </span><span>{{ set_day_hour.date }}</span> <br />
                <span>HORA: </span> <span>{{ set_day_hour.time }}</span>
              </p>
              <v-container><v-divider></v-divider></v-container>
              <!-- Si esta registrado -->
              <form>
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <div class="mb-1">
                      <label for="exampleFormControlInput1" class="form-label"
                        ><span style="color: red">*</span> Nombre</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="nombre"
                        v-model="personalData.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-6 col-sm-6">
                    <div class="mb-1">
                      <label for="exampleFormControlInput1" class="form-label"
                        ><span style="color: red">*</span> Apellido</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="apellido"
                        v-model="personalData.apellido"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="mb-1">
                      <label for="exampleFormControlInput1" class="form-label"
                        ><span style="color: red">*</span> Telefono</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="telefono"
                        v-model="personalData.telefono"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="mb-1">
                      <label for="exampleFormControlInput1" class="form-label"
                        ><span style="color: red">*</span> Correo
                        Electronico</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@email.com"
                        v-model="personalData.email"
                      />
                      <div
                        class="withPayment"
                        v-if="service_db.payment == true"
                      >
                        <div class="alert alert-primary mt-2" role="alert">
                          Para reservar, debe abonar ${{
                            service_db.payment_price
                          }}.
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="mercadopago"
                            v-model="metodoPago"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            MercadoPago <br />
                            <span class="order_info"
                              >Pagar con credito/debito a travez de
                              mercadopago.</span
                            >
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
                v-if="service_db.payment == false"
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="Reservar()"
              >
                Reservar
              </button>
              <button
                v-if="service_db.payment == true"
                :disabled="metodoPago == null"
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="Reservar()"
              >
                Pagar y reservar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- OPINION -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="opinionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
        >
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
                            <span class="opinion_user">{{
                              opinion.user.username
                            }}</span>
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
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                            >Escriba una opinion:
                            <span style="font-size: 12px"
                              >(maximo 255 caracteres)
                            </span>
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="10"
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
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="DeleteUserOpinion()"
                v-if="opinar == true && userOpinion.id > 0"
              >
                Eliminar comentario
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

      <!-- PREGUNTAR -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="preguntarModal"
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
                Preguntar al vendedor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="ClosePreguntaModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Escribe un pregunta.
                  <span style="font-size: 12px">(255 caracteres)</span></label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  v-model="pregunta"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="ClosePreguntaModal()"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="CreatePregunta()"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RESPONDER PREGUNTA -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="responseQuestionModal"
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
                Responder Pregunta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container card">
                <div class="row">
                  <div class="col-6">
                    {{ set_pregunta.username }}
                  </div>
                  <div class="col-6">
                    {{ set_pregunta.created }}
                  </div>
                  <div class="col-12">
                    {{ set_pregunta.pregunta }}
                  </div>
                </div>
              </div>
              <div class="container card mt-4">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                        >Responder</label
                      >
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        v-model="set_pregunta.respuesta"
                      ></textarea>
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
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="ResponderQuestion()"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RESPONDER PREGUNTA -->
      <!-- PREGUNTAR -->

      <!-- MODALES -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "tienda_service_detail_mobile",
  props: ["service"],
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      service_db: [],
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      loop_time: [],
      horas_ocupadas: [],
      horas_disponibles: [],
      horas_descanso: [],
      horas_pasadas: [],
      set_day_hour: {
        date: this.picker,
        time: null,
      },
      personalData: {
        nombre: null,
        apellido: null,
        telefono: null,
        email: null,
      },
      hayDatos: false,
      anonymous: false,
      personal_data_id: 0,
      anonymous_data_id: null,
      dias: [],
      error: false,
      imagenes_array: [],
      metodoPago: null,
      /* opiniones */
      product_rating: 0,
      count_opinion: 0,
      opiniones: [],
      canOpinar: false,
      opinar: false,
      userOpinion: {
        id: 0,
        rating: 1,
        opinion: null,
      },
      /* opiniones */
      /* preguntas */
      preguntas: [],
      cant_preguntas: 0,
      pregunta: null,
      set_pregunta: {
        id: "",
        username: "",
        created: "",
        pregunta: "",
        respuesta: "",
      },
    };
  },

  watch: {
    picker: function (value) {
      console.log("picker change");
      console.log(value);
      this.GetHoursByDate(value);
      this.horas_ocupadas = [];
      this.horas_pasadas = [];
    },
  },

  computed: {
    ...mapState("user", ["user_store"]),
    ...mapState("tienda", ["tienda", "mitienda"]),
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

    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; min-height: 1160px;"
          );
        }
      }
    },
  },

  created() {
    console.log("picker===");
    console.log(this.picker);
    this.GetService();
    console.log("created");
    console.log(this.service_db);
    this.GetUserPersonalData();
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    /* Preguntas */
    ...mapMutations("tienda", ["DisminuirCantNewsNotifiacionts"]),
    DeleteQuestion(pregunta) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar esta pregunta?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server +
                  "/api/v1.0/admin/service/question/delete/" +
                  pregunta.id
              )
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Pregunta eliminada!",
                  "Se ha borrado esta pregunta.",
                  "success"
                );
                this.GetPreguntas();
              });
          }
        });
    },

    ResponderQuestion() {
      let data = {
        visto: true,
        respuesta: this.set_pregunta.respuesta,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/service/questions/update/" +
            this.set_pregunta.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetPreguntas();
          this.$swal.fire(
            "Respondido!",
            "Se ha respondido con exito la pregunta.",
            "success"
          );
          this.DisminuirCantNewsNotifiacionts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetPregunta(pregunta) {
      this.set_pregunta = {
        id: pregunta.id,
        username: pregunta.user.username,
        created: pregunta.created,
        pregunta: pregunta.pregunta,
        respuesta: pregunta.respuesta,
      };
      console.log(this.set_pregunta);
    },

    ClosePreguntaModal() {
      this.pregunta = "";
    },

    CreatePregunta() {
      var data = {
        service: this.service,
        user: this.user_store.id,
        pregunta: this.pregunta,
      };

      axios
        .post(this.server + "/api/v1.0/service/question/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Pregunta Creada!",
            "El administrador de la tienda contestara pronto.",
            "success"
          );
          this.ClosePreguntaModal();
          this.GetPreguntas();
        });
    },

    GetPreguntas() {
      console.log("GetPreguntas");
      axios
        .get(this.server + "/api/v1.0/service/question/list/", {
          params: {
            service: this.service,
          },
        })
        .then((response) => {
          this.preguntas = response.data.results;
          this.cant_preguntas = response.data.count;
          console.log("this.preguntas");
          console.log(this.preguntas);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* Preguntas */

    Horas_pasadas() {
      /* loop para sacar las horas del dia que ya han transcurrido */
      var hora_actual = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(11, 2);
      console.log("=====FECHA HOY==========");

      var hora_limpia_y_number = parseInt(hora_actual, 10);
      console.log(hora_limpia_y_number);
      console.log("=====TRATANDO HORA");

      var x = this.service_db.interval; //minutes interval
      var start_time = this.service_db.start_time * 60;
      var tt = start_time; // start time //Aca tengo que dividirlo por 60 para saber la hora de arranque

      var end_time = this.service_db.end_time;

      //loop to increment the time and push results in array
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = tt % 60; // getting minutes of the hour in 0-55 format
        this.horas_pasadas[i] =
          ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
        if (hh === hora_limpia_y_number) {
          break;
        }
        console.log("hh");
        console.log(hh);
        tt = tt + x;
      }
      console.log(this.horas_pasadas);
    },

    Reservar() {
      /* comprobaciones */
      if (this.personalData.nombre == null) {
        this.error = true;
      }
      if (this.personalData.apellido == null) {
        this.error = true;
      }
      if (this.personalData.telefono == null) {
        this.error = true;
      }
      if (this.personalData.email == null) {
        this.error = true;
      }

      if (this.error == false) {
        let data = {
          tienda: this.tienda.id,
        };

        axios
          .post(this.server + "/api/v1.0/tienda/bookings/permission/", data)
          .then((response) => {
            console.log(response.data);
            if (this.anonymous == false) {
              if (this.hayDatos == false) {
                this.CreatePersonaData();
              } else {
                this.UpdatedPersonalData();
              }
            }
            if (this.anonymous == true) {
              this.CreateAnonymousData();
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire(
              "Limite de reservas excedido!",
              "Esta tienda alcanzo el limite de reservas que puede recibir segun su plan!",
              "error"
            );
          });
      } else {
        this.error = false;
        this.$swal.fire(
          "Faltan datos!",
          "Complete los campos obligatorios, tiene un * que los identifaca.",
          "error"
        );
      }
    },
    CreateAnonymousData() {
      console.log("anonymous");
      axios
        .post(
          this.server + "/api/v1.0/services/anonymous/create/",
          this.personalData
        )
        .then((response) => {
          console.log(response.data);
          this.anonymous_data_id = response.data.id;

          if (this.anonymous_data_id > 0) {
            let data = {
              tienda: this.tienda.id,
              service: this.service_db.id,
              date: this.set_day_hour.date,
              time: this.set_day_hour.time,
              user_personal_data: null,
              anonymous_personal_service_data: this.anonymous_data_id,
            };
            if (this.service_db.payment == true) {
              this.CreateReservaWithPayment(data);
            } else {
              this.CreateReserva(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    CreatePersonaData() {
      let data = {
        user: localStorage.getItem("cod_ref"),
        nombre: this.personalData.nombre,
        apellido: this.personalData.apellido,
        telefono: this.personalData.telefono,
      };

      axios
        .post(this.server + "/api/v1.0/user/personal/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.personal_data_id = response.data.id;
          console.log(this.personal_data_id);
          let booking = {
            tienda: this.tienda.id,
            service: this.service_db.id,
            date: this.set_day_hour.date,
            time: this.set_day_hour.time,
            user_personal_data: this.personal_data_id,
            anonymous_personal_service_data: null,
          };
          if (this.service_db.payment == true) {
            this.CreateReservaWithPayment(booking);
          } else {
            this.CreateReserva(booking);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateReservaWithPayment(data) {
      console.log("desde CreateReservaWithPayment");
      console.log("personal_data");
      console.log(this.personal_data_id);
      console.log(data);
      axios
        .post(this.server + "/api/v1.0/services/booking/payment/create/", data)
        .then((response) => {
          console.log("Booking_id");
          console.log(response.data.booking_id);
          let payment = {
            tienda: this.tienda.name,
            total: this.service_db.payment_price,
            booking: response.data.booking_id,
            tienda_id: this.tienda.id,
          };
          /* si anonimo es null, es que esta registrado, abro initpoint de ususario registrado. */
          if (data.anonymous_personal_service_data == null) {
            axios
              .post(
                this.server + "/api/v1.0/services/payment/mercadopago/",
                payment
              )
              .then((response) => {
                console.log("mercadopago");
                console.log(response.data);
                const mp_initPoint = response.data.init_point;
                console.log("init_point");
                console.log(mp_initPoint);
                if (mp_initPoint) {
                  window.location.href = mp_initPoint;
                } else {
                  this.$swal.fire(
                    "Algo salio mal!",
                    "Posiblemente el dueño de la tienda, no ingreso las credenciales de MercadoPago correctamente.",
                    "error"
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("es anonimo ejecuto mpinitipoint anono");
            axios
              .post(
                this.server + "/api/v1.0/services/payment/anon/mercadopago/",
                payment
              )
              .then((response) => {
                console.log("mercadopago");
                console.log(response.data);
                const mp_initPoint = response.data.init_point;
                console.log("init_point");
                console.log(mp_initPoint);
                if (mp_initPoint) {
                  window.location.href = mp_initPoint;
                } else {
                  this.$swal.fire(
                    "Algo salio mal!",
                    "Posiblemente el dueño de la tienda, no ingreso las credenciales de MercadoPago correctamente.",
                    "error"
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.horas_ocupadas = [];
          this.GetHoursByDate(this.picker);
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Limite de reservas excedido!",
            "Esta tienda alcanzo el limite de reservas que puede recibir segun su plan!",
            "error"
          );
        });
    },

    CreateReserva(data) {
      console.log("desde create");
      console.log(this.personal_data_id);
      axios
        .post(this.server + "/api/v1.0/services/booking/create/", data)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Turno Reservado!",
            "El Turno se ha reservado correctamente. Muchas Gracias!",
            "success"
          );
          this.horas_ocupadas = [];
          this.GetHoursByDate(this.picker);
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Limite de reservas excedido!",
            "Esta tienda alcanzo el limite de reservas que puede recibir segun su plan!",
            "error"
          );
        });
    },

    UpdatedPersonalData() {
      console.log("UpdatedPersonalData");
      let data = {
        user: localStorage.getItem("cod_ref"),
        nombre: this.personalData.nombre,
        apellido: this.personalData.apellido,
        telefono: this.personalData.telefono,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/user/personal/update/" +
            this.personalData.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.personal_data_id = response.data.id;
          console.log(this.personal_data_id);
          let booking = {
            tienda: this.tienda.id,
            service: this.service_db.id,
            date: this.set_day_hour.date,
            time: this.set_day_hour.time,
            user_personal_data: this.personal_data_id,
            anonymous_personal_service_data: null,
          };
          if (this.service_db.payment == true) {
            this.CreateReservaWithPayment(booking);
          } else {
            this.CreateReserva(booking);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetUserPersonalData() {
      if (localStorage.getItem("cod_ref")) {
        axios
          .get(
            this.server +
              "/api/v1.0/user/personal/" +
              localStorage.getItem("cod_ref")
          )
          .then((response) => {
            console.log(response.data);
            console.log(response.data.results);
            if (response.data.results.length > 0) {
              this.hayDatos = true;
              this.personalData = {
                nombre: response.data.results[0]["nombre"],
                apellido: response.data.results[0]["apellido"],
                telefono: response.data.results[0]["telefono"],
                id: response.data.results[0]["id"],
              };
              this.personalData.email = this.user_store.email;
              console.log("ya cargado");
              console.log(this.personalData);
              this.personal_data_id = response.data.results[0].id;
              console.log(this.personal_data_id);
              console.log("estamos aca trabado");
              console.log("tienda.user");
              console.log(this.tienda.user);

              /* compruebo si es la tienda del user, entonces permito anonimos
                no se va a reservar uno mismo
              */
              if (this.tienda.user == this.user_store.id) {
                console.log("se cumple esto?");
                this.anonymous = true;
                this.personalData = {
                  nombre: null,
                  apellido: null,
                  telefono: null,
                  email: null,
                };
              }
            } else {
              this.hayDatos = false;
            }
          })
          .catch((error) => {
            console.log("eso seria el error?");
            this.anonymous = true;
            console.log(this.anonymous);
          });
      } else {
        this.anonymous = true;
        console.log("ANONO");
        console.log(this.anonymous);
      }
    },

    SetDayHourToBooking(time) {
      this.set_day_hour = {
        date: this.picker,
        time: time,
      };
    },

    GetHoursByDate(date) {
      axios
        .get(
          this.server +
            "/api/v1.0/services/filter/?date=" +
            date +
            "&service=" +
            this.service_db.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.Horas_pasadas();
          if (response.data.results.length > 0) {
            var horas = response.data.results;
            horas.forEach((element) => {
              this.horas_ocupadas.push(element.time);
            });
            console.log(this.horas_ocupadas);

            this.LoopTimes();

            this.QuitarOcupados();
            if (this.service_db.has_break == true) {
              this.QuitarDescansos();
            }
          }
          if (response.data.results.length === 0) {
            (this.loop_time = []), this.LoopTimes();
            if (this.service_db.has_break == true) {
              this.QuitarDescansos();
            }
          }

          /* si picker coincide con hoy, quito las horas pasadas */

          if (
            this.picker ==
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          ) {
            this.QuitarHorasPasadas();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    LoopTimes() {
      var x = this.service_db.interval; //minutes interval
      var start_time = this.service_db.start_time * 60;
      var tt = start_time; // start time //Aca tengo que dividirlo por 60 para saber la hora de arranque

      var end_time = this.service_db.end_time;

      //loop to increment the time and push results in array
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = tt % 60; // getting minutes of the hour in 0-55 format
        this.loop_time[i] = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
        if (hh === end_time) {
          break;
        }
        tt = tt + x;
      }
    },

    QuitarOcupados() {
      this.horas_ocupadas.forEach((element) => {
        let indice = this.loop_time.findIndex(
          (el) => JSON.stringify(el) === JSON.stringify(element)
        );
        this.loop_time.splice(indice, 1);
      });
    },

    QuitarHorasPasadas() {
      this.horas_pasadas.forEach((element) => {
        let indice = this.loop_time.findIndex(
          (el) => JSON.stringify(el) === JSON.stringify(element)
        );
        this.loop_time.splice(indice, 1);
      });
    },

    QuitarDescansos() {
      console.log("quitar descansos");
      console.log(this.service_db);

      this.service_db.times_break.forEach((element) => {
        let indice = this.loop_time.findIndex(
          (el) => JSON.stringify(el) === JSON.stringify(element)
        );
        this.loop_time.splice(indice, 1);
      });
    },

    /* con esta funcion, desactivo los dias que no quiero, los pongo en el array */
    allowedDates(val) {
      return this.dias.includes(new Date(val).getDay());
    },
    check() {
      console.log(this.picker);
    },

    LoadImages() {
      let images = {
        image: null,
      };
      this.service_db.images_services.forEach((el) => {
        images = {
          image: el.image,
        };
        this.imagenes_array.push(images);
      });
      let portada = {
        image: this.service_db.image,
      };
      this.imagenes_array.unshift(portada);

      console.log("desde LOAD_images");
      console.log(this.imagenes_array);
    },

    /* opiniones */

    GuardarOpinion() {
      if (this.userOpinion.opinion == null) {
        this.$swal.fire(
          "Escriba un comentario!",
          "Por favor, escriba un breve comentario.",
          "info"
        );
      } else {
        console.log(this.userOpinion);
        if (this.userOpinion.id > 0) {
          console.log("ejecuto update");
          this.UpdateUserOpinion();
        } else {
          console.log("ejecuto create");
          this.CreateUserOpinon();
        }
      }
    },

    UpdateUserOpinion() {
      let data = {
        rating: this.userOpinion.rating,
        opinion: this.userOpinion.opinion,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/service/opinion/user/update/" +
            this.userOpinion.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.imagenes_array = [];
          this.GetService();
          window.scrollTo(0, 0);
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
        service: this.service,
      };
      axios
        .post(this.server + "/api/v1.0/service/opinion/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Comentario Creado!",
            "Muchas gracias por comentar y ayudar a la comunidad.",
            "success"
          );
          this.imagenes_array = [];
          this.GetService();
          this.CloseModalOpinion();
          window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
    },

    DeleteUserOpinion() {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar este comentario?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          axios
            .delete(
              this.server +
                "/api/v1.0/service/opinion/user/delete/" +
                this.userOpinion.id
            )
            .then(() => {
              this.$swal.fire(
                "Comentario eliminado!",
                "Se ha borrado este comentario.",
                "success"
              );
              this.CloseModalOpinion();
              this.imagenes_array = [];
              this.GetService();
              window.scrollTo(0, 0);
            })
            .catch((error) => {
              this.$swal.fire(
                "Algo salio mal!",
                "intente nuevamente.",
                "error"
              );
            });
        });
    },

    Opinar() {
      console.log("opinar");
      /* getUserOpinion */
      axios
        .get(this.server + "/api/v1.0/service/opinion/user/", {
          params: {
            user: this.user_store.id,
            service: this.service,
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

    GetOpiniones() {
      axios
        .get(this.server + "/api/v1.0/service/opinion/list/", {
          params: {
            service: this.service,
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
    /* opiniones */

    GetService() {
      axios
        .get(this.server + "/api/v1.0/services/view/" + this.service)
        .then((response) => {
          console.log(response.data);
          this.service_db = response.data;
          this.GetHoursByDate(this.picker);
          this.LoadImages();
          console.log("this.service_db");
          console.log(this.service_db);
          let dias_to_string = this.service_db.days.join();
          console.log("dias_to_string");
          console.log(dias_to_string);
          let dias = dias_to_string.split(",").map(Number);
          console.log("dias");
          console.log(dias);
          this.dias = dias;
          this.product_rating = response.data.average.rating__avg;
          this.count_opinion = response.data.count_opinion.opinion__count;
          this.GetOpiniones();
          this.GetPreguntas();
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
            "&text=Hola!%20tengo%20una%20consulta%20de%20su%20tienda.%20sobre%20el%20servicio:%20%0A" +
            this.service_db.title,
          "_blank"
        );
      }
    },
  },
};
</script>

<style scoped>
.consul_wapp {
  font-size: 12px !important;
  color: darkgray !important;
  text-transform: uppercase !important;
}

.pregunta_container {
  padding: 6px;
  background-color: #e3e3e3;
}

.respuesta_container {
  padding: 6px;
}

.pregunta_username {
  font-size: 13px;
}
.created_user {
  font-size: 12px;
}

.respuesta_tienda {
  font-size: 13px;
}

.respuesta {
  margin-left: 4px;
}

.respuesta_modified {
  font-size: 12px;
}

.btn-success {
  color: #ffffff !important;
  background-color: #a463bf;
  border-color: #a463bf !important;
}

.card {
  align-items: center !important;
  padding: 0px 10px 0px 10px !important;
}
.card-body {
  padding: 0px 0px 0px 0px !important;
  margin: 0px 0px 0px 0px !important;
}
.product {
  width: 304px;
  height: 300px;
  padding: 0px 2px 0px 2px !important;
  margin: 0px 4px 0px 4px !important;
}

.product_image {
  width: 298px !important;
  height: 298px !important;
  padding: 4px 0px 4px 0px !important;
  border-radius: 1% !important;
}

.dot {
  height: 34px;
  width: 34px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid orange;
  color: orange;
}

.boton_opinar {
  margin-right: 30px !important;
}

.cant_opiniones {
  font-size: 12px !important;
}

@media only screen and (min-width: 768px) {
  .product {
    width: 640px;
    height: 440px;
  }

  .product_image {
    width: 600px !important;
    height: 400px !important;
  }
}
</style>