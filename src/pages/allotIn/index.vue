<!-- <keep-alive> -->
<template>
  <div class="modules">
    <div class="h25"></div>
    <div class="header">
      <HeadComponent>
        <h1>调拨入库</h1>
      </HeadComponent>
      <SearchInput
      :opListClone=opListClone
      :placeholder="'采购入库'"
      ></SearchInput>
    </div>
    <TableComponent :list=opList :tableHList=tableHList></TableComponent>
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
import TableComponent from '../../components/common/table'
// import TableTr from '../../components/table-tr-op'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Modules',
  // components: {HeadComponent, TableTr},
  components: {HeadComponent, SearchInput, TableComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: '',
      factoryNum: '',
      tableHList: ['序号', '单号', '归属仓库'],
      opListClone: []
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
    // 从后台获取订单列表
    getOrderList() {
      let _this = this
      // let temp = this.$route.params.module
      let url = path.sap + 'allotinbound/getsite?WERKS=' + this.factoryNum
      _this.loadingShow(true)
      V.get(url).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText).MT_AllotInbound_GetSite_Resp.Item
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

