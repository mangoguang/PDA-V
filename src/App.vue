<template>
  <div id="app" v-bind:class="skinCol">
    <Loading></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
// import Vue from 'vue'
// import Vuex from 'vuex'
// import vueResource from 'vue-resource'
import {flexible} from './js/lib/properScreen.js'
import Login from './pages/login.vue'
import store from './store'
import Loading from './components/loading'

// Vue.use(vueResource)
flexible()

export default{
  name: 'app',
  store,
  // components: {ComponentHello}
  components: {Login, Loading},
  data () {
    return {
      height: document.documentElement.clientHeight,
      apiAjaxStatus: false
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  created() {
    let _this = this
    window.apiready = function(url, params) {
      let ajax = new Promise(function(resolve, reject) {
        api.ajax({
          url: url,
          method: 'post',
          async: false,
          timeout: 30,
          dataType: 'text',
          returnAll: false,
          data: params
        },
        function(ret, err) {
          if (ret) {
            let data = JSON.parse(ret)
            resolve(data)
          } else {
            if (_this.apiAjaxStatus) {
              _this.apiAjaxStatus = true
              alert('请求超时！')
            }
            resolve(false)
          }
        })
      })
      return ajax
    }
  }
}
</script>

<style lang="scss">
@import "./assets/sass/variable.scss";
@import "./assets/css/common.css";
.h25{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 25px;
  width: 100%;
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .h25{
      background: $col;
    }
  }
}
</style>
