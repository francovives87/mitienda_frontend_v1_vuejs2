<template>
  <div class="informacion" :style="tienda_info_style">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            :style="accordion_button_style"
          >
            <v-icon :style="info_icon_style">mdi-plus</v-icon> Mas informacion
            &nbsp;
            <v-icon :style="info_icon_style">mdi-whatsapp</v-icon>
            &nbsp; Contacto
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body" :style="tienda_info_style">
            <div class="row">
              <div class="row">
                <p>
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="calendar-alt" /></span
                  >&nbsp;
                  <span :style="info_item_style"
                    ><span :style="info_icon_style"
                      ><font-awesome-icon icon="clock" />
                    </span>
                    <br />
                    <span
                      v-html="this.tienda.tienda_informacion[0].dias_horarios"
                    ></span
                  ></span>
                </p>
              </div>
              <div class="col-6 col-sm-6">
                <p>
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="store" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].direccion }}</span
                  >
                </p>
              </div>
              <div class="col-6 col-sm-6">
                <p>
                  <span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].horario }}</span
                  >
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="truck" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].envio }}</span
                  >
                  <br />
                  <span :style="info_icon_style"
                    ><font-awesome-icon icon="mobile-alt" /></span
                  ><span :style="info_item_style">
                    {{ this.tienda.tienda_informacion[0].telefono }}</span
                  >
                </p>
              </div>
              <div class="col-12 col-sm-12 d-flex justify-content-end">
                <v-btn
                  elevation="4"
                  icon
                  style="background-color: white"
                  @click="WhatsAppContact()"
                >
                  <v-icon color="green">mdi-whatsapp</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tienda_informacion.vue",

  data() {
    return {
      background_color: "",
      icons_color: "",
      font_color: "",

      tienda_info_style: {
        background: this.background_color,
      },

      info_item_style: {
        fontSize: "12px",
        color: this.font_color,
      },

      info_icon_style: {
        fontSize: "14px",
        color: this.icons_color,
      },
      accordion_button_style: {
        background: this.background_color,
        color: this.font_color,
      },
    };
  },

  mounted() {
    this.background_color = this.tienda.tienda_colors[0].info_background_color;
    this.icons_color = this.tienda.tienda_colors[0].info_icons_color;
    this.font_color = this.tienda.tienda_colors[0].info_font_color;
  },

  methods: {
    WhatsAppContact() {
      if (this.tienda.tienda_informacion[0].whatsapp == null) {
        this.$swal.fire(
          "WhatsApp NO conectado!",
          "el admnistrador de esta tienda, aun no ha conectado un numero valido para WhatsApp",
          "error"
        );
      } else {
        window.open(
          "https://api.whatsapp.com/send?phone=" +
            this.tienda.tienda_informacion[0].whatsapp +
            "&text=Hola!%20tengo%20una%20consulta%20de%20su%20tienda.",
          "_blank"
        );
      }
    },
  },

  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  watch: {
    background_color: function (value) {
      this.tienda_info_style.background = this.background_color;
      this.accordion_button_style.background = this.background_color;
    },
    icons_color: function (value) {
      this.info_icon_style.color = this.icons_color;
    },
    font_color: function (value) {
      this.info_item_style.color = this.font_color;
      this.accordion_button_style.color = this.font_color;
    },
  },
};
</script>

<style scoped>
.accordion-button::after {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  content: "";
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.25rem;
  transition: transform 0.2s ease-in-out;
}
</style>