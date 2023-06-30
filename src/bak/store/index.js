import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./modules/cart";
import tienda from "./modules/tienda";
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    cart,
    tienda,
  }
})
