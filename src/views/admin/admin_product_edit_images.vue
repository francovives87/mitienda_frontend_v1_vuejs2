<template>
  <div class="product_edit_images mb-4">
    <admin_menu />
    <div class="container">
      <div class="row">
        <h6>Editar imagenes</h6>
      </div>
    </div>
    <v-container><v-divider></v-divider></v-container>
    <div class="container">
      <div class="row">
        <h6>Producto: {{ product.title }}</h6>
      </div>
      <v-divider></v-divider>

      <div class="row">
        <div class="col-12 col-sm-12">Portada</div>

        <div class="row d-flex align-items-center">
          <div class="col-9 col-sm-9">
            <img :src="product.image" alt="" class="images" />
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
          v-for="(image, index) in images"
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
                  <img :src="product.image" alt="" class="images" />
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
                  <span class="cant_max_img"
                    >puede agregar: {{ allow_create }} (segun su plan)</span
                  >
                  <input
                    type="file"
                    class="form-control mb-4"
                    name="product_more_images"
                    id="product_more_images"
                    ref="product_more_images"
                    multiple="multiple"
                    @change="uploadImage"
                  />

                  <div
                    v-for="(image, key) in product_more_images"
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
  name: "admin_product_edit_images",
  components: {
    admin_menu,
  },
  props: ["product_id"],
  data() {
    return {
      images: [],
      newPortadaImage: null,
      previewNewPortadaImage: null,
      ImageToEdit: null,
      ImageToEditID: 0,
      previewImages: null,
      newImage: null,
      product: [],
      product_more_images: [],
      cant_images: 0,
      allow_create: 0,
    };
  },
  created() {
    this.Guard();
    console.log(this.product);
    this.GetImagesOffProduct();
    this.GetProduct();
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
    uploadImage(e) {
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        this.product_more_images.push(selectedFiles[i]);
        if (this.product_more_images.length > this.allow_create) {
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
          this.$refs.product_more_images.value = null;
          this.product_more_images.splice(0, this.product_more_images.length);
        }
      }

      for (let i = 0; i < this.product_more_images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.more_images[i].src = reader.result;
        };

        reader.readAsDataURL(this.product_more_images[i]);
      }
      console.log(this.product_more_images);
    },

    ClearMoreImagesToadd() {
      this.$refs.product_more_images.value = null;
      this.product_more_images = [];
    },

    CreateProductMoreImages() {
      let data = new FormData();
      data.append("product", this.product_id);
      /* TENGO QUE HACER ESTE FOR PORQUE SINO EL BACK NO LA RECIBE,ESTA COPIADO DEL POSTMAN */
      /* TENGO QUE MANDAR POR CADA IMAGE UN FILE */
      for (var i = 0; i < this.$refs.product_more_images.files.length; i++) {
        let file = this.$refs.product_more_images.files[i];
        data.append("image", file);
        data.append("tienda", this.tienda.id);
      }
      axios
        .post(this.server + "/api/v1.0/admin/product/images", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetProduct();
          this.GetImagesOffProduct();
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
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
        });
    },

    GetCantImagesOffProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/images/count/?product=" +
            this.product_id
        )
        .then((response) => {
          this.cant_images = response.data.cant_images;
          console.log("cantidad images");
          console.log(this.cant_images);
          if (this.cant_images > 0) {
            this.allow_create =
              this.tienda.plan.images_x_products - this.cant_images;
            console.log("se pueden crear");
            console.log(this.allow_create);
          }
        })
        .catch((error) => {
          this.allow_create = this.tienda.plan.images_x_products;
        });
    },

    GetImagesOffProduct() {
      axios
        .get(this.server + "/api/v1.0/admin/product/images/" + this.product_id)
        .then((response) => {
          console.log(response.data.results);
          this.images = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetProduct() {
      axios
        .get(this.server + "/api/v1.0/admin/product/view/" + this.product_id)
        .then((response) => {
          console.log(response.data);
          this.product = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    DeleteImage(image) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar esta imagen.",
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
                  "/api/v1.0/admin/product/delete/images/" +
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
                this.GetProduct();
                this.GetImagesOffProduct();
                this.GetCantImagesOffProduct();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdatePortadaImage() {
      let data = new FormData();
      data.append("image", this.newPortadaImage);

      axios
        .put(
          this.server + "/api/v1.0/admin/product/image/" + this.product_id,
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
          this.GetImagesOffProduct();
          this.GetProduct();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdateImageOffProduct() {
      let data = new FormData();
      data.append("product", this.product.id);
      data.append("image", this.newImage);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/product/edit/images/" +
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
          this.GetProduct();
          this.GetImagesOffProduct();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetImageToEdit(image) {
      this.ImageToEdit = image.image;
      this.ImageToEditID = image.id;
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

    ClearSelect() {
      this.$refs.image_edit.value = null;
      this.newImage = null;
      this.previewImages = null;
    },
    ClearPordaSelectImage() {
      this.$refs.portada_image.value = null;
      this.newPortadaImage = null;
      this.previewNewPortadaImage = null;
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
.cant_max_img {
  font-size: 12px !important;
}
.allow_create {
  font-size: 12px !important;
  color: gray !important;
}
</style>