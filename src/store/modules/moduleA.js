const state = {
  count: 0,
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
}

const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--
}

const actions = {
  incrementAsync({
    commit
  }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

const getters = {
  peopleMsg: state => {
    return state.people[1].name;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}