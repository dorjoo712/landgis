webpackJsonp([0],{XeDC:function(t,s,e){"use strict";e("NYxO");var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t._l(t.products,function(s,a){return[e("v-layout",{key:s.id,staticClass:"pa-2 align-center",attrs:{wrap:""}},[e("v-flex",{staticClass:"py-0",attrs:{xs12:"",sm6:""}},[e("span",[t._v(t._s(s.pid)+" - "+t._s(s.point_name))])]),t._v(" "),e("v-flex",{staticClass:"py-0 text-xs-right",attrs:{xs12:"",sm6:""}},[e("span",[t._v(t._s(t._f("currency")(s.price,"",0))+" ₮")])]),t._v(" "),s.info?e("v-flex",{attrs:{xs12:"",sm6:""}},[e("span",{staticClass:"ml-3"},[t._v("Хувийн хэрэг")])]):t._e(),t._v(" "),s.info?e("v-flex",{staticClass:"text-xs-right",attrs:{xs12:"",sm6:""}},[e("span",[t._v(t._s(t._f("currency")(s.info_price,"",0))+" ₮")])]):t._e()],1),t._v(" "),e("v-divider",{key:a,staticClass:"mb-2"})]}),t._v(" "),e("v-layout",{staticClass:"pa-2 align-center",attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:"",sm6:""}},[e("span",{staticClass:"red--text title text--darken-1 font-weight-medium"},[t._v("Нийт дүн:")])]),t._v(" "),e("v-flex",{staticClass:"text-xs-right",attrs:{xs12:"",sm6:""}},[e("span",{staticClass:"red--text title text--darken-1 font-weight-medium"},[t._v(t._s(t._f("currency")(t.totalPayment,"",0))+" ₮")])])],1)],2)},staticRenderFns:[]},r=e("VU/8")({computed:{products:function(){return this.$store.state.cartProducts},totalPayment:function(){var t=this;return this.products.reduce(function(s,e){return s+t.changePrice(e)},0)}},methods:{changePrice:function(t){var s=t.price;return t.info&&(s+=t.info_price),s}}},a,!1,null,null,null);s.a=r.exports}});
//# sourceMappingURL=0.7a16885709b29c937a25.js.map