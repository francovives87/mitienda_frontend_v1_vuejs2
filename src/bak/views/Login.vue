<template>
  <div>
    <div class="container mt-10 mb-10">
      <h4>Ingreso de usuario</h4>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="">Usuario:</label>
          <input
            class="form-control"
            type="email"
            name="email"
            id=""
            v-model="email"
          /><br />
        </div>
        <div class="mb-3">
          <label class="form-label" for="">Contraseña</label>
          <input
            class="form-control"
            type="password"
            name="password"
            id=""
            v-model="password"
          /><br />
        </div>

        <button type="submit" class="btn btn-outline-secondary">
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  props: ["tienda"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.IsLogged();
  },
  methods: {
    IsLogged() {
      if (localStorage.getItem("access")) {
        this.$router.push({
          name: "UserHome",
          params: { tienda: this.tienda },
        });
      }
    },

    submitForm(e) {
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
          /*  let header = axios.defaults.headers.common['Authorization'] = auth_access
            console.log('===header')
            console.log(header); */

          /* axios.defaults.headers.common['Authorization'] = "Bearer " + access */

          localStorage.setItem("access", auth_access);
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("cod_ref", cod_ref);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);

          this.$router.push({
            name: "UserHome",
            params: { tienda: this.tienda },
          });
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