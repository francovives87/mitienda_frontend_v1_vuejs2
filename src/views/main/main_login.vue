<template>
  <div class="main_login mt-12">
    <div class="container mt-12 mb-2">
      <h4 class="mt-6">Ingreso de usuario</h4>
      <div class="container" v-if="verified == true">
        <div class="row">
          <div class="alert alert-success" role="alert">
            Correo electronico verificado correctamente! <br />
            ya puede ingresar a mitienda.app
          </div>
        </div>
      </div>
      <form @submit.prevent="Login()">
        <div class="mb-1">
          <label class="form-label" for="">Usuario:</label>
          <input
            class="form-control"
            type="email"
            name="email"
            id="email"
            v-model="email"
          /><br />
        </div>
        <div class="mb-1">
          <label class="form-label" for="">Contraseña</label>
          <input
            class="form-control"
            type="password"
            name="password"
            id="password"
            v-model="password"
          /><br />
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-outline-primary">
            Ingresar
          </button>
        </div>
      </form>
      <v-divider></v-divider>
      <div class="row">
        <span
          >No eres usuario? registrate gratis para crear tu tienda o comprar en
          nuestras tiendas
        </span>
        <br />
        <div class="d-flex justify-content-center">
          <div class="col-8 col-sm-8">
            <button
              type="button"
              class="btn btn-success"
              @click="GoToRegister()"
            >
              REGISTRARME AHORA
            </button>
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
  name: "main_login",
  data() {
    return {
      email: "",
      password: "",
      codigo: null,
      cod_ref: null,
      verified: false,
    };
  },
  computed: {
    ...mapState("user", ["user_store"]),
    ...mapState("tienda", ["mitienda"]),
  },

  mounted() {
    this.GetParams();
  },

  methods: {
    ...mapMutations("user", ["AddUser"]),
    ...mapMutations("tienda", ["AddMiTienda", "ChangeCantOrdersNews"]),

    GetParams() {
      let urlParams = new URLSearchParams(window.location.search);
      this.codigo = urlParams.get("codigo");
      this.cod_ref = parseInt(urlParams.get("coderef"));
      console.log("GET PARAMS");
      console.log(this.codigo);
      if (this.codigo !== null && this.cod_ref !== null) {
        console.log("HAY PARAMS");
        this.VerifyEmail();
      } else {
        console.log("NO HAY PARAMS");
      }
    },

    VerifyEmail() {
      axios
        .get(this.server + "/api/v1.0/email-verify/", {
          params: {
            codigo: this.codigo,
            coderef: this.cod_ref,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.verified = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GoToRegister() {
      this.$router.push({ name: "MainRegister" });
    },

    Login() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(this.server + "/api/v1.0/login/", formData)
        .then((response) => {
          const access = response.data.tokens.access;
          const refresh = response.data.tokens.refresh;
          const cod_ref = response.data.credentials.cod_ref;
          const username = response.data.username;
          const email = response.data.email;
          console.log(response.data);
          let auth_access = "Bearer " + access;
          console.log(auth_access);
          localStorage.setItem("access", auth_access);
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("cod_ref", cod_ref);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          let user_store = {
            id: cod_ref,
            email: email,
            is_staff: false,
            username: username,
          };
          this.AddUser(user_store);
          /* User has tienda? */
          let user_has_tienda = {
            user_id: this.user_store.id,
          };
          axios
            .post(this.server + "/api/v1.0/user/tienda/", user_has_tienda)
            .then((response) => {
              console.log(response.data);
              /* si tiene tienda */
              if (response.data.tienda_id) {
                this.GetTiendaByUserId();
              } else {
                this.$router.push({ name: "Main" });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error.response.data.detail);
          if (error.response.data.detail == "Email is not verified") {
            this.$swal.fire(
              "Correo Electronico no verificado!",
              "Ingrese a su correo electronico y busque nuestro email para verificar su cuenta!",
              "info"
            );
          }
          if (error.response.data.detail == "Invalid credentials, try again") {
            this.$swal.fire(
              "Credenciales Incorrectas",
              "Esta ingresando un correo y/o contraseña incorrecta!",
              "error"
            );
          }
        });
    },
    GetTiendaByUserId() {
      axios
        .get(this.server + "/api/v1.0/tienda/user/?user=" + this.user_store.id)
        .then((response) => {
          console.log("GetTiendaByUserId");
          console.log(response.data.results);
          this.AddMiTienda(response.data.results[0]);
          this.CountNewsOrders();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ name: "Main" });
        });
    },

    CountNewsOrders() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/orders/news/count/?tienda=" +
            this.mitienda.id
        )
        .then((response) => {
          this.ChangeCantOrdersNews(response.data.ordenes_nuevas);
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