<!-- <用于盘点早期版本查看盘点的条码> -->


<!-- <keep-alive> -->
<template>
  <div class="edit" v-bind:style="{height: height+'px'}">
    <h2>盘点条码</h2> 
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {ajax} from './../js/variable.js'
// import {pathLocal, V} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Pandian',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {

  },
  methods: {
    loadSN() {
      let url = 'http://10.11.9.226:10083/derucci/workflow/jsp/OutData1.jsp?factory=1020&warehouse=1002'
      let params = {}
      ajax('POST', url, params).then((data) => {

      }).catch(() => {
        alert('请求超时！')
          // _this.loadingShow(false)
      })
    }
  },
  created: function () {
  },
  mounted() {
    this.loadSN()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// $skin-data: (skin-red, red),(skin-blue, blue);
// @each $skin, $color in $skin-data {
//   .#{$skin} {
//     .select{
//       background: $color;
//     }
//   }
// }
</style>
