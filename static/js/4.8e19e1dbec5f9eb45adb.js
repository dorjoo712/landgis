webpackJsonp([4],{"f/h8":function(t,e){},qJko:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("NYxO");var r={data:function(){return{e1:0,headers:[{text:"Цэгийн нэр",align:"left",sortable:!1,value:"point_name"},{text:"Үнэ",value:"price",width:"100"},{text:"Хувийн хэрэг",value:"info",sortable:!1,width:"230"},{text:"Нийт үнэ",value:"total_price",width:"100"},{text:"",sortable:!1,width:"40"}]}},components:{PaymentBill:s("XeDC").a},computed:{isCart:{get:function(){return this.$store.state.isCart},set:function(t){this.$store.dispatch("setCart",t)}},products:function(){return this.$store.state.cartProducts},totalPayment:function(){var t=this;return this.products.reduce(function(e,s){return e+t.changePrice(s)},0)}},methods:{gotoAddress:function(){void 0!=localStorage.getItem("user")?(this.$store.dispatch("setProducts",this.products),this.$router.push("/cart/payment")):this.$router.push("/login")},removeCart:function(t){this.$store.dispatch("removeProduct",t)},changePrice:function(t){var e=t.price;return t.info&&(e+=t.info_price),e}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cart"},[s("v-stepper",{staticClass:"elevation-1 mb-5",model:{value:t.e1,callback:function(e){t.e1=e},expression:"e1"}},[s("v-stepper-header",[s("v-stepper-step",{attrs:{complete:t.e1>1,step:"1",color:"green"}},[s("small",[t._v("алхам 1")]),t._v("Сагс")]),t._v(" "),s("v-divider"),t._v(" "),s("v-stepper-step",{attrs:{complete:t.e1>2,step:"2",color:"green"}},[s("small",[t._v("алхам 2")]),t._v("Төлбөр")]),t._v(" "),s("v-divider"),t._v(" "),s("v-stepper-step",{attrs:{step:"3",color:"green"}},[s("small",[t._v("алхам 3")]),t._v("Баталгаажуулалт")])],1),t._v(" "),s("v-stepper-items",[s("v-stepper-content",{attrs:{step:"1"}},[s("h2",{staticClass:"my-3 font-weight-light display-1 text-xs-center"},[t._v("Таны сагс")]),t._v(" "),t.products.length>0?s("v-layout",{staticClass:"mb-5",attrs:{layout:"","justify-center":"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm12:"",md8:""}},[s("v-card",{staticClass:"ma-1"},[s("v-card-title",{attrs:{"primary-title":""}},[s("h3",{staticClass:"font-weight-regular title"},[t._v("Миний сагс")])]),t._v(" "),s("v-card-text",[s("v-data-table",{attrs:{headers:t.headers,items:t.products,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[s("td",[t._v(t._s(e.item.pid)+" - "+t._s(e.item.point_name))]),t._v(" "),s("td",{staticClass:"text-xs-right"},[t._v(t._s(t._f("currency")(e.item.price,"",0))+" ₮")]),t._v(" "),s("td",[s("v-checkbox",{attrs:{label:"Хувийн хэрэг (1,500 ₮)","hide-details":"",color:"green darken-2"},model:{value:e.item.info,callback:function(s){t.$set(e.item,"info",s)},expression:"props.item.info"}})],1),t._v(" "),s("td",{staticClass:"text-xs-right"},[t._v(t._s(t._f("currency")(t.changePrice(e.item),"",0))+" ₮")]),t._v(" "),s("td",{staticClass:"text-xs-center"},[s("v-btn",{attrs:{icon:"",small:""},on:{click:function(s){return t.removeCart(e.item)}}},[s("v-icon",{attrs:{small:"",color:"red darken-2"}},[t._v("delete")])],1)],1)]}},{key:"footer",fn:function(){return[s("td",{staticClass:"text-xs-right",attrs:{colspan:t.headers.length-1}},[s("strong",[t._v(t._s(t._f("currency")(t.totalPayment,"",0))+" ₮")])]),t._v(" "),s("td")]},proxy:!0}],null,!1,2067340281)})],1),t._v(" "),s("v-card-actions",{staticClass:"pa-3"},[s("v-btn",{attrs:{round:"",large:"",to:"/"}},[s("v-icon",{attrs:{left:""}},[t._v("arrow_back")]),t._v("Цэг худалдан авах")],1)],1)],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm12:"",md4:""}},[s("v-card",{staticClass:"ma-1"},[s("v-card-title",{attrs:{"primary-title":""}},[s("h3",{staticClass:"font-weight-regular title"},[t._v("Захиалгын билл")])]),t._v(" "),s("v-card-text",[s("payment-bill"),t._v(" "),s("v-btn",{attrs:{block:"",round:"",dark:"",large:"",color:"green darken-2"},on:{click:t.gotoAddress}},[t._v("Худалдан авах")])],1)],1)],1)],1):s("v-alert",{staticClass:"my-5",attrs:{value:!0,type:"info"}},[t._v("\n          Таны сагс хоосон байна.\n        ")])],1)],1)],1)],1)},staticRenderFns:[]};var i=s("VU/8")(r,a,!1,function(t){s("f/h8")},null,null);e.default=i.exports}});
//# sourceMappingURL=4.8e19e1dbec5f9eb45adb.js.map