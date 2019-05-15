import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    isCart: false,
    transaction: {}
  },
  getters: {
    getProductsInCart: state => state.cartProducts,
    getTransaction: state => state.transaction
  },
  actions: {
    addProduct: (context, product) => {
      context.commit('ADD_PRODUCT', product)
      context.commit('IS_CART', true)
    },
    setCart: (context, payload) => {
      context.commit('IS_CART', payload)
    },
    setTransaction: (context, payload) => {
      context.commit('SET_TRANSACTION', payload)
    },
    removeProduct: (context, index) => {
      context.commit('REMOVE_PRODUCT', index)
    },
    setProducts: (context, products) => {
      context.commit('SET_CART_PRODUCTS', products)
    }
  },
  mutations: {
    INCREMENT_QUANTITY (state, id) {
      var idx = state.cartProducts.map(p => p.id).indexOf(id)
      state.cartProducts[idx].quantity++
  
      localStorage.setItem('giz-cart', JSON.stringify(state.cartProducts))
    },
    DECREMENT_QUANTITY (state, id) {
      var idx = state.cartProducts.map(p => p.id).indexOf(id)
      state.cartProducts[idx].quantity--
  
      localStorage.setItem('giz-cart', JSON.stringify(state.cartProducts))
    },
    ADD_PRODUCT: (state, product) => {
      product.price = parseFloat(product.price)
      product.info_price = parseFloat(product.info_price)
  
      let idx = state.cartProducts.map(p => p.pid).indexOf(product.pid)
  
      if (idx === -1) {
        state.cartProducts.push(product)
        localStorage.setItem('giz-cart', JSON.stringify(state.cartProducts))
      }
    },
    REMOVE_PRODUCT: (state, product) => {
      const products = JSON.parse(localStorage.getItem("giz-cart"));
      for (let i = 0; i < products.length; i++) {
        if (products[i].pid === product.pid) {
          products.splice(i, 1);
        }
      }
      localStorage.setItem("giz-cart", JSON.stringify(products));
      state.cartProducts = products
    },
    IS_CART: (state, payload) => {
      state.isCart = payload
    },
    SET_CART_PRODUCTS: (state, products) => {
      state.cartProducts = []
      state.cartProducts = products
  
      localStorage.setItem("giz-cart", JSON.stringify(products));
    },
    SET_TRANSACTION: (state, payload) => {
      state.transaction = payload
  
      localStorage.setItem('giz-transaction', JSON.stringify(state.transaction))
    }
  }
});
