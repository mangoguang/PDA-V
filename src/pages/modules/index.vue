<!-- <keep-alive> -->
<template>
  <div class="modules">
    <div class="h25"></div>
    <div class="header">
      <HeadComponent>
        <h1>{{titName}}</h1>
      </HeadComponent>
      <div class="searchOrder">
        <input v-model="searchNum" v-focus="focusStatus" type="text" :placeholder="'搜索' + titName + '单号'">
        <button @click="clearInput" class="clearBtn" type="button"></button>
      </div>
    </div>
    <div class="table">
      <TableH></TableH>
      <TableTr 
      class="contain" 
      v-bind:style="{height: height+'px'}"
      ></TableTr>
    </div>
    <button v-if="moduleName === 'scanbq' || moduleName === 'scanfw'" @click="setIn" class="setIn" type="button">{{btnName}}</button>
    <ul class="bottomBtn clearfix" v-if="moduleName === 'salestockup' || moduleName === 'salesoutput'">
      <li :class="{on: bottomBtn}" @click="sales('salestockup')">销售备货</li>
      <li :class="{on: !bottomBtn}" @click="sales('salesoutput')">销售出库</li>
    </ul>
    <ul class="bottomBtn clearfix" v-if="moduleName === 'scanbq' || moduleName === 'scanfw'">
      <li :class="{on: bottomBtn}" @click="productScan('scanfw')">扫防伪码</li>
      <li :class="{on: !bottomBtn}" @click="productScan('scanbq')">扫标签码</li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, V, cloneObj} from '../../js/variable.js'
import HeadComponent from '../../components/header'
import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr-op'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Modules',
  components: {HeadComponent, TableH, TableTr},
  data () {
    return {
      height: document.documentElement.clientHeight,
      orderArr: [],
      // 将获取的订单列表保存到本地
      orders: [],
      searchNum: '',
      focusStatus: true,
      titName: this.$route.query.moduleName,
      moduleName: this.$route.params.module,
      factoryNum: this.$route.query.factoryNum,
      warehouse: this.$route.query.warehouse,
      warehouseNum: this.$route.query.warehouseNum,
      bottomBtn: true,
      btnName: '',
      printVal: localStorage.getItem('printVal')
    }
  },
  computed: {
    bottomBtnName() {
      return this.$store.state.bottomBtnName
    },
    productScanList() {
      return this.$store.state.productScanList
    }
  },
  watch: {
    'searchNum': function(val) {
      if (this.$route.params.module === 'productScan') {
        this.scan()
      } else {
        this.searchOrder()
      }
    }
  },
  methods: {
    setbottomBtnName(name) {
      this.$store.commit('bottomBtnName', name)
    },
    // 设置表头标题
    setTableH() {
      if (this.$route.params.module === 'productScan') {
        this.$store.commit('tableH', ['序号', '品名', '条码', '状态'])
      } else {
        this.$store.commit('tableH', ['序号', '入库单号', '归属仓库', '客户地址'])
      }
    },
    setProductScanList(arr) {
      this.$store.commit('productScanList', arr)
    },
    // 将订单列表提交到store
    setOrders(arr) {
      this.$store.commit('setOrders', arr)
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    clearInput() {
      this.searchNum = ''
    },
    // url
    orderListParams() {
      let temp = this.moduleName
      let url = path.sap + temp + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // if (this.moduleName === 'stock') {
      //   url = path.sap + this.bottomBtnName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // } else if (this.moduleName === 'purchase') {
      //   url = path.sap + this.moduleName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // } else if (this.moduleName === 'product') {
      //   url = path.sap + this.moduleName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // }
      return url
    },
    // 从后台获取订单列表
    getOrderList: function(url) {
      let _this = this
      // let url = path.local + '/purchase/getlist.php'
      _this.loadingShow(true)
      let data = new Promise(function(resolve, reject) {
        V.get(url).then(function(data) {
          _this.loadingShow(false)
          data = JSON.parse(data.responseText)
          resolve(data)
        }).catch((res) => {
          alert('请求超时！')
          _this.loadingShow(false)
        })
      })
      return data
    },
    // 生产扫描
    scan() {
      let _this = this
      let url = ''
      let params = ''
      let num = this.searchNum
      if (num.length === 23 || num.length === 22 || num.length >= 27) {
        // 扫标签码
        if (this.bottomBtnName === 'scanbq') {
          url = path.sap + 'product/getorder'
          params = "{ 'Item': {SN: '" + num + "'} }"
          // params = {
          //   body: '{ "Item": {SN: "' + num + '"} }'
          // }
          _this.putInShow = true
          V.post(url, params).then(function(data) {
            _this.putInShow = false
            if (data.MT_Product_GetOrder_Resp.Item) {
              data = data.MT_Product_GetOrder_Resp.Item
              if (data[0].ZXXLX === 'S' || data[0].ZXXLX === '') {
                _this.setScanArr(data)
                _this.searchNum = ''
              } else {
                alert(data[0].ZTXXX)
                _this.searchNum = ''
              }
            }
          })
          // window.apiready = function() {
          //   api.ajax({
          //     url: url,
          //     method: 'post',
          //     async: false,
          //     timeout: 30,
          //     dataType: 'text',
          //     returnAll: false,
          //     data: params
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       let data = JSON.parse(ret)
          //       if (data.MT_Product_GetOrder_Resp.Item) {
          //         data = data.MT_Product_GetOrder_Resp.Item
          //         if (data[0].ZXXLX === 'S' || data[0].ZXXLX === '') {
          //           _this.setScanArr(data)
          //           _this.searchNum = ''
          //         } else {
          //           alert(data[0].ZTXXX)
          //           _this.searchNum = ''
          //         }
          //       }
          //       _this.putInShow = false
          //     } else {
          //       _this.putInShow = false
          //       alert(JSON.stringify(err))
          //     }
          //   })
          // }
          // window.apiready()
        } else if (this.bottomBtnName === 'scanfw') {
          // 扫防伪码
          url = path.sap + 'securitycode/verify'
          params = {
            ZFWMA: num
          }
          _this.putInShow = true
          V.get(url, params).then(function(data) {
            data = JSON.parse(data.responseText)
            _this.putInShow = false
            if (data.MT_SecurityCode_Verify_Resp.Item) {
              data = data.MT_SecurityCode_Verify_Resp.Item
              if (data.ZXXLX === 'S') {
                _this.setScanArr(_this.searchNum)
                _this.searchNum = ''
              } else {
                alert(data.ZXXTX)
                _this.searchNum = ''
              }
            }
          })
        }
      }
    },
    // 检索订单号
    searchOrder() {
      let arr = []
      let str = this.searchNum
      let temp = ''
      if (this.moduleName === 'product') {
        temp = '生产入库'
        this.$router.push({ path: '/snList/' + str + '?name=' + this.moduleName + '&moduleName=' + temp + '&warehouse=' + this.$route.query.warehouse + '&warehouseNum=' + this.$route.query.warehouseNum + '&factoryNum=' + this.$route.query.factoryNum })
      } else {
        if (str === '') {
          arr = this.orders
        } else {
          let orderArr = this.orders
          for (let i in orderArr) {
            let Str = orderArr[i][0].toString()
            if (Str.indexOf(str) !== -1) {
              arr.push(orderArr[i])
            }
          }
        }
        this.setOrders(arr)
      }
    },
    // 转化生产扫描数组
    setScanArr(data) {
      console.log(data)
      let temp = false
      let index = 0
      console.log(this.productScanList)
      if (this.productScanList.length > 0) {
        // 检查该SN是否已扫描 true时表示已扫描，将不添加入productScanList打印数组
        for (let i in this.productScanList) {
          if (this.productScanList[i][1] === this.searchNum) {
            temp = true
            index = i
          }
        }
      }
      // 扫标签码
      if (this.bottomBtnName === 'scanbq') {
        // SN条码未扫描
        if (!temp) {
          for (let i in data) {
            let arr = []
            arr[0] = data[i].MAKTX
            if (data[i].ZDEZTMA === '') {
              arr[1] = data[i].ZTIAOM
              if (data[i].ZTIAOM === this.searchNum) {
                arr[2] = data[i].ZFBMS
                arr[3] = true
              }
            } else {
              arr[1] = data[i].ZDEZTMA
              if (data[i].ZDEZTMA === this.searchNum) {
                arr[2] = data[i].ZFBMS
                arr[3] = true
              }
            }
            this.productScanList.push(arr)
          }
          this.setProductScanList(this.productScanList)
        } else {
          let Arr = cloneObj(this.productScanList)
          Arr[index][3] = true
          this.setProductScanList(Arr)
        }
      } else {
        // 扫防伪码
        if (!temp) {
          let arr = ['', data, '']
          this.productScanList.push(arr)
          this.setProductScanList(this.productScanList)
        }
      }
    },
    // 转化数组
    setTrArr(data) {
      console.log('ssssssss')
      console.log(data)
      // 转化成table-tr组件使用的数组
      let trArr = []
      // 采购入库模块
      if (this.moduleName === 'purchase') {
        data = data.MT_Purchase_GetInCity_Resp.Item
        for (let i in data) {
          let temp = []
          temp[0] = data[i].BUS_NO
          temp[1] = this.warehouse
          temp[2] = data[i].ZDDLX
          trArr.push(temp)
        }
      } else if (this.moduleName === 'salestockup' || this.moduleName === 'salesoutput') {
        // 销售备货
        if (this.bottomBtnName === 'salestockup') {
          this.bottomBtn = true
          this.titName = '销售备货'
          this.$store.commit('moduleName', '销售备货')
          data = data.MT_Salestockup_GetInCity_Resp.Document
        // 销售出库
        } else {
          this.bottomBtn = false
          this.titName = '销售出库'
          this.$store.commit('moduleName', '销售出库')
          data = data.MT_Salesoutput_GetInCity_Resp.Document
        }
        for (let i in data) {
          let temp = []
          temp[0] = data[i].BUS_NO
          temp[1] = this.warehouse
          temp[2] = data[i].LGOBE
          trArr.push(temp)
        }
      } else if (this.moduleName === 'productScan') {

      } else if (this.moduleName === 'salesreturn') {
        data = data.MT_SalesReturn_GetInCity_Resp.Document
        for (let i in data) {
          let temp = []
          temp[0] = data[i].BUS_NO
          temp[1] = this.warehouse
          temp[2] = data[i].LGOBE
          trArr.push(temp)
        }
      }
      this.setOrders(trArr)
      // 将获取的数据保存到本地变量
      this.orders = trArr
    },
    sales(bottomBtnName) {
      let _this = this
      this.moduleName = bottomBtnName
      if (this.bottomBtnName !== bottomBtnName) {
        this.setbottomBtnName(bottomBtnName)
        this.getOrderList(this.orderListParams()).then(function(data) {
          _this.setTrArr(data)
        })
      }
    },
    productScan(name) {
      // let _this = this
      // this.moduleName = this.bottomBtnName
      if (name === 'scanfw') {
        this.titName = '扫防伪码'
        this.btnName = '打印出货标签'
        this.bottomBtn = true
        this.searchNum = ''
        this.setbottomBtnName('scanfw')
        this.setProductScanList([])
      } else {
        this.titName = '扫标签码'
        this.btnName = '打印入库单'
        this.bottomBtn = false
        this.searchNum = ''
        this.setbottomBtnName('scanbq')
        this.setProductScanList([])
      }
    },
    snArr() {
      let arr = []
      for (let i in this.productScanList) {
        arr.push(this.productScanList[i][1])
      }
      return arr
    },
    setIn() {
      let _this = this
      let temp = ''
      let url = ''
      let params = ''
      // let canSetIn = true
      if (this.bottomBtnName === 'scanbq') {
        console.log(this.snArr())
        for (let i in this.snArr()) {
          temp += 'Item:{ZTIAOM:"' + this.snArr()[i] + '"},'
        }
        temp = temp.substr(0, temp.length - 1)
        url = path.sap + 'product/generateorder'
        params = '{Header:{' +
          'ZBMDH: 11,' +
          'ZBMMC: 11,' +
          'ZRKYY: 11,' +
          'ZRKEQ: 11,' +
          'ZRKSJ: 11,' +
          'ZIP: "' + this.printVal + '",' +
          temp +
        '}}'
        // params = {
        //   body: '{Header:{' +
        //     'ZBMDH: 11,' +
        //     'ZBMMC: 11,' +
        //     'ZRKYY: 11,' +
        //     'ZRKEQ: 11,' +
        //     'ZRKSJ: 11,' +
        //     'ZIP: "' + this.printVal + '",' +
        //     temp +
        //   '}}'
        // }
      } else {
        console.log(this.snArr())
        let arr = []
        let snArr = this.snArr()
        for (let i in snArr) {
          arr[i] = 'Item: {' +
            'ZFWMA: "' + snArr[i] + '",' +
            'ZIP: "' + this.printVal + '",' +
            'ZBQXH: "48"' +
          '}'
        }
        params = '{' + arr.join(',') + '}'
        // params = {
        //   body: '{' + arr.join(',') + '}'
        // }
        url = path.sap + 'securitycode/print'
      }
      // 检测扫标签码分包是否全部扫描
      // for (let i in this.productScanList) {
      //   if (!this.productScanList[i][3]) {
      //     canSetIn = false
      //   }
      // }
      _this.putInShow = true
        // if (canSetIn) {
          printCode(url, params)
          // window.apiready = function() {
          //   api.ajax({
          //     url: url,
          //     method: 'post',
          //     async: false,
          //     timeout: 30,
          //     dataType: 'text',
          //     returnAll: false,
          //     data: params
          //   },
          //   function(ret, err) {
          //     alert(JSON.stringify(ret) + ':::' + JSON.stringify(err))
          //     if (ret) {
          //       _this.putInShow = false
          //       let data = JSON.parse(ret)
          //       if (_this.bottomBtnName === 'scanbq') {
          //         data = data.MT_Produt_GenerateOrder_Resp.Header
          //       } else if (_this.bottomBtnName === 'scanfw') {
          //         data = data.MT_SecurityCode_Print_Resp.Item
          //       }
          //       alert('返回参数：：：' + JSON.stringify(data))
          //       if (data.ZXXLX === 'S') {
          //         _this.setProductScanList([])
          //         _this.searchNum = ''
          //         if (data.ZTXXX) {
          //           alert(data.ZTXXX)
          //         } else if (data.ZXXTX) {
          //           alert(data.ZXXTX)
          //         }
          //       } else {
          //         if (data.ZTXXX) {
          //           alert(data.ZTXXX)
          //         } else if (data.ZXXTX) {
          //           alert(data.ZXXTX)
          //         }
          //         _this.searchNum = ''
          //       }
          //     } else {
          //       alert(JSON.stringify(err))
          //     }
          //   })
          // }
          // window.apiready()
        // } else {
        //   alert('分包子条码未扫完。')
        // }
      function printCode(url, params) {
        V.post(url, params).then(function(data) {
          _this.putInShow = false
          if (_this.bottomBtnName === 'scanbq') {
            data = data.MT_Produt_GenerateOrder_Resp.Header
          } else if (_this.bottomBtnName === 'scanfw') {
            data = data.MT_SecurityCode_Print_Resp.Item
          }
          if (data.ZXXLX === 'S') {
            _this.setProductScanList([])
            _this.searchNum = ''
            alert(JSON.stringify(data))
            alert(data.ZXXTX)
            if (data.ZTXXX) {
              alert(data.ZTXXX)
            } else if (data.ZXXTX) {
              alert(data.ZXXTX)
            }
          } else {
            if (data.ZTXXX) {
              alert(data.ZTXXX)
            } else if (data.ZXXTX) {
              alert(data.ZXXTX)
            }
            _this.searchNum = ''
          }
        })
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el, {value}) {
          if (value) {
            el.focus()
          }
      }
    }
  },
  created: function() {
    let _this = this
    if (this.moduleName !== 'product') {
      if (this.moduleName === 'stock') {
        this.moduleName = 'salestockup'
        // 设置底部模块分类
        this.setbottomBtnName('salestockup')
      } else if (this.moduleName === 'productScan') {
        this.moduleName = 'scanfw'
        // 设置底部模块分类
        this.setbottomBtnName('scanfw')
        this.bottomBtn = true
        this.btnName = '打印出货标签'
      }
      if (this.$route.params.module !== 'productScan') {
        this.getOrderList(this.orderListParams()).then(function(data) {
          _this.setTrArr(data)
        })
      }
    }
    this.setTableH()
    this.setOrders(this.orders)
    this.$store.commit('loadingShow', true)
    this.$store.commit('isOP', true)
    this.$store.commit('changeSkin', localStorage.getItem('skinCol'))
  },
  mounted() {
    this.loadingShow(false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";
.contain{
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 4.2188rem;
  padding-bottom: 1.5rem;
  box-sizing: border-box;
  overflow-x: hidden;
  z-index: -1;
}
.searchOrder{
  position: relative;
  height: .78125rem;
  padding: $f5 0;
  input{
    display: block;
    width: 60%;
    height: $f20;
    margin: auto;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: $f16;
    text-align: center;
  }
  button.clearBtn{
    position: absolute;
    top: $f10;
    right: 20%;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/purchase/6_delect.png) no-repeat;
    background-size: 100% 100%;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #fff;
    text-align: center;
  } input:-moz-placeholder, textarea:-moz-placeholder {
    color: #fff;
    text-align: center;
  } input::-moz-placeholder, textarea::-moz-placeholder {
    color: #fff;
    text-align: center;
  } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #fff;
    text-align: center;
  }
}

.bottomBtn{
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  li{
    float: left;
    height: $f40;
    width: 5rem;
    line-height: $f40;
    text-align: center;
    font-size: $btnSize
  }
}

.setIn{
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  margin-left: -2.5rem;
  height: $f40;
  width: 5rem;
  color: #fff;
  font-size: $f17;
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .head{
      background: $col;
    }
    .searchOrder{
      background: $col;
      input{
        background: $col;
      }
    }
    .bottomBtn{
      li{
        color: $btnBgSubCol;
      }
      li.on{
        background: $col;
        color: #fff;
      }
    }
    .setIn{
      background: $col;
    }
  }
}
</style>
