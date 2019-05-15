<template>
  <div>
    <banner />

    <v-layout align-center justify-center row>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-alert :value="true" type="info" class="my-5">
          Худалдан авалт амжилттай хийгдлээ. Таньд баярлалаа :)
        </v-alert>

        <v-btn large color="accent" to="/">Нүүр хуудас <v-icon right>arrow_forward</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      products: [],
      invoiceNO: this.$route.query.uid
    }
  },
  components: {
    Banner
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // console.log('this.$route', this.$route)

      fireDb.collection('transactions').where('invoice_no', '==', this.invoiceNO).onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function(change) {
          let mdata = change.doc.data()

          if(mdata.transaction_status == 2) {
            // console.log('mdata', mdata)
          }
        });
      })
    }
  }
}
</script>