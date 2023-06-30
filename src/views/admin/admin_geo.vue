<template>
  <div class="admin_geo mt-10">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6>Geolocalizacion y mapa</h6>
          <span style="font-size: 12px"
            >Permita que el navegador tome su ubicacion para ser mas preciso la
            geolocalizacion, este lo hara de forma automatica.</span
          ><br />
          <span style="font-size: 12px"
            >La ubicacion sera aproximada,mueva el marcador al lugar exacto de
            su ubicacion</span
          >
          <br />
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div id="mapa" style="height: 300px"></div>
          </div>
          <div class="col-12 col-sm-12">
            <span
              >Confirme que los datos de su ubuciacion son correctos, y guarde
              los cambios</span
            >
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <form action="">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Pais</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="pais"
                  id="pais"
                  ref="pais"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Region/estado/provincia</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="region"
                  id="region"
                  ref="region"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Subregion(departamento)</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="subregion"
                  id="subregion"
                  ref="subregion"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Ciudad</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="ciudad"
                  id="ciudad"
                  ref="ciudad"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Direccion</label
                >
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  class="form-control"
                  ref="direccion"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Codigo postal</label
                >
                <input
                  type="text"
                  name="codigo_postal"
                  id="codigo_postal"
                  ref="codigo_postal"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <span style="font-size: 12px"
                  >Si el sistema de Geolocalizacion no puede detectar su barrio,
                  es recomendable que los complete manualmente, tal cual figura
                  en el mapa.</span
                ><br />
                <label for="exampleFormControlInput1" class="form-label"
                  >Barrio</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="barrio"
                  id="barrio"
                  ref="barrio"
                />
              </div>

              <input
                type="hidden"
                class="form-control"
                name="lat"
                id="lat"
                ref="lat"
              />
              <input
                type="hidden"
                class="form-control"
                name="lng"
                id="lng"
                ref="lng"
              />
            </form>
            <v-divider></v-divider>
          </div>
          <div class="col-12 col-sm-12 d-flex justify-content-end">
            <button type="button" class="btn btn-success" @click="Guardar()">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";

export default {
  name: "admin_geo",
  components: {
    admin_menu,
  },
  data() {
    return {
      exits: false,
      myPosition: [],
      existing_geodata: [],
      geoDate: {
        tienda: null,
        pais: null,
        region: null,
        subregion: null,
        ciudad: null,
        direccion: null,
        codigo_postal: null,
        barrio: null,
        location: {
          type: "Point",
          coordinates: [],
        },
      },
    };
  },

  created() {
    this.Guard();
    this.CheckIfExistsGeo();
  },

  mounted() {
    this.ObtenerLanLgnDelNavegador();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    ...mapState("user", ["user_store", "user_location"]),
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

    CheckIfExistsGeo() {
      let data = {
        tienda: this.tienda.id,
      };

      axios
        .post(this.server + "/api/v1.0/tienda/geo/exists/", data)
        .then((response) => {
          this.exits = true;
          this.existing_geodata = response.data;
          console.log("existing_geodata");
          console.log(this.existing_geodata);
        })
        .catch((error) => {
          console.log(error);
          this.exits = false;
        });
    },

    CreateGeolocalization() {
      console.log("guardo");
      var coords = [];
      coords.push(parseFloat(this.$refs.lng.value));
      coords.push(parseFloat(this.$refs.lat.value));

      console.log(coords);

      var data = {
        tienda: this.tienda.id,
        pais: this.$refs.pais.value.toLowerCase(),
        region: this.$refs.region.value.toLowerCase(),
        subregion: this.$refs.subregion.value.toLowerCase(),
        ciudad: this.$refs.ciudad.value.toLowerCase(),
        direccion: this.$refs.direccion.value.toLowerCase(),
        codigo_postal: this.$refs.codigo_postal.value.toLowerCase(),
        barrio: this.$refs.barrio.value.toLowerCase(),
        location: {
          type: "Point",
          coordinates: coords,
        },
      };
      axios
        .post(this.server + "/api/v1.0/admin/geo/create/", data)
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Geolocalizacion Creada!",
            "Geolocalizacion creada con exito.",
            "success"
          );
          this.CheckIfExistsGeo();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdateGeolocalization() {
      console.log("Actualizo");
      var coords = [];
      coords.push(parseFloat(this.$refs.lng.value));
      coords.push(parseFloat(this.$refs.lat.value));

      console.log(coords);

      var data = {
        tienda: this.tienda.id,
        pais: this.$refs.pais.value.toLowerCase(),
        region: this.$refs.region.value.toLowerCase(),
        subregion: this.$refs.subregion.value.toLowerCase(),
        ciudad: this.$refs.ciudad.value.toLowerCase(),
        direccion: this.$refs.direccion.value.toLowerCase(),
        codigo_postal: this.$refs.codigo_postal.value.toLowerCase(),
        barrio: this.$refs.barrio.value.toLowerCase(),
        location: {
          type: "Point",
          coordinates: coords,
        },
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/geo/update/" +
            this.existing_geodata.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Geolocalizacion Actualizada!",
            "Geolocalizacion actualizada con exito.",
            "success"
          );
          this.CheckIfExistsGeo();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Guardar() {
      if (this.exits == false) {
        console.log("guardo");
        this.CreateGeolocalization();
      }
      if (this.exits == true) {
        console.log("actualizo");
        this.UpdateGeolocalization();
      }
    },

    ObtenerLanLgnDelNavegador() {
      console.log("obtenerLanLgnDelNavegador");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.ShowPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },

    ShowPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this.myPosition.push(position.coords.latitude);
      this.myPosition.push(position.coords.longitude);

      console.log("this.myPosition");
      console.log(this.myPosition);

      if (this.myPosition.length > 0) {
        this.initMap();
      }
    },

    initMap() {
      const apiKey =
        "AAPKd60505f0373545ce951ffc946865cc5et2lcZrdrn52uhoxGm-jD6TRwZj-rXoQz7tQg3AkVs7f0Tq_TcWLEpZ7CtMczRB2M";
      const basemapEnum = "ArcGIS:Streets";

      const lat = this.user_location.lat;
      const lng = this.user_location.lng;

      console.log("initMAP");
      console.log(this.user_location.lat);
      console.log(this.user_location.lng);

      var mymap = L.map("mapa").setView([lat, lng], 16);

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

      function obtenerLanLgnDelNavegador() {
        console.log("obtenerLanLgnDelNavegador");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }

      function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        //Limpiamos pines previos
        markers.clearLayers();

        //Centrar mapa
        mymap.panTo(
          new L.LatLng(position.coords.latitude, position.coords.longitude)
        );

        //Agregando el pin
        marker = L.marker(
          [position.coords.latitude, position.coords.longitude],
          {
            draggable: true,
            autoPan: true,
          }
        ).addTo(mymap);

        //Agrego pin a las capas para poder limpiarlo al de arranque
        markers.addLayer(marker);

        //mover el pin
        reubicarPin(marker);
      }

      /* BUSCAR DIRECCIONES */
      /* control */
      const searchControl = L.esri.Geocoding.geosearch({
        position: "topright",
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
  },
};
</script>

<style scopde>
.leaflet-control-zoom-in {
  color: #000000 !important;
}
.leaflet-control-zoom-out {
  color: #000000 !important;
}

#mapa {
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #323232;
}
.geocoder-control-suggestions leaflet-bar {
  color: #000000 !important;
}
</style>