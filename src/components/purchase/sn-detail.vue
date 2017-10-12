<!-- <keep-alive> -->
<template>
  <div class="snDetail" v-show="BoxShow" v-bind:style="{height: height+'px'}">
    <div class="detailBox">
      <div style="position: relative;width: 100%;height: 100%;">
        <button 
        @click="detailBoxShow(false)" 
        class="close" 
        type="button"></button>
        <ul>
          <li>订单来源号：<span>{{snDetail.BUS_NO}}</span></li>
          <li>销售订单号：<span>000000000001</span></li>
          <li>物料编码：<span>000000000001</span></li>
          <li>物料描述：<span>A-01床架180*200</span></li>
          <li>指令号：<span>00000000001</span></li>
          <li>库存单位：<span>套</span></li>
          <li>计划入库数：<span>50</span></li>
          <li>实际入库数：<span>40</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import Vuex from 'vuex'
// import {pathLocal, V} from '../js/variable.js'
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
    },
    snDetail() {
      console.log(11111111111)
      console.log(this)
      console.log(this.$store.state.snDetail)
      return this.$store.state.snDetail
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
    padding-bottom: .5rem;
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
    ul{
      height: 100%;
      overflow-x: hidden;
      li{
        font-size: $f16;
        line-height: 2em;
        color: $textCol;
        padding-left: $f15;
        span{
          color: #333;
        }
      }
    }
  }
}
</style>
