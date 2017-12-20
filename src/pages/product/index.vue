<!-- <keep-alive> -->
<template>
  <div class="product">
    <div class="h25"></div>
    <div class="header">
      <HeadComponent>
        <h1>生产入库</h1>
      </HeadComponent>
      <ScanInput></ScanInput>
    </div>
  </div>
</template>
<!-- </keep-alive> --> 

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {path, V, cloneObj, getFactorySel, getPrintPlanMsg} from '../../js/variable.js'
// import {path, V, getaccount, getFactorySel} from '../../js/variable.js'
import HeadComponent from '../../components/header'
import ScanInput from '../../components/common/scan-input'
// import TableComponent from '../../components/common/table'
// import TableTr from '../../components/table-tr-op'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Product',
  // components: {HeadComponent, TableTr},
  components: {HeadComponent, ScanInput},
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  methods: {

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
  created: function() {

  },
  mounted() {

  }
}
</script>

