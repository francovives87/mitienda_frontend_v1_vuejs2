<template>
  <v-app-bar app color="dark" dark dense class="hidden-sm-and-down">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title><router-link to="/">  minegocio.me </router-link></v-toolbar-title>
    </div>
    <v-container class="d-flex justify-end">
      
    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
      
      <v-btn icon to="/categories">
        <v-icon>mdi-store</v-icon>
      </v-btn>

      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to="/login">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn icon to="/cart">
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
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_navbar",

  computed: {
    ...mapState("cart", ["count"]),
  },
};
</script>

<style>
a {
  text-decoration: none !important;
  color:white !important;
}
</style>