<template>
  <div class="mb-12">
    <admin_menu></admin_menu>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <v-alert border="right" color="blue-grey" dark> CATEGORIAS </v-alert>
        </div>
        <div class="row">
          <div class="col-8 col-sm-8">
            <p class="title_categories_principales">
              Explore y cree categorias, subcategorias y productos
            </p>
          </div>
          <div class="col-2 col-sm-2">
            <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
              <v-btn
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                :disabled="!canCreateCategoria"
              >
                <font-awesome-icon icon="stream" />
              </v-btn>
              <div class="d-flex justify-content-center">
                <p><span class="save">Crear categoria</span></p>
              </div>
            </v-badge>
          </div>

          <div class="col-2 col-sm-2">
            <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
              <v-btn
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#addProductModal"
                :disabled="!canCreateProduct"
              >
                <font-awesome-icon icon="box" />
              </v-btn>
              <div class="d-flex justify-content-center">
                <p><span class="save">Crear prodcuto</span></p>
              </div>
            </v-badge>
          </div>

          <v-container><v-divider></v-divider></v-container>
        </div>
      </div>
    </div>

    <!-- breadcrumbs -->
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <a @click="Volver()">
            <v-chip class="m-1"> / </v-chip>
          </a>
          <div
            class="d-inline-block align-middle"
            v-for="(item, index) in breadcrumbs"
            :key="index"
          >
            >
            <a @click="GoToCategoria(item)">
              <v-chip class="m-1">
                {{ item.name }}
              </v-chip>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- breadcrumbs -->
    <!-- Lista de categorias -->

    <!-- la logica es, si se puede crear un producto, es porque no hay categorias para mostrar
          es inversa la relacion
     -->
    <div class="categorias_principales container mb-2">
      <div
        class="row d-flex justify-content-center"
        v-for="(categoria, index) in categories"
        :key="index"
      >
        <div class="card col-11 col-sm-11">
          <div class="container">
            <div class="row">
              <div class="col-6 col-sm-6">
                <a @click="GetSubCategoria(categoria)">
                  <img class="categoria_image" :src="categoria.image" alt="" />
                </a>
                <v-btn
                  class="boton_botonera"
                  color="green"
                  small
                  elevation="2"
                  icon
                  outlined
                  data-bs-toggle="modal"
                  data-bs-target="#ModalEditImage"
                  @click="SetEditImage(categoria)"
                  ><font-awesome-icon icon="image" />
                </v-btn>
              </div>
              <div class="col-6 col-sm-6 align-self-center">
                <a @click="GetSubCategoria(categoria)">
                  {{ categoria.name }}
                </a>
                <div class="botonera d-flex justify-content-end">
                  <v-btn
                    class="boton_botonera"
                    color="red"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="DeleteCategoria(categoria)"
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
                    data-bs-target="#modelEdit"
                    @click="SetEditCategoria(categoria)"
                    ><font-awesome-icon icon="pencil-alt" />
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LISTA DE PRODUCTOS -->
    <div class="container lista_productos" v-if="canCreateProduct == true">
      <!-- buscador -->
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6><font-awesome-icon icon="box" /> Productos</h6>
        </div>
        <div class="col-12 col-sm-12">
          <form v-on:submit.prevent="SearchProductIcontains()">
            <div class="input-group">
              <input
                type="search"
                class="form-control form-control-dark"
                placeholder="Buscar..."
                aria-label="buscar"
                aria-describedby="button-addon2"
                name="kword"
                id="kword"
                v-model="kword"
              />
              <v-btn
                class="
                  btn btn-outline-primary
                  bg-white
                  border-start-0 border
                  rounded-pill
                  ms-n3
                "
                type="submit"
                id="button-addon2"
                data-mdb-ripple-color="dark"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
          </form>
        </div>
      </div>
      <!-- fin buscador -->

      <!-- lista productos -->
      <div class="container">
        <div class="row d-flex align-items-center">
          <div
            class="card mb-1"
            v-for="(product, index) in products"
            :key="index"
          >
            <div class="card-body">
              <div class="row">
                <div class="col-6 col-sm-6">
                  <img
                    :src="product.image"
                    alt=""
                    style="width: 150px; heigth: 200px; border-radius: 5%"
                  />
                </div>
                <div class="col-6 col-sm-6">
                  <h6 class="d-flex justify-content-center">
                    {{ product.title }}
                  </h6>
                  <div class="contenido">
                    <p class="">
                      <span class="product_category">{{
                        product.category.name
                      }}</span>
                      <br />
                      <span
                        class="product_item"
                        v-if="product.has_variation == false"
                        >precio: {{ product.price }}</span
                      >
                      <span
                        class="product_item"
                        v-if="product.has_variation == true"
                        >precio: precio en las variaciones</span
                      >
                      <br />
                      <span
                        class="product_item"
                        v-if="product.has_variation == false"
                        >stock: {{ product.stock }}</span
                      >
                      <span
                        class="product_item"
                        v-if="product.has_variation == true"
                        >stock: stock en variaciones</span
                      >
                    </p>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row">
                <div class="col-6 col-sm-6 d-flex justify-content-center">
                  <v-switch
                    v-model="product.public"
                    label="Publicar"
                    @change="ProductUpdatePublicStatus(product)"
                  ></v-switch>
                </div>
                <div class="col-6 col-sm-6 d-flex justify-content-end">
                  <v-btn
                    class="mr-2"
                    color="green"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="GoToEditProductImages(product)"
                    ><font-awesome-icon icon="image" />
                  </v-btn>

                  <v-btn
                    class="mr-2"
                    color="red"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="DeleteProduct(product)"
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
                    data-bs-target="#EditProductModal"
                    @click="SetEditProduct(product)"
                    ><font-awesome-icon icon="pencil-alt" />
                  </v-btn>
                  <v-btn
                    v-if="product.has_variation == true"
                    class=""
                    color="purple"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="GoToVariations(product)"
                    ><font-awesome-icon icon="list" />
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- lista productos -->
    </div>
    <!-- LISTA DE PRODUCTOS -->

    <!-- ###########################MODALES##################################################### -->

    <!-- Modal  AGREGAR CATEGORIA-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Agregar Categoria
            </h5>
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
                  <div class="esPrinciapal" v-if="breadcrumbs.length == 0">
                    Agregar categoria principal
                    <form>
                      <div class="mb-3">
                        <label for="name" class="form-label"
                          >Nombre de la categoria</label
                        >
                        <input
                          type="input"
                          class="form-control"
                          id="name"
                          placeholder="Nombre de la categoria"
                          v-model="CreateCategoria.name"
                        />
                      </div>
                      <label for="image" class="form-label"
                        >Selecionar imagen</label
                      >
                      <div class="mb-3">
                        <input
                          type="file"
                          class="form-control"
                          name="image"
                          id="image"
                          ref="imageCreate"
                          @change="onFileSelected"
                        />
                        <div class="col-12 col-sm-12">
                          <p>Imagen seleccionada:</p>
                          <img
                            :src="previewNew"
                            alt=""
                            style="width: 150px; heigth: 150px"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="esSub" v-if="breadcrumbs.length > 0">
                    agregar subcategoria a
                    {{ breadcrumbs[breadcrumbs.length - 1]["name"] }}
                    <form>
                      <div class="mb-3">
                        <label for="name" class="form-label"
                          >Nombre de la categoria</label
                        >
                        <input
                          type="input"
                          class="form-control"
                          id="name"
                          placeholder="Nombre de la categoria"
                          v-model="CreateCategoria.name"
                        />
                      </div>

                      <label for="image" class="form-label"
                        >Selecionar imagen</label
                      >
                      <div class="mb-3">
                        <input
                          type="file"
                          class="form-control"
                          name="image"
                          id="image"
                          ref="imageCreate"
                          @change="onFileSelected"
                        />
                        <br />
                        <div class="col-12 col-sm-12">
                          <p>Imagen seleccionada:</p>
                          <img
                            :src="previewNew"
                            alt=""
                            style="width: 150px; heigth: 150px"
                          />
                        </div>
                      </div>
                    </form>
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
              @click="CloseAddCategoriaModal()"
            >
              Close
            </button>
            <button
              v-if="breadcrumbs.length == 0"
              type="button"
              class="btn btn-primary"
              @click="AddPrincipalCategoria()"
              data-bs-dismiss="modal"
            >
              Crear Categoria
            </button>
            <button
              v-if="breadcrumbs.length > 0"
              type="button"
              class="btn btn-primary"
              @click="AddSubCategoria()"
              data-bs-dismiss="modal"
            >
              Crear Sub-Categoria
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal  AGREGAR CATEGORIA-->

    <!-- Modal  EDITAR CATEGORIA-->

    <!-- Modal -->
    <div
      class="modal fade"
      id="modelEdit"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Categoria</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data">
              <div class="mb-3">
                <label for="name" class="form-label"
                  >Nombre de la categoria</label
                >
                <input
                  type="input"
                  class="form-control"
                  id="name"
                  placeholder="Nombre de la categoria"
                  v-model="EditCategoria.name"
                />
              </div>
            </form>
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
              @click="UpdateCategoria()"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal  EDITAR CATEGORIA-->

    <!-- MODAL EDITAR IMAGEN -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="ModalEditImage"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Actulizar Imagen</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ setEditImage.name }}</p>
            <br />
            <p>Imagen actual:</p>
            <div class="image_actual col-12 col-sm-12">
              <img
                :src="setEditImage.image"
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
            <p>Imagen nueva:</p>
            <div class="image_actual col-12 col-sm-12">
              <img :src="preview" alt="" style="width: 150px; heigth: 150px" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="ClearImageToEdit()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="UpdateImageCategoria()"
              data-bs-dismiss="modal"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL EDITAR IMAGEN -->

    <!-- ###########################PRODUCTOS###################################### -->
    <!-- MODAL AGREGAR PRODUCTO -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <font-awesome-icon icon="box" /> Agregar Producto
            </h5>
          </div>
          <div class="modal-body">
            <div class="step1" v-if="product_instance == null">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <h6 v-if="breadcrumbs.length > 0">
                    Agregar producto a la categoria
                    {{ breadcrumbs[breadcrumbs.length - 1]["name"] }}
                  </h6>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-12">
                  <form>
                    <label for="image" class="form-label"
                      >Selecionar imagen</label
                    >
                    <div class="mb-3">
                      <input
                        type="file"
                        class="form-control"
                        name="image"
                        id="image"
                        ref="imageCreateProduct"
                        @change="onFileSelectedCreateProduct"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="name" class="form-label"
                        >Nombre del producto</label
                      >
                      <input
                        type="input"
                        class="form-control"
                        id="name"
                        placeholder="Nombre del producto"
                        v-model="createProduct.title"
                      />
                    </div>

                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                        >Descripcion</label
                      >
                      <textarea
                        class="form-control"
                        id="Descripcion"
                        rows="3"
                        v-model="createProduct.description"
                      ></textarea>
                    </div>

                    <v-switch
                      v-model="createProduct.has_variation"
                      label="Variaciones"
                    ></v-switch>

                    <div
                      class="alert alert-secondary"
                      role="alert"
                      v-if="createProduct.has_variation == true"
                    >
                      Si activa las variaciones, el stock se establece en cada
                      variacion que cree, el precio es recomendado poner el mas
                      bajo de la las variaciones, el sistema lo mostrara como
                      desde...
                    </div>

                    <v-divider></v-divider>

                    <div class="mb-3">
                      <label for="name" class="form-label">Precio $</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        v-model="createProduct.price"
                        min="0"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="createProduct.has_variation == false"
                    >
                      <label for="name" class="form-label">Stock</label>
                      <input
                        type="number"
                        class="form-control"
                        id="stock"
                        v-model="createProduct.stock"
                        min="0"
                      />
                    </div>

                    <v-switch
                      v-model="createProduct.portada"
                      label="Destacado"
                    ></v-switch>

                    <v-container><v-divider></v-divider></v-container>
                    <div class="contaier">
                      <div class="row">
                        <div class="col-5 col-sm-5 ml-2">
                          <v-switch
                            v-model="createProduct.in_offer"
                            label="en oferta"
                          ></v-switch>
                        </div>
                        <div class="col-5 col-sm-5">
                          <div class="mb-3">
                            <label for="name" class="form-label"
                              >Precio de oferta $</label
                            >
                            <input
                              type="number"
                              class="form-control"
                              id="price"
                              v-model="createProduct.in_offer_price"
                              :disabled="!createProduct.in_offer"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="step2" v-if="product_instance != null">
              <div class="col-12 col-sm-12">
                <h6>Mas imagenes</h6>
                <span class="cant_max_img">Cantidad maxima de imagenes: {{tienda.plan.images_x_products}} (segun su plan)</span>
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
                  <img
                    class="images"
                    :ref="'more_images'"
                    style="width: 100px; heigth: 100px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-if="product_instance == null"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep1()"
            >
              Cerrar
            </button>
            <button
              v-if="product_instance != null"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep2()"
            >
              Cerrar
            </button>
            <button
              v-if="product_instance == null"
              type="button"
              class="btn btn-success"
              @click="CreateProduct()"
            >
              Continuar
            </button>
            <button
              v-if="product_instance != null"
              type="button"
              class="btn btn-success"
              @click="Finalizar()"
              data-bs-dismiss="modal"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR PRODUCTO -->

    <!-- MODAL EDITAR PRODUCTO -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="EditProductModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-sm-12">
                <form>
                  <div class="mb-3">
                    <label for="name" class="form-label"
                      >Nombre del producto</label
                    >
                    <input
                      type="input"
                      class="form-control"
                      id="name"
                      placeholder="Nombre del producto"
                      v-model="setEditProduct.title"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >Descripcion</label
                    >
                    <textarea
                      class="form-control"
                      id="Descripcion"
                      rows="3"
                      v-model="setEditProduct.description"
                    ></textarea>
                  </div>

                  <v-switch
                    v-model="setEditProduct.has_variation"
                    label="Variaciones"
                  ></v-switch>

                  <div
                    class="alert alert-secondary"
                    role="alert"
                    v-if="setEditProduct.has_variation == true"
                  >
                    Si activa las variaciones, el stock se establece en cada
                    variacion que cree, el precio es recomendado poner el mas
                    bajo de la las variaciones, el sistema lo mostrara como
                    desde...
                  </div>

                  <v-divider></v-divider>

                  <div class="mb-3">
                    <label for="name" class="form-label">Precio $</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="setEditProduct.price"
                      min="0"
                    />
                  </div>
                  <div
                    class="mb-3"
                    v-if="setEditProduct.has_variation == false"
                  >
                    <label for="name" class="form-label">Stock</label>
                    <input
                      type="number"
                      class="form-control"
                      id="stock"
                      v-model="setEditProduct.stock"
                      min="0"
                    />
                  </div>

                  <v-switch
                    v-model="setEditProduct.portada"
                    label="Destacado"
                  ></v-switch>

                  <v-container><v-divider></v-divider></v-container>
                  <div class="contaier">
                    <div class="row">
                      <div class="col-5 col-sm-5 ml-2">
                        <v-switch
                          v-model="setEditProduct.in_offer"
                          label="en oferta"
                        ></v-switch>
                      </div>
                      <div class="col-5 col-sm-5">
                        <div class="mb-3">
                          <label for="name" class="form-label"
                            >Precio de oferta $</label
                          >
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            v-model="setEditProduct.in_offer_price"
                            :disabled="!setEditProduct.in_offer"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
              @click="UpdateProduct()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR PRODUCTO -->

    <!-- ###########################PRODUCTOS###################################### -->
  </div>
</template>

<script>
import admin_menu from "../../components/admin/admin_menu.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "admin_admin",
  components: {
    admin_menu,
  },
  data() {
    return {
      product_instance: null,
      product_more_images: [],
      categories: [],
      breadcrumbs: [],
      CreateCategoria: {
        name: "",
        parent: "",
        image: null,
      },
      EditCategoria: {
        id: 0,
        name: "",
        parent: "",
      },
      setEditImage: {
        id: 0,
        name: "",
        short_name: "",
        image: null,
      },
      createProduct: {
        title: "",
        description: "",
        image: null,
        images: null,
        price: 0,
        public: false,
        portada: false,
        in_offer: false,
        in_offer_price: 0,
        stock: 0,
        has_variation: false,
      },
      setEditProduct: [],

      imageToEdit: null,
      preview: null,
      previewNew: null,
      canCreateProduct: false,
      canCreateCategoria: true,
      noHayProducts: true,
      noHayCategoria: false,
      kword: "",
      empty: false,
      products: [],
    };
  },
  mounted() {
    this.GetCategories();
    this.canCreateProduct = false;

  },


  watch: {
    breadcrumbs: function (val) {
      if (this.breadcrumbs.length == 0) {
        this.canCreateProduct = false;
        this.canCreateCategoria = true;
      }
    },
    kword(value) {
      this.BuscarProducto(value);
    },
  },
  computed: {
    ...mapState("tienda", ["tienda", "plan"]),
  },

  methods: {
    /* =========================CATEGORIAS==================================== */
    GetCategories() {
      axios
        .get(
          this.server + "/api/v1.0/admin/categories/?tienda=" + this.tienda.id,
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
    GetSubCategoria(categoria) {
      axios
        .get(
          this.server + "/api/v1.0/subcategories/list/?kword=" + categoria.id
        )
        .then((response) => {
          /* Compruebo si la categoria ya esta en el breadcrumbs */
          const checkCategoria = (obj) => obj.id === categoria.id;
          const check = this.breadcrumbs.some(checkCategoria);
          if (check == false) {
            this.breadcrumbs.push({
              id: categoria.id,
              name: categoria.name,
            });
            /* Si la categoria no tiene una subcategoria, permito crear un producto */
            if (response.data.results.length == 0) {
              this.canCreateProduct = true;
            } else {
              this.canCreateProduct = false;
            }
            this.GetProductOfCategory();
          }
          console.log(response.data);
          this.categories = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddBreadcrumbs(categoria) {
      this.breadcrumbs.push(categoria.id);
    },
    GoToCategoria(categoria) {
      let bool = this.breadcrumbs.some((i) => i.id == categoria.id);
      if (bool) {
        let itemIndex = this.breadcrumbs.findIndex(
          (el) => el.id === categoria.id
        );
        if (itemIndex == 0) {
          this.breadcrumbs.splice(0, this.breadcrumbs.length);
        } else {
          this.breadcrumbs.splice(itemIndex, this.breadcrumbs.length);
        }
      }
      this.GetSubCategoria(categoria);
      /* this.breadcrumbs.pop(); */
    },
    Volver() {
      this.breadcrumbs = [];
      this.GetCategories();
    },

    ClearCreateCategorie() {
      this.CreateCategoria = {
        name: "",
        short_name: "",
        parent: "",
        image: null,
      };
    },

    onFileSelected(event) {
      console.log(event);
      this.CreateCategoria.image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
    },

    AddPrincipalCategoria() {
      const data = new FormData();
      data.append("name", this.CreateCategoria.name);
      data.append("short_name", this.CreateCategoria.short_name);
      data.append("image", this.CreateCategoria.image);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/categorie/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.GetCategories();
          this.ClearCreateCategorie();
          this.$swal.fire(
            "Categoria Creada!",
            "Se ha creado una nueva categoria principal.",
            "success"
          );
          this.CloseAddCategoriaModal();
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

    AddSubCategoria() {
      const data = new FormData();
      data.append(
        "parent",
        this.breadcrumbs[this.breadcrumbs.length - 1]["id"]
      );
      data.append("name", this.CreateCategoria.name);
      data.append("short_name", this.CreateCategoria.short_name);
      data.append("image", this.CreateCategoria.image);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/categorie/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.GetCategories();
          this.ClearCreateCategorie();
          this.$swal.fire(
            "Categoria Creada!",
            "Se ha creado una nueva sub-categoria.",
            "success"
          );
          this.GoToCategoria(this.breadcrumbs[this.breadcrumbs.length - 1]);
          this.CloseAddCategoriaModal();
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
    CloseAddCategoriaModal() {
      this.$refs.imageCreate.value = null;
      this.previewNew = null;
    },
    DeleteCategoria(categoria) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
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
              .get(
                this.server +
                  "/api/v1.0/subcategories/list/?kword=" +
                  categoria.id
              )
              .then((response) => {
                console.log(response.data);
                /* Si tiene tiro alerta, sino borro */
                if (response.data.results.length > 0) {
                  this.$swal.fire({
                    title: "Atencion",
                    icon: "info",
                    text: "No puede eliminar una categoria padre sino esta vacia, primero elimine las subcategorias!",
                  });
                } else {
                  axios
                    .delete(
                      this.server +
                        "/api/v1.0/admin/categorie/delete/" +
                        categoria.id +
                        "/",
                      {
                        headers: {
                          Authorization: localStorage.getItem("access"),
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);
                      this.$swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                      );
                      this.GetCategories();
                      this.Volver();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    SetEditCategoria(categoria) {
      this.EditCategoria = {
        id: categoria.id,
        name: categoria.name,
        short_name: categoria.short_name,
        parent: categoria.parent,
      };
    },

    ClearEditCategorie() {
      this.EditCategoria = {
        id: "",
        name: "",
        short_name: "",
        parent: "",
        image: null,
      };
    },

    UpdateCategoria() {
      const data = new FormData();
      data.append("id", this.EditCategoria.id);
      data.append("name", this.EditCategoria.name);
      data.append("short_name", this.EditCategoria.short_name);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/categorie/update/" +
            this.EditCategoria.id +
            "/",
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
            "Categoria Actualizada!",
            "La categoria fue actualizada correctamente.",
            "success"
          );
          this.GetCategories();
          this.Volver();
          this.ClearEditCategorie();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEditImage(categoria) {
      this.setEditImage = {
        id: categoria.id,
        name: categoria.name,
        short_name: categoria.short_name,
        image: categoria.image,
      };
    },

    onFileSelectedUpdate(event) {
      console.log(event);
      this.imageToEdit = event.target.files[0];
      this.preview = URL.createObjectURL(this.imageToEdit);
    },

    UpdateImageCategoria() {
      const data = new FormData();
      data.append("id", this.setEditImage.id);
      data.append("name", this.setEditImage.name);
      data.append("short_name", this.setEditImage.short_name);
      data.append("image", this.imageToEdit);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/categorie/update/" +
            this.setEditImage.id +
            "/",
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Imagen Actualizada!",
            "La imagen fue actualizada correctamente.",
            "success"
          );
          this.GetCategories();
          this.Volver();
          this.ClearEditCategorie();
          this.ClearImageToEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ClearImageToEdit() {
      this.$refs.imageEdit.value = null;
      this.preview = null;
    },

    /* =========================CATEGORIAS==================================== */

    /* =========================PRODUCTOS==================================== */

    SetEditProduct(product) {
      this.setEditProduct = product;
    },

    UpdateProduct() {
      let data = new FormData();
      const id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      data.append("category", id_category);
      data.append("title", this.setEditProduct.title);
      data.append("description", this.setEditProduct.description);
      data.append("price", this.setEditProduct.price);
      data.append("stock", this.setEditProduct.stock);
      data.append("public", this.setEditProduct.public);
      data.append("portada", this.setEditProduct.portada);
      data.append("in_offer", this.setEditProduct.in_offer);
      data.append("in_offer_price", this.setEditProduct.in_offer_price);
      data.append("has_variation", this.setEditProduct.has_variation);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/product/update/" +
            this.setEditProduct.id +
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
          this.GetProductOfCategory();
          this.$swal.fire(
            "Producto Actualizado!",
            "El producto fue actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    BuscarProducto(kword) {
      const id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/search/category/?kword=" +
            kword +
            "&tienda=" +
            this.tienda.id +
            "&category=" +
            id_category
        )
        .then((response) => {
          this.products = response.data.results;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SearchProductIcontains() {
      const id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/search/icontains/?kword=" +
            this.kword +
            "&tienda=" +
            this.tienda.id +
            "&category=" +
            id_category
        )
        .then((response) => {
          console.log(response.data.results);
          this.products = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ProductUpdatePublicStatus(product) {
      const data = new FormData();
      data.append("public", product.public);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server + "/api/v1.0/admin/product/public/" + product.id + "/",
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

    /* metodo js para carcar y hace preview de multiples imagenes */
    uploadImage(e) {
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.product_more_images.push(selectedFiles[i]);
        if (this.product_more_images.length > this.tienda.plan.images_x_products) {
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

    DeleteStep1() {
      this.createProduct = {
        title: "",
        description: "",
        image: null,
        images: null,
        price: 0,
        public: false,
        portada: false,
        in_offer: false,
        in_offer_price: 0,
        stock: 0,
        has_variation: false,
      };
      this.$refs.imageCreateProduct.value = null;
    },

    DeleteStep2() {
      this.product_instance = null;
      this.createProduct = {
        title: "",
        description: "",
        image: null,
        images: null,
        price: 0,
        public: false,
        portada: false,
        in_offer: false,
        in_offer_price: 0,
        stock: 0,
        has_variation: false,
      };
      this.$refs.product_more_images.value = null;
      this.product_more_images.splice(0, this.product_more_images.length);
    },

    Finalizar() {
      if (this.product_more_images.length > 0) {
        console.log("grabo las imagens en la db");
        this.CreateProductMoreImages();
      } else {
        this.DeleteStep2();
      }
    },

    CreateProductMoreImages() {
      let data = new FormData();
      data.append("product", this.product_instance.id);
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
          this.$swal.fire(
            "Producto Creado!",
            "se ha creado un nuevo producto",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateProduct() {
      const data = new FormData();
      const id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      data.append("category", id_category);
      data.append("title", this.createProduct.title);
      data.append("description", this.createProduct.description);
      data.append("image", this.createProduct.image);
      data.append("price", this.createProduct.price);
      data.append("stock", this.createProduct.stock);
      data.append("public", this.createProduct.public);
      data.append("portada", this.createProduct.portada);
      data.append("in_offer", this.createProduct.in_offer);
      data.append("in_offer_price", this.createProduct.in_offer_price);
      data.append("has_variation", this.createProduct.has_variation);
      data.append("tienda", this.tienda.id);

      axios
        .post(this.server + "/api/v1.0/admin/product/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetProductOfCategory();
          this.$refs.imageCreateProduct.value = null;
          this.product_instance = response.data;
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

    GetProductOfCategory() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/category/product/list/?kword=" +
            this.breadcrumbs[this.breadcrumbs.length - 1]["id"] +
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
          this.products = response.data.results;
          if (response.data.results.length > 0) {
            this.canCreateCategoria = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onFileSelectedCreateProduct(event) {
      console.log(event);
      this.createProduct.image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
    },

    DeleteProduct(producto) {
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
                  "/api/v1.0/admin/product/delete/" +
                  producto.id +
                  "/",
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Producto eliminado!",
                  "El producto ha sido eliminado correctamente.",
                  "success"
                );
                this.GetProductOfCategory();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    GoToVariations(product) {
      this.$router.push({
        name: "AdminHomeVariations",
        params: { product: product },
      });
    },

    GoToEditProductImages(product) {
      this.$router.push({
        name: "AdminProductImages",
        params: { product_id: product.id },
      });
    },

    /* =========================PRODUCTOS==================================== */
  } /* FIN DE METHODS */,
};
</script>

<style scoped>
a {
  color: black !important;
}
.title_categories_principales {
  font-size: 14px !important;
}
.categorias_principales {
  margin-bottom: 20 px !important;
}
.card {
  padding: 0px !important;
}

.categoria_image {
  width: 100px;
  height: 100px;
}
.col-6 {
  padding: 0px !important;
  margin-top: 1px !important;
  margin-bottom: 1px !important;
}
.contenido {
  display: block !important;
}
.product_category {
  font-size: 12px !important;
}
.product_item {
  font-size: 13px !important;
  color: black;
}
.col-sm-6 {
  padding: 0px !important;
}

.lista_productos {
  margin-bottom: 20px !important;
}

.images {
  border-color: #aa9911 !important;
  border-style: solid !important;
  border-radius: 5%;
  width: 100px !important;
  height: 100px !important;
  display: inline;
  margin-left: 1px;
}
.cant_max_img{
  font-size: 12px !important;
}
</style>