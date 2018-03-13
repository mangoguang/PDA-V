<!-- <keep-alive> -->
<template>
  <div class="modules">
    <div class="h25"></div>
    <div class="header">
      <HeadComponent :settingShow="true">
        <h1>{{titName}}</h1>
      </HeadComponent>
      <div class="searchOrder">
        <input v-model="searchNum" v-focus="focusStatus" type="text" :placeholder="'搜索' + titName + '单号'">
        <button @click="clearInput" class="clearBtn" type="button"></button>
      </div>
    </div>
    <TableTr 
    class="contain" 
    v-bind:style="{height: height+'px'}"
    ></TableTr>
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
import {path, V, cloneObj, getFactorySel, getPrintPlanMsg, setParams} from '../../js/variable.js'
import HeadComponent from '../../components/header'
// import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr-op'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Modules',
  components: {HeadComponent, TableTr},
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
      factoryNum: '',
      warehouse: '',
      warehouseNum: '',
      bottomBtn: true,
      btnName: '',
      printVal: localStorage.getItem('printVal'),
      account: '',
      printPlanSelNum: '',
      dateVal: localStorage.getItem('dateVal'),
      canSetIn: true // 防止双击重复提交数据
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
      let module = this.$route.params.module
      if (module === 'productScan') {
        this.$store.commit('tableH', ['序号', '单号', '客户地址', '归属仓库'])
      } else if (module === 'purchase') {
        this.$store.commit('tableH', ['序号', '单号', '归属仓库'])
        this.setisTr3(true)
      } else if (module === 'allot') {
        this.$store.commit('tableH', ['序号', '单号', '调出仓库', '调入仓库'])
        this.setisTr3(false)
      } else if (module === 'allotinbound') {
        this.$store.commit('tableH', ['序号', '单号', '调出仓库', '调入仓库'])
        this.setisTr3(false)
      } else {
        this.$store.commit('tableH', ['序号', '单号', '归属仓库', '客户地址'])
      }
    },
    setisTr3(x) {
      this.$store.commit('isTr3', x)
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
    getaccount() {
      // 获取本地存储账号信息
      let accountMsg = localStorage.getItem('accountMsg')
      if (accountMsg) {
        let obj = eval('(' + accountMsg + ')')
        this.account = obj.account
      } else {
        // console.log('没有本地存储')
      }
    },
    // url
    orderListParams() {
      let temp = this.moduleName
      let url = ''
      if (this.moduleName === 'allotinbound' || this.moduleName === 'allot') {
        url = path.sap + temp + '/getsite?WERKS=' + this.factoryNum
      } else {
        url = path.sap + temp + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      }
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
          params = '{ "Item": {SN: "' + num + '",ZGH:"' + this.account + '", ZDATE: "' + this.dateVal + '"} }'
          params = setParams(params)
          _this.putInShow = true
          // V.post(url, params).then(function(data) {
          //   _this.putInShow = false
          //   if (data.MT_Product_GetOrder_Resp.Item) {
          //     data = data.MT_Product_GetOrder_Resp.Item
          //     if (data[0].ZXXLX === 'S' || data[0].ZXXLX === '') {
          //       _this.setScanArr(data)
          //       _this.searchNum = ''
          //     } else {
          //       alert(data[0].ZTXXX)
          //       _this.searchNum = ''
          //     }
          //   }
          // })
          window.apiready(url, params).then(function(data) {
            if (data) {
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
            } else {
              alert('请求超时！')
              _this.putInShow = false
            }
          })
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
        this.$router.push({ path: '/snList/' + str + '?name=' + this.moduleName + '&moduleName=' + temp })
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
      let temp = false
      let index = 0
      if (this.productScanList.length > 0) {
        // 检查该SN是否已扫描temp为true时表示已扫描，将不添加入productScanList打印数组
        for (let i in this.productScanList) {
          if (this.productScanList[i][1].toString() === this.searchNum) {
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
              if (data[i].ZTIAOM.toString() === this.searchNum) {
                arr[2] = data[i].ZFBMS
                arr[3] = true
              }
            } else {
              arr[1] = data[i].ZDEZTMA
              if (data[i].ZDEZTMA.toString() === this.searchNum) {
                arr[2] = data[i].ZFBMS
                arr[3] = true
              }
            }
            // if (this.moduleName === 'scanfw' || this.moduleName === 'scanbq') {
            //   let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
            //   let tempNum = 0
            //   for (let i in arr[0]) {
            //     if (reg.test(arr[0][i])) {
            //       tempNum += 14
            //     } else {
            //       tempNum += 8.5
            //     }
            //   }
            //   if (tempNum > tr1) {
            //     tr1 = tempNum
            //   }
            //   if (arr[0].length > tr2) {
            //     alert(arr[1])
            //     tr2 = arr[0].length
            //   }
            //   // this.tr1 = tr1 * 8.5
            //   // this.tr2 = tr2 * 8.5
            //   this.$store.commit('tr1', (tr1))
            //   this.$store.commit('tr2', (tr2 * 8.5))
            // }
            this.productScanList.push(arr)
          }
          this.setProductScanList(this.productScanList)
        } else {
          alert('条码已扫描！')
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
        } else {
          alert('条码已扫描！')
        }
      }
    },
    // 转化数组
    setTrArr(data) {
      // 转化成table-tr组件使用的数组
      let trArr = []
      // 采购入库模块
      if (this.moduleName === 'purchase') {
        data = data.MT_Purchase_GetInCity_Resp.Item
        for (let i in data) {
          let temp = []
          temp[0] = data[i].BUS_NO
          temp[1] = this.warehouse
          temp[2] = data[i].LGOBE
          temp[3] = data[i].ZDDLX
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
        setData(data, trArr, this)
      } else if (this.moduleName === 'productScan') {

      } else if (this.moduleName === 'salesreturn') {
        data = data.MT_SalesReturn_GetInCity_Resp.Document
        setData(data, trArr, this)
      } else if (this.moduleName === 'allotinbound' || this.moduleName === 'allot') {
        if (this.moduleName === 'allotinbound') {
          data = data.MT_AllotInbound_GetSite_Resp.Item
          this.titName = '调拨入库'
          this.$store.commit('moduleName', '调拨入库')
        } else {
          data = data.MT_Allot_GetSite_Resp.Item
          this.titName = '调拨出库'
          this.$store.commit('moduleName', '调拨出库')
        }
        setData(data, trArr, this)
      }
      function setData(data, trArr, _this) {
        for (let i in data) {
          let temp = []
          temp[0] = data[i].BUS_NO
          temp[1] = _this.warehouse
          temp[2] = data[i].LGOBE
          temp[3] = data[i].ZDDLX
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
      // 防止双击重复提交数据
      if (!this.canSetIn) {
        return false
      } else {
        this.canSetIn = false
      }
      // 扫标签码模块检测分包条码是否扫描完全
      if (this.bottomBtnName === 'scanbq') {
        let checkArr = this.productScanList.some(function(element) {
          return (element[3] === undefined)
        })
        // 不需要检测是否扫描完。 // 恢复检测
        if (checkArr) {
          alert('条码未扫完全。')
          return
        }
      }
      let [_this, temp, url, params, departmentMsg, myDate] = [this, '', '', '', eval('(' + localStorage.getItem('departmentMsg') + ')'), new Date()]
      let ZIP = localStorage.getItem('departmentVal').substr(0, 3) + '_' + localStorage.getItem('lineVal') + '_' + localStorage.getItem('printVal')
      let ZIP1 = localStorage.getItem('departmentVal').substr(0, 3) + '_' + localStorage.getItem('lineVal1') + '_' + localStorage.getItem('printVal1')
      // let canSetIn = true
      if (this.bottomBtnName === 'scanbq') {
        for (let i in this.snArr()) {
          temp += 'Item:{ZTIAOM:"' + this.snArr()[i] + '"},'
        }
        temp = temp.substr(0, temp.length - 1)
        url = path.sap + 'product/generateorder'
        function turnDate(num) {
          if (num < 10) {
            num = '0' + num
          }
          return num
        }
        params = '{Header:{' +
          'ZBMDH: "' + departmentMsg.id + '",' +
          'ZBMMC: "' + departmentMsg.name + '",' +
          'ZRKYY: "' + this.account + '",' +
          'ZRKEQ: "' + myDate.getFullYear() + turnDate(myDate.getMonth() + 1) + turnDate(myDate.getDate()) + '",' +
          'ZRKSJ: "' + myDate.getHours() + turnDate(myDate.getMinutes()) + turnDate(myDate.getSeconds()) + '",' +
          'ZIP: "' + ZIP1 + '",' +
          // 'ZIP: "' + localStorage.getItem('printVal') + '",' +
          temp +
        ', date: "' + this.dateVal + '"}}'
        params = setParams(params)
      } else {
        let arr = []
        let snArr = this.snArr()
        for (let i in snArr) {
          arr[i] = 'Item: {' +
            'ZFWMA: "' + snArr[i] + '",' +
            'ZIP: "' + ZIP + '",' +
            'ZBQXH: "' + this.printPlanSelNum + '",' +
            'ZGH: "' + this.account + '"' +
          '}'
        }
        params = '{' + arr.join(',') + ', ZDATE: "' + this.dateVal + '"}'
        console.log(params)
        params = setParams(params)
        url = path.sap + 'securitycode/print'
      }
      _this.putInShow = true
      if (this.snArr().length === 0) {
        alert('请先扫码！')
      } else {
        printCode(url, params)
      }
      function printCode(url, params) {
        // V.post(url, params).then(function(data) {
        //   _this.canSetIn = true
        //   _this.putInShow = false
        //   if (_this.bottomBtnName === 'scanbq') {
        //     data = data.MT_Produt_GenerateOrder_Resp.Header
        //   } else if (_this.bottomBtnName === 'scanfw') {
        //     data = data.MT_SecurityCode_Print_Resp.Item
        //   }
        //   if (data.ZXXLX === 'S') {
        //     _this.setProductScanList([])
        //     _this.searchNum = ''
        //     if (data.ZTXXX) {
        //       alert(data.ZTXXX)
        //     } else if (data.ZXXTX) {
        //       alert(data.ZXXTX)
        //     } else {
        //       alert('打印成功。')
        //     }
        //   } else {
        //     if (data.ZTXXX) {
        //       alert(data.ZTXXX)
        //     } else if (data.ZXXTX) {
        //       alert(data.ZXXTX)
        //     }
        //     _this.searchNum = ''
        //   }
        // })
        window.apiready(url, params).then(function(data) {
          if (data) {
            _this.putInShow = false
            if (_this.bottomBtnName === 'scanbq') {
              data = data.MT_Produt_GenerateOrder_Resp.Header
            } else if (_this.bottomBtnName === 'scanfw') {
              data = data.MT_SecurityCode_Print_Resp.Item
            }
            if (data.ZXXLX === 'S') {
              _this.setProductScanList([])
              _this.searchNum = ''
              if (data.ZTXXX) {
                alert(data.ZTXXX)
              } else if (data.ZXXTX) {
                alert(data.ZXXTX)
              } else {
                alert('打印成功。')
              }
            } else {
              if (data.ZTXXX) {
                alert(data.ZTXXX)
              } else if (data.ZXXTX) {
                alert(data.ZXXTX)
              }
              _this.searchNum = ''
            }
          } else {
            alert('请求超时！')
            _this.putInShow = false
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
    // 设置注销的回退步数
    localStorage.setItem('routeIndex', '4')
    getPrintPlanMsg(this)
    getFactorySel(this)
    let _this = this
    if (this.moduleName !== 'product') {
      if (this.moduleName === 'stock') {
        if (this.bottomBtnName === '' || this.bottomBtnName === 'scanfw' || this.bottomBtnName === 'scanbq') {
          this.moduleName = 'salestockup'
          // 设置底部模块分类
          this.setbottomBtnName('salestockup')
        } else {
          this.moduleName = this.bottomBtnName
        }
      } else if (this.moduleName === 'productScan') {
        if (this.bottomBtnName === '' || this.bottomBtnName === 'salestockup' || this.bottomBtnName === 'salesoutput') {
          this.moduleName = 'scanfw'
          // 设置底部模块分类
          this.setbottomBtnName('scanfw')
          this.btnName = '打印出货标签'
        } else {
          this.moduleName = this.bottomBtnName
          if (this.bottomBtnName === 'scanfw') {
            this.btnName = '打印出货标签'
          } else {
            this.btnName = '打印入库单'
          }
        }
      }
      if (this.bottomBtnName === 'salestockup' || this.bottomBtnName === 'scanfw') {
          this.bottomBtn = true
        } else {
          this.bottomBtn = false
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
    this.getaccount()
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
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 3.35rem;
  padding-bottom: 1.5rem;
  box-sizing: border-box;
  overflow: scroll;
  // overflow-x: hidden;
  // overflow-y: hidden;
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
