<template>
  <div class="qrcode">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6><font-awesome-icon icon="qrcode" /> Codigo QR</h6>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="row d-flex justify-content-end" v-if="vista == 0">
        <div class="col-4 col-sm-4">
          <span style="font-size: 12px"> Crear Codigo QR </span>
        </div>
        <div class="col-2 col-sm-2 mr-4">
          <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
            <v-btn elevation="4" icon @click="CreateQrCode()">
              <font-awesome-icon icon="qrcode" />
            </v-btn>
          </v-badge>
        </div>
      </div>
      <div class="row" v-if="vista == 1">
        <div class="col-12 col-sm-12 d-flex justify-content-center">
          <img :src="tienda.logo" alt="" style="width: 50px; heigth: 50px" />
        </div>
        <div
          class="col-12 col-sm-12 d-flex justify-content-center"
          v-if="tienda.title"
        >
          <h6>{{ tienda.title }}</h6>
        </div>
        <div class="col-12 col-sm-12 d-flex justify-content-center">
          <img :src="qr_code" alt="" style="width: 300px; heigth: 300px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
export default {
  name: "admin_qrcode",
  components: {
    admin_menu,
  },
  data() {
    return {
      vista: 0,
      qr_code: null,
    };
  },

  created() {
    this.Guard();
  },

  mounted() {
    this.HaveQr();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  methods: {
    /* el metodo guard sirve de permiso, para que no se cargue una vista Admin si no es de su tienda */
    Guard() {
      console.log("GUARD!");
      if (this.tienda.user != localStorage.getItem("cod_ref")) {
        console.log("este es un loquito");
        this.$router.push({
          name: "Main",
        });
      }
    },

    HaveQr() {
      axios
        .get(
          this.server + "/api/v1.0/store/qrcode/get/?tienda=" + this.tienda.id
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.count == 0) {
            console.log("No hay qr");
            this.vista = 0;
          } else {
            console.log("HAY QR");
            this.vista = 1;
            this.qr_code = response.data.results[0].qr_code;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateQrCode() {
      let data = {
        tienda: this.tienda.id,
      };

      axios
        .post(this.server + "/api/v1.0/store/qrcode/create/", data)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Codigo QR Creado!",
            "Se ha creado con exito el codigo QR para su tienda!",
            "success"
          );
          this.HaveQr();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>