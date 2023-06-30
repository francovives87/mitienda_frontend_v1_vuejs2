import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import productDetail from '../views/tienda/productDetail.vue'
import tienda_search from '../views/tienda/tienda_search.vue'
import tienda_categories_products from '../views/tienda/tienda_categories_products.vue'
import tienda_category_view from '../views/tienda/tienda_category_view.vue'
import tienda_cart from '../views/tienda/tienda_cart.vue'
import tienda_entry_view from '../views/tienda/tienda_entry_view.vue';
import home_user from '../views/user/home_user.vue';
import user_order_detail from '../views/user/user_order_detail.vue';
import user_order_detail_anonymous from '../views/user/user_order_detail_anonymous.vue';
import tienda_checkout from '../views/tienda/tienda_checkout.vue';
import tienda_datos_ventas from '../views/tienda/tienda_datos_ventas.vue';
import admin_home from '../views/admin/admin_home.vue';
import admin_admin from '../views/admin/admin_admin.vue';
import admin_variations from '../views/admin/admin_variations.vue';
import tienda_not_found from '../views/TiendaNotFound.vue';
import admin_perzonalizar from '../views/admin/admin_personalizar.vue';
import admin_tienda from '../views/admin/admin_tienda.vue';
import admin_diaspositivas from '../views/admin/admin_diaspositivas.vue';
import admin_blog from '../views/admin/admin_blog.vue';
import admin_product_edit_images from '../views/admin/admin_product_edit_images.vue';
import admin_entry_images from '../views/admin/admin_entry_images.vue';
import admin_order_detail from '../views/admin/admin_order_detail.vue';
import admin_orders from '../views/admin/admin_orders.vue';

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
    path: '/error',
    name: 'error404',
    component: tienda_not_found,
    props: true
  },
  {
    path: '/accounts/login',
    name: 'main_login',
    component: Login,
    props: true
  },


  /* MAIN */


  {
    path: '/:name',
    name: 'TiendaHome',
    component: Home,
    props: true
  },
  {
    path: '/:name/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  /* ##### TIENDA ###### */
  {
    path: '/:name/producto/:product',
    name: 'ProductDetail',
    component: productDetail,
    props: true
  },
  /*   {
      path: '/:name/products/variacion/detail/:product',
      name: 'ProductsDetailWithVariacion',
      component: productDetailWithVariacion,
      props: true
    }, */
  /*product detail con variaciones  */


  /*product detail con variaciones  */
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




  /* CATEGORIAS */
  {
    path: '/:name/categories',
    name: 'Categories',
    component: tienda_categories_products,
    props: true
  },
  {
    path: '/:name/categories/view/:category_id',
    name: 'CategoriesView',
    component: tienda_category_view,
    props: true
  },
  /* BLOG */
  {
    path: '/:name/blog/:entry',
    name: 'EntryView',
    component: tienda_entry_view,
    props: true
  },

  /* User home */
  {
    path: '/:name/user',
    name: 'UserHome',
    component: home_user,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/user/order/detail/:order',
    name: 'UserOrderDetail',
    component: user_order_detail,
    props: true,
    meta: { auth: true }
  },
  {
    path: '/:name/anon/order/detail/:order',
    name: 'UserOrderDetailAnonymous',
    component: user_order_detail_anonymous,
    props: true,
  },



  
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









  /* no seria categorias, seria el navegable por cel */
  {
    path: '/:name/admin/categories',
    name: 'AdminHomeCategories',
    component: admin_admin,
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
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})



export default router
