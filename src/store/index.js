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
    people: [{
      'name': '张三',
      'age': 25
    }, {
      'name': '李四',
      'age': 26
    }, {
      'name': '王五',
      'age': 27
    }]
  },
  mutations: {
    // 皮肤选择
    changeSkin: (state, skinCol) => state.skinCol = skinCol,
    // 加载动画显示/隐藏
    loadingShow: (state, x) => state.loadingShow = x,
    // 插入订单号数据
    setOrders: (state, arr) => state.orders = arr,
    // 插入SN号数据
    setSN: (state, arr) => state.SN = arr,
    // SN码详情框显示/隐藏  组件table-tr.vue
    detailBoxShow: (state, x) => state.detailBoxShow = x,
    // SN列表页checkbox复选框显示/隐藏   组件table-tr.vue
    checkBoxShow: (state, x) => state.checkBoxShow = x
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
