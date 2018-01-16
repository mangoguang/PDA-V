<!-- <keep-alive> -->
<template>
  <div class="purchaseChild">
    <div class="h25"></div>
    <div class="headBox">
      <HeadComponent :settingShow="true">
        <h1>采购入库</h1>
        <DelSNComponent></DelSNComponent>
      </HeadComponent>
      <ScanInputComponent :num=BUS_NO></ScanInputComponent>
      <BtnListComponent></BtnListComponent>
    </div>
    <div class="table-box">
      <table border="1">
        <TableHComponent :list=tableHList></TableHComponent>
        <TableDSNComponent 
        v-for="(arr, index) in snList" 
        :index=index 
        :arr=snList 
        :chekboxShow=chekboxShow
        :checkboxList=checkboxList
        :key="index"
        :class="{on: arr[2]}"
        >
          <td>{{arr[0]}}</td>
          <td>{{arr[1]}}</td>
          <td><p v-show="checkboxList[index]">匹配</p></td>
        </TableDSNComponent>
      </table>
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
import TableHComponent from '../../components/common/table-h'
import TableDSNComponent from '../../components/common/table-d-sn'
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
  components: {HeadComponent, TableHComponent, TableDSNComponent, ScanInputComponent, DelSNComponent, BtnListComponent, DelCancelBtnComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: '',
      tableHList: ['序号', '描述', '条码', '状态'],
      snListClone: [],
      BUS_NO: this.$route.params.num,
      moduleNameEN: this.$route.path.split(/\//)[1],
      factoryNum: '',
      warehouseNum: '',
      ZDDLX: this.$route.query.ZDDLX
    }
  },
  computed: {
    snList() {
      return this.$store.state.snList
    },
    chekboxShow() {
      return this.$store.state.chekboxShow
    },
    // 用于表示复选框是否选中
    checkboxList() {
      return this.$store.state.checkboxList
    },
    scanSNVal() {
      return this.$store.state.scanSNVal
    }
    // productScanList() {
    //   return this.$store.state.productScanList
    // }
  },
  watch: {
    'scanSNVal': function() {
      if (this.scanSNVal.length >= 23) {
        this.verify(this.snList[this.filter()])
      }
    }
  },
  methods: {
    loadingShow(x) {
      this.$store.commit('loadingShow', x)
    },
    setsnList(arr) {
      this.$store.commit('snList', arr)
    },
    setCheckboxList(arr) {
      this.$store.commit('checkboxList', arr)
    },
    // 从后台获取订单列表
    getSNList() {
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
        let temp = data.map((obj) => {
          let status = false
          if (obj.ZJYZT === 1 || obj.ZJYZT === 9 || obj.ZJYZT === 'Z') {
            status = true
          } else {
            status = false
          }
          return [ obj.MATKL, obj.ZTIAOM, status, obj.ITEM_NO, obj.LGORT ]
        })
        let checkboxList = data.map(() => false)
        _this.setsnList(temp)
        _this.snListClone = temp
        _this.setCheckboxList(checkboxList)
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    // 扫描校验
    verify (arr) {
      let _this = this
      let params = {}
      params.url = path.sap + this.moduleNameEN + '/verify'
      console.log(arr)
      params.data = {
        BUS_NO: this.BUS_NO,
        ITEM_NO: arr[3],
        ZDDLX: this.ZDDLX,
        ZTIAOM: this.scanSNVal,
        WERKS: this.factoryNum,
        LGORT: arr[4],
        ZQRKZ: 0,
        ZDEL: 0
      }
      this.loadingShow(true)
      V.get(params.url, params.data).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText).MT_Purchase_Verify_Resp.Item
        if (data.ZXXLX === 'S') {
          _this.getSNList()
          _this.scanSNVal('')
        } else {
          alert(data.ZTXXX)
          _this.scanSNVal('')
        }
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    // 将扫描码与sn数组匹配，并返回匹配元素下标
    filter() {
      let i = null
      this.snList.some((item, index) => {
        i = index
        return item[1] === this.scanSNVal
      })
      return i
    }
  },
  created: function() {
    // 获取本地存储的账号
    getaccount(this)
    // 获取本地存储仓库信息
    getFactorySel(this)
  },
  mounted() {
    // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // ajax获取订单列表
    this.getSNList()
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
// .headBox{
//   position: fixed;
//   top: 0;
//   left: 0;
// }
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .headBox{
      background: $col;
    }
  }
}
</style>
