<template>
  <div>
    <main_barra_mobile />
    <v-container style="height: 400px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Cargando aplicacion...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import main_barra_mobile from "../../components/main/main_barra_mobile.vue";
export default {
  name: "tienda_loading",
  components: {
    main_barra_mobile,

  },
};
</script>

<style>
</style>