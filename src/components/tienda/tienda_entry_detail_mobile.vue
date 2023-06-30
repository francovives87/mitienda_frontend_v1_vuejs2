<template>
  <div class="tienda_entry_detail_mobile mt-12">
    <div class="images" v-if="height < 2">
      <carousel
        :per-page="1"
        :mouse-drag="false"
        :navigationEnabled="height == 4 ? true : false"
        paginationPosition="false"
        :loop="true"
      >
        <slide v-for="(img, index) in imagenes_array" :key="index">
          <div class="images_slide">
            <img :src="img.image" alt="" class="mobile" />
            <div class="overlay">
              <font-awesome-icon icon="fa-images" /> &nbsp; {{ index + 1 }}/{{
                imagenes_array.length
              }}
            </div>
          </div>
        </slide>
      </carousel>
    </div>
    <div class="container">
      <div class="row">
        <h5>{{ entryView.title }}</h5>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="contenido" v-if="contiendo_extenso == false">
          <div
            class="parrafo"
            v-html="entryView.content.substring(0, 670) + ' ...(continua)'"
          ></div>
          <div class="d-flex justify-content-end">
            <v-btn elevation="2" outlined small @click="contiendo_extenso = true"
              ><span style="font-size: 12px !important">MOSTRAR TODO</span></v-btn
            >
          </div>
        </div>
        <div class="contenido" v-if="contiendo_extenso == true">
          <div class="parrafo" v-html="entryView.content"></div>
          <div class="d-flex justify-content-end">
            <v-btn elevation="2" outlined small @click="contiendo_extenso = false"
              ><span style="font-size: 12px !important">MOSTRAR MENOS</span></v-btn
            >
          </div>
        </div>
      </div>
    </div>

    <v-container><v-divider></v-divider></v-container>
    <tienda_blog_entry_comments :entry_id="entry_id" />
  </div>
</template>

<script>
import tienda_blog_entry_comments from "./tienda_blog_entry_comments.vue";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "tienda_entry_detail_mobile",
  components: {
    Carousel,
    Slide,
    tienda_blog_entry_comments,
  },
  props: ["entry"],
  data() {
    return {
      entryView: [],
      imagenes_array: [],
      entry_id: 0,
      contiendo_extenso: false,
    };
  },

  created() {
    this.EntryView();
    this.entry_id = this.entry;
  },

  mounted() {},
  computed: {
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
a {
  color: darkslategrey !important;
}

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

.images_slide img {
  width: 100%;
  max-height: auto !important;
}
.web {
  height: 450px !important;
}

.images_slide {
  padding: 0px !important;
  margin: 0px !important;
  position: relative;
  margin-top: 15px;
}

.mobile {
  height: 380px !important;
  display: block;
  width: 100%;
}
.overlay {
  position: absolute;
  margin-top: 10px;
  top: 0;
  right: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7); /* Black see-through */
  color: #f1f1f1;
  width: 66px;
  height: 38px;
  transition: 0.5s ease;
  color: white;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  text-transform: uppercase;
  opacity: 1;
  border-bottom-left-radius: 3%;
  border-bottom-right-radius: 3%;
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
