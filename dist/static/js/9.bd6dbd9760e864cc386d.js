webpackJsonp([9],{420:function(e,n,t){t(451);var o=t(111)(t(464),t(440),"data-v-26268eee",null);e.exports=o.exports},429:function(e,n,t){n=e.exports=t(415)(),n.push([e.i,"\n.skin-red .module[data-v-26268eee] {\n  background: #fff;\n}\n.skin-blue .module[data-v-26268eee] {\n  background: blue;\n}\n","",{version:3,sources:["e:/xampp/htdocs/PDA-V/src/pages/module.vue"],names:[],mappings:";AACA;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB",file:"module.vue",sourcesContent:["\n.skin-red .module[data-v-26268eee] {\n  background: #fff;\n}\n.skin-blue .module[data-v-26268eee] {\n  background: blue;\n}\n"],sourceRoot:""}])},440:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"module",style:{height:e.height+"px"}},[t("ul",e._l(e.modules,function(n){return t("li",{on:{click:function(t){e.toModule(n.coding,n.jurisdiction)}}},[e._v(e._s(n.name))])})),e._v(" "),t("button",{attrs:{type:"button"},on:{click:function(n){e.changeSkin("skin-blue")}}},[e._v("blue")]),e._v(" "),t("button",{attrs:{type:"button"},on:{click:function(n){e.changeSkin("skin-red")}}},[e._v("red")])])},staticRenderFns:[]}},451:function(e,n,t){var o=t(429);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t(416)("4651cb84",o,!0)},464:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t(57),u=t.n(o),s=t(113),i=t(112),c=t(166);t.n(c);u.a.use(s.default),u.a.use(i.default),n.default={name:"Module",data:function(){return{height:document.documentElement.clientHeight,account:null,password:null,modules:null}},computed:{skinCol:function(){return this.$store.state.skinCol}},methods:{changeSkin:function(e){this.$store.commit("changeSkin",e),localStorage.setItem("skinCol",e)},jurisdiction:function(){var e=this,n=c.pathOA+"/PDAPermission.jsp",t={account:11605002,password:"ADF00707A1C0154A9AD8EDB57C8646F4",factory:"工厂一",warehouse:"仓库二"};c.V.post(n,t).then(function(n){n.status?(console.log(n),e.modules=n.permissions):alert("数据获取失败！")}).catch(function(e){alert("您的网络有问题。")})},toModule:function(e,n){n&&this.$router.push({path:"/"+e})}},created:function(){},mounted:function(){this.jurisdiction()}}}});