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
        <v-stepper-content step="3">
          <h2 class="my-3 font-weight-light display-1 text-xs-center">Төлбөр баталгаажуулалт</h2>
          <v-layout wrap row class="mb-5">
            <v-flex xs12 sm6 offset-sm3>
              <h3 class="my-2 font-weight-regular title">Төлбөр хийх төрөлөө сонгоно уу</h3>
              <v-layout wrap row class="mb-1">
                <v-flex d-flex xs12 class="pa-3">
                  <v-card hover @click="selectPay('qr')" :class="transaction.paymentType === 'qr' ? 'green lighten-3' : ''">
                    <div class="text-xs-center pa-3 title block font-weight-regular">Qpay төлөх</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex> 
            <v-flex xs12 sm6 offset-sm3>
              <h3 class="my-2 font-weight-regular title">Захиалгын билл</h3>
              <v-divider class="mb-2"/>
              
              <payment-bill></payment-bill>

              <v-btn block round dark large color="green darken-2" :loading="loading" :disabled="nextBtn" @click="buyProduct" class="mb-3">Төлбөр төлөх</v-btn>
              <v-btn block round large to="/cart/payment"><v-icon left>arrow_back</v-icon>Өмнөх алхам руу буцах</v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog v-model="dialog" persistent max-width="490">
      <v-card color="green darken-2" dark v-if="loadingDailog">
        <v-card-text>
          Уншиж байна. Түр хүлээнэ үү!
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title class="headline">
          Qpay-ээр төлбөр хийх
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="qpayData != null">
          <div class="text-xs-center" style="width: 100%;">
            <img :src="`data:image/png;base64,${qpayData.qPay_QRimage}`" width="150" height="150">
          </div>
          
        </v-card-text>
        <v-card-text v-else-if="!loadingDailog">
            <p>{{message}}</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="6000">
      {{ message }}
      <v-btn dark flat @click="snackbar = false">Хаах</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PaymentBill from './bill'
// const moment = require('moment')
// const async = require("async")
// const uuidv4 = require('uuid/v4')
// const invNum = require('invoice-number')
// import axios from 'axios'

export default {
  data() {
    return {
      dialog: false,
      e1: 3,
      user: {},
      loadingDailog: false,
      qpayData: null,
      invoiceNumberPub: null,
      nextBtn: true,
      message: null,
      isPaid: false,
      fullscreen: false,
      snackbar: false,
      loading: false,
      message: 'Амжилттай төлөгдлөө...'
    }
  },
  components: {
    PaymentBill
  },
  computed: {
    transaction: {
      get() {
        return this.$store.state.transaction
      },
      set(val) {
        this.$store.dispatch('setTransaction', val)
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
    changePrice(item) {
      var price = item.price

      if (item.info) price = price + item.info_price

      return price
    },
    selectPay(item) {
      this.transaction.paymentType = item
      this.nextBtn = false
    },
    buyProduct() {
      this.snackbar = true
      this.loading = true
      setTimeout(() => (
          this.loading = false,
          this.snackbar = false,
          localStorage.removeItem('giz-cart'),
          localStorage.removeItem('giz-transaction'),
          this.$router.push('/')
        ), 2000)
    },
    buy() {
      let vm = this
      vm.invoiceNumberPub = null
      vm.loadingDailog = true
      vm.dialog = true
      var vdate = moment().format('YYMDHmss')
      var invoiceSuffix = Math.floor(Math.random() * 111) + 1

      let invoiceNO = invNum.next(`${vdate}${invoiceSuffix}`);
      let transactionUUID = uuidv4()
      async.eachSeries(vm.products, function (product, callback) {
        product.transaction_id = transactionUUID
        product.invoice_no = invoiceNO
        product.transaction_status = 1
        product.transaction_date = moment().format()
        product.firstName = vm.transaction.firstName
        product.lastName = vm.transaction.lastName
        product.email = vm.transaction.email
        product.phone = vm.transaction.phone
        product.delivery = vm.transaction.delivery
        product.deliveryPrice = vm.transaction.deliveryPrice
        product.paymentType = vm.transaction.paymentType
        product.buyUserId = vm.transaction.buyUserId
        product.address = vm.transaction.address
        product.productId = product.id
        product.stock = product.stock
        product.quantity = product.quantity

        var batch = fireDb.batch();
        var transactionDocRef = fireDb.collection('transactions').doc();

        batch.set(transactionDocRef, product);

        // Commit the batch
        batch.commit().then(function () {
          callback()
        })
        .catch(function () {
          callback()          
        });
      }, function (err) {
        if (err) {
          // console.log('err', err)
        }
        fireDb.collection('users').doc(vm.transaction.buyUserId).update({ transaction_last_date: moment().format() });

        axios.get(`https://us-central1-iibc-d09e7.cloudfunctions.net/app/getQpayInvoice?uid=${invoiceNO}`)
          .then( response => {
            vm.loadingDailog = false
            if(parseInt(response.data.result_code) == 0) {
              vm.qpayData = response.data.json_data
              vm.qpayData.qPay_url = vm.qpayData.qPay_url.replace("http:", "https:")
              vm.invoiceNumberPub = invoiceNO

              // console.log('invoiceNO', invoiceNO)
              fireDb.collection('transactions').where('invoice_no', '==', invoiceNO).onSnapshot(function (snapshot) {
                let trUid = null
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === 'modified' ) {
                      let mdata = change.doc.data()
                      // console.log("mdata: ", mdata);
                      if(mdata.transaction_status == 2) {
                        vm.isPaid = true
                        trUid = mdata.transaction_id
                      }
                    } 
                });
                if(vm.isPaid) {
                  window.localStorage.removeItem('giz-cart')
                  vm.$store.dispatch('cart/setProducts', [])
                  // window.location = `/payment_success?uid=${trUid}`
                  vm.$router.push( `/payment_success?uid=${trUid}`)
                }
              })

            } else if(parseInt(response.data.result_code) == 1) {
              vm.message = response.data.result_msg
            } else {
              vm.message = "An error occurred!"
            }
          }, verror =>{
            vm.loadingDailog = false
          })
      })
    },
    checkInvoice() {
      this.loadingDailog = true
      axios.get(`https://us-central1-iibc-d09e7.cloudfunctions.net/app/getCheckInvoice?uid=${this.invoiceNumberPub}`)
        .then( response => {
          this.$store.commit("setSnackbar", { text: response.data.result_msg, show: true })
          this.loadingDailog = false
        },err =>{
          this.loadingDailog = false
        })
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