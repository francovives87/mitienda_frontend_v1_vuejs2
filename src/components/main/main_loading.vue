<template>
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container p-0">
          <div class="modal-body p-0">
            <div class="row p-0">
              <div
                class="col-12 col-sm-12 col-lg-12 d-flex justify-content-center"
              >
                <img
                  :src="server + '/media_root/defaults/logo_generico.png'"
                  alt=""
                  style="width: 45px; heigth: 45px"
                />
              </div>
              <div
                class="col-12 col-sm-12 col-lg-12 d-flex justify-content-center"
              >
                <v-progress-circular
                  indeterminate
                  color="purple"
                ></v-progress-circular>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main_loading",
  components: {},
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 150px !important;
  height: 150px !important;
  margin: 0px auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #fff;
  border-radius: 3px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>