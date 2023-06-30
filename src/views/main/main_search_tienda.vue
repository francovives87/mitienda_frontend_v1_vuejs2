<template>
  <div class="main_search_tienda mt-12">
    <div class="nav_bar mt-16 d-flex justify-content-center">
      <div class="main-search-input-wrap">
        <div class="main-search-input fl-wrap">
          <form v-on:submit.prevent="SearchWhenClickOnButton(5)">
            <div class="main-search-input-item">
              <input
                type="search"
                value=""
                placeholder="Buscar"
                name="kword"
                id="kword"
                v-model="kword"
              />
            </div>
            <button
              class="main-search-button"
              @click="SearchWhenClickOnButton(5)"
            >
              <v-icon style="color: white !important">mdi-magnify</v-icon>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="sub_navbar">
      <div class="container">
        <div
          class="
            row
            sub_navbar_item
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <div class="col-4 col-sm-4 col-lg-2">
            <div class="dropdown">
              <a
                class="btn btn-primary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="drop_item"> Radio </span>
              </a>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(5)"
                    >5 Km.</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(10)"
                    >10 Km</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(15)"
                    >15 Km.</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(20)"
                    >20 Km.</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(50)"
                    >50 Km.</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="SearchWhenClickOnButton(100)"
                    >100 Km.</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-4 col-sm-4 col-lg-2">
            <router-link :to="{ name: 'main_geolocation_user' }">
              <span class="mi_ubicacion">Mi Ubicacion: </span
              ><span class="ubicacion">{{ user_location.ciudad }} </span>&nbsp;
              <span style="color: #ffffff !important">
                <font-awesome-icon icon="map-marker-alt" />
              </span>
            </router-link>
          </div>
          <div class="col-4 col-sm-4 col-lg-2">
            <div class="dropdown">
              <a
                class="btn btn-primary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="drop_item"> + Opciones</span>
              </a>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a
                    class="dropdown-item"
                    @click="MoreOptions(option)"
                    v-for="(option, index) in options"
                    :key="index"
                    >{{ option }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RESULTADOS -->
    <div
      class="container"
      v-if="tienda_search.length > 0 || tiendasByKeywords_search.length > 0"
    >
      <div class="row">
        <div class="col-12 col-sm-12">Por Cercania(Radio: {{ radius }}Km.)</div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-12 col-sm-12">
          <span style="font-size: 12px">
            Lo sentimos no hay tiendas cercanas en este radio ({{ radius }} Km.)
            con estas caracteristicas.</span
          >
        </div>
      </div>
    </div>

    <!-- por nombre -->

    <div class="container" v-if="tienda_search.length > 0">
      <div class="row">
        <div class="col-10 col-sm-10">
          <div class="tienda_nuevas_title">Tiendas</div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <carousel
              :per-page="height"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="false"
              :loop="true"
            >
              <slide v-for="(tienda, i) in tienda_search" :key="i">
                <v-card
                  elevation="2"
                  outlined
                  class="mb-1 ml-1"
                  height="240"
                  width="150"
                >
                  <div class="container d-flex align-items-center">
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'TiendaHome',
                          params: { name: tienda.tienda.name },
                        }"
                      >
                        <div class="row">
                          <div
                            class="
                              col-12 col-sm-12
                              d-flex
                              justify-content-center
                            "
                          >
                            <img
                              :src="tienda.tienda.logo"
                              alt=""
                              style="
                                width: auto !important;
                                height: 60px !important;
                              "
                            />
                          </div>
                          <div class="col-12 col-sm-12">
                            <div class="info_item_avg">
                              <div class="rating_container">
                                <v-icon small color="orange" class="dot"
                                  >mdi-star</v-icon
                                >
                                &nbsp;
                                <span
                                  class="rating_number"
                                  v-if="tienda.tienda.average.rating__avg > 0"
                                  >{{  (Math.round(tienda.tienda.average.rating__avg  * 100) / 100).toFixed(1) }}</span
                                >
                                <span
                                  class="rating_number"
                                  v-if="
                                    tienda.tienda.average.rating__avg == null
                                  "
                                  >0</span
                                >
                              </div>
                            </div>
                            <span class="tienda_title">
                              {{ tienda.tienda.title }}</span
                            >
                            <p class="tienda_description">
                              {{ tienda.tienda.description }} <br />
                              <span class="location"
                                >{{ tienda.region }}, {{ tienda.subregion }} ,
                                {{ tienda.ciudad }}</span
                              >
                              <br />
                              <span class="address">{{
                                tienda.direccion
                              }}</span>
                            </p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </v-card>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- por palabras claves -->

    <div class="container" v-if="tiendasByKeywords_search.length > 0">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12">
          <div class="tienda_nuevas_title">Tiendas por palabras claves</div>
          <v-card
            elevation="2"
            outlined
            v-for="(tienda, index) in tiendasByKeywords_search"
            :key="index"
            class="mb-1"
            height="140"
          >
            <div class="container d-flex align-items-center">
              <div class="row">
                <router-link
                  :to="{
                    name: 'TiendaHome',
                    params: { name: tienda.tienda.name },
                  }"
                >
                  <div class="row">
                    <div class="col-4 col-sm-4">
                      <img
                        :src="tienda.tienda.logo"
                        alt=""
                        style="width: 45px; heigth: 45px"
                      />
                    </div>
                    <div class="col-8 col-sm-8">
                      <div class="info_item_avg">
                        <div class="rating_container">
                          <v-icon small color="orange" class="dot"
                            >mdi-star</v-icon
                          >
                          &nbsp;
                          <span
                            class="rating_number"
                            v-if="tienda.tienda.average.rating__avg > 0"
                            >{{  (Math.round(tienda.tienda.average.rating__avg * 100) / 100).toFixed(1) }}</span
                          >
                          <span
                            class="rating_number"
                            v-if="tienda.tienda.average.rating__avg == null"
                            >0</span
                          >
                        </div>
                      </div>
                      <span class="tienda_title">
                        {{ tienda.tienda.title }}</span
                      >
                      <p class="tienda_description">
                        {{ tienda.tienda.description }} <br />
                        <span class="location"
                          >{{ tienda.region }}, {{ tienda.subregion }} ,
                          {{ tienda.ciudad }}</span
                        >
                        <br />
                        <span class="address">{{ tienda.direccion }}</span>
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </v-card>
          <div class="row d-flex justify-content-center">
            <div class="col-4 col-sm-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                v-if="tiendasByKeywords_search_previous == true"
                @click="TiendasByKeywords_search_previous()"
              >
                &lt; Anterior
              </button>
            </div>
            <div class="col-4 col-sm-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="TiendasByKeywords_search_next()"
                v-if="tiendasByKeywords_search_next == true"
              >
                Siguiente >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAS RESULTADOS -->
    <div
      class="container"
      v-if="
        more_results_by_title.length > 0 || more_results_by_keywords.length > 0
      "
    >
      <div class="row">
        <div class="col-12 col-sm-12 mas-resultados">
          <span class="mas-resultados-title"> MAS RESULTADOS </span>
        </div>
      </div>
    </div>

    <!-- Por nombre -->

    <div class="container" v-if="more_results_by_title.length > 0">
      <div class="row">
        <div class="col-10 col-sm-10">
          <div class="tienda_nuevas_title">Tiendas</div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <carousel
              :per-page="height"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="false"
              :loop="true"
            >
              <slide v-for="(tienda, i) in more_results_by_title" :key="i">
                <v-card
                  elevation="2"
                  outlined
                  class="mb-1 ml-1"
                  height="245"
                  width="160"
                >
                  <div class="container d-flex align-items-center">
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'TiendaHome',
                          params: { name: tienda.name },
                        }"
                      >
                        <div class="row">
                          <div
                            class="
                              col-12 col-sm-12
                              d-flex
                              justify-content-center
                            "
                          >
                            <img
                              :src="tienda.logo"
                              alt=""
                              style="
                                width: auto !important;
                                height: 60px !important;
                              "
                            />
                          </div>
                          <div class="info_item_avg">
                            <div class="rating_container">
                              <v-icon small color="orange" class="dot"
                                >mdi-star</v-icon
                              >
                              &nbsp;
                              <span
                                class="rating_number"
                                v-if="tienda.average.rating__avg > 0"
                                >{{  (Math.round(tienda.average.rating__avg * 100) / 100).toFixed(1) }}</span
                              >
                              <span
                                class="rating_number"
                                v-if="tienda.average.rating__avg == null"
                                >0</span
                              >
                            </div>
                          </div>
                          <div class="col-12 col-sm-12">
                            <span class="tienda_title">
                              {{ tienda.title }}</span
                            >
                            <br />
                            <span class="tienda_description">
                              {{ tienda.description }}
                            </span>
                            <p
                              class="tienda_description"
                              v-for="(ads, index_ads) in tienda.geo_tienda"
                              :key="index_ads"
                            >
                              <span class="location"
                                >{{ ads.region }}, {{ ads.subregion }} ,
                                {{ ads.ciudad }}</span
                              >
                              <br />
                              <span class="address">{{ ads.direccion }}</span>
                            </p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </v-card>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- Por KEYWORS -->

    <div class="container" v-if="more_results_by_keywords.length > 0">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12">
          <div class="tienda_nuevas_title">Tiendas por palabras claves</div>
          <v-card
            elevation="2"
            outlined
            v-for="(tienda, index) in more_results_by_keywords"
            :key="index"
            class="mb-1"
            height="120"
          >
            <div class="container d-flex align-items-center">
              <div class="row">
                <router-link
                  :to="{
                    name: 'TiendaHome',
                    params: { name: tienda.name },
                  }"
                >
                  <div class="row">
                    <div class="col-4 col-sm-4">
                      <img
                        :src="tienda.logo"
                        alt=""
                        style="width: 45px; heigth: 45px"
                      />
                    </div>
                    <div class="col-8 col-sm-8">
                      <span class="tienda_title"> {{ tienda.title }}</span>
                      <span class="tienda_description">{{ tienda.description }} </span>
                      <p
                        class="tienda_description"
                        v-for="(ads, index_ads) in tienda.geo_tienda"
                        :key="index_ads"
                      >
                        <span class="location"
                          >{{ ads.region }}, {{ ads.subregion }} ,
                          {{ ads.ciudad }}</span
                        >
                        <br />
                        <span class="address">{{ ads.direccion }}</span>
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <!-- MAS RESULTADOS -->

    <!-- FILTROS -->
    <div
      class="container"
      v-if="filter.length > 0 || filter_by_keyword.length > 0"
    >
      <div class="row">
        <div class="col-12 col-sm-12">
          <span> Filtro </span> <span>{{ select_input }}</span>
        </div>
      </div>
    </div>

    <!-- Por nombre -->

    <div class="container" v-if="filter.length > 0">
      <div class="row">
        <div class="col-10 col-sm-10">
          <div class="tienda_nuevas_title">Tiendas</div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <carousel
              :per-page="height"
              :mouse-drag="false"
              :navigationEnabled="height == 4 ? true : false"
              paginationPosition="false"
              :loop="true"
            >
              <slide v-for="(tienda, i) in filter" :key="i">
                <v-card
                  elevation="2"
                  outlined
                  class="mb-1 ml-1"
                  height="160"
                  width="140"
                >
                  <div class="container d-flex align-items-center">
                    <div class="row">
                      <router-link
                        :to="{
                          name: 'TiendaHome',
                          params: { name: tienda.tienda.name },
                        }"
                      >
                        <div class="row">
                          <div
                            class="
                              col-12 col-sm-12
                              d-flex
                              justify-content-center
                            "
                          >
                            <img
                              :src="tienda.tienda.logo"
                              alt=""
                              style="
                                width: 45px !important;
                                height: 45px !important;
                              "
                            />
                          </div>
                          <div class="col-12 col-sm-12">
                            <span class="tienda_title">
                              {{ tienda.tienda.title }}</span
                            >
                            <p class="tienda_description">
                              {{ tienda.tienda.description }} <br />
                              <span class="location"
                                >{{ tienda.region }}, {{ tienda.subregion }} ,
                                {{ tienda.ciudad }}</span
                              >
                              <br />
                              <span class="address">{{
                                tienda.direccion
                              }}</span>
                            </p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </v-card>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- Por KEYWORS -->

    <div class="container" v-if="filter_by_keyword.length > 0">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-sm-12">
          <div class="tienda_nuevas_title">Tiendas por palabras claves</div>
          <v-card
            elevation="2"
            outlined
            v-for="(tienda, index) in filter_by_keyword"
            :key="index"
            class="mb-1"
            height="120"
          >
            <div class="container d-flex align-items-center">
              <div class="row">
                <router-link
                  :to="{
                    name: 'TiendaHome',
                    params: { name: tienda.tienda.name },
                  }"
                >
                  <div class="row">
                    <div class="col-4 col-sm-4">
                      <img
                        :src="tienda.tienda.logo"
                        alt=""
                        style="width: 45px; heigth: 45px"
                      />
                    </div>
                    <div class="col-8 col-sm-8">
                      <span class="tienda_title">
                        {{ tienda.tienda.title }}</span
                      >
                      <p class="tienda_description">
                        {{ tienda.tienda.description }} <br />
                        <span class="location"
                          >{{ tienda.region }}, {{ tienda.subregion }} ,
                          {{ tienda.ciudad }}</span
                        >
                        <br />
                        <span class="address">{{ tienda.direccion }}</span>
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <!-- FILTROS -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "main_search_tienda",
  props: ["tiendas", "tiendasByKeywords", "previous_kword"],
  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      kword: "",
      radius: 5 /* en kms */,
      geoData: {},
      tienda_search: [],
      tiendasByKeywords_search: [],
      tiendasByKeywords_search_cp: 1,
      tiendasByKeywords_search_next: false,
      tiendasByKeywords_search_previous: false,
      options: [],
      select_input: "",
      filter: [],
      filter_by_keyword: [],
      more_results_by_title: [],
      more_results_by_keywords: [],
      showModal: false,
      mymap: null,
    };
  },

  computed: {
    ...mapState("user", ["user_location"]),

    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  mounted() {
    this.geoData = this.user_location;
    this.tienda_search = this.tiendas;
    this.tiendasByKeywords_search = this.tiendasByKeywords.results;
    console.log("PROP: tiendasByKeywords");
    console.log(this.tiendasByKeywords);
    /* si hay paginacion */
    if (this.tiendasByKeywords.next) {
      this.tiendasByKeywords_search_next = true;
    }
    this.kword = this.previous_kword;
    this.options.push("Ciudad: " + this.geoData.ciudad);
    this.options.push("Departamento: " + this.geoData.subregion);
    this.options.push("Provincia: " + this.geoData.region);
    this.options.push("Pais: " + this.geoData.pais);

    console.log("this.tiendas desde vista search");
    console.log(this.tiendas);
    console.log("this.geoData");
    console.log(this.geoData);
    this.CheckGlobalByName();
  },

  methods: {
    TiendasByKeywords_search_next() {
      this.tiendasByKeywords_search_cp += 1;
      this.tiendasByKeywords_search_next = false;
      this.SearchStoresGeoDjango(5);
    },

    TiendasByKeywords_search_previous() {
      this.tiendasByKeywords_search_cp -= 1;
      this.tiendasByKeywords_search_previous = false;
      this.SearchStoresGeoDjango(5);
    },

    CheckGlobalByName() {
      axios
        .get(this.server + "/api/v1.0/store/search/global/store/", {
          params: {
            kword: this.kword,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.more_results_by_title = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CheckGlobalByKeywords() {
      axios
        .get(this.server + "/api/v1.0/store/search/global/store/keyword/", {
          params: {
            kword: this.kword,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.more_results_by_keywords = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearPreviousResults() {
      this.tiendasByKeywords_search = [];
      this.tienda_search = [];
      this.more_results_by_title = [];
      (this.filter = []), (this.filter_by_keyword = []);
      this.select_input = "";
    },

    Search(criterio) {
      /* por name */
      axios
        .get(this.server + "/api/v1.0/store/search/filter/", {
          params: {
            criterio: criterio,
            by: "name",
            kword: this.kword.toLowerCase(),
            pais: this.geoData.pais.toLowerCase(),
            region: this.geoData.region.toLowerCase(),
            subregion: this.geoData.subregion.toLowerCase(),
            ciudad: this.geoData.ciudad.toLowerCase(),
          },
        })
        .then((response) => {
          console.log("filter");
          this.filter = response.data.results;
          console.log(this.filter);
          if (this.filter.length == 0) {
            this.CheckGlobalByName();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /* por keyword */
      axios
        .get(this.server + "/api/v1.0/store/search/filter/", {
          params: {
            criterio: criterio,
            by: "keywords",
            kword: this.kword.toLowerCase(),
            pais: this.geoData.pais.toLowerCase(),
            region: this.geoData.region.toLowerCase(),
            subregion: this.geoData.subregion.toLowerCase(),
            ciudad: this.geoData.ciudad.toLowerCase(),
          },
        })
        .then((response) => {
          console.log("filter_by_keyword");
          this.filter_by_keyword = response.data.results;
          console.log(this.filter_by_keyword);
          if (this.filter_by_keyword.length == 0) {
            this.CheckGlobalByKeywords();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    MoreOptions(option) {
      this.tiendasByKeywords_search = [];
      this.tienda_search = [];
      this.more_results_by_title = [];
      this.more_results_by_keywords = [];

      console.log("options");
      console.log(option);

      if (option.search("Ciudad") > -1) {
        this.Search("ciudad");
      }

      if (option.search("Departamento") > -1) {
        this.Search("subregion");
      }

      if (option.search("Provincia") > -1) {
        console.log("es Provincia");
        this.Search("region");
      }

      if (option.search("Pais") > -1) {
        console.log("es Pais");
        this.Search("pais");
      }
    },

    SearchWhenClickOnButton(radius) {
      this.tiendasByKeywords_search_cp = 1;
      this.tiendasByKeywords_search_next = false;
      this.tiendasByKeywords_search_previous = false;
      this.SearchStoresGeoDjango(radius);
    },

    SearchStoresGeoDjango(radius) {
      this.radius = radius;
      this.ClearPreviousResults();
      this.filter = [];
      this.filter_by_keyword = [];
      this.select_input = "";
      this.more_results_by_title = [];
      this.more_results_by_keywords = [];
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );

      axios
        .get(this.server + "/api/v1.0/store/search/", {
          params: {
            lng: this.geoData.lng,
            lat: this.geoData.lat,
            radius: radius,
            title: this.kword,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tienda_search = response.data.results;
          if (this.tienda_search.length == 0) {
            this.CheckGlobalByName();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /* busco por keywords */
      axios
        .get(this.server + "/api/v1.0/store/search/description/", {
          params: {
            lat: this.geoData.lat,
            lng: this.geoData.lng,
            radius: radius,
            description: this.kword,
            page: this.tiendasByKeywords_search_cp,
          },
        })
        .then((response) => {
          console.log("el ojete");
          console.log(response.data);

          console.log(response.data.next);
          if (response.data.next) {
            console.log("este quedo vacion?");
            this.tiendasByKeywords_search_next = true;
          }
          if (response.data.previous) {
            console.log("previous esta?");
            this.tiendasByKeywords_search_previous = true;
          }
          this.tiendasByKeywords_search = response.data.results;
          if (this.tiendasByKeywords_search.length == 0) {
            this.CheckGlobalByKeywords();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  color: #000000 !important;
}

.info_item_avg {
  display: flex;
  align-items: center;
  justify-content:flex-start;
}
.dot {
  height: 20px;
  width: 20px;
  background-color: #efefef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating_container {
  border: 1px solid #a1a1a1;
  border-radius: 10% !important;
  width: 50px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating_number {
  padding-right: 3px;
}

.busqueda_header {
  border: 1px solid #e8c2fa;
  border-radius: 4px !important;
  color: gray;
}
.tienda_title {
  color: black;
  padding: 0;
  margin: 0;
}
.tienda_description {
  font-size: 12px !important;
}
.search_label {
  color: #000000;
  font-size: 12px;
}

.geoData {
  font-size: 12px;
}

.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
  margin-bottom: 6px;
}

.tienda_title {
  color: #000000;
  font-size: 16px !important;
}
.tienda_description {
  font-size: 10px !important;
  color: gray !important;
  text-transform: uppercase !important;
  margin-top: 2px !important;
}
.location {
  color: gray;
  font-size: 10px;
  text-transform: uppercase !important;
  margin-top: 2px !important;
}
.address {
  color: #000000 !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
}

.mas-resultados {
  border: solid 1px purple !important;
}
.mas-resultados .mas-resultados-title {
  font-size: 12px !important;
}
/* NAVBAR */

.nav_bar {
  width: 100%;
  height: 55px;
  background-color: #a463bf;
}
.sub_navbar {
  width: 100%;
  height: 65px;
  background-color: #a463bf;
  padding: 0px;
}
.sub_navbar_item {
  font-size: 12px;
}
.dropdown-toggle {
  background-color: #a463bf !important;
  border-color: #a463bf !important;
  color: #ffffff !important;
}
.mi_ubicacion {
  font-size: 12px !important;
  color: #ffffff !important;
  text-transform: uppercase;
}
.ubicacion {
  font-size: 12px !important;
  color: #ffffff;
  text-transform: uppercase;
}
.drop_item {
  font-size: 12px !important;
  text-transform: uppercase !important;
}

@media only screen and (max-width: 768px) {
  .fl-wrap {
    float: left;
    width: 300px;
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
    background: #a463bf;
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
    background: #a463bf;
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