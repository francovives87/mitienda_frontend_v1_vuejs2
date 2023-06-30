<template>
  <div class="admin_product_statistics mt-12">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <font-awesome-icon icon="fa-chart-line" /> ESTADISTICAS
        </div>
        <div class="col-6">{{ product.title }}</div>
      </div>
      <v-divider></v-divider>
      <div class="row">
        <div class="col-3 col-sm-3 col-lg-1">
          <img :src="product.image" alt="" style="height: 80px; width: 80px" />
        </div>
        <div class="col-6">
          <span class="item">Vistas: </span>
          <span class="response"> {{ product.visits }}</span>
          <br />
          <span class="item">Cantidad de unidades ordenas: </span>
          <span class="response">{{ cant_product_orders.total_orders }}</span>
          <br />
          <span class="item">Con pagos completados: </span>
          <span
            class="response"
            style="color: green !important"
            v-if="cant_product_orders.total_orders_paymente_completed != null"
            >{{ cant_product_orders.total_orders_paymente_completed }}</span
          >
          <span
            class="response"
            style="color: red !important"
            v-if="cant_product_orders.total_orders_paymente_completed == null"
            >0</span
          >
          <br />
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    <div class="container mb-12">
      <div class="row">
        <div class="col-12">
          <v-card
            class="mb-1"
            elevation="2"
            v-for="(order, index) in orders"
            :key="index"
          >
            <div class="container">
              <div class="row">
                <div class="col-3">
                  <span class="item_card">orden #: </span>
                  <span class="response_card">{{ order.order.id }}</span> <br />
                  <span class="item_card">{{
                    order.order.created.slice(0, 8)
                  }}</span>
                  <br />
                  <div class="d-flex justify-content-center mt-1">
                    <v-btn
                      elevation="2"
                      x-small
                      data-bs-toggle="modal"
                      data-bs-target="#showOrder"
                      @click="GetOrder(order.order.id)"
                      >ver orden</v-btn
                    >
                  </div>
                </div>
                <div class="col-5">
                  <div
                    class="personal_data_user"
                    v-if="order.order.personal_user_data != null"
                  >
                    <span class="item_card">Nombre: </span>
                    <span class="response_card">{{
                      order.order.personal_user_data.nombre
                    }}</span>
                    <br />
                    <span class="item_card">Apellido: </span>
                    <span class="response_card">{{
                      order.order.personal_user_data.apellido
                    }}</span>
                    <br />
                  </div>
                  <div
                    class="anonymous_user_data"
                    v-if="order.order.anonymous_user_data != null"
                  >
                    <span class="item_card">Nombre: </span>
                    <span class="response_card">{{
                      order.order.anonymous_user_data.nombre
                    }}</span>
                    <br />
                    <span class="item_card">Apellido: </span>
                    <span class="response_card">{{
                      order.order.anonymous_user_data.apellido
                    }}</span>
                    <br />
                  </div>
                </div>
                <div class="col-4">
                  <span class="item_card">cantidad: </span>
                  <span class="response_card">
                    <span
                      style="
                        color: orange !important;
                        font-size: 15px !important;
                      "
                    >
                      {{ order.quantity }}
                    </span></span
                  >
                  <br />

                  <span class="item_card">PAGO: </span>
                  <span class="response_card">
                    <span
                      v-if="order.order.pago === 'completado'"
                      style="color: green !important"
                    >
                      {{ order.order.pago }}
                    </span>
                    <span
                      v-if="order.order.pago === 'pendiente'"
                      style="color: orangered !important"
                    >
                      {{ order.order.pago }}
                    </span></span
                  ><br />
                  <span class="item_card">estado:</span>
                  <span class="response_card">
                    <span
                      v-if="order.order.estado === 'Visto'"
                      style="color: blue !important"
                    >
                      {{ order.order.estado }}
                    </span>
                    <span
                      v-if="order.order.estado === 'cancelada'"
                      style="color: red !important"
                    >
                      {{ order.order.estado }}
                    </span>
                    <span
                      v-if="order.order.estado === 'en espera'"
                      style="color: #b8860b !important"
                    >
                      {{ order.order.estado }}
                    </span>
                    <span
                      v-if="order.order.estado === 'Producto despachado'"
                      style="color: #932793 !important"
                    >
                      {{ order.order.estado }}
                    </span>
                    <span
                      v-if="order.order.estado === 'Orden completada'"
                      style="color: green !important"
                    >
                      {{ order.order.estado }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
    <!-- MODALES -->
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="showOrder"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ver Orden</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="ClearForClose()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container" v-if="orderDetail != null">
              <div class="row">
                <div class="col-8 col-sm-8 card">
                  <h6>Detalle de la orden # {{ orderDetail.id }}</h6>
                  <p class="detalle_orden">
                    <span class="data_item">Total: $ </span
                    >{{ orderDetail.total }} <br />
                    <span class="data_item">Cantidad de productos: </span>
                    {{ orderDetail.quantity_products }}
                    <br />
                    <span class="data_item">Metodo de pago : </span>
                    {{ orderDetail.metodo_pago }} <br />
                    <span v-if="orderDetail.metodo_pago == 'mercadopago'">
                      <span class="data_item"> MercadoPago estado: </span>
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
                    <span class="data_item">
                      <font-awesome-icon icon="dollar-sign" /> Pago:
                    </span>
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
                    <span class="data_item"> Estado de la orden: </span>
                    <span
                      v-if="orderDetail.estado == 'Visto'"
                      style="color: blue"
                      >{{ orderDetail.estado }} &nbsp;
                      <font-awesome-icon icon="check-double"
                    /></span>
                    <span
                      v-if="orderDetail.estado == 'en espera'"
                      style="color: yellow"
                      >{{ orderDetail.estado }} &nbsp;
                      <font-awesome-icon icon="clock"
                    /></span>
                    <span
                      v-if="orderDetail.estado == 'cancelada'"
                      style="color: red"
                      >{{ orderDetail.estado }} &nbsp;
                      <font-awesome-icon icon="times"
                    /></span>
                    <span
                      v-if="orderDetail.estado == 'Orden completada'"
                      style="color: green"
                      >{{ orderDetail.estado }} &nbsp;
                      <font-awesome-icon icon="check"
                    /></span>
                    <span
                      v-if="orderDetail.estado == 'Producto despachado'"
                      style="color: purple"
                      >{{ orderDetail.estado }} &nbsp;
                      <font-awesome-icon icon="truck"
                    /></span>
                    <br />
                    <span class="data_item"> Fecha: </span>
                    {{ orderDetail.created }}
                  </p>
                </div>
                <div class="col-4 col-sm-4">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Acciones
                    </button>
                    <ul class="dropdown-menu" style="color: blank !important">
                      <li>
                        <a
                          class="dropdown-item"
                          @click="OrderEstado('producto_despachado')"
                          >Producto despachado</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          @click="OrderEstado('orden_completada')"
                          >Orden completada</a
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <a
                          class="dropdown-item"
                          @click="OrderPagoEstado('completado')"
                          >Pago completado</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          @click="OrderPagoEstado('pendiente')"
                          >Pago pendiente</a
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <a class="dropdown-item" @click="CancelOrder()"
                          >Cancelar Orden</a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" @click="DeleteOrder()"
                          >Eliminar Orden</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- mercado pago comprobante -->

              <div class="row" v-if="orderDetail.mercado_pago_approved">
                <div class="col-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h6>MercadoPago Comprobante</h6>

                      <div class="row">
                        <div class="col-6 col-sm-6">
                          <p class="detalle_orden">
                            <span class="data_item">collection_id: </span
                            >{{ mercadoPago_detail.collection_id }} <br />
                            <span class="data_item">collection_status: </span
                            >{{ mercadoPago_detail.collection_status }} <br />
                            <span class="data_item">payment_type: </span
                            >{{ mercadoPago_detail.payment_type }} <br />
                          </p>
                        </div>
                        <div class="col-6 col-sm-6">
                          <p class="detalle_orden">
                            <span class="data_item">payment_id: </span
                            >{{ mercadoPago_detail.payment_id }} <br />

                            <span class="data_item">merchant_order_id: </span
                            >{{ mercadoPago_detail.merchant_order_id }} <br />

                            <span class="data_item">external_reference: </span
                            >{{ mercadoPago_detail.external_reference }} <br />
                          </p>
                        </div>
                        <div class="col-12 col-sm-12">
                          <p>
                            <span style="font-size: 12px">
                              Recuerde comprobar y comparar estos datos en su
                              cuenta de MercadoPago.</span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- personal user data -->
              <div class="row" v-if="orderDetail.personal_user_data">
                <div class="col-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h6>Datos del comprador</h6>
                      <br />
                      <div class="row">
                        <div class="col-6 col-sm-6">
                          <p class="detalle_orden">
                            <span class="data_item">Nombre: </span
                            >{{ orderDetail.personal_user_data.nombre }} <br />
                            <span class="data_item">Apellido: </span
                            >{{ orderDetail.personal_user_data.apellido }}
                            <br />
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
                            >{{ orderDetail.personal_user_data.direccion }}
                            <br />

                            <span class="data_item">cod postal: </span
                            >{{ orderDetail.personal_user_data.codigo_postal }}
                            <br />

                            <span class="data_item">Telefono: </span
                            >{{ orderDetail.personal_user_data.telefono }}
                            <br />

                            <span class="data_item">Email: </span
                            >{{ orderDetail.personal_user_data.user.email }}
                            <br />

                            <span class="data_item">Username: </span
                            >{{ orderDetail.personal_user_data.user.username }}
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Anonimous data -->

              <div class="row" v-if="orderDetail.anonymous_user_data">
                <div class="col-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h6>Datos del comprador</h6>
                      <br />
                      <span>Usuario no registrado.</span>
                      <div class="row">
                        <div class="col-6 col-sm-6">
                          <p class="detalle_orden">
                            <span class="data_item">Nombre: </span
                            >{{ orderDetail.anonymous_user_data.nombre }} <br />
                            <span class="data_item">Apellido: </span
                            >{{ orderDetail.anonymous_user_data.apellido }}
                            <br />
                            <span class="data_item">Pais: </span
                            >{{ orderDetail.anonymous_user_data.pais }} <br />

                            <span class="data_item">Provincia: </span
                            >{{ orderDetail.anonymous_user_data.estado }} <br />

                            <span class="data_item">Ciudad: </span
                            >{{ orderDetail.anonymous_user_data.ciudad }} <br />
                          </p>
                        </div>
                        <div class="col-6 col-sm-6">
                          <p class="detalle_orden">
                            <span class="data_item">Direccion: </span
                            >{{ orderDetail.anonymous_user_data.direccion }}
                            <br />

                            <span class="data_item">cod postal: </span
                            >{{ orderDetail.anonymous_user_data.codigo_postal }}
                            <br />

                            <span class="data_item">Telefono: </span
                            >{{ orderDetail.anonymous_user_data.telefono }}
                            <br />

                            <span class="data_item">Email: </span
                            >{{ orderDetail.anonymous_user_data.email }} <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- envio -->
              <div class="row" v-if="orderDetail.envio">
                <div class="col-12 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h6>Envio Seleccionado</h6>
                      <div class="row">
                        <div class="col-12 col-sm-12">
                          <p class="detalle_orden">
                            <span class="data_item">Nombre: </span
                            >{{ orderDetail.envio.name }} <br />
                            <span class="data_item">Descripcion: </span
                            >{{ orderDetail.envio.description }} <br />
                            <span class="data_item">Precio: </span
                            >{{ orderDetail.envio.price }} <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Lista de productos -->

              <div class="row d-flex justify-content-center">
                <div
                  class="card ordenes"
                  v-for="(product, index) in orderDetail.productos"
                  :key="index"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-4 col-sm-4">
                        <img
                          style="width: 6rem; height: 6rem"
                          :src="server + product.product.image"
                          alt=""
                        />
                      </div>
                      <div class="col-8 col-sm-8">
                        <h5 class="card-title">
                          {{ product.product.title }}
                          <div class="card-text">
                            <p>
                              <span style="color: #000000"> Cantidad: </span
                              >{{ product.quantity }} <br />
                              <span style="color: #000000"> Precio: $ </span
                              >{{ product.price_sale }} <br />
                              <span style="color: #000000"> subtotal: $ </span
                              >{{ product.quantity * product.price_sale }}
                              <br />
                            </p>
                          </div>
                        </h5>
                      </div>
                    </div>
                    <div
                      class="row d-flex justify-content-end"
                      v-if="product.variacion_id != null"
                    >
                      <admin_order_product_variation
                        v-if="product.variacion_id != null"
                        :product="product"
                      />
                    </div>
                    <div
                      class="row d-flex justify-content-end"
                      v-if="product.options != null"
                    >
                      <div class="col-8 col-sm-8">
                        <span style="font-size: 13px">opciones:</span>
                        <ul class="list-group list-group-flush">
                          <li
                            class="list-group-item"
                            v-for="(vari, index) in product.options"
                            :key="index"
                          >
                            {{ vari }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="button_close_modal_order"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="ClearForClose()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import admin_order_product_variation from "../../components/admin/admin_order_product_variation.vue";
export default {
  name: "admin_product_statistics",
  props: ["product"],
  components: {
    admin_order_product_variation,
  },
  data() {
    return {
      cant_product_orders: {
        total_orders: 0,
        total_orders_paymente_completed: 0,
      },
      orders: null,
      orderDetail: null,
      mercadoPago_detail: null,
      product_to_restore_stock: [],
    };
  },
  mounted() {
    console.log("PROP");
    console.log(this.product);
    this.ListCantProductsOnOrder();
    this.ListOrdersWhereHaveProduct();
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  methods: {
    ...mapMutations("tienda", ["DisminuirCantNewsNotifiacionts"]),
    ClearForClose() {
      this.orderDetail = null;
      this.ListOrdersWhereHaveProduct();
    },

    GoToOrderDetail(order_id) {
      this.$router.push({
        name: "AdminOrderDetail",
        params: { order: order_id },
      });
    },

    ListCantProductsOnOrder() {
      console.log("ListCantProductsOnOrder");
      let data = {
        tienda: this.tienda.id,
        product: this.product.id,
      };
      axios
        .post(
          this.server + "/api/v1.0/tienda/statics/list/order/cant/products/",
          data
        )
        .then((response) => {
          console.log(response.data);
          this.cant_product_orders = {
            total_orders: response.data.total_ordenes,
            total_orders_paymente_completed:
              response.data.total_ordenes_payment_completed,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ListOrdersWhereHaveProduct() {
      console.log("ListOrdersWhereHaveProduct");
      axios
        .get(
          this.server + "/api/v1.0/tienda/statics/list/order/have/products/",
          {
            params: {
              product: this.product.id,
              tienda: this.tienda.id,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.orders = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* ORDENES */
    /* ACCIONES */
    OrderPagoEstado(estado) {
      this.procesando = true;
      let data = {
        pago: estado,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/orders/pay/change/" +
            this.orderDetail.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetOrder(this.orderDetail.id);
        })
        .finally((this.procesando = false))
        .catch((error) => {
          console.log(error);
        });
    },

    OrderEstado(estado) {
      if (estado == "producto_despachado") {
        estado = "Producto despachado";
      }
      if (estado == "orden_completada") {
        estado = "Orden completada";
      }
      console.log(estado);
      let data = {
        estado: estado,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/orders/status/change/" +
            this.orderDetail.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetOrder(this.orderDetail.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CancelOrder() {
      this.$swal
        .fire({
          title: "Desea cancelar esta orden?",
          text: "si cancela la orden, el stock de los productos seran reestablecidos.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Cancelarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.procesando = true;
            if (this.orderDetail.estado != "cancelada") {
              let product = {
                id: 0,
                title: "",
                variacion_id: null,
                quantity: 0,
              };
              console.log("orderDetail");
              console.log(this.orderDetail);
              this.orderDetail.productos.forEach((element) => {
                console.log(element.product.title);
                product = {
                  id: element.product.id,
                  title: element.product.title,
                  variacion_id: element.variacion_id,
                  quantity: element.quantity,
                };
                this.product_to_restore_stock.push(product);
              });

              let cancel_order = {
                order_id: this.orderDetail.id,
                productos: this.product_to_restore_stock,
              };

              console.log(cancel_order);
              axios
                .post(
                  this.server + "/api/v1.0/admin/orders/cancel/",
                  cancel_order
                )
                .then((response) => {
                  console.log(response);
                  this.GetOrder(this.orderDetail.id);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              this.$swal.fire("La orden ya fue cancelada!", "", "error");
            }
          }
        });
    },

    DeleteOrder() {
      if (this.orderDetail.estado == "cancelada") {
        this.$swal
          .fire({
            title: "Desea eliminar esta orden?",
            text: "La orden ah sido eliminada.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI, Borrarla!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(
                  this.server +
                    "/api/v1.0/admin/orders/delete/" +
                    this.orderDetail.id
                )
                .then((response) => {
                  console.log(response.data);
                  document.getElementById("button_close_modal_order").click();
                  this.$swal.fire(
                    "Orden eliminada!",
                    "Orden eliminada correctamente.",
                    "success"
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
      } else {
        this.$swal.fire(
          "Debe cancelar la orden primero para poder eliminarla.",
          "",
          "error"
        );
      }
    },
    /* ACCIONES */

    GetOrder(order_id) {
      axios
        .get(this.server + "/api/v1.0/orders/detail/" + order_id, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orderDetail = response.data;
          this.checkIfVisto();
          console.log("tiene mp");
          if (response.data.mercado_pago_approved == true) {
            axios
              .get(
                this.server +
                  "/api/v1.0/admin/orders/mercadopago/detail/?order=" +
                  order_id
              )
              .then((response) => {
                console.log(response.data.results);
                this.mercadoPago_detail = response.data.results[0];
                console.log("variable");
                console.log(this.mercadoPago_detail);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkIfVisto() {
      console.log("ESTE VIENE DEL CHECK");
      if (this.orderDetail.visto == false) {
        console.log("se ejecuto visto");
        let data = new FormData();
        data.append("order_id", this.orderDetail.id);
        axios
          .put(this.server + "/api/v1.0/admin/orders/visto/", data)
          .then((response) => {
            console.log(response);
            this.GetOrder(this.orderDetail.id);
            this.DisminuirCantNewsNotifiacionts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    /* ORDENES */
  },
};
</script>

<style scoped>
a {
  color: black !important;
  font-size: 13px !important;
  text-transform: uppercase !important;
}

.item {
  font-size: 11px;
  color: black;
  text-transform: uppercase !important;
}
.response {
  font-size: 12px;
  color: orangered;
}
.item_card {
  font-size: 11px;
  color: black;
  text-transform: uppercase !important;
}
.response_card {
  font-size: 12px;
  color: gray;
}
/* VER ORDENES */
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