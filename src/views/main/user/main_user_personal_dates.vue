<template>
  <div class="user_personal_dates mt-12">
    <main_user_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="fas fa-edit" />
            <span class="ml-2"> Mis Datos</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="card">
            <h5 class="card-header">Mis Datos</h5>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <div class="mb-3">
                      <label for="Nombre" class="form-label">Nombre</label>
                      <input
                        type="input"
                        class="form-control"
                        id="Nombre"
                        v-model="personalData.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-6 col-sm-6">
                    <div class="mb-3">
                      <label for="apellido" class="form-label">Apellido</label>
                      <input
                        type="input"
                        class="form-control"
                        id="apellido"
                        v-model="personalData.apellido"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <div class="mb-3">
                      <label for="pais" class="form-label">pais</label>
                      <input
                        type="input"
                        class="form-control"
                        id="pais"
                        v-model="personalData.pais"
                      />
                    </div>
                  </div>
                  <div class="col-6 col-sm-6">
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
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 col-sm-6">
                    <div class="mb-3">
                      <label for="ciudad" class="form-label">ciudad</label>
                      <input
                        type="input"
                        class="form-control"
                        id="ciudad"
                        v-model="personalData.ciudad"
                      />
                    </div>
                  </div>
                  <div class="col-6 col-sm-6">
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
                  </div>
                </div>

                <div class="row">
                  <div class="col-8 col-sm-8">
                    <div class="mb-3">
                      <label for="direccion" class="form-label"
                        >direccion</label
                      >
                      <input
                        type="input"
                        class="form-control"
                        id="direccion"
                        v-model="personalData.direccion"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4">
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
                  </div>
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

      <div class="col-12 col-sm-12 d-flex justify-content-end">
        <button type="button" class="btn btn-success" @click="Guardar()">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import main_user_menu from "../../../components/main/user/main_user_menu.vue";
import axios from "axios";
export default {
  name: "main_user_personal_dates",
  components: {
    main_user_menu,
  },

  created() {
    this.GetUserPersonalData();
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
        id: 0,
      },
      hayDatos: false,
    };
  },

  methods: {
    Guardar() {
      if (this.hayDatos == true) {
        console.log("actualizo");
        this.UpdatedPersonalData();
      }
      if (this.hayDatos == false) {
        console.log("creo");
        this.CreatePersonaData();
      }
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
          this.$swal.fire(
            "Datos Guardados!",
            "Se han guardados sus datos correctamente!.",
            "success"
          );
          this.GetUserPersonalData();
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
          this.$swal.fire(
            "Datos Actualizados!",
            "Se han actualizados sus datos correctamente!.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

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
  },
};
</script>

<style scoped>
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>