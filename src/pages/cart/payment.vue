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
        <v-stepper-content step="2">
          <h2 class="my-3 font-weight-light display-1 text-xs-center">Төлбөр төлөлт</h2>
          <v-layout wrap row class="mb-5">
            <v-flex xs12 sm8>
              <v-card class="ma-1" primary-title>
                <v-card-title>
                  <h3 class="font-weight-regular title">Хэрэглэгчийн мэдээлэл</h3>
                </v-card-title>
                <v-card-text>
                  <v-card flat>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-layout wrap row>
                        <v-flex xs12 sm6>
                          <v-text-field v-model="transaction.firstName" label="Нэр" :rules="[rules.required]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field v-model="transaction.lastName" label="Овог" :rules="[rules.required]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field v-model="transaction.email" label="Имэйл" :rules="[rules.required, rules.email]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field v-model="transaction.phone" label="Утасны дугаар" :rules="[rules.required]"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea box v-model="transaction.address" label="Хаяг" :rules="[rules.required]"></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <v-card class="ma-1">
                <v-card-title primary-title>
                  <h3 class="font-weight-regular title">Захиалгын билл</h3>
                </v-card-title>
                <v-card-text>
                  <payment-bill></payment-bill>

                  <v-btn block round dark large color="green darken-2" @click="gotoPayment" class="mb-3">Төлбөрийн нөхцөл сонгох</v-btn>
                  <v-btn block round large to="/cart"><v-icon left>arrow_back</v-icon>Өмнөх алхам руу буцах</v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
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
      valid: false,
      e1: 2,
      transaction: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        paymentType: null,
        buyUserId: null,
        address: null
      },
      rules: {
        required: value => !!value || 'Заавал бөглөнө үү.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Буруу имэйл.'
        }
      },
      buyUser: null
    }
  },
  components: {
    PaymentBill
  },
  methods: {
    selectPay(item) {
      this.transaction.paymentType = item
    },
    gotoPayment() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('setTransaction', this.transaction)
        this.$router.push('/cart/checkout')
      }
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
.v-textarea.v-text-field--box>.v-input__control>.v-input__slot{
  background-color: #fff;
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