<template>
  <div class="order-detail">
    <tienda_loading v-if="load == false" />
    <div class="user_order_detail" v-if="load == true">
      <tienda_user_menu />
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h6 style="color: green">
              Orden Creada exitosamente! muchas gracias.
            </h6>
          </div>
          <div class="col-12 col-sm-12">
            <div class="success text-white" v-if="approved == true">
              COMPRA APROBADA!
            </div>
          </div>
          <div class="col-12 col-sm-12">
            <div class="error text-white" v-if="rejected == true">
              COMPRA RECHAZADA O CANCELADA!
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 card">
          <h6>Detalle de la orden: {{ orderDetail.id }}</h6>
          <p class="detalle_orden">
            Total: $ {{ orderDetail.total }} <br />
            Cantidad de productos: {{ orderDetail.quantity_products }} <br />
            Metodo de pago : {{ orderDetail.metodo_pago }} <br />
            <font-awesome-icon icon="dollar-sign" /> Pago:
            <span
              style="color: darkgoldenrod"
              v-if="orderDetail.pago == 'pendiente'"
              >{{ orderDetail.pago }}</span
            >
            <span
              style="color: green"
              v-if="orderDetail.pago == 'completado'"
              >{{ orderDetail.pago }}</span
            >
            <br />
            <span v-if="orderDetail.metodo_pago == 'mercadopago'">
              MercadoPago estado:
              <span
                v-if="orderDetail.mercado_pago_approved == true"
                style="color: green"
                >Pago Aprobado</span
              >
              <span
                v-if="orderDetail.mercado_pago_approved == false"
                style="color: red"
              >
                Pago Rechazado o Cancelado
              </span>
            </span>
            <br />
            Estado de la orden:
            <span v-if="orderDetail.estado == 'Visto'" style="color: blue"
              >{{ orderDetail.estado }} &nbsp;
              <font-awesome-icon icon="check-double"
            /></span>
            <span v-if="orderDetail.estado == 'en espera'" style="color: darkgoldenrod"
              >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="clock"
            /></span>
            <span v-if="orderDetail.estado == 'cancelada'" style="color: red"
              >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="times"
            /></span>
            <span
              v-if="orderDetail.estado == 'Orden completada'"
              style="color: green"
              >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="check"
            /></span>
            <span
              v-if="orderDetail.estado == 'Producto despachado'"
              style="color: purple"
              >{{ orderDetail.estado }} &nbsp; <font-awesome-icon icon="truck"
            /></span>
            <br />
            Fecha: {{ orderDetail.created }}
          </p>
        </div>
      </div>
      <div class="container" v-if="orderDetail.metodo_pago == 'transferencia'">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-header">Datos para realizar la transferencia</div>
              <div class="card-body">
                <p>
                <span class="data_item">Banco/Entidad: </span>  <span>{{tienda.transfer_data[0].bank}}</span> <br>
                <span class="data_item">Alias: </span>  <span>{{tienda.transfer_data[0].alias}}</span> <br>
                <span class="data_item">CBU: </span>  <span>{{tienda.transfer_data[0].cbu}}</span> <br>
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="d-flex justify-content-end">
            <div class="mr-4">
              <p>
                <span style="font-size: 15px">
                  Consultar el estado de la orden por WhatsApp >></span
                >
              </p>
            </div>
            <v-btn
              elevation="4"
              icon
              style="background-color: white; margin-right: 4px !important"
              @click="WhatsAppContact()"
            >
              <v-icon color="green">mdi-whatsapp</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card">
              <div class="card-body">
                <h6>Datos del comprador</h6>

                <div class="row">
                  <div class="col-6 col-sm-6">
                    <p class="detalle_orden">
                      <span class="data_item">Nombre: </span
                      >{{ orderDetail.personal_user_data.nombre }} <br />
                      <span class="data_item">Apellido: </span
                      >{{ orderDetail.personal_user_data.apellido }} <br />
                      <span class="data_item">Pais: </span
                      >{{ orderDetail.personal_user_data.pais }} <br />

                      <span class="data_item">Provincia: </span
                      >{{ orderDetail.personal_user_data.estado }} <br />

                      <span class="data_item">Ciudad: </span
                      >{{ orderDetail.personal_user_data.ciudad }} <br />
                    </p>
                  </div>
                  <div class="col-6 col-sm-6">
                    <p class="detalle_orden">
                      <span class="data_item">Direccion: </span
                      >{{ orderDetail.personal_user_data.direccion }} <br />

                      <span class="data_item">cod postal: </span
                      >{{ orderDetail.personal_user_data.codigo_postal }} <br />

                      <span class="data_item">Telefono: </span
                      >{{ orderDetail.personal_user_data.telefono }} <br />

                      <span class="data_item">Email: </span
                      >{{ orderDetail.personal_user_data.user.email }} <br />

                      <span class="data_item">Username: </span
                      >{{ orderDetail.personal_user_data.user.username }} <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mb-12">
        <div class="container d-flex justify-content-center mb-12">
          <div class="row">
            <div
              class="card ordenes"
              v-for="(product, index) in orderDetail.productos"
              :key="index"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <img
                      style="width: 6rem; height: 6rem"
                      :src="server + product.product.image"
                      alt=""
                    />
                  </div>
                  <div class="col-8">
                    <h5 class="card-title">
                      {{ product.product.title }}
                      <p class="card-text">
                        Cantidad {{ product.quantity }} <br />
                        Precio: $ {{ product.price_sale }} <br />
                        subtotal: $ {{ product.quantity * product.price_sale }}
                        <br />
                      </p>
                      <p>
                        <admin_order_product_variation :product="product" />
                      </p>
                    </h5>
                  </div>
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
import { mapState } from "vuex";
import tienda_user_menu from "../../../components/tienda/user/tienda_user_menu.vue";
import admin_order_product_variation from "../../../components/admin/admin_order_product_variation.vue";
import tienda_loading from "../../../components/tienda/tienda_loading.vue";
export default {
  name: "tienda_user_order_detail",
  props: ["order"],
  components: {
    tienda_user_menu,
    admin_order_product_variation,
    tienda_loading,
  },
  data() {
    return {
      orderDetail: [],
      load: false,
      rejected: "",
      approved: "",
    };
  },

  created() {
    this.GetOrder();
    this.GetUrlParams();
  },

  mounted() {},
  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  methods: {
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
            "&text=Buenos dias, eh realizado una orden en su tienda, me gustaria saber si la ha visto y en que estado se encuntra%0Ael id de la orden es :" +
            this.orderDetail.id +
            "%0A[link https://mitienda.app/" +
            this.tienda.name +
            "/admin/orders/" +
            this.orderDetail.id +
            " ]",
          "_blank"
        );
      }
    },
    GetUrlParams() {
      let urlParams = new URLSearchParams(window.location.search);
      let status = urlParams.get("status");
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

          let mp_status = {
            mercado_pago_approved: true,
          };

          let order_pago_status = {
            pago: "completado",
          };
          /* Crear MP order detail */
          axios
            .post(
              this.server + "/api/v1.0/admin/orders/mercadopago/detail/create",
              data
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          /* Update Order mp_status_approved */
          axios
            .put(
              this.server +
                "/api/v1.0/admin/orders/mercadopago/status/" +
                this.order,
              mp_status
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .put(
              this.server + "/api/v1.0/admin/orders/pay/change/" + this.order,
              order_pago_status
            )
            .then((response) => {
              console.log(response.data);
            })
            .finally(this.GetOrder())
            .catch((error) => {
              console.log(error);
            });

          console.log(data);
        }
        if (status == "null") {
          this.rejected = true;
        }
        console.log("parametro");
        console.log(status);
      }
    },
    GetOrder() {
      axios
        .get(this.server + "/api/v1.0/orders/detail/" + this.order, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orderDetail = response.data;
          this.load = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.card-text {
  font-size: 14px !important;
}
.ordenes {
  margin-bottom: 2px !important;
}
.detalle_orden {
  font-size: 14px !important;
}
.data_item {
  color: black !important;
}

.order_new {
  background-color: greenyellow !important;
}
</style>