<template>
  <div class="tienda_entry_detail_desktop pb-8" :style="Home">

    <div class="container card mt-12">
      <div class="row">
        <div class="col-12 col-lg-12">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in imagenes_array"
              :key="i"
              :src="item.image"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>
        <div class="row">
          <div class="container">
            <div class="row">
              <h5>{{ entryView.title }}</h5>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="contenido">
                <div class="parrafo" v-html="entryView.content"></div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "tienda_entry_detail_desktop",
  components: {},
  props: ["entry"],
  data() {
    return {
      entryView: [],
      imagenes_array: [],
    };
  },

  created() {
    this.EntryView();
  },

  mounted() {},
  computed: {
      ...mapState("tienda",["tienda"]),

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

    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important; padding-top:20px !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important; padding-top:20px !important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; height: auto; padding-top:20px !important;"
          );
        }
      }
    },
  },
  methods: {
    LoadImages() {
      let images = {
        image: null,
      };
      this.entryView.images_entry.forEach((el) => {
        images = {
          image: el.image,
        };
        this.imagenes_array.push(images);
      });
      let portada = {
        image: this.entryView.image,
      };
      this.imagenes_array.unshift(portada);

      console.log("desde LOAD_images");
      console.log(this.imagenes_array);
    },

    EntryView() {
      axios
        .get(this.server + "/api/v1.0/blog/view/" + this.entry)
        .then((response) => {
          console.log(response.data);
          console.log("entryView");
          this.entryView = response.data;
          console.log(this.entryView);
          this.LoadImages();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.portada img {
  width: 100%;
  height: 400px;
}

.resume p {
  color: black !important;
}

.contenido >>> .parrafo {
  color: #000000 !important;
  font-size: 50px !important;
}

.images_slide {
  padding: 0px !important;
  margin: 0px !important;
}

.images_slide img {
  width: 100%;
  max-height: auto !important;
}
.web {
  height: 450px !important;
}

.mobile {
  height: 380px !important;
}

.product {
  width: 300px;
  height: 300px;
}

.product_image {
  width: 260px !important;
  height: 260px !important;
}

@media only screen and (min-width: 768px) {
  .product {
    width: 640px;
    height: 440px;
  }

  .product_image {
    width: 600px !important;
    height: 400px !important;
  }
}
</style>