<template>
  <div>
    <v-app-bar color="#212529" dense fixed class="hidden-md-and-up" dark>
      <v-toolbar-title>mitienda.app</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="beta">(beta 0.9.4)</span>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "main_barra_mobile",
};
</script>

<style scoped>
.beta {
  font-size: 13px !important;
  margin-left: 4px !important;
}
</style>