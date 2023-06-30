<template>
  <div class="calendar mb-8">
    <admin_menu></admin_menu>
    <div class="container">
      <div class="row">
        <h6>Calendario de turnos <font-awesome-icon icon="calendar-alt" /></h6>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-end">
        <div class="col-2 col-sm-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="ChangeViewCalendar('day')"
          >
            DIA
          </button>
        </div>
        <div class="col-3 col-sm-3">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="ChangeViewCalendar('week')"
          >
            SEMANA
          </button>
        </div>
        <div class="col-2 col-sm-2 mr-4">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="ChangeViewCalendar('month')"
          >
            MES
          </button>
        </div>

        <div class="col-2 col-sm-2">
          <v-btn elevation="2" icon @click="CalendarPrev()">
            <font-awesome-icon icon="chevron-left" />
          </v-btn>
        </div>
        <div class="col-2 col-sm-2">
          <v-btn elevation="2" icon @click="CalendarNext()">
            <font-awesome-icon icon="chevron-right" />
          </v-btn>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-3 col-sm-3">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="CalendarToday()"
          >
            HOY <font-awesome-icon icon="chevron-down" />
          </button>
        </div>
        <div class="col-5 col-sm-5">
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12"></div>
      </div>
      <v-row>
        <v-col>
          <v-sheet height="400">
            <v-calendar
              ref="calendar"
              v-model="focus"
              :now="today"
              :value="today"
              :events="events"
              color="primary"
              :type="view"
              locale="es-ar"
              @click:event="showEvent"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <!-- MODAL -->
    <div name="modal" v-if="showModal == true">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <div class="row">
                <h6>Ver Turno</h6>
                <v-divider></v-divider>
                <p>
                  <span>Servicio: </span>
                  <span :style="enventoTitleColor">{{ evento.title }}</span>
                  <br />

                  <span style="font-size: 16px">Descripcion: </span>
                  <span :style="enventoTitleColor">{{
                    evento.description
                  }}</span>
                  <br />
                  <v-divider></v-divider>
                  <span>Dia: </span> <span>{{ evento.date }}</span> <br />
                  <span>Inicio: </span> <span>{{ evento.start_time }}</span>
                  <span> Fin: </span> <span>{{ evento.end_time }}</span> <br />
                  <v-divider></v-divider>
                </p>
                <!-- usuario -->
                <p v-if="evento.user_personal_data != null">
                  <span style="color: green; font-size: 12px"
                    >Usuario registrado en el sistema.</span
                  >
                  <br />
                  <span>Nombre: </span>
                  <span>{{ evento.user_personal_data.nombre }}</span> <br />
                  <span>Apellido: </span>
                  <span>{{ evento.user_personal_data.apellido }}</span> <br />
                  <span>Telefono: </span>
                  <span>{{ evento.user_personal_data.telefono }}</span>
                </p>
                <!-- Anonimo -->
                <p v-if="evento.anonymous_personal_service_data != null">
                  <span style="color: orange; font-size: 12px"
                    >Usuario no registrado en el sistema.</span
                  >
                  <br />
                  <span>Nombre: </span>
                  <span>{{
                    evento.anonymous_personal_service_data.nombre
                  }}</span>
                  <br />
                  <span>Apellido: </span>
                  <span>{{
                    evento.anonymous_personal_service_data.apellido
                  }}</span>
                  <br />
                  <span>Telefono: </span>
                  <span>{{
                    evento.anonymous_personal_service_data.telefono
                  }}</span>
                  <br />
                  <span>Email: </span
                  ><span>{{
                    evento.anonymous_personal_service_data.email
                  }}</span>
                </p>
              </div>
            </div>

            <div class="modal-footer">
              <div name="footer">
                <button class="btn btn-danger mr-2" @click="DeleteBooking()">
                  Cancelar y eliminar
                </button>
                <button class="btn btn-primary" @click="CloseModal()">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import admin_menu from "../../components/admin/admin_menu.vue";

export default {
  components: {
    admin_menu,
  },
  name: "admin_calendar",
  data() {
    return {
      focus: "",
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      events: [],
      allServices: [],
      view: "week",
      showModal: false,
      evento: {
        id: 0,
        title: null,
        color: null,
        date: null,
        start_time: null,
        end_time: null,
        anonymous_personal_service_data: [],
        user_personal_data: [],
        enventoTitleColor: {
          color: null,
        },
      },
    };
  },
  computed: {
    ...mapState("tienda", ["tienda", "plan"]),
  },

  created() {
    this.Guard();
    this.GetAllServicesAndApoiments();
  },

  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
    this.$refs.calendar.checkChange();
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

    CloseModal() {
      this.showModal = false;
      this.evento = {
        title: null,
        color: null,
        date: null,
        start_time: null,
        end_time: null,
        anonymous_personal_service_data: [],
        user_personal_data: [],
        description: null,
      };
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
                this.server + "/api/v1.0/admin/booking/delete/" + this.evento.id
              )
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.events = [];
                this.GetAllServicesAndApoiments();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    showEvent(event) {
      console.log("showEvent");
      console.log(event.event);
      console.log("id");
      console.log();

      axios
        .get(this.server + "/api/v1.0/admin/booking/" + event.event.id)
        .then((response) => {
          (this.evento = {
            id: event.event.id,
            title: response.data.service.title,
            description: response.data.service.description,
            color: response.data.service.color,
            start_time: event.event.start.substr(11, 15),
            end_time: event.event.end.substr(11, 15),
            date: response.data.date,
            anonymous_personal_service_data:
              response.data.anonymous_personal_service_data,
            user_personal_data: response.data.user_personal_data,
          }),
            (this.enventoTitleColor = {
              color: response.data.service.color,
            });
          console.log("evento");
          console.log(this.evento);
          this.showModal = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ChangeViewCalendar(view) {
      this.view = view;
      this.$refs.calendar.scrollToTime("08:00");
    },

    CalendarPrev() {
      this.$refs.calendar.prev();
      this.$refs.calendar.scrollToTime("08:00");
    },
    CalendarNext() {
      this.$refs.calendar.next();
      this.$refs.calendar.scrollToTime("08:00");
    },

    CalendarToday() {
      this.focus = "";
      this.$refs.calendar.scrollToTime("08:00");
    },

    GetAllServicesAndApoiments() {
      axios
        .get(
          this.server + "/api/v1.0/admin/calendar/all/?tienda=" + this.tienda.id
        )
        .then((response) => {
          var dates = [];
          var color = null;
          var name_service = null;
          var interval = 0;
          let obj_dates = {
            name: "servicio1",
            start: null,
            end: null,
            color: "#FF88AA",
          };
          this.allServices = response.data.results;
          console.log(this.allServices);
          this.allServices.forEach((el) => {
            color = el.color;
            name_service = el.title;
            interval = el.interval;
            el.booking_service.forEach((element) => {
              var date = element.date;
              var time = element.time;
              var id_booking = element.id;
              var fulltime = date.concat(" ", time);

              /* Agrego duracion */
              /* Funcion para agregar la duracion segun el intervalo del servicio */
              var totalInMinutes =
                parseInt(time.split(":")[0]) * 60 +
                parseInt(time.split(":")[1]);

              var otherMinutes = interval;

              var grandTotal = otherMinutes + totalInMinutes;

              var bookH = Math.floor(grandTotal / 60);
              var bookM = grandTotal % 60;
              var bookingDurationToHour = bookH + ":" + bookM;

              /* Agrego duracion */

              var endtime = date.concat(" ", bookingDurationToHour);
              console.log(fulltime);

              obj_dates = {
                id: id_booking,
                name: name_service,
                start: fulltime,
                end: endtime,
                color: color,
              };
              dates.push(obj_dates);
              this.events.push(obj_dates);
            });

            console.log(this.events);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>