<!-- <keep-alive> -->
<template>
  <div class="404" v-bind:style="{height: height+'px'}">
    <h1>404页面</h1>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import { path, V } from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Login',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {

  },
  methods: {

  },
  created: function () {

  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

</style>
