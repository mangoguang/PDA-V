<!-- <keep-alive> -->
<template>
  <div class="snList">
    <div class="h25"></div>
    <div @click="errorBoxHide" v-show="errorShow">
      <ScanError></ScanError>
    </div>
    <div @click="putIn" v-show="putInShow">
      <PutIn>
        <p>{{alertMsg}}</p>
      </PutIn>
    </div>
    <div class="snDetail">
      <SNDetail></SNDetail>
    </div>
    <div class="headBox">
      <HeadComponent>
        <h1>{{moduleName}}</h1>
        <button v-show="canDel" @click="checkBoxShowFn(showCheckbox)" class="delBtn"></button>
      </HeadComponent>
      <ul class="snBox clearfix">
        <li>
          <input :value="'单号：' + opNum" disabled="disabled">
        </li>
        <li v-show="canDel">
          <input type="text" v-model="inputVal" placeholder="条码" v-focus="focusStatus">
          <button @click="clearInput" class="clearInput"></button>
        </li>
      </ul>
      <ul class="statusBox clearfix">
        <li @click="btn1" :class="{on: btnStatus[0]}">产品：{{orderCount}}</li>
        <li @click="btn2" :class="{on: btnStatus[1]}">应扫：{{scanCount}}</li>
        <li @click="btn3" :class="{on: btnStatus[2]}">已扫：{{hadscanCount}}</li>
        <li @click="btn4" :class="{on: btnStatus[3]}">未扫：{{scanCount - hadscanCount}}</li>
      </ul>
    </div>
    <div class="table">
      <TableH></TableH>
      <!-- <table border="1">
        <tr>
          <th>Month</th>
          <th></th>
          <th>Savings</th>
          <th>Savings</th>
        </tr>
        <tr>
          <td>January</td>
          <td></td>
          <td>January</td>
          <td>$100JanuaryJanuaryJanuaryJanuaryJanuaryJanuary</td>
        </tr>
        <tr>
          <td>JanuaryJanuaryJanuary</td>
          <td></td>
          <td>January</td>
          <td>$100</td>
        </tr>
      </table> -->
      <TableTr class="contain" v-bind:style="{height: height+'px'}"></TableTr>
      <div @click="sureIn" v-if="!checkBoxShow && !btnStatus[0]"><Btn class="btn100 sure">{{setinBtnName}}</Btn></div>
      <ul class="delCancel clearfix">
        <li @click="delSN" v-if="checkBoxShow && !btnStatus[0]"><Btn class="btn100 del">删除</Btn></li>
        <li @click="cancel" v-if="checkBoxShow && !btnStatus[0]"><Btn class="btn100 gray cancel">取消</Btn></li>
      </ul>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HeadComponent from '../../components/header'
import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr-sn'
import ScanError from '../../components/purchase/scan-error'
import PutIn from '../../components/purchase/put-in'
import SNDetail from '../../components/purchase/sn-detail'
import Btn from '../../components/btn'
import { path, V, getFactorySel } from '../../js/variable.js'
// import apiFn from '../../js/lib/api.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'snList',
  components: {HeadComponent, TableH, TableTr, ScanError, PutIn, SNDetail, Btn},
  data () {
    return {
      height: document.documentElement.clientHeight,
      setinBtnName: '确认入库',
      account: '',
      BUS_NO: this.$route.params.num,
      // BUS_NO: '4500000266',
      focusStatus: true,
      opNum: this.$route.params.num,
      // 按钮对应的数据
      orderCount: 0,
      scanCount: 0,
      hadscanCount: 0,
      // 扫码错误弹框显示/隐藏
      errorShow: false,
      putInShow: false,
      inputVal: '',
      showCheckbox: false,
      btnStatus: [false, true, false, false],
      // 用于判断是否添加sn数组的status属性
      addStatus: true,
      // ifVerify为true，即在应扫按钮亮是才可扫码校验
      ifVerify: true,
      canDel: true,
      moduleName: this.$route.query.moduleName,
      urlParams: this.$route.query.name,
      // 1为可以获取订单列表，2为不可获取且为分包，3为合包，4为不是分包也不是合包
      orderType: null,
      // 用于判断是否第一次push数组
      firstPush: true,
      factory: '',
      factoryNum: '',
      warehouseNum: '',
      ZDDLX: this.$route.query.ZDDLX,
      clearsnArr: true, // 用于销售模块snArr初始化
      salestockupNum: 0
    }
  },
  watch: {
    'inputVal': function() {
      if (this.ifVerify) {
        this.verify()
      } else {
        alert('请切换到应扫状态！')
      }
    }
  },
  computed: {
    alertMsg() {
      return this.$store.state.alertMsg
    },
    checkBoxShow() {
      return this.$store.state.checkBoxShow
    },
    checkboxVal() {
      return this.$store.state.checkboxVal
    },
    btnNum() {
      return this.status
    },
    snArr() {
      return this.$store.state.snArr
    },
    sns() {
      return this.$store.state.SN
    },
    fbData() {
      return this.$store.state.fbData
    }
  },
  methods: {
    setalertMsg(x) {
      this.$store.commit('alertMsg', x)
    },
    getaccount() {
      // 获取本地存储账号信息
      let accountMsg = localStorage.getItem('accountMsg')
      if (accountMsg) {
        let obj = eval('(' + accountMsg + ')')
        this.account = obj.account
      } else {
        console.log('没有本地存储')
      }
    },
    // 点击头部切换按钮
    btn1() {
      this.$store.commit('tableH', ['序号', '物料描述', '数量'])
      this.setIsTr3(true)
      this.btnStatus = [true, false, false, false]
      this.turnArr(this.snArr)
      this.ifVerify = false
      this.canDel = false
    },
    btn2() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, true, false, false]
      this.turnArr(this.snArr)
      this.ifVerify = true
      this.canDel = true
      this.focusStatus = true
    },
    btn3() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, false, true, false]
      this.turnArr(this.snArr)
      this.filtrateArr(true)
      this.ifVerify = false
      this.canDel = false
    },
    btn4() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, false, false, true]
      this.turnArr(this.snArr)
      this.filtrateArr(false)
      this.ifVerify = false
      this.canDel = false
    },
    setIsTr3(x) {
      this.$store.commit('isTr3', x)
    },
    setFbData(arr) {
      this.$store.commit('fbData', arr)
    },
    setSNArr(arr) {
      this.$store.commit('snArr', arr)
    },
    // 设置表头标题
    setTableH() {
      this.$store.commit('tableH', ['序号', '物料', '描述', '数量'])
    },
    // SN列表checkbox复选框显示/隐藏
    checkBoxShowFn(x) {
      if (this.canDel) {
        this.showCheckbox = !x
        this.$store.commit('checkBoxShow', this.showCheckbox)
      }
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    errorBoxHide() {
      this.errorShow = false
    },
    putIn() {
      this.putInShow = false
    },
    clearInput() {
      this.inputVal = ''
    },
    sureIn() {
      this.setSureIn()
      this.$store.commit('checkBoxShow', false)
      this.showCheckbox = false
    },
    cancel() {
      this.$store.commit('checkBoxShow', false)
      this.showCheckbox = false
    },
    setSN(arr) {
      this.$store.commit('SN', arr)
    },
    snListUrl() {
      let [params, temp] = [{}, this.urlParams]
      if (temp === 'salestockup' || temp === 'salesoutput' || temp === 'salesreturn') {
        params = {
          VBELN: this.opNum,
          WERKS: this.factoryNum,
          LGORT: this.warehouseNum
        }
      } else if (temp === 'purchase') {
        params = {
          BUS_NO: this.BUS_NO,
          ZDDLX: this.ZDDLX,
          WERKS: this.factoryNum,
          LGORT: this.warehouseNum
        }
      } else if (temp === 'product') {
        params = {
          ZRKDH: this.opNum
        }
      } else if (temp === 'allotinbound' || temp === 'allot') {
        params = {
          EBELN: this.opNum,
          WERKS: this.factoryNum,
          LGORT: this.warehouseNum
        }
      }
      let url = path.sap + temp + '/getsn'
      this.getSNList(url, params)
    },
    getSNList(url, params) {
      let _this = this
      _this.loadingShow(true)
      V.get(url, params).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText)
        _this.turnArrParams(data)
        _this.addStatus = false
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    turnArrParams(data) {
      let arr = ''
      if (this.urlParams === 'salestockup') {
        if (data.MT_Salestockup_GetSN_Resp.Header) {
          arr = data.MT_Salestockup_GetSN_Resp.Header
          this.salestockupNum = parseInt(arr[0].LFIMG)
        }
        this.setinBtnName = '确认备货'
      } else if (this.urlParams === 'salesoutput') {
        if (data.MT_Salesoutput_GetSN_Resp.Header) {
          arr = data.MT_Salesoutput_GetSN_Resp.Header
        }
        this.setinBtnName = '确认出库'
      } else if (this.urlParams === 'purchase') {
        if (data.MT_Purchase_GetSN_Resp.Header) {
          arr = data.MT_Purchase_GetSN_Resp.Header
        }
      } else if (this.urlParams === 'product') {
        if (data.MT_Product_GetSN_Resp.Header.Item) {
          arr = data.MT_Product_GetSN_Resp.Header.Item
          for (let i in arr) {
            arr[i].status = false
          }
        }
      } else if (this.urlParams === 'salesreturn') {
        if (data.MT_SalesReturn_GetSN_Resp.Header) {
          arr = data.MT_SalesReturn_GetSN_Resp.Header
        }
      } else if (this.urlParams === 'allotinbound') {
        if (data.MT_AllotInbound_GetSN_Resp.Header) {
          arr = data.MT_AllotInbound_GetSN_Resp.Header
        }
      } else if (this.urlParams === 'allot') {
        if (data.MT_Allot_GetSN_Resp.Header) {
          arr = data.MT_Allot_GetSN_Resp.Header
        }
        this.setinBtnName = '确认出库'
      }
      // 讲sn码列表数组保存到store
      // 采购入库模块
      if (this.orderType === 1) {
        this.setSNArr(arr)
      } else if (this.orderType === 2) {
        // 销售备货
        this.setSNArr(arr)
        this.setFbData(arr[0])
      } else if (this.orderType === 3) {
        this.setSNArr(arr)
      }
      // if (this.orderType === 2) {
      //   this.turnArr([])
      // } else {
        this.turnArr(arr)
      // }
    },
    checkStatus(ZJYZT, urlParams) {
      console.log(ZJYZT + '::' + urlParams)
      let status = false
      if (urlParams === 'purchase') {
        if (ZJYZT === 1 || ZJYZT === 9 || ZJYZT === 'Z') {
          status = true
        } else {
          status = false
        }
      } else if (urlParams === 'salestockup') {
        if (ZJYZT === 2) {
          status = true
        } else {
          status = false
        }
      } else if (urlParams === 'salesoutput') {
        if (ZJYZT === 3) {
          status = true
        } else {
          status = false
        }
      } else if (urlParams === 'salesreturn') {
        if (ZJYZT === 1) {
          status = true
        } else {
          status = false
        }
      } else if (urlParams === 'allot') {
        if (ZJYZT === 8) {
          status = true
        } else {
          status = false
        }
      } else if (urlParams === 'allotinbound') {
        if (ZJYZT === 1) {
          status = true
        } else {
          status = false
        }
      }
      return status
    },
    verifyStatus() {
      let temp = 0
      if (this.urlParams === 'purchase' || this.urlParams === 'allotinbound') {
        temp = 1
      } else if (this.urlParams === 'salestockup') {
        temp = 2
      } else if (this.urlParams === 'salesoutput') {
        temp = 3
      } else if (this.urlParams === 'salesreturn') {

      }
      return temp
    },
    // 转化成组件table-tr-sn.vue的通用数组数据
    turnArr(arr) {
      // 计算产品数量
      if (arr === undefined || arr.length === undefined) {
        this.orderCount = 0
      } else {
        this.orderCount = arr.length
      }
      // trArr为临时数组   num用于计算应扫数量
      let [trArr, checkboxVal, num, num3] = [[], [], 0, 0]
      if (arr.length >= 0) {
        for (let i in arr) {
          // 页面初次加载时执行
          if (this.addStatus) {
            arr[i].status = false
          }
          let temp = {}
          // 标准包
          // if (arr[i].Item === null || arr[i].Item === undefined) {
          if (!arr[i].Item) {
            num++
            // temp.status = false
            checkboxVal.push(false)
            temp.arr = []
            temp.arr[0] = arr[i].MATKL // 物料描述
            if (this.urlParams === 'product') {
              if (arr[i].ZDEZTMA === '') {
                temp.arr[1] = arr[i].ZTIAOM // SN条码
              } else {
                temp.arr[1] = arr[i].ZDEZTMA // SN条码
              }
              temp.arr[5] = arr[i].status
            } else {
              temp.arr[1] = arr[i].ZTIAOM // SN条码
              if (this.checkStatus(arr[i].ZJYZT, this.urlParams)) {
              temp.arr[5] = true
              } else {
                temp.arr[5] = arr[i].status // 是否校验状态码
              }
            }
            // 计算已扫描数量
            if (temp.arr[5]) {
              num3++
            }
            temp.arr[2] = arr[i].LGOBE // 库存地点描述
            temp.arr[3] = arr[i].BUS_NO // 采购订单号/内向交货单
            temp.arr[4] = parseInt(arr[i].LFIMG) // 计划交货数
            temp.arr[6] = arr[i].ITEM_NO // 行号
          } else {
            // 分包
            // if (arr[i].Item[0].ZFBFS === 1) {
            //   temp.status = true
            // } else if (arr[i].Item[0].ZFBFS === 2) {
            //   // 合包
            //   if (this.checkStatus(arr[i].ZJYZT, this.urlParams)) {
            //     temp.status = true
            //   } else {
            //     temp.status = false
            //   }
            // }
            checkboxVal.push(false)
            temp.status = true // 标记是否含子条码
            temp.arr = []
            temp.arr[0] = arr[i].MATKL
            let arr1 = []
            let arr2 = []
            for (let j in arr[i].Item) {
              num++
              // 页面初次加载时执行
              if (this.addStatus) {
                arr2.push(false)
              }
              arr1.push(arr[i].Item[j].ZTIAOMA_FB)
              if (this.checkStatus(arr[i].Item[j].ZJYZT, this.urlParams)) {
                arr2[j] = true
                num3++
              }
            }
            temp.arr[1] = arr1
            temp.arr[2] = arr2
            temp.arr[3] = arr[i].BUS_NO
            temp.arr[4] = parseInt(arr[i].LFIMG)
            temp.arr[5] = arr[i].status // 是否校验状态码
            temp.arr[6] = arr[i].ITEM_NO
            // if (this.checkStatus(arr[i].ZJYZT, this.urlParams)) {
            //   temp.arr[5] = true
            //   num3++
            // } else {
              // temp.arr[5] = arr[i].status // 是否校验状态码
            // }
          }
          this.hadscanCount = num3
          trArr.push(temp)
        }
      }
      // 标示SN码是否扫描的状态数组
      this.setSN(trArr)
      this.scanCount = num
      // if (this.addStatus) {
      //   this.status4 = num
      // }
      this.$store.commit('checkboxVal', checkboxVal)
    },
    // 校验sn码
    verify() {
      let num = this.inputVal
      if (num.length === 23 || num.length === 22 || num.length >= 27) {
        if (this.orderType === 1) {
          this.verify1()
        } else if (this.orderType === 2) {
          this.verify2()
        } else {
          this.verify3()
        }
      }
    },
    verify1() {
      let [num, arr, _this, fbtype, index, subindex] = [this.inputVal, this.snArr, this, 0, 0, 0]
      // 过滤误操作
      for (let i in arr) {
        // 标准包装
        if (arr[i].Item === null || arr[i].Item === undefined) {
          if (num === arr[i].ZTIAOM) {
            fbtype = 0
            index = i
          }
        } else {
          // 分包
          if (arr[i].Item[0].ZFBFS === 1) {
            for (let j in arr[i].Item) {
              if (num === arr[i].Item[j].ZTIAOMA_FB) {
                fbtype = 1
                index = i
                subindex = j
              }
            }
          } else {
            // 合包
            if (num === arr[i].ZTIAOM) {
              fbtype = 2
              index = i
            }
          }
        }
      }

      this.verifyAjax(this.verifyUrl1(arr, index)).then(function(data) {
        if (_this.urlParams === 'purchase') {
          data = data.MT_Purchase_Verify_Resp.Item
        } else if (_this.urlParams === 'salesoutput') {
          data = data.MT_Salesoutput_Verify_Resp.Item
        } else if (_this.urlParams === 'allotinbound') {
          data = data.MT_AllotInbound_Verify_Resp.Item
        }
        // 校验成功
        if (data.ZXXLX === 'S') {
          _this.inputVal = ''
          // 标准包
          if (fbtype === 0) {
            arr[index].ZJYZT = _this.verifyStatus()
            _this.setSNArr(arr)
            _this.turnArr(arr)
            // _this.inputVal = ''
            _this.focusStatus = true
            // _this.hadscanCount++
          } else if (fbtype === 1) {
            // 分包
            arr[index].Item[subindex].ZJYZT = _this.verifyStatus()
            _this.setSNArr(arr)
            _this.turnArr(arr)
            // _this.inputVal = ''
            _this.focusStatus = true
            // _this.hadscanCount++
          } else {
            // 合包
            arr[index].ZJYZT = _this.verifyStatus()
            // 合包主条码通过，则子条码全部通过
            let subarr = arr[index].Item
            for (let i in subarr) {
              subarr[i].ZJYZT = _this.verifyStatus()
              // _this.hadscanCount++
            }
            // _this.setSNArr(arr)
            _this.turnArr(arr)
            // _this.inputVal = ''
            _this.focusStatus = true
          }
        } else {
          _this.errorShow = true
          _this.$store.commit('errorMsg', data.ZTXXX)
          // _this.inputVal = ''
          // alert(data.ZTXXX)
        }
      })
    },
    verify2() {
      let _this = this
      // if (this.snArr.length < this.salestockupNum) {
        // if (this.snArr.length < this.scanCount) {
        this.verifyAjax(this.verifyUrl2()).then(function(data) {
          if (_this.urlParams === 'salestockup') {
            if (data.MT_Salestockup_Verify_Resp.Item) {
              data = data.MT_Salestockup_Verify_Resp.Item
            } else {
              alert('条码有误！')
            }
          } else if (_this.urlParams === 'salesreturn') {
            if (data.MT_SalesReturn_Verify_Resp.Item) {
              data = data.MT_SalesReturn_Verify_Resp.Item
            } else {
              alert('条码有误！')
            }
          } else if (_this.urlParams === 'allot') {
            if (data.MT_Allot_Verify_Resp.Item) {
              data = data.MT_Allot_Verify_Resp.Item
            } else {
              alert('条码有误！')
            }
          }
          if (data.ZXXLX === 'S') {
            _this.inputVal = ''
            _this.snListUrl()
          } else {
            _this.errorShow = true
            _this.$store.commit('errorMsg', data.ZTXXX)
            _this.inputVal = ''
          }
        })
      // } else {
      //   alert('条码已扫完！')
      // }
    },
    verify3() {
      let temp = this.snArr
      for (let i in temp) {
        if (temp[i].ZDEZTMA === '') {
          if (temp[i].ZTIAOM === this.inputVal) {
            temp[i].status = true
            this.inputVal = ''
          }
        } else {
          if (temp[i].ZDEZTMA === this.inputVal) {
            temp[i].status = true
            this.inputVal = ''
          }
        }
      }
      this.setSNArr(temp)
      this.turnArr(temp)
    },
    // verifyUrl1为采购入库校验参数
    verifyUrl1 (arr, i) {
      let params = {}
      params.url = path.sap + this.urlParams + '/verify'
      if (this.urlParams === 'purchase') {
        params.data = {
          BUS_NO: arr[i].BUS_NO,
          ITEM_NO: arr[i].ITEM_NO,
          ZDDLX: this.ZDDLX,
          ZTIAOM: this.inputVal,
          WERKS: this.factoryNum,
          LGORT: arr[i].LGORT,
          ZQRKZ: 0,
          ZDEL: 0
        }
      } else if (this.urlParams === 'salesoutput') {
        // let temp = this.snArr[0]
        params.data = {
          VBELN: arr[i].BUS_NO,
          ZTIAOM: this.inputVal,
          ZQRKZ: 0,
          ZDEL: 0,
          WERKS: arr[i].WERKS,
          LGORT: arr[i].LGORT,
          ITEM_NO: arr[i].ITEM_NO
        }
      } else if (this.urlParams === 'allotinbound') {
        // let temp = this.snArr[0]
        params.data = {
          EBELN: arr[i].BUS_NO,
          ZTIAOM: this.inputVal,
          ZQRKZ: 0,
          ZDEL: 0,
          WERKS: this.factoryNum,
          LGORT: this.warehouseNum,
          EBELP: arr[i].ITEM_NO
        }
      }
      return params
    },
    // 销售备货校验参数
    verifyUrl2 () {
      let [params, temp] = [{}, this.fbData]
      if (this.urlParams === 'salestockup' || this.urlParams === 'salesreturn') {
        params.url = path.sap + this.urlParams + '/verify'
        params.data = {
          VBELN: temp.BUS_NO,
          ZTIAOM: this.inputVal,
          ZQRKZ: 0,
          ZDEL: 0,
          WERKS: temp.WERKS,
          LGORT: temp.LGORT
          // ITEM_NO: temp.ITEM_NO
        }
      } else if (this.urlParams === 'allot') {
        params.url = path.sap + this.urlParams + '/verify'
        params.data = {
          EBELN: this.BUS_NO,
          ZTIAOM: this.inputVal,
          ZQRKZ: 0,
          ZDEL: 0,
          WERKS: this.factoryNum,
          LGORT: this.warehouseNum
          // EBELP: temp.ITEM_NO
        }
      }
      return params
    },
    verifyAjax(params) {
      let _this = this
      let data = new Promise(function(resolve, reject) {
        _this.loadingShow(true)
        // 提交校验AJAX
        V.get(params.url, params.data).then(function(data) {
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
    // ifScan参数为true则筛选已扫，为false则筛选未扫
    filtrateArr(ifScan) {
      let Arr = this.sns.concat()
      console.log(Arr)
      function delArr(arr) {
        let gettype = Object.prototype.toString
        for (let i in arr) {
          // 如果不是分包
          if (gettype.call(arr[i].arr[1]) === '[object String]') {
            if (ifScan) {
              if (!Arr[i].arr[5]) {
                arr.splice(i, 1)
                delArr(arr)
              }
            } else {
              if (Arr[i].arr[5]) {
                arr.splice(i, 1)
                delArr(arr)
              }
            }
          } else {
            for (let j in arr[i].arr[1]) {
              if (ifScan) {
                if (!arr[i].arr[2][j]) {
                  arr[i].arr[1].splice(j, 1)
                  arr[i].arr[2].splice(j, 1)
                  delArr(arr)
                }
              } else {
                if (arr[i].arr[2][j]) {
                  arr[i].arr[1].splice(j, 1)
                  arr[i].arr[2].splice(j, 1)
                  delArr(arr)
                }
              }
            }
          }
        }
        return arr
      }
      // 将分包的空数组去除
      function reDelArr(arr) {
        for (let i in arr) {
          if (arr[i].arr[1].length === 0) {
            arr.splice(i, 1)
            reDelArr(arr)
          }
        }
        return arr
      }
      this.setSN(reDelArr(delArr(Arr)))
    },
    // 检测此分包是否有分包sn码被扫描
    checkSN(Arr, str, ifScan) {
      let temp = false
      let gettype = Object.prototype.toString
      // 第一次调用函数，Arr为空数组
      if (Arr.length > 0) {
        for (let i in Arr) {
          // 该元素是否为数组
          if (gettype.call(Arr[i].arr[1]) !== '[object String]') {
            // 筛选已扫的
            if (ifScan) {
              if (Arr[i].arr[1].indexOf(str) === -1) {
                temp = true
              }
            // 筛选未扫的
            } else {
              if (Arr[i].arr[1].indexOf(str) === -1) {
                temp = true
              }
            }
          }
        }
      } else {
        temp = true
      }
      return temp
    },
    // 确认入库
    setSureIn() {
      let [_this, params, url] = [this, '', '']
      if (this.urlParams === 'salestockup' || this.urlParams === 'salesoutput' || this.urlParams === 'salesreturn') {
        params = '{ "item": {VBELN: ' + this.BUS_NO + ', ZGH: "' + this.account + '", ZQRKZ: 1 } }'
        // params = {
        //   body: '{ "item": {VBELN: ' + this.BUS_NO + ', ZGH: "' + this.account + '", ZQRKZ: 1 } }'
        // }
      } else if (this.urlParams === 'purchase') {
        params = '{ "Item": {BUS_NO: ' + this.BUS_NO + ', ZQRKZ: 1, ZDDLX: "' + this.ZDDLX + '", ZGH: "' + this.account + '"} }'
        // params = {
        //   body: '{ "Item": {BUS_NO: ' + this.BUS_NO + ', ZQRKZ: 1, ZDDLX: "' + this.ZDDLX + '", ZGH: "' + this.account + '"} }'
        // }
      } else if (this.urlParams === 'product') {
        let myDate = new Date()
        function turnDate(num) {
          if (num < 10) {
            num = '0' + num
          }
          return num
        }
        params = {
          ZRKDH: this.BUS_NO,
          ZGZRY: '' + this.account + '',
          ZGZRQ: '' + myDate.getFullYear() + turnDate(myDate.getMonth() + 1) + turnDate(myDate.getDate()),
          ZGZSJ: '' + myDate.getHours() + turnDate(myDate.getMinutes()) + turnDate(myDate.getSeconds()),
          LGORT: this.warehouseNum
        }
        // params = {
        //   body: {
        //     ZRKDH: this.BUS_NO,
        //     ZGZRY: '' + this.account + '',
        //     ZGZRQ: '' + myDate.getFullYear() + turnDate(myDate.getMonth() + 1) + turnDate(myDate.getDate()),
        //     ZGZSJ: '' + myDate.getHours() + turnDate(myDate.getMinutes()) + turnDate(myDate.getSeconds()),
        //     LGORT: this.warehouseNum
        //   }
        // }
      } else if (this.urlParams === 'allot') {
        params = '{ "Item": {EBELN: ' + this.BUS_NO + ', ZQRKZ: 1, ZGH: "' + this.account + '", WERKS: "' + this.factoryNum + '", LGORT: "' + this.warehouseNum + '"} }'
        // params = {
        //   body: '{ "Item": {EBELN: ' + this.BUS_NO + ', ZQRKZ: 1, ZGH: "' + this.account + '", WERKS: "' + this.factoryNum + '", LGORT: "' + this.warehouseNum + '"} }'
        // }
      } else if (this.urlParams === 'allotinbound') {
        params = '{ "Item": {EBELN: ' + this.BUS_NO + ', ZQRKZ: 1, ZGH: "' + this.account + '", WERKS: "' + this.factoryNum + '", LGORT: "' + this.warehouseNum + '"} }'
        // params = {
        //   body: '{ "Item": {EBELN: ' + this.BUS_NO + ', ZQRKZ: 1, ZGH: "' + this.account + '", WERKS: "' + this.factoryNum + '", LGORT: "' + this.warehouseNum + '"} }'
        // }
      }
      if (this.urlParams === 'product') {
        url = path.sap + this.urlParams + '/orderpost'
      } else {
        url = path.sap + this.urlParams + '/confirm'
      }
      this.putInShow = true
      if (this.urlParams === 'product') {
        let _this = this
        // if (this.status4 === 0) {
          V.get(url, params).then(function(data) {
            data = JSON.parse(data.responseText)
            if (data.MT_Product_OrderPost_Resp.Item) {
              data = data.MT_Product_OrderPost_Resp.Item
              if (data.ZXXLX === 'S') {
                alert('入库成功!入库凭证为' + data.ZTXXX)
                _this.$router.back()
              } else {
                alert(data.ZTXXX)
              }
            } else {
              alert('数据缺失！')
            }
            _this.putInShow = false
            // data = JSON.parse(data.responseText)
          })
        // } else {
        //   alert('条码未扫完，不可提交数据！')
        //   _this.putInShow = false
        // }
      } else {
        _this.setalertMsg('正在入库...')
        _this.putInShow = true
        // window.apiready(url, params).then(function(data) {
        //   if (data) {
        //     tip(data)
        //     _this.putInShow = false
        //   } else {
        //     alert('请求超时！')
        //     _this.putInShow = false
        //   }
        // })
        V.post(url, params).then(function(data) {
          _this.putInShow = false
          tip(data)
        }).catch((res) => {
          alert('请求超时！')
          _this.loadingShow(false)
        })
        function tip(data) {
          if (_this.urlParams === 'purchase') {
            if (data.MT_Purchase_Confirm_Resp.Item) {
              data = data.MT_Purchase_Confirm_Resp.Item
            }
          } else if (_this.urlParams === 'salestockup') {
            if (data.MT_Salestockup_Confirm_Resp.Item) {
              data = data.MT_Salestockup_Confirm_Resp.Item
            }
          } else if (_this.urlParams === 'salesoutput') {
            if (data.MT_Salesoutput_Confirm_Resp.Item) {
              data = data.MT_Salesoutput_Confirm_Resp.Item
            }
          } else if (_this.urlParams === 'salesreturn') {
            if (data.MT_SalesReturn_Confirm_Resp.Item) {
              data = data.MT_SalesReturn_Confirm_Resp.Item
            }
          } else if (_this.urlParams === 'allot') {
            if (data.MT_Allot_Confirm_Resp.Item) {
              data = data.MT_Allot_Confirm_Resp.Item
            }
          } else if (_this.urlParams === 'allotinbound') {
            if (data.MT_AllotInbound_Confirm_Resp.Item) {
              data = data.MT_AllotInbound_Confirm_Resp.Item
            }
          }
          if (data.ZXXLX === 'S') {
            alert('入库成功!入库凭证为' + data.ZTXXX)
          } else {
            alert(data.ZTXXX)
          }
        }
      }
    },
    delSN() {
      let [_this, url, paramsArr] = [this, path.sap + 'delete/sn', []]
      for (let i in this.checkboxVal) {
        if (this.checkboxVal[i]) {
          paramsArr.push({
            BUS_NO: this.BUS_NO,
            ZTIAOM: this.snArr[i].ZTIAOM,
            ZDEL: 1,
            WERKS: this.factoryNum
          })
        }
      }
      let params = JSON.stringify({
        Item: paramsArr
      })
      // let params = {
      //   body: JSON.stringify({
      //     Item: paramsArr
      //   })
      // }
      this.setalertMsg('正在删除...')
      _this.putInShow = true
      V.post(url, params).then(function(data) {
        _this.putInShow = false
        if (data.MT_DeleteSN_Resp.Item) {
          data = data.MT_DeleteSN_Resp.Item
        }
        if (data.ZXXLX === 'S') {
          alert('删除成功！')
          _this.snListUrl()
        } else {
          alert(data.ZTXXX)
        }
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
      // window.apiready(url, params).then(function(data) {
      //   if (data) {
      //     _this.putInShow = false
      //     if (data.MT_DeleteSN_Resp.Item) {
      //       data = data.MT_DeleteSN_Resp.Item
      //     }
      //     if (data.ZXXLX === 'S') {
      //       alert('删除成功！')
      //       _this.snListUrl()
      //     } else {
      //       alert(data.ZTXXX)
      //     }
      //   } else {
      //     alert('请求超时！')
      //     _this.putInShow = false
      //   }
      // })
      this.$store.commit('checkBoxShow', false)
      this.showCheckbox = false
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
  created: function () {
    // 设置注销的回退步数
    localStorage.setItem('routeIndex', '5')
    getFactorySel(this)
    if (this.urlParams === 'purchase' || this.urlParams === 'salesoutput' || this.urlParams === 'allotinbound') {
      this.orderType = 1
    } else if (this.urlParams === 'salestockup' || this.urlParams === 'salesreturn' || this.urlParams === 'allot') {
      this.orderType = 2
    } else if (this.urlParams === 'product') {
      this.orderType = 3
    }
    this.snListUrl()
    this.setTableH()
    this.$store.commit('loadingShow', false)
    this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
    this.focusStatus = true
    this.$store.commit('changeSkin', localStorage.getItem('skinCol'))
    this.checkBoxShowFn(true) // 再次进入页面是，将sn码选取复选框隐藏
  },
  mounted() {
    this.$store.commit('isOP', false)
  }
}
</script>

<!- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.snList{
  div.table{
    width: 10rem;
    overflow: scroll;
    table{
      border-collapse: collapse;
      border: none;
      outline: none;
      background: none;
    }
    tr{
      border-bottom: 1px solid #ccc;
    }
    th,td{
      border: none;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background: none;
    }
  }
  .delBtn{
    position: absolute;
    top: 0.46875rem;
    right: $f40;
    width: $f20;
    height: $f20;
    background: url(../../assets/img/purchase/2_dustbin.png) no-repeat;
    background-size: 100% 100%;
  }
  .sure{
    bottom: $f20;
  }
  ul.delCancel{
    position: absolute;
    bottom: $f20;
    li{
      position: relative;
      float: left;
      width: 5rem;
      height: $f40;
    }
  }
  .statusBox{
    width: 9.6875rem;
    height: $f50;
    margin: 0 auto;
    background: #fff;
    border-top-left-radius: $f4;
    border-top-right-radius: $f4;
    padding-left: $f10;
    box-sizing: border-box;
    li{
      float: left;
      width: 2.03125rem;
      height: $f30;
      margin: $f10 $f10 0 0 ;
      text-align: center;
      color: #fff;
      font-size: $f10;
      line-height: $f30;
      border-radius: $f4;
      background: #b8b8b8;
      overflow-y: hidden;
    }
  }
  .snBox{
    position: relative;
    height: $f30;
    padding: 0 $f15;
    box-sizing: border-box;
    li{
      width: 3.75rem;
      float: left;
      color: #fff;
      font-size: $f18;
    }
    li:nth-child(1){
      width: 5rem;
      margin-right: $f10;
    }
    .clearInput{
      position: absolute;
      top: $f4;
      right: $f15;
      width: $f12;
      height: $f12;
      background: url(../../assets/img/purchase/6_delect.png) no-repeat;
      background-size: $f12 $f12;
    }
    input[disabled="disabled"]{
      width: 4.6rem;
      padding-right: 0;
      color: #fff;
      border-bottom: none;
    }
    input{
      position: relative;
      border-bottom: 1px solid #fff;
      display: block;
      width: 100%;
      padding: $f5 $f15 0 0;
      box-sizing: border-box;
      line-height: $f20;
      color: #fff;
      font-size: $f16;
    }
    input::-webkit-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input::-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-ms-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    }
  }
  .contain{
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 5.6875rem;
    box-sizing: border-box;
    overflow-x: hidden;
    z-index: -1;
    padding-bottom: 2.1875rem;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .snList{
      .headBox{
        background: $col;
      }
      .statusBox{
        li.on:nth-child(1){
          background: $btnBgCol;
        }
        li.on:nth-child(2){
          background: #ff9600;
        }
        li.on:nth-child(3){
          background: #38ce54;
        }
        li.on:nth-child(4){
          background: #666;
        }
      }
      .snBox{
        background: $col;
      }
    }
  }
}
</style>
