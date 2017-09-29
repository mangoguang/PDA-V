<!-- <keep-alive> -->
<template>
  <div class="home" v-bind:style="{height: height+'px'}">
    <h1>vuex的使用</h1>
    
    <p>{{getter}}</p>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementAsync">++</button>
    </p>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {vv} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment: state => state.count++,
//     decrement: state => state.count--
//   }
// })

export default {
  name: 'Health',
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    getter() {
      return this.$store.getters.peopleMsg
    }
  },
  methods: {
    setMap: function() {

    },
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  },
  mounted() {
    this.setMap()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
