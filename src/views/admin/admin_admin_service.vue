<template>
  <div class="mb-12">
    <admin_menu></admin_menu>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="calendar-plus" />
            <span class="ml-2">Servicios</span>
          </div>
        </div>
        <div class="row">
          <div class="col-8 col-sm-8">
            <p class="title_categories_principales">
              Explore y cree categorias, subcategorias y servicios
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
                data-bs-target="#createServiceModal"
                :disabled="!canCreateProduct"
              >
                <font-awesome-icon icon="calendar-plus" />
              </v-btn>
              <div class="d-flex justify-content-center">
                <p><span class="save">Crear servicio</span></p>
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
    <div
      class="categorias_principales container mb-12"
      v-if="categories.length > 0"
    >
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

    <!-- LISTA DE SERVICIOS -->
    <div
      class="container lista_productos mb-12"
      v-if="canCreateProduct == true"
    >
      <!-- buscador -->
      <div class="row">
        <div class="col-12 col-sm-12">
          <h6><font-awesome-icon icon="calendar-plus" /> Servicios</h6>
        </div>
        <div class="col-12 col-sm-12">
          <form v-on:submit.prevent="SearchServiceTriagramTitle(kword)">
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

      <!-- lista servicios -->

      <!-- lista servicios -->
      <div class="container">
        <div class="row d-flex align-items-center">
          <div
            class="card mb-1"
            v-for="(service, index) in services"
            :key="index"
          >
            <div class="card-body">
              <div class="row">
                <div class="col-6 col-sm-6">
                  <img
                    :src="service.image"
                    alt=""
                    style="width: 150px; heigth: 200px; border-radius: 5%"
                  />
                </div>
                <div class="col-6 col-sm-6">
                  <h6 class="d-flex justify-content-center">
                    {{ service.title }}
                  </h6>
                  <div class="contenido d-flex justify-content-center">
                    <p>
                      <span style="font-size: 12px; color: #000000"
                        >categoria:</span
                      >
                      <span style="font-size: 12px">{{
                        service.category.name
                      }}</span>
                      <br />
                      <span style="font-size: 12px">{{
                        service.description
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row">
                <div class="col-6 col-sm-6 d-flex justify-content-center">
                  <v-switch
                    v-model="service.public"
                    label="Publicar"
                    @change="ServiceUpdatePublicStatus(service)"
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
                    @click="GoToEditServiceImages(service)"
                    ><font-awesome-icon icon="image" />
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    color="red"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="DeleteService(service)"
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
                    data-bs-target="#EditServiceModal"
                    @click="SetEditService(service)"
                    ><font-awesome-icon icon="pencil-alt" />
                  </v-btn>

                  <v-btn
                    class="mr-2"
                    color="gray"
                    small
                    elevation="2"
                    icon
                    outlined
                    @click="GoToBreakService(service)"
                    ><font-awesome-icon icon="coffee" />
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- lista servicios -->
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
                          v-model="createCategoria_name"
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
                          @change="onFileSelectedCatetogia"
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
                          v-model="createCategoria_name"
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
                          @change="onFileSelectedCatetogia"
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

    <!-- ###########################SERVICIOS###################################### -->
    <!-- MODAL AGREGAR SERVICIO -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="createServiceModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear Servicio</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="step1" v-if="service_instance == null">
              <form>
                <div class="mb-1">
                  <label for="image" class="form-label"
                    >Selecionar imagen</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    name="image"
                    id="image"
                    ref="imageServiceCreate"
                    @change="onFileSelectedServiceImage"
                  />
                  <p
                    class="text-danger mt-1"
                    style="font-size: 12px !important"
                    v-if="!$v.createService_image.required"
                  >
                    * Campo requerido.
                  </p>
                  <div class="col-12 col-sm-12">
                    <p>Imagen seleccionada:</p>
                    <img
                      :src="previewNew"
                      alt=""
                      style="width: 60px; heigth: 50px"
                      ref="imageServiceCreate"
                    />
                  </div>
                </div>
                <div class="mb-1">
                  <label for="name" class="form-label"
                    >Nombre del servicio</label
                  >
                  <input
                    type="input"
                    class="form-control"
                    id="name"
                    placeholder="Nombre del servicio"
                    v-model="createService_title"
                    v-model.lazy="$v.createService_title.$model"
                    :class="{ 'is-invalid': $v.createService_title.$error }"
                  />
                  <p
                    class="text-danger mt-1"
                    style="font-size: 12px !important"
                    v-if="!$v.createService_title.required"
                  >
                    * Campo requerido.
                  </p>
                  <p
                    class="text-danger mt-1"
                    style="font-size: 12px !important"
                    v-if="!$v.createService_title.minLength"
                  >
                    El nombre debe tener al menos 4 caracteres
                  </p>
                </div>
                <div class="mb-1">
                  <label for="name" class="form-label"
                    >Descripcion del servicio</label
                  >
                  <textarea
                    class="form-control"
                    id="Descripcion"
                    rows="3"
                    v-model.lazy="$v.createService_description.$model"
                    :class="{
                      'is-invalid': $v.createService_description.$error,
                    }"
                  ></textarea>
                  <p
                    class="text-danger mt-1"
                    style="font-size: 12px !important"
                    v-if="!$v.createService_description.required"
                  >
                    * Campo requerido.
                  </p>
                  <p
                    class="text-danger mt-1"
                    style="font-size: 12px !important"
                    v-if="!$v.createService_description.minLength"
                  >
                    El nombre debe tener al menos 8 caracteres
                  </p>
                </div>
                <div class="mb-1">
                  <label for="name" class="form-label">Precio:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="name"
                    min="0"
                    placeholder="Precio $"
                    v-model="createService.price"
                  />
                </div>
                <div class="mt-3">
                  <v-switch
                    v-model="createService.portada"
                    label="Servicio Destacado"
                  ></v-switch>
                </div>
                <div class="mt-3">
                  <v-switch
                    v-model="createService.booking"
                    label="Con Turnos"
                  ></v-switch>
                </div>
                <v-container><v-divider></v-divider></v-container>

                <div class="turnos" v-if="createService.booking == true">
                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Selecciones los dias:</label
                    >
                    <v-combobox
                      v-model="days_select"
                      :items="dias"
                      item-text="name"
                      item-value="id"
                      label="Dias"
                      multiple
                      outlined
                      dense
                    ></v-combobox>
                  </div>

                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Hora inicio del servicio:</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="name"
                      max="24"
                      min="0"
                      placeholder="ej: 9"
                      v-model="createService.start_time"
                    />
                  </div>

                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Hora fin del servicio:</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="name"
                      max="24"
                      min="0"
                      placeholder="ej: 9"
                      v-model="createService.end_time"
                    />
                  </div>

                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Duracion del turno:</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="name"
                      min="15"
                      placeholder="ej: 9"
                      v-model="createService.interval"
                    />
                  </div>
                  <div class="mt-3">
                    <div class="row">
                      <div class="col-3 col-sm-3">
                        <label for="name" class="form-label">Color</label>
                      </div>
                      <div class="col-4 col-sm-4">
                        <v-swatches
                          v-model="createService.color"
                          show-fallback
                          fallback-input-type="color"
                          popover-x="left"
                        ></v-swatches>
                      </div>
                      <div class="mt-3">
                        <v-switch
                          v-model="createService.payment"
                          label="Con pago previo"
                        ></v-switch>
                        <div class="mb-6" v-if="createService.payment == true">
                          <label for="name" class="form-label"
                            >Precio a pagar para reservar:</label
                          >
                          <input
                            type="number"
                            class="form-control"
                            id="name"
                            min="0"
                            placeholder="Precio de reserva $"
                            v-model="createService.payment_price"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="step1" v-if="service_instance != null">
              Servicio Creado
              <div class="col-12 col-sm-12">
                <h6>Mas imagenes</h6>
                <span class="cant_max_img"
                  >Cantidad maxima de imagenes:
                  {{ tienda.plan.images_x_products }} (segun su plan)</span
                >
                <input
                  type="file"
                  class="form-control mb-4"
                  name="service_more_images"
                  id="service_more_images"
                  ref="service_more_images"
                  multiple="multiple"
                  @change="uploadImage"
                />

                <div
                  v-for="(image, key) in service_more_images"
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
              v-if="service_instance == null"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep1()"
            >
              Cerrar
            </button>
            <button
              v-if="service_instance != null"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="DeleteStep2()"
            >
              Cerrar
            </button>
            <button
              v-if="service_instance == null"
              type="button"
              class="btn btn-success"
              @click="PrepararObjectToSave()"
            >
              Continuar
            </button>
            <button
              v-if="service_instance != null"
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

    <!-- MODAL AGREGAR SERVICIO -->

    <!-- MODAL EDITAR SERVICIO -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="EditServiceModal"
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
                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Nombre del servicio</label
                    >
                    <input
                      type="input"
                      class="form-control"
                      id="name"
                      placeholder="Nombre del servicio"
                      v-model="setEditService.title"
                    />
                  </div>
                  <div class="mb-1">
                    <label for="name" class="form-label"
                      >Descripcion del servicio</label
                    >
                    <textarea
                      class="form-control"
                      id="Descripcion"
                      rows="3"
                      v-model.lazy="setEditService.description"
                    ></textarea>
                  </div>
                  <div class="mb-1">
                    <label for="name" class="form-label">Precio:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="name"
                      min="0"
                      placeholder="Precio $"
                      v-model="setEditService.price"
                    />
                  </div>
                  <div class="mt-3">
                    <v-switch
                      v-model="setEditService.portada"
                      label="Servicio Destacado"
                    ></v-switch>
                  </div>
                  <div
                    class="alert alert-primary"
                    role="alert"
                    v-if="setEditService.booking == false"
                  >
                    Servicio creado sin sistema de turnos.
                  </div>

                  <v-container><v-divider></v-divider></v-container>
                  <div class="booking" v-if="setEditService.booking == true">
                    <div class="mb-1">
                      <label for="name" class="form-label"
                        >Hora inicio del servicio:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="name"
                        max="24"
                        min="0"
                        placeholder="ej: 9"
                        v-model="setEditService.start_time"
                      />
                    </div>

                    <div class="mb-1">
                      <label for="name" class="form-label"
                        >Hora fin del servicio:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="name"
                        max="24"
                        min="0"
                        placeholder="ej: 9"
                        v-model="setEditService.end_time"
                      />
                    </div>

                    <div class="mb-1">
                      <label for="name" class="form-label"
                        >Duracion del turno:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="name"
                        min="15"
                        placeholder="ej: 9"
                        v-model="setEditService.interval"
                      />
                    </div>
                    <div class="mt-3">
                      <div class="row">
                        <div class="col-3 col-sm-3">
                          <label for="name" class="form-label">Color</label>
                        </div>
                        <div class="col-4 col-sm-4">
                          <v-swatches
                            v-model="setEditService.color"
                            show-fallback
                            fallback-input-type="color"
                            popover-x="left"
                          ></v-swatches>
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
              @click="UpdateService()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR SERVICIO -->

    <!-- ###########################SERVICIOS###################################### -->
  </div>
</template>

<script>
import admin_menu from "../../components/admin/admin_menu.vue";
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";
export default {
  name: "admin_admin_service",
  components: {
    admin_menu,
    VSwatches,
  },
  data() {
    return {
      service_instance: null,
      service_more_images: [],
      categories: [],
      breadcrumbs: [],
      createCategoria_name: "",
      createCategoria_image: null,
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
      createService: {
        category: null,
        portada: false,
        price: 0,
        public: false,
        start_time: 9,
        end_time: 20,
        interval: 15,
        color: "#000000",
        days: [],
        booking: false,
        payment: false,
        payment_price: 0,
      },
      setEditService: {
        id: 0,
        title: "",
        description: "",
        public: null,
        portada: null,
        price: 0,
        start_time: 0,
        end_time: 0,
        interval: 0,
        color: "",
        days: [],
        booking: null,
      },

      days_select: [],
      days_to_save: [],
      dias: [
        { id: 0, name: "lunes" },
        { id: 1, name: "martes" },
        { id: 2, name: "miercoles" },
        { id: 3, name: "jueves" },
        { id: 4, name: "viernes" },
        { id: 5, name: "sabado" },
        { id: 6, name: "domingo" },
      ],
      createService_title: "",
      createService_description: "",
      createService_days: [],
      createService_image: null,
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
      services: [],
    };
  },
  validations: {
    createService_title: { required, minLength: minLength(4) },
    createService_description: { required, minLength: minLength(8) },
    createService_image: { required },
  },

  created() {
    this.Guard();
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
      this.SearchServiceTriagramTitle(value);
    },
  },
  computed: {
    ...mapState("tienda", ["tienda", "plan"]),
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
    /* =========================CATEGORIAS==================================== */
    GetCategories() {
      axios
        .get(this.server + "/api/v1.0/admin/services/categories/", {
          params: {
            tienda: this.tienda.id,
          },
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
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
        .get(this.server + "/api/v1.0/admin/services/subcategories/", {
          params: {
            id: categoria.id,
          },
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
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
            this.GetServicesOffCategory();
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
      this.createCategoria_name = "";
      this.createCategoria_image = null;
    },

    onFileSelectedCatetogia(event) {
      console.log(event);
      this.createCategoria_image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
      console.log("createCategoria_image");
      console.log(this.createCategoria_image);
    },

    AddPrincipalCategoria() {
      const data = new FormData();
      console.log(this.createCategoria_name);
      console.log(this.createCategoria_image);
      data.append("name", this.createCategoria_name);
      data.append("image", this.createCategoria_image);
      data.append("tienda", this.tienda.id);

      var flag = 0;

      if (this.createCategoria_name == "") {
        flag = 1;
      }

      if (this.createCategoria_image == null) {
        flag = 1;
      }

      if (flag > 0) {
        this.$swal.fire(
          "Faltan datos!",
          "Complete los campos nombre y/o imagen, son obligatorios",
          "error"
        );
      } else {
        axios
          .post(
            this.server + "/api/v1.0/admin/services/categories/create/",
            data,
            {
              headers: {
                Authorization: localStorage.getItem("access"),
              },
            }
          )
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
      }
    },

    AddSubCategoria() {
      const data = new FormData();
      data.append(
        "parent",
        this.breadcrumbs[this.breadcrumbs.length - 1]["id"]
      );
      data.append("name", this.createCategoria_name);
      data.append("short_name", this.CreateCategoria.short_name);
      data.append("image", this.createCategoria_image);
      data.append("tienda", this.tienda.id);

      var flag = 0;

      if (this.createCategoria_name == "") {
        flag = 1;
      }

      if (this.createCategoria_image == null) {
        flag = 1;
      }

      if (flag > 0) {
        this.$swal.fire(
          "Faltan datos!",
          "Complete los campos nombre y/o imagen, son obligatorios",
          "error"
        );
      } else {
        axios
          .post(
            this.server + "/api/v1.0/admin/services/categories/create/",
            data,
            {
              headers: {
                Authorization: localStorage.getItem("access"),
              },
            }
          )
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
      }
    },
    CloseAddCategoriaModal() {
      this.$refs.imageCreate.value = null;
      this.previewNew = null;
    },
    DeleteCategoria(categoria) {
      this.$swal
        .fire({
          title: "Esta Seguro!?",
          text: "Esta apunto de eliminar una categoria!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            /* Primero compruebo si tiene subcategoria */
            axios
              .get(this.server + "/api/v1.0/admin/services/subcategories/", {
                params: {
                  id: categoria.id,
                },
                headers: {
                  Authorization: localStorage.getItem("access"),
                },
              })
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
                        "/api/v1.0/admin/services/categories/delete/" +
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
                        "Categoria Eliminada!",
                        "Se ha eliminado esta categoria.",
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
            "/api/v1.0/admin/services/categories/update/" +
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
            "/api/v1.0/admin/services/categories/update/" +
            this.setEditImage.id +
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

    /* =========================SERVICIOS==================================== */

    SearchServiceTriagramTitle(kword) {
      const id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      axios
        .get(this.server + "/api/v1.0/admin/service/category/search/?kword=", {
          params: {
            kword: kword,
            category: id_category,
          },
        })
        .then((response) => {
          this.services = response.data.results;
          console.log(this.services);
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
        this.service_more_images.push(selectedFiles[i]);
        if (
          this.service_more_images.length > this.tienda.plan.images_x_products
        ) {
          this.$swal.fire(
            "Limite Excedido!",
            "Esta intendo cargas mas imaganes de las permitidas por su plan",
            "error"
          );
          this.$refs.service_more_images.value = null;
          this.service_more_images.splice(0, this.service_more_images.length);
        }
      }

      for (let i = 0; i < this.service_more_images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.more_images[i].src = reader.result;
        };

        reader.readAsDataURL(this.service_more_images[i]);
      }
      console.log(this.service_more_images);
    },

    DeleteStep1() {
      console.log("hola");
      (this.createService_image = ""),
        (this.createService_title = ""),
        (this.createService_description = ""),
        (this.createService_days = []),
        (this.createService = {
          category: null,
          image: null,
          title: "",
          description: "",
          price: 0,
          public: false,
          start_time: 9,
          end_time: 20,
          interval: 15,
          color: "#000000",
        });
      this.previewNew = null;
      this.$refs.imageServiceCreate.value = null;
    },

    DeleteStep2() {
      this.service_instance = null;
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
        no_stock: false,
        only_attribute: true,
      };
      this.$refs.service_more_images.value = null;
      this.service_more_images.splice(0, this.service_more_images.length);
    },

    Finalizar() {
      if (this.service_more_images.length > 0) {
        console.log("grabo las imagens en la db");
        this.serviceCreateServiceMoreImages_instance();
      } else {
        this.DeleteStep2();
      }
    },

    serviceCreateServiceMoreImages_instance() {
      let data = new FormData();
      data.append("service", this.service_instance.id);
      /* TENGO QUE HACER ESTE FOR PORQUE SINO EL BACK NO LA RECIBE,ESTA COPIADO DEL POSTMAN */
      /* TENGO QUE MANDAR POR CADA IMAGE UN FILE */
      for (var i = 0; i < this.$refs.service_more_images.files.length; i++) {
        let file = this.$refs.service_more_images.files[i];
        data.append("image", file);
        data.append("tienda", this.tienda.id);
      }
      axios
        .post(this.server + "/api/v1.0/admin/services/images/create/", data, {
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

    onFileSelectedServiceImage(event) {
      console.log(event);
      this.createService_image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
    },

    GoToBreakService(service) {
      this.$router.push({
        name: "AdminServicesBreak",
        params: { service: service },
      });
    },

    PrepararObjectToSave() {
      this.days_select.forEach((el) => {
        this.days_to_save.push(el.id);
        console.log("this.days_to_save");
        console.log(this.days_to_save);
        console.log("this.createService");
      });
      this.createService_days = this.days_to_save;

      if (this.$v.$invalid) {
        this.$swal.fire(
          "Faltan datos!",
          "Complete los campos requeridos.",
          "error"
        );
      } else {
        if (this.days_select.length == 0) {
          this.createService_days = [0, 1, 2, 3, 4, 5];
          this.CreateService();
        } else {
          this.CreateService();
        }
      }
    },

    CreateService() {
      let data = new FormData();
      var id_category = this.breadcrumbs[this.breadcrumbs.length - 1]["id"];
      console.log("category");
      console.log(id_category);
      data.append("category", id_category);
      data.append("tienda", this.tienda.id);
      data.append("title", this.createService_title);
      data.append("image", this.createService_image);
      data.append("description", this.createService_description);
      data.append("public", this.createService.public);
      data.append("price", this.createService.price);
      data.append("start_time", this.createService.start_time);
      data.append("end_time", this.createService.end_time);
      data.append("interval", this.createService.interval);
      data.append("color", this.createService.color);
      data.append("days", this.createService_days);
      data.append("portada", this.createService.portada);
      data.append("booking", this.createService.booking);
      data.append("payment",this.createService.payment);
      data.append("payment_price",this.createService.payment_price);

      axios
        .post(this.server + "/api/v1.0/admin/services/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.GetServicesOffCategory();
          this.service_instance = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Error limite alcanzado!",
            "ha alcanzado el limite de servicios que puede crear segun su plan.",
            "error"
          );
        });
    },

    DeleteService(service) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar este servicio.",
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
                this.server + "/api/v1.0/admin/services/delete/" + service.id
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Servicio eliminado!",
                  "El servicio ha sido eliminado correctamente.",
                  "success"
                );
                this.GetServicesOffCategory();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    onFileSelected(event) {
      console.log(event);
      this.createService_image = event.target.files[0];
      let file = event.target.files[0];
      this.previewNew = URL.createObjectURL(file);
    },

    GetServicesOffCategory() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/categories/services/?category=" +
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
          this.services = response.data.results;
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
      this.createProduct_image = event.target.files[0];
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
                this.GetServicesOffCategory();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    UpdateService() {
      let data = new FormData();
      data.append("tienda", this.tienda.id);
      data.append("title", this.setEditService.title);
      data.append("description", this.setEditService.description);
      data.append("price", this.setEditService.price);
      data.append("start_time", this.setEditService.start_time);
      data.append("public", this.setEditService.public);
      data.append("portada", this.setEditService.portada);
      data.append("end_time", this.setEditService.end_time);
      data.append("interval", this.setEditService.interval);
      data.append("color", this.setEditService.color);
      data.append("days", this.setEditService.days);

      axios
        .put(
          this.server +
            "/api/v1.0/admin/service/update/" +
            this.setEditService.id +
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
          this.GetServicesOffCategory();
          this.$swal.fire(
            "Servicio Actualizado!",
            "El servicio fue actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetEditService(service) {
      this.setEditService = {
        id: service.id,
        title: service.title,
        description: service.description,
        public: service.public,
        portada: service.portada,
        price: service.price,
        start_time: service.start_time,
        end_time: service.end_time,
        interval: service.interval,
        color: service.color,
        days: service.days,
        booking: service.booking,
      };
      console.log("SetEditService");
      console.log(this.setEditService);
    },

    GoToEditServiceImages(service) {
      this.$router.push({
        name: "AdminServiceImages",
        params: { service_id: service.id },
      });
    },

    GoToEditProductImages(product) {
      this.$router.push({
        name: "AdminProductImages",
        params: { product_id: product.id },
      });
    },

    ServiceUpdatePublicStatus(service) {
      const data = new FormData();
      data.append("public", service.public);
      data.append("tienda", this.tienda.id);

      axios
        .put(
          this.server + "/api/v1.0/admin/service/public/" + service.id + "/",
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
.cant_max_img {
  font-size: 12px !important;
}
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>