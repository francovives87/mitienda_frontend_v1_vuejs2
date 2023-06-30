<template>
  <div class="mt-12 mb-4">
    <main_user_menu />
    <div class="container">
      <div class="row">
        <h5>Bienvendio</h5>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12"></div>
          <div class="ordenes_recientes">
            <font-awesome-icon icon="shopping-bag" />
            <span class="ml-2"> Mis ultimas compras</span>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-sm-12">
            <v-card
              elevation="2"
              outlined
              v-for="(order, index) in orders"
              :key="index"
              class="mb-2"
            >
              <router-link
                :to="{ name: 'main_user_order_detail', params: { order: order.id } }"
              >
                <div class="card-body">
                  <h5 class="card-title">
                    <font-awesome-icon icon="shopping-bag" />
                    {{ order.created }}
                  </h5>

                  <p class="card-text">
                    <span style="color: #000000"
                      >Tienda: {{ order.tienda.title }}</span
                    ><br />
                    Monto: $ {{ order.total }} <br />
                    Cantidad de items: {{ order.quantity_products }} <br />
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
                    </span>
                    <br />
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
                    <span v-if="order.estado == 'Visto'" style="color: blue"
                      >{{ order.estado }} &nbsp;
                      <font-awesome-icon icon="check-double"
                    /></span>
                    <span
                      v-if="order.estado == 'en espera'"
                      style="color: darkorange"
                      >{{ order.estado }} &nbsp;
                      <font-awesome-icon icon="clock"
                    /></span>
                    <span v-if="order.estado == 'cancelada'" style="color: red"
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
                  </p>
                </div>
              </router-link>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import main_user_menu from "../../../components/main/user/main_user_menu.vue";
export default {
  name: "home_user",
  components: {
    main_user_menu,
  },

  data() {
    return {
      user: [],
      orders: [],
    };
  },

  created() {
    this.GetDataUser();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  methods: {
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
          this.GetOrdersUser();
        })
        .catch((error) => {
          console.log("aca no hay");
          this.$router.push({ name: "main_login" });
          console.log(error);
        })
        .finally(console.log("finaly"));
    },
    GetOrdersUser() {
      console.log("GetOrdesUser");
      axios
        .get(
          this.server + "/api/v1.0/orders/list/user/",

          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
            params: {
              user: localStorage.getItem("cod_ref"),
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
  },
};
</script>

<style scoped>
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
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>