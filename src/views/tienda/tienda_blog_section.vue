<template>
  <div class="blog_secction mt-10" :style="Home">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <carousel
            :per-page="height"
            :mouse-drag="false"
            :navigationEnabled="height >= 3 ? true : false"
            paginationPosition="false"
            :loop="true"
          >
            <slide v-for="(categorie, i) in categories" :key="i">
              <button
                type="button"
                :style="btnSuccess"
                @click="GetEntryByCategory(categorie.id)"
              >
                {{ categorie.name }}
              </button>
            </slide>
          </carousel>
          <div class="row mt-6">
            <v-divider></v-divider>
            <div class="col-12 d-flex justify-content-end">
              <button
                type="button"
                :style="btnSuccess"
                @click="GetAllEntriesForBlog()"
              >
                VER TODO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row d-flex justify-content-start">
            <div
              class="col-6 col-sm-6 col-lg-4"
              v-for="(entry, index) in entries"
              :key="index"
            >
              <div class="entry_portada">
                <router-link
                  :to="{ name: 'EntryView', params: { entry: entry.id } }"
                >
                  <img :src="entry.image" class="entry_portada_image" alt="" />

                  <div class="overlay">
                    {{ entry.title }}
                  </div>
                </router-link>
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
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "tienda_blog_section",

  components: {
    Carousel,
    Slide,
  },

  created() {
    this.GetAllEntriesForBlog();
    this.GetAllCategories();
  },

  mounted() {
    window.scrollTo(0, 0);
    this.background_color = this.tienda.tienda_colors[0].info_background_color;
    this.font_color = this.tienda.tienda_colors[0].info_font_color;
  },

  data() {
    return {
      entries: [],
      categories: [],
      background_color: "",
      font_color: "",
      btnSuccess: {
        color: this.font_color,
        backgroundColor: this.background_color,
        border: "solid 3px",
        borderColor: this.font_color,
        height: "50px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "5%",
      },
      info_link_style: {
        marginRight: "10px",
        fontSize: "12px",
        textTransform: "uppercase",
        textDecoration: "underline",
        color: this.font_color,
      },
    };
  },

  watch: {
    background_color: function (value) {
      this.btnSuccess.backgroundColor = this.background_color;
    },
    font_color: function (value) {
      this.btnSuccess.color = this.font_color;
      this.info_link_style.color = this.font_color;
    },
  },

  computed: {
    ...mapState("tienda", ["tienda"]),

    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 3;
        case "sm":
          return 3;
        case "md":
          return 3;
        case "lg":
          return 6;
        case "xl":
          return 6;
      }
    },

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
            ")  !important; background-repeat: repeat !important; min-height: 960px;"
          );
        }
      }
    },

    navbar_color() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return (
          "background-color: " +
          this.tienda.tienda_colors[0].navbar +
          " !important; color:" +
          this.tienda.tienda_colors[0].navbar_font +
          "!important;"
        );
      }
    },

    title() {
      if (!this.tienda.name) {
        return "#212529";
      } else {
        return (
          "background-color: " +
          this.tienda.tienda_colors[0].navbar +
          " !important; color:" +
          this.tienda.tienda_colors[0].navbar_font +
          "!important; width:70px; heigth 200px;"
        );
      }
    },

    navbar_font() {
      if (!this.tienda.name) {
        return "#ffffff";
      } else {
        return (
          "color: " + this.tienda.tienda_colors[0].navbar_font + " !important;"
        );
      }
    },
  },

  methods: {
    GetEntryByCategory(category_id) {
      axios
        .get(this.server + "/api/v1.0/blog/entry/by/categorie/", {
          params: {
            tienda: this.tienda.id,
            category: category_id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.entries = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetAllCategories() {
      axios
        .get(this.server + "/api/v1.0/blog/categories/all/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetAllEntriesForBlog() {
      axios
        .get(this.server + "/api/v1.0/blog/entry/all/", {
          params: {
            tienda: this.tienda.id,
          },
        })
        .then((response) => {
          this.entries = response.data.results;
          console.log(this.entries);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.entry_portada {
  width: 160px !important;
  height: 180px !important;
  border-radius: 2% !important;
  position: relative;
}

.entry_portada_image {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 2% !important;
}

.overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7); /* Black see-through */
  color: #f1f1f1;
  width: 100%;
  transition: 0.5s ease;
  color: white;
  font-size: 11px;
  padding: 15px;
  text-align: left;
  text-transform: uppercase;
  opacity: 1;
  border-bottom-left-radius: 3%;
  border-bottom-right-radius: 3%;
}

@media only screen and (min-width: 768px) {
  .entry_portada {
    width: 300px !important;
    height: 300px !important;
    border-radius: 2% !important;
    position: relative;
  }

  .entry_portada_image {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2% !important;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.7); /* Black see-through */
    color: #f1f1f1;
    width: 100%;
    transition: 0.5s ease;
    color: white;
    font-size: 16px;
    padding: 16px;
    text-align: left;
    text-transform: uppercase;
    opacity: 1;
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
  }
}
</style>