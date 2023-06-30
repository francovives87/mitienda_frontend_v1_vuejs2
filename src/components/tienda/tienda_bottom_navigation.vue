<template>
  <!-- hay que poner el atributo app, para que sea una nav bar -->
  <v-bottom-navigation
    v-model="value"
    fixed
    app
    class="hidden-sm-and-up mt-6"
    :background-color="bottom_navigation"
    :dark="theme"
  >
    <v-btn value="home" :to="{ name: 'TiendaHome', params: { name: tienda.name } }">
      <span>HOME</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="store" :to="{ name: 'Explore', params: { name: tienda.name } }">
      <span>EXPLORAR</span>
      <span style="font-size: 19px !important" class="mb-1">
        <font-awesome-icon icon="fa-compass" />
      </span>
    </v-btn>

    <v-btn
      value="cart"
      class="position-relative"
      :to="{ name: 'TiendaCart', params: { name: tienda.name } }"
    >
      <span>CARRITO</span>
      <!--  <v-badge overlap color="green" :content="badgeCount"> -->
      <v-icon>mdi-cart</v-icon>
      <span
        class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-success"
      >
        {{ count }}
        <span class="visually-hidden">unread messages</span>
      </span>
      <!--  </v-badge> -->
    </v-btn>

    <v-btn value="user" @click="GoToAdminOrMainAccount()" class="position-relative">
      <span v-if="tienda.id != mitienda.id">CUENTA</span>
      <span v-if="tienda.id === mitienda.id">MI TIENDA</span>
      <v-icon v-if="tienda.id != mitienda.id">mdi-account-circle</v-icon>
      <v-icon v-if="tienda.id === mitienda.id">mdi-store</v-icon>
      <span
        class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-success"
        v-if="tienda.id === mitienda.id"
      >
        {{ cantNewsNotifications }}
        <span class="visually-hidden">unread messages</span>
      </span>
      <!--  </v-badge> -->
    </v-btn>
  </v-bottom-navigation>

  <!--  <div class="v-bottom-navigation hidden-sm-and-up v-item-group theme--dark v-bottom-navigation--fixed" style="height: 56px; transform: none; background-color: rgb(50, 60, 80); border-color: rgb(33, 37, 41);"><a href="/tienda1" aria-current="page" class="v-btn--active v-btn--active v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-btn--active v-size--default" value="home"><span class="v-btn__content"><span>HOME</span><i aria-hidden="true" class="v-icon notranslate mdi mdi-home theme--dark"></i></span></a><a href="/tienda1/categories" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" value="store"><span class="v-btn__content"><span>CATEGORIAS</span><i aria-hidden="true" class="v-icon notranslate mdi mdi-menu theme--dark"></i></span></a><a href="/tienda1/search" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" value="search"><span class="v-btn__content"><span>BUSCAR</span><i aria-hidden="true" class="v-icon notranslate mdi mdi-magnify theme--dark"></i></span></a><a href="/tienda1/cart" class="position-relative v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" value="cart"><span class="v-btn__content"><span>CARRITO</span><i aria-hidden="true" class="v-icon notranslate mdi mdi-cart theme--dark"></i><span class="
        position-absolute
        top-10
        start-100
        translate-middle
        badge
        rounded-pill
        bg-success
      "> 0 <span class="visually-hidden">unread messages</span></span></span></a><a href="/tienda1/login" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" value="user"><span class="v-btn__content"><span>CUENTA</span><i aria-hidden="true" class="v-icon notranslate mdi mdi-account-circle theme--dark"></i></span></a></div> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_bottom_navigation",
  data: () => ({
    value: "hidden-sm-and-up ",
    /*  color: "background-color: #FE1234 !important;", */
  }),

  mounted() {},
  computed: {
    ...mapState("cart", ["count"]),
    ...mapState("tienda", ["tienda", "mitienda", "cantNewsNotifications"]),

    bottom_navigation() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].bottom_navigation;
      }
    },
    theme() {
      if (!this.tienda.name) {
        return true;
      } else {
        return this.tienda.tienda_colors[0].bottom_navigation_font;
      }
    },
  },
  methods: {
    GoToAdminOrMainAccount() {
      let user = localStorage.getItem("cod_ref");
      if (user == this.tienda.user) {
        this.$router.push({
          name: "AdminHome",
        });
      } else {
        this.$router.push({
          name: "tienda_home_user",
        });
      }
    },
  },
};
</script>

<style></style>
