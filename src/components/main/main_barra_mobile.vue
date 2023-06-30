<template>
  <div>
    <div class="barra_desktop" v-if="height > 1">
      <v-app-bar color="#FFFFFF" dense fixed dark height="70">
        <div class="container">
          <div class="row d-flex align-items-center">
            <div class="col-2">
              <v-img
                class="shrink"
                contain
                :src="server + '/media_root/defaults/mitienda_logo_3_2_512.png'"
                transition="scale-transition"
                height="45"
                width="45"
                @click="GoHome()"
              />
            </div>
            <div class="col-8 d-flex justify-content-center">
              <v-toolbar-title @click="GoHome()"
                ><a
                  ><span class="mitienda_title"> mitienda.app </span></a
                ></v-toolbar-title
              >
            </div>
            <div class="col-2 p-0 d-flex justify-content-end">
              <div class="dropdown p-0">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    class="
                      position-absolute
                      top-10
                      start-100
                      translate-middle
                      badge
                      rounded-pill
                      bg-success
                    "
                    v-if="cantNewsNotifications > 0"
                  >
                    {{ cantNewsNotifications }}
                  </span>
                  <v-icon class="dropdown-icons">mdi-account-circle</v-icon>
                </button>
                <ul
                  class="dropdown-menu p-0"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      class="dropdown-item"
                      @click="GoToHomeTienda()"
                      v-if="this.mitienda.id"
                    >
                      <div class="d-flex align-items-center">
                        <!--  <v-badge overlap color="green" :content="badgeCount"> -->
                        <v-icon class="dropdown-icons">mdi-store</v-icon>
                        <span class="text_down_style">MI TIENDA</span>
                        <span
                          class="badge rounded-pill bg-success ml-4"
                          v-if="cantNewsNotifications > 0"
                        >
                          {{ cantNewsNotifications }}
                        </span>

                        <!--  </v-badge> -->
                      </div>
                    </a>

                    <a
                      class="dropdown-item"
                      v-if="!this.mitienda.id && this.user_store.id"
                      @click="GoToCreateStore()"
                    >
                      <div class="d-flex align-items-center">
                        <v-icon class="dropdown-icons">mdi-store</v-icon>
                        <span class="text_down_style">CREAR TIENDA</span>
                        <v-badge
                          color="success"
                          icon="mdi-plus"
                          overlap
                          class="ml-4"
                        >
                        </v-badge>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click="GoToUserHome()"
                      v-if="user_store.id"
                    >
                      <v-icon class="dropdown-icons">mdi-account-circle</v-icon
                      ><span class="text_down_style">MI CUENTA</span>
                    </a>
                    <a
                      v-if="!user_store.id"
                      @click="GoToUserLogin()"
                      class="dropdown-item"
                    >
                      <div class="d-flex align-items-center">
                        <v-icon class="dropdown-icons"
                          >mdi-account-circle</v-icon
                        >
                        <span class="text_down_style">MI CUENTA</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <div class="barra_mobile" v-if="height == 1">
      <v-app-bar color="#FFFFFF" dense fixed dark height="70">
        <div class="container">
          <div class="row d-flex align-items-center">
            <div class="col-2 p-0 d-flex justify-content-center">
              <v-img
                class="shrink"
                contain
                :src="server + '/media_root/defaults/mitienda_logo_3_2_512.png'"
                transition="scale-transition"
                height="45"
                width="45"
                @click="GoHome()"
              />
            </div>
            <div class="col-8 d-flex justify-content-center">
              <v-toolbar-title @click="GoHome()"
                ><a
                  ><span class="mitienda_title"> mitienda.app </span></a
                ></v-toolbar-title
              >
            </div>
            <div class="col-2 p-0 d-flex justify-content-end">
              <div class="dropdown p-0">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    class="
                      position-absolute
                      top-10
                      start-100
                      translate-middle
                      badge
                      rounded-pill
                      bg-success
                    "
                    v-if="cantNewsNotifications > 0"
                  >
                    {{ cantNewsNotifications }}
                  </span>
                  <v-icon class="dropdown-icons">mdi-account-circle</v-icon>
                </button>
                <ul
                  class="dropdown-menu p-0"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      class="dropdown-item"
                      @click="GoToHomeTienda()"
                      v-if="this.mitienda.id"
                    >
                      <div class="d-flex align-items-center">
                        <!--  <v-badge overlap color="green" :content="badgeCount"> -->
                        <v-icon class="dropdown-icons">mdi-store</v-icon>
                        <span class="text_down_style">MI TIENDA</span>
                        <span
                          class="badge rounded-pill bg-success ml-4"
                          v-if="cantNewsNotifications > 0"
                        >
                          {{ cantNewsNotifications }}
                        </span>

                        <!--  </v-badge> -->
                      </div>
                    </a>

                    <a
                      class="dropdown-item"
                      v-if="!this.mitienda.id && this.user_store.id"
                      @click="GoToCreateStore()"
                    >
                      <div class="d-flex align-items-center">
                        <v-icon class="dropdown-icons">mdi-store</v-icon>
                        <span class="text_down_style">CREAR TIENDA</span>
                        <v-badge
                          color="success"
                          icon="mdi-plus"
                          overlap
                          class="ml-4"
                        >
                        </v-badge>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click="GoToUserHome()"
                      v-if="user_store.id"
                    >
                      <v-icon class="dropdown-icons">mdi-account-circle</v-icon
                      ><span class="text_down_style">MI CUENTA</span>
                    </a>
                    <a
                      v-if="!user_store.id"
                      @click="GoToUserLogin()"
                      class="dropdown-item"
                    >
                      <div class="d-flex align-items-center">
                        <v-icon class="dropdown-icons"
                          >mdi-account-circle</v-icon
                        >
                        <span class="text_down_style">MI CUENTA</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "main_barra_mobile",

  data() {
    return {
      kword: "",
      tiendas: [],
      tiendasByKeywords: [],
      radius: 5 /* En kms */,
    };
  },

  computed: {
    ...mapState("tienda", [
      "mitienda",
      "newOrderFlag",
      "cantNewsNotifications",
    ]),
    ...mapState("user", ["user_store"]),
    isMainSearch() {
      return this.$route.name === "main_search_tienda";
    },

    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 1;
        case "lg":
          return 2;
        case "xl":
          return 2;
      }
    },
  },
  methods: {
    ...mapMutations("tienda", ["SwicthMitiendaToTienda"]),
    SearchTiendaTriagram() {
      if (this.kword != "") {
        if (!localStorage.getItem("lat") || !localStorage.getItem("lng")) {
          this.$router.push({
            name: "main_geolocation_user",
          });
        } else {
          axios
            .get(this.server + "/api/v1.0/store/search/", {
              params: {
                lng: localStorage.getItem("lng"),
                lat: localStorage.getItem("lat"),
                radius: this.radius,
                title: this.kword,
              },
            })
            .then((response) => {
              console.log(response.data.results);
              this.tiendas = response.data.results;
            })
            .catch((error) => {
              console.log(error);
            });
          /* busco por keywords */
          axios
            .get(this.server + "/api/v1.0/store/search/description/", {
              params: {
                lng: localStorage.getItem("lng"),
                lat: localStorage.getItem("lat"),
                radius: this.radius,
                description: this.kword,
                page: 1,
              },
            })
            .then((response) => {
              console.log(response.data.results);
              this.tiendasByKeywords = response.data;
              this.$router.push({
                name: "main_search_tienda",
                params: {
                  tiendas: this.tiendas,
                  tiendasByKeywords: this.tiendasByKeywords,
                  previous_kword: this.kword,
                },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    ClearSearch() {
      this.tiendas = [];
      this.kword = "";
    },

    GoToCreateStore() {
      this.$router.push({ name: "main_create_tienda" });
    },

    GoHome() {
      this.$router.push({ name: "Main" });
    },
    GoToHomeTienda() {
      this.$router.push({
        name: "TiendaHome",
        params: { name: this.mitienda.name },
      });
    },
    GoToAdmin() {
      this.SwicthMitiendaToTienda();
      this.$router.push({
        name: "AdminHome",
        params: { name: this.mitienda.name },
      });
    },
    GoToUserHome() {
      this.$router.push({
        name: "main_account",
        params: { name: this.mitienda.name },
      });
    },
    GoToUserLogin() {
      this.$router.push({ name: "MainLogin" });
    },
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

a {
  color: #000000 !important;
}
.mitienda_title {
  color: #6a1b9a !important;
  /* font-family: "Russo One", sans-serif !important; */
  font-family: "Audiowide", cursive;
  font-weight: 400;
  font-size: 24px !important;
}

.btn-secondary {
  background-color: white !important;
  color: #6a1b9a !important;
  height: 38px !important;
  border: 1px solid #6a1b9a !important;
  width: 60px !important;
}
.dropdown-item {
  border-bottom: 1px solid gainsboro !important;
  padding: 16px !important;
}
.text_down_style {
  font-size: 12px !important;
}
.dropdown-icons {
  color: #6a1b9a !important;
}

.fl-wrap {
  float: left;
  width: 210px;
  position: relative;
  border: 1px solid #6a1b9a !important;
}
.main-search-input {
  background: #fff;
  padding: 0 30px 0 0;
  margin-top: 0px;
  text-align: center;
}

.main-search-input:before {
  position: absolute;
  bottom: -40px;
  width: 50px;
  height: 1px;
  background: rgba(255, 255, 255, 0.41);
  left: 50%;
  margin-left: -25px;
}

.main-search-input-item {
  float: left;
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid #6a1b9a;
  height: 34px;
  position: relative;
}

.main-search-input-item input:first-child {
  border-radius: 100%;
}

.main-search-input-item input {
  float: left;
  border: none;
  width: 100%;
  height: 40px;
  padding-left: 20px;
}

.main-search-button {
  background: #6a1b9a;
}

.main-search-button {
  position: absolute;
  right: 0px;
  height: 34px;
  width: 40px;
  color: #fff;
  top: 0;
  border: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
}

.main-search-input-wrap {
  max-width: 500px;
  margin: 20px auto;
  position: relative;
}

:focus {
  outline: 0;
}
@media only screen and (min-width: 768px) {
  .fl-wrap {
    float: right;
    width: 600px;
    position: relative;
  }

  .main-search-input {
    background: #fff;
    padding: 0 40px 0 0;
    border-radius: 1px;
    margin-top: 0px;
    box-shadow: 0px 0px 0px 6px rgba(255, 255, 255, 0.3);
    text-align: center;
  }

  .main-search-input:before {
    position: absolute;
    bottom: -40px;
    width: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.41);
    left: 50%;
    margin-left: -25px;
  }

  .main-search-input-item {
    float: left;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    height: 40px;
    position: relative;
  }

  .main-search-input-item input:first-child {
    border-radius: 100%;
  }

  .main-search-input-item input {
    float: left;
    border: none;
    width: 100%;
    height: 40px;
    padding-left: 20px;
  }

  .main-search-button {
    background: #6a1b9a;
  }

  .main-search-button {
    position: absolute;
    right: 0px;
    height: 40px;
    width: 70px;
    color: #fff;
    top: 0;
    border: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor: pointer;
  }

  .main-search-input-wrap {
    max-width: 500px;
    margin: 20px auto;
    position: relative;
  }

  :focus {
    outline: 0;
  }
}
</style>
