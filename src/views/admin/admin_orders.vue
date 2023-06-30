<template>
  <div class="admin_orders mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="dollar-sign" />
            <span class="ml-2"> Ordenes</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-8 col-sm-4">
          <form v-on:submit.prevent="SearchOrder()">
            <div class="input-group">
              <input
                type="search"
                class="form-control form-control-dark"
                placeholder="2021-12-07(AA-mm-dd)"
                aria-label="buscar"
                aria-describedby="button-addon2"
                name="kword"
                id="kword"
                v-model="kword"
              />
              <v-btn
                class="
                  btn btn-outline-primary
                  bg-white
                  border-start-0 border
                  rounded-pill
                  ms-n3
                "
                type="submit"
                id="button-addon2"
                data-mdb-ripple-color="dark"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
          </form>
        </div>
        <div class="col-4 col-sm-4">
          <select
            class="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            v-model="criterio"
          >
            <option selected>Criterio</option>
            <option value="date">fecha</option>
            <option value="id">id</option>
            <option value="email">email</option>
          </select>
        </div>
        <div class="col-12 col-sm-12">
          <v-switch
            label="No vistas"
            @change="Filter_no_vistas()"
            v-model="switch_vistas"
          ></v-switch>
        </div>
        <div class="col-12 col-sm-12 d-flex justify-content-end">
          <v-btn
            color="grey"
            elevation="2"
            small
            outlined
            @click="ClearSearch()"
          >
            <v-icon>mdi-delete </v-icon> limpiar busqueda
          </v-btn>
        </div>
      </div>
      <div class="row">
        <div class="accordion" id="accordionExample">
          <div
            class="accordion-item"
            v-for="(item, index) in ordered_orders"
            :key="index"
          >
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collap' + index"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                {{ item.date }}
              </button>
            </h2>
            <div
              :id="'collap' + index"
              :class="
                index == 0
                  ? 'accordion-collapse collapse show'
                  : 'accordion-collapse collapse'
              "
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="row d-flex justify-content-center mb-8">
                  <div class="col-12 col-sm-12">
                    <v-card
                      elevation="2"
                      outlined
                      v-for="(order, index_order) in item.orders"
                      :key="index_order"
                      class="mb-2"
                    >
                      <router-link
                        :to="{
                          name: 'AdminOrderDetail',
                          params: { order: order.id },
                        }"
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            <font-awesome-icon icon="shopping-bag" />
                            {{ order.created }}
                          </h5>

                          <p class="card-text orders">
                            #Orden id: {{ order.id }} <br />
                            Monto: $ {{ order.total }} <br />
                            Cantidad de items: {{ order.quantity_products }}
                            <br />
                            Metodo de pago: {{ order.metodo_pago }} <br />
                            <span v-if="order.metodo_pago == 'mercadopago'">
                              MercadoPago estado:
                              <span
                                v-if="order.mercado_pago_approved == true"
                                style="color: green"
                                >Pago Aprobado</span
                              >
                              <span
                                v-if="order.mercado_pago_approved == false"
                                style="color: red"
                              >
                                Pago Rechazado o Cancelado
                              </span>
                              <br />
                            </span>

                            <font-awesome-icon icon="dollar-sign" /> Pago:
                            <span
                              style="color: darkgoldenrod"
                              v-if="order.pago == 'pendiente'"
                              >{{ order.pago }}</span
                            >
                            <span
                              style="color: green"
                              v-if="order.pago == 'completado'"
                              >{{ order.pago }}</span
                            >
                            <br />
                            Estado de la orden:
                            <span v-if="order.visto == true" style="color: blue"
                              >Visto
                              <font-awesome-icon icon="check-double" />
                              &nbsp;</span
                            >
                            <span
                              v-if="order.visto == false"
                              style="color: darkorange"
                              >{{ order.estado }} &nbsp;
                              <font-awesome-icon icon="clock"
                            /></span>
                            <span
                              v-if="order.estado == 'cancelada'"
                              style="color: red"
                              >{{ order.estado }} &nbsp;
                              <font-awesome-icon icon="times"
                            /></span>
                            <span
                              v-if="order.estado == 'Orden completada'"
                              style="color: green"
                              >{{ order.estado }} &nbsp;
                              <font-awesome-icon icon="check"
                            /></span>
                            <span
                              v-if="order.estado == 'Producto despachado'"
                              style="color: purple"
                              >{{ order.estado }} &nbsp;
                              <font-awesome-icon icon="truck"
                            /></span>

                            <br />
                            <span v-if="order.personal_user_data">
                              Email: {{ order.personal_user_data.user.email }}
                              <br />
                            </span>

                            <span v-if="order.personal_user_data">
                              Telefono:{{ order.personal_user_data.telefono }}
                            </span>
                            <span v-if="order.anonymous_user_data">
                              Email: {{ order.anonymous_user_data.email }}
                            </span>
                            <br />
                            <span v-if="order.anonymous_user_data">
                              Telefono:{{ order.anonymous_user_data.telefono }}
                            </span>
                          </p>
                        </div>
                      </router-link>
                    </v-card>
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
import admin_menu from "../../components/admin/admin_menu.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "admin_orders",
  components: {
    admin_menu,
  },
  data() {
    return {
      orders_db: [],
      ordered_orders: [],
      criterio: "Criterio",
      kword: "",
      switch_vistas: false,
    };
  },

  created() {
    this.Guard();
    this.GetAllOrders();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
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

    Filter_no_vistas() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/orders/filter/viewed/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          this.orders_db = response.data.results;
          this.OrdenarOrdenesPorFecha();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ClearSearch() {
      this.GetAllOrders();
      this.switch_vistas = false;
    },
    SearchOrder() {
      if (this.criterio == "Criterio") {
        this.$swal.fire(
          "Seleccione un Criterio!",
          "debe seleccionar un criterio de busqueda.",
          "error"
        );
      }

      if (this.criterio == "date") {
        console.log("DATE");
        axios
          .get(
            this.server +
              "/api/v1.0/admin/orders/search/date/?tienda=" +
              this.tienda.id +
              "&date=" +
              this.kword
          )
          .then((response) => {
            console.log(response.data);
            this.orders_db = response.data.results;
            this.OrdenarOrdenesPorFecha();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (this.criterio == "id") {
        axios
          .get(
            this.server +
              "/api/v1.0/admin/orders/search/id/?tienda=" +
              this.tienda.id +
              "&id=" +
              this.kword
          )
          .then((response) => {
            console.log(response.data.results);
            this.orders_db = response.data.results;
            this.OrdenarOrdenesPorFecha();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    GetAllOrders() {
      console.log("GetOrdesUser");
      axios
        .get(this.server + "/api/v1.0/admin/orders/" + this.tienda.id, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orders_db = response.data.results;
          this.OrdenarOrdenesPorFecha();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    OrdenarOrdenesPorFecha() {
      // this gives an object with dates as keys
      const groups = this.orders_db.reduce((groups, order) => {
        const date = order.created.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(order);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.ordered_orders = Object.keys(groups).map((date) => {
        return {
          date,
          orders: groups[date],
        };
      });

      console.log(this.ordered_orders);
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
}

.ordenes {
  margin-bottom: 2px !important;
}
.orders {
  font-size: 14px !important;
}
.orden_nueva {
  border-color: greenyellow !important;
  border-width: 2px !important  ;
}
.Nuevo {
  background-color: green !important;
  color: white !important;
}
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>