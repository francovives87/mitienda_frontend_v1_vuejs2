<template>
  <div class="mb-3">
    <div class="loading">
      <admin_loading v-if="load == false" />
    </div>
    <div class="adminHome mb-3" v-if="load == true">
      <admin_menu></admin_menu>
      <div class="container">
        <div class="row">
          <h5>Bienvendio <span class="admin">Administrador</span></h5>
          <v-container><v-divider></v-divider></v-container>
        </div>

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
                  Mi tienda / Mi plan
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-6 col-sm-6">
                      <div class="card" style="width: auto">
                        <div class="card-header">Mi tienda:</div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            Categorias: {{ count_objects.categorias }}
                          </li>
                          <li class="list-group-item">
                            Productos: {{ count_objects.productos }}
                          </li>
                          <li class="list-group-item">
                            Categorias blog:
                            {{ count_objects.categorias_blog }}
                          </li>
                          <li class="list-group-item">
                            Entradas: {{ count_objects.entries_blog }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6">
                      <div class="card" style="width: auto">
                        <div class="card-header">
                          Plan: {{ tienda.plan.name }}
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            Categorias: {{ tienda.plan.product_categories }}
                          </li>
                          <li class="list-group-item">
                            Productos: {{ tienda.plan.product_products }}
                          </li>
                          <li class="list-group-item">
                            Categorias blog: {{ tienda.plan.blog_categories }}
                          </li>
                          <li class="list-group-item">
                            Entradas: {{ tienda.plan.blog_entries }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-2 mb-8">
          <div class="row">
            <v-alert border="left" color="blue-grey" dark>
              Ordenes Nuevas <br />
            </v-alert>
          </div>
          <div class="row">
            <div class="col-8 col-sm-8">
              <h6>Ordenes nuevas: {{ count_ordes_news }}</h6>
            </div>
            <div class="col-2 col-sm-2 d-flex justify-content-end">
              <v-btn elevation="4" icon @click="ButtonRefresh()">
                <font-awesome-icon icon="sync-alt" />
              </v-btn>
              <div class="d-flex justify-content-center align-items-center">
                <p><span class="actualizar">Actualizar</span></p>
              </div>
            </div>
          </div>

          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12" v-if="orders.length > 0">
              <div
                class="card ordenes"
                v-for="(order, index) in orders"
                :key="index"
                :class="order.visto == false ? 'orden_nueva' : 'orden_vista'"
              >
                <div class="card-body">
                  <router-link
                    :to="{
                      name: 'AdminOrderDetail',
                      params: { order: order.id },
                    }"
                  >
                    <h5 class="card-title">
                      <font-awesome-icon icon="shopping-bag" />
                      {{ order.created }}
                    </h5>
                  </router-link>
                  <div class="Nuevo" v-if="order.visto == false">
                    **NUEVA ORDEN!
                  </div>
                  <p class="card-text">
                    Monto: $ {{ order.total }} <br />
                    Cantidad de items: {{ order.quantity_products }} <br />
                    Metodo de pago: {{ order.metodo_pago }} <br />
                    Estado de la orden: {{ order.estado }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-12" v-if="orders.length == 0">
              <h6>No hay ordenes nuevas.</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
import admin_loading from "../../components/admin/admin_loading.vue";
export default {
  name: "admin_home",
  components: {
    admin_menu,
    admin_loading,
  },

  data() {
    return {
      user: [],
      orders: [],
      drawer: null,
      load: false,
      count_ordes_news: 0,
      connection: null,
      newOrderTiendaSocket: null,
      mensajeActualiar: false,
    };
  },

  created() {
    this.GetDataUser();
    this.GetNewsOrders();
    /* this.GetAllObjectsOffTienda(); */
    this.SetServer(this.server);
    this.conex();
  },

  mounted() {
    this.load_count_objects();
  },

  beforeDestroy() {
    this.Disconnect();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("tienda", ["count_objects"]),
  },

  watch: {
    /* newOrderTiendaSocket: function (value) {
      this.newOrderTiendaSocket = value;
      console.log("este cambio por wacho y muestro");
      console.log(this.newOrderTiendaSocket);
      console.log("tienda_id");
      console.log(this.tienda.id);

      if (this.newOrderTiendaSocket == this.tienda.id) {
        this.GetNewsOrders();
      }
    }, */
  },

  methods: {
    ...mapMutations("tienda", ["SetServer"]),
    ...mapActions("tienda", ["load_count_objects"]),

    Disconnect() {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      this.connection.close();
    },

    conex() {
      let _this = this;
      this.connection = new WebSocket("wss://minegocio.me/ws/test/");
      this.connection.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(data);
        if (data.newOrder) {
          _this.newOrderTiendaSocket = data.newOrder.tienda_id;
          if (data.newOrder.tienda_id){
            if (data.newOrder.tienda_id == _this.tienda.id){
              _this.GetNewsOrders();
            }
          }
        }
      };
    },

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
          if (this.user.id !== this.tienda.user) {
            this.$router.push({ name: "Main" });
          }
        })
        .finally((final) => {
          this.load = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ButtonRefresh() {
      this.GetNewsOrders();
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sincronizacion completada correctamente!",
        showConfirmButton: false,
        timer: 800,
      });
    },

    CountNewsOrders() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/orders/news/count/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data);
          this.count_ordes_news = response.data.ordenes_nuevas;
          console.log(this.count_ordes_news);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetNewsOrders() {
      console.log("GetOrdesUser");
      axios
        .get(
          this.server + "/api/v1.0/admin/orders/news/?tienda=" + this.tienda.id,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.orders = response.data.results;
          this.CountNewsOrders();
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
.admin {
  color: green !important;
}
.list-group-item {
  font-size: 12px !important;
}
.actualizar {
  margin-left: 5px !important;
  font-size: 12px !important;
}

.orden_nueva {
  border-color: greenyellow !important;
  border-width: 2px !important  ;
}
.Nuevo {
  background-color: green !important;
  color: white !important;
}
</style>