<template>
  <div class="tienda_explorer_content_desktop mt-12 mb-12" :style="Home">
    <div class="container">
      <div class="row">
        <div class="col-9 col-lg-9 content_desktop">
          <tienda_explorer_content_desktop
            :service_id="category_service_id"
            :category_id="category_product_id"
          />
        </div>

        <!-- BARRA NAVEGACION -->
        <div
          class="col-3 col-lg-3 p-0"
        >
          <div class="row">
            <div class="col-12 col-lg-12">
            <div :style="tabs_color" class="d-flex justify-content-center rounded-top"> <span style="font-size: 15px;"><font-awesome-icon icon="fa-compass" /> EXPLORAR CATEGORIAS </span></div>
              <v-tabs>
                <v-tab :style="tabs_color" @click="ChangeVista('products')"
                  ><font-awesome-icon icon="fa-box" />&nbsp; Productos</v-tab
                >
                <v-tab :style="tabs_color" @click="ChangeVista('services')"
                  ><font-awesome-icon icon="fa-calendar-alt" /> &nbsp;
                  Servicios</v-tab
                >
              </v-tabs>
            </div>
          </div>
          <!-- PRODUCTOS -->
          <div class="BARRA_PRODUCTOS" v-if="vista === 'products'">
            <div
              class="container"
              v-if="vacio == 1"
              style="border-radius: 2% !important"
            >
              <div class="col-12">
                <a @click="Volver()">
                  <v-chip class="m-1 chip" > / </v-chip>
                </a>
                <div
                  class="d-inline-block align-middle"
                  v-for="(item, index) in items"
                  :key="index"
                >
                  >
                  <v-chip class="m-1 chip" @click="BreadcrumbsProdcuts(item)">
                    {{ item.text }}
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="container p-0">
              <div class="row" v-if="vacio == 0">
                <ul class="list-group mt-2">
                  <li
                    class="list-group-item"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <a @click="getSubCategory(category)">
                      <div class="container">
                        <div class="row d-flex align-items-center p-0">
                          <div class="col-4 p-0">
                            <img :src="category.image" class="item_image" />
                          </div>
                          <div class="col-8 p-0">
                            <div class="row d-flex align-items-center">
                              <div class="col-10">
                                <span
                                  style="
                                    font-size: 12px !important;
                                    text-transform: uppercase !important;
                                  "
                                  >{{ category.name }}</span
                                >
                              </div>
                              <div class="col-2 p-0">
                                <font-awesome-icon
                                  v-if="category.children.length > 0"
                                  icon="fas fa-chevron-circle-right"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="container p-0" v-if="vacio == 1">
              <div class="row">
                <div class="col-12 p-0">
                  <ul class="list-group mt-2">
                    <li
                      class="list-group-item"
                      v-for="(subcategory, index) in subCategories"
                      :key="index"
                    >
                      <a @click="getSubSubCategory(subcategory)">
                        <div class="container">
                          <div class="row d-flex align-items-center p-0">
                            <div class="col-4 p-0">
                              <img
                                :src="subcategory.image"
                                class="item_image"
                              />
                            </div>
                            <div class="col-8 p-0">
                              <div class="row d-flex align-items-center">
                                <div class="col-10 p-0">
                                  <span
                                    style="
                                      font-size: 12px !important;
                                      text-transform: uppercase !important;
                                    "
                                    >{{ subcategory.name }}</span
                                  >
                                </div>
                                <div class="col-2 p-0">
                                  <font-awesome-icon
                                    v-if="subcategory.children.length > 0"
                                    icon="fas fa-chevron-circle-right"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- SERVICIOS -->

          <div class="BARRA_SERVICES" v-if="vista === 'services'">
            <div
              class="container"
              v-if="vacio_service == 1"
              style="border-radius: 2% !important"
            >
              <div class="col-12">
                <a @click="VolverService()">
                  <v-chip class="m-1 chip"> / </v-chip>
                </a>
                <div
                  class="d-inline-block align-middle"
                  v-for="(item, index) in items_services"
                  :key="index"
                >
                  >
                  <v-chip class="m-1 chip" @click="BreadcrumbsService(item)">
                    {{ item.text }}
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="container p-0">
              <div class="row" v-if="vacio_service == 0">
                <ul class="list-group mt-2">
                  <li
                    class="list-group-item"
                    v-for="(category, index) in categories_services"
                    :key="index"
                  >
                    <a @click="getSubCategoryServices(category)">
                      <div class="container">
                        <div class="row d-flex align-items-center p-0">
                          <div class="col-4 p-0">
                            <img :src="category.image" class="item_image" />
                          </div>
                          <div class="col-8 p-0">
                            <div class="row d-flex align-items-center">
                              <div class="col-10 p-0">
                                <span
                                  style="
                                    font-size: 12px !important;
                                    text-transform: uppercase !important;
                                  "
                                  >{{ category.name }}</span
                                >
                              </div>
                              <div class="col-2 p-0">
                                <font-awesome-icon
                                  v-if="category.children.length > 0"
                                  icon="fas fa-chevron-circle-right"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="container p-0" v-if="vacio_service == 1">
              <div class="row ">
                <div class="col-12 p-0">
                  <ul class="list-group mt-2">
                    <li
                      class="list-group-item"
                      v-for="(subcategory, index) in subCategories_services"
                      :key="index"
                    >
                      <a @click="getSubSubCategoryService(subcategory)">
                        <div class="container">
                          <div class="row d-flex align-items-center p-0">
                            <div class="col-4 p-0">
                              <img
                                :src="subcategory.image"
                                class="item_image"
                              />
                            </div>
                            <div class="col-8 p-0">
                              <div class="row d-flex align-items-center">
                                <div class="col-9 p-0 ml-2">
                                  <span
                                    style="
                                      font-size: 12px !important;
                                      text-transform: uppercase !important;
                                    "
                                    >{{ subcategory.name }}</span
                                  >
                                </div>
                                <div class="col-2 p-0">
                                  <font-awesome-icon
                                    v-if="subcategory.children.length > 0"
                                    icon="fas fa-chevron-circle-right"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tienda_explorer_content_desktop from "../../components/tienda/tienda_explorer_content_desktop.vue";
import { mapState } from "vuex";
export default {
  name:'tienda_explorer_desktop',
  components: {
    tienda_explorer_content_desktop,

  },
  data() {
    return {
      value: 0,
      value_service: 0,
      resultador_por: "",
      /* BARRA NAVEGACION */
      categories: [],
      categories_services: [],
      subCategories: [],
      subCategories_services: [],
      vacio: 0,
      vacio_service: 0,
      vista: "products",
      items: [],
      items_services: [],
      category_service_id: 0,
      category_product_id: 0,
      /* BARRA NAVEGACION */
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.GetCategories();
    this.GetCategoriesServices();
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; min-height: 1200px !important;"
          );
        }
      }
    },
    
    alerts_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return this.tienda.tienda_colors[0].alerts;
      }
    },
    alerts_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].alerts_font + " !important;"
        );
      }
    },

    tabs_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "background-color:" +
          this.tienda.tienda_colors[0].alerts +
          " !important; color:" +
          this.tienda.tienda_colors[0].alerts_font +
          "!important; width:100% !important;"
        );
      }
    },

    nav_bar() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "background-color:" +
          this.tienda.tienda_colors[0].alerts +
          " !important; border-radius: 1% !important;"
        );
      }
    },

    alerts_font_color() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].alerts_font + " !important;"
        );
      }
    },

    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 6;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    /* BARRA NAVEGACION */
    ChangeVista(value) {
      this.vista = value;
      this.category_product_id = 0;
      this.category_service_id = 0;
    },
    Volver() {
      this.breadcrumbs = [];
      this.GetCategories();
      this.vacio = 0;
    },
    VolverService() {
      this.breadcrumbs_service = [];
      this.GetCategoriesServices();
      this.vacio_service = 0;
    },

    ClearCategories() {
      this.subCategories = [];
      this.items = [];
      this.vacio = 0;
    },

    BreadcrumbsProdcuts(category) {
      console.log(category.id);
      this.getSubSubCategory(category);
      console.log("=====bread");
      console.log(this.items);
    },

    BreadcrumbsService(category) {
      console.log(category.id);
      this.getSubSubCategoryService(category);
      console.log("=====bread");
      console.log(this.items);
    },

    getSubCategory(category) {
      this.items = [];
      this.GetSubCategories(category);
    },
    getSubCategoryServices(category) {
      this.items_services = [];
      this.GetSubCategoriesServices(category);
    },

    getSubSubCategory(subcategory) {
      this.GetSubCategories(subcategory);
    },

    getSubSubCategoryService(subcategory) {
      this.GetSubCategoriesServices(subcategory);
    },

    GetCategories() {
      axios
        .get(
          this.server + "/api/v1.0/categories/list/?tienda=" + this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetCategoriesServices() {
      axios
        .get(this.server + "/api/v1.0/services/categories/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.categories_services = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetSubCategoriesServices(subCategory) {
      axios
        .get(this.server + "/api/v1.0/services/subcategories/", {
          params: {
            id: subCategory.id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          const respuesta = response.data.results;
          if (respuesta.length == 0) {
            console.log("vacio");
            console.log(this.vacio_service);
            let category_id = subCategory.id;
            console.log("ACA ANTES EMIT");
            console.log(category_id);
            this.category_service_id = category_id;
          } else {
            this.vacio_service = 1;
            console.log(this.vacio_service);
            this.subCategories_services = response.data.results;
            const checkUsername = (obj) => obj.id === subCategory.id;
            const check = this.items_services.some(checkUsername);
            console.log(check);
            if (check == false) {
              console.log("este es false");

              this.items_services.push({
                text: subCategory.name,
                disabled: false,
                id: subCategory.id,
              });
            } else {
              console.log("ya esta");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetSubCategories(subCategory) {
      axios
        .get(
          this.server + "/api/v1.0/subcategories/list/?kword=" + subCategory.id
        )
        .then((response) => {
          console.log(response.data.results);
          const respuesta = response.data.results;
          if (respuesta.length == 0) {
            console.log("vacio");

            console.log(this.vacio);
            let category_id = subCategory.id;
            console.log("ACA ANTES EMIT");
            console.log(category_id);
            this.category_product_id = category_id;
          } else {
            this.vacio = 1;
            console.log(this.vacio);
            this.subCategories = response.data.results;
            const checkUsername = (obj) => obj.id === subCategory.id;
            const check = this.items.some(checkUsername);
            console.log(check);
            if (check == false) {
              console.log("este es false");
              this.items.push({
                text: subCategory.name,
                disabled: false,
                id: subCategory.id,
              });
            } else {
              console.log("ya esta");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* BARRA NAVEGACION */
  },
};
</script>

<style scoped>
a {
  color: #000000 !important;
}
.chip{
  background-color: #f8f8f8 !important;
}

.list-group-item {
  width: 250px !important;
  height: 80px !important;
  padding: 0 !important;
}
.item_image {
  width: 50px;
  height: 50px;
  border-radius: 3%;
  margin: 0 !important;
  padding: 0 !important;
}
.item_text {
  font-size: 10 px !important;
  text-transform: uppercase !important;
}
/* 
.content_desktop {
  background-color: #f8f8f8 !important;
  min-height: 480px !important;
  border-radius: 1% !important;
} */
.cards {
  width: 134px !important;
  margin: 2px;
}
.space_personalizado {
  width: 10px !important;
}
.title_font {
  font-size: 16px !important;
  text-transform: uppercase !important;
}
</style>
