<template>
  <v-app>
    <main_navbar v-if="isMain || isError" />
    <main_barra_mobile v-if="isMain || isError" />
    <tienda_navbar v-if="!isMain" />
    <tienda_barra_mobile v-if="!isMain" />
    <v-main>
      <router-view />
    </v-main>
    <tienda_bottom_navigation v-if="isTiendaLoad == true || !isMain" />
    <tienda_footer v-if="isMain"/>

  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import tienda_footer from "../src/components/tienda/tienda_footer.vue";
import tienda_navbar from "../src/components/tienda/tienda_navbar.vue";
import tienda_barra_mobile from "../src/components/tienda/tienda_barra_mobile.vue";
import tienda_bottom_navigation from "../src/components/tienda/tienda_bottom_navigation.vue";
import main_navbar from "../src/components/main/main_navbar.vue";
import main_barra_mobile from "../src/components/main/main_barra_mobile.vue";
import tienda_loading from "../src/components/tienda/tienda_loading.vue";

export default {
  name: "App",
  components: {
    tienda_footer,
    tienda_navbar,
    tienda_barra_mobile,
    tienda_bottom_navigation,
    main_navbar,
    main_barra_mobile,
    tienda_loading,
  },
  data() {
    return {
      load: false,
    };
  },

  created() {
    if (this.isMain == false){
      this.CheckTienda();
    }
  },

  mounted() {
    this.getTokenAndRefresh();

    setInterval(() => {
      console.log("arranca este");
      this.getTokenAndRefreshAutomatic();
    }, 840000);
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    isMain() {
      return this.$route.name === "Main";
    },
    isError() {
      return this.$route.name === "error404";
    },
    isAdminHomeUser() {
      return this.$route.name === "AdminHome";
    },
    isATienda() {
      return this.$route.name === "TiendaHome";
    },

    isTiendaLoad() {
      if (this.tienda.name) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapMutations("tienda", ["AddTienda"]),


      CheckTienda() {
      if (!this.tienda.name) {
        let name_tienda = this.$route.params.name;
        console.log("name tienda");
        console.log(name_tienda);
        axios
          .get(this.server + "/api/v1.0/tienda/" + name_tienda)
          .then((response) => {
            console.log("getTienda");
            console.log(response.data.results);
            if (response.data.count == 0) {
              this.$router.push({ name: "error404" });
            }

            this.AddTienda(response.data.results[0]);
            console.log(this.tienda);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally((final) => {
            console.log("termino la carga");
            this.load = true;
          });
      }
    },


    getTokenAndRefresh(e) {
      if (localStorage.getItem("refresh")) {
        const accessData = {
          refresh: localStorage.getItem("refresh"),
        };
        axios
          .post(this.server + "/api/v1.0/token/refresh/", accessData)
          .then((response) => {
            const access = response.data.access;
            let bearer_access = "Bearer " + access;
            localStorage.setItem("access", bearer_access);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getTokenAndRefreshAutomatic(e) {
      console.log("arranca este");
      const accessData = {
        refresh: localStorage.getItem("refresh"),
      };
      axios
        .post(this.server + "/api/v1.0/token/refresh/", accessData)
        .then((response) => {
          const access = response.data.access;
          let bearer_access = "Bearer " + access;
          localStorage.setItem("access", bearer_access);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@500&display=swap");

html,
body {
  font-family: "Oswald", sans-serif;
}

v-main{
  padding: 0px 0px 0px !important;
}

p {
  line-height: 1.2 !important;
  color: rgba(0, 0, 0, 0.6) !important;
  font-size: 18px !important;
}

.v-card__title {
  letter-spacing: -1.5px !important;
  font-family: "Azeret Mono", monospace;
  font-weight: 500 !important;
  padding: 6px !important;
}

a {
  text-decoration: none !important;
}

#app {
  font-family: "Oswald", sans-serif;
}

.VueCarousel-pagination {
  display: none !important;
}
</style>
