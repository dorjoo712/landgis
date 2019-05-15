<template>
  <v-menu
    transition="slide-y-transition"
    left
    bottom
    nudge-top="-30"
    :allow-overflow="true"
    class="mycart"
    content-class="cart-popout elevation-18"
    v-model="isCart"
    :close-on-content-click="false"
    :max-width="450"
  >
    <v-badge slot="activator" color="red darken-3" right>
      <span slot="badge" v-if="countProduct >= 0">{{ countProduct }}</span>
      <v-btn fab small color="white" class="ma-0">
        <v-icon dark color="green darken-2">shopping_cart</v-icon>
      </v-btn>
    </v-badge>

    <v-card v-if="products.length > 0">
      <v-list>
        <template v-for="(product, index) in products">
          <v-list-tile :key="index">
            <v-list-tile-action class="justify-center small-action">
              <v-btn @click="removeCart(product)" small icon><v-icon color="red" small>delete</v-icon></v-btn>
            </v-list-tile-action>
            <v-list-tile-content style="flex: 1 0 150px;">
              <v-list-tile-title class="font-weight-medium"><span>{{ product.pid }} - </span>{{ product.point_name }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="product.info">
                <span>Хувийн хэрэг</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-right">{{ product.price | currency('', 0) }} ₮</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right" v-if="product.info">
                <span>{{ product.info_price | currency('', 0) }} ₮</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider />
      <v-layout wrap px-3 py-2 align-center>
        <v-flex xs12 text-xs-right mb-3>
          <span class="grey--text text--darken-1 font-weight-medium">Нийт дүн:</span>
          <span class="red--text title text--darken-1 font-weight-medium">{{ totalPayment | currency('', 0) }} ₮</span>
        </v-flex>
        <v-flex xs12>
          <v-btn round block large color="green darken-2" dark @click="gotoCart">Худалдан авах <v-icon right>arrow_forward</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card v-else color="white">
      <v-card-text>
        <v-alert :value="true" type="info" class="my-3">Таны сагс хоосон байна.</v-alert>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    isCart: {
      get() {
        return this.$store.state.isCart
      },
      set(val) {
        this.$store.dispatch('setCart', val)
      }
    },
    countProduct() {
      return this.$store.state.cartProducts.length
    },
    products() {
      return this.$store.state.cartProducts
    },
    isDisabled() {
      return this.countProduct == 0 ? true : false
    },
    totalPayment() {
      return this.products.reduce((current, next) => current + (this.changePrice(next)), 0);
    }
  },
  methods: {
    removeCart(product) {
      this.$store.dispatch('removeProduct', product)
    },
    gotoCart() {
      this.$router.push('/cart')
    },
    changePrice(item) {
      var price = item.price

      if (item.info) price = price + item.info_price

      return price
    }
  }
}
</script>

<style>
.mycart .v-badge__badge{
  top: -6px;
  right: -6px;
}
.small-action{
  min-width: 40px;
}
.cart-popout{
  margin-right: 14px;
}
.elevation-18 {
  -webkit-box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)!important;
  box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)!important;
}
.mycart .v-btn__content .v-icon--left, .v-btn__content .v-icon--right{
  font-size: 18px;
}
.mycart .v-list__tile__sub-title{
  font-size: 13px;
}
</style>
