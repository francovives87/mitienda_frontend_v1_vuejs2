<template>
  <div class="container">
    <div class="row">
      <div class="col-3 col-sm-3">
        <v-btn class="menu" plain @click.stop="drawer = !drawer">
          <v-icon dark> mdi-format-list-bulleted-square </v-icon>
          Menu
        </v-btn>
      </div>
      <div class="col-6 col-sm-6 info_user">
        <span class="username">{{ username }}</span>
        <span class="user_menu_email">{{ email }}</span>
      </div>
      <div class="col-3 col-sm-3 home-user d-flex flex-row-reverse">
        <h6><v-icon class="ih5">mdi-account-circle</v-icon>MI CUENTA</h6>
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
            <font-awesome-icon icon="shopping-bag" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Mis Compras</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="user-edit" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Mis Datos</v-list-item-title>
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
import { mapState } from "vuex";
export default {
  name: "user_menu",

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
  computed:{
    ...mapState("tienda", ["tienda"]),
  },
  methods: {
    CerrarSession() {
      localStorage.clear();
      if (this.tienda !== [] ){
        this.$router.push({ name: "TiendaHome" ,params:{tienda:this.tienda} });
      } else {
      this.$router.push({ name: "Main" });
      }
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
.info_user{
  align-content: center !important;
}
</style>