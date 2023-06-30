<template>
  <div>
    <v-container style="height: 600px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Cargando tienda...
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

export default {
  name: "tienda_loading",
  components: {


  },
};
</script>

<style>
</style>