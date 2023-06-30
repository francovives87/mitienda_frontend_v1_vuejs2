<template>
  <div class="main_create_tienda mt-12 mb-12">
    <div class="container">
      <div class="row">
        <div class="col-10 col-sm-10">
          <div class="ordenes_recientes mt-2">
            <v-icon>mdi-store</v-icon>
            <span class="ml-2"> Crear Mi Tienda</span>
          </div>
        </div>
      </div>
      <div class="row">
        <form>
          <label for="basic-url" class="form-label">Dominio</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3"
              >mitienda.app/</span
            >
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              v-model="dominio"
            />
          </div>
          <div id="emailHelp" class="form-text">
            https://mitienda.app/{{ new_domain }}
          </div>
          <div
            class="alert alert-danger mt-3 mb-3"
            role="alert"
            v-if="error == true"
          >
            {{ error_msj }}
          </div>
          <div class="mt-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Nombre de la tienda</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Mitienda"
              v-model="title"
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Palabras claves</label
            >
            <textarea
              class="form-control"
              name=""
              id=""
              cols="30"
              rows="3"
              v-model="description"
              placeholder="ferreteria herramientas"
            ></textarea>
            <div id="emailHelp" class="form-text">
              ingrese palabras claves para describir la tienda,separadas por un
              espacio ejemplos: indumentaria ropa vestimenta
            </div>
          </div>
          <div class="mt-2 d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-success"
              @click="CreateTienda()"
            >
              Crear Tienda
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "main_create_tienda",
  data() {
    return {
      dominio: "",
      new_domain: "",
      description: "",
      title:"",
      error: false,
      error_msj: [],
    };
  },

  mounted() {
    this.IsLogged();
  },

  watch: {
    dominio: function (value) {
      var domain_toLowerCase = value.toLowerCase();
      var domain_replace = domain_toLowerCase.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\ /]/gi,
        "."
      );
      this.new_domain = domain_replace;
    },
  },

  computed: {
    ...mapState("user", ["user_store"]),
    ...mapState("tienda", ["tienda", "mitienda"]),
  },
  methods: {
    ...mapMutations("tienda", ["AddTienda", "AddMiTienda"]),

    CreateTienda() {
      let tienda_data = new FormData();
      var domain_toLowerCase = this.dominio.toLowerCase();
      var domain_replace = domain_toLowerCase.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\ /]/gi,
        "."
      );

      tienda_data.append("name", domain_replace);
      tienda_data.append("description", this.description);
      tienda_data.append("title",this.title);

      axios
        .post(this.server + "/api/v1.0/tienda/create/", tienda_data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Tienda Creada!",
            "Muchas gracias por crear su tienda. EXITOS!",
            "success"
          );
          /* Busco la tienda creada y la cargo en vuex */
          axios
            .get(
              this.server + "/api/v1.0/tienda/user/?user=" + this.user_store.id
            )
            .then((response) => {
              console.log("GetTiendaByUserId");
              console.log(response.data.results);
              this.AddMiTienda(response.data.results[0]);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.$router.push({ name: "Main" });
            });
        })
        .catch((error) => {
          this.$swal.fire(
            "Algo salio mal!",
            "Revise el mensaje de error que aparece en el formulario",
            "error"
          );
          console.log("aca");
          console.log(error);
          this.error = true;
          this.error_msj = error.response.data;
        });
    },

    IsLogged() {
      console.log("voy aromper todo");
      console.log(this.user_store);
      if (!this.user_store.id) {
        this.$router.push({ name: "MainLogin" });
      } else {
        if (this.mitienda.id > 0) {
          this.$router.push({ name: "Main" });
        }
      }
    },
  },
};
</script>

<style scoped>
.ordenes_recientes {
  border-bottom: solid 1px gray !important;
}
.btn-success {
  color: #ffffff !important;
  background-color: #a463bf;
  border-color: #a463bf !important;
}
.btn-success:hover {
  color: #ffffff !important;
  background-color: #a574df;
  border-color: #a463bf !important;
}
</style>