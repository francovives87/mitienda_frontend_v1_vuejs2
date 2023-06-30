<template>
  <div class="admin_menues">
    <div class="mobile_menu" v-if="height < 3">
      <div class="container mt-8">
        <div class="row d-flex align-items-center">
          <div
            class="
              col-8 col-sm-8 col-lg-9
              info_user
              d-flex
              justify-content-center
            "
          >
            <div class="row">
              <div class="col-2 col-sm-2">
                <v-icon class="ih5">mdi-account-circle</v-icon>
              </div>
              <div class="col-10 col-sm-10">
                <span class="username">mitienda.app/{{ tienda.name }}</span>
                <span class="user_menu_email">{{ email }}</span>
              </div>
            </div>
          </div>
          <div class="col-3 col-lg-3 col-sm-3 menu_button">
            <v-btn elevation="1" plain @click.stop="drawer = !drawer">
              <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              Menu
            </v-btn>
          </div>
        </div>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                >mitienda.app/{{ tienda.name }}</v-list-item-title
              >
              <span class="sub-email">{{ email }}</span>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminHome' }">
                  <v-list-item-title>Home</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="box" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminAdmin' }">
                  <v-list-item-title>Productos</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="calendar-plus" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminServices' }">
                  <v-list-item-title>Servicios</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="calendar-alt" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminCalendar' }">
                  <v-list-item-title>Calendario</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="dollar-sign" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminOrders' }">
                  <v-list-item-title>Ordenes</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="store" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminTienda' }">
                  <v-list-item-title>Mi Tienda</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="images" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminDisapositivas' }">
                  <v-list-item-title>Diapositivas</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="paint-brush" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminPerzonalizar' }">
                  <v-list-item-title>Personalizar</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="newspaper" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminBlog' }">
                  <v-list-item-title>Blog</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <font-awesome-icon icon="qrcode" />
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="{ name: 'AdminQRCode' }">
                  <v-list-item-title>Codigo QR</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title link
                  ><a @click="CerrarSession()">
                    Cerrar sesion</a
                  ></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </div>
    <div class="desktop_menu" v-if="height > 3">
      <div class="container mt-8">
        <div class="row">
          <div class="col-12 col-lg-12 botonera">
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminHome' }">
                <button class="btn btn-outline-secondary boton">
                  <v-icon>mdi-home</v-icon> HOME
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminAdmin' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="box" /> PRODUCTOS
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminServices' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="calendar-plus" /> SERVICIOS
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminCalendar' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="calendar-alt" /> CALENDARIO
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminOrders' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="dollar-sign" /> ORDENES
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminTienda' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="store" /> MI TIENDA
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminDisapositivas' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="images" /> DIAPOSITIVAS
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminPerzonalizar' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="paint-brush" /> PERZONALIZAR
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminBlog' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="newspaper" /> BLOG
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <router-link :to="{ name: 'AdminQRCode' }">
                <button class="btn btn-outline-secondary boton">
                  <font-awesome-icon icon="qrcode" /> QR CODIGO
                </button>
              </router-link>
            </div>
            <div class="boton_contenedor">
              <button
                class="btn btn-outline-danger boton"
                @click="CerrarSession()"
              >
                <v-icon style="color: red !important">mdi-close</v-icon> SALIR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "admin_menu",

  data() {
    return {
      drawer: null,
      username: "",
      email: "",
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 3;
        case "md":
          return 4;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    ...mapMutations("user", ["ClearUser"]),
    ...mapMutations("tienda", [
      "ClearTienda",
      "ClearCantOrdersNews",
      "ClearMiTienda",
    ]),
    CerrarSession() {
      localStorage.removeItem("access");
      localStorage.removeItem("cod_ref");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("refresh");
      this.ClearUser();
      this.ClearTienda();
      this.ClearCantOrdersNews();
      this.ClearMiTienda();
      this.$router.push({ name: "Main" });
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
}
.v-btn--plain {
  color: black !important;
}

.barra {
  padding: 0px;
  margin: 0px;
}

.home-user h6 {
  margin-right: 30px;
}
.home-user .ih5 {
  margin-right: 4px;
}

.sub-email {
  font-size: 12px;
  color: gray;
}
.username {
  font-size: 16px;
  color: black;
  display: block;
}
.user_menu_email {
  display: block;
  font-size: 12px;
  color: gray;
}
.info_user {
  align-content: center !important;
}

@media only screen and (min-width: 768px) {
  .menu_button {
    justify-content: flex-end !important;
  }
  .botonera {
    display: inline;
    padding-left: 40px;
    background-color: #f5f5f5;
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
  }

  .boton_contenedor {
    height: 70px !important;
    width: 90px !important;
    display: inline-block;
    margin: 3px;
  }

  .boton {
    width: 100%;
    height: 100%;
    font-size: 13px !important;
  }
}
</style>