webpackJsonp([2],{454:function(t,n,e){e(523);var a=e(85)(e(490),e(557),"data-v-596a6686",null);t.exports=a.exports},461:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"Head",methods:{back:function(){this.$router.back()}}}},462:function(t,n,e){n=t.exports=e(182)(),n.i(e(447),""),n.push([t.i,"\n.head[data-v-1a64bd24] {\n  height: 1.5rem;\n  position: relative;\n  width: 100%;\n  margin-bottom: -1px;\n  margin-top: 25px;\n}\n.head h1[data-v-1a64bd24] {\n    font-size: 0.5625rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    color: #fff;\n}\n.head button[data-v-1a64bd24], .head a[data-v-1a64bd24] {\n    position: absolute;\n    top: 0.46875rem;\n    width: 0.625rem;\n    height: 0.625rem;\n    z-index: 1;\n}\n.head button.back[data-v-1a64bd24] {\n    left: 0.46875rem;\n    background: url("+e(464)+") no-repeat;\n}\n.head a.edit[data-v-1a64bd24] {\n    right: 0.46875rem;\n    background: url("+e(465)+") no-repeat;\n}\n.skinA .head[data-v-1a64bd24] {\n  background: #007aff;\n}\n.skinB .head[data-v-1a64bd24] {\n  background: #31c3b0;\n}\n.skinC .head[data-v-1a64bd24] {\n  background: #2f354a;\n}\n","",{version:3,sources:["/Users/mankuangji/Desktop/web/PDA-V/src/components/header.vue"],names:[],mappings:";AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,YAAY;EACZ,oBAAoB;EACpB,iBAAiB;CAClB;AACD;IACI,qBAAqB;IACrB,eAAe;IACf,oBAAoB;IACpB,YAAY;CACf;AACD;IACI,mBAAmB;IACnB,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;IACjB,WAAW;CACd;AACD;IACI,iBAAiB;IACjB,oDAAoD;CACvD;AACD;IACI,kBAAkB;IAClB,oDAAmD;CACtD;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB",file:"header.vue",sourcesContent:["\n@import url(./../assets/css/common.css);\n.head[data-v-1a64bd24] {\n  height: 1.5rem;\n  position: relative;\n  width: 100%;\n  margin-bottom: -1px;\n  margin-top: 25px;\n}\n.head h1[data-v-1a64bd24] {\n    font-size: 0.5625rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    color: #fff;\n}\n.head button[data-v-1a64bd24], .head a[data-v-1a64bd24] {\n    position: absolute;\n    top: 0.46875rem;\n    width: 0.625rem;\n    height: 0.625rem;\n    z-index: 1;\n}\n.head button.back[data-v-1a64bd24] {\n    left: 0.46875rem;\n    background: url(../assets/img/1_back.png) no-repeat;\n}\n.head a.edit[data-v-1a64bd24] {\n    right: 0.46875rem;\n    background: url(../assets/img/3_set.png) no-repeat;\n}\n.skinA .head[data-v-1a64bd24] {\n  background: #007aff;\n}\n.skinB .head[data-v-1a64bd24] {\n  background: #31c3b0;\n}\n.skinC .head[data-v-1a64bd24] {\n  background: #2f354a;\n}\n"],sourceRoot:""}])},463:function(t,n,e){var a=e(462);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(446)("4a6593fb",a,!0)},464:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDFhNjhkNC1lMjk3LTg4NGUtOWI1Yi04MmFkOGFkNTA0NmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURGRUI4REVBNDQyMTFFN0I5QUNBMDk3NjYyNDUwMUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURGRUI4RERBNDQyMTFFN0I5QUNBMDk3NjYyNDUwMUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjcxYWFhMDEtNjg4OC00MTQ3LWI2YTQtYjE5ZTBjMWU4ZWY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVkMWE2OGQ0LWUyOTctODg0ZS05YjViLTgyYWQ4YWQ1MDQ2ZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po9e4MkAAADrSURBVHjapNRPCwFBGMfxbW/KASmrRKGISDk4OCgHB3cvxptyk4ubkkKSEiFFHCgXL2D8Js9qW/v32alPtt3pu7szLVUIofgUhR79/s77jcRgJL6jxQ0lYEqRK+Q4oRTMKXKGmnmOl0gGVhQ5QNlqnlskDxuKbKFgN9cpUoQdRdaQdbqp3YUKHCmyhLTbElidlLtxociYdst1LVXlf4RAo+MbPBUvw+YOXXjTUw0gxHk1XRteFBtCmBuSmvAwrFeEG5IacKfYBOLckFQ37OQMktyQVIUTxRagBfkbKcGeYp0gIf3765tf7yPAALZdwCspiFbSAAAAAElFTkSuQmCC"},465:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDFhNjhkNC1lMjk3LTg4NGUtOWI1Yi04MmFkOGFkNTA0NmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUxQjBBRTJBNDQyMTFFN0EyMzM4M0RDNUEwQjgxMjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUxQjBBRTFBNDQyMTFFN0EyMzM4M0RDNUEwQjgxMjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjIwNzcwYWMtMmUyYy1mNTQ3LWIzMzgtN2JmNmZlZWM0MGEzIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YThmZWY4ZmYtOWY2Zi0xMWU3LWFmMTAtZjk3M2VlZTk2Zjc3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9/DQ6wAAAUdJREFUeNqs088rRFEUwHE/ykzTkA1FI00sKKUsLMzGwkaSPWtZ2dsNyUbyJ0jxN0jKzlZspCkLUUPqERqFyfU99W6u47zpLdz6bM6953TPefc1O+ea/mO1JMSnsIUhFV/ABvr/ZMiNAh3YdT/rDmXMq/gDlsJcXWjSpV8VtPlc3do1nlKO5QofSTPqQV7FIlRQV/HCr/ygrT6cBFf/xDqKaMc4DlV7a749KZDFKqrqUFnNT2Rwqs6dY0Y2S6ipzQgFo5BYNAZ/ID3mjEG+oJYw5KoRc1LoFo9qoxfFhEIlIxb5645hB1/BdY/QqdqaiNv26x4r6Nb9b6reL7CMWWzjOdh7i+drvuwBvKZ82cdhrn6Q+QY/sl6Z8KxOyhpfUb7ejVGoNWb+/WIOZ6hjH8PowjQu8Y49DDb6+70cRo24FByxcr4FGADqQYNlInu6VwAAAABJRU5ErkJggg=="},466:function(t,n,e){e(463);var a=e(85)(e(461),e(467),"data-v-1a64bd24",null);t.exports=a.exports},467:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"head"},[e("button",{staticClass:"back",attrs:{type:"button"},on:{click:function(n){t.back()}}}),t._v(" "),t._t("default"),t._v(" "),e("router-link",{staticClass:"edit",attrs:{to:"/setting"}})],2)},staticRenderFns:[]}},469:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"table-h",data:function(){return{isTbleH:!1}},computed:{names:function(){return this.$store.state.tableH},isTr3:function(){return this.$store.state.isTr3},isOP:function(){return this.$store.state.isOP}}}},470:function(t,n,e){n=t.exports=e(182)(),n.i(e(447),""),n.push([t.i,"\n.table-h[data-v-8734d4bc] {\n  width: 100%;\n  padding-left: 0;\n  box-shadow: 0 2px 0.125rem rgba(0, 0, 0, 0.16);\n}\n.table-h li[data-v-8734d4bc] {\n    float: left;\n    text-align: center;\n    width: 2.8125rem;\n    height: 0.9375rem;\n    line-height: 0.9375rem;\n    font-size: 14px;\n    color: #999;\n    background: #f0f0f0;\n}\n.table-h li[data-v-8734d4bc]:first-child {\n    width: 1.5625rem;\n}\n.tableH1 li[data-v-8734d4bc]:nth-child(2) {\n  width: 5.625rem;\n}\n","",{version:3,sources:["/Users/mankuangji/Desktop/web/PDA-V/src/components/table-h.vue"],names:[],mappings:";AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,+CAA+C;CAChD;AACD;IACI,YAAY;IACZ,mBAAmB;IACnB,iBAAiB;IACjB,kBAAkB;IAClB,uBAAuB;IACvB,gBAAgB;IAChB,YAAY;IACZ,oBAAoB;CACvB;AACD;IACI,iBAAiB;CACpB;AACD;EACE,gBAAgB;CACjB",file:"table-h.vue",sourcesContent:["\n@import url(./../assets/css/common.css);\n.table-h[data-v-8734d4bc] {\n  width: 100%;\n  padding-left: 0;\n  box-shadow: 0 2px 0.125rem rgba(0, 0, 0, 0.16);\n}\n.table-h li[data-v-8734d4bc] {\n    float: left;\n    text-align: center;\n    width: 2.8125rem;\n    height: 0.9375rem;\n    line-height: 0.9375rem;\n    font-size: 14px;\n    color: #999;\n    background: #f0f0f0;\n}\n.table-h li[data-v-8734d4bc]:first-child {\n    width: 1.5625rem;\n}\n.tableH1 li[data-v-8734d4bc]:nth-child(2) {\n  width: 5.625rem;\n}\n"],sourceRoot:""}])},472:function(t,n,e){var a=e(470);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(446)("3cc08f42",a,!0)},474:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAALNJREFUKJGVkjEOwjAMRZ/DhTp2zCkoEyPiCkyphcQdGMtEuEW3dkDqguACnCMsAYUQIfBoPft/f1lCCHdgo6oHvpRzbgnsDKBA55xrvsBzoAO2MxE5W2uvgLfW3vq+vxRgDyxUtTMAqnoCGuCYKmWwB5C2bUvb6tgaUhjApPJRqYrgAFQp/DHwS70NREtTtFQDU56eyeDngaOqjhSCMAX45bmUnoQQVsA+hwtWPbCWf1/jAY0FX6D1OPjCAAAAAElFTkSuQmCC"},476:function(t,n,e){e(472);var a=e(85)(e(469),e(477),"data-v-8734d4bc",null);t.exports=a.exports},477:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ul",{staticClass:"clearfix table-h",class:{tableH1:t.isTr3&&!t.isOP}},t._l(t.names,function(n){return e("li",[t._v(t._s(n))])}))},staticRenderFns:[]}},482:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(62),o=e.n(a),i=e(124);o.a.use(i.default),n.default={name:"table-tr",data:function(){return{name:this.$route.params.module}},computed:{orders:function(){return this.$store.state.orders},bottomBtnName:function(){return this.$store.state.bottomBtnName},moduleName:function(){return this.$store.state.moduleName},productScanList:function(){return this.$store.state.productScanList}},methods:{toOrderDetail:function(t,n){var e=this.$route.params.module;"stock"===e&&(e=this.bottomBtnName),this.$router.push({path:"/snList/"+t+"?name="+e+"&moduleName="+this.moduleName+"&ZDDLX="+n})}},created:function(){"stock"===this.$route.params.module?"salestockup"===this.bottomBtnName?this.$store.commit("moduleName","销售备货"):this.$store.commit("moduleName","销售出库"):"purchase"===this.$route.params.module?this.$store.commit("moduleName","采购入库"):"salesreturn"===this.$route.params.module&&this.$store.commit("moduleName","退货入库")}}},490:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(126),o=e.n(a),i=e(62),r=e.n(i),s=e(125),A=e(124),c=e(183),d=(e.n(c),e(466)),l=e.n(d),m=e(476),u=e.n(m),h=e(549),b=e.n(h);r.a.use(s.default),r.a.use(A.default),n.default={name:"Modules",components:{HeadComponent:l.a,TableH:u.a,TableTr:b.a},data:function(){return{height:document.documentElement.clientHeight,orderArr:[],orders:[],searchNum:"",focusStatus:!0,titName:this.$route.query.moduleName,moduleName:this.$route.params.module,factoryNum:"",warehouse:"",warehouseNum:"",bottomBtn:!0,btnName:"",printVal:localStorage.getItem("printVal")}},computed:{bottomBtnName:function(){return this.$store.state.bottomBtnName},productScanList:function(){return this.$store.state.productScanList}},watch:{searchNum:function(t){"productScan"===this.$route.params.module?this.scan():this.searchOrder()}},methods:{setbottomBtnName:function(t){this.$store.commit("bottomBtnName",t)},setTableH:function(){"productScan"===this.$route.params.module?this.$store.commit("tableH",["序号","品名","条码","状态"]):this.$store.commit("tableH",["序号","单号","归属仓库","客户地址"])},setProductScanList:function(t){this.$store.commit("productScanList",t)},setOrders:function(t){this.$store.commit("setOrders",t)},loadingShow:function(t){this.$store.commit("loadingShow",t)},clearInput:function(){this.searchNum=""},orderListParams:function(){var t=this.moduleName;return"allotinbound"===this.moduleName||"allot"===this.moduleName?c.path.sap+t+"/getsite?WERKS="+this.factoryNum:c.path.sap+t+"/getcity?WERKS="+this.factoryNum+"&LGORT="+this.warehouseNum},getOrderList:function(t){var n=this;return n.loadingShow(!0),new o.a(function(e,a){c.V.get(t).then(function(t){n.loadingShow(!1),t=JSON.parse(t.responseText),e(t)}).catch(function(t){alert("请求超时！"),n.loadingShow(!1)})})},scan:function(){var t=this,n="",e="",a=this.searchNum;(23===a.length||22===a.length||a.length>=27)&&("scanbq"===this.bottomBtnName?(n=c.path.sap+"product/getorder",e={body:'{ "Item": {SN: "'+a+'"} }'},t.putInShow=!0,window.apiready(n,e).then(function(n){n?(t.putInShow=!1,n.MT_Product_GetOrder_Resp.Item&&(n=n.MT_Product_GetOrder_Resp.Item,"S"===n[0].ZXXLX||""===n[0].ZXXLX?(t.setScanArr(n),t.searchNum=""):(alert(n[0].ZTXXX),t.searchNum=""))):(alert("请求超时！"),t.putInShow=!1)})):"scanfw"===this.bottomBtnName&&(n=c.path.sap+"securitycode/verify",e={ZFWMA:a},t.putInShow=!0,c.V.get(n,e).then(function(n){n=JSON.parse(n.responseText),t.putInShow=!1,n.MT_SecurityCode_Verify_Resp.Item&&(n=n.MT_SecurityCode_Verify_Resp.Item,"S"===n.ZXXLX?(t.setScanArr(t.searchNum),t.searchNum=""):(alert(n.ZXXTX),t.searchNum=""))})))},searchOrder:function(){var t=[],n=this.searchNum,e="";if("product"===this.moduleName)e="生产入库",this.$router.push({path:"/snList/"+n+"?name="+this.moduleName+"&moduleName="+e});else{if(""===n)t=this.orders;else{var a=this.orders;for(var o in a){-1!==a[o][0].toString().indexOf(n)&&t.push(a[o])}}this.setOrders(t)}},setScanArr:function(t){console.log(t);var n=!1,a=0;if(console.log(this.productScanList),this.productScanList.length>0)for(var o in this.productScanList)this.productScanList[o][1]===this.searchNum&&(n=!0,a=o);if("scanbq"===this.bottomBtnName)if(n){var i=e.i(c.cloneObj)(this.productScanList);i[a][3]=!0,this.setProductScanList(i)}else{for(var r in t){var s=[];s[0]=t[r].MAKTX,""===t[r].ZDEZTMA?(s[1]=t[r].ZTIAOM,t[r].ZTIAOM===this.searchNum&&(s[2]=t[r].ZFBMS,s[3]=!0)):(s[1]=t[r].ZDEZTMA,t[r].ZDEZTMA===this.searchNum&&(s[2]=t[r].ZFBMS,s[3]=!0)),this.productScanList.push(s)}this.setProductScanList(this.productScanList)}else if(!n){var A=["",t,""];this.productScanList.push(A),this.setProductScanList(this.productScanList)}},setTrArr:function(t){function n(t,n,e){for(var a in t){var o=[];o[0]=t[a].BUS_NO,o[1]=e.warehouse,o[2]=t[a].LGOBE,n.push(o)}}var e=[];if("purchase"===this.moduleName){t=t.MT_Purchase_GetInCity_Resp.Item;for(var a in t){var o=[];o[0]=t[a].BUS_NO,o[1]=this.warehouse,o[2]=t[a].ZDDLX,e.push(o)}}else"salestockup"===this.moduleName||"salesoutput"===this.moduleName?("salestockup"===this.bottomBtnName?(this.bottomBtn=!0,this.titName="销售备货",this.$store.commit("moduleName","销售备货"),t=t.MT_Salestockup_GetInCity_Resp.Document):(this.bottomBtn=!1,this.titName="销售出库",this.$store.commit("moduleName","销售出库"),t=t.MT_Salesoutput_GetInCity_Resp.Document),n(t,e,this)):"productScan"===this.moduleName||("salesreturn"===this.moduleName?(t=t.MT_SalesReturn_GetInCity_Resp.Document,n(t,e,this)):"allotinbound"!==this.moduleName&&"allot"!==this.moduleName||("allotinbound"===this.moduleName?(t=t.MT_AllotInbound_GetSite_Resp.Item,this.titName="调拨入库",this.$store.commit("moduleName","调拨入库")):(t=t.MT_Allot_GetSite_Resp.Item,this.titName="调拨出库",this.$store.commit("moduleName","调拨出库")),n(t,e,this)));this.setOrders(e),this.orders=e},sales:function(t){var n=this;this.moduleName=t,this.bottomBtnName!==t&&(this.setbottomBtnName(t),this.getOrderList(this.orderListParams()).then(function(t){n.setTrArr(t)}))},productScan:function(t){"scanfw"===t?(this.titName="扫防伪码",this.btnName="打印出货标签",this.bottomBtn=!0,this.searchNum="",this.setbottomBtnName("scanfw"),this.setProductScanList([])):(this.titName="扫标签码",this.btnName="打印入库单",this.bottomBtn=!1,this.searchNum="",this.setbottomBtnName("scanbq"),this.setProductScanList([]))},snArr:function(){var t=[];for(var n in this.productScanList)t.push(this.productScanList[n][1]);return t},setIn:function(){var t=this,n="",e="",a="";if("scanbq"===this.bottomBtnName){console.log(this.snArr());for(var o in this.snArr())n+='Item:{ZTIAOM:"'+this.snArr()[o]+'"},';n=n.substr(0,n.length-1),e=c.path.sap+"product/generateorder",a={body:'{Header:{ZBMDH: 11,ZBMMC: 11,ZRKYY: 11,ZRKEQ: 11,ZRKSJ: 11,ZIP: "TSC_TTP-244_PRO",'+n+"}}"}}else{console.log(this.snArr());var i=[],r=this.snArr();for(var s in r)i[s]='Item: {ZFWMA: "'+r[s]+'",ZIP: "'+this.printVal+'",ZBQXH: "48"}';a={body:"{"+i.join(",")+"}"},e=c.path.sap+"securitycode/print"}t.putInShow=!0,0===this.snArr().length?alert("请先扫码！"):function(n,e){window.apiready(n,e).then(function(n){n?(t.putInShow=!1,"scanbq"===t.bottomBtnName?n=n.MT_Produt_GenerateOrder_Resp.Header:"scanfw"===t.bottomBtnName&&(n=n.MT_SecurityCode_Print_Resp.Item),"S"===n.ZXXLX?(t.setProductScanList([]),t.searchNum="",n.ZTXXX?alert(n.ZTXXX):n.ZXXTX&&alert(n.ZXXTX)):(n.ZTXXX?alert(n.ZTXXX):n.ZXXTX&&alert(n.ZXXTX),t.searchNum="")):(alert("请求超时！"),t.putInShow=!1)})}(e,a)}},directives:{focus:{inserted:function(t,n){n.value&&t.focus()}}},created:function(){localStorage.setItem("routeIndex","4"),e.i(c.getFactorySel)(this);var t=this;"product"!==this.moduleName&&("stock"===this.moduleName?(this.moduleName="salestockup",this.setbottomBtnName("salestockup")):"productScan"===this.moduleName&&(this.moduleName="scanfw",this.setbottomBtnName("scanfw"),this.bottomBtn=!0,this.btnName="打印出货标签"),"productScan"!==this.$route.params.module&&this.getOrderList(this.orderListParams()).then(function(n){t.setTrArr(n)})),this.setTableH(),this.setOrders(this.orders),this.$store.commit("loadingShow",!0),this.$store.commit("isOP",!0),this.$store.commit("changeSkin",localStorage.getItem("skinCol"))},mounted:function(){this.loadingShow(!1)}}},504:function(t,n,e){n=t.exports=e(182)(),n.i(e(447),""),n.push([t.i,"\n.contain[data-v-596a6686] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding-top: 4.4rem;\n  padding-bottom: 1.5rem;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  z-index: -1;\n}\n.searchOrder[data-v-596a6686] {\n  position: relative;\n  height: .78125rem;\n  padding: 0.15625rem 0;\n}\n.searchOrder input[data-v-596a6686] {\n    display: block;\n    width: 60%;\n    height: 0.625rem;\n    margin: auto;\n    border: none;\n    border-bottom: 1px solid #fff;\n    color: #fff;\n    font-size: 0.5rem;\n    text-align: center;\n}\n.searchOrder button.clearBtn[data-v-596a6686] {\n    position: absolute;\n    top: 0.3125rem;\n    right: 20%;\n    width: 0.375rem;\n    height: 0.375rem;\n    background: url("+e(474)+") no-repeat;\n    background-size: 100% 100%;\n}\n.searchOrder input[data-v-596a6686]::-webkit-input-placeholder, .searchOrder textarea[data-v-596a6686]::-webkit-input-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]:-moz-placeholder, .searchOrder textarea[data-v-596a6686]:-moz-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]::-moz-placeholder, .searchOrder textarea[data-v-596a6686]::-moz-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]:-ms-input-placeholder, .searchOrder textarea[data-v-596a6686]:-ms-input-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.bottomBtn[data-v-596a6686] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background: #fff;\n}\n.bottomBtn li[data-v-596a6686] {\n    float: left;\n    height: 1.25rem;\n    width: 5rem;\n    line-height: 1.25rem;\n    text-align: center;\n    font-size: 17px;\n}\n.setIn[data-v-596a6686] {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 50%;\n  margin-left: -2.5rem;\n  height: 1.25rem;\n  width: 5rem;\n  color: #fff;\n  font-size: 0.53125rem;\n}\n.skinA .head[data-v-596a6686] {\n  background: #007aff;\n}\n.skinA .searchOrder[data-v-596a6686] {\n  background: #007aff;\n}\n.skinA .searchOrder input[data-v-596a6686] {\n    background: #007aff;\n}\n.skinA .bottomBtn li[data-v-596a6686] {\n  color: #465e7e;\n}\n.skinA .bottomBtn li.on[data-v-596a6686] {\n  background: #007aff;\n  color: #fff;\n}\n.skinA .setIn[data-v-596a6686] {\n  background: #007aff;\n}\n.skinB .head[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinB .searchOrder[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinB .searchOrder input[data-v-596a6686] {\n    background: #31c3b0;\n}\n.skinB .bottomBtn li[data-v-596a6686] {\n  color: #22877a;\n}\n.skinB .bottomBtn li.on[data-v-596a6686] {\n  background: #31c3b0;\n  color: #fff;\n}\n.skinB .setIn[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinC .head[data-v-596a6686] {\n  background: #2f354a;\n}\n.skinC .searchOrder[data-v-596a6686] {\n  background: #2f354a;\n}\n.skinC .searchOrder input[data-v-596a6686] {\n    background: #2f354a;\n}\n.skinC .bottomBtn li[data-v-596a6686] {\n  color: #6b82b5;\n}\n.skinC .bottomBtn li.on[data-v-596a6686] {\n  background: #2f354a;\n  color: #fff;\n}\n.skinC .setIn[data-v-596a6686] {\n  background: #2f354a;\n}\n","",{version:3,sources:["/Users/mankuangji/Desktop/web/PDA-V/src/pages/modules/index.vue"],names:[],mappings:";AAEA;EACE,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,mBAAmB;EACnB,kBAAkB;EAClB,sBAAsB;CACvB;AACD;IACI,eAAe;IACf,WAAW;IACX,iBAAiB;IACjB,aAAa;IACb,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;CACtB;AACD;IACI,mBAAmB;IACnB,eAAe;IACf,WAAW;IACX,gBAAgB;IAChB,iBAAiB;IACjB,oDAAkE;IAClE,2BAA2B;CAC9B;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,QAAQ;EACR,iBAAiB;CAClB;AACD;IACI,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,qBAAqB;IACrB,mBAAmB;IACnB,gBAAgB;CACnB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,qBAAqB;EACrB,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,sBAAsB;CACvB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;IACI,oBAAoB;CACvB;AACD;EACE,eAAe;CAChB;AACD;EACE,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;IACI,oBAAoB;CACvB;AACD;EACE,eAAe;CAChB;AACD;EACE,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;IACI,oBAAoB;CACvB;AACD;EACE,eAAe;CAChB;AACD;EACE,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB",file:"index.vue",sourcesContent:["\n@import url(../../assets/css/common.css);\n.contain[data-v-596a6686] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding-top: 4.4rem;\n  padding-bottom: 1.5rem;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  z-index: -1;\n}\n.searchOrder[data-v-596a6686] {\n  position: relative;\n  height: .78125rem;\n  padding: 0.15625rem 0;\n}\n.searchOrder input[data-v-596a6686] {\n    display: block;\n    width: 60%;\n    height: 0.625rem;\n    margin: auto;\n    border: none;\n    border-bottom: 1px solid #fff;\n    color: #fff;\n    font-size: 0.5rem;\n    text-align: center;\n}\n.searchOrder button.clearBtn[data-v-596a6686] {\n    position: absolute;\n    top: 0.3125rem;\n    right: 20%;\n    width: 0.375rem;\n    height: 0.375rem;\n    background: url(../../assets/img/purchase/6_delect.png) no-repeat;\n    background-size: 100% 100%;\n}\n.searchOrder input[data-v-596a6686]::-webkit-input-placeholder, .searchOrder textarea[data-v-596a6686]::-webkit-input-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]:-moz-placeholder, .searchOrder textarea[data-v-596a6686]:-moz-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]::-moz-placeholder, .searchOrder textarea[data-v-596a6686]::-moz-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.searchOrder input[data-v-596a6686]:-ms-input-placeholder, .searchOrder textarea[data-v-596a6686]:-ms-input-placeholder {\n    color: #fff;\n    text-align: center;\n}\n.bottomBtn[data-v-596a6686] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background: #fff;\n}\n.bottomBtn li[data-v-596a6686] {\n    float: left;\n    height: 1.25rem;\n    width: 5rem;\n    line-height: 1.25rem;\n    text-align: center;\n    font-size: 17px;\n}\n.setIn[data-v-596a6686] {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 50%;\n  margin-left: -2.5rem;\n  height: 1.25rem;\n  width: 5rem;\n  color: #fff;\n  font-size: 0.53125rem;\n}\n.skinA .head[data-v-596a6686] {\n  background: #007aff;\n}\n.skinA .searchOrder[data-v-596a6686] {\n  background: #007aff;\n}\n.skinA .searchOrder input[data-v-596a6686] {\n    background: #007aff;\n}\n.skinA .bottomBtn li[data-v-596a6686] {\n  color: #465e7e;\n}\n.skinA .bottomBtn li.on[data-v-596a6686] {\n  background: #007aff;\n  color: #fff;\n}\n.skinA .setIn[data-v-596a6686] {\n  background: #007aff;\n}\n.skinB .head[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinB .searchOrder[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinB .searchOrder input[data-v-596a6686] {\n    background: #31c3b0;\n}\n.skinB .bottomBtn li[data-v-596a6686] {\n  color: #22877a;\n}\n.skinB .bottomBtn li.on[data-v-596a6686] {\n  background: #31c3b0;\n  color: #fff;\n}\n.skinB .setIn[data-v-596a6686] {\n  background: #31c3b0;\n}\n.skinC .head[data-v-596a6686] {\n  background: #2f354a;\n}\n.skinC .searchOrder[data-v-596a6686] {\n  background: #2f354a;\n}\n.skinC .searchOrder input[data-v-596a6686] {\n    background: #2f354a;\n}\n.skinC .bottomBtn li[data-v-596a6686] {\n  color: #6b82b5;\n}\n.skinC .bottomBtn li.on[data-v-596a6686] {\n  background: #2f354a;\n  color: #fff;\n}\n.skinC .setIn[data-v-596a6686] {\n  background: #2f354a;\n}\n"],sourceRoot:""}])},510:function(t,n,e){n=t.exports=e(182)(),n.i(e(447),""),n.push([t.i,"\n.table-tr-op[data-v-ab5e606c] {\n  width: 100%;\n}\n.table-tr-op li[data-v-ab5e606c] {\n    float: left;\n}\n.table-tr-op > li[data-v-ab5e606c] {\n    width: 100%;\n    border-bottom: 1px solid #e1e1e1;\n}\n.table-tr-op > li li[data-v-ab5e606c] {\n      width: 2.8125rem;\n      height: 0.9375rem;\n      line-height: 0.9375rem;\n      font-size: 14px;\n      color: #666;\n      text-align: center;\n      position: relative;\n      padding: 0 0.125rem;\n      box-sizing: border-box;\n      overflow-y: hidden;\n}\n.table-tr-op > li li[data-v-ab5e606c]:nth-child(2), .table-tr-op > li li[data-v-ab5e606c]:nth-child(4) {\n      overflow-y: hidden;\n}\n.table-tr-op > li li[data-v-ab5e606c]:after {\n      display: block;\n      content: '';\n      width: 1px;\n      height: 0.625rem;\n      background: #e1e1e1;\n      position: absolute;\n      top: 0.15625rem;\n      right: 0;\n}\n.table-tr-op > li li[data-v-ab5e606c]:last-child:after {\n      width: 0;\n}\n.table-tr-op > li li[data-v-ab5e606c]:first-child {\n      width: 1.5625rem;\n}\n.table-tr-op > li li.paddingLfet20[data-v-ab5e606c] {\n      padding-left: 0.625rem;\n}\n.table-tr-op li.on input[data-v-ab5e606c] {\n    color: #38ce54;\n}\n.table-tr-op li.on li[data-v-ab5e606c] {\n    color: #38ce54;\n}\n","",{version:3,sources:["/Users/mankuangji/Desktop/web/PDA-V/src/components/table-tr-op.vue"],names:[],mappings:";AAEA;EACE,YAAY;CACb;AACD;IACI,YAAY;CACf;AACD;IACI,YAAY;IACZ,iCAAiC;CACpC;AACD;MACM,iBAAiB;MACjB,kBAAkB;MAClB,uBAAuB;MACvB,gBAAgB;MAChB,YAAY;MACZ,mBAAmB;MACnB,mBAAmB;MACnB,oBAAoB;MACpB,uBAAuB;MACvB,mBAAmB;CACxB;AACD;MACM,mBAAmB;CACxB;AACD;MACM,eAAe;MACf,YAAY;MACZ,WAAW;MACX,iBAAiB;MACjB,oBAAoB;MACpB,mBAAmB;MACnB,gBAAgB;MAChB,SAAS;CACd;AACD;MACM,SAAS;CACd;AACD;MACM,iBAAiB;CACtB;AACD;MACM,uBAAuB;CAC5B;AACD;IACI,eAAe;CAClB;AACD;IACI,eAAe;CAClB",file:"table-tr-op.vue",sourcesContent:["\n@import url(./../assets/css/common.css);\n.table-tr-op[data-v-ab5e606c] {\n  width: 100%;\n}\n.table-tr-op li[data-v-ab5e606c] {\n    float: left;\n}\n.table-tr-op > li[data-v-ab5e606c] {\n    width: 100%;\n    border-bottom: 1px solid #e1e1e1;\n}\n.table-tr-op > li li[data-v-ab5e606c] {\n      width: 2.8125rem;\n      height: 0.9375rem;\n      line-height: 0.9375rem;\n      font-size: 14px;\n      color: #666;\n      text-align: center;\n      position: relative;\n      padding: 0 0.125rem;\n      box-sizing: border-box;\n      overflow-y: hidden;\n}\n.table-tr-op > li li[data-v-ab5e606c]:nth-child(2), .table-tr-op > li li[data-v-ab5e606c]:nth-child(4) {\n      overflow-y: hidden;\n}\n.table-tr-op > li li[data-v-ab5e606c]:after {\n      display: block;\n      content: '';\n      width: 1px;\n      height: 0.625rem;\n      background: #e1e1e1;\n      position: absolute;\n      top: 0.15625rem;\n      right: 0;\n}\n.table-tr-op > li li[data-v-ab5e606c]:last-child:after {\n      width: 0;\n}\n.table-tr-op > li li[data-v-ab5e606c]:first-child {\n      width: 1.5625rem;\n}\n.table-tr-op > li li.paddingLfet20[data-v-ab5e606c] {\n      padding-left: 0.625rem;\n}\n.table-tr-op li.on input[data-v-ab5e606c] {\n    color: #38ce54;\n}\n.table-tr-op li.on li[data-v-ab5e606c] {\n    color: #38ce54;\n}\n"],sourceRoot:""}])},523:function(t,n,e){var a=e(504);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(446)("226a8c77",a,!0)},529:function(t,n,e){var a=e(510);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(446)("51ed53fe",a,!0)},549:function(t,n,e){e(529);var a=e(85)(e(482),e(563),"data-v-ab5e606c",null);t.exports=a.exports},557:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"modules"},[e("div",{staticClass:"h25"}),t._v(" "),e("div",{staticClass:"header"},[e("HeadComponent",[e("h1",[t._v(t._s(t.titName))])]),t._v(" "),e("div",{staticClass:"searchOrder"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchNum,expression:"searchNum"},{name:"focus",rawName:"v-focus",value:t.focusStatus,expression:"focusStatus"}],attrs:{type:"text",placeholder:"搜索"+t.titName+"单号"},domProps:{value:t.searchNum},on:{input:function(n){n.target.composing||(t.searchNum=n.target.value)}}}),t._v(" "),e("button",{staticClass:"clearBtn",attrs:{type:"button"},on:{click:t.clearInput}})])],1),t._v(" "),e("div",{staticClass:"table"},[e("TableH"),t._v(" "),e("TableTr",{staticClass:"contain",style:{height:t.height+"px"}})],1),t._v(" "),"scanbq"===t.moduleName||"scanfw"===t.moduleName?e("button",{staticClass:"setIn",attrs:{type:"button"},on:{click:t.setIn}},[t._v(t._s(t.btnName))]):t._e(),t._v(" "),"salestockup"===t.moduleName||"salesoutput"===t.moduleName?e("ul",{staticClass:"bottomBtn clearfix"},[e("li",{class:{on:t.bottomBtn},on:{click:function(n){t.sales("salestockup")}}},[t._v("销售备货")]),t._v(" "),e("li",{class:{on:!t.bottomBtn},on:{click:function(n){t.sales("salesoutput")}}},[t._v("销售出库")])]):t._e(),t._v(" "),"scanbq"===t.moduleName||"scanfw"===t.moduleName?e("ul",{staticClass:"bottomBtn clearfix"},[e("li",{class:{on:t.bottomBtn},on:{click:function(n){t.productScan("scanfw")}}},[t._v("扫防伪码")]),t._v(" "),e("li",{class:{on:!t.bottomBtn},on:{click:function(n){t.productScan("scanbq")}}},[t._v("扫标签码")])]):t._e()])},staticRenderFns:[]}},563:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ul",{staticClass:"clearfix table-tr-op"},[t._l(t.orders,function(n,a){return"productScan"!==t.name?e("li",{on:{click:function(e){t.toOrderDetail(n[0],n[2])}}},[e("ul",[e("li",[t._v(t._s(a+1))]),t._v(" "),e("li",[t._v(t._s(n[0]))]),t._v(" "),e("li",[e("input",{attrs:{disabled:"disabled"},domProps:{value:n[1]}})]),t._v(" "),e("li",[t._v(t._s(n[2]))])])]):t._e()}),t._v(" "),t._l(t.productScanList,function(n,a){return"productScan"===t.name?e("li",{class:{on:n[3]}},[e("ul",[e("li",[t._v(t._s(a+1))]),t._v(" "),e("li",[e("input",{attrs:{disabled:"disabled"},domProps:{value:n[0]}})]),t._v(" "),e("li",[e("input",{attrs:{disabled:"disabled"},domProps:{value:n[1]}})]),t._v(" "),e("li",[t._v(t._s(n[2]))])])]):t._e()})],2)},staticRenderFns:[]}}});