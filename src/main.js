import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueNativeNotification from 'vue-native-notification'



/* FontAwesomeIcons */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import vGallery from 'v-gallery'


/* FontAwesomeIcons */
library.add(
  fas)

Vue.config.productionTip = false

                      
                      /* http://127.0.0.1:8000 */
                      /* https://system.mitienda.app */
const local = 'http://127.0.0.1:8000'
const prod = 'https://system.mitienda.app'

Vue.prototype.server = local
                                                
                                                /* wss://system.mitienda.app/ws/test/ */
                                                /* ws://127.0.0.1:8000/ws/test/  */

const wsLocal = 'ws://127.0.0.1:8000/ws/test/'
const wsProd = 'wss://system.mitienda.app/ws/test/'

Vue.prototype.WebSocktConnection = new WebSocket(wsLocal);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(vGallery)


Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
