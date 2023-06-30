<template>
  <div class="blog" v-if="entries.length > 0">
    <div class="container">
      <div
        class="row d-flex align-items-center"
        style="padding: 0px 0px 0px 0px !important"
      >
        <div class="col-12 col-sm-12 col-lg-4">
          <v-alert
            :color="alerts_color"
            :style="alerts_font_color"
            border="left"
            height="48"
            class="p-0"
          >
            <div class="row p-0 ml-3">
              <div class="col-8 col-sm-8 col-lg-8">
                <a @click="GoToBlog()">
                  <font-awesome-icon icon="newspaper" /> &nbsp;<span
                    class="title_font"
                  >
                    BLOG
                  </span>
                </a>
              </div>
              <div
                class="col-4 col-sm-4 col-lg-4 d-flex justify-content-end pr-4"
              >
                <span style="font-size: 10px !important">
                  <a @click="GoToBlog()">
                    VER TODO
                    <v-icon :style="alerts_font_color"
                      >mdi-chevron-right</v-icon
                    >
                  </a>
                </span>
              </div>
            </div>
          </v-alert>
        </div>
      </div>
    </div>

    <div class="container">
      <carousel
        :per-page="height"
        :mouse-drag="true"
        :navigationEnabled="height > 2 ? true : false"
        paginationPosition="false"
        :loop="true"
      >
        <slide v-for="(entry, index) in entries" :key="index">
          <div class="row">
            <div class="col-12 col-sm-12">
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
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";
export default {
  name: "tienda_blog_entry",
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
          if (this.$vuetify.breakpoint.width < 360) {
            return 1;
          } else {
            return 2;
          }
        case "sm":
          return 1;
        case "md":
          return 4;
        case "lg":
          return 4;
        case "xl":
          return 4;
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

    GoToBlog() {
      this.$router.push({
        name: "tienda_blog_section",
      });
    },
  },
};
</script>

<style>
.VueCarousel-navigation-button {
	position: absolute;
	top: 50%;
	box-sizing: border-box;
	color: #FFFFFF !important;
	text-decoration: none;
  align-items: center !important;
	appearance: none; 
	border: 1px solid #FFFFFF !important;
  border-radius: 50% !important;
	background: #000000 !important ;
  opacity: 0.5 !important;
	padding: 0px 2px 0px 2px;
  width: 40px !important;
	cursor: pointer;
	outline: none;
}
.entry_portada {
  width: 176px !important;
  height: 186px !important;
  border-radius: 2% !important;
  border: 1px solid darkgray !important;
  position: relative;
  margin-right: 0.1rem;

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
.title_font{
  font-size: 12px !important;
}

@media only screen and (min-width: 768px) {

.title_font{
  font-size: 16px !important;
}

  .entry_portada {
    width: 270px !important;
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
