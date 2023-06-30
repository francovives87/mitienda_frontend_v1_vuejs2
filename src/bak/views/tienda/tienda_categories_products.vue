<template>
  <div>
    <tienda_barra_mobile></tienda_barra_mobile>
    <div class="container mt-10">
      <div class="categorias row">
        <carousel
          :per-page="height"
          :mouse-drag="false"
          :navigationEnabled="height == 4 ? true : false"
          paginationPosition="false"
          :loop="true"
        >
          <slide v-for="(category, index) in categories" :key="index">
            <div class="col-lg-12">
              <div
                class="card mb-3 text-center"
                @click="getSubCategory(category)"
              >
                <img :src="category.image" alt="" class="img-fluid" />
                <div class="card-body">
                  {{ category.name }}
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <div class="container" v-if="vacio == 1">
        <div class="col-12">
          <div
            class="d-inline-block align-middle"
            v-for="(item, index) in items"
            :key="index"
          >
            <v-chip class="m-1" @click="breadcrumbs(item)">
              {{ item.text }}
            </v-chip>
          </div>
        </div>

        <br />
        <div
          class="row"
          v-for="(subcategory, index) in subCategories"
          :key="index"
        >
          <div class="card col-md-12 m-2 p-2">
            <div class="row">
              <div class="col-4">
                <img
                  :src="subcategory.image"
                  class=""
                  alt="..."
                  style="height: 100px"
                  @click="getSubSubCategory(subcategory)"
                />
              </div>
              <div class="col-8">
                <div class="card-body">
                  <p class="card-text"></p>
                  <a @click="getSubSubCategory(subcategory)">
                    {{ subcategory.name }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tienda_bottom_navigation :tienda="tienda" />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";
import tienda_bottom_navigation from "../../components/tienda/tienda_bottom_navigation.vue";
export default {
  name: "tienda_categories_products",

  components: {
    tienda_barra_mobile,
    tienda_bottom_navigation,
    Carousel,
    Slide,
  },
  data() {
    return {
      categories: [],
      subCategories: [],
      vacio: 0,
      items: [],
    };
  },
  mounted() {
    this.GetCategories();
    console.log(this.$route.params.name)

  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
      }
    },
  },

  methods: {
    breadcrumbs(category) {
      console.log(category.id);
      this.getSubSubCategory(category);
      console.log("=====bread");
      console.log(this.items);
    },

    getSubCategory(category) {
      this.items = [];
      this.GetSubCategories(category);
    },

    getSubSubCategory(subcategory) {
      this.GetSubCategories(subcategory);
    },
    GetCategories() {
      axios
        .get(this.server + "/api/v1.0/categories/list/?tienda="+this.tienda.id)
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
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
            this.vacio = 0;
            console.log(this.vacio);
            let category_id = subCategory.id;
            this.$router.push({
              name: "CategoriesView",
              params: { category_id:category_id, tienda:this.tienda },
            });
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
  },
};
</script>

<style scoped>
/* --------------------------------------- */

.categorias span {
  color: yellowgreen;
  font-size: 19px;
  font-weight: 800;
  padding-left: 5px;
}

.categorias .card {
  border: 1px;
  border-radius: 3%;
  border: 5px gray;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.categorias img {
  width: auto;
  border-radius: 3%;
  height: 240px;
}

.categorias .card:hover input {
  opacity: 1;
  transition: 1s;
}

.categorias input:hover {
  background-color: rgb(82, 75, 75);
  transition: 0.5s;
}

.card a {
  color: black !important;
}
</style>