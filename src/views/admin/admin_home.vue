<template>
  <div class="mb-4">

    <div class="loading">
      <admin_loading v-if="load == false" />
    </div>
    <div class="adminHome mb-2" v-if="load == true">
      <admin_menu></admin_menu>
      <div class="container">
        <div class="row">
          <div class="col-6 col-sm-6 col-lg-9">
            <div class="">
              <h5>Bienvendio <span class="admin">Administrador</span></h5>
            </div>
          </div>
          <div class="col-6 col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-header">Plan: {{ tienda.plan.name }}</div>
              <div class="card-body">
                <p class="card-text">
                  <span style="color: #000000">Mensual</span> <br />
                  <span>Ordenes: </span>
                  <span>{{ count_objects.orders }}</span> /
                  <span>{{ tienda.plan.orders }}</span> <br />
                  <span>Reservas: </span>
                  <span>{{ count_objects.reservas }}</span> /
                  <span>{{ tienda.plan.bookings }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12">
            <div class="bienvenido"></div>
          </div>
        </div>

        <div class="row">
          <v-tabs class="d-flex justify-content-center">
            <v-tab
              @click="ChangeVista('ordenes')"
              :class="[count_ordes_news > 0 ? 'new_msj' : 'no_msj']"
              ><font-awesome-icon icon="shopping-bag" /> &nbsp;({{
                count_ordes_news
              }})</v-tab
            >
            <v-tab
              @click="ChangeVista('turnos')"
              :class="[count_news_bookings > 0 ? 'new_msj' : 'no_msj']"
            >
              <font-awesome-icon icon="calendar-alt" /> &nbsp; ({{
                count_news_bookings
              }})</v-tab
            >
            <v-tab
              @click="ChangeVista('notificaciones')"
              :class="[count_news_questions > 0 || count_news_service_questions > 0 ? 'new_msj' : 'no_msj']"
              ><font-awesome-icon icon="bell" /> &nbsp;({{
                count_news_questions + count_news_service_questions
              }})</v-tab
            >
          </v-tabs>
        </div>
        <div class="mt-6">
          <v-divider></v-divider>
        </div>

        <!-- Botonera -->
        <div class="row d-flex justify-content-end">
          <div class="col-2 col-sm-2">
            <v-btn elevation="4" icon @click="ButtonClear()">
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </div>

          <div class="col-2 col-sm-2 mr-6">
            <v-btn elevation="4" icon @click="ButtonRefresh()">
              <font-awesome-icon icon="sync-alt" />
            </v-btn>
          </div>
        </div>

        <!-- Botonera -->

        <!-- Vista ordenes nuevas -->
        <div class="ordenes" v-if="vista == 'ordenes'">
          <div class="row mt-8">
            <div class="col-8 col-sm-8">
              <h6>Ordenes nuevas: {{ count_ordes_news }}</h6>
            </div>
          </div>

          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12" v-if="orders.length > 0">
              <v-card
                elevation="2"
                outlined
                v-for="(order, index) in orders"
                :key="index"
                class="mb-1"
              >
                <v-card-text>
                  <router-link
                    :to="{
                      name: 'AdminOrderDetail',
                      params: { order: order.id },
                    }"
                  >
                    <div class="row d-flex align-items-center">
                      <div class="col-4 col-sm-4">
                        <div class="position-relative">
                          <img
                            :src="server + '/media_root/defaults/bag1.png'"
                            alt=""
                            style="width: 20px; heigth: 20px"
                          />
                          <span
                            class="
                              position-absolute
                              top-0
                              start-50
                              translate-middle
                              badge
                              rounded-pill
                              bg-success
                            "
                          >
                            NUEVA
                            <span class="visually-hidden">unread messages</span>
                          </span>
                        </div>
                      </div>
                      <div class="col-8 col-sm-8">
                        <span class="orden_nueva_title">
                          {{ order.created }}</span
                        >
                        <p class="orden_nueva">
                          Monto: $ {{ order.total }} <br />
                          Cantidad de items: {{ order.quantity_products }}
                          <br />
                          Metodo de pago: {{ order.metodo_pago }} <br />
                          Estado de la orden: {{ order.estado }}
                        </p>
                      </div>
                    </div>
                  </router-link>
                </v-card-text>
              </v-card>
            </div>
            <div class="col-12 col-sm-12" v-if="orders.length == 0">
              <h6>No hay ordenes nuevas.</h6>
            </div>
          </div>
        </div>

        <!-- Vista Turnos -->

        <div class="turnos" v-if="vista == 'turnos'">
          <div class="row">
            <div class="col-8 col-sm-8">
              <h6>Nuevos Turnos: {{ count_news_bookings }}</h6>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12" v-if="bookings.length > 0">
              <v-card
                elevation="2"
                outlined
                v-for="(booking, index) in bookings"
                :key="index"
                class="mb-1"
                data-bs-toggle="modal"
                data-bs-target="#VerTurnoModal"
                @click="SetTurno(booking)"
              >
                <v-card-text>
                  <div class="row d-flex align-items-center">
                    <div class="col-4 col-sm-4">
                      <div class="position-relative">
                        <font-awesome-icon
                          :color="booking.service.color"
                          icon="calendar-alt"
                        />
                        <span
                          class="
                            position-absolute
                            top-0
                            start-50
                            translate-middle
                            badge
                            rounded-pill
                            bg-success
                          "
                        >
                          NUEVA
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </div>
                    </div>
                    <div class="col-8 col-sm-8">
                      <span class="orden_nueva_title">
                        {{ booking.created }}</span
                      >
                      <p class="orden_nueva">
                        <span>Servicio: </span>
                        <span>{{ booking.service.title }}</span> <br />
                        <span>Dia: </span> <span>{{ booking.date }}</span>
                        <br />
                        <span>Hora: </span> <span>{{ booking.time }}</span>
                        <br />
                      </p>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
            <div class="col-12 col-sm-12" v-if="bookings.length == 0">
              <h6>No hay reservas nuevas.</h6>
            </div>
          </div>
        </div>

        <!-- Vista Notificaciones -->

        <div class="turnos" v-if="vista == 'notificaciones'">
          <div class="row">
            <div class="col-8 col-sm-8">
              <h6>
                Notifiaciones Nuevas:
                {{ count_news_questions + count_news_service_questions }}
              </h6>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12" v-if="questions.length > 0">
              <v-card
                elevation="2"
                outlined
                v-for="(question, index) in questions"
                :key="index"
                class="mb-1"
                data-bs-toggle="modal"
                data-bs-target="#ResponderModal"
                @click="SetPregunta(question)"
              >
                <v-card-text>
                  <div class="row d-flex align-items-center">
                    <div class="col-4 col-sm-4">
                      <div class="position-relative">
                        <font-awesome-icon
                          style="font-size: 30px !important"
                          icon="question-circle"
                        />
                        <span
                          class="
                            position-absolute
                            top-0
                            start-50
                            translate-middle
                            badge
                            rounded-pill
                            bg-success
                          "
                        >
                          NUEVA
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </div>
                    </div>
                    <div class="col-8 col-sm-8">
                      <span class="orden_nueva_title">
                        {{ question.created }}</span
                      >
                      <p class="orden_nueva">
                        <span>Producto:</span>
                        <span style="color: #000000">{{
                          question.product.title
                        }}</span>
                        <br />
                        <span>Pregunta: </span>
                        <span style="color: #000000">{{
                          question.pregunta
                        }}</span>
                        <br />
                      </p>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </div>
          <!-- preguntas service -->
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12" v-if="service_questions.length > 0">
              <v-card
                elevation="2"
                outlined
                v-for="(question, index) in service_questions"
                :key="index"
                class="mb-1"
                data-bs-toggle="modal"
                data-bs-target="#ResponderServiceQuestionModal"
                @click="SetServicePregunta(question)"
              >
                <v-card-text>
                  <div class="row d-flex align-items-center">
                    <div class="col-4 col-sm-4">
                      <div class="position-relative">
                        <font-awesome-icon
                          style="font-size: 30px !important"
                          icon="question-circle"
                        />
                        <span
                          class="
                            position-absolute
                            top-0
                            start-50
                            translate-middle
                            badge
                            rounded-pill
                            bg-success
                          "
                        >
                          NUEVA
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </div>
                    </div>
                    <div class="col-8 col-sm-8">
                      <span class="orden_nueva_title">
                        {{ question.created }}</span
                      >
                      <p class="orden_nueva">
                        <span>Servicio:</span>
                        <span style="color: #000000">{{
                          question.service.title
                        }}</span>
                        <br />
                        <span>Pregunta: </span>
                        <span style="color: #000000">{{
                          question.pregunta
                        }}</span>
                        <br />
                      </p>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </div>
          <div class="row" v-if="Questions_nofiticaion == 0">
            <h6>No hay notificaciones nuevas.</h6>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="VerTurnoModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ turno.service.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="GetNewsBookings()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <p>
                  <span>Dia: </span><span>{{ turno.date }}</span> <br />
                  <span>Hora: </span><span>{{ turno.time }}</span>
                  <v-divider></v-divider>
                </p>
                <!-- User -->
                <div v-if="turno.user_personal_data != null">
                  <p>
                    <span style="color: green; font-size: 12px"
                      >Usuario registrado en el sistema.</span
                    >
                    <br />
                    <span>Nombre: </span>
                    <span>{{ turno.user_personal_data.nombre }}</span> <br />
                    <span>Apellido: </span>
                    <span>{{ turno.user_personal_data.apellido }}</span> <br />
                    <span>Telefono: </span>
                    <span>{{ turno.user_personal_data.telefono }}</span> <br />
                  </p>
                </div>

                <!-- Anonimo -->
                <div v-if="turno.anonymous_personal_service_data != null">
                  <p>
                    <span style="color: orange; font-size: 12px"
                      >Usuario no registrado en el sistema.</span
                    >
                    <br />
                    <span>Nombre: </span>
                    <span>{{
                      turno.anonymous_personal_service_data.nombre
                    }}</span>
                    <br />
                    <span>Apellido: </span>
                    <span>{{
                      turno.anonymous_personal_service_data.apellido
                    }}</span>
                    <br />
                    <span>Telefono: </span>
                    <span>{{
                      turno.anonymous_personal_service_data.telefono
                    }}</span>
                    <br />
                    <span>Email: </span
                    ><span>{{
                      turno.anonymous_personal_service_data.email
                    }}</span>
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="GetNewsBookings()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="DeleteBooking()"
            >
              Cancelar Turno
            </button>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="GoToCalendar()"
            >
              Ver Calendario
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="ResponderModal"
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
              Responder pregunta de un producto
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
              <div class="row tarjeta d-flex align-items-center">
                <div class="col-4">
                  <img
                    :src="pregunta.product_image"
                    alt=""
                    style="width: 100px; heigth: 100px"
                  />
                </div>
                <div class="col-8">
                  <span> {{ pregunta.product_name }} </span><br />
                  <span style="color: gray">
                    {{ pregunta.product_description }}</span
                  >
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row tarjeta">
                <div class="col-12">
                  <h6>{{ pregunta.username }}</h6>
                </div>
                <div class="col-12">
                  <h6>Pregunta:</h6>
                  {{ pregunta.pregunta }}
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row tarjeta">
                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >Responder</label
                    >
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      v-model="respuesta_question"
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
              Close
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

    <!-- modal responder service pregunta -->

    <div
      class="modal fade"
      id="ResponderServiceQuestionModal"
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
              Responder pregunta de un servicio
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
              <div class="row tarjeta d-flex align-items-center">
                <div class="col-4">
                  <img
                    :src="service_pregunta.service_image"
                    alt=""
                    style="width: 100px; heigth: 100px"
                  />
                </div>
                <div class="col-8">
                  <span> {{ service_pregunta.service_name }} </span><br />
                  <span style="color: gray">
                    {{ service_pregunta.service_description }}</span
                  >
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row tarjeta">
                <div class="col-12">
                  <h6>{{ service_pregunta.username }}</h6>
                </div>
                <div class="col-12">
                  <h6>Pregunta:</h6>
                  {{ service_pregunta.pregunta }}
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row tarjeta">
                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >Responder</label
                    >
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      v-model="respuesta_service_question"
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
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="ResponderServiceQuestion()"
            >
              Responder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
import admin_loading from "../../components/admin/admin_loading.vue";
export default {
  name: "admin_home",
  components: {
    admin_menu,
    admin_loading,
  },

  data() {
    return {
      user: [],
      orders: [],
      drawer: null,
      load: false,
      count_ordes_news: 0,
      count_news_bookings: 0,
      count_news_questions: 0,
      connection: null,
      newOrderTiendaSocket: null,
      mensajeActualiar: false,
      vista: "ordenes",
      bookings: [],
      questions: [],
      turno: {
        id: 0,
        service: [],
        date: null,
        time: null,
        anonymous_personal_service_data: [],
        user_personal_data: [],
      },
      pregunta: {
        id: 0,
        product_name: "",
        product_description: "",
        product_image: "",
        username: "",
        pregunta: "",
        created: "",
      },
      service_pregunta: {
        id: 0,
        service_name: "",
        service_description: "",
        service_image: "",
        username: "",
        pregunta: "",
        created: "",
      },

      respuesta_question: null,
      respuesta_service_question: null,
      service_questions: [],
      count_news_service_questions: 0,
    };
  },

  async created() {
    this.Guard();
    this.SetServer(this.server);
    await this.SwicthMitiendaToTienda();
  },

  async mounted() {
    await this.GetDataUser();
  },

  computed: {
    ...mapState("tienda", ["tienda", "newOrderFlag"]),
    ...mapState("tienda", ["count_objects"]),

    Questions_nofiticaion() {
      return this.count_news_questions + this.count_news_service_questions;
    },
  },

  watch: {
    newOrderFlag: function (value) {
      console.log(value);
      if (value == true) {
        this.GetNewsOrders();
        this.ChangeFlagNewOrder("desactive");
        this.GetNewsBookings();
        this.GetNewsQuestions();
        this.GetNewsServiceQuestions();
      }
    },
  },

  methods: {
    ...mapMutations("tienda", [
      "SetServer",
      "ChangeFlagNewOrder",
      "SwicthMitiendaToTienda",
      "ChangeCantNewsNotifications",
      "DisminuirCantNewsNotifiacionts",
      "ClearCantNewsNotifiacionts",
    ]),
    ...mapActions("tienda", ["load_count_objects"]),

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

    ResponderQuestion() {
      let data = {
        visto: true,
        respuesta: this.respuesta_question,
      };
      axios
        .put(
          this.server + "/api/v1.0/admin/questions/update/" + this.pregunta.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetNewsQuestions();
          this.DisminuirCantNewsNotifiacionts();
          this.$swal.fire(
            "Respondido!",
            "Se ha respondido con exito la pregunta.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ResponderServiceQuestion() {
      let data = {
        visto: true,
        respuesta: this.respuesta_service_question,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/service/questions/update/" +
            this.service_pregunta.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetNewsServiceQuestions();
          this.DisminuirCantNewsNotifiacionts();
          this.$swal.fire(
            "Respondido!",
            "Se ha respondido con exito la pregunta.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetPregunta(pregunta) {
      this.pregunta = pregunta;
      console.log(this.pregunta);
      this.pregunta = {
        id: pregunta.id,
        product_name: pregunta.product.title,
        product_image: pregunta.product.image,
        product_description: pregunta.product.description,
        username: pregunta.user.username,
        pregunta: pregunta.pregunta,
      };
    },

    SetServicePregunta(pregunta) {
      this.service_pregunta = {
        id: pregunta.id,
        service_name: pregunta.service.title,
        service_image: pregunta.service.image,
        service_description: pregunta.service.description,
        username: pregunta.user.username,
        pregunta: pregunta.pregunta,
      };
      console.log(this.service_pregunta);
    },

    DeleteBooking() {
      this.showModal = false;
      this.$swal
        .fire({
          title: "Cancelar Turno",
          text: "Desea cancelar y eliminar este turno?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Cancelar turno!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log("Borro booking!");
            axios
              .delete(
                this.server + "/api/v1.0/admin/booking/delete/" + this.turno.id
              )
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.GetNewsBookings();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    GoToCalendar() {
      this.$router.push({
        name: "AdminCalendar",
      });
    },

    SetTurno(turno) {
      /* Clavo el visto si lo abre */
      let data = {
        visto: true,
      };
      axios
        .put(
          this.server + "/api/v1.0/admin/bookings/update/visto/" + turno.id,
          data
        )
        .then((response) => {
          this.DisminuirCantNewsNotifiacionts();
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.turno = {
        id: turno.id,
        service: turno.service,
        date: turno.date,
        time: turno.time,
        anonymous_personal_service_data: turno.anonymous_personal_service_data,
        user_personal_data: turno.user_personal_data,
      };
      console.log(this.turno);
    },

    ChangeVista(vista) {
      this.vista = vista;
    },

    GetDataUser() {
      axios
        .get(
          this.server +
            "/api/v1.0/user/" +
            parseInt(localStorage.getItem("cod_ref")),
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.user = response.data;

          /* if (this.user.id !== this.tienda.user) {
            this.$router.push({ name: "Main" });
          } */
        })
        .finally((final) => {
          this.GetNewsOrders();
          this.GetNewsBookings();
          this.GetNewsQuestions();
          this.GetNewsServiceQuestions();
          /* this.GetAllObjectsOffTienda(); */

          this.ChangeFlagNewOrder("desactive");
          this.load_count_objects();
          this.load = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ButtonRefresh() {
      this.GetNewsOrders();
      this.GetNewsBookings();
      this.GetNewsQuestions();
      this.GetNewsQuestions();
      this.GetNewsServiceQuestions();
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sincronizacion completada correctamente!",
        showConfirmButton: false,
        timer: 800,
      });
    },

    ButtonClear() {
      this.ClearOrdersNoVistas();
      this.ClearBokkingsNoVistas();
      this.ClearCantNewsNotifiacionts();
      this.ClearServiceQuestionsNoVistas();
      this.ClearProductQuestionsNoVistas();
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "Notificaciones Limpiadas!",
        showConfirmButton: false,
        timer: 800,
      });
    },

    CountNewsOrders() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/orders/news/count/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data);
          this.count_ordes_news = response.data.ordenes_nuevas;
          console.log(this.count_ordes_news);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsBookings() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/bookings/count/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data);
          this.count_news_bookings = response.data.reservas_nuevas;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetNewsOrders() {
      console.log("GetOrdesUser");
      axios
        .get(
          this.server + "/api/v1.0/admin/orders/news/?tienda=" + this.tienda.id,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.orders = response.data.results;
          this.CountNewsOrders();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetNewsBookings() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/bookings/news/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.bookings = response.data.results;
          this.CountNewsBookings();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetNewsQuestions() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/questions/news/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.questions = response.data.results;
          this.CountNewsQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetNewsServiceQuestions() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/service/questions/news/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log("GetNewsServiceQuestions");
          this.service_questions = response.data.results;
          console.log(this.service_questions);
          this.CountNewsServiceQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsServiceQuestions() {
      axios
        .get(
          this.server +
            "/api/v1.0/service/question/count/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          this.count_news_service_questions =
            response.data.preguntas_nuevas_service;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsQuestions() {
      axios
        .get(
          this.server +
            "/api/v1.0/product/question/count/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          this.count_news_questions = response.data.preguntas_nuevas;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearOrdersNoVistas() {
      let data = {
        tienda_id: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/orders/novistas/clear/", data)
        .then((response) => {
          console.log(response.data);
          this.GetNewsOrders();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearBokkingsNoVistas() {
      let data = {
        tienda_id: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/admin/booking/novistas/delete/", data)
        .then((response) => {
          console.log(response.data);
          this.GetNewsBookings();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearServiceQuestionsNoVistas() {
      let data = {
        tienda: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/admin/service/question/novistas/", data)
        .then((response) => {
          console.log(response.data);
          this.GetNewsServiceQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearProductQuestionsNoVistas() {
      let data = {
        tienda: this.tienda.id,
      };
      axios
        .post(this.server + "/api/v1.0/admin/product/question/novistas/", data)
        .then((response) => {
          console.log(response.data);
          this.GetNewsQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.no_msj {
  color: gray !important;
}
.new_msj {
  color: orangered !important;
}

.tarjeta {
  border: 1px solid #e3e3e3;
  border-radius: 3% !important;
}

a {
  color: black !important;
}
.username {
  font-size: 16px;
  color: gray;
}
.card-text {
  font-size: 14px !important;
}
.ordenes {
  margin-bottom: 2px !important;
}
.admin {
  color: green !important;
}
.list-group-item {
  font-size: 12px !important;
}
.actualizar {
  margin-left: 5px !important;
  font-size: 12px !important;
}

.orden_nueva {
  font-size: 12px !important;
}
.orden_nueva_title {
  color: black;
  margin-bottom: 2px !important;
}
.Nuevo {
  background-color: green !important;
  color: white !important;
}
.ordenes_nuevas {
  border-bottom: solid 1px !important;
  border-color: #c6c6c6 !important;
}
.bienvenido {
  border-bottom: solid 1px !important;
  border-color: #c6c6c6 !important;
}
</style>