<template>
  <div class="tienda_datos_ventas">
    <div class="container mt-10">
      <div class="row">
        <h6><font-awesome-icon icon="shopping-bag" /> Finalizar Compra</h6>
      </div>
      <div class="container">
        <div class="row d-flex align-items-center">
          <tienda_cart_summary></tienda_cart_summary>
          <div class="col-5 d-flex justify-content-end">
            <v-btn
              color="green"
              elevation="2"
              large
              outlined
              @click="Continuar()"
            >
              CONTINUAR <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <h6>
          <font-awesome-icon icon="user-edit" /> Datos de facturacion y envio
        </h6>
        <div v-if="anonymous == false">
          <p
            class="alert alert-success sub_primera_compra"
            v-if="hayDatos == false"
            role="alert"
          >
            Esta va a ser su primer compra, por favor complete el formualario,
            para facturacion y envio. Los datos se guardaran en su cuenta, asi
            no tendra que completarlo nuevamente.
          </p>
        </div>
        <div v-if="anonymous == true">
          <p
            class="alert alert-success sub_primera_compra"
            v-if="hayDatos == false"
            role="alert"
          >
            Va a realizar una orden sin estar registrado, recomendamos por seguridad, y para no tener 
            que volver a completar todos los datos en cada orden, que se registre de manera gratuita. <br>
            Igualmente si no desea hacerlo, no hay ningun incoveniente, y esperamos que disfrute su compra.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="card">
            <h5 class="card-header">Mis Datos</h5>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="Nombre" class="form-label">Nombre</label>
                  <input
                    type="input"
                    class="form-control"
                    id="Nombre"
                    v-model="personalData.nombre"
                  />
                </div>
                <div class="mb-3">
                  <label for="apellido" class="form-label">Apellido</label>
                  <input
                    type="input"
                    class="form-control"
                    id="apellido"
                    v-model="personalData.apellido"
                  />
                </div>
                <div class="mb-3" v-if="anonymous == true">
                  <label for="pais" class="form-label"
                    >Correo electronico</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="pais"
                    v-model="personalData.email"
                  />
                </div>
                <div class="mb-3">
                  <label for="pais" class="form-label">pais</label>
                  <input
                    type="input"
                    class="form-control"
                    id="pais"
                    v-model="personalData.pais"
                  />
                </div>
                <div class="mb-3">
                  <label for="ciudad" class="form-label">ciudad</label>
                  <input
                    type="input"
                    class="form-control"
                    id="ciudad"
                    v-model="personalData.ciudad"
                  />
                </div>
                <div class="mb-3">
                  <label for="estado" class="form-label"
                    >Provincia/Estado</label
                  >
                  <input
                    type="input"
                    class="form-control"
                    id="estado"
                    v-model="personalData.estado"
                  />
                </div>
                <div class="mb-3">
                  <label for="direccion" class="form-label">direccion</label>
                  <input
                    type="input"
                    class="form-control"
                    id="direccion"
                    v-model="personalData.direccion"
                  />
                </div>
                <div class="mb-3">
                  <label for="apartamento" class="form-label"
                    >apartamento</label
                  >
                  <input
                    type="input"
                    class="form-control"
                    id="apartamento"
                    v-model="personalData.apartamento"
                  />
                </div>
                <div class="mb-3">
                  <label for="cod_postal" class="form-label"
                    >codigo postal
                  </label>
                  <input
                    type="input"
                    class="form-control"
                    id="cod_postal"
                    v-model="personalData.codigo_postal"
                  />
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">telefono</label>
                  <input
                    type="input"
                    class="form-control"
                    id="telefono"
                    v-model="personalData.telefono"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tienda_cart_summary from "../../components/tienda/tienda_cart_summary.vue";
export default {
  name: "tienda_datos_ventas",
  components: {
    tienda_cart_summary,
  },
  data() {
    return {
      personalData: {
        nombre: "",
        apellido: "",
        pais: "",
        ciudad: "",
        estado: "",
        direccion: "",
        apartamento: "",
        codigo_postal: "",
        telefono: "",
        email: "",
        id: 0,
      },
      hayDatos: false,
      anonymous: false,
      anonymous_data: {},
    };
  },

  created() {
    this.GetUserPersonalData();
  },
  mounted() {},
  methods: {
    GetUserPersonalData() {
      axios
        .get(
          this.server +
            "/api/v1.0/user/personal/" +
            localStorage.getItem("cod_ref")
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.data.results);
          if (response.data.results.length > 0) {
            this.hayDatos = true;
            this.personalData = {
              nombre: response.data.results[0]["nombre"],
              apellido: response.data.results[0]["apellido"],
              pais: response.data.results[0]["pais"],
              ciudad: response.data.results[0]["ciudad"],
              estado: response.data.results[0]["estado"],
              direccion: response.data.results[0]["direccion"],
              apartamento: response.data.results[0]["apartamento"],
              codigo_postal: response.data.results[0]["codigo_postal"],
              telefono: response.data.results[0]["telefono"],
              id: response.data.results[0]["id"],
            };
          }
        })
        .catch((error) => {
          console.log("eso seria el error?");
          this.anonymous = true;
          console.log(this.anonymous);
        });
    },
    Continuar() {
      if (this.anonymous == false) {
        if (this.hayDatos == false) {
          this.CreatePersonaData();
        } else {
          this.UpdatedPersonalData();
        }
      } else {
        this.CreateAnonymousData();
      }
    },

    CreateAnonymousData() {
      let data = {
        user: localStorage.getItem("cod_ref"),
        nombre: this.personalData.nombre,
        apellido: this.personalData.apellido,
        pais: this.personalData.pais,
        ciudad: this.personalData.ciudad,
        estado: this.personalData.estado,
        direccion: this.personalData.direccion,
        apartamento: this.personalData.apartamento,
        codigo_postal: this.personalData.codigo_postal,
        telefono: this.personalData.telefono,
        email: this.personalData.email,
      };
      axios
        .post(this.server + "/api/v1.0/anonymous/create/", data)
        .then((response) => {
          console.log(response.data);
          this.anonymous_data = response.data;
          console.log(this.anonymous_data_id);
          this.$router.push({
            name: "TiendaCheckout",
            params: { anonymous_data: this.anonymous_data },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreatePersonaData() {
      let data = {
        user: localStorage.getItem("cod_ref"),
        nombre: this.personalData.nombre,
        apellido: this.personalData.apellido,
        pais: this.personalData.pais,
        ciudad: this.personalData.ciudad,
        estado: this.personalData.estado,
        direccion: this.personalData.direccion,
        apartamento: this.personalData.apartamento,
        codigo_postal: this.personalData.codigo_postal,
        telefono: this.personalData.telefono,
      };
      axios
        .post(this.server + "/api/v1.0/user/personal/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "TiendaCheckout",
            params: {
              personalData: this.personalData,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    UpdatedPersonalData() {
      let data = {
        user: localStorage.getItem("cod_ref"),
        nombre: this.personalData.nombre,
        apellido: this.personalData.apellido,
        pais: this.personalData.pais,
        ciudad: this.personalData.ciudad,
        estado: this.personalData.estado,
        direccion: this.personalData.direccion,
        apartamento: this.personalData.apartamento,
        codigo_postal: this.personalData.codigo_postal,
        telefono: this.personalData.telefono,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/user/personal/update/" +
            this.personalData.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "TiendaCheckout",
            params: {
              personalData: this.personalData,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.sub_primera_compra {
  font-size: 14px !important;
}
</style>