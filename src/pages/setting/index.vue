<!-- <keep-alive> -->
<template>
  <div class="setting" v-bind:style="{height: height+'px'}">
    <div class="h25"></div>
    <HeadComponent>
      <h1>系统设置</h1>
    </HeadComponent>
    <ul class="setting">
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">标签打印设置</h2>
      </li>
      <li>
        <label for="scanPlan">打印方案</label>
        <select id="scanPlan" v-model="printPlanSelNum" @change="changePrintPlan">
          <option v-for="obj in printPlanList" :value="obj.ZBQXH">{{ obj.ZBQMC }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="print">打印机</label>
        <select id="print" v-model="printVal" @change="changePrint">
          <option v-for="obj in printList" :value="obj.PRINT_NAME">{{ obj.PRINT_NAME }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="fwPrintIP">打印机IP</label>
        <input id="fwPrintIP" type="text" :value="fwPrintIPVal">
        <span class="close"></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">单据打印设置</h2>
      </li>
      <li>
        <label for="djPrintIP">打印机IP</label>
        <input id="djPrintIP" type="text" value="192.168.1.32">
        <span class="close"></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/style.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">风格选择</h2>
      </li>
      <li>
        <label for="type">风格</label>
        <select id="type" v-model="typeVal" @change="changeType">
          <option v-for="name in typeList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/set.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">常规设置</h2>
      </li>
      <li>
        <label for="factory">工厂选择</label>
        <select id="factory" v-model="factorySelNum" @change="changeFactory(true)">
          <option v-for="obj in factoryList" :value="obj.code">{{ obj.name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="warehouse">仓库</label>
        <select id="warehouse" v-model="warehouseSelNum" @change="changeFactory(false)">
          <option v-for="obj in warehouseList" :value="obj.code">{{ obj.name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <button type="button">退出账号</button>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HeadComponent from '../../components/header'
import md5 from 'js-md5'
import {path, V} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Setting',
  components: {HeadComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      printPlanList: [], // 打印方案
      printPlanSel: '',
      printPlanSelNum: '',
      printList: [], // 标签打印机
      printVal: localStorage.getItem('printVal'),
      fwPrintIPVal: '', // 标签打印机ip
      djPrintIPVal: '192.168.1.50', // 单据打印机ip
      typeList: ['skinA', 'skinB', 'skinC'], // 风格选择
      typeVal: localStorage.getItem('skinCol'),
      factoryList: [],
      factorySel: '',
      factorySelNum: '',
      warehouseList: [],
      warehouseSel: '',
      warehouseSelNum: ''
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    setSkinCol(x) {
      this.$store.commit('changeSkin', x)
    },
    changeType() {
      localStorage.setItem('skinCol', this.typeVal)
      this.setSkinCol(this.typeVal)
    },
    getFactorySel: function() {
      // 获取本地存储默认工厂
      let factoryMsg = localStorage.getItem('factoryMsg')
      let factoryObj = eval('(' + factoryMsg + ')')
      if (factoryMsg) {
        this.factorySel = factoryObj.factory
        this.factorySelNum = factoryObj.factorySelNum
        this.warehouseSel = factoryObj.warehouse
        this.warehouseSelNum = factoryObj.warehouseSelNum
      } else {
        // this.factorySel = this.factorys[0].name
      }
    },
    getPrintPlanMsg() {
      let printPlanMsg = localStorage.getItem('printPlanMsg')
      console.log(printPlanMsg)
      let printPlanObj = eval('(' + printPlanMsg + ')')
      if (printPlanMsg) {
        this.printPlanSel = printPlanObj.ZBQMC
        this.printPlanSelNum = printPlanObj.ZBQXH
      }
    },
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let obj = eval('(' + accountMsg + ')')
      return obj
    },
    getFactory() {
      let _this = this
      let obj = this.getAccountMsg()
      let url = path.oa + '/PDAFactory.jsp'
      let params = {
        // name: this.factorySel,
        // password: md5(this.warehouseSel).toLocaleUpperCase()
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }
      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.factoryList = data.factorys
          _this.setWarehouse()
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
    },
    setWarehouse: function() {
      let _this = this
      // let url = path.local + '/warehouse_sel.php'
      let url = path.oa + '/PDAWareHouse.jsp'
      let obj = this.getAccountMsg()
      // 获取本地存储账号信息
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.factorySelNum
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.warehouseList = data.warehouse
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
    },
    getPrint() {
      let _this = this
      let url = path.sap + 'getprint'
      _this.putInShow = true
      V.get(url).then(function(data) {
        _this.putInShow = false
        data = JSON.parse(data.responseText).MT_GetPrint_Resp.Item
        _this.printList = data
        if (!_this.printVal && data.length > 0) {
          _this.printVal = data[0].PRINT_NAME
          localStorage.setItem('printVal', data[0].PRINT_NAME)
        }
        _this.getFactory()
      })
    },
    getModule() {
      let _this = this
      let url = path.sap + 'securitycode/getmodule'
      _this.putInShow = true
      V.get(url).then(function(data) {
        _this.putInShow = false
        data = JSON.parse(data.responseText).MT_SecurityCode_GetModule_Resp.Item
        _this.printPlanList = data
        let temp = localStorage.getItem('printPlanMsg')
        if (!temp) {
          _this.printPlanSelNum = data[0].ZBQXH
          localStorage.setItem('printPlanMsg', JSON.stringify(data[0]))
        }
        // 获取打印机列表
        _this.getPrint()
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    // 将打印方案缓存到本地
    changePrintPlan() {
      let temp = this.printPlanList
      for (let i in temp) {
        if (this.printPlanSelNum === temp[i].ZBQXH) {
          this.printPlanSel = temp[i].ZBQMC
        }
      }
      localStorage.setItem('printPlanMsg', '{ZBQMC: "' + this.printPlanSel + '", ZBQXH: "' + this.printPlanSelNum + '"}')
    },
    // 将打印机名称缓存到本地
    changePrint() {
      localStorage.setItem('printVal', this.printVal)
    },
    // 将工厂信息缓存到本地
    changeFactory(status) {
      console.log('{factory: "' + this.factorySel + '",warehouse: "' + this.warehouseSel + '", factorySelNum: "' + this.factorySelNum + '", warehouseSelNum: "' + this.warehouseSelNum + '"}')
      localStorage.setItem('factoryMsg', '{factory: "' + this.factorySel + '",warehouse: "' + this.warehouseSel + '", factorySelNum: "' + this.factorySelNum + '", warehouseSelNum: "' + this.warehouseSelNum + '"}')
      if (status) {
        this.setWarehouse()
      }
    }
  },
  created() {
    this.loadingShow(false)
    this.getFactorySel()
    this.getPrintPlanMsg()
    this.setSkinCol(localStorage.getItem('skinCol'))
    // 获取防伪打印模板
    this.getModule()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.setting{
  ul{
    padding: .5rem $f15;
  }
  li{
    position: relative;
    margin: $f5 0;
    label{
      display: inline-block;
      height: $f30;
      width: 3rem;
      line-height: $f30;
      font-size: $f14;
      color: #999;
    }
    select,option,input{
      display: inline-block;
      height: $f30;
      width: 5rem;
      font-size: $f12;
      color: #666;
      line-height: $f30;
      border: 1px solid #f0f0f0;
      border-radius: $f4;
    }
  }
  h2{
    padding-left: $f20;
  }
  li:nth-child(1) h2,li:nth-child(5) h2{
    // background: url(../../assets/img/setting/print.png) no-repeat;
    // background-size: auto $f14;
    // background-position: 0 0.1rem; 
  }
  li:nth-child(7) h2{
    background: url(../../assets/img/setting/style.png) no-repeat;
    background-size: auto $f14;
    background-position: 0 0.1rem; 
  }
  li:nth-child(9) h2{
    background: url(../../assets/img/setting/set.png) no-repeat;
    background-size: auto $f14;
    background-position: 0 0.1rem; 
  }
  button{
    display: block;
    width: 80%;
    height: $f40;
    margin: $f15 auto 0 auto;
    color: #fff;
    border-radius: $f4;
  }
  span{
    display: block;
    position: absolute;
    top: $f10;
    right: 1.2rem;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/setting/choose.png) no-repeat;
    background: auto 100%;
  }
  span.close{
    background: url(../../assets/img/setting/delect.png) no-repeat;
    background: auto 100%;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .setting{
      h2{
        font-size: $f14;
        color: $col;
      }
      button{
        background: $btnBgCol;
      }
    }
  }
}
</style>
