<!-- <keep-alive> -->
<template>
  <div class="purchaseChild">
    <div class="h25"></div>
    <div class="headBox">
      <HeadComponent>
        <h1>采购入库</h1>
        <DelSNComponent></DelSNComponent>
      </HeadComponent>
      <!-- <ScanInputComponent :num=BUS_NO></ScanInputComponent> -->
      <BtnListComponent></BtnListComponent>
    </div>
    <div class="table-box">
      <TableSNComponent 
      :list=opList 
      :tableHList=tableHList 
      :chekboxShow=chekboxShow
      :checkboxList=checkboxList
      ></TableSNComponent>
    </div>
    <DelCancelBtnComponent 
    v-show="chekboxShow"
    :checkboxList=checkboxList
    ></DelCancelBtnComponent>
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
import TableSNComponent from '../../components/common/table-sn'
import ScanInputComponent from '../../components/sn/scan-input'
import DelSNComponent from '../../components/sn/del-sn'
import BtnListComponent from '../../components/sn/btn-list'
import DelCancelBtnComponent from '../../components/sn/del-cancel-btn'
// import TableTr from '../../components/table-tr-op'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'purchaseChild',
  // components: {HeadComponent, TableTr},
  components: {HeadComponent, TableSNComponent, ScanInputComponent, DelSNComponent, BtnListComponent, DelCancelBtnComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: '',
      tableHList: ['序号', '描述', '条码', '状态'],
      opListClone: [],
      BUS_NO: this.$route.params.num,
      factoryNum: '',
      warehouseNum: '',
      ZDDLX: this.$route.query.ZDDLX
    }
  },
  computed: {
    opList() {
      return this.$store.state.opList
    },
    chekboxShow() {
      return this.$store.state.chekboxShow
    },
    // 用于表示复选框是否选中
    checkboxList() {
      return this.$store.state.checkboxList
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
    setCheckboxList(arr) {
      this.$store.commit('checkboxList', arr)
    },
    // 从后台获取订单列表
    getOrderList() {
      let _this = this
      let params = {
        BUS_NO: this.BUS_NO,
        ZDDLX: this.ZDDLX,
        WERKS: this.factoryNum,
        LGORT: this.warehouseNum
      }
      let url = path.sap + 'purchase/getsn'
      _this.loadingShow(true)
      V.get(url, params).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText).MT_Purchase_GetSN_Resp.Header
        let temp = data.map((obj) => [obj.BUS_NO, obj.MATKL, obj.ZTIAOM])
        let checkboxList = data.map(() => false)
        _this.setOpList(temp)
        _this.opListClone = temp
        _this.setCheckboxList(checkboxList)
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

.table-box{
  width: 10rem;
  overflow: scroll;
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .headBox{
      background: $col;
    }
  }
}
</style>
