<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="alert alert-primary" role="alert">
            mitienda.app se encuentra en fase de desarrollo y prueba, pueder
            surgir errores y perdidadas de datos.
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h2 class="pb-2 border-bottom">Crear tienda.</h2>
        </div>
        <div id="emailHelp" class="form-text">
          solo 2 pasos, primero registro despues cree su tienda
        </div>
        <div class="col-12 col-sm-12">
          <div class="step1" v-if="step1 == true">
            <span class="msjRegister">{{ msjRegister }}</span>
            <form>
              <div class="mb-3 mt-2">
                <label for="exampleFormControlInput1" class="form-label"
                  >Correo electronico</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  v-model="email"
                />
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
                  v-model="username"
                />
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
                  v-model="pass1"
                />
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
                  v-model="pass2"
                />
              </div>
              {{ msjPass }}

              <div class="mt-2 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary mr-2"
                  @click="Clear()"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  :disabled="!flag"
                  @click="Register()"
                >
                  Registrarme
                </button>
              </div>
            </form>
          </div>
          <!-- step 2 -->
          <div class="step2" v-if="step2 == true">
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
                https://mitienda.app/{{ dominio }}
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
                  rows="10"
                  v-model="description"
                  placeholder="ferreteria herramientas"
                ></textarea>
                <div id="emailHelp" class="form-text">
                  ingrese palabras claves para describir la tienda,separadas por
                  un espacio ejemplos: indumentaria ropa vestimenta
                </div>
              </div>
              <div class="mt-2 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary mr-2"
                  @click="Clear()"
                >
                  Limpiar
                </button>
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
          <div class="step3" v-if="step3 == true">
            <div class="row">
              <h6>Tienda creada. EXITOS!</h6>
              <p>
                para acceder a su tienda y comenzar a diseñanrla, ingrese a la seccion 
                CUENTA en su aplicacion, que se encuentra en el
                dominio recientemente creado: <br />
                <span style="color: #000000; margin-top:4px;"> mitienda.app/{{ dominio }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Main",
  data() {
    return {
      dominio: "",
      description: "",
      email: "",
      username: "",
      pass1: "",
      pass2: "",
      msjPass: "",
      flag: false,
      msjRegister: "",
      step1: true,
      step2: false,
      step3: false,
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },
  mounted() {
    this.ClearTienda();
  },
  watch: {
    pass2(value) {
      this.checkPass();
    },
  },
  methods: {
    ...mapMutations("tienda", ["ClearTienda"]),
    checkPass() {
      if (this.pass1 == this.pass2) {
        this.msjPass = "Correcto! las contraseñas son iguales";
        this.flag = true;
      } else {
        this.msjPass = "Error! las contraseñas NO son iguales";
      }
    },
    Clear() {
      this.email = "";
      this.username = "";
      this.pass1 = "";
      this.pass2 = "";
    },

    Register() {
      let flag = true;
      if (this.email == "") {
        this.msjRegister = "Debe colocar un correo electronico!";
        flag = false;
      }
      if (this.username == "") {
        this.msjRegister = "Debe colocar un nombre de usuario!";
        flag = false;
      }
      if (flag == true) {
        let data = new FormData();
        data.append("email", this.email);
        data.append("username", this.username);
        data.append("password", this.pass2);
        axios
          .post(this.server + "/api/v1.0/register/", data)
          .then((response) => {
            console.log(response.data);
            this.$swal.fire(
              "Regristro completado!",
              "Muchas gracias por registrarse.",
              "success"
            );
            let login_data = new FormData();
            login_data.append("email", this.email);
            login_data.append("password", this.pass2);
            axios
              .post(this.server + "/api/v1.0/login/", login_data)
              .then((response) => {
                const access = response.data.tokens.access;
                const refresh = response.data.tokens.refresh;
                const cod_ref = response.data.credentials.cod_ref;
                const username = response.data.username;
                const email = response.data.email;
                console.log(response.data);
                let auth_access = "Bearer " + access;
                console.log(auth_access);
                /*  let header = axios.defaults.headers.common['Authorization'] = auth_access
            console.log('===header')
            console.log(header); */

                /* axios.defaults.headers.common['Authorization'] = "Bearer " + access */

                localStorage.setItem("access", auth_access);
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("cod_ref", cod_ref);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                this.step2 = true;
                this.step1 = false;
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    CreateTienda() {
      let tienda_data = new FormData();
      tienda_data.append("name", this.dominio);
      tienda_data.append("description", this.description);

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
          this.step3 = true;
          this.step2 = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    CreateTienda2() {
      this.step3 = true;
      this.step2 = false;
    },

    Register2() {
      this.step2 = true;
      this.step1 = false;
    },
  },
};
</script>

<style scoped>
a {
  color: black !important;
}
.msjRegister {
  background-color: red !important;
  font-size: 16px !important;
  color: white !important;
}
</style>