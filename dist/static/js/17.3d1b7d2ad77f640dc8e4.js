webpackJsonp([17],{497:function(t,e,n){n(656);var a=n(89)(n(583),n(721),"data-v-55ebb3c2",null);t.exports=a.exports},583:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(58),o=n.n(a),i=n(132),c=n(131),s=n(196);n.n(s);o.a.use(i.default),o.a.use(c.default),e.default={name:"Pandian",data:function(){return{height:document.documentElement.clientHeight}},computed:{},methods:{loadSN:function(){var t={};n.i(s.ajax)("POST","http://10.11.9.226:10083/derucci/workflow/jsp/OutData1.jsp?factory=1020&warehouse=1002",t).then(function(t){}).catch(function(){alert("请求超时！")})}},created:function(){},mounted:function(){this.loadSN()}}},616:function(t,e,n){e=t.exports=n(195)(),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"pandian.vue",sourceRoot:""}])},656:function(t,e,n){var a=n(616);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(484)("56d05629",a,!0)},721:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"edit",style:{height:t.height+"px"}},[n("h2",[t._v("盘点条码")])])},staticRenderFns:[]}}});