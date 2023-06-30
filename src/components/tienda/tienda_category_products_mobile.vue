<template>
  <div class="tienda_category_products"  v-if="categories.length > 0">
    <div class="row">
      <div class="col-12 col-sm-12">
        <v-alert
          :color="alerts_color"
          :style="alerts_font_color"
          border="left"
          height="46"
          class="p-0"
        >
          <div class="row p-0 ml-4">
            <div class="col-10"><span style="font-size:12px;">CATEGORIAS DE PRODUCTOS</span></div>
            <div class="col-2">
              <a @click="ClearCategories()">
                <v-icon :style="alerts_font_color">mdi-chevron-up</v-icon></a
              >
            </div>
          </div>
        </v-alert>
      </div>
    </div>
    <div class="row">
      <carousel
        :per-page="height"
        :mouse-drag="false"
        :navigationEnabled="height == 4 ? true : false"
        paginationPosition="false"
        :loop="true"
      >
        <slide
          v-for="(category, index) in categories"
          :key="index"
          class="categorias"
        >
          <div class="col-12 col-sm-12">
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
    <div class="bottm" style="height: 250px"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "tienda_category_products_mobile",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      categories: [],
      subCategories: [],
      vacio: 0,
      items: [],
      down_to_end: false,
    };
  },
  mounted() {
    this.GetCategories();
    console.log(this.$route.params.name);
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
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
    ClearCategories() {
      this.subCategories = [];
      this.items = [];
      this.vacio = 0;
    },

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
    GetSubCategories(subCategory) {
      axios
        .get(
          this.server + "/api/v1.0/subcategories/list/?kword=" + subCategory.id
        )
        .then((response) => {
          this.down_to_end = true;
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          );
          console.log(response.data.results);
          const respuesta = response.data.results;
          if (respuesta.length == 0) {
            console.log("vacio");
            this.vacio = 0;
            console.log(this.vacio);
            let category_id = subCategory.id;
            this.$router.push({
              name: "CategoriesView",
              params: { category_id: category_id, tienda: this.tienda },
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
a {
  color: #000000;
}
.categorias span {
  color: yellowgreen;
  font-size: 19px;
  font-weight: 800;
  padding-left: 1px;
}

.categorias .card {
  border: 1px;
  border-radius: 3%;
  border: 5px gray;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 140px !important;
  height: 180px !important;
}

.categorias img {
  width: auto !important;
  border-radius: 3%;
  min-height: 130px !important;
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

.tienda_nuevas_title {
  border-bottom: solid 1px #e8c2fa;
  font-size: 13px;
}
</style>
