<template>
  <div class="user_all_bookings">
    <tienda_user_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="calendar-plus" />
            <span class="ml-2"> Mis Reservas en {{tienda.title}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <v-card
            elevation="2"
            outlined
            class="mb-1 ml-1"
            height="160"
            v-for="(booking, index) in bookings"
            :key="index"
          >
            <div class="container d-flex align-items-center">
              <div class="row">
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <span class="orden_nueva_title">
                      {{ booking.service.tienda.title }}</span
                    >
                    <p class="orden_nueva">
                      <span>Servicio: </span>
                      <span>{{ booking.service.title }}</span
                      ><br />
                      <span>Descripcion: </span
                      ><span>{{ booking.service.description }}</span>
                      <v-divider></v-divider>
                      <span class="booking_important">Dia: </span
                      ><span class="booking_important_data">{{
                        booking.date
                      }}</span
                      ><br />
                      <span class="booking_important">Hora: </span>
                      <span class="booking_important_data">
                        {{ booking.time }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tienda_user_menu from "../../../components/tienda/user/tienda_user_menu.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "tienda_user_all_bookins",
  components: {
    tienda_user_menu,
  },
  data() {
    return {
      bookings: [],
    };
  },

  created() {
    this.GetAllBookings();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  methods: {
    GetAllBookings() {
      axios
        .get(this.server + "/api/v1.0/user/bookings/", {
          /* {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          } HACER PERMISOS EN DJANGO! */
          params: {
            user: localStorage.getItem("cod_ref"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.bookings = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.orden_nueva_title {
  color: black;
  padding: 0;
  margin: 0;
}
.orden_nueva {
  font-size: 12px !important;
}
.booking_important {
  color: black;
  font-size: 14px;
}
.booking_important_data {
  color: green;
  font-size: 14px;
}
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>