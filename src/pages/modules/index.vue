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
    <ul class="stockBtn clearfix" v-if="moduleName === 'stock'">
      <li :class="{on: salsesBtn}" @click="sales('salestockup')">销售备货</li>
      <li :class="{on: !salsesBtn}" @click="sales('salesoutput')">销售出库</li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, V} from '../../js/variable.js'
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
      salsesBtn: true
    }
  },
  computed: {
    salesName() {
      return this.$store.state.salesName
    }
  },
  watch: {
    'searchNum': function(val) {
      this.searchOrder()
    }
  },
  methods: {
    setSalesName(name) {
      this.$store.commit('salesName', name)
    },
    // 设置表头标题
    setTableH() {
      this.$store.commit('tableH', ['序号', '入库单号', '归属仓库', '客户地址'])
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
      let url = path.sap + this.moduleName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // if (this.moduleName === 'stock') {
      //   url = path.sap + this.salesName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // } else if (this.moduleName === 'purchase') {
      //   url = path.sap + this.moduleName + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      // } else if (this.moduleName === 'production') {
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
    // 检索订单号
    searchOrder() {
      let arr = []
      let str = this.searchNum
      let temp = ''
      if (this.moduleName === 'production') {
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
          temp[2] = data[i].ZDDLX
          trArr.push(temp)
        }
      } else if (this.moduleName === 'stock') {
        // 销售备货
        if (this.salesName === 'salestockup') {
          this.salsesBtn = true
          this.titName = '销售备货'
          this.$store.commit('moduleName', '销售备货')
          data = data.MT_Salestockup_GetInCity_Resp.Document
        // 销售出库
        } else {
          this.salsesBtn = false
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
      }
      this.setOrders(trArr)
      // 将获取的数据保存到本地变量
      this.orders = trArr
    },
    sales(salesName) {
      let _this = this
      if (this.salesName !== salesName) {
        this.setSalesName(salesName)
        this.getOrderList(this.orderListParams()).then(function(data) {
          _this.setTrArr(data)
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
    // 设置销售模块分类
    this.setSalesName('salestockup')
    let _this = this
    if (this.moduleName !== 'production') {
      this.getOrderList(this.orderListParams()).then(function(data) {
        _this.setTrArr(data)
      })
    }
    this.setTableH()
    this.setOrders(this.orders)
    this.$store.commit('loadingShow', true)
    this.$store.commit('isOP', true)
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

.stockBtn{
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
    .stockBtn{
      li{
        color: $btnBgSubCol;
      }
      li.on{
        background: $col;
        color: #fff;
      }
    }
  }
}
</style>
