<template>
  <div class="admin_services mt-12 mb-12">
    <admin_menu></admin_menu>
    <div class="container mb-12">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="ordenes_recientes">
            <font-awesome-icon icon="calendar-plus" />
            <span class="ml-2"> Servicios que onda</span>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-end">
        <div class="col-3 col-sm-3">
          <span style="color: gray; font-size: 12px">Crear servicio</span>
        </div>
        <div class="col-2 col-sm-2 mr-6">
          <v-badge bordered overlap icon="mdi-plus" color="#7CB342">
            <v-btn
              elevation="4"
              icon
              data-bs-toggle="modal"
              data-bs-target="#createServiceModal"
            >
              <font-awesome-icon icon="calendar-plus" />
            </v-btn>
          </v-badge>
        </div>
      </div>
      <v-container><v-divider></v-divider></v-container>

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
                  <div class="contenido"></div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row">
                <div class="col-6 col-sm-6 d-flex justify-content-center">
                  <v-switch
                    v-model="service.public"
                    label="Publicar"
                  ></v-switch>
                </div>
                <div class="col-6 col-sm-6 d-flex justify-content-end">
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
    </div>

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
            <form>
              <div class="mb-1">
                <label for="image" class="form-label">Selecionar imagen</label>
                <input
                  type="file"
                  class="form-control"
                  name="image"
                  id="image"
                  ref="imageCreate"
                  @change="onFileSelected"
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
                  />
                </div>
              </div>
              <div class="mb-1">
                <label for="name" class="form-label">Nombre del servicio</label>
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
                  :class="{ 'is-invalid': $v.createService_description.$error }"
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
              <v-container><v-divider></v-divider></v-container>

              <div class="mb-1">
                <label for="name" class="form-label"
                  >Selecciones los dias: hola</label
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
                <label for="name" class="form-label">Duracion del turno:</label>
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
                </div>
              </div>
            </form>
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
              @click="PrepararObjectToSave()"
              data-bs-dismiss="modal"
            >
              Crear Servicio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VSwatches from "vue-swatches";
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
import "vue-swatches/dist/vue-swatches.css";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "admin_services",
  components: {
    admin_menu,
    VSwatches,
  },
  data() {
    return {
      services: [],
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
      createService: {
        image: null,
        title: "",
        description: "",
        price: 0,
        public: false,
        start_time: 9,
        end_time: 20,
        interval: 15,
        color: "#000000",
        days: [],
      },
      previewNew: null,
    };
  },

  validations: {
    createService_title: { required, minLength: minLength(4) },
    createService_description: { required, minLength: minLength(8) },
    createService_image: { required },
  },

  created() {
    this.Guard();
    this.GetServices();
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
      } 
    },

    CreateService() {
      let data = new FormData();
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

      axios
        .post(this.server + "/api/v1.0/admin/services/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$swal.fire(
            "Servicio Creado!",
            "Se ha creado un nuevo servicio!.",
            "success"
          );
          this.GetServices();
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
          text: "Esta a punto de eliminar este service.",
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
                this.GetServices();
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

    GetServices() {
      axios
        .get(
          this.server +
            "/api/v1.0/admin/services/list/?tienda=" +
            this.tienda.id
        )
        .then((response) => {
          console.log(response.data.results);
          this.services = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.ordenes_recientes {
  border-bottom: solid 1px;
}
</style>