<template>
  <div class="admin_entry_images mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6>Editar imagenes de la entrada</h6>
        </div>
      </div>
    </div>
    <v-container><v-divider></v-divider></v-container>
    <div class="container">
      <div class="row">
        <h6>Producto: {{ entry.title }}</h6>
      </div>
      <v-divider></v-divider>

      <div class="row">
        <div class="col-12 col-sm-12">Portada</div>

        <div class="row d-flex align-items-center">
          <div class="col-9 col-sm-9">
            <img :src="entry.image" alt="" class="images" />
          </div>
          <div class="col-3 col-sm-3">
            <v-btn
              class="mr-2"
              color="green"
              medium
              elevation="2"
              icon
              outlined
              data-bs-toggle="modal"
              data-bs-target="#UpdatePortadaImage"
              ><font-awesome-icon icon="image" />
            </v-btn>
          </div>
        </div>

        <v-container><v-divider></v-divider></v-container>
        <div class="col-6 col-sm-6">
          <span> Mas Imagenes </span> <br />
          <span class="allow_create">puede agregar: {{ allow_create }}</span>
        </div>
        <div class="col-6 col-sm-6">
          <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
            <v-btn
              elevation="4"
              icon
              data-bs-toggle="modal"
              data-bs-target="#AddImagesModal"
            >
              <font-awesome-icon icon="image" />
            </v-btn>
          </v-badge>
        </div>
        <div
          class="row d-flex align-items-center"
          v-for="(image, index) in entry.images_entry"
          :key="index"
        >
          <div class="col-8 col-sm-8">
            <img :src="image.image" alt="" class="images" />
          </div>
          <div class="col-4 col-sm-4">
            <v-btn
              class="mr-2"
              color="red"
              medium
              elevation="2"
              icon
              outlined
              @click="DeleteImage(image)"
              ><v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              class="mr-2"
              color="green"
              medium
              elevation="2"
              icon
              outlined
              data-bs-toggle="modal"
              data-bs-target="#UpdateProductImagas"
              @click="SetImageToEdit(image)"
              ><font-awesome-icon icon="image" />
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- MODAL EDITAR PORTADA -->

    <div
      class="modal fade"
      id="UpdatePortadaImage"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Editar imagen de portada
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="ClearPordaSelectImage()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <h6>Imagen Actual</h6>
                </div>
                <div class="col-12 col-sm-12">
                  <img :src="entry.image" alt="" class="images" />
                </div>
                <label for="image_edit" class="form-label"
                  >Selecionar nueva imagen</label
                >
                <div class="mb-3">
                  <input
                    type="file"
                    class="form-control"
                    name="portada_image"
                    id="portada_image"
                    ref="portada_image"
                    @change="onFileSelectedUpdate"
                  />
                </div>
                <p>Imagen nueva:</p>
                <div class="image_actual col-12 col-sm-12">
                  <img :src="previewNewPortadaImage" alt="" class="images" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="ClearPordaSelectImage()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdatePortadaImage()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR PORTADA -->

    <!-- MODAL EDITAR IMAGES -->

    <div
      class="modal fade"
      id="UpdateProductImagas"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar imagen</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="ClearSelect()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <h6>Imagen Actual</h6>
                </div>
                <div class="col-12 col-sm-12">
                  <img :src="ImageToEdit" alt="" class="images" />
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
                    ref="image_edit"
                    @change="onFileSelectedImages"
                  />
                </div>
                <p>Imagen nueva:</p>
                <div class="image_actual col-12 col-sm-12">
                  <img :src="previewImages" alt="" class="images" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="ClearSelect()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateImageOffProduct()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR IMAGES -->

    <!-- MODAL AGREGAR IMAGENES -->
    <div
      class="modal fade"
      id="AddImagesModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Agregar mas imagenes
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="ClearMoreImagesToadd()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="contianer">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <h6>Mas imagenes</h6>
                  <input
                    type="file"
                    class="form-control mb-4"
                    name="entry_more_images"
                    id="entry_more_images"
                    ref="entry_more_images"
                    multiple="multiple"
                    @change="uploadImage"
                  />

                  <div
                    v-for="(image, key) in entry_more_images"
                    :key="key"
                    class="d-inline mt-2"
                  >
                    <img class="images" :ref="'more_images'" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="ClearMoreImagesToadd()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="CreateProductMoreImages()"
            >
              Agregar mas imagenes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR IMAGENES -->

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
export default {
  name: "admin_entry_images",
  components: {
    admin_menu,
  },
  props: ["entry_id"],
  data() {
    return {
      entry: [],
      newPortadaImage: null,
      previewNewPortadaImage: null,
      ImageToEdit: null,
      ImageToEditID: 0,
      previewImages: null,
      newImage: null,
      entry_more_images: [],
      cant_images: 0,
      allow_create: 0,
    };
  },
  created() {
    this.Guard();
    this.GetEntry();
    this.GetCantImagesOffProduct();
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
  },
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

    /* metodo js para carcar y hace preview de multiples imagenes */

    GetCantImagesOffProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/blog/entry/images/count/?entry=" +
            this.entry_id
        )
        .then((response) => {
          this.cant_images = response.data.cant_images;
          console.log("cantidad images");
          console.log(this.cant_images);
          if (this.cant_images > 0) {
            this.allow_create =
              this.tienda.plan.images_x_entries - this.cant_images;
            console.log("se pueden crear");
            console.log(this.allow_create);
          }
        })
        .catch((error) => {
          console.log(error);
          this.allow_create = this.tienda.plan.images_x_entries;
        });
    },

    uploadImage(e) {
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        this.entry_more_images.push(selectedFiles[i]);
        if (this.entry_more_images.length > this.allow_create) {
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
          this.$refs.entry_more_images.value = null;
          this.entry_more_images.splice(0, this.entry_more_images.length);
        }
      }

      for (let i = 0; i < this.entry_more_images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.more_images[i].src = reader.result;
        };

        reader.readAsDataURL(this.entry_more_images[i]);
      }
      console.log(this.entry_more_images);
    },

    ClearMoreImagesToadd() {
      this.$refs.entry_more_images.value = null;
      this.entry_more_images = [];
    },

    CreateProductMoreImages() {
      let data = new FormData();
      data.append("entry", this.entry_id);
      data.append("tienda", this.tienda.id);
      /* TENGO QUE HACER ESTE FOR PORQUE SINO EL BACK NO LA RECIBE,ESTA COPIADO DEL POSTMAN */
      /* TENGO QUE MANDAR POR CADA IMAGE UN FILE */
      for (var i = 0; i < this.$refs.entry_more_images.files.length; i++) {
        let file = this.$refs.entry_more_images.files[i];
        data.append("image", file);
      }
      axios
        .post(this.server + "/api/v1.0/admin/blog/entry/images", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetEntry();
          this.ClearMoreImagesToadd();
          this.GetCantImagesOffProduct();
          this.$swal.fire(
            "Se agregaron mas imagenes!",
            "Las imagenes han sido agregadas correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    DeleteImage(image) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar este producto.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Borrarlo!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server +
                  "/api/v1.0/admin/blog/entry/delete/images/" +
                  image.id,
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Imagen eliminada!",
                  "La imagen ha sido eliminada correctamente.",
                  "success"
                );
                this.ClearSelect();
                this.GetEntry();
                this.GetCantImagesOffProduct();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdateImageOffProduct() {
      let data = new FormData();
      data.append("entry", this.entry_id);
      data.append("image", this.newImage);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/blog/entry/update/images/" +
            this.ImageToEditID,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Imagen Actualizada!",
            "La imagen fue actualizada correctamente.",
            "success"
          );
          this.ClearSelect();
          this.GetEntry();
          this.GetCantImagesOffProduct();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ClearSelect() {
      this.$refs.image_edit.value = null;
      this.newImage = null;
      this.previewImages = null;
    },

    SetImageToEdit(image) {
      this.ImageToEdit = image.image;
      this.ImageToEditID = image.id;
      console.log(this.ImageToEdit);
      console.log(this.ImageToEditID);
    },

    UpdatePortadaImage() {
      let data = new FormData();
      data.append("image", this.newPortadaImage);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/blog/entry/update/portada/" +
            this.entry_id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Imagen de portada Actualizada!",
            "La imagen fue actualizada correctamente.",
            "success"
          );
          this.ClearPordaSelectImage();
          this.GetEntry();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onFileSelectedUpdate(event) {
      console.log(event);
      this.newPortadaImage = event.target.files[0];
      this.previewNewPortadaImage = URL.createObjectURL(this.newPortadaImage);
    },

    onFileSelectedImages(event) {
      console.log(event);
      this.newImage = event.target.files[0];
      this.previewImages = URL.createObjectURL(this.newImage);
    },

    ClearPordaSelectImage() {
      this.$refs.portada_image.value = null;
      this.newPortadaImage = null;
      this.previewNewPortadaImage = null;
    },
    GetEntry() {
      axios
        .get(this.server + "/api/v1.0/admin/blog/entry/view/" + this.entry_id)
        .then((response) => {
          console.log(response.data);
          this.entry = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.images {
  border-color: #dde6e8 !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 150px !important;
  height: 150px !important;
}
.allow_create {
  font-size: 12px !important;
  color: gray !important;
}
</style>