<template>
  <div class="cart">
    <v-stepper v-model="e1" class="elevation-1 mb-5">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="green"><small>алхам 1</small>Сагс</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2" color="green"><small>алхам 2</small>Төлбөр</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" color="green"><small>алхам 3</small>Баталгаажуулалт</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <h2 class="my-3 font-weight-light display-1 text-xs-center">Таны сагс</h2>
          <v-layout layout justify-center wrap class="mb-5" v-if="products.length > 0">
            <v-flex xs12 sm12 md8>
              <v-card class="ma-1">
                <v-card-title primary-title>
                  <h3 class="font-weight-regular title">Миний сагс</h3>
                </v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="products"
                    hide-actions
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.pid }} - {{ props.item.point_name }}</td>
                      <td class="text-xs-right">{{ props.item.price | currency('', 0) }} ₮</td>
                      <td>
                        <v-checkbox 
                          v-model="props.item.info" 
                          label="Хувийн хэрэг (1,500 ₮)" 
                          hide-details 
                          color="green darken-2"></v-checkbox>
                      </td>
                      <td class="text-xs-right">{{ changePrice(props.item) | currency('', 0) }} ₮</td>
                      <td class="text-xs-center">
                        <v-btn icon @click="removeCart(props.item)" small>
                          <v-icon small color="red darken-2">delete</v-icon>
                        </v-btn>
                      </td>
                    </template>
                    <template v-slot:footer>
                      <td :colspan="headers.length - 1" class="text-xs-right">
                        <strong>{{ totalPayment | currency('', 0) }} ₮</strong>
                      </td>
                      <td></td>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions class="pa-3">
                  <v-btn round large to="/"><v-icon left>arrow_back</v-icon>Цэг худалдан авах</v-btn>
                  <!-- <v-btn round dark large color="green darken-2" to="/">Цэг худалдан авах</v-btn> -->
                </v-card-actions>
              </v-card>
              <!-- <v-layout wrap row class="mb-5">
                <v-flex xs12 sm6 v-for="product in products" :key="product.pid">
                  <v-card v-if="product != null">
                    <v-card-title>
                      <div class="subheading font-weight-medium">{{ product.point_name}}</div>
                      <v-spacer />
                      <v-icon color="green darken-4" @click="removeCart(product)">close</v-icon>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="body-1">
                      {{ product.pid }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      {{ product.price }}
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout> -->
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-card class="ma-1">
                <v-card-title primary-title>
                  <h3 class="font-weight-regular title">Захиалгын билл</h3>
                </v-card-title>
                <v-card-text>
                  <payment-bill></payment-bill>
                  <v-btn block round dark large color="green darken-2" @click="gotoAddress">Худалдан авах</v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

          <v-alert v-else :value="true" type="info" class="my-5">
            Таны сагс хоосон байна.
          </v-alert>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PaymentBill from './bill'

export default {
  data() {
    return {
      e1: 0,
      headers: [
        {
          text: 'Цэгийн нэр',
          align: 'left',
          sortable: false,
          value: 'point_name'
        },
        { text: 'Үнэ', value: 'price', width: '100' },
        { text: 'Хувийн хэрэг', value: 'info', sortable: false, width: '230'  },
        { text: 'Нийт үнэ', value: 'total_price', width: '100' },
        { text: '', sortable: false, width: '40' }
      ]
    }
  },
  components: {
    PaymentBill
  },
  computed: {
    isCart: {
      get() {
        return this.$store.state.isCart
      },
      set(val) {
        this.$store.dispatch('setCart', val)
      }
    },
    products() {
      return this.$store.state.cartProducts
    },
    totalPayment() {
      return this.products.reduce((current, next) => current + (this.changePrice(next)), 0);
    }
  },
  methods: {
    gotoAddress() {
      let user = localStorage.getItem('user')
      if (user != undefined) {
        this.$store.dispatch('setProducts', this.products)
        this.$router.push('/cart/payment')
      } else {
        this.$router.push('/login')
      } 
    },
    removeCart(product) {
      this.$store.dispatch('removeProduct', product)
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
.cart .v-stepper__header{
  box-shadow: none;
}
.stock.v-list__tile__action--stack{
  flex-direction: row;
  align-items: center;
  min-width: 100px;
}
.stock .v-btn{
  min-width: 20px;
  float: left;
  margin: 0 5px;
}
.cart table.v-table tbody td:first-child, 
.cart table.v-table tbody td:not(:first-child), 
.cart table.v-table tbody th:first-child, 
.cart table.v-table tbody th:not(:first-child), 
.cart table.v-table thead td:first-child, 
.cart table.v-table thead td:not(:first-child), 
.cart table.v-table thead th:first-child, 
.cart table.v-table thead th:not(:first-child){
  padding: 0 15px;
}
@media (max-width: 600px) {
  .cart .v-stepper__content{
    padding: 15px 0;
  }
  .cart .v-list__tile__avatar, .cart .remove-btn{
    min-width: 36px
  }
  .cart .v-list__tile{
    padding: 0 5px;
  }
}
</style>