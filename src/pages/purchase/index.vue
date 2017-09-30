<!-- <keep-alive> -->
<template>
  <div class="purchase" v-bind:style="{height: height+'px'}">
    <div class="header">
      <HeadComponent>
        <h1>采购入库</h1>
      </HeadComponent>
      <input type="text" class="searchOrder" placeholder="搜索生产入库单号">
    </div>
    <button @click="searchOrder">订单查询</button>
    <div class="table">
      <TableH></TableH>
      <TableTr></TableTr>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {pathLocal, V} from '../../js/variable.js'
import HeadComponent from '../../components/header'
import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Purchase',
  components: {HeadComponent, TableH, TableTr},
  data () {
    return {
      height: document.documentElement.clientHeight,
      orderArr: [{'num': '00002401', 'warehouse': '凯奇仓库', 'area': '内蒙古'}, {'num': '00002402', 'warehouse': '凯奇仓库', 'area': '内蒙古'}, {'num': '00002403', 'warehouse': '凯奇仓库', 'area': '内蒙古'}]
    }
  },
  computed: {

  },
  methods: {
    setOrders(arr) {
      this.$store.commit('setOrders', arr)
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    getOrderList: function() {
      let _this = this
      // let url = 'http://10.12.0.153:50100/RESTAdapter/purchase/getcity?WERKS=1010&LGORT=1001'
      let url = pathLocal + '/purchase/getlist.php'
      _this.loadingShow(true)
      V.get(url).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText)
        let arr = data.MT_Purchase_GetInCity_Resp.Item
        _this.setOrders(arr)
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    searchOrder() {
      let arr = []
      let str = '4000000002'
      let orderArr = this.$store.state.orders
      for (let i in orderArr) {
        if (str.indexOf(i) !== -1) {
          arr.push(orderArr[i])
        }
      }
      console.log(arr)
      this.$store.commit('setOrders', arr)
    }
  },
  created: function() {
    this.getOrderList()
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

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .head{
      background: $color;
    }
    .searchOrder{
      border-bottom: 1px solid #000;
    }
  }
}
</style>
