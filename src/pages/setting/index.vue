<!-- <keep-alive> -->
<template>
  <div class="setting">
    <div class="h25"></div>
    <HeadComponent>
      <h1>系统设置</h1>
    </HeadComponent>
    <ul class="setting" :style="{height: (height - 73)+'px'}">
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">标签打印设置</h2>
      </li>
      <li>
        <label for="scanPlan">打印方案</label>
        <select id="scanPlan" v-model="printPlanSelNum" @change="changePrintPlan">
          <option v-for="obj in printPlanList" :value="obj.ZBQXH" :key="obj.ZBQXH">{{ obj.ZBQMC }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="department">部门</label>
        <select id="department" v-model="departmentVal" @change="changeDepartment">
          <option v-for="name in departmentList" :value="name" :key="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="line">生产线</label>
        <select id="line" v-model="lineVal" @change="changeLine">
          <option v-for="name in lineList" :value="name" :key="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="print">打印机</label>
        <select id="print" v-model="printVal" @change="changePrint">
          <option v-for="obj in printList" :value="obj.printercode" :key="obj.printercode">{{ obj.printercode }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">单据打印设置</h2>
      </li>
      <li>
        <label for="line1">仓库/生产线</label>
        <select id="line1" v-model="lineVal1" @change="changeLine1">
          <option v-for="name in lineList1" :value="name" :key="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="print1">打印机</label>
        <select id="print1" v-model="printVal1" @change="changePrint1">
          <option v-for="obj in printList1" :value="obj.printercode" :key="obj.printercode">{{ obj.printercode }}</option>
        </select>
        <span></span>
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
        <select id="factory" v-model="factoryNum" @change="changeFactory(true)">
          <option v-for="obj in factoryList" :value="obj.code">{{ obj.name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="warehouse">仓库</label>
        <select id="warehouse" v-model="warehouseNum" @change="changeFactory(false)">
          <option v-for="obj in warehouseList" :value="obj.code">{{ obj.name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <button type="button" @click="logout">退出账号</button>
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
import {path, V, getFactorySel, getPrintPlanMsg, ajax} from '../../js/variable.js'
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
      lineVal: localStorage.getItem('lineVal'),
      lineList: [],
      lineVal1: localStorage.getItem('lineVal1'),
      lineList1: [],
      printVal: localStorage.getItem('printVal'),
      printList: [], // 标签打印机
      printVal1: localStorage.getItem('printVal1'),
      printList1: [], // 标签打印机
      departmentVal: localStorage.getItem('departmentVal'),
      departmentList: [],
      fwPrintIPVal: '', // 标签打印机ip
      djPrintIPVal: '192.168.1.50', // 单据打印机ip
      typeList: ['skinA', 'skinB', 'skinC'], // 风格选择
      typeVal: localStorage.getItem('skinCol'),
      factoryList: [],
      factory: '',
      factoryNum: '',
      warehouseList: [],
      warehouse: '',
      warehouseNum: ''
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
        // password: md5(this.warehouse).toLocaleUpperCase()
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }
      _this.loadingShow(true)
      ajax('POST', url, params).then((data) => {
        if (data.status) {
          _this.factoryList = data.factorys
          _this.setWarehouse()
        }
      }).catch(() => {
        alert('请求超时！')
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
        factory: this.factoryNum
      }

      _this.loadingShow(true)
      ajax('POST', url, params).then((data) => {
        _this.loadingShow(false)
        _this.warehouse = data.warehouse[0].name
        localStorage.setItem('factoryMsg', '{factory: "' + _this.factory + '",warehouse: "' + _this.warehouse + '", factoryNum: "' + _this.factoryNum + '", warehouseNum: "' + _this.warehouseNum + '"}')
        console.log(localStorage.getItem('factoryMsg'))
        if (data.status) {
          _this.warehouseList = data.warehouse
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    getModule() {
      let _this = this
      let url = path.sap + 'securitycode/getmodule'
      _this.putInShow = true
      ajax('GET', url, null).then((data) => {
        _this.putInShow = false
        console.log('pppppoooo', data)
        data = data.MT_SecurityCode_GetModule_Resp.Item
        _this.printPlanList = data
        let temp = localStorage.getItem('printPlanMsg')
        if (!temp) {
          _this.printPlanSelNum = data[0].ZBQXH
          localStorage.setItem('printPlanMsg', JSON.stringify(data[0]))
        }
      }).catch(() => {
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
    getDepartment() {
      let _this = this
      let url = path.oa + '/PDAPrinterF.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }
      _this.putInShow = true
      ajax('POST', url, params).then((data) => {
        data = data.factorys
        _this.putInShow = false
        _this.departmentList = data.map((param) => param.factorycode)
        if (!_this.departmentVal && data.length > 0) {
          _this.departmentVal = data[0].factorycode
          localStorage.setItem('departmentVal', data[0].factorycode)
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    changeDepartment() {
      localStorage.setItem('departmentVal', this.departmentVal)
    },
    getLine() {
      let _this = this
      let url = path.oa + '/PDAPrinterH.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.departmentVal
      }
      _this.putInShow = true
      ajax('POST', url, params).then((data) => {
        data = data.warehouse
        _this.putInShow = false
        _this.lineList = data.map((param) => param.housecode)
        if (!_this.lineVal && data.length > 0) {
          _this.lineVal = data[0].housecode
          localStorage.setItem('lineVal', data[0].housecode)
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    // getLine(lineVal, lineList, setItemName) {
    //   let _this = this
    //   let url = path.oa + '/PDAPrinterH.jsp'
    //   let obj = this.getAccountMsg()
    //   let params = {
    //     account: obj.account,
    //     password: md5(obj.password).toLocaleUpperCase(),
    //     factory: this.departmentVal
    //   }
    //   _this.putInShow = true
    //   ajax('POST', url, params).then((data) => {
    //     data = data.warehouse
    //     _this.putInShow = false
    //     lineList = data.map((param) => param.housecode)
    //     console.log('jjjj', lineList)
    //     console.log(_this.lineList)
    //     console.log('eee', lineVal, data.length)
    //     if (!lineVal && data.length > 0) {
    //       console.log(lineVal)
    //       lineVal = data[0].housecode
    //       localStorage.setItem('' + setItemName, data[0].housecode)
    //       console.log(lineVal)
    //     }
    //   }).catch(() => {
    //     alert('请求超时！')
    //       _this.loadingShow(false)
    //   })
    // },
    changeLine() {
      localStorage.setItem('lineVal', this.lineVal)
    },
    getLine1() {
      let _this = this
      let url = path.oa + '/PDAPrinterH.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.departmentVal
      }
      _this.putInShow = true
      ajax('POST', url, params).then((data) => {
        data = data.warehouse
        _this.putInShow = false
        _this.lineList1 = data.map((param) => param.housecode)
        if (!_this.lineVal1 && data.length > 0) {
          _this.lineVal1 = data[0].housecode
          localStorage.setItem('lineVal1', data[0].housecode)
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    changeLine1() {
      localStorage.setItem('lineVal1', this.lineVal1)
    },
    getPrint() {
      let _this = this
      let url = path.oa + '/PDAPrinterR.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.departmentVal,
        house: this.lineVal
      }
      _this.putInShow = true
      ajax('POST', url, params).then((data) => {
        _this.putInShow = false
        console.log('88888', data)
        data = data.printers
        _this.printList = data
        if (!_this.printVal && data.length > 0) {
          _this.printVal = data[0].printercode
          localStorage.setItem('printVal', data[0].printercode)
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    // 将打印机名称缓存到本地
    changePrint() {
      localStorage.setItem('printVal', this.printVal)
    },
    getPrint1() {
      let _this = this
      let url = path.oa + '/PDAPrinterR.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.departmentVal,
        house: this.lineVal1
      }
      _this.putInShow = true
      ajax('POST', url, params).then((data) => {
        _this.putInShow = false
        data = data.printers
        _this.printList1 = data
        if (!_this.printVal1 && data.length > 0) {
          _this.printVal1 = data[0].printercode
          localStorage.setItem('printVal1', data[0].printercode)
        }
      }).catch(() => {
        alert('请求超时！')
          _this.loadingShow(false)
      })
    },
    // 将打印机名称缓存到本地
    changePrint1() {
      localStorage.setItem('printVal1', this.printVal1)
    },
    // 将工厂信息缓存到本地
    changeFactory(status) {
      localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "' + this.factoryNum + '", warehouseNum: "' + this.warehouseNum + '"}')
        console.log(localStorage.getItem('factoryMsg'))
      if (status) {
        this.setWarehouse()
      }
    },
    logout() {
      let _this = this
      let url = path.oa + '/PDALoginOut.jsp'
      let obj = this.getAccountMsg()
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }
      _this.putInShow = true
      V.get(url, params).then(function(data) {
        data = JSON.parse(data.responseText)
        _this.putInShow = false
        if (data.status === 'true') {
          localStorage.setItem('accountMsg', "{account: '" + obj.account + "'," +
              "password: '1'}")
          _this.$router.go(0 - parseInt(localStorage.getItem('routeIndex')))
        }
        console.log('注销登录')
        console.log(data)
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    }
  },
  created() {
    this.loadingShow(false)
    getPrintPlanMsg(this)
    getFactorySel(this)
    this.setSkinCol(localStorage.getItem('skinCol'))
    // 获取防伪打印模板
    this.getModule()
    // 获取生产线列表
    this.getLine()
    this.getLine1()
    // 获取打印机列表
    this.getPrint()
    this.getPrint1()
    this.getFactory()
    this.getDepartment()
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
    overflow-x: hidden;
    padding: .5rem $f15;
    box-sizing: border-box;
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
