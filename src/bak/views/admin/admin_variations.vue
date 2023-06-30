<template>
  <div class="variations mt-12 mb-10">
    <admin_menu />
    <div class="container">
      <div class="row">
        <h6>variaciones</h6>
      </div>
      <div class="row">
        <p>{{ product.title }}</p>
      </div>
      <v-divider></v-divider>
      <div class="row">
        <div class="col-8 col-sm-8">
          <h6>Atributos</h6>
        </div>
        <div class="col-4 col-sm-4">
          <v-btn
            elevation="4"
            icon
            data-bs-toggle="modal"
            data-bs-target="#modal_crear_atributo"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <ul class="list-group mb-2">
              <li
                v-for="(atributo, index) in atributos"
                :key="index"
                class="list-group-item"
              >
                {{ atributo.nombre }}
                <div class="d-flex flex-row-reverse">
                  <v-btn
                    class="ml-1"
                    elevation="4"
                    icon
                    small
                    data-bs-toggle="modal"
                    data-bs-target="#agregar_editar_items"
                    @click="SetEditAtributoItems(atributo)"
                  >
                    <font-awesome-icon icon="eye" />
                  </v-btn>

                  <v-btn
                    class="ml-1"
                    elevation="4"
                    color="green"
                    icon
                    small
                    data-bs-toggle="modal"
                    data-bs-target="#modal_agregar_item"
                    @click="SetEditAtributoItems(atributo)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>

                  <v-btn
                    elevation="4"
                    icon
                    color="red"
                    small
                    @click="DeteleAtributo(atributo)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="row">
            <div class="col-8 col-sm-8">
              <h6>Variaciones</h6>
            </div>
            <div class="col-4 col-sm-4">
              <v-btn
                :disabled="atributos.length == 0"
                elevation="4"
                icon
                data-bs-toggle="modal"
                data-bs-target="#modal_create_variacion"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div
            class="card mb-2 mt-2"
            style="width: auto"
            v-for="(variacion, index) in variaciones"
            :key="index"
          >
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-4 col-sm-4">
                    <div
                      class="d-inline-block p-2 mr-2 bg-success text-white mb-1"
                      v-for="(itm, index_itm) in variacion.item"
                      :key="index_itm"
                    >
                      {{ itm.item }}
                    </div>
                  </div>
                  <div class="col-8 col-sm-8">
                    <p>
                      <span style="color: black">STOCK:</span>
                      {{ variacion.stock }}
                      <v-btn
                        class="boton_botonera"
                        color="yellow"
                        small
                        elevation="2"
                        icon
                        outlined
                        ><font-awesome-icon icon="pencil-alt" />
                      </v-btn>
                    </p>
                    <p>
                      <span style="color: black">PRECIO $:</span>
                      {{ variacion.price }}
                      <v-btn
                        class="boton_botonera"
                        color="yellow"
                        small
                        elevation="2"
                        icon
                        outlined
                        ><font-awesome-icon icon="pencil-alt" />
                      </v-btn>
                    </p>
                  </div>
                  <div class="botonera d-flex justify-content-end">
                    <v-btn
                      elevation="4"
                      icon
                      color="red"
                      small
                      @click="DeleteVariacion(variacion)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALES -->

    <!-- MODAL CREAR ATRIBUTO -->

    <div
      class="modal fade"
      id="modal_crear_atributo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Crear un atributo
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Atributo nuevo</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Atributo nuevo"
                  v-model="createAtributo.nombre"
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
              type="button"
              class="btn btn-success"
              @click="CreateAtributo()"
              data-bs-dismiss="modal"
            >
              Crear atributo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR ATRIBUTO-->

    <!-- MODAL VER ITEMS -->
    <div
      class="modal fade"
      id="agregar_editar_items"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ editAtributoItems.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>Items</h6>
            <div class="row">
              <div class="col-12 col-sm-12">
                <ul class="list-group">
                  <li
                    v-for="(item, index) in editAtributoItems.atributo_item"
                    :key="index"
                    class="list-group-item"
                  >
                    {{ item.item }}
                    <!--                     <div class="d-flex flex-row-reverse">
                      <v-btn
                        elevation="4"
                        icon
                        color="red"
                        small
                        @click="DeteleAtributo(atributo)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div> -->
                  </li>
                </ul>
              </div>
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
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL VER ITEMS -->

    <!-- MODAL AGREGAR ITEM AL ATRIBUTO -->

    <div
      class="modal fade"
      id="modal_agregar_item"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ editAtributoItems.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>Agregar item</h6>
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Item nuevo</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Item nuevo"
                  v-model="createItemAtributo.item"
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
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-success"
              @click="CreateItemAtributo()"
            >
              Crear item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR ITEM AL ATRIBUTO -->

    <!-- MODAL CREAR VARIACION -->

    <div
      class="modal fade"
      id="modal_create_variacion"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear Varacion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="botones_items">
              <div
                class="mb-3"
                v-for="(atributo, index) in atributos"
                :key="index"
              >
                <label for="exampleFormControlInput1" class="form-label"
                  >{{ atributo.nombre }}
                </label>
                <div class="botones">
                  <button
                    class="btn btn-outline-secondary mr-1"
                    v-for="(itm, index_itm) in atributo.atributo_item"
                    :key="index_itm"
                    @click="SelectVariation(itm)"
                  >
                    {{ itm.item }}
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-12"><h6>Selecciono:</h6></div>
              <div class="col-12 col-sm-12">
                <div
                  class="d-inline p-2 mr-2 bg-success text-white"
                  v-for="(itm, index_itm) in itemsSelected_nombres"
                  :key="index_itm"
                >
                  {{ itm }}
                </div>
              </div>
              <div
                class="col-12 col-sm-12"
                v-if="itemsSelected_id.length == 0"
                style="color: red"
              >
                Seleccione los items
              </div>
              <div class="col-12 col-sm-12">
                <form>
                  <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input
                      type="number"
                      class="form-control"
                      id="stock"
                      min="0"
                      v-model="createVariacion.stock"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="price" class="form-label">Precio $</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      min="0"
                      v-model="createVariacion.price"
                    />
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
              @click="clear()"
            >
              Cerrar
            </button>
            <button
              @click="BuscarVaracion()"
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Crear variacion
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR VARIACION -->

    <!-- MODALES -->
  </div>
</template>

<script>
import axios from "axios";
import admin_menu from "../../components/admin/admin_menu.vue";

export default {
  name: "admin_variations",
  props: ["product"],
  components: {
    admin_menu,
  },

  data() {
    return {
      selected: "",
      atributos: [],
      editAtributoItems: [],
      createItemAtributo: {
        item: "",
      },
      createAtributo: {
        nombre: "",
      },
      variaciones: [],
      variationValuesforChild: [],
      itemsSelected_id: [],
      itemsSelected_nombres: [],
      createVariacion: {
        product: this.product.id,
        stock: "",
        price: "",
      },
    };
  },

  mounted() {
    this.GetAtributosConItems();
    this.GetVariacionOffProduct();
  },
  methods: {
    BuscarVaracion() {
      /* Buscar si ya existe */
      let data = {
        product: this.product.id,
        item: this.itemsSelected_id,
      };
      if (this.itemsSelected_id.length == 0) {
        this.$swal.fire({
          title: "Atencion",
          icon: "info",
          text: "Debe seleccionar los items para crear la variacion!",
        });
      }
      let variSelect = 0;

      axios
        .post(this.server + "/api/v1.0/admin/product/variations/search/", data)
        .then((response) => {
          console.log(variSelect);
          console.log("estamos por aca");
          console.log(response.data);
          let variacion = response.data;
          if (variacion.length > 0) {
            variacion.forEach((vari) => {
              if (vari.repeticiones === this.atributos.length) {
                console.log(vari.pk);
                variSelect = vari.pk;
                console.log("variSelect");
                console.log(variSelect);
                this.$swal.fire({
                  title: "Atencion",
                  icon: "info",
                  text: "Esta variacion ya existe!",
                });
              }
            });
          }
          if (variSelect == 0) {
            console.log("vale 0");
            console.log(variSelect);
            this.CreateVariacion();
          } else {
            console.log("distinto de 0");
            console.log(variSelect);
          }
        });
    },

    CreateVariacion() {
      console.log("create Varaicon");
      /* Crear variacion */
      this.createVariacion.item = this.itemsSelected_id;
      console.log(this.createVariacion);
      axios
        .post(this.server + "/variations/variaciones/", this.createVariacion, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Variacion Creada!",
            "Se ha creado una nueva variacion para este producto.",
            "success"
          );
          this.clear();
          this.GetVariacionOffProduct();
          this.createVariacion = {
            product: this.product.id,
            stock: "",
            price: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    DeleteVariacion(variacion) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar esta variacion.",
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
                this.server +
                  "/api/v1.0/admin/variation/delete/" +
                  variacion.id,
                {
                  headers: {
                    Authorization: localStorage.getItem("access"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                this.$swal.fire(
                  "Variacion eliminada!",
                  "La variacion ha sido eliminada correctamente.",
                  "success"
                );
                this.GetVariacionOffProduct();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    clear() {
      this.itemsSelected_id = [];
      this.itemsSelected_nombres = [];
    },
    SelectVariation(value) {
      if (this.variationValuesforChild.length == this.atributos.length) {
        this.variationValuesforChild.splice(
          0,
          this.variationValuesforChild.length
        );
        this.itemsSelected_id.splice(0, this.itemsSelected_id.length);
        this.itemsSelected_nombres.splice(0, this.itemsSelected_nombres.length);
      }

      if (this.variationValuesforChild.some((elem) => elem.id === value.id)) {
        var index = this.variationValuesforChild.findIndex(
          (item) => item.id === value.id
        );
        this.variationValuesforChild.splice(index, 1, value);
      } else {
        this.variationValuesforChild.push(value);
      }

      console.log("this.varationValuesforChild");
      console.log(this.variationValuesforChild);

      let items = [];

      let items_nombre = [];

      this.variationValuesforChild.forEach((item) => {
        items.push(item.id);
        items_nombre.push(item.item);
      });
      this.itemsSelected_id = items;
      this.itemsSelected_nombres = items_nombre;

      console.log("====items=====");
      console.log(items);
      console.log("====items=====");
      console.log("=====itemsSelected_id====");
      console.log(this.itemsSelected_id);
      console.log("=====items_nombre====");
      console.log(items_nombre);
    },

    GetVariacionOffProduct() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/variation/view/?kword=" +
            this.product.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.variaciones = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CreateAtributo() {
      const data = new FormData();
      data.append("product", this.product.id);
      data.append("nombre", this.createAtributo.nombre);

      axios
        .post(this.server + "/api/v1.0/admin/product/atributo/create", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Atributo Creado!",
            "Se ha creado un nuevo atributo para este producto.",
            "success"
          );
          (this.createAtributo.nombre = ""), this.GetAtributosConItems();
        });
    },

    SetEditAtributoItems(atributo) {
      this.editAtributoItems = atributo;
      console.log(this.editAtributoItems);
    },

    DeteleAtributo(atributo) {
      this.$swal
        .fire({
          title: "Esta seguro?",
          text: "Esta a punto de eliminar este atributo de este producto.",
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
                  "/api/v1.0/admin/product/atributo/delete/" +
                  atributo.id +
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
                  "El atributo ha sido eliminado correctamente.",
                  "success"
                );
                this.GetAtributosConItems();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    CreateItemAtributo() {
      const data = new FormData();
      data.append("atributo", this.editAtributoItems.id);
      data.append("item", this.createItemAtributo.item);

      axios
        .post(
          this.server + "/api/v1.0/admin/product/atributo/item/create",
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
            "Item Creado!",
            "Se ha creado un nuevo item al atributo.",
            "success"
          );
          this.GetAtributosConItems();
          this.createItemAtributo.item = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetAtributosConItems() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/product/atributos/?kword=" +
            this.product.id
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
  },
};
</script>

<style>
</style>