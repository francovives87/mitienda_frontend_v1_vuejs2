<template>
  <!-- hay que poner el atributo app, para que sea una nav bar -->
  <v-bottom-navigation
    v-model="value"
    fixed
    app
    class="hidden-sm-and-up"
    :background-color="bottom_navigation"
    :dark="theme"

  >
    <v-btn
      value="home"
      :to="{ name: 'TiendaHome', params: { tienda: tienda } }"
    >
      <span>HOME</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      value="store"
      :to="{ name: 'Categories', params: { tienda: tienda } }"
    >
      <span>CATEGORIAS</span>
      <v-icon>mdi-menu</v-icon>
    </v-btn>


    <v-btn
      value="cart"
      class="position-relative"
      :to="{ name: 'TiendaCart', params: { tienda: tienda } }"
    >
      <span>CARRITO</span>
      <!--  <v-badge overlap color="green" :content="badgeCount"> -->
      <v-icon>mdi-cart</v-icon>
      <span
        class="
          position-absolute
          top-10
          start-100
          translate-middle
          badge
          rounded-pill
          bg-success
        "
      >
        {{ count }}
        <span class="visually-hidden">unread messages</span>
      </span>
      <!--  </v-badge> -->
    </v-btn>

    <v-btn value="user" :to="{ name: 'Login', params: { tienda: tienda } }">
      <span>CUENTA</span>
      <v-icon>mdi-account-circle</v-icon>
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
    value: 'hidden-sm-and-up ',
   /*  color: "background-color: #FE1234 !important;", */

  }),

  mounted() {},
  computed: {
    ...mapState("cart", ["count"]),
    ...mapState("tienda", ["tienda"]),

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
  watch: {},
};
</script>

<style>



</style>