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
          <li>采购订单号/提货单：<span>{{snDetail.BUS_NO}}</span></li>
          <li>销售订单号：<span>{{snDetail.VGBEL}}</span></li>
          <li>物料编码：<span>{{snDetail.MATNR}}</span></li>
          <li>物料描述：<span>{{snDetail.MATKL}}</span></li>
          <li>库存单位：<span>{{snDetail.VRKME}}</span></li>
          <li>计划交货数：<span>{{parseInt(snDetail.LFIMG)}}</span></li>
          <div v-if="ifFB">
            <li>SN（条码）：<span>{{snDetailFB.ZTIAOMA_FB}}</span></li>
            <li>分包序号：<span>{{snDetailFB.ZFBXH}}</span></li>
            <li>分包描述：<span>{{snDetailFB.ZFBMS}}</span></li>
            <li>分包规格：<span>{{snDetailFB.ZGUIG}}</span></li>
            <li>包装件数：<span>{{snDetailFB.ZFBSL}}</span></li>
            <li>分包方式：<span>{{snDetailFB.ZFBFS}}</span></li>
          </div>
<!--           <li>状态：<span>{{snDetail.ZJYZT}}</span></li> -->
<!--           <li>库存代号：<span>{{snDetail.VGBEL}}</span></li>
<li>库存地点：<span>{{snDetail.VGBEL}}</span></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
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
    },
    snDetail() {
      return this.$store.state.snDetail
    },
    ifFB() {
      return this.$store.state.ifFB
    },
    snDetailFB() {
      console.log('777')
      console.log(this.$store.state.snDetailFB)
      return this.$store.state.snDetailFB
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
