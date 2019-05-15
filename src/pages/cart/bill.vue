<template>
  <div>
    <template v-for="(product, index) in products">
      <v-layout wrap class="pa-2 align-center" :key="product.id">
        <v-flex xs12 sm6 class="py-0">
          <span>{{ product.pid }} - {{ product.point_name }}</span>
        </v-flex>
        <v-flex xs12 sm6 class="py-0 text-xs-right">
          <span>{{ product.price | currency('', 0) }} ₮</span>
        </v-flex>
        <v-flex xs12 sm6 v-if="product.info">
          <span class="ml-3">Хувийн хэрэг</span>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-right" v-if="product.info">
          <span>{{ product.info_price | currency('', 0) }} ₮</span>
        </v-flex>
      </v-layout>
      <v-divider class="mb-2" :key="index"/>
    </template>

    <v-layout wrap class="pa-2 align-center">
      <v-flex xs12 sm6>
        <span class="red--text title text--darken-1 font-weight-medium">Нийт дүн:</span>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-right">
        <span class="red--text title text--darken-1 font-weight-medium">{{ totalPayment | currency('', 0) }} ₮</span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    products() {
      return this.$store.state.cartProducts
    },
    totalPayment() {
      return this.products.reduce((current, next) => current + (this.changePrice(next)), 0);
    }
  },
  methods: {
    changePrice(item) {
      var price = item.price

      if (item.info) price = price + item.info_price

      return price
    }
  }
}
</script>
