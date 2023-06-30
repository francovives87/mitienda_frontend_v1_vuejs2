<template>
  <div class="main_login mt-12">
    <div class="container">
      <h4>Ingreso de usuario</h4>
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
              REGISTRAME AHORA
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
  name: "tienda_user_login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState("user", ["user_store"]),
    ...mapState("tienda", ["mitienda", "tienda"]),
  },

  methods: {
    ...mapMutations("user", ["AddUser"]),
    ...mapMutations("tienda", ["AddMiTienda", "ChangeCantOrdersNews"]),

    GoToRegister() {
      this.$router.push({
        name: "tienda_user_register",
        params: { name: this.tienda.name },
      });
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
                this.$router.push({
                  name: "TiendaHome",
                  params: { name: this.tienda.name },
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Credenciales incorrectas!",
            "Nombre de usuario o contraseña incorrecta!",
            "error"
          );
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
          this.$router.push({
            name: "TiendaHome",
            params: { name: this.tienda.name },
          });
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