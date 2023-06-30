<template>
  <div class="disapositivas mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-6">
          <h6><font-awesome-icon icon="images" /> Diaspositivas</h6>
        </div>
        <div class="col-6 col-sm-6">
          <div class="col-2 col-sm-2">
            <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
              <v-btn
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#CreateSliderModal"
              >
                <font-awesome-icon icon="images" />
              </v-btn>
            </v-badge>
          </div>
        </div>
      </div>

      <v-container><v-divider></v-divider></v-container>

      <!-- lista de sliders -->
      <div class="container" v-if="sliders.length == 0">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h6>No se ha creado ninguna diapositiva todavia.</h6>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="card" v-for="(slide, index) in sliders" :key="index">
          <div class="card-body">
            <div class="container">
              <div class="row d-flex align-items-center">
                <div class="col-6 col-sm-6">
                  <img
                    :src="slide.image"
                    alt=""
                    style="width: 120px; heigth: 150px"
                  />
                </div>
                <div class="col-6 col-sm-6">
                  <div class="mb-2">
                    <v-switch
                      v-model="slide.is_public"
                      label="Publicar"
                      @change="UpdatePublic(slide)"
                    ></v-switch>
                  </div>
                  <v-btn
                    class="mr-2"
                    color="green"
                    small
                    elevation="2"
                    icon
                    outlined
                    data-bs-toggle="modal"
                    data-bs-target="#UpdateImageSlider"
                    @click="SetSliderToEdit(slide)"
                    ><font-awesome-icon icon="image" />
                  </v-btn>
                  <v-btn
                    color="red"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="DeleteSlider(slide)"
                    ><v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Lista Sliders -->

      <!-- MODALES -->
      <!-- slider Update image modal -->
      <div
        class="modal fade"
        id="UpdateImageSlider"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modificar imagen diapositiva
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div></div>
              <br />
              <p>Imagen actual:</p>
              <div class="image_actual col-12 col-sm-12">
                <img
                  :src="sliderToEdit.image"
                  alt=""
                  style="width: 150px; heigth: 150px"
                />
              </div>
              <label for="image_edit" class="form-label"
                >Selecionar nueva imagen</label
              >
              <div class="mb-3">
                <input
                  type="file"
                  class="form-control"
                  name="image_edit"
                  id="image_edit"
                  ref="imageEdit"
                  @change="onFileSelectedUpdate"
                />
              </div>
              <p>Imagen seleccionada:</p>
              <div class="image_actual col-12 col-sm-12">
                <img
                  :src="preview"
                  alt=""
                  style="width: 150px; heigth: 150px"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="UpdateTiendaLogo()"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Slider Update image modal -->

      <!-- Create slider modal -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="CreateSliderModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Crear Diapositiva
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6>Seleccione una imagen:</h6>
              <div class="mb-3">
                <input
                  type="file"
                  class="form-control"
                  name="image_edit"
                  id="image_edit"
                  ref="imageEdit"
                  @change="onFileSelectedCreate"
                />
              </div>
              <p>Imagen seleccionada:</p>
              <div class="image_actual col-12 col-sm-12">
                <img
                  :src="slide.preview"
                  alt=""
                  style="width: 150px; heigth: 150px !important"
                />
              </div>
              <v-switch v-model="slide.is_public" label="Publicar"></v-switch>
              <div class="d-flex justify-content-center">
                <p>
                  <span class="save"
                    >Active Publicar para que se muestre la diapositiva en la
                    aplicacion</span
                  >
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="CreateSlider()"
              >
                Crear diapositiva
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create slider modal -->

      <!-- MODALES -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
export default {
  name: "admin_diaspositivas",
  components: {
    admin_menu,
  },
  data() {
    return {
      sliders: [],
      sliderToEdit: {
        id: 0,
        image: null,
        is_public: null,
      },

      slide: {
        image: null,
        preview: null,
        is_public: false,
      },
      imageToEdit: null,
      preview: null,
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },

  created() {
    this.Guard();
    this.GetSlidersPrivate();
  },

  mounted() {},
  methods: {
    /* el metodo guard sirve de permiso, para que no se cargue una vista Admin si no es de su tienda */
    Guard() {
      console.log("GUARD!");
      if (this.tienda.user != localStorage.getItem("cod_ref")) {
        console.log("este es un loquito");
        this.$router.push({
          name: "Main",
        });
      }
    },

    UpdatePublic(slide) {
      const data = new FormData();
      data.append("is_public", slide.is_public);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/tienda/slider/public/" +
            slide.id +
            "/",
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Diapositiva Actualizada!",
            "La diapositiva fue actualizada correctamente.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
          this.GetSlidersPrivate();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetSliderToEdit(slide) {
      this.sliderToEdit = {
        id: slide.id,
        image: slide.image,
        is_public: slide.is_public,
      };
      console.log(this.sliderToEdit);
      console.log(this.imageToEdit);
    },

    onFileSelectedUpdate(event) {
      this.imageToEdit = event.target.files[0];
      this.preview = URL.createObjectURL(this.imageToEdit);
    },

    onFileSelectedCreate(event) {
      this.slide.image = event.target.files[0];
      this.slide.preview = URL.createObjectURL(this.slide.image);
    },

    CreateSlider() {
      const data = new FormData();
      data.append("image", this.slide.image);
      data.append("is_public", this.slide.is_public);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/tienda/slider/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.$swal.fire(
            "Diapositiva Creada!",
            "La diapositiva ha sido creada correctamente.",
            "success"
          );
          this.GetSlidersPrivate();
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Error limite alcanzado!",
            "ha alcanzado el limite de productos que puede crear segun su plan.",
            "error"
          );
        });
    },

    DeleteSlider(slide) {
      this.$swal
        .fire({
          title: "Esta seguro que desea eliminar?",
          text: "Esta a punto de eliminar esta diaposivita!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            /* Primero compruebo si tiene subcategoria */
            axios
              .delete(
                this.server +
                  "/api/v1.0/admin/tienda/slider/delete/" +
                  slide.id +
                  "/"
              )
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Diapositiva eliminado!",
                  "La diapositiva ha sido eliminada correctamente.",
                  "success"
                );
                this.GetSlidersPrivate();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdateTiendaLogo() {
      const data = new FormData();
      data.append("image", this.imageToEdit);
      data.append("tienda", this.tienda.id);
      data.append("is_public", this.sliderToEdit.is_public);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/tienda/slider/update/" +
            this.sliderToEdit.id +
            "/",
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Diapositiva Actualizada!",
            "La diapositiva fue actualizada correctamente.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
          this.GetSlidersPrivate();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetSlidersPrivate() {
      axios
        .get(this.server + "/api/v1.0/admin/tienda/slider/" + this.tienda.id)
        .then((response) => {
          console.log(response.data.results);
          this.sliders = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>