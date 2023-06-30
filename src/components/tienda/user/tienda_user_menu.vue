<template>
  <div class="container mt-8">
    <div class="row d-flex align-items-center">
      <div class="col-8 col-sm-8 info_user ml-2 d-flex justify-content-center">
        <div class="row">
          <div class="col-2 col-sm-2">
            <v-icon class="ih5">mdi-account-circle</v-icon>
          </div>
          <div class="col-10 col-sm-10">
            <span class="username">{{ username }}</span>
            <span class="user_menu_email">{{ email }}</span>
          </div>
        </div>
      </div>
      <div class="col-3 col-sm-3">
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
          <v-list-item-title>{{ username }}</v-list-item-title>
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
            <router-link :to="{ name: 'tienda_home_user' }">
              <v-list-item-title>Home</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="shopping-bag" />
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="{ name: 'tienda_user_all_orders' }">
              <v-list-item-title>Mis Compras</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="calendar-plus" />
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="{ name: 'tienda_user_all_bookins' }">
              <v-list-item-title>Mis Reservas</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="fas fa-edit" />
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="{ name: 'tienda_user_personal_dates' }">
              <v-list-item-title>Mis Datos</v-list-item-title>
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
              ><a @click="CerrarSession()"> Cerrar sesion</a></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tienda_user_menu",

  data() {
    return {
      drawer: null,
      username: "",
      email: "",
      tiendaToClose: 0,
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  methods: {
    ...mapMutations("user", ["ClearUser"]),
    ...mapMutations("tienda", [
      "ClearMiTienda",
      "ClearCantOrdersNews",
      "ClearTienda",
    ]),
    CerrarSession() {
      localStorage.removeItem("access");
      localStorage.removeItem("cod_ref");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("refresh");
      this.tiendaToClose = this.tienda.name;
      this.ClearUser();
      this.ClearMiTienda();
      this.ClearCantOrdersNews();
      this.ClearTienda();
      this.$router.push({
        name: "TiendaHome",
        params: { name: this.tiendaToClose },
      });
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
</style>