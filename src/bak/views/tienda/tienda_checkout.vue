<template>
  <div class="tienda_checkout mt-12 mb-12">
    <div class="container">
      <div class="row">
        <h6><font-awesome-icon icon="shopping-bag" /> Finalizar Compra</h6>
      </div>
      <div class="container">
        <div class="row d-flex align-items-center">
          <tienda_cart_summary></tienda_cart_summary>
          <div class="col-5 col-sm-5">
            <v-btn
              color="green"
              elevation="2"
              large
              outlined
              @click="Ordenar()"
              :disabled="puedeOrdenar == false"
            >
              <font-awesome-icon icon="shopping-bag" />&nbsp; Finalizar!
            </v-btn>
            <br />
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
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="accordion" id="accordionExample">
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
                class="accordion-collapse collapse"
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
                      :value="envio.name"
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
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h6>Metodos de pago</h6>
            <v-divider></v-divider>
            <div class="col-12 col-sm-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="ordenar"
                  v-model="metodoPago"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Solo Ordenar <br />
                  <span class="order_info"
                    >(la orden se almacenara en la base de datos, y se
                    comunicara el vendedor por whatsapp o email)</span
                  >
                </label>
              </div>
              <div class="form-check">
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
                  MercadoPago <br />
                  <span class="order_info"
                    >Pagar con credito/debito a travez de mercadopago.</span
                  >
                </label>
              </div>
            </div>
          </div>
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

      <div class="container" v-if="personalData">
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
      procesando: false,
      envios: [],
      envio_select: "",
    };
  },

  created() {
    this.MercadoPagoCredentialsExists();
  },
  mounted() {
    this.GetEnvios();
  },

  watch: {
    metodoPago: function (value) {
      if (value == "ordenar") {
        this.puedeOrdenar = true;
      }
      if (value == "mercadopago") {
        this.puedeOrdenar = true;
      }
    },
  },

  methods: {
    ...mapMutations("cart", ["ClearCart", "AddEnvio"]),

    SumarEnvio(envio) {
      this.AddEnvio(envio.price);
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
      if (this.personalData) {
        this.OrdenarUser();
      }
      if (this.anonymous_data) {
        this.OrdernarAnonymous();
      }
    },

    OrdernarAnonymous() {
      if (this.envio_select == "") {
        this.$swal.fire("Debe seleccionar una forma envio!", "", "info");
      } else {
        let order = {
          total: this.total_total,
          metodo_pago: this.metodoPago,
          quantity_products: this.count,
          anonymous_user_data : this.anonymous_data.id,
          productos: this.cart,
          tienda: this.tienda.id,
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
                  if (this.metodoPago == "ordenar") {
                    this.$swal.fire(
                      "Compra Confirmada!",
                      "Muchas gracias!",
                      "success"
                    );
                    this.ClearCart();
                    this.$router.push({
                      name: "UserOrderDetailAnonymous",
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
      }
    },
    OrdenarUser() {
      if (this.envio_select == "") {
        this.$swal.fire("Debe seleccionar una forma envio!", "", "info");
      } else {
        let order = {
          total: this.total_total,
          metodo_pago: this.metodoPago,
          quantity_products: this.count,
          personal_user_data: this.personalData.id,
          productos: this.cart,
          tienda: this.tienda.id,
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
                  if (this.metodoPago == "ordenar") {
                    this.$swal.fire(
                      "Compra Confirmada!",
                      "Muchas gracias!",
                      "success"
                    );
                    this.ClearCart();
                    this.$router.push({
                      name: "UserOrderDetail",
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
      }
    },
  },
  computed: {
    ...mapState("cart", ["cart", "count", "total", "total_total"]),
    ...mapState("tienda", ["tienda"]),
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
</style>