<template>
  <v-app-bar app color="dark" dark dense class="hidden-sm-and-down">
    <div class="d-flex align-center">
      <v-toolbar-title>
        <router-link to="/"> mitienda.app </router-link>
      </v-toolbar-title>
    </div>

    <v-container class="d-flex justify-end">
      <span class="beta">(beta 0.9.4)</span>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "main_navbar",

  computed: {
    ...mapState("cart", ["count"]),
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: white !important;
}
</style>