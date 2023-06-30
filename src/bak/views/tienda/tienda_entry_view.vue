<template>
  <div>
    <div class="portada">
      <img :src="entryView.image" alt=""  style="width: 100%; heigth: auto;"/>
    </div>
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
    </div>
  
    <v-container><v-divider></v-divider></v-container>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6>Mas imagenes:</h6>
        </div>
      </div>
    </div>
    <div class="images">
        <carousel
          :per-page="1"
          :mouse-drag="false"
          :navigationEnabled="height == 4 ? true : false"
          paginationPosition="false"
          :loop="true"
        >
          <slide v-for="(img, index) in entryView.images_entry" :key="index">
            <div class="images_slide">
              <img
                :src="img.image"
                alt=""
                :class="height == 4 ? 'web' : 'mobile'"
              />
            </div>
          </slide>
        </carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "tienda_entry_view",
  components: {
    Carousel,
    Slide,
  },
  props: ["entry"],
  data() {
    return {
      entryView: [],
    };
  },
  mounted() {
    this.EntryView();
  },
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
    EntryView() {
      axios
        .get(this.server + "/api/v1.0/blog/view/" + this.entry)
        .then((response) => {
          console.log(response.data);
          this.entryView = response.data;
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

.images {
  padding: 0px;
  margin: 0px;
  width: 100%;
}

.images_slide {
  padding: 0px !important;
  margin: 0px !important;
}

.images_slide img {
  width: 100%;
  height: 300px;
}

.web {
  height: 450px !important;
}

.mobile {
  height: 400px !important;
}
</style>