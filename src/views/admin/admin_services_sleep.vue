<template>
  <div class="admin_services_sleep mb-8">
    <admin_menu />
    <div class="container">
      <div class="row">
        <h6>Horarios de descanso.</h6>
      </div>
      <div class="row">
        <p>
          <span>Servicio: </span> <span>{{ service.title }}</span>
        </p>
      </div>
      <div class="row">
        <v-switch
          v-model="service.has_break"
          label="Activar Descansos"
        ></v-switch>
      </div>
      <div class="row" v-if="service.has_break == true">
        <div class="mb-1">
          <label for="name" class="form-label"
            >Selecciones los horarios de descanso:</label
          >
          <v-combobox
            v-model="time_selected"
            :items="loop_time"
            multiple
            outlined
            dense
          ></v-combobox>
        </div>
      </div>
      <div class="row d-flex justify-content-end">
        <div class="col-6 col-sm-6">
          <button
            type="button"
            class="btn btn-success"
            @click="ServiceBreakUpdate()"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import admin_menu from "../../components/admin/admin_menu.vue";
export default {
  name: "admin_services_sleep",
  components: {
    admin_menu,
  },
  props: ["service"],
  data() {
    return {
      loop_time: [],
      time_selected: [],
    };
  },

  created() {
    this.Guard();
    console.log(this.service);
    this.LoopTimes();
    this.time_selected = this.service.times_break;
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

    ServiceBreakUpdate() {
      let data = {
        has_break: this.service.has_break,
        times_break: this.time_selected,
      };
      console.log(data);
      axios
        .put(
          this.server +
            "/api/v1.0/admin/services/break/update/" +
            this.service.id,
          data
        )
        .then((response) => {
          console.log(response);
          this.$swal.fire(
            "Cambios Actualizados!",
            "Se han actualizado los cambios correctamente!",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    LoopTimes() {
      var x = this.service.interval; //minutes interval
      var start_time = this.service.start_time * 60;
      var tt = start_time; // start time //Aca tengo que dividirlo por 60 para saber la hora de arranque

      var end_time = this.service.end_time;

      //loop to increment the time and push results in array
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = tt % 60; // getting minutes of the hour in 0-55 format
        this.loop_time[i] = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
        if (hh === end_time) {
          break;
        }
        tt = tt + x;
      }
      console.log(this.loop_time);
    },
  },
};
</script>

<style>
</style>