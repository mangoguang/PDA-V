<!-- <keep-alive> -->
<template>
  <div class="snDetail" v-show="BoxShow" v-bind:style="{height: height+'px'}">
    <div class="detailBox">
      <div style="position: relative;width: 100%;height: 100%;">
        <button 
        @click="detailBoxShow(false)" 
        class="close" 
        type="button"></button>
        <h2>订单详情页</h2>
      </div>
    </div>
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
  name: 'snDetail',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    BoxShow() {
      return this.$store.state.detailBoxShow
    }
  },
  methods: {
    detailBoxShow: function(x) {
      this.$store.commit('detailBoxShow', x)
    }
  },
  created: function () {
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.snDetail{
  position: absolute;
  width: 100%;
  background: rgba(0,0,0,.5);
  z-index: 100;
  .detailBox{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 9.0625rem;
    height: 10rem;
    background: #fff;
    margin-left: -4.53125rem;
    margin-top: -5rem;
    padding-top: 1rem;
    box-sizing: border-box;
    border-radius: $f4;
    .close{
      position: absolute;
      top: -0.78125rem;
      right: 0;
      width: 1.4rem;
      height: .78125rem;
      background: url(../../assets/img/purchase/8_close.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
