<template>
  <div class="tienda_checkout mt-8" :style="Home">
    <div class="container mb-12">
      <div class="row">
        <tienda_cart_summary></tienda_cart_summary>

        <div
          class="
            col-6 col-lg-6
            d-none d-md-block d-lg-block d-xl-block d-sm-block
          "
        >
          <v-alert
            border="right"
            colored-border
            :color="navbar_color"
            elevation="2"
            min-height="227"
          >
            <div class="d-flex justify-content-center mt-12">
              <v-btn
                elevation="2"
                x-large
                :style="text_button"
                @click="Ordenar()"
                :disabled="puedeOrdenar == false"
              >
                <font-awesome-icon icon="shopping-bag" />&nbsp; Finalizar
                Compra!
              </v-btn>
              <span class="mt-2 d-flex justify-content-center">
                <div
                  class="spinner-border spinner-border-sm text-success"
                  role="status"
                  v-if="procesando == true"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                &nbsp;
                <span
                  style="font-size: 12px; color: green"
                  v-if="procesando == true"
                >
                  Procesando...</span
                >
              </span>
            </div>
          </v-alert>
        </div>
      </div>

      <!-- COLLAPSES ENVIO/METODO DE PAGO -->
      <div class="container">
        <div class="row">
          <!-- COLLPASE SI REQUIEREN ENVIO -->
          <div
            class="accordion"
            id="accordionExample"
            v-if="requiere_envio == true"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEnvios"
                  aria-expanded="false"
                  aria-controls="collapseEnvios"
                >
                  <font-awesome-icon icon="truck" /> &nbsp; Envios
                </button>
              </h2>
              <div
                id="collapseEnvios"
                :class="collapse == true ? collapse_on : collapse_off"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div
                    class="form-check"
                    v-for="(envio, index) in envios"
                    :key="index"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'envio_' + index"
                      :id="'envio_' + index"
                      :value="envio.id"
                      v-model="envio_select"
                      @click="SumarEnvio(envio)"
                    />
                    <label class="form-check-label" :for="'envio_' + index">
                      {{ envio.name }} <br />
                      <p class="">
                        <span class="envio_description">{{
                          envio.description
                        }}</span>
                        <br />
                        <span class="envio_price">$ {{ envio.price }}</span>
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMetodoPago"
                  aria-expanded="false"
                  aria-controls="collapseMetodoPago"
                >
                  <font-awesome-icon icon="truck" /> &nbsp; Metodos de pago
                </button>
              </h2>
              <div
                id="collapseMetodoPago"
                :class="collapse == true ? collapse_off : collapse_on"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="col-12 col-sm-12">
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].only_order == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault0"
                        value="ordenar"
                        v-model="metodoPago"
                      />
                      <label class="form-check-label" for="flexRadioDefault0">
                        Ordenar <br />
                        <span class="order_info"
                          >(Se creara la orden, y se pagara en efectivo en el
                          momento de la entrega.)</span
                        >
                      </label>
                    </div>
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].transfer == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="transferencia"
                        v-model="metodoPago"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Transferencia <br />
                        <span class="order_info"
                          >(la orden se almacenara en la base de datos, y se
                          realizara el cobro por transferencia bancaria)</span
                        >
                      </label>
                    </div>
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].mercadopago == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="mercadopago"
                        v-model="metodoPago"
                        :disabled="mercadopago == false"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Ordenar y pagar con MercadoPago <br />
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
          </div>
          <!-- COLLPASE SI REQUIEREN ENVIO -->

          <!-- COLLAPSE SI [NO] REQUIERE ENVIO -->
          <div
            class="accordion"
            id="accordionPaymentesNoEnvio"
            v-if="requiere_envio == false"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMetodoPagoNoEnvio"
                  aria-expanded="false"
                  aria-controls="collapseMetodoPagoNoEnvio"
                >
                  <font-awesome-icon icon="truck" /> &nbsp; Metodos de pago
                </button>
              </h2>
              <div
                id="collapseMetodoPagoNoEnvio"
                :class="collapse == true ? collapse_on : collapse_off"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionPaymentesNoEnvio"
              >
                <div class="accordion-body">
                  <div class="col-12 col-sm-12">
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].only_order == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault0"
                        value="ordenar"
                        v-model="metodoPago"
                      />
                      <label class="form-check-label" for="flexRadioDefault0">
                        Ordenar <br />
                        <span class="order_info"
                          >(Se creara la orden, y se pagara en efectivo en el
                          momento de la entrega.)</span
                        >
                      </label>
                    </div>
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].transfer == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="transferencia"
                        v-model="metodoPago"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Transferencia <br />
                        <span class="order_info"
                          >(la orden se almacenara en la base de datos, y se
                          realizara el cobro por transferencia bancaria)</span
                        >
                      </label>
                    </div>
                    <div
                      class="form-check"
                      v-if="tienda.payment_methods[0].mercadopago == true"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="mercadopago"
                        v-model="metodoPago"
                        :disabled="mercadopago == false"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Ordenar y pagar con MercadoPago <br />
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
          </div>
          <!-- COLLAPSE SI [NO] REQUIERE ENVIO -->
        </div>
      </div>

      <div class="container" v-if="anonymous_data">
        <div class="row">
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
                  <font-awesome-icon icon="user-edit" /> Datos de facturacion y
                  compra Anonimo
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    <span class="info_data">Nombre:</span>
                    {{ anonymous_data.nombre }}
                    <span class="info_data">Apellido:</span>
                    {{ anonymous_data.apellido }}<br />
                    <br />
                    <span class="info_data">E-mail:</span>
                    {{ anonymous_data.email }}<br />
                    <br />
                    <span class="info_data">Pais:</span>
                    {{ anonymous_data.pais }}
                    <span class="info_data">Estado/Provincia:</span>
                    {{ anonymous_data.estado }} <br />
                    <br />
                    <span class="info_data">Ciudad:</span>
                    {{ anonymous_data.ciudad }} <br />
                    <br />
                    <span class="info_data">Direccion:</span>
                    {{ anonymous_data.direccion }} <br />
                    <br />
                    <span class="info_data">Codigo Postal:</span>
                    {{ anonymous_data.codigo_postal }} <br />
                    <br />
                    <span class="info_data">Telefono:</span>
                    {{ anonymous_data.telefono }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mb-12" v-if="personalData">
        <div class="row">
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
                  <font-awesome-icon icon="user-edit" /> Datos de facturacion y
                  compra
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    <span class="info_data">Nombre:</span>
                    {{ personalData.nombre }}
                    <span class="info_data">Apellido:</span>
                    {{ personalData.apellido }}<br />
                    <br />
                    <span class="info_data">Pais:</span>
                    {{ personalData.pais }}
                    <span class="info_data">Estado/Provincia:</span>
                    {{ personalData.estado }} <br />
                    <br />
                    <span class="info_data">Ciudad:</span>
                    {{ personalData.ciudad }} <br />
                    <br />
                    <span class="info_data">Direccion:</span>
                    {{ personalData.direccion }} <br />
                    <br />
                    <span class="info_data">Codigo Postal:</span>
                    {{ personalData.codigo_postal }} <br />
                    <br />
                    <span class="info_data">Telefono:</span>
                    {{ personalData.telefono }}
                  </p>
                </div>
              </div>
            </div>
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
        <v-btn
          elevation="2"
          x-large
          :style="text_button"
          @click="Ordenar()"
          :disabled="puedeOrdenar == false"
        >
          <font-awesome-icon icon="shopping-bag" />&nbsp; Finalizar!
        </v-btn>
        <span class="mt-2 d-flex justify-content-center">
          <div
            class="spinner-border spinner-border-sm text-success"
            role="status"
            v-if="procesando == true"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          &nbsp;
          <span style="font-size: 12px; color: green" v-if="procesando == true">
            &nbsp; Procesando...</span
          >
        </span>
      </div>
    </v-alert>
  </div>
</template>

<script>
import tienda_cart_summary from "../../components/tienda/tienda_cart_summary.vue";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "tienda_checkout",
  components: {
    tienda_cart_summary,
  },
  props: ["personalData", "anonymous_data"],
  data() {
    return {
      valueSelectMetodoPago: "",
      metodoPago: "",
      puedeOrdenar: false,
      mp_initPoint: "",
      orden_id: 0,
      mercadopago: false,
      transfer: null,
      procesando: false,
      envios: [],
      envio_select: 0,
      collapse_on: "accordion-collapse collapse show",
      collapse_off: "accordion-collapse collapse",
      collapse: true,
      /* requiere envio => si no hay producto fisicon, no necesito enviar nada */
      requiere_envio: false,
    };
  },

  created() {
    this.MercadoPagoCredentialsExists();
  },
  mounted() {
    this.GetEnvios();
    this.RequiereEnvio();
  },

  computed: {
    ...mapState("cart", ["cart", "count", "total", "total_total"]),
    ...mapState("tienda", ["tienda"]),
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
            ")  !important; background-repeat: repeat !important; min-height: 900px !important;"
          );
        }
      }
    },

    navbar_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].navbar;
      }
    },
    text_button() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return (
          "color: " +
          this.tienda.tienda_colors[0].navbar +
          "!important; font-weight: bold;"
        );
      }
    },
  },

  watch: {
    metodoPago: function (value) {
      if (value == "ordenar") {
        this.puedeOrdenar = true;
      }
      if (value == "mercadopago") {
        this.puedeOrdenar = true;
      }
      if (value == "transferencia") {
        this.puedeOrdenar = true;
      }
    },
  },

  methods: {
    ...mapMutations("cart", ["ClearCart", "AddEnvio"]),

    RequiereEnvio() {
      this.cart.map((el) => {
        if (el.type == "pdf") {
          this.requiere_envio = true;
        }
      });

      console.log("CART_STATE");
      console.log(this.cart);
      console.log("RequiereEnvio");
      console.log(this.requiere_envio);
    },

    SumarEnvio(envio) {
      this.AddEnvio(envio.price);
      this.collapse = false;
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
            this.mercadopago = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Ordenar() {
      let envio = null;
      if (this.personalData) {
        console.log("OrdenarUser");
        if (this.requiere_envio == true) {
          if (this.envio_select == 0) {
            this.$swal.fire("Debe seleccionar una forma envio!", "", "info");
          } else {
            envio = this.envio_select;
            this.OrdenarUser(envio);
          }
        } else {
          envio = null;
          this.OrdenarUser(envio);
        }
      }
      if (this.anonymous_data) {
        console.log("OrdernarAnonymous");
        if (this.requiere_envio == true) {
          if (this.envio_select == 0) {
            this.$swal.fire("Debe seleccionar una forma envio!", "", "info");
          } else {
            envio = this.envio_select;
            this.OrdernarAnonymous(envio);
          }
        } else {
          envio = null;
          this.OrdernarAnonymous(envio);
        }
      }
    },

    OrdernarAnonymous(envio) {
      let order = {
        total: this.total_total,
        metodo_pago: this.metodoPago,
        quantity_products: this.count,
        anonymous_user_data: this.anonymous_data.id,
        productos: this.cart,
        tienda: this.tienda.id,
        envio: envio,
      };

      this.$swal
        .fire({
          title: "¿Confirmar la compra?",
          text: "Esta a punto de terminar su compra",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#198754",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si! confirmar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.puedeOrdenar = false;
            this.procesando = true;
            console.log(order);
            axios
              .post(this.server + "/api/v1.0/orders/anonymous/create", order, {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log("la orden");
                console.log(response.data);
                this.orden_id = response.data.orden_id;
                if (
                  this.metodoPago == "ordenar" ||
                  this.metodoPago == "transferencia"
                ) {
                  this.$swal.fire(
                    "Compra Confirmada!",
                    "Muchas gracias!",
                    "success"
                  );
                  this.ClearCart();
                  this.$router.push({
                    name: "tienda_user_order_detail_anonymous",
                    params: { order: this.orden_id },
                  });
                }
                if (this.metodoPago == "mercadopago") {
                  let data = {
                    tienda: this.tienda.name,
                    total: this.total,
                    orden: this.orden_id,
                    tienda_id: this.tienda.id,
                  };

                  axios
                    .post(this.server + "/api/v1.0/anon/mercadopago", data)
                    .then((response) => {
                      console.log("mercadopago");
                      console.log(response.data);
                      this.mp_initPoint = response.data.init_point;
                      console.log("init_point");
                      console.log(this.mp_initPoint);
                      this.ClearCart();
                      if (this.mp_initPoint) {
                        window.location.href = this.mp_initPoint;
                      } else {
                        this.$swal.fire(
                          "Algo salio mal!",
                          "Posiblemente el dueño de la tienda, no ingreso las credenciales de MercadoPago correctamente.",
                          "error"
                        );
                        this.procesando = false;
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })

              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    OrdenarUser(envio) {
      console.log("ENVIO");
      console.log(envio);
      let order = {
        total: this.total_total,
        metodo_pago: this.metodoPago,
        quantity_products: this.count,
        personal_user_data: this.personalData.id,
        productos: this.cart,
        tienda: this.tienda.id,
        envio: envio,
      };

      this.$swal
        .fire({
          title: "¿Confirmar la compra?",
          text: "Esta a punto de terminar su compra",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#198754",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si! confirmar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.puedeOrdenar = false;
            this.procesando = true;
            console.log(order);
            axios
              .post(this.server + "/api/v1.0/orders/create", order, {
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
              .then((response) => {
                console.log("la orden");
                console.log(response.data);
                this.orden_id = response.data.orden_id;
                if (
                  this.metodoPago == "ordenar" ||
                  this.metodoPago == "transferencia"
                ) {
                  this.$swal.fire(
                    "Compra Confirmada!",
                    "Muchas gracias!",
                    "success"
                  );
                  this.ClearCart();
                  this.$router.push({
                    name: "tienda_user_order_detail",
                    params: { order: this.orden_id },
                  });
                }
                if (this.metodoPago == "mercadopago") {
                  let data = {
                    tienda: this.tienda.name,
                    total: this.total,
                    orden: this.orden_id,
                    tienda_id: this.tienda.id,
                  };

                  axios
                    .post(this.server + "/api/v1.0/mercadopago", data)
                    .then((response) => {
                      console.log("mercadopago");
                      console.log(response.data);
                      this.mp_initPoint = response.data.init_point;
                      console.log("init_point");
                      console.log(this.mp_initPoint);
                      this.ClearCart();
                      if (this.mp_initPoint) {
                        window.location.href = this.mp_initPoint;
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
              })

              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.card {
  padding: 0px !important;
  margin: 0px !important;
}
.card .card-subtitle {
  font-size: 14px !important;
}
.sub_primera_compra {
  font-size: 12px !important;
}
.info_data {
  color: black !important;
}
.order_info {
  font-size: 12px;
}
.envio_description {
  font-size: 14px !important;
}
.envio_price {
  font-size: 12px !important;
  color: black !important;
}
.botoon {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 50px !important;
}
</style>