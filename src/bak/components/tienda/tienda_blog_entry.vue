<template>
  <carousel
    :per-page="height"
    :mouse-drag="false"
    :navigationEnabled="height == 4 ? true : false"
    paginationPosition="false"
    :loop="true"
  >
    <slide v-for="(entry, index) in entries" :key="index">
      <div class="article">
        <div class="col-lg-12">
          <div class="card entry_portada">
            <div class="card-body entry_card_body">
              <router-link
                :to="{ name: 'EntryView', params: { entry: entry.id } }"
              >
                <div class="d-flex justify-content-center">
                  <img :src="entry.image" class="entry_portada_image" alt="" />
                </div>
              </router-link>
              <p class="pt-3">
                <a href="#">{{ entry.title }}</a>
              </p>
              <p class="resume" v-html="entry.content.substring(0, 250)">
                {{}}
              </p>
              <small
                >By Admin / <span>{{ entry.category.name }}</span></small
              >
            </div>
          </div>
        </div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";
export default {
  name: "tienda_blog_entry",
  props: ["tienda"],
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      entries: [],
    };
  },
  mounted() {
    this.GetEntryHome();
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
    GetEntryHome() {
      axios
        .get(this.server + "/api/v1.0/blog/entry/list/" + this.tienda.id)
        .then((response) => {
          console.log(response.data.results);
          this.entries = response.data.results;
        })
        .catch((error) => {
          console.log(console.error());
        });
    },
  },
};
</script>

<style scopde>
.card {
  width: 100%;
}

.article a {
  list-style: none !important;
  color: black !important;
  outline: none !important;
}

.article a:hover {
  color: yellowgreen;
  transition: 0.3s;
}

.article p {
  font-size: 21px;
}

.article span {
  color: yellowgreen;
}

.article small {
  font-size: 15px;
}

.article img {
  height: 250 px;
  width: 100%;
}
.article .resume {
  font-size: 14px !important;
}
.entry_portada {
  width: 320px !important;
  height: auto !important;
  border-radius: 2% !important;
}
.entry_card_body{
  padding: 0px !important;
}
.entry_portada_image{
  width: 318px !important;
  height: 250px !important;
  max-height: 250px !important;
  border-top-left-radius:2% !important;
  border-top-right-radius: 2% !important;
  
}
</style>