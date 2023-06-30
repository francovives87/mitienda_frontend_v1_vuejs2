import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.config.productionTip = false


Vue.prototype.server = 'https://minegocio.me'


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(vGallery)
