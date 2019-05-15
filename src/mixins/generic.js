import firebaseApp from '@/service/firebase';

export default {
  data () {
    return {
      dialogFormVisible: false,
      categories: [],
      statuses: [
        {"text": "Pending", "value": 1, "color": "orange darken-1"},
        {"text": "Paid", "value": 2, "color": "light-blue"},
        {"text": "On delivery", "value": 3, "color": "dark"},
        {"text": "Delivered", "value": 4, "color": "green"},
        {"text": "Canceled", "value": 5, "color": "error"}
      ]
    }
  },
  methods: {
    getColor(item) {
      var i = 0
      for (; i < this.statuses.length; i++) {
        if(this.statuses[i]['value'] == item.status) return this.statuses[i]['color'] 
      }
    },
    getCategories() {
      var that = this
      firebaseApp.firestore().collection('category').doc('productCategory').get().then(function(doc) {
        if (doc.exists) {
          var itm = doc.data()
          that.categories = itm.items || []
          console.log("that.categories", that.categories)
        }
      }).catch(function(error) {
        that.categories = []
      });
    },
    submitForm (collection, alias) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var actionMessage = 'Saved'
            var ref = null
            if(this.edit){
              actionMessage = 'Updated'
              ref = firebaseApp.firestore().collection(collection).doc(this.form.id).update(this.form);
            }else {
              if(alias != undefined){
                ref = firebaseApp.firestore().collection(collection).doc(alias).set(this.form);
              }else {
                ref = firebaseApp.firestore().collection(collection).doc().set(this.form);
              }
              
            }
            return ref.then(docRef => {
              this.$message( { message: actionMessage, type: 'success', showClose: true });
              this.dialogFormVisible = false
              if(!this.edit) this.nodeClear()
              return Promise.resolve(docRef)
            }).catch(err => {
              console.log("error", err)
              this.$message( { message: "System error!", type: 'error', showClose: true });
              return Promise.reject(err)
            })
          } else {
            return Promise.reject(valid)
          }
        })
    },
    deleteOpen (item, collection) {
      this.$confirm(item.name + '. Is really delete?', 'Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        firebaseApp.firestore().collection(collection).doc(item['id']).delete().then(ref=>{
          this.$message( { message: item.name + ' is deleted', type: 'success', showClose: true });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled'
        })
      })
    },
    setTranslationMode(item){

    },
    groupByOrder(collection, property) {
      var i = 0, val, index, item = {}, amount = 0,
          values = [], result = [];
      for (; i < collection.length; i++) {
          val = collection[i][property];
          item = {
            date: collection[i]['transaction_date'],
            orderNumber: collection[i]['transaction_id'],
            invoice_no: collection[i]['invoice_no'],
            status: collection[i]['transaction_status'],
            amount: collection[i]['price'] * collection[i]['quantity'] + collection[i]['deliveryPrice'] ,
            sellerName: collection[i]['sellerName'],
            sellerPhone: collection[i]['phone'],
            sellerId: collection[i]['sellerId'],
            buyUserId: collection[i]['buyUserId'], 
            delivery: collection[i]['delivery'], 
            name: collection[i]['lastName'] + ' ' + collection[i]['firstName'], 
            mobilePhone: collection[i]['mobilePhone'],
            address: collection[i]['address'],
            sellerProfile: collection[i]['seller'],
            items: [],
          }
          index = values.indexOf(val);
          if (index > -1){
              result[index]['amount'] = result[index]['amount'] + parseFloat ( collection[i]['price'] )
              result[index]['items'].push(collection[i])
          } else {
              values.push(val);
              item.items = [collection[i]]
              result.push(item);
          }
      }
      return result;
    }
  }
}