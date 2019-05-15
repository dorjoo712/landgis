<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    this.getCartProducts()
  },
  watch: {
    '$route.path': function() {
      console.log('route')
      this.getCartProducts()
    }
  },
  methods: {
    getCartProducts() {
      const products = JSON.parse(localStorage.getItem("giz-cart"));
      console.log('products', products)
      if (products) {
        this.$store.dispatch('setProducts', products)
      } else {
        this.$store.dispatch('setProducts', [])
      }

      const transaction = JSON.parse(localStorage.getItem("giz-transaction"));
      if (transaction ) {
        this.$store.dispatch('setTransaction', transaction)
      } else {
        this.$store.dispatch('setTransaction', [])
      }
    }
  }
}
</script>


<style>
.v-card, .v-list, .v-stepper{
  border-radius: 8px;
}
.v-select-list .v-list__tile,
.v-menu__content .v-list__tile,
.small .v-list__tile{
  font-size: 13px;
  height: 36px;
}
.v-label,
.v-input {
  font-size: 13px;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 36px;
}
.v-btn{
  text-transform: capitalize;
}
.logo{
  border-radius: 0 !important;
}
</style>
