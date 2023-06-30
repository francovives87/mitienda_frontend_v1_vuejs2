<template>
  <v-footer padless color="#000000" class="">
    <v-col class="copyright text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Franco Vives</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "tienda_footer",
};
</script>

<style scoped>
.copyright{
  color: white !important;
}

</style>
