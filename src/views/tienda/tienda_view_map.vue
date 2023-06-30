<template>
  <div class="tienda_view_map mt-12" :style="Home">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div id="mapaView" style="height: 400px"></div>
        </div>
      </div>
    </div>
        <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="3"
      class="botoon d-none d-block d-sm-none"
    >
      <div class="d-flex justify-content-center">
        <v-btn
          elevation="2"
          x-large
          :style="text_button"
          @click="GoToTiendaHome()"
        >
          <font-awesome-icon icon="chevron-circle-left" />&nbsp; volver
        </v-btn>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_view_map",
  props: ["geoLatLng"],

  data() {
    return {
      point: "",
      lat:"",
      lng:"",
    };
  },
    computed: {
    ...mapState("tienda", ["tienda"]),

    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; min-height:100% !important;"
          );
        }
      }
    },

        text_button() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return (
          "color: " +
          this.tienda.tienda_colors[0].navbar +
          "!important; font-weight: bold;"
        );
      }
    },
  },

  mounted() {
    console.log("desde la vista nueva");
    console.log(this.geoLatLng);
    this.point = this.geoLatLng.point
    console.log(this.point);
    var newpoint=this.point.split(' ')
    console.log(newpoint);
    /* en django y js las coors estan cruzadas, en django primero va la lng */
    this.lat = parseFloat(newpoint[1])
    this.lng = parseFloat(newpoint[0])
    console.log(this.lat);
    console.log(this.lng);
    this.InitMap();
  },

  methods: {
    InitMap() {
      const apiKey =
        "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M";
      const basemapEnum = "ArcGIS:Streets";

      const lat = this.lat;
      const lng = this.lng;

      var mymap = L.map("mapaView").setView([lat, lng], 16);

      //Eliminar pines previos
      let markers = new L.FeatureGroup().addTo(mymap);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoiZXppb25zdHVkaW8iLCJhIjoiY2tvcTR5bWhsMG5vdzJucnl3MXNmNG4zbCJ9.dVIGb_KiSS7PHilup4T9xA",
        }
      ).addTo(mymap);

      let marker;

      //Agregando el pin
      marker = L.marker([lat, lng], {
        draggable: false,
        autoPan: true,
      }).addTo(mymap);

      //Agrego pin a las capas para poder limpiarlo al de arranque
      markers.addLayer(marker);
    },

    GoToTiendaHome(){
      this.$router.push({
        name:'TiendaHome',
        params:{
          name: this.tienda.name
        }
      })
    },
  },
};
</script>

<style scoped>
.botoon {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 50px !important;
}

</style>