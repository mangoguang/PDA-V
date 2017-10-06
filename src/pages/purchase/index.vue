<!-- <keep-alive> -->
<template>
  <div class="purchase">
    <div class="header">
      <HeadComponent>
        <h1>采购入库</h1>
      </HeadComponent>
      <div class="searchOrder">
        <input v-model="searchNum" v-focus="focusStatus" type="text" placeholder="搜索生产入库单号">
      </div>
    </div>
    <div class="table">
      <TableH></TableH>
      <TableTr 
      class="contain" 
      v-bind:style="{height: height+'px'}"
      ></TableTr>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {V} from '../../js/variable.js'
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
      orderArr: [{'num': '00002401', 'warehouse': '凯奇仓库', 'area': '内蒙古'}, {'num': '00002402', 'warehouse': '凯奇仓库', 'area': '内蒙古'}, {'num': '00002403', 'warehouse': '凯奇仓库', 'area': '内蒙古'}],
      // 将获取的订单列表保存到本地
      orders: [],
      searchNum: '',
      focusStatus: true
    }
  },
  computed: {

  },
  watch: {
    'searchNum': function(val) {
      this.searchOrder()
    }
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
      let url = 'http://10.12.0.153:50100/RESTAdapter/purchase/getcity?WERKS=1010&LGORT=1001'
      // let url = pathLocal + '/purchase/getlist.php'
      _this.loadingShow(true)
      V.get(url).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText)
        let arr = data.MT_Purchase_GetInCity_Resp.Item
        _this.setOrders(arr)
        // 将获取道德数据保存到本地变量
        _this.orders = arr
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    searchOrder() {
      let arr = []
      let str = this.searchNum
      if (str === '') {
        arr = this.orders
      } else {
        let orderArr = this.orders
        for (let i in orderArr) {
          let Str = orderArr[i].BUS_NO.toString()
          if (Str.indexOf(str) !== -1) {
            arr.push(orderArr[i])
          }
        }
      }
      this.setOrders(arr)
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
.contain{
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 3.4375rem;
  box-sizing: border-box;
  overflow-x: hidden;
  z-index: -1;
}
.searchOrder{
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
  }
}
</style>
