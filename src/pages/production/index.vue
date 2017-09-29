<!-- <keep-alive> -->
<template>
  <div class="select" v-bind:style="{height: height+'px'}">
    <h2>生产入库页面</h2>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {pathOA} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Select',
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
