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
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  }
}
</script>

<style lang="scss">
@import "./assets/sass/variable.scss";
@import "./assets/css/common.css";
body{
  padding-top: 25px;
  box-sizing: border-box;
}
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
