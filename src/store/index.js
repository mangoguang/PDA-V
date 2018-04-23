// import Vue from 'vue'
// import Vuex from 'vuex'
// import moduleA from './modules/moduleA'
// Vue.use(Vuex)

// const store = new Vuex.Store({
//   modules: {
//     moduleA
//   }
// })

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    skinCol: 'skinA',
    loadingShow: true,
    detailBoxShow: false,
    checkBoxShow: false,
    orders: [],
    SN: [],
    snCopy: [],
    SNCopy: [],
    snDetail: {},
    tableH: [],
    snStatus: [],
    isTr3: true,
    isOP: true,
    snArr: [],
    checkboxVal: [],
    errorMsg: '',
    ifFB: false,
    snDetailFB: [],
    moduleName: '',
    bottomBtnName: '',
    fbData: {},
    productScanList: [],
    alertMsg: '',
    sureBoxShow: false,
    tr1: 0,
    tr2: 0,
    // 模块一级页面
    opList: [],
    // sn页面
    snList: [],
    delBtn: true,
    chekboxShow: false,
    checkboxList: [],
    scanSNVal: '',
    outinType: '',
    // 设置button的disabled属性，防止按钮多次点击
    btnDisabled: false,
    snCount: 50,
    inputVal: ''
  },
  mutations: {
    // 皮肤选择
    changeSkin: (state, skinCol) => state.skinCol = skinCol,
    // 加载动画显示/隐藏
    loadingShow: (state, x) => state.loadingShow = x,
    // 插入订单号数据
    setOrders: (state, arr) => state.orders = arr,
    // 显示入库确认框
    sureBoxShow: (state, x) => state.sureBoxShow = x,
    // 插入SN号数据
    SN: (state, arr) => state.SN = arr,
    SNCopy: (state, arr) => state.SNCopy = arr,
    snCopy: (state, arr) => state.snCopy = arr,
    // SN码详情框显示/隐藏  组件table-tr.vue
    detailBoxShow: (state, x) => state.detailBoxShow = x,
    // SN列表页checkbox复选框显示/隐藏   组件table-tr.vue
    checkBoxShow: (state, x) => state.checkBoxShow = x,
    // SN列表页SN详情  组件sn-detail.vue
    snDetail: (state, x) => state.snDetail = x,
    // table表头的标题
    tableH: (state, x) => state.tableH = x,
    // 表是否为三列
    isOP: (state, x) => state.isOP = x,
    isTr3: (state, x) => state.isTr3 = x,
    // sn列表的校验状态数组
    snStatus: (state, x) => state.snStatus = x,
    // 提交数组到store
    snArr: (state, arr) => state.snArr = arr,
    // 删除时标记是否选中
    checkboxVal: (state, arr) => state.checkboxVal = arr,
    // 扫描错误提示信息
    errorMsg: (state, x) => state.errorMsg = x,
    // 显示SN详情时是否为分包信息
    ifFB: (state, x) => state.ifFB = x,
    // sn详情的分包信息
    snDetailFB: (state, arr) => state.snDetailFB = arr,

    /* 销售备货和销售出库 */
    // 模块名称
    moduleName: (state, x) => state.moduleName = x,
    // 销售模块分类
    bottomBtnName: (state, x) => state.bottomBtnName = x,
    // 销售备货扫描参数
    fbData: (state, obj) => state.fbData = obj,
    // 生产扫描列表
    productScanList: (state, arr) => state.productScanList = arr,
    // 入库，删除是弹框显示信息
    alertMsg: (state, x) => state.alertMsg = x,
    tr1: (state, x) => state.tr1 = x,
    tr2: (state, x) => state.tr2 = x,

    // 模块一级页面
    opList: (state, arr) => state.opList = arr,
    // sn页面
    snList: (state, arr) => state.snList = arr,
    // 控制删除sn条码按钮的显示与隐藏
    delBtn: (state, x) => state.delBtn = x,
    // 控制复选框的显示隐藏
    chekboxShow: (state, x) => state.chekboxShow = x,
    // 用于表示复选框是否选中
    checkboxList: (state, x) => state.checkboxList = x,
    // 扫描输入框值
    scanSNVal: (state, x) => state.scanSNVal = x,
    // 出入库方式，（出库/入库）
    outinType: (state, x) => state.outinType = x,
    // 设置button的disabled属性，防止按钮多次点击
    btnDisabled: (state, x) => state.btnDisabled = x,
    // 显示sn条码的数量
    snCount: (state, x) => state.snCount = x,
    inputVal: (state, x) => state.inputVal = x
  },
  actions: {
    incrementAsync({
      commit
    }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    peopleMsg: state => {
      return state.people[1].name
    }
  }
})

export default store
