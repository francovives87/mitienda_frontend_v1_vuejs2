<template>
  <div class="tienda_product_detail_mobile mt-10" :style="Home">
    <div class="container">
      <div class="row card">
        <div class="container">
          <div class="row">
            <h4>{{ productDetail.title }}</h4>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="row d-flex justify-content-center">
          <carousel
            :per-page="1"
            :mouse-drag="false"
            :navigationEnabled="height == 4 ? true : false"
            paginationPosition="false"
            :loop="true"
          >
            <slide v-for="(img, index) in imagenes_array" :key="index">
              <div class="images_slide">
                <img :src="img.image" alt="" class="mobile" />
                <div class="overlay">
                  <font-awesome-icon icon="fa-images" /> &nbsp;
                  {{ index + 1 }}/{{ imagenes_array.length }}
                </div>
              </div>
            </slide>
          </carousel>
        </div>

        <div class="container">
          <v-divider></v-divider>
          <div class="row d-flex align-items-center">
            <div class="col-7">
              <v-rating
                v-model="product_rating"
                background-color="orange lighten-3"
                color="orange"
                size="18"
                readonly
                :value="product_rating"
              ></v-rating>
            </div>
            <div class="col-2">
              <div class="dot">
                <span>{{ product_rating }}</span>
              </div>
            </div>
            <div class="col-3">
              <span class="cant_opiniones">opiniones: {{ count_opinion }}</span>
            </div>
          </div>
          <div class="row d-flex justify-content-end">
            <v-btn
              elevation="4"
              icon
              style="background-color: white; font-size: 16px !important"
              data-bs-toggle="modal"
              data-bs-target="#opinionModal"
              class="boton_opinar"
            >
              <font-awesome-icon icon="comments" />
            </v-btn>
          </div>
        </div>

        <div class="container" v-if="productDetail.in_offer == false">
          <v-divider></v-divider>
          <div class="row">
            <div class="col-12 col-sm-12">
              <h3>$ {{ productDetail.price }}</h3>
              <p>
                {{ productDetail.category.name }}
              </p>
              <h6>Descrpcion:</h6>
              <p>
                {{ productDetail.description }}
              </p>
              <h6>
                <span v-if="productDetail.has_variation == false">
                  <span v-if="productDetail.no_stock == false">
                    STOCK: {{ productDetail.stock }}</span
                  ></span
                >
              </h6>
            </div>
          </div>
        </div>
        <!-- Si esta en oferta! -->
        <div class="container" v-if="productDetail.in_offer == true">
          <v-divider></v-divider>
          <div class="row">
            <div class="col-12 col-sm-12">
              <h6>producto con descuento!</h6>
              <p>
                <span class="oldPrice">{{ productDetail.price }}</span>
              </p>

              <h3 class="newPrice">$ {{ productDetail.in_offer_price }}</h3>
              <p>
                {{ productDetail.category.name }}
              </p>
              <h6>Descrpcion:</h6>
              <p>
                {{ productDetail.description }}
              </p>
              <h6>
                <span v-if="productDetail.has_variation == false">
                  <span v-if="productDetail.no_stock == false">
                    STOCK: {{ productDetail.stock }}</span
                  >
                </span>
              </h6>
            </div>
          </div>
        </div>

        <!-- WhatsApp contact -->
        <div class="container">
          <v-divider></v-divider>
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-6 col-lg-1">
              <span class="consul_wapp">Consultar por WhatsApp</span>
            </div>
            <div class="col-2 col-sm-2 col-lg-1">
              <v-btn
                elevation="4"
                icon
                style="background-color: white"
                @click="WhatsAppContact()"
              >
                <v-icon color="green" style="font-size: 18px"
                  >mdi-whatsapp</v-icon
                >
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
        </div>

        <div class="container mt-2 mb-2">
          <div class="row">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item"></div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Preguntas al vendedor ({{ cant_preguntas }})
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="botonera mt-4 mb-4 d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#preguntarModal"
                        v-if="user_store.id"
                      >
                        Preguntar
                      </button>
                      <span v-if="!user_store.id"
                        >Debe ingresar para poder preguntar.</span
                      >
                    </div>
                    <div
                      class="card mb-2"
                      v-for="(pregunta, index) in preguntas"
                      :key="index"
                    >
                      <div class="hay_preguntas" v-if="cant_preguntas > 0">
                        <div class="pregunta_container">
                          <div class="row">
                            <div class="col-6">
                              <span class="pregunta_username">{{
                                pregunta.user.username
                              }}</span>
                            </div>
                            <div class="col-6">
                              <span class="created_user">
                                {{ pregunta.created }}
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <span class="pregunta">{{
                                pregunta.pregunta
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="respuesta_container"
                          v-if="pregunta.respuesta != null"
                        >
                          <div class="row">
                            <div class="col-6">
                              <span class="respuesta_tienda">
                                {{ tienda.title }}
                              </span>
                            </div>
                            <div class="col-6">
                              <span class="respuesta_modified">
                                {{ pregunta.modified }}
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <font-awesome-icon icon="reply" class="ml-4" />
                              <span class="respuesta">
                                {{ pregunta.respuesta }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="container" v-if="tienda.id === mitienda.id">
                          <div class="col-12 d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn btn-outline-danger mr-4"
                              @click="DeleteQuestion(pregunta)"
                            >
                              Eliminar
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#responseQuestionModal"
                              @click="SetPregunta(pregunta)"
                            >
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="no_hay_preguntas" v-if="cant_preguntas == 0">
                      <h6>Aun no hay preguntas.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <v-divider class="mt-6"></v-divider>
        </div>

        <!-- Add To card product simple -->
        <v-card
          elevation="2"
          outlined
          class="mb-10"
          v-if="productDetail.has_options == false"
        >
          <v-card-text>
            <div class="row d-flex justify-content-center">
              <div
                class="
                  col-sm-12 col-lg-5
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <div class="col-2 col-sm-2">
                  <v-btn elevation="4" icon @click="Decrease_quantity_oatt()">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
                <div class="col-3 col-sm-3">
                  <span class="quantity_attribute">{{
                    quantity_only_attribute
                  }}</span>
                </div>
                <div class="col-2 col-sm-2">
                  <v-btn
                    elevation="4"
                    icon
                    @click="Incremet_quantity_product_simple()"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-lg-12 col-sm-7 mb-4 d-flex justify-content-center"
                >
                  <v-btn
                    elevation="2"
                    @click="AddToCartSimpleProduct()"
                    style="color: green !important"
                    ><v-icon>mdi-cart</v-icon> Agregar al carrito</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Opciones -->

        <div class="container" v-if="productDetail.only_attribute == true">
          <div class="row d-flex justify-content-center">
            <div
              class="row"
              v-for="(atributo, index) in atributos"
              :key="index"
            >
              <div class="col-11 col-sm-11" v-if="atributo.repeat == 0">
                <div class="d-grid gap-0">
                  <h6>{{ atributo.nombre }}</h6>
                  <v-btn
                    block
                    data-bs-toggle="modal"
                    data-bs-target="#selectAttributeModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}</v-btn
                  >
                </div>
              </div>
              <div class="col-11 col-sm-11" v-if="atributo.repeat > 0">
                <div
                  class="d-grid gap-0"
                  v-for="(attribute, index) in atributo.repeat"
                  :key="index"
                >
                  <h6>{{ atributo.nombre }}</h6>
                  <v-btn
                    block
                    data-bs-toggle="modal"
                    data-bs-target="#selectAttributeRepeatModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mostrar opciones seleccionadas -->
        <div class="container">
          <div class="row mt-4" v-if="attributes_selected.length > 0">
            <h6>selecciono:</h6>
            <div class="col-xl-6 col-sm-12 mt-2">
              <div
                class="d-inline p-2 mr-2 bg-dark text-white"
                v-for="(item, index) in attributes_selected"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <!-- Opciones -->

        <!-- variaciones -->
        <div class="container" v-if="productDetail.has_variation == true">
          variaciones
          <div class="row d-flex justify-content-center">
            <div
              class="row"
              v-for="(atributo, index) in atributos"
              :key="index"
            >
              <div class="col-11 col-sm-11" v-if="atributo.repeat == 0">
                <div class="d-grid gap-0">
                  <h6>{{ atributo.nombre }}</h6>
                  <v-btn
                    block
                    data-bs-toggle="modal"
                    data-bs-target="#selectVariModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}</v-btn
                  >
                </div>
              </div>
              <div class="col-11 col-sm-11" v-if="atributo.repeat > 0">
                <div
                  class="d-grid gap-0"
                  v-for="(attribute, index) in atributo.repeat"
                  :key="index"
                >
                  <h6>{{ atributo.nombre }}</h6>
                  <v-btn
                    block
                    data-bs-toggle="modal"
                    data-bs-target="#selectAttributeModal"
                    @click="SetAtributo(atributo)"
                  >
                    Seleccionar {{ atributo.nombre }}</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- variaciones -->

        <div class="container">
          <div class="row mt-4" v-if="variationValuesforChild.length > 0">
            <h6>selecciono:</h6>
            <div class="col-xl-6 col-sm-12 mt-2">
              <div
                class="d-inline p-2 mr-2 bg-dark text-white"
                v-for="(item, index) in variationValuesforChild"
                :key="index"
              >
                {{ item.item }}
              </div>
            </div>
          </div>
        </div>

        <!-- variacion todavia no buscada -->
        <div class="container" v-if="flagResultadoBusquedaVariaciones == 0">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12"></div>
          </div>
        </div>

        <!-- variacion NO encontrada -->
        <div class="container" v-if="flagResultadoBusquedaVariaciones == 2">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12">Variacion no encontrada!</div>
          </div>
        </div>

        <!-- Variacion ENCONTRADA -->

        <!-- loading -->
        <div class="container mt-4" v-if="loading == true">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <strong>Cargando...</strong>
                  <div
                    class="spinner-border ms-auto text-success"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Agregar item con variacions -->
        <v-card
          elevation="2"
          outlined
          class="mb-10"
          v-if="flagResultadoBusquedaVariaciones == 1"
        >
          <v-card-text>
            <p>
              <span class="variacion_titulos"> precio: $ </span
              >{{ variacionEncontrada.price }} <br />
              <span
                class="variacion_titulos"
                v-if="variacionEncontrada.no_stock == false"
              >
                stock: </span
              ><span v-if="variacionEncontrada.no_stock == false">{{
                variacionEncontrada.stock
              }}</span>
            </p>
            <div class="row d-flex justify-content-center">
              <div
                class="
                  col-sm-12 col-lg-5
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <div class="col-2 col-sm-2">
                  <v-btn elevation="4" icon @click="Decrease_quantity_oatt()">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
                <div class="col-3 col-sm-3">
                  <span class="quantity_attribute">{{
                    quantity_only_attribute
                  }}</span>
                </div>
                <div class="col-2 col-sm-2">
                  <v-btn
                    elevation="4"
                    icon
                    @click="IncremetQuantityWitchVariation()"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div
                  class="col-lg-12 col-sm-7 mb-4 d-flex justify-content-center"
                >
                  <v-btn
                    elevation="2"
                    @click="AddToCartProductWithVariation()"
                    style="color: green !important"
                    ><v-icon>mdi-cart</v-icon> Agregar al carrito</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <!-- Agregar item con variacions -->

        <!-- Solo atributos -->
        <v-card
          elevation="2"
          outlined
          class="mb-10"
          v-if="onlyAttibute == true"
        >
          <v-card-text>
            <div class="row d-flex justify-content-center">
              <div
                class="
                  col-sm-12 col-lg-5
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <div class="col-2 col-sm-2">
                  <v-btn elevation="4" icon @click="Decrease_quantity_oatt()">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
                <div class="col-2 col-sm-2">
                  <span class="quantity_attribute">{{
                    quantity_only_attribute
                  }}</span>
                </div>
                <div class="col-2 col-sm-2">
                  <v-btn elevation="4" icon @click="Incremet_quantity_oatt()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div
                  class="col-lg-12 col-sm-7 mb-4 d-flex justify-content-center"
                >
                  <v-btn
                    elevation="2"
                    @click="AddToCartOnlyAtrribute()"
                    style="color: green !important"
                    ><v-icon>mdi-cart</v-icon> Agregar al carrito</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <!-- solo atributos -->

        <div v-if="productDetail.has_variation == true">
          <div
            class="bottm"
            style="height: 500px"
            v-if="flagResultadoBusquedaVariaciones != 1"
          ></div>
        </div>
      </div>
      <!-- fin row que contiene todo el card!! -->

      <!-- MODALES -->

      <!-- MODAL SELECCCIONAR VARIACION -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="selectVariModal"
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
                Seleccione uno: {{ atributo_select.nombre }}
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
                  <div class="col-11 col-sm-11">
                    <div class="d-grid gap-0">
                      <v-btn
                        block
                        data-bs-dismiss="modal"
                        v-for="(item, index) in atributo_select.atributo_item"
                        :key="index"
                        class="mb-2"
                        @click="SelectVariation(item)"
                      >
                        {{ item.item }}
                      </v-btn>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL -->

      <!-- MODAL SELECCCIONAR Atributos -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="selectAttributeModal"
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
                Seleccione {{ atributo_select.nombre }}
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
                  <div class="col-11 col-sm-11">
                    <div class="d-grid gap-0">
                      <v-btn
                        block
                        data-bs-dismiss="modal"
                        v-for="(item, index) in atributo_select.atributo_item"
                        :key="index"
                        class="mb-2"
                        @click="SelectAttribute(item)"
                      >
                        {{ item.item }}
                      </v-btn>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seleccionar atributos Repeat -->

      <div
        class="modal fade"
        id="selectAttributeRepeatModal"
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
                Seleccione uno: ATTRIBUTE {{ atributo_select.nombre }}
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
                  <div class="col-11 col-sm-11">
                    <div class="d-grid gap-0">
                      <v-btn
                        block
                        data-bs-dismiss="modal"
                        v-for="(item, index) in atributo_select.atributo_item"
                        :key="index"
                        class="mb-2"
                        @click="SelectAttributeRepeat(item)"
                      >
                        {{ item.item }}
                      </v-btn>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- OPINION -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="opinionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Opiniones</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="CloseModalOpinion()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="list_opinions" v-if="opinar == false">
                <h6>Lista de opiniones</h6>
                <div class="container">
                  <div class="row">
                    <div
                      class="card mt-1"
                      v-for="(opinion, index) in opiniones"
                      :key="index"
                    >
                      <div class="card-body">
                        <div class="container">
                          <div class="row d-flex">
                            <v-rating
                              background-color="purple lighten-3"
                              color="orange"
                              small
                              readonly
                              :value="parseInt(opinion.rating)"
                            ></v-rating>
                            <span class="opinion_user">{{
                              opinion.user.username
                            }}</span>
                            <br />
                            <span class="opinion">{{ opinion.opinion }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="opinar" v-if="opinar == true">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <div class="container" v-if="canOpinar == true">
                        <h6>Calificar esta tienda:</h6>
                        <v-rating
                          v-model="userOpinion.rating"
                          background-color="orange lighten-3"
                          color="orange"
                          large
                          :value="userOpinion.rating"
                        ></v-rating>
                        <v-divider></v-divider>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                            >Escriba una opinion:
                            <span style="font-size: 12px"
                              >(maximo 255 caracteres)
                            </span>
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="10"
                            v-model="userOpinion.opinion"
                          ></textarea>
                        </div>
                      </div>
                      <div class="container" v-if="canOpinar == false">
                        Debe registrarse para poder opinar.
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
                @click="CloseModalOpinion()"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-if="opinar == false"
                @click="Opinar()"
              >
                <font-awesome-icon icon="comment-dots" /> Opinar
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="DeleteUserOpinion()"
                v-if="opinar == true && userOpinion.id > 0"
              >
                Eliminar comentario
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-if="opinar == true"
                data-bs-dismiss="modal"
                @click="GuardarOpinion()"
              >
                Guardar opinion
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- OPINION -->

      <!-- PREGUNTAR -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="preguntarModal"
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
                Preguntar al vendedor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="ClosePreguntaModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Escribe un pregunta.
                  <span style="font-size: 12px">(255 caracteres)</span></label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  v-model="pregunta"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="ClosePreguntaModal()"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="CreatePregunta()"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RESPONDER PREGUNTA -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="responseQuestionModal"
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
                Responder Pregunta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container card">
                <div class="row">
                  <div class="col-6">
                    {{ set_pregunta.username }}
                  </div>
                  <div class="col-6">
                    {{ set_pregunta.created }}
                  </div>
                  <div class="col-12">
                    {{ set_pregunta.pregunta }}
                  </div>
                </div>
              </div>
              <div class="container card mt-4">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                        >Responder</label
                      >
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        v-model="set_pregunta.respuesta"
                      ></textarea>
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
                @click="ResponderQuestion()"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RESPONDER PREGUNTA -->
      <!-- PREGUNTAR -->
      <!-- MODAL -->
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapState, mapMutations } from "vuex";
import tienda_barra_mobile from "../../components/tienda/tienda_barra_mobile.vue";
import tienda_add_to_cart from "../../components/tienda/tienda_add_to_cart.vue";
import axios from "axios";
export default {
  name: "tienda_product_detail_mobile",
  components: {
    Carousel,
    Slide,
    tienda_barra_mobile,
    tienda_add_to_cart,
  },
  props: ["product"],
  data() {
    return {
      productDetail: [],
      product_id: "",
      imagenes_array: [],
      images: [],
      variaciones: [],
      atributos: [],
      variationValuesforChild: [],
      variacionEncontrada: [],
      flagResultadoBusquedaVariaciones: 0,
      loading: false,
      atributo_select: [],
      contar: 0,
      onlyAttibute: false,
      quantity_only_attribute: 0,
      attributes: [],
      attributes_selected: [],
      /* opinion */
      product_rating: 0,
      count_opinion: 0,
      opiniones: [],
      canOpinar: false,
      opinar: false,
      userOpinion: {
        id: 0,
        rating: 1,
        opinion: null,
      },
      /* preguntas */
      preguntas: [],
      cant_preguntas: 0,
      pregunta: null,
      set_pregunta: {
        id: "",
        username: "",
        created: "",
        pregunta: "",
        respuesta: "",
      },
    };
  },

  created() {
    this.product_id = this.product;
    this.getProduct();
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  computed: {
    ...mapState("tienda", ["tienda", "mitienda"]),
    ...mapState("user", ["user_store"]),

    Home() {
      if (!this.tienda.name) {
        return "background-color:#ffffff !important;";
      } else {
        if (this.tienda.tienda_colors[0].hasTexture == false) {
          return (
            "background-color:" +
            this.tienda.tienda_colors[0].background_color +
            "!important;"
          );
        } else {
          return (
            "background-image: url(" +
            this.tienda.tienda_colors[0].texture.image +
            ")  !important; background-repeat: repeat !important; min-height:auto !important;"
          );
        }
      }
    },
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
    ...mapMutations("cart", [
      "AddToCartVuex",
      "RemoveItemVuex",
      "AddToCartWithVariationVuex",
      "RemoveItemVuexWithVariation",
      "AddToCartOnlyAttributeVuex",
    ]),
    ...mapMutations("tienda", ["DisminuirCantNewsNotifiacionts"]),

    /* Preguntas */

    DeleteQuestion(pregunta) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar esta pregunta?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                this.server +
                  "/api/v1.0/admin/product/question/delete/" +
                  pregunta.id
              )
              .then((response) => {
                console.log(response.data);
                this.$swal.fire(
                  "Pregunta eliminada!",
                  "Se ha borrado esta pregunta.",
                  "success"
                );
                this.GetPreguntas();
              });
          }
        });
    },

    ResponderQuestion() {
      let data = {
        visto: true,
        respuesta: this.set_pregunta.respuesta,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/admin/questions/update/" +
            this.set_pregunta.id,
          data
        )
        .then((response) => {
          console.log(response.data);
          this.GetPreguntas();
          this.$swal.fire(
            "Respondido!",
            "Se ha respondido con exito la pregunta.",
            "success"
          );
          this.DisminuirCantNewsNotifiacionts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    SetPregunta(pregunta) {
      this.set_pregunta = {
        id: pregunta.id,
        username: pregunta.user.username,
        created: pregunta.created,
        pregunta: pregunta.pregunta,
        respuesta: pregunta.respuesta,
      };
      console.log(this.set_pregunta);
    },

    ClosePreguntaModal() {
      this.pregunta = "";
    },

    CreatePregunta() {
      var data = {
        product: this.product_id,
        user: this.user_store.id,
        pregunta: this.pregunta,
      };

      axios
        .post(this.server + "/api/v1.0/product/question/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Pregunta Creada!",
            "El administrador de la tienda contestara pronto.",
            "success"
          );
          this.ClosePreguntaModal();
          this.imagenes_array = [];
          this.getProduct();
        });
    },

    GetPreguntas() {
      console.log("GetPreguntas");
      console.log(this.product_id);
      axios
        .get(this.server + "/api/v1.0/product/question/list/", {
          params: {
            product: this.product_id,
          },
        })
        .then((response) => {
          this.preguntas = response.data.results;
          this.cant_preguntas = response.data.count;
          console.log("this.preguntas");
          console.log(this.preguntas);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* Preguntas */

    /* opinion */

    GuardarOpinion() {
      if (this.userOpinion.opinion == null) {
        this.$swal.fire(
          "Escriba un comentario!",
          "Por favor, escriba un breve comentario.",
          "info"
        );
      } else {
        console.log(this.userOpinion);
        if (this.userOpinion.id > 0) {
          console.log("ejecuto update");
          this.UpdateUserOpinion();
        } else {
          console.log("ejecuto create");
          this.CreateUserOpinon();
        }
      }
    },

    UpdateUserOpinion() {
      let data = {
        rating: this.userOpinion.rating,
        opinion: this.userOpinion.opinion,
      };
      axios
        .put(
          this.server +
            "/api/v1.0/product/opinion/user/update/" +
            this.userOpinion.id,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.imagenes_array = [];
          this.getProduct();
          window.scrollTo(0, 0);
          this.$swal.fire(
            "Comentario Actualizado!",
            "Muchas gracias por comentar y ayudar a la comunidad.",
            "success"
          );
          this.CloseModalOpinion();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateUserOpinon() {
      let data = {
        rating: this.userOpinion.rating,
        opinion: this.userOpinion.opinion,
        product: this.product_id,
      };
      axios
        .post(this.server + "/api/v1.0/product/opinion/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Comentario Creado!",
            "Muchas gracias por comentar y ayudar a la comunidad.",
            "success"
          );
          this.imagenes_array = [];
          this.getProduct();
          this.CloseModalOpinion();
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CloseModalOpinion() {
      this.opinar = false;
      this.userOpinion = {
        id: 0,
        rating: 1,
        opinion: null,
      };
    },

    DeleteUserOpinion() {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta seguro que quiere eliminar este comentario?!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrarla!",
        })
        .then((result) => {
          axios
            .delete(
              this.server +
                "/api/v1.0/product/opinion/user/delete/" +
                this.userOpinion.id
            )
            .then(() => {
              this.$swal.fire(
                "Comentario eliminado!",
                "Se ha borrado este comentario.",
                "success"
              );
              this.CloseModalOpinion();
              this.imagenes_array = [];
              this.getProduct();
            })
            .catch((error) => {
              this.$swal.fire(
                "Algo salio mal!",
                "intente nuevamente.",
                "error"
              );
            });
        });
    },

    Opinar() {
      console.log("opinar");
      /* getUserOpinion */
      axios
        .get(this.server + "/api/v1.0/product/opinion/user/", {
          params: {
            user: this.user_store.id,
            product: this.product_id,
          },
        })
        .then((response) => {
          if (response.data.count > 0) {
            this.userOpinion = {
              id: response.data.results[0].id,
              rating: parseInt(response.data.results[0].rating),
              opinion: response.data.results[0].opinion,
            };
            console.log(this.userOpinion);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.opinar = true;
        });
      if (localStorage.getItem("access")) {
        this.canOpinar = true;
      }
    },

    GetOpiniones() {
      axios
        .get(this.server + "/api/v1.0/product/opinion/list/", {
          params: {
            product: this.product_id,
          },
        })
        .then((response) => {
          this.opiniones = response.data.results;
          console.log("opiniones");
          console.log(this.opiniones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* opinion */

    LoadImages() {
      let images = {
        image: null,
      };
      this.productDetail.images_product.forEach((el) => {
        images = {
          image: el.image,
        };
        this.imagenes_array.push(images);
      });
      let portada = {
        image: this.productDetail.image,
      };
      this.imagenes_array.unshift(portada);

      console.log("desde LOAD_images");
      console.log(this.imagenes_array);
    },

    IncremetQuantityWitchVariation() {
      if (this.variacionEncontrada.no_stock == false) {
        if (this.quantity_only_attribute != this.variacionEncontrada.stock) {
          this.quantity_only_attribute++;
        }
      } else {
        this.quantity_only_attribute++;
      }
    },

    Incremet_quantity_product_simple() {
      console.log("Incremet_quantity_product_simple!");
      if (this.productDetail.no_stock == false) {
        if (this.quantity_only_attribute != this.productDetail.stock) {
          this.quantity_only_attribute++;
        }
      } else {
        this.quantity_only_attribute++;
      }
    },

    Incremet_quantity_oatt() {
      if (this.productDetail.no_stock == false) {
        if (this.quantity_only_attribute != this.productDetail.stock) {
          this.quantity_only_attribute++;
        }
      } else {
        this.quantity_only_attribute++;
      }
    },
    Decrease_quantity_oatt() {
      if (this.quantity_only_attribute != 0) {
        this.quantity_only_attribute--;
      }
    },

    AddToCartProductWithVariation() {
      let variaciones = [];

      this.variationValuesforChild.forEach(function callback(value, index) {
        variaciones.push(value.item);
      });
      console.log(variaciones);

      this.productDetail.variaciones = variaciones;

      console.log(this.productDetail);

      console.log("variacion seleccionada");
      console.log(this.variacionEncontrada);

      /* REEMPLAZO EL PRECIO DE LA BASE DE DATOS, POR EL DE LA VARIACIONE ENCONTRADA */
      this.productDetail.price = this.variacionEncontrada.price;
      this.productDetail.quantity = this.quantity_only_attribute;
      this.AddToCartWithVariationVuex(this.productDetail);
      this.$swal.fire({
        position: "center-end",
        icon: "success",
        title: "se agregaron " + this.quantity_only_attribute + " al carrito",
        showConfirmButton: false,
        timer: 1200,
      });
      this.quantity_only_attribute = 0;
    },

    AddToCartSimpleProduct() {
      if (this.quantity_only_attribute > 0) {
        this.productDetail.quantity = this.quantity_only_attribute;
        this.AddToCartVuex(this.productDetail);
        this.$swal.fire({
          position: "center-end",
          icon: "success",
          title: "se agregaron " + this.quantity_only_attribute + " al carrito",
          showConfirmButton: false,
          timer: 1200,
        });
        this.quantity_only_attribute = 0;
      }
    },

    AddToCartOnlyAtrribute() {
      if (this.quantity_only_attribute > 0) {
        this.$swal.fire({
          position: "center-end",
          icon: "success",
          title: "se agregaron " + this.quantity_only_attribute + " al carrito",
          showConfirmButton: false,
          timer: 1200,
        });
        this.productDetail.quantity = this.quantity_only_attribute;
        this.productDetail.opciones = this.attributes_selected;
        this.AddToCartOnlyAttributeVuex(this.productDetail);
        this.attributes = [];
        this.attributes_selected = [];
        this.onlyAttibute = false;
        this.quantity_only_attribute = 0;
      } else {
        this.$swal.fire({
          position: "center-end",
          icon: "error",
          title: "No hay stock disponible",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    },

    SetAtributo(atributo) {
      this.atributo_select = atributo;
    },

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
            "&text=Hola!%20tengo%20una%20consulta%20de%20su%20tienda.%20sobre%20el%20producto:%20%0A" +
            this.productDetail.title,
          "_blank"
        );
      }
    },

    AddToCartWithVariation_bak() {
      let variaciones = [];

      this.variationValuesforChild.forEach(function callback(value, index) {
        variaciones.push(value.item);
      });
      console.log(variaciones);

      this.productDetail.variaciones = variaciones;

      console.log(this.productDetail);

      console.log("variacion seleccionada");
      console.log(this.variacionEncontrada);

      /* REEMPLAZO EL PRECIO DE LA BASE DE DATOS, POR EL DE LA VARIACIONE ENCONTRADA */
      this.productDetail.price = this.variacionEncontrada.price;

      if (this.variacionEncontrada.no_stock == false) {
        if (this.contar != this.variacionEncontrada.stock) {
          this.contar++;
          this.AddToCartWithVariationVuex(this.productDetail);
        }
      } else {
        this.AddToCartWithVariationVuex(this.productDetail);
      }
    },

    RemoveItemToCartWithVariation() {
      this.RemoveItemVuexWithVariation(this.productDetail);
      if (this.contar != 0) {
        this.contar--;
      }
    },

    SelectVariation(value) {
      if (this.variationValuesforChild.length == this.atributos.length) {
        this.variationValuesforChild.splice(
          0,
          this.variationValuesforChild.length
        );
        this.onlyAttibute = false;
      }

      if (this.variationValuesforChild.some((elem) => elem.id === value.id)) {
        var index = this.variationValuesforChild.findIndex(
          (item) => item.id === value.id
        );
        this.variationValuesforChild.splice(index, 1, value);
      } else {
        this.variationValuesforChild.push(value);
      }

      console.log(this.variationValuesforChild);

      let items = [];

      this.variationValuesforChild.forEach((item) => {
        items.push(item.id);
      });

      console.log("====items=====");
      console.log(items);
      console.log("====items=====");

      if (this.variationValuesforChild.length == this.atributos.length) {
        if (this.productDetail.only_attribute == false) {
          console.log("aca ejecuto funcion para buscar");
          this.buscarVariacion(items);
        } else {
          this.onlyAttibute = true;
        }
      }
    },

    SelectAttribute(value) {
      if (this.attributes.length == this.atributos.length) {
        this.attributes.splice(0, this.attributes.length);
        this.attributes_selected.splice(0, this.attributes_selected.length);
      }
      console.log(value);
      this.attributes.push(value.id);
      this.attributes_selected.push(value.item);
      console.log("Attributes");
      console.log(this.attributes);
      console.log("attributes_selected");
      console.log(this.attributes_selected);

      if (this.attributes.length > 0) {
        console.log("aca muestro agregar");
        this.onlyAttibute = true;
        this.productDetail.atributos = this.attributes;
        console.log(this.productDetail);
      }
    },

    SelectAttributeRepeat(value) {
      if (this.attributes.length == this.atributos[0].repeat) {
        this.attributes.splice(0, this.attributes.length);
        this.attributes_selected.splice(0, this.attributes_selected.length);
      }
      console.log(value);
      this.attributes.push(value.id);
      this.attributes_selected.push(value.item);
      console.log("Attributes");
      console.log(this.attributes);
      console.log("attributes_selected");
      console.log(this.attributes_selected);

      if (this.attributes.length > 0) {
        console.log("aca muestro agregar");
        this.onlyAttibute = true;
        this.productDetail.atributos = this.attributes;
        console.log(this.productDetail);
      }
    },

    buscarVariacion(items) {
      let data = {
        product: this.product_id,
        item: items,
      };

      let variSelect = 0;

      axios
        .post(this.server + "/api/v1.0/admin/product/variations/search/", data)
        .then((response) => {
          this.loading = true;
          console.log(response.data);
          let variacion = response.data;
          variacion.forEach((vari) => {
            if (vari.repeticiones === this.atributos.length) {
              console.log("esta es");
              variSelect = vari.pk;
              console.log(variSelect);
            }
          });
          if (variSelect == 0) {
            console.log("variacion no encontrada!");
            this.variacionEncontrada = [];
            this.flagResultadoBusquedaVariaciones = 2;
            this.loading = false;
          } else {
            axios
              .get(
                this.server + "/api/v1.0/admin/product/variation/" + variSelect
              )
              .then((response) => {
                this.variacionEncontrada = response.data;
                /* Le agrego la variacion al productDetail, para agregar y elimar */
                this.productDetail.variacion_id = this.variacionEncontrada.id;
                console.log("variacion encontrada");
                console.log(this.variacionEncontrada);
                this.contar = 0;
              });
            this.flagResultadoBusquedaVariaciones = 1;
            this.loading = false;
            window.scrollTo(
              0,
              document.body.scrollHeight ||
                document.documentElement.scrollHeight
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProduct() {
      axios
        .get(this.server + "/api/v1.0/products/detail/" + this.product_id)
        .then((response) => {
          console.log("esto viene del get created");
          console.log(response.data);
          this.productDetail = response.data;
          this.GetAtributosOfProduct();
          this.LoadImages();
          this.product_rating = response.data.average.rating__avg;
          this.count_opinion = response.data.count_opinion.opinion__count;
          this.GetOpiniones();
          this.GetPreguntas();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetAtributosOfProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/atributos/?kword=" +
            this.product
        )
        .then((response) => {
          console.log(response.data.results);
          console.log("atributos");
          this.atributos = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetVariacionesOfProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/variations/?kword=" +
            this.product
        )
        .then((response) => {
          this.variaciones = response.data.results;
          console.log("*****variaciones*****");
          console.log(this.variaciones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
.images_slide img {
  width: 100%;
  height: 300px !important;
}

.images_slide {
  padding: 0px !important;
  margin: 0px !important;
  position: relative;
  margin-top: 15px;
}
.overlay {
  position: absolute;
  margin-top: 10px;
  top: 0;
  right: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7); /* Black see-through */
  color: #f1f1f1;
  width: 66px;
  height: 38px;
  transition: 0.5s ease;
  color: white;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  text-transform: uppercase;
  opacity: 1;
  border-bottom-left-radius: 3%;
  border-bottom-right-radius: 3%;
}

.consul_wapp {
  font-size: 12px !important;
  color: darkgray !important;
  text-transform: uppercase !important;
}

.pregunta_container {
  padding: 6px;
  background-color: #e3e3e3;
}

.respuesta_container {
  padding: 6px;
}

.pregunta_username {
  font-size: 13px;
}
.created_user {
  font-size: 12px;
}

.respuesta_tienda {
  font-size: 13px;
}

.respuesta {
  margin-left: 4px;
}

.respuesta_modified {
  font-size: 12px;
}

.oldPrice {
  text-decoration: line-through;
}
.dot {
  height: 34px;
  width: 34px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid orange;
  color: orange;
}

.boton_opinar {
  margin-right: 30px !important;
}

.cant_opiniones {
  font-size: 12px !important;
}

.newPrice {
  color: green;
}
.atributo_name {
  display: inline-block !important;
}

.variacion_titulos {
  color: black !important;
}
.quantity_attribute {
  border: 1px solid greenyellow !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
}

.card {
  align-items: center !important;
  padding: 0px 10px 0px 10px !important;
}
.card-body {
  padding: 0px 0px 0px 0px !important;
  margin: 0px 0px 0px 0px !important;
}
.product {
  width: 304px;
  height: 300px;
  padding: 0px 2px 0px 2px !important;
  margin: 0px 4px 0px 4px !important;
}

.product_image {
  width: 298px !important;
  height: 298px !important;
  padding: 4px 0px 4px 0px !important;
  border-radius: 1% !important;
}

@media only screen and (min-width: 768px) {
  .product {
    width: 640px;
    height: 440px;
  }

  .product_image {
    width: 600px !important;
    height: 400px !important;
  }
}
</style>