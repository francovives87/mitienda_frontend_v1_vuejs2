<template>
  <v-app>
    <main_loading v-if="load == false" />
    <main_barra_mobile
      v-if="
        isMain ||
        isError ||
        isMainAccount ||
        isMainRegister ||
        isMainLogin ||
        isMainCreateStore ||
        isSearchStore ||
        isMainUserOrderDetail ||
        isMainUserAllOrders ||
        IsMainUserAllBokings ||
        IsMainUserPersonalDates ||
        IsMainGeolocationUser
      "
    />
    <tienda_navbar
      v-if="
        !isMain &&
        !isMainAccount &&
        !isMainRegister &&
        !isMainLogin &&
        !isMainCreateStore &&
        !isSearchStore &&
        !IsMainGeolocationUser &&
        !isMainUserOrderDetail &&
        !IsMainUserAllBokings &&
        !isMainUserAllOrders &&
        !IsMainUserPersonalDates
      "
    />
    <tienda_barra_mobile
      v-if="
        !isMain &&
        !isMainAccount &&
        !isMainRegister &&
        !isMainLogin &&
        !isMainCreateStore &&
        !isSearchStore &&
        !isMainUserOrderDetail &&
        !isMainUserAllOrders &&
        !IsMainUserAllBokings &&
        !IsMainUserPersonalDates &&
        !IsMainGeolocationUser
      "
    />
    <v-main>
      <router-view />
    </v-main>
    <tienda_bottom_navigation
      v-if="
        isTiendaLoad == true &&
        !isMain &&
        !isMainAccount &&
        !isMainLogin &&
        !isMainRegister &&
        !isSearchStore &&
        !isMainCreateStore &&
        !isMainUserOrderDetail &&
        !isMainUserAllOrders &&
        !IsMainUserAllBokings &&
        !IsMainUserPersonalDates &&
        !IsMainGeolocationUser
      "
    />
    <main_footer
      v-if="
        isMain ||
        IsMainGeolocationUser ||
        IsMainUserAllBokings ||
        isMainUserAllOrders ||
        IsMainUserPersonalDates ||
        isMainRegister ||
        isMainLogin ||
        isMainRegister ||
        isMainCreateStore
      "
    />
    <tienda_footer
      v-if="
        !isMain &&
        !isMainAccount &&
        !isMainRegister &&
        !isMainLogin &&
        !isMainCreateStore &&
        !isSearchStore &&
        !IsMainGeolocationUser &&
        !isMainUserOrderDetail &&
        !IsMainUserAllBokings &&
        !isMainUserAllOrders &&
        !IsMainUserPersonalDates
      "
    />
  </v-app>
</template>

<script>
import main_loading from "../src/components/main/main_loading.vue";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import main_footer from "../src/components/main/main_footer.vue";
import tienda_navbar from "../src/components/tienda/tienda_navbar.vue";
import tienda_footer from "../src/components/tienda/tienda_footer.vue";
import tienda_barra_mobile from "../src/components/tienda/tienda_barra_mobile.vue";
import tienda_bottom_navigation from "../src/components/tienda/tienda_bottom_navigation.vue";
import main_navbar from "../src/components/main/main_navbar.vue";
import main_barra_mobile from "../src/components/main/main_barra_mobile.vue";
import tienda_loading from "../src/components/tienda/tienda_loading.vue";

export default {
  name: "App",
  components: {
    main_footer,
    tienda_navbar,
    tienda_barra_mobile,
    tienda_bottom_navigation,
    main_navbar,
    main_barra_mobile,
    tienda_loading,
    tienda_footer,
    main_loading,
  },
  data() {
    return {
      load: false,
      user: null,
      rutas_reservadas: ["search", "main"],
      hasTienda: false,
      newOrderTiendaSocket: null,
      notifications: 0,
      load: false,
    };
  },

  created() {
    this.ListenOrder();
    this.CheckVisitor();
    this.getTokenAndRefresh();

    if (this.isMain == false) {
      this.CheckTienda();
    }

    if (this.isMain == true) {
    }
  },

  mounted() {
    setInterval(() => {
      console.log("arranca este");
      this.getTokenAndRefresh();
    }, 840000);
  },

  beforeDestroy() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  },

  computed: {
    ...mapState("tienda", ["tienda", "mitienda"]),
    ...mapState("user", ["user_store"]),

    MainBar() {
      const allow = [
        "isMain",
        "isError",
        "isMainAccount",
        "isMainRegister",
        "isMainLogin",
        "isMainCreateStore",
      ];
      route = this.$route.name;
      if (allow.filter(route)) {
        return true;
      }
    },

    isMain() {
      return this.$route.name === "Main";
    },
    isError() {
      return this.$route.name === "error404";
    },
    isAdminHomeUser() {
      return this.$route.name === "AdminHome";
    },
    isATienda() {
      return this.$route.name === "TiendaHome";
    },
    isMainAccount() {
      return this.$route.name === "main_account";
    },
    isSearchStore() {
      return this.$route.name === "main_search_tienda";
    },

    isMainUserOrderDetail() {
      return this.$route.name === "main_user_order_detail";
    },
    isTiendaLoad() {
      if (this.tienda.name) {
        return true;
      } else {
        return false;
      }
    },
    isMainRegister() {
      return this.$route.name === "MainRegister";
    },
    isMainLogin() {
      return this.$route.name === "MainLogin";
    },
    isMainCreateStore() {
      return this.$route.name === "main_create_tienda";
    },

    isMainUserAllOrders() {
      return this.$route.name === "main_user_all_orders";
    },
    IsMainUserAllBokings() {
      return this.$route.name === "main_user_all_bookins";
    },

    IsMainUserPersonalDates() {
      return this.$route.name === "main_user_personal_dates";
    },
    IsMainGeolocationUser() {
      return this.$route.name === "main_geolocation_user";
    },
  },

  methods: {
    ...mapMutations("tienda", [
      "AddTienda",
      "ChangeFlagNewOrder",
      "SetCantNewNotifiacions",
      "AumentarCantNewsNotifications",
      "DisminuirCantNewsNotifiacionts",
      "AddMiTienda",
    ]),
    ...mapMutations("user", ["AddUser"]),

    ListenOrder() {
      let _this = this;
      this.WebSocktConnection.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(data);
        if (data.newOrder) {
          console.log("esta mando el guacho");
          console.log("es siempre este");
          if (data.newOrder.tienda_id == _this.mitienda.id) {
            console.log("Es de esta tienda no tengo dudas");
            _this.AumentarCantNewsNotifications();
            _this.notify();
            _this.ChangeFlagNewOrder("active");
          } else {
            console.log("No es de esta tienda");
          }
        }

        if (data.newBooking) {
          console.log("esta mando el guacho");
          if (data.newBooking.tienda_id == _this.mitienda.id) {
            console.log("Es de esta tienda no tengo dudas");
            _this.AumentarCantNewsNotifications();
            _this.notify_booking();
            _this.ChangeFlagNewOrder("active");
          } else {
            console.log("No es de esta tienda");
          }
        }

        if (data.newQuestion) {
          console.log("esta mando el guacho");
          if (data.newQuestion.tienda_id == _this.mitienda.id) {
            console.log("Es de esta tienda no tengo dudas");
            _this.AumentarCantNewsNotifications();
            _this.notify_question();
            _this.ChangeFlagNewOrder("active");
          } else {
            console.log("No es de esta tienda");
          }
        }

        if (data.newQuestion_service) {
          console.log("esta mando el guacho");
          if (data.newQuestion_service.tienda_id == _this.mitienda.id) {
            console.log("Es de esta tienda no tengo dudas");
            _this.AumentarCantNewsNotifications();
            _this.notify_question_service();
            _this.ChangeFlagNewOrder("active");
          } else {
            console.log("No es de esta tienda");
          }
        }
      };
    },

    GetTiendaByUserId() {
      axios
        .get(this.server + "/api/v1.0/tienda/user/?user=" + this.user.id)
        .then((response) => {
          console.log("GetTiendaByUserId");
          console.log(response.data.results);
          this.AddMiTienda(response.data.results[0]);
          this.CountNewsOrders();
          this.CountNewsBookings();
          this.CountNewsQuestions();
          this.CountNewsServiceQuestions();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.load = true;
        });
    },

    CheckVisitor() {
      console.log("CHECKVISITOR");
      if (!localStorage.getItem("visitor")) {
        console.log("no hay visitor,lo creo y guardo");
        axios
          .post(this.server + "/api/v1.0/user/visitor/create/")
          .then((response) => {
            console.log("visitor_id");
            console.log(response.data.id);
            localStorage.setItem("visitor", response.data.id);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Lo recupero y lo analizo");
        var data = {
          visitor: parseInt(localStorage.getItem("visitor")),
        };
        axios
          .post(this.server + "/api/v1.0/user/visitor/manager/", data)
          .then((response) => {
            console.log("VISTOR MANAGER");
            console.log(response.data);
            localStorage.setItem("visitor", response.data.visitor);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    GetDataUser() {
      if (localStorage.getItem("access")) {
        axios
          .get(
            this.server +
              "/api/v1.0/user/" +
              parseInt(localStorage.getItem("cod_ref"), 10),
            {
              headers: {
                Authorization: localStorage.getItem("access"),
              },
            }
          )
          .then((response) => {
            this.user = response.data;
            console.log("GetDataUser");
            console.log(this.user);
            if (this.user) {
              this.AddUser(response.data);
              this.UserHasTienda();
            }
          })
          .catch((error) => {
            console.log(error);
            this.load = true;
          });
      }
    },

    UserHasTienda() {
      if (localStorage.getItem("access")) {
        console.log("UserHasTienda");
        console.log(this.user);
        let data = {
          user_id: this.user.id,
        };
        axios
          .post(this.server + "/api/v1.0/user/tienda/", data)
          .then((response) => {
            console.log(response.data);
            /* si tiene tienda */
            if (response.data.tienda_id > 0) {
              console.log("abro socket");

              /* this.ConexionWebSocket() */
              this.hasTienda = true;
              this.GetTiendaByUserId();
            } else {
              console.log("no abro ni mierda");
              this.load = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    CountNewsBookings() {
      axios
        .get(this.server + "/api/v1.0/admin/bookings/count/?tienda=" + this.mitienda.id)
        .then((response) => {
          console.log("Nuevos TURNOS");
          console.log(response.data);
          this.SetCantNewNotifiacions(response.data.reservas_nuevas);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsOrders() {
      axios
        .get(
          this.server + "/api/v1.0/admin/orders/news/count/?tienda=" + this.mitienda.id
        )
        .then((response) => {
          this.SetCantNewNotifiacions(response.data.ordenes_nuevas);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsQuestions() {
      axios
        .get(this.server + "/api/v1.0/product/question/count/?tienda=" + this.mitienda.id)
        .then((response) => {
          this.SetCantNewNotifiacions(response.data.preguntas_nuevas);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CountNewsServiceQuestions() {
      axios
        .get(this.server + "/api/v1.0/service/question/count/?tienda=" + this.mitienda.id)
        .then((response) => {
          this.SetCantNewNotifiacions(response.data.preguntas_nuevas_service);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    notify() {
      const notification = {
        title: "Nueva Orden",
        options: {
          body: "Tiene una nueva orden!",
        },
        events: {
          onerror: function () {
            console.log("Custom error event was called");
          },
          onclick: function () {
            console.log("Custom click event was called");
          },
          onclose: function () {
            console.log("Custom close event was called");
          },
          onshow: function () {
            console.log("Custom show event was called");
          },
        },
      };
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    },

    notify_booking() {
      const notification = {
        title: "Nueva Reserva",
        options: {
          body: "Tiene una nueva reserva!",
        },
        events: {
          onerror: function () {
            console.log("Custom error event was called");
          },
          onclick: function () {
            console.log("Custom click event was called");
          },
          onclose: function () {
            console.log("Custom close event was called");
          },
          onshow: function () {
            console.log("Custom show event was called");
          },
        },
      };
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    },

    notify_question() {
      const notification = {
        title: "Nueva Consulta",
        options: {
          body: "Alguien ha preguntado por un producto!",
        },
        events: {
          onerror: function () {
            console.log("Custom error event was called");
          },
          onclick: function () {
            console.log("Custom click event was called");
          },
          onclose: function () {
            console.log("Custom close event was called");
          },
          onshow: function () {
            console.log("Custom show event was called");
          },
        },
      };
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    },

    notify_question_service() {
      const notification = {
        title: "Nueva Consulta",
        options: {
          body: "Alguien ha preguntado por un servicio!",
        },
        events: {
          onerror: function () {
            console.log("Custom error event was called");
          },
          onclick: function () {
            console.log("Custom click event was called");
          },
          onclose: function () {
            console.log("Custom close event was called");
          },
          onshow: function () {
            console.log("Custom show event was called");
          },
        },
      };
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    },

    getTokenAndRefresh() {
      if (localStorage.getItem("refresh")) {
        const accessData = {
          refresh: localStorage.getItem("refresh"),
        };
        axios
          .post(this.server + "/api/v1.0/token/refresh/", accessData)
          .then((response) => {
            const access = response.data.access;
            let bearer_access = "Bearer " + access;
            localStorage.setItem("access", bearer_access);
            this.GetDataUser();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.load = true;
      }
    },
    CheckTienda() {
      if (!this.tienda.name) {
        let name_tienda = this.$route.params.name;
        console.log("name tienda");
        console.log(name_tienda);
        axios
          .get(this.server + "/api/v1.0/tienda/" + name_tienda)
          .then((response) => {
            console.log("getTienda");
            console.log(response.data.results);
            if (response.data.count == 0) {
              if (this.rutas_reservadas.filter(name_tienda)) {
                this.$router.push({ name: name_tienda });
              } else {
                this.$router.push({ name: "error404" });
              }
            }

            this.AddTienda(response.data.results[0]);
            console.log(this.tienda);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally((final) => {
            console.log("termino la carga");
            this.load = true;
          });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@500&display=swap");

html,
body {
  font-family: "Oswald", sans-serif;
}

p {
  line-height: 1.2 !important;
  color: rgba(0, 0, 0, 0.6) !important;
  font-size: 18px !important;
}

.v-card__title {
  letter-spacing: -1.5px !important;
  font-family: "Azeret Mono", monospace;
  font-weight: 500 !important;
  padding: 6px !important;
}

a {
  text-decoration: none !important;
}

#app {
  font-family: "Oswald", sans-serif;
}

.VueCarousel-pagination {
  display: none !important;
}
.v-main{
  padding: 0px !important;
}
</style>
