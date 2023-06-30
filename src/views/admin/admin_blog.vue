<template>
  <div class="blog mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6><font-awesome-icon icon="newspaper" /> Blog</h6>
          <v-divider></v-divider>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-6 col-sm-6">
          <h6><font-awesome-icon icon="stream" /> Categorias</h6>
        </div>
        <div class="col-6 col-sm-6">
          <div class="col-2 col-sm-2">
            <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
              <v-btn
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#CreateCategoryModal"
              >
                <font-awesome-icon icon="stream" />
              </v-btn>
            </v-badge>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <carousel :per-page="height" :spacePadding="1">
            <slide v-for="(categorie, index) in categories" :key="index">
              <div
                class="d-inline-block p-2 bg-info text-white"
                @click="SetCategorieToEdit(categorie)"
              >
                {{ categorie.name }}
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>

    <div class="container" v-if="categorieToEdit.name != ''">
      <v-divider></v-divider>
      <div class="row">
        <div class="col-8 col-sm-8">
          <h6>
            Categoria:
            <span class="d-inline p-2 bg-success text-white">{{
              categorieToEdit.name
            }}</span>
          </h6>
        </div>
        <div class="col-4 col-sm-4">
          <div class="botonera d-flex justify-content-center">
            <v-btn
              class="boton_botonera mr-4"
              color="red"
              small
              elevation="2"
              icon
              outlined
              @click="DeleteCategory()"
              ><v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              class="boton_botonera"
              color="yellow"
              small
              elevation="2"
              icon
              outlined
              data-bs-toggle="modal"
              data-bs-target="#EditCategoryModal"
              ><font-awesome-icon icon="pencil-alt" />
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="categorieToEdit.name != ''">
      <v-divider></v-divider>
      <div class="row">
        <div class="col-6 col-sm-6">
          <h6><font-awesome-icon icon="pen-square" /> Entradas</h6>
        </div>
        <div class="col-6 col-sm-6">
          <div class="col-2 col-sm-2">
            <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
              <v-btn
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#CreateEntryModal"
              >
                <font-awesome-icon icon="pen-square" />
              </v-btn>
            </v-badge>
          </div>
        </div>
        <div class="col-12 col-sm-12" v-if="entries.length == 0">
          <h6>Vacio! No se ha creado ninguna entrada todavia</h6>
        </div>
        <div class="col-12 col-sm-12" v-if="entries.length > 0">
          <div class="card mb-2" v-for="(entry, index) in entries" :key="index">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-7 col-sm-7">
                    <img :src="entry.image" alt="" class="image_portada" />
                  </div>
                  <div class="col-5 col-sm-5">
                    <p>
                      <span class="item">{{ entry.title }}</span> <br />
                      <span class="item">{{ entry.created }}</span>
                    </p>
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="row">
                  <div
                    class="
                      col-lg-6 col-sm-6
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <div class="row">
                      <div class="col-sm-12 col-lg-2">
                        <div class="switch">
                          <v-switch
                            label="Publicar"
                            v-model="entry.public"
                            @change="UpdatePublic(entry)"
                          ></v-switch>
                        </div>
                      </div>
                      <div class="col-sm-12 col-lg-12">
                        <div class="switch">
                          <v-switch
                            label="Destacado"
                            v-model="entry.portada"
                            @change="UpdatePortada(entry)"
                          ></v-switch>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-10 col-sm-6 d-flex justify-content-end">
                      <div class="botonera">
                        <v-btn
                          class="mr-2"
                          color="red"
                          small
                          elevation="2"
                          icon
                          outlined
                          @click="DeleteEntry(entry)"
                          ><v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          class="mr-2"
                          color="yellow"
                          small
                          elevation="2"
                          icon
                          outlined
                          data-bs-toggle="modal"
                          data-bs-target="#editEntryModal"
                          @click="SetEntryToEdit(entry)"
                          ><font-awesome-icon icon="pencil-alt" />
                        </v-btn>
                        <v-btn
                          class="mr-2"
                          color="green"
                          small
                          elevation="2"
                          icon
                          outlined
                          @click="GoToEditEntryImages(entry)"
                          ><font-awesome-icon icon="image" />
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- CREATE CATEGORY -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="CreateCategoryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Crear categoria del blog
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name_category" class="form-label"
                >Nombre de la categoria</label
              >
              <input
                type="text"
                name=""
                id="name_category"
                class="form-control"
                v-model="name_category_create"
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
              @click="CreateCategory()"
              data-bs-dismiss="modal"
            >
              Crear Categoria
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CREATE CATEGORY -->

    <!-- EDIT CATEGORIA -->
    <div
      class="modal fade"
      id="EditCategoryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modificar categoria del blog
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name_category" class="form-label"
                >Nombre de la categoria</label
              >
              <input
                type="text"
                name=""
                id="name_category"
                class="form-control"
                v-model="categorieToEdit.name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="UpdateCategory()"
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT CATEGORIA -->

    <!-- MODAL CREATE ENTRY -->

    <div
      class="modal fade"
      id="CreateEntryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear entrada</h5>
          </div>
          <div class="modal-body">
            <div class="step_one" v-if="post_instance == null">
              <div class="mb-3">
                <label for="image_portada" class="form-label"
                  >Imagen de portada</label
                >

                <input
                  type="file"
                  class="form-control"
                  name="image_portada"
                  id="image_portada"
                  ref="image_portada"
                  @change="onFileSelectedCreate"
                />

                <div
                  class="image_actual col-12 col-sm-12"
                  v-if="entry_create_preview != null"
                >
                  <p>Imagen seleccionada:</p>
                  <img
                    :src="entry_create_preview"
                    alt=""
                    style="width: 100px; heigth: 100px !important"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="entry_title" class="form-label">Titulo</label>
                <input
                  type="text"
                  class="form-control"
                  id="entry_title"
                  v-model="entry_create_title"
                />
                <div class="mt-2">
                  <vue-editor
                    v-model="entry_create_content"
                    :editorToolbar="customToolbar"
                  />
                </div>
              </div>
              <div class="mt-2">
                <v-divider></v-divider>
              </div>
            </div>
            <div class="step_two" v-if="post_instance != null">
              <div class="col-12 col-sm-12">
                <h6>Mas imagenes</h6>
                <input
                  type="file"
                  class="form-control mb-4"
                  name="entry_images"
                  id="entry_images"
                  ref="entry_images"
                  multiple="multiple"
                  @change="uploadImage"
                />

                <div
                  v-for="(image, key) in images"
                  :key="key"
                  class="d-inline mt-2"
                >
                  <img
                    class="images"
                    :ref="'image'"
                    style="width: 100px; heigth: 100px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-if="post_instance == null"
              @click="DeleteStep1()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-if="post_instance != null"
              @click="DeleteStep2()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="post_instance == null"
              @click="CreatePost()"
            >
              Continuar
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="post_instance != null"
              @click="Finalizar()"
              data-bs-dismiss="modal"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE ENTRY -->

    <!-- EDIT ENTRY MODAL -->

    <div
      class="modal fade"
      id="editEntryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar entrada</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <div class="mt-2">
                    <label for="entry_title" class="form-label">Titulo</label>
                    <input
                      type="text"
                      class="form-control"
                      id="entry_title"
                      v-model="entry_to_edit.title"
                    />
                    <div class="mt-2">
                      <vue-editor
                        v-model="entry_to_edit.content"
                        :editorToolbar="customToolbar"
                      />
                    </div>
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
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="UpdateEntryContent()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT ENTRY MODAL -->

    <!-- MODALES -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
import admin_menu from "../../components/admin/admin_menu.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "admin_blog",
  components: {
    admin_menu,
    Carousel,
    Slide,
    VueEditor,
  },
  data() {
    return {
      categories: [],
      categorieToEdit: {
        id: 0,
        name: "",
      },
      name_category_create: "",
      entries: [],
      entry_create_content: "",
      entry_create_image_portada: null,
      entry_create_title: "",
      entry_create_preview: null,
      images: [],
      images_preview: [],
      post_instance: null,
      entry_to_edit: {
        id: 0,
        title: "",
        content: "",
      },

      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["video"],
        ["clean"], // remove formatting button
      ],
    };
  },
  computed: {
    ...mapState("tienda", ["tienda"]),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2;
        case "sm":
          return 3;
        case "md":
          return 4;
        case "lg":
          return 6;
        case "xl":
          return 6;
      }
    },
  },
  created() {
    this.Guard();
    this.GetCategories();
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

    GoToEditEntryImages(entry) {
      this.$router.push({
        name: "AdminEntryEditImages",
        params: { entry_id: entry.id },
      });
    },

    UpdateEntryContent() {
      let data = new FormData();
      data.append("id", this.entry_to_edit.id);
      data.append("title", this.entry_to_edit.title);
      data.append("content", this.entry_to_edit.content);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/blog/entry/content/update/" +
            this.entry_to_edit.id +
            "/",
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
            "Entrada Actualizada!",
            "La entrada fue actualizada correctamente.",
            "success"
          );
          let category = this.categorieToEdit;
          this.GetEntriesOffCategory(category);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEntryToEdit(entry) {
      this.entry_to_edit = {
        id: entry.id,
        title: entry.title,
        content: entry.content,
      };
    },

    uploadImage(e) {
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        this.images.push(selectedFiles[i]);
        if (this.images.length > this.tienda.plan.images_x_entries) {
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
          this.$refs.entry_images.value = null;
          this.images.splice(0, this.images.length);
        }
      }

      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };

        reader.readAsDataURL(this.images[i]);
      }
      console.log(this.images);
    },

    onFileSelectedCreate(event) {
      this.entry_create_image_portada = event.target.files[0];
      this.entry_create_preview = URL.createObjectURL(
        this.entry_create_image_portada
      );
      console.log(this.entry_create_image_portada);
    },

    DeleteStep1() {
      this.entry_create_content = "";
      this.entry_create_image_portada = null;
      this.entry_create_title = "";
      this.entry_create_preview = null;
      this.$refs.image_portada.value = null;
    },

    DeleteStep2() {
      this.post_instance = null;
      this.entry_create_content = "";
      this.entry_create_image_portada = null;
      this.entry_create_title = "";
      this.entry_create_preview = null;
    },

    Finalizar() {
      if (this.images.length > 0) {
        console.log("grabo las imagens en la db");
        this.CreatePostImages();
      } else {
        this.DeleteStep2();
      }
    },

    UpdatePublic(entry) {
      const data = new FormData();
      data.append("public", entry.public);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server + "/api/v1.0/admin/blog/entry/public/" + entry.id + "/",
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Entrada Actualizada!",
            "La entrada fue actualizada correctamente.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
        })
        .catch((error) => {
          console.log(error);
        });
    },

    UpdatePortada(entry) {
      const data = new FormData();
      data.append("portada", entry.portada);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server + "/api/v1.0/admin/blog/entry/portada/" + entry.id + "/",
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Entrada Actualizada!",
            "La entrada fue actualizada correctamente.",
            "success"
          );
          /* echa el update, solicito nuevamente la tienda a la db,
          para recargar el logo, y lo guardo nuevamente en el vuex */
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreatePostImages() {
      console.log("este recive antes de crear");
      console.log(this.post_instance.id);
      console.log(this.images);
      let data = new FormData();
      data.append("entry", this.post_instance.id);
      data.append("tienda", this.tienda.id);
      /* TENGO QUE HACER ESTE FOR PORQUE SINO EL BACK NO LA RECIBE,ESTA COPIADO DEL POSTMAN */
      /* TENGO QUE MANDAR POR CADA IMAGE UN FILE */
      for (var i = 0; i < this.$refs.entry_images.files.length; i++) {
        let file = this.$refs.entry_images.files[i];
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
          this.$swal.fire(
            "Entrada Creada!",
            "La entrada se ah creado correctamente!",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreatePost() {
      const data = new FormData();
      data.append("title", this.entry_create_title);
      data.append("is_public", this.entry_create_content);
      data.append("tienda", this.tienda.id);
      data.append("category", this.categorieToEdit.id);
      data.append("content", this.entry_create_content);
      data.append("image", this.entry_create_image_portada);

      axios
        .post(this.server + "/api/v1.0/admin/blog/entry/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log("post creado");
          console.log(response.data);
          this.post_instance = response.data;
          this.GetCategories();
          this.categorieToEdit = {
            name: "",
            id: 0,
          };
          this.$refs.image_portada.value = null;
          console.log(this.post_instance.id);
          console.log(this.images);
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Error limite alcanzado!",
            "ha alcanzado el limite de entradas que puede crear segun su plan.",
            "error"
          );
        });
    },

    GetCategories() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/blog/categories/?tienda=" +
            this.tienda.id,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.results);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetCategorieToEdit(categorie) {
      this.categorieToEdit = {
        id: categorie.id,
        name: categorie.name,
      };
      this.GetEntriesOffCategory(categorie);
    },

    GetEntriesOffCategory(category) {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/blog/entry/?category=" +
            category.id +
            "&tienda=" +
            this.tienda.id,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.results);
          this.entries = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateCategory() {
      let data = new FormData();
      data.append("name", this.name_category_create);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/blog/category/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.$swal.fire(
            "Categoria Creada!",
            "La categoria fue creada correctamente.",
            "success"
          );
          this.GetCategories();
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Error limite alcanzado!",
            "ha alcanzado el limite de categorias que puede crear segun su plan.",
            "error"
          );
        });
    },

    UpdateCategory() {
      let data = new FormData();
      data.append("name", this.categorieToEdit.name);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/blog/category/update/" +
            this.categorieToEdit.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.results);
          this.$swal.fire(
            "Categoria Actualizada!",
            "La categoria fue actualizada correctamente.",
            "success"
          );
          this.GetCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    DeleteCategory() {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar esta categoria.",
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
                  "/api/v1.0/admin/blog/category/delete/" +
                  this.categorieToEdit.id,
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Categoria eliminada!",
                  "La categoria ha sido eliminado correctamente.",
                  "success"
                );
                this.GetCategories();
                this.categorieToEdit = {
                  name: "",
                  id: 0,
                };
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    DeleteEntry(entry) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar esta entrada.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server + "/api/v1.0/admin/blog/entry/delete/" + entry.id,
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Entrada eliminada!",
                  "La entrada ha sido eliminado correctamente.",
                  "success"
                );
                this.categorieToEdit = {
                  name: "",
                  id: 0,
                };
                this.GetCategories();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.images {
  border-color: #aa9911 !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 100px !important;
  height: 100px !important;
  display: inline;
  margin-left: 1px;
}

.image_portada {
  width: 150px;
  height: 150px;
}
.item {
  font-size: 13px;
  color: #000000;
}

@media only screen and (min-width: 768px) {
  .image_portada {
    width: 300px;
    height: 300px;
  }
  .item {
    font-size: 16px;
    color: #000000;
  }
}
</style>