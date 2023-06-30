<template>
  <div class="tienda_user_booking_detail mt-8">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12">
              <div
                class="alert alert-success"
                role="alert"
                v-if="approved == true"
              >
                <font-awesome-icon icon="fas fa-check-circle" /> TURNO
                CONFIRMADO!
              </div>
            </div>
            <div class="col-12 col-sm-12">
              <div
                class="alert alert-danger"
                role="alert"
                v-if="rejected == true"
              >
                <font-awesome-icon icon="fas fa-times-circle" /> COMPRA
                RECHAZADA O CANCELADA! <br />
                <div style="font-size: 12px">
                  RESERVA DE TURNO CANCELADA, INTENTE NUEVAMENTE.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="booking_detail != null">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div
            class="card text-dark bg-light mb-3"
            style="width: 80% !important"
          >
            <div class="card-header">Detalles del turno</div>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-6">#ID de turno:</div>
                  <div class="col-6">{{ booking_id }}</div>
                </div>
                <div class="row">
                  <div class="col-6">Servicio:</div>
                  <div class="col-6">{{ booking_detail.service.title }}</div>
                </div>
                <div class="row">
                  <div class="col-6">Fecha:</div>
                  <div class="col-6">{{ booking_detail.date }}</div>
                </div>
                <div class="row">
                  <div class="col-6">Hora:</div>
                  <div class="col-6">{{ booking_detail.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tienda_user_booking_detail",
  data() {
    return {
      rejected: false,
      approved: false,
      booking_id: 0,
      booking_detail: null,
    };
  },
  created() {
    this.GetUrlParams();
  },
  methods: {
    GetUrlParams() {
      let urlParams = new URLSearchParams(window.location.search);
      let status = urlParams.get("status");
      this.booking_id = urlParams.get("external_reference");
      console.log("external_reference!!");
      console.log(this.booking_id);
      if (status) {
        if (status == "approved") {
          this.approved = true;
          let data = {
            order: this.order,
            collection_id: urlParams.get("collection_id"),
            collection_status: urlParams.get("collection_status"),
            payment_id: urlParams.get("payment_id"),
            external_reference: urlParams.get("external_reference"),
            payment_type: urlParams.get("payment_type"),
            merchant_order_id: urlParams.get("merchant_order_id"),
          };
          console.log("GetUrlParams");
          console.log(data);
          if (data.collection_id != null) {
            if (this.booking_id > 0) {
              this.GetBooking();
            }
          }
        }
        if (status == "null") {
          this.rejected = true;
          this.DeleteBooking();
        }
      }
    },

    DeleteBooking() {
      console.log("DeleteBooking");
      axios
        .delete(
          this.server + "/api/v1.0/admin/booking/delete/" + this.booking_id
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdateBookingCompleted() {
      console.log("UpdateBookingCompleted!!");
      let data = {
        completed: true,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/user/booking/update/completed/" +
            this.booking_id,
          data
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetBooking() {
      console.log("GETBOOKING");
      axios
        .get(this.server + "/api/v1.0/user/booking/" + this.booking_id, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.booking_detail = response.data;
          console.log("THIS.BOOKING_DETAIL");
          console.log(this.booking_detail);
          this.load = true;
        })
        .then(() => {
          this.UpdateBookingCompleted();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>