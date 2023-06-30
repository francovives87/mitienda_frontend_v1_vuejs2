<template>
  <div class="main_modal_geolocation mt-12">
    <!-- MODAL -->
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <button class="btn btn-success" @click="GetGeoLocation()">
            Obtener Geolocalizacion Automaticamente
            <font-awesome-icon icon="map-marker-alt" />
          </button>
        </div>
        <div class="col-12">
          <div class="text_info">
            <p style="font-size: 14px !important; color: #000000 !important">
              Mitienda.app necesita saber una ubicacion aproximada de donde se
              encuntra, para podes mostrar los resultados de manera correcta y
              eficiente.
            </p>
            <p style="font-size: 14px !important">
              Haga click en el boton <v-icon>mdi-magnify</v-icon> para buscar su
              direccion o mueva el puntero.
            </p>
          </div>
        </div>
      </div>
      <div id="mapa_main" class="mapa_main"></div>
      <div class="row d-flex justify-content-end">
        <div class="col-4 col-lg-2 col-sm-6">
          <button
            type="button"
            class="btn btn-success"
            @click="GuardarGeoLocation()"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <form action="">
      <div class="mb-3">
        <input
          type="hidden"
          class="form-control"
          name="pais"
          id="pais"
          ref="pais"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          class="form-control"
          name="region"
          id="region"
          ref="region"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          class="form-control"
          name="subregion"
          id="subregion"
          ref="subregion"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          class="form-control"
          name="ciudad"
          id="ciudad"
          ref="ciudad"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          name="direccion"
          id="direccion"
          class="form-control"
          ref="direccion"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          name="codigo_postal"
          id="codigo_postal"
          ref="codigo_postal"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <input
          type="hidden"
          class="form-control"
          name="barrio"
          id="barrio"
          ref="barrio"
        />
      </div>

      <input type="hidden" class="form-control" name="lat" id="lat" ref="lat" />
      <input type="hidden" class="form-control" name="lng" id="lng" ref="lng" />
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "main_geolocation_user",
  data() {
    return {
      map_instance: null,
      myPosition: [],
    };
  },

  mounted() {
    this.initMap();
    window.scrollTo(0, 0);
  },
  destroyed() {
    this.map_instance.remove();
  },

  computed: {
    ...mapState("user", ["user_location"]),
  },

  methods: {
    ...mapMutations("user", ["AddUserLocation"]),
    GuardarGeoLocation() {
      if (this.$refs.lat.value == "" && this.$refs.lng.value == "") {
        this.$swal.fire(
          "Debe situar el pin en una ubicacion valida",
          "Intente nuevamente.",
          "error"
        );
      } else {
        this.myPosition = [];
        localStorage.setItem("lat", parseFloat(this.$refs.lat.value));
        localStorage.setItem("lng", parseFloat(this.$refs.lng.value));
        localStorage.setItem("pais", this.$refs.pais.value.toLowerCase());
        localStorage.setItem("region", this.$refs.region.value.toLowerCase());
        localStorage.setItem(
          "subregion",
          this.$refs.subregion.value.toLowerCase()
        );
        localStorage.setItem("ciudad", this.$refs.ciudad.value.toLowerCase());
        localStorage.setItem(
          "direccion",
          this.$refs.direccion.value.toLowerCase()
        );
        localStorage.setItem(
          "codigo_postal",
          this.$refs.codigo_postal.value.toLowerCase()
        );
        localStorage.setItem("barrio", this.$refs.barrio.value.toLowerCase());

        console.log("ACA CA");
        console.log(parseFloat(this.$refs.lat.value));
        console.log(parseFloat(this.$refs.lng.value));
        this.geoData = {
          pais: localStorage.getItem("pais"),
          region: localStorage.getItem("region"),
          subregion: localStorage.getItem("subregion"),
          ciudad: localStorage.getItem("ciudad"),
          codigo_postal: localStorage.getItem("codigo_postal"),
          barrio: localStorage.getItem("barrio"),
          lat: localStorage.getItem("lat"),
          lng: localStorage.getItem("lng"),
        };
        this.AddUserLocation(this.geoData);
        this.showModal = false;
        this.$swal.fire(
          "Geolocalizacion Confirmada!",
          "Mitienda va a encontrar los mejores resultados.",
          "success"
        );
        localStorage.setItem("setLocation", 2);
        this.$router.push({
          name: "Main",
        });
      }
    },

    GetGeoLocation() {
      navigator.geolocation.getCurrentPosition(this.GetPosition);
    },

    GetPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      if (position) {
        localStorage.setItem("setLocation", 1);
        this.myPosition.push(position.coords.latitude);
        this.myPosition.push(position.coords.longitude);
        this.ReverseGeocode();
      }
    },

    ReverseGeocode() {
      //Geocode Service
      let that = this;
      const geocodeService = L.esri.Geocoding.geocodeService({
        apikey:
          "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M",
      });
      geocodeService
        .reverse()
        .latlng(this.myPosition, 13)
        .run(function (error, resultado) {
          if (error) {
            console.log(error);
          }
          console.log("resultado reverse geo");
          console.log(resultado);

          localStorage.setItem("lat", parseFloat(that.myPosition[0]));
          localStorage.setItem("lng", parseFloat(that.myPosition[1]));
          localStorage.setItem(
            "pais",
            resultado.address.CountryCode.toLowerCase()
          );
          localStorage.setItem(
            "region",
            resultado.address.Region.toLowerCase()
          );
          localStorage.setItem(
            "subregion",
            resultado.address.Subregion.toLowerCase()
          );
          localStorage.setItem("ciudad", resultado.address.City.toLowerCase());
          localStorage.setItem(
            "direccion",
            resultado.address.Address.toLowerCase()
          );
          localStorage.setItem(
            "codigo_postal",
            resultado.address.Postal.toLowerCase()
          );
          localStorage.setItem(
            "barrio",
            resultado.address.Neighborhood.toLowerCase()
          );
          that.geoData = {
            pais: resultado.address.CountryCode.toLowerCase(),
            region: resultado.address.Region.toLowerCase(),
            subregion: resultado.address.Subregion.toLowerCase(),
            ciudad: resultado.address.City.toLowerCase(),
            barrio: resultado.address.Neighborhood.toLowerCase(),
            direccion: resultado.address.Address.toLowerCase(),
            codigo_postal: resultado.address.Postal.toLowerCase(),
            lat: that.myPosition[0],
            lng: that.myPosition[1],
          };
          console.log("latid y lng del geocode");
          that.lat = resultado.latlng.lat;
          that.lng = resultado.latlng.lng;
          console.log(that.lat);
          console.log(that.lng);

          that.AddUserLocation(that.geoData);
          that.miUbicacion = that.geoData.ciudad;
          console.log(that.geoData);
          that.$swal.fire(
            "Geolocalizacion obtenida automaticamente!",
            "Ahora Mitienda encontrara los resultados mas optimos.",
            "success"
          );
          that.$router.push({ name: "Main" });
        });
    },

    /* MAP GEO */

    initMap() {
      const apiKey =
        "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M";
      const basemapEnum = "ArcGIS:Streets";

      var lat = null;
      var lng = null;

      if (this.user_location.lat && this.user_location.lng) {
        lat = this.user_location.lat;
        lng = this.user_location.lng;
      } else {
        lat = -34.6075682;
        lng = -58.4370894;
      }

      console.log("initMAP");

      var mymap = L.map("mapa_main").setView([lat, lng], 13);
      this.map_instance = mymap;

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
        draggable: true,
        autoPan: true,
      }).addTo(mymap);

      //Agrego pin a las capas para poder limpiarlo al de arranque
      markers.addLayer(marker);

      //Geocode Service
      const geocodeService = L.esri.Geocoding.geocodeService({
        apikey:
          "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M",
      });

      reubicarPin(marker);

      function reubicarPin(marker) {
        //Detectar movimiento del marker
        marker.on("moveend", function (e) {
          marker = e.target;

          const posicion = marker.getLatLng();

          //Centrar mapa
          mymap.panTo(new L.LatLng(posicion.lat, posicion.lng));

          //Reverse Geocoding, cuando el user reubica el pin
          geocodeService
            .reverse()
            .latlng(posicion, 13)
            .run(function (error, resultado) {
              if (error) {
                console.log(error);
              }
              console.log(resultado);

              marker.bindPopup(resultado.address.Address);
              marker.openPopup();

              // Llenar los campos
              llenarCampos(resultado);
            });
        });
      }

      /* BUSCAR DIRECCIONES */
      /* control */
      const searchControl = L.esri.Geocoding.geosearch({
        position: "topleft",
        placeholder: "Enter an address or place e.g. 1 York St",
        useMapBounds: false,
        providers: [
          L.esri.Geocoding.arcgisOnlineProvider({
            apikey: apiKey,
            nearby: {
              lat: -33.8688,
              lng: 151.2093,
            },
          }),
        ],
      }).addTo(mymap);

      const results = L.layerGroup().addTo(mymap);

      searchControl.on("results", (data) => {
        results.clearLayers();
        for (let i = data.results.length - 1; i >= 0; i--) {
          const lngLatString = `${
            Math.round(data.results[i].latlng.lng * 100000) / 100000
          }, ${Math.round(data.results[i].latlng.lat * 100000) / 100000}`;

          //Limpiamos pines previos
          markers.clearLayers();

          /* pongo pin */
          marker = L.marker(data.results[i].latlng, {
            draggable: true,
            autoPan: true,
          }).addTo(mymap);

          marker.bindPopup(
            `<b>${lngLatString}</b><p>${data.results[i].properties.address}</p>`
          );
          results.addLayer(marker);
          marker.openPopup();

          //mover el pin
          reubicarPin(marker);

          //Reverse Geocoding, cuando el user reubica el pin
          geocodeService
            .reverse()
            .latlng(data.results[i].latlng, 13)
            .run(function (error, resultado) {
              if (error) {
                console.log(error);
              }
              console.log(resultado);

              marker.bindPopup(resultado.address.Address);
              marker.openPopup();

              // Llenar los campos
              llenarCampos(resultado);
            });
        }
      });

      function llenarCampos(resultado) {
        document.querySelector("#pais").value = resultado.address.CountryCode;
        document.querySelector("#region").value = resultado.address.Region;
        document.querySelector("#subregion").value =
          resultado.address.Subregion;
        document.querySelector("#ciudad").value = resultado.address.City;
        document.querySelector("#direccion").value = resultado.address.Address;
        document.querySelector("#codigo_postal").value =
          resultado.address.Postal;
        document.querySelector("#barrio").value =
          resultado.address.Neighborhood;
        document.querySelector("#lat").value = resultado.latlng.lat;
        document.querySelector("#lng").value = resultado.latlng.lng;
      }

      function showPosition() {
        //Limpiamos pines previos
        markers.clearLayers();

        //Centrar mapa
        mymap.panTo(new L.LatLng(this.myPosition));

        //Agregando el pin
        marker = L.marker([this.myPosition], {
          draggable: true,
          autoPan: true,
        }).addTo(mymap);

        //Agrego pin a las capas para poder limpiarlo al de arranque
        markers.addLayer(marker);

        //mover el pin
        reubicarPin(marker);
      }
    },

    CloseModal(event) {
      this.map_instance.remove();
      this.$emit("clicked", "closeModal");
    },
  },
};
</script>

<style scoped>
.btn-success {
  color: #ffffff !important;
  background-color: #a463bf;
  border-color: #a463bf !important;
}

@media only screen and (max-width: 768px) {
  .mapa_main {
    height: 400px;
    width: 100%;
  }
}
@media only screen and (min-width: 768px) {
  .mapa_main {
    height: 300px;
    width: 100%;
  }
}
</style>