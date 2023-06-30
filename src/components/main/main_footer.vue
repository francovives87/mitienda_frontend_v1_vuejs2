<template>
  <v-footer padless color="#6a1b9a" class="">
    <v-col class="copyright text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>mitienda.app</strong>
      &nbsp; &nbsp;
      <v-btn
        elevation="4"
        icon
        style="background-color: white"
        @click="WhatsAppContact()"
        
      >
        <v-icon color="green">mdi-whatsapp</v-icon>
      </v-btn>
      <br />
    </v-col>
     <v-col cols="12" class="d-flex justify-content-center" style="color: #ffffff">
      <span style="font-size: 14px"> <span style="font-size: 14px"><font-awesome-icon icon="fa-envelope" /> </span> contacto@mitienda.app </span> <br />
    </v-col>
    <v-col cols="12" class="d-flex justify-content-end" style="color: #ffffff">
      <span style="font-size: 11px"> VERSION<span> 1.0.0 (beta) </span></span> <br />
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "main_footer",

  methods: {
    WhatsAppContact() {
      window.open("https://api.whatsapp.com/send?phone=5493416560046", "_blank");
    },
  },
};
</script>

<style scoped>
.copyright {
  color: white !important;
}
</style>
