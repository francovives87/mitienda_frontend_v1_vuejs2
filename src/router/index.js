import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import main_register from '../views/main/main_register.vue';
import productDetail from '../views/tienda/productDetail.vue'
import tienda_search from '../views/tienda/tienda_search.vue'
import tienda_category_view from '../views/tienda/tienda_category_view.vue'
import tienda_cart from '../views/tienda/tienda_cart.vue'
import tienda_entry_view from '../views/tienda/tienda_entry_view.vue';
import tienda_checkout from '../views/tienda/tienda_checkout.vue';
import tienda_datos_ventas from '../views/tienda/tienda_datos_ventas.vue';
import tienda_category_service_view from '../views/tienda/tienda_category_service_view.vue'
import tienda_blog_section from '../views/tienda/tienda_blog_section.vue';
import admin_home from '../views/admin/admin_home.vue';
import admin_admin from '../views/admin/admin_admin.vue';
import admin_admin_service from '../views/admin/admin_admin_service.vue';
import admin_variations from '../views/admin/admin_variations.vue';
import tienda_not_found from '../views/TiendaNotFound.vue';
import admin_perzonalizar from '../views/admin/admin_personalizar.vue';
import admin_tienda from '../views/admin/admin_tienda.vue';
import admin_diaspositivas from '../views/admin/admin_diaspositivas.vue';
import admin_blog from '../views/admin/admin_blog.vue';
import admin_product_edit_images from '../views/admin/admin_product_edit_images.vue';
import admin_service_edit_images from '../views/admin/admin_service_edit_images.vue';
import admin_entry_images from '../views/admin/admin_entry_images.vue';
import admin_order_detail from '../views/admin/admin_order_detail.vue';
import admin_orders from '../views/admin/admin_orders.vue';
import tienda_service_detail from '../views/tienda/tienda_service_detail.vue';
import admin_calendar from '../views/admin/admin_calendar.vue';
import admin_services_sleep from '../views/admin/admin_services_sleep';
import admin_qrcode from '../views/admin/admin_qrcode.vue';
import admin_geo from '../views/admin/admin_geo.vue';
import admin_product_statistics from '../views/admin/admin_product_statistics.vue';
import tienda_view_map from '../views/tienda/tienda_view_map.vue';
import main_search_tienda from '../views/main/main_search_tienda.vue';
/* TIENDA USER */
import tienda_user_home from '../views/tienda/user/tienda_user_home.vue';
import tienda_user_all_orders from '../views/tienda/user/tienda_user_all_orders.vue';
import tienda_user_all_bookins from '../views/tienda/user/tienda_user_all_bookins.vue';
import tienda_user_personal_dates from '../views/tienda/user/tienda_user_personal_dates.vue';
import tienda_user_order_detail from '../views/tienda/user/tienda_user_order_detail.vue';
import tienda_user_order_detail_anonymous from '../views/tienda/user/tienda_user_order_detail_anonymous.vue';
import tienda_user_login from '../views/tienda/user/tienda_user_login.vue';
import tienda_user_register from '../views/tienda/user/tienda_user_register.vue';
import tienda_explorer from '../views/tienda/tienda_explorer.vue';
import tienda_explorer_desktop from '../components/tienda/tienda_explorer_desktop.vue';
import tienda_user_booking_detail from '../views/tienda/user/tienda_user_booking_detail.vue';
import tienda_anonimo_booking_detail from '../views/tienda/user/tienda_anonimo_booking_detail.vue';
/* MAIN */
import main_account from '../views/main/user/main_account.vue';
import main_user_all_orders from '../views/main/user/main_user_all_orders.vue';
import main_user_order_detail from '../views/main/user/main_user_order_detail.vue';
import main_user_all_bookins from '../views/main/user/main_user_all_bookins.vue';
import main_user_personal_dates from '../views/main/user/main_user_personal_dates.vue';
import main_login from '../views/main/main_login.vue';
import main_create_tienda from '../views/main/main_create_tienda.vue';
import main_geolocation_user from '../views/main/main_geolocation_user.vue';
import main_user_verify from '../views/main/user/main_user_verify.vue';



Vue.use(VueRouter)

const routes = [
  /* MAIN */
  {
    path: '/',
    name: 'Main',
    component: Main,
    props: true
  },
  {
    path: '/geolocation',
    name: 'main_geolocation_user',
    component: main_geolocation_user,
    props: true
  },



  {
    path: '/error',
    name: 'error404',
    component: tienda_not_found,
    props: true
  },
  /* MAIN USER */
  {
    path: '/accounts/login',
    name: 'main_login',
    component: main_login,
    props: true
  },
  {
    path: '/main/account/login',
    name: 'MainLogin',
    component: main_login,
    props: true
  },
  {
    path: '/accounts/login',
    name: 'main_user_verify',
    component: main_user_verify,
    props: true
  },
  {
    path: '/main/account/',
    name: 'main_account',
    component: main_account,
    props: true
  },
  {
    path: '/main/account/orders/all/',
    name: 'main_user_all_orders',
    component: main_user_all_orders,
    props: true
  },
  {
    path: '/main/account/orders/detail/',
    name: 'main_user_order_detail',
    component: main_user_order_detail,
    props: true
  },
  {
    path: '/main/account/bookings/all/',
    name: 'main_user_all_bookins',
    component: main_user_all_bookins,
    props: true
  },
  {
    path: '/main/account/user/dates/',
    name: 'main_user_personal_dates',
    component: main_user_personal_dates,
    props: true
  },
  {
    path: '/main/account/register',
    name: 'MainRegister',
    component: main_register,
    props: true
  },

  {
    path: '/account/create/store',
    name: 'main_create_tienda',
    component: main_create_tienda,
    props: true
  },
  /* MAIN USER */
  {
    path: '/search/store/',
    name: 'main_search_tienda',
    component: main_search_tienda,
    props: true
  },
  /* MAIN */


  /* ##### TIENDA ###### */
  {
    path: '/:name',
    name: 'TiendaHome',
    component: Home,
    props: true
  },
  {
    path: '/:name/producto/:product',
    name: 'ProductDetail',
    component: productDetail,
    props: true
  },
  {
    path: '/:name/search',
    name: 'tiendaSearch',
    component: tienda_search,
    props: true
  },
  {
    path: '/:name/cart',
    name: 'TiendaCart',
    component: tienda_cart,
    props: true
  },
  {
    path: '/:name/store',
    name: 'TiendaStore',
    component: tienda_explorer_desktop,
    props: true
  },  
  {
    path: '/:name/checkout',
    name: 'TiendaCheckout',
    component: tienda_checkout,
    props: true,
  },

  {
    path: '/:name/information',
    name: 'TiendaDatosVentas',
    component: tienda_datos_ventas,
    props: true,
  },
  {
    path: '/:name/servicio/:service',
    name: 'TiendaServicios',
    component: tienda_service_detail,
    props: true,
  },

  {
    path: '/:name/map/',
    name: 'TiendViewMap',
    component: tienda_view_map,
    props: true,
  },


  /* CATEGORIAS */
  {
    path: '/:name/explore',
    name: 'Explore',
    component: tienda_explorer,
    props: true
  },
  {
    path: '/:name/categories/product/view/:category_id',
    name: 'CategoriesView',
    component: tienda_category_view,
    props: true
  },
  {
    path: '/:name/categories/service/view/:category_id',
    name: 'CategoriesServicesView',
    component: tienda_category_service_view,
    props: true
  },



  
  /* BLOG */
  {
    path: '/:name/blog/:entry',
    name: 'EntryView',
    component: tienda_entry_view,
    props: true
  },
  {
    path: '/:name/blog/',
    name: 'tienda_blog_section',
    component: tienda_blog_section,
    props: true
  },


  

  /* TIENDA USER */

  {
    path: '/:name/login',
    name: 'Login',
    component: tienda_user_login
  },
  {
    path: '/:name/register',
    name: 'tienda_user_register',
    component: tienda_user_register
  },


  {
    path: '/:name/user/home/',
    name: 'tienda_home_user',
    component: tienda_user_home,
    props: true,

  },

  {
    path: '/:name/user/order/detail/:order',
    name: 'tienda_user_order_detail',
    component: tienda_user_order_detail,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/user/booking/detail/:order',
    name: 'tienda_user_booking_detail',
    component: tienda_user_booking_detail,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/anon/booking/detail/:order',
    name: 'tienda_anonimo_booking_detail',
    component: tienda_anonimo_booking_detail,
    props: true,
  },


  
  {
    path: '/:name/anon/order/detail/:order',
    name: 'tienda_user_order_detail_anonymous',
    component: tienda_user_order_detail_anonymous,
    props: true,
  },

  {
    path: '/:name/user/orders/all/',
    name: 'tienda_user_all_orders',
    component: tienda_user_all_orders,
    props: true,
  },
  {
    path: '/:name/user/bookings/all/',
    name: 'tienda_user_all_bookins',
    component: tienda_user_all_bookins,
    props: true,
  },
  {
    path: '/:name/user/dates/',
    name: 'tienda_user_personal_dates',
    component: tienda_user_personal_dates,
    props: true,
  },

  /* TIENDA USER */


  /* ADMIN HOME */
  {
    path: '/:name/admin',
    name: 'AdminHome',
    component: admin_home,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/personalize',
    name: 'AdminPerzonalizar',
    component: admin_perzonalizar,
    props: true,
    meta: { auth: true }
  },

  {
    path: '/:name/admin/tienda',
    name: 'AdminTienda',
    component: admin_tienda,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/diaspositivas',
    name: 'AdminDisapositivas',
    component: admin_diaspositivas,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/blog',
    name: 'AdminBlog',
    component: admin_blog,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/product/images',
    name: 'AdminProductImages',
    component: admin_product_edit_images,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/service/images',
    name: 'AdminServiceImages',
    component: admin_service_edit_images,
    props: true,
    meta: { auth: true }
  },


  

  {
    path: '/:name/admin/entry/images',
    name: 'AdminEntryEditImages',
    component: admin_entry_images,
    props: true,
    meta: { auth: true }
  },

  {
    path: '/:name/admin/orders/:order',
    name: 'AdminOrderDetail',
    component: admin_order_detail,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/orders/',
    name: 'AdminOrders',
    component: admin_orders,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/calendar/',
    name: 'AdminCalendar',
    component: admin_calendar,
    props: true,
    meta: { auth: true }
  },

  {
    path: '/:name/admin/services/break/',
    name: 'AdminServicesBreak',
    component: admin_services_sleep,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/admin/qrcode/',
    name: 'AdminQRCode',
    component: admin_qrcode,
    props: true,
    meta: { auth: true }
  },


  {
    path: '/:name/admin/geo/',
    name: 'AdminGeo',
    component: admin_geo,
    props: true,
    meta: { auth: true }
  },

  {
    path: '/:name/admin/product/statistics/',
    name: 'AdminProductStatistics',
    component: admin_product_statistics,
    props: true,
    meta: { auth: true }
  },

  /* no seria categorias, seria el navegable por cel */
  {
    path: '/:name/admin/admin',
    name: 'AdminAdmin',
    component: admin_admin,
    props: true,
    meta: { auth: true }
  },

  {
    path: '/:name/admin/services',
    name: 'AdminServices',
    component: admin_admin_service,
    props: true,
    meta: { auth: true }
  },



  
  
  /* variations */
  {
    path: '/:name/admin/variations',
    name: 'AdminHomeVariations',
    component: admin_variations,
    props: true,
    meta: { auth: true }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})


/* Guardian variable guard 'auth' */
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    if (!localStorage.getItem('access')) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})



export default router
