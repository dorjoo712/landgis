import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: __dirname,
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "map",
      component: () => import("../pages/Map.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../layouts/login.vue")
    },
    {
      path: "/old",
      name: "map",
      component: () => import("../pages/MapOld.vue")
    },
    {
      path: '/', component: () => import('../layouts/default'),
      children: [
        { path: 'cart', name: 'index', component: () => import('../pages/cart/index.vue') },
        { path: 'cart/payment', name: 'payment', component: () => import('../pages/cart/payment.vue') },
        { path: 'cart/checkout', name: 'checkout', component: () => import('../pages/cart/checkout.vue') },
        { path: 'cart/success', name: 'success', component: () => import('../pages/cart/success.vue') }
      ]
    }
  ]
});
