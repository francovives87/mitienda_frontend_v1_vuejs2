<template>
  <div class="tienda_user_register mt-12 mb-12">
    <main_loading v-if="processing == true" />
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12">
          <h2 class="pb-2 border-bottom">Registro de usuario.</h2>
        </div>
        <div id="emailHelp" class="form-text">
          Bienvenido a mitienda.app! registrese gratis, para comprar en nuestras
          tiendas, o crear su propia tienda.
        </div>
        <div class="col-12 col-sm-12 col-lg-6">
          <div class="alert alert-danger" role="alert" v-if="error == true">
            {{ error_msj }}
          </div>
          <form @submit.prevent="Register()">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Correo electronico</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                v-model.lazy="$v.email.$model"
                :class="{ 'is-invalid': $v.email.$error }"
              />
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.email.email"
              >
                Este email es incorrecto. (ejemplo: name@email.com)
              </p>
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.email.required"
              >
                * Campo requerido.
              </p>
            </div>
            <div class="mb-1">
              <label for="exampleFormControlInput1" class="form-label"
                >Nombre de usuario</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                v-model.lazy="$v.username.$model"
                :class="{ 'is-invalid': $v.username.$error }"
              />
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.username.required"
              >
                * Campo requerido.
              </p>
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.username.minLength"
              >
                El username debe tener al menos 4 caracteres
              </p>
            </div>
            <div class="mb-1">
              <label for="exampleFormControlInput1" class="form-label"
                >Contraseña</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                v-model="$v.pass1.$model"
                :class="{ 'is-invalid': $v.pass1.$error }"
              />
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.pass1.required"
              >
                * Campo requerido.
              </p>
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.pass1.minLength"
              >
                La contraseña de tener al menos 8 caracteres.
              </p>
            </div>
            <div class="mb-1">
              <label for="exampleFormControlInput1" class="form-label"
                >Repetir contraseña</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                v-model="$v.pass2.$model"
                :class="{ 'is-invalid': $v.pass2.$error }"
              />
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.pass2.required"
              >
                * Campo requerido.
              </p>
              <p
                class="text-danger mt-1"
                style="font-size: 12px !important"
                v-if="!$v.pass2.sameAsPassword"
              >
                Las contraseñas no coinciden.
              </p>
            </div>
            <div class="mt-2 d-flex justify-content-end">
              <button type="submit" class="btn btn-success">Registrarme</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
import main_loading from "../../../components/main/main_loading.vue";
import axios from "axios";
export default {
  name: "tienda_user_register",
  components: {
    main_loading,
  },
  data() {
    return {
      dominio: "",
      description: "",
      email: "",
      username: "",
      pass1: "",
      pass2: "",
      error: false,
      error_msj: [],
      processing: false,
    };
  },

  validations: {
    email: { required, email },
    username: { required, minLength: minLength(4) },
    pass1: { required, minLength: minLength(8) },
    pass2: {
      required,
      sameAsPassword: sameAs("pass1"),
    },
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  methods: {
    ...mapMutations("user", ["AddUser"]),

    Clear() {
      this.email = "";
      this.username = "";
      this.pass1 = "";
      this.pass2 = "";
    },

    Register() {
      console.log("submit!");
      this.processing = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        /* this.submitStatus = "ERROR"; */
        console.log("se genero un error!");
      } else {
        let data = new FormData();
        data.append("email", this.email);
        data.append("username", this.username);
        data.append("password", this.pass2);
        axios
          .post(this.server + "/api/v1.0/register/", data)
          .then((response) => {
            console.log(response.data);
            this.$swal.fire(
              "Verifique su correo!",
              "Muchas gracias por registrarse. Para finalizar revise su correo electronico y confirme el registro.",
              "success"
            );
            this.$router.push({
              name: "TiendaHome",
              params: { name: this.tienda.name },
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
            console.log("error email");
            console.log(error.response.data);
            this.error = true;
            this.error_msj = error.response.data;
          })
          .finally(() => {
            this.processing = false;
          });
      }
    },
  },
};
</script>

<style>
</style>