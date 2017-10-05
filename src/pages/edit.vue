<!-- <keep-alive> -->
<template>
  <div class="edit" v-bind:style="{height: height+'px'}">
    <h2>设置页面</h2> 
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {pathLocal, V} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Select',
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight,
      factorys: [],
      warehouses: [],
      factorySel: '',
      warehouseSel: '',
      warehouseStatus: false
    }
  },
  computed: {

  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    }
  },
  created: function () {
  },
  mounted() {
    this.setFactorys()
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
