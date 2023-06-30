<template>
  <div class="user_all_orders">
    <user_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="shopping-bag" />
            <span class="ml-2"> Mis compras</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
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
              :to="{ name: 'UserOrderDetail', params: { order: order.id } }"
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
                    >{{ order.estado }} &nbsp; <font-awesome-icon icon="clock"
                  /></span>
                  <span v-if="order.estado == 'cancelada'" style="color: red"
                    >{{ order.estado }} &nbsp; <font-awesome-icon icon="times"
                  /></span>
                  <span
                    v-if="order.estado == 'Orden completada'"
                    style="color: green"
                    >{{ order.estado }} &nbsp; <font-awesome-icon icon="check"
                  /></span>
                  <span
                    v-if="order.estado == 'Producto despachado'"
                    style="color: purple"
                    >{{ order.estado }} &nbsp; <font-awesome-icon icon="truck"
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
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import user_menu from "../../components/user/user_menu.vue";
export default {
  name: "user_all_orders",
  components: {
    user_menu,
  },

  created() {
    this.GetOrdersUser();
  },

  data() {
    return {
      orders: [],
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("user", ["user_store"]),
  },
  methods: {
    GetOrdersUser() {
      console.log("GetOrdesUser");
      axios
        .get(
          this.server +
            "/api/v1.0/orders/list/user/?kword=" +
            localStorage.getItem("cod_ref"),
          {
            headers: {
              Authorization: localStorage.getItem("access"),
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