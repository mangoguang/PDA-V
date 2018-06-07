<!-- <keep-alive> -->
<template>
  <div class="setting">
    <div class="h25"></div>
    <HeadComponent :settingShow="false">
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
        <label for="redPrint">打印机(红)</label>
        <select id="redPrint" v-model="redPrintVal" @change="changeRedPrint">
          <option v-for="obj in printList" :value="obj.printercode" :key="obj.printercode">{{ obj.printercode }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="blackPrint">打印机(黑)</label>
        <select id="blackPrint" v-model="blackPrintVal" @change="changeBlackPrint">
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
      <select-component
      @changeSelectVal="selectType"
      :dataName="'PDType'"
      :selectVal="PDType"
      :labelText = "'盘点方式'"
      :firstOption = "'请选择盘点方式'"
      :selectArr="[{name: '精盘', code: 1}, {name: '通盘', code: 0}].map(function(item) {
        return {name: item.name, key: item.code}
      })"></select-component>
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
import SelectComponent from '../../components/check/select'
import md5 from 'js-md5'
import mango, {path, V, getPrintPlanMsg, ajax} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Setting',
  components: {HeadComponent, SelectComponent},
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
      redPrintVal: localStorage.getItem('redPrintVal'),
      blackPrintVal: localStorage.getItem('blackPrintVal'),
      printList: [], // 标签打印机
      printVal1: localStorage.getItem('printVal1'),
      printList1: [], // 标签打印机
      departmentVal: localStorage.getItem('departmentVal'),
      departmentList: [],
      fwPrintIPVal: '', // 标签打印机ip
      djPrintIPVal: '192.168.1.50', // 单据打印机ip
      typeList: ['skinA', 'skinB', 'skinC'], // 风格选择
      typeVal: mango.storage.getStorage(localStorage.getItem('account'), 'skinCol')['skinCol'],
      PDType: '',
      factoryList: [],
      factory: '',
      factoryNum: '',
      warehouseList: [],
      warehouse: '',
      warehouseNum: '',
      account: localStorage.getItem('account'),
      password: ''
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  created() {
    console.log(123123, this.typeVal)
    mango.storage.setData(this, 'factory')
    .setData(this, 'factoryNum')
    .setData(this, 'warehouse')
    .setData(this, 'warehouseNum')
    .setData(this, 'password')
    // alert(localStorage.getItem('settingData'))
    // if (!localStorage.getItem('settingData')) {
    //   localStorage.setItem('settingData', '{}')
    // }
  },
  mounted() {
    this.loadingShow(false)
    getPrintPlanMsg(this)
    // getFactorySel(this)
    // this.setSkinCol(localStorage.getItem('skinCol'))
    // 获取防伪打印模板
    this.getModule()
    this.getFactory()
    this.getDepartment()
    console.log(888, localStorage.getItem('settingData'))
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    setSkinCol(x) {
      this.$store.commit('changeSkin', x)
      mango.storage.setStorage(this.account, 'skinCol', x)
    },
    changeType() {
      // localStorage.setItem('skinCol', this.typeVal)
      // mango.storage.setStorage(this.account, 'skinCol', this.typeVal)
      this.setSkinCol(this.typeVal)
    },
    // getAccountMsg: function() {
    //   let accountMsg = localStorage.getItem('accountMsg')
    //   let obj = eval('(' + accountMsg + ')')
    //   return obj
    // },
    // 由select子组件触发
    selectType(value) {
      mango.storage.setStorage(this.account, 'PDType', value)
      this.PDType = value
      console.log(mango.storage.getStorage(this.account))
    },
    // 获取工厂列表
    getFactory() {
      let _this = this
      // let obj = this.getAccountMsg()
      let url = path.oa + '/factory'
      let params = {
        // name: this.factorySel,
        // password: md5(this.warehouse).toLocaleUpperCase()
        account: this.account,
        password: this.password
      }
      _this.loadingShow(true)
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        if (data.status) {
          _this.factoryList = data.factorys
          _this.setWarehouse()
        }
      }).catch(() => {
        alert('请求超时1！')
          _this.loadingShow(false)
      })
    },
    setWarehouse: function() {
      let _this = this
      // let url = path.local + '/warehouse_sel.php'
      let url = path.oa + '/warehouse'
      // let obj = this.getAccountMsg()
      // 获取本地存储账号信息
      let params = {
        account: this.account,
        password: this.password,
        factory: this.factoryNum
      }

      _this.loadingShow(true)
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        _this.loadingShow(false)
        _this.warehouse = data.warehouse[0].name
        mango.storage.setStorage(_this.account, 'warehouse', _this.warehouse)
        // localStorage.setItem('factoryMsg', '{factory: "' + _this.factory + '",warehouse: "' + _this.warehouse + '", factoryNum: "' + _this.factoryNum + '", warehouseNum: "' + _this.warehouseNum + '"}')
        console.log(localStorage.getItem('factoryMsg'))
        if (data.status) {
          _this.warehouseList = data.warehouse
        }
      }).catch(() => {
        alert('请求超时2！')
          _this.loadingShow(false)
      })
    },
    getModule() {
      let _this = this
      let url = path.sap + 'securitycode/getmodule'
      _this.putInShow = true
      ajax('GET', url, null).then((data) => {
        _this.putInShow = false
        data = data.MT_SecurityCode_GetModule_Resp.Item
        // 添加空方案
        const emptyObj = {
          ZBQMC: '不打印',
          ZBQXH: ''
        }
        data.unshift(emptyObj)

        _this.printPlanList = data
        let temp = localStorage.getItem('printPlanMsg')
        if (!temp) {
          _this.printPlanSelNum = data[0].ZBQXH
          localStorage.setItem('printPlanMsg', JSON.stringify(data[0]))
        }
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
      let url = path.oa + '/printDept'
      // let obj = this.getAccountMsg()
      let params = {
        account: this.account,
        password: this.password
      }
      _this.putInShow = true
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        data = data.factorys
        _this.putInShow = false
        _this.departmentList = data.map((param) => param.factorycode)
        if (!_this.departmentVal && data.length > 0) {
          _this.departmentVal = data[0].factorycode
          localStorage.setItem('departmentVal', data[0].factorycode)
        }
        // 获取生产线列表
        _this.getLine()
        // _this.getLine1()
      }).catch(() => {
        alert('请求超时3！')
          _this.loadingShow(false)
      })
    },
    changeDepartment() {
      localStorage.setItem('departmentVal', this.departmentVal)
      // 获取生产线列表
      this.getLine()
      // this.getLine1()
    },
    getLine() {
      let _this = this
      let url = path.oa + '/printProdLine'
      // let url = path.oa + '/PDAPrinterH.jsp'
      // let obj = this.getAccountMsg()
      let params = {
        account: this.account,
        password: this.password,
        factory: this.departmentVal
      }
      _this.putInShow = true
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        data = data.warehouse
        _this.putInShow = false
        _this.lineList = data.map((param) => param.housecode)
        _this.lineList1 = data.map((param) => param.housecode)
        if (!_this.lineVal && data.length > 0) {
          _this.lineVal = data[0].housecode
          _this.lineVal1 = data[0].housecode
          // localStorage.setItem('lineVal', data[0].housecode)
          localStorage.setItem('lineVal', data[0].housecode)
          localStorage.setItem('lineVal1', data[0].housecode)
        }
        // 获取打印机列表
        _this.getPrint()
        _this.getPrint1()
      }).catch(() => {
        alert('请求超时4！')
          _this.loadingShow(false)
      })
    },
    changeLine() {
      localStorage.setItem('lineVal', this.lineVal)
      // 获取打印机列表
      this.getPrint()
    },
    // getLine1() {
    //   let _this = this
    //   let url = path.oa + '/printProdLine'
    //   // let obj = this.getAccountMsg()
    //   let params = {
    //     account: this.account,
    //     password: this.password,
    //     factory: this.departmentVal
    //   }
    //   _this.putInShow = true
    //   this.$ajax.post(url, params).then(function(res) {
    //     let data = res.data
    //   // ajax('GET', url, params).then((data) => {
    //     data = data.warehouse
    //     _this.putInShow = false
    //     _this.lineList1 = data.map((param) => param.housecode)
    //     if (!_this.lineVal1 && data.length > 0) {
    //       _this.lineVal1 = data[0].housecode
    //       localStorage.setItem('lineVal1', data[0].housecode)
    //     }
    //     // 获取打印机列表
    //     this.getPrint1()
    //   }).catch(() => {
    //     alert('请求超时5！')
    //       _this.loadingShow(false)
    //   })
    // },
    changeLine1() {
      localStorage.setItem('lineVal1', this.lineVal1)
      // 获取打印机列表
      this.getPrint1()
    },
    getPrint() {
      let _this = this
      let url = path.oa + '/printer'
      // let obj = this.getAccountMsg()
      let params = {
        account: this.account,
        password: this.password,
        factory: this.departmentVal,
        house: this.lineVal
      }
      _this.putInShow = true
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        _this.putInShow = false
        data = data.printers
        _this.printList = data
        if (!_this.redPrintVal && data.length > 0) {
          _this.redPrintVal = data[0].printercode
          localStorage.setItem('redPrintVal', data[0].printercode)
          _this.blackPrintVal = data[0].printercode
          localStorage.setItem('blackPrintVal', data[0].printercode)
        }
      }).catch(() => {
        alert('请求超时6！')
          _this.loadingShow(false)
      })
    },
    // 将打印机名称缓存到本地
    changeRedPrint() {
      localStorage.setItem('redPrintVal', this.redPrintVal)
    },
    changeBlackPrint() {
      localStorage.setItem('blackPrintVal', this.blackPrintVal)
    },
    getPrint1() {
      let _this = this
      let url = path.oa + '/printer'
      // let obj = this.getAccountMsg()
      let params = {
        account: this.account,
        password: this.password,
        factory: this.departmentVal,
        house: this.lineVal1
      }
      _this.putInShow = true
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // ajax('GET', url, params).then((data) => {
        _this.putInShow = false
        data = data.printers
        _this.printList1 = data
        if (!_this.printVal1 && data.length > 0) {
          _this.printVal1 = data[0].printercode
          localStorage.setItem('printVal1', data[0].printercode)
        }
      }).catch(() => {
        alert('请求超时7！')
          _this.loadingShow(false)
      })
    },
    // 将打印机名称缓存到本地
    changePrint1() {
      localStorage.setItem('printVal1', this.printVal1)
    },
    // 将工厂信息缓存到本地
    changeFactory(status) {
      console.log(status)
      // localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "' + this.factoryNum + '", warehouseNum: "' + this.warehouseNum + '"}')
      if (status) {
        this.setWarehouse()
      } else {
        for (let i in this.warehouseList) {
          if (this.warehouseList[i].code === this.warehouseNum) {
            this.warehouse = this.warehouseList[i].name
          }
        }
        setFactoryStorage()
        // localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "' + this.factoryNum + '", warehouseNum: "' + this.warehouseNum + '"}')
      }

      function setFactoryStorage() {
        mango.storage.setStorage(this.account, 'factory', this.factory)
        .setStorage(this.account, 'factoryNum', this.factoryNum)
        .setStorage(this.account, 'warehouse', this.warehouse)
        .setStorage(this.account, 'warehouseNum', this.warehouseNum)
      }
    },
    logout() {
      let _this = this
      let url = path.oa + '/PDALoginOut.jsp'
      // let obj = this.getAccountMsg()
      let params = {
        account: this.account,
        password: md5(this.password).toLocaleUpperCase()
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
        alert('请求超时8！')
        _this.loadingShow(false)
      })
    }
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
