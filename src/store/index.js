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
    skinCol: 'skin-red',
    loadingShow: true,
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
    increment: state => state.count++,
    decrement: state => state.count--,
    // 皮肤选择
    changeSkin: (state, skinCol) => state.skinCol = skinCol,
    // 加载动画显示/隐藏
    loadingShow: (state, x) => state.loadingShow = x
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
