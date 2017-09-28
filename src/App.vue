<template>
  <div id="app" v-bind:class="skinCol">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
// import vueResource from 'vue-resource'
import {flexible} from './js/lib/properScreen.js'
import Login from './pages/login.vue'
import store from './store'

// Vue.use(vueResource)
flexible();

export default{
  name: 'app',
  store,
  // components: {ComponentHello}
  components: {Login},
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    skinCol(){
      return this.$store.state.skinCol;
    }
  }
}
</script>

<style>
@import "./assets/css/normalize.css"
#app{
	background: red;
}
</style>
