<!-- <keep-alive> -->
<template>
  <div class="sales">
    <div class="h25"></div>
    <div class="header">
      <HeadComponent>
        <h1>{{titNameCN}}</h1>
      </HeadComponent>
      <SearchInput
      :opListClone=opListClone
      :placeholder=titNameCN
      :moduleName=titNameEN
      ></SearchInput>
    </div>
    <table border="1">
      <TableH :list=tableHList></TableH>
      <TableD 
      v-for="(arr, index) in opList" 
      :index=index 
      :arr=arr 
      :key="arr[0]"
      ></TableD>
    </table>
    <ul class="bottomBtn clearfix">
      <li :class="{on: titNameEN === 'salestockup'}" @click="sales('salestockup')">销售备货</li>
      <li :class="{on: titNameEN === 'salesoutput'}" @click="sales('salesoutput')">销售出库</li>
    </ul>
  </div>
</template>
<!-- </keep-alive> --> 

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {path, V, cloneObj, getFactorySel, getPrintPlanMsg} from '../../js/variable.js'
import {path, V, getaccount, getFactorySel} from '../../js/variable.js'
import HeadComponent from '../../components/header'
import SearchInput from '../../components/common/search-input'
import TableH from '../../components/common/table-h'
import TableD from '../../components/common/table-d'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Sales',
  // components: {HeadComponent, TableTr},
  components: {HeadComponent, SearchInput, TableH, TableD},
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: '',
      factoryNum: '',
      tableHList: ['序号', '单号', '归属仓库'],
      opListClone: [],
      titNameCN: '销售备货',
      titNameEN: 'salestockup'
    }
  },
  computed: {
    opList() {
      return this.$store.state.opList
    }
    // productScanList() {
    //   return this.$store.state.productScanList
    // }
  },
  methods: {
    loadingShow(x) {
      this.$store.commit('loadingShow', x)
    },
    setOpList(arr) {
      this.$store.commit('opList', arr)
    },
    sales(str) {
      alert(str)
      this.titNameEN = str
      if (str === 'salestockup') {
        this.titNameCN = '销售备货'
        this.getOrderList()
      } else {
        this.titNameCN = '销售出库'
        this.getOrderList()
      }
    },
    // 从后台获取订单列表
    getOrderList() {
      let _this = this
      // let temp = this.$route.params.module
      let url = path.sap + this.titNameEN + '/getcity?WERKS=' + this.factoryNum + '&LGORT=' + this.warehouseNum
      _this.loadingShow(true)
      V.get(url).then(function(data) {
        _this.loadingShow(false)
        if (_this.titNameEN === 'salestockup') {
          data = JSON.parse(data.responseText).MT_Salestockup_GetInCity_Resp.Document
        } else {
          data = JSON.parse(data.responseText).MT_Salesoutput_GetInCity_Resp.Document
        }
        let temp = data.map((obj) => [obj.BUS_NO, obj.LGOBE])
        _this.setOpList(temp)
        _this.opListClone = temp
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
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
    // 获取本地存储的账号
    getaccount(this)
    // 获取本地存储仓库信息
    getFactorySel(this)
  },
  mounted() {
    // ajax获取订单列表
    this.getOrderList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

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

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .bottomBtn{
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

