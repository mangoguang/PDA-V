<!-- <keep-alive> -->
<template>
  <div class="setting" v-bind:style="{height: height+'px'}">
    <div class="h25"></div>
    <HeadComponent>
      <h1>系统设置</h1>
    </HeadComponent>
    <ul class="setting">
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">标签打印设置</h2>
      </li>
      <li>
        <label for="scanPlan">打印方案</label>
        <select id="scanPlan" v-model="printPlanVal">
          <option v-for="name in printPlanList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="print">打印机</label>
        <select id="print" v-model="printVal">
          <option v-for="name in printList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="fwPrintIP">打印机IP</label>
        <input id="fwPrintIP" type="text" value="192.168.1.32">
        <span class="close"></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/print.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">单据打印设置</h2>
      </li>
      <li>
        <label for="djPrintIP">打印机IP</label>
        <input id="djPrintIP" type="text" value="192.168.1.32">
        <span class="close"></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/style.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">风格选择</h2>
      </li>
      <li>
        <label for="type">风格</label>
        <select id="type" v-model="typeVal" @change="changeType">
          <option v-for="name in typeList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <h2 :style="{'background': 'url(./static/images/skinImg/' + skinCol + '/set.png) no-repeat', 'background-size': 'auto $f14', 'background-position': '0 0.1rem' }">常规设置</h2>
      </li>
      <li>
        <label for="factory">工厂选择</label>
        <select id="factory" v-model="factorySel">
          <option v-for="name in factoryList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="warehouse">仓库</label>
        <select id="warehouse" v-model="warehouseSel">
          <option v-for="name in warehouseList" :value="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <button type="button">退出账号</button>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HeadComponent from '../../components/header'
// import {pathOA} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Setting',
  components: {HeadComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      printPlanList: ['防伪小条码', '标签码'], // 打印方案
      printPlanVal: '防伪小条码',
      printList: ['理光PL-8800', '理光PL-8900'], // 标签打印机
      printVal: '理光PL-8800',
      fwPrintIPList: ['192.168.1.19', '192.168.32'], // 标签打印机ip
      fwPrintIPVal: '192.168.1.19',
      djPrintIPList: ['192.168.1.50', '192.168.52'], // 单据打印机ip
      djPrintIPVal: '192.168.1.50',
      typeList: ['skinA', 'skinB', 'skinC'], // 风格选择
      typeVal: localStorage.getItem('skinCol'),
      factoryList: ['工厂一', '工厂二', '工厂三'],
      factorySel: '工厂一',
      factorySelNum: '',
      warehouseList: ['仓库一', '仓库二', '仓库三'],
      warehouseSel: '仓库一',
      warehouseSelNum: ''
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    setSkinCol(x) {
      this.$store.commit('changeSkin', x)
    },
    changeType() {
      localStorage.setItem('skinCol', this.typeVal)
      this.setSkinCol(this.typeVal)
    },
    getFactorySel: function() {
      // 获取本地存储默认工厂
      let factoryMsg = localStorage.getItem('factoryMsg')
      let factoryObj = eval('(' + factoryMsg + ')')
      if (factoryMsg) {
        this.factorySel = factoryObj.factory
        this.factorySelNum = factoryObj.factorySelNum
        this.warehouseSel = factoryObj.warehouse
        this.warehouseSelNum = factoryObj.warehouseSelNum
      } else {
        // this.factorySel = this.factorys[0].name
      }
    },
  },
  created() {
    this.loadingShow(false)
    this.setSkinCol(localStorage.getItem('skinCol'))
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.setting{
  ul{
    padding: .5rem $f15;
  }
  li{
    position: relative;
    margin: $f5 0;
    label{
      display: inline-block;
      height: $f30;
      width: 3rem;
      line-height: $f30;
      font-size: $f14;
      color: #999;
    }
    select,option,input{
      display: inline-block;
      height: $f30;
      width: 5rem;
      font-size: $f12;
      color: #666;
      line-height: $f30;
      border: 1px solid #f0f0f0;
      border-radius: $f4;
    }
  }
  h2{
    padding-left: $f20;
  }
  li:nth-child(1) h2,li:nth-child(5) h2{
    // background: url(../../assets/img/setting/print.png) no-repeat;
    // background-size: auto $f14;
    // background-position: 0 0.1rem; 
  }
  li:nth-child(7) h2{
    background: url(../../assets/img/setting/style.png) no-repeat;
    background-size: auto $f14;
    background-position: 0 0.1rem; 
  }
  li:nth-child(9) h2{
    background: url(../../assets/img/setting/set.png) no-repeat;
    background-size: auto $f14;
    background-position: 0 0.1rem; 
  }
  button{
    display: block;
    width: 80%;
    height: $f40;
    margin: $f15 auto 0 auto;
    color: #fff;
    border-radius: $f4;
  }
  span{
    display: block;
    position: absolute;
    top: $f10;
    right: 1.2rem;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/setting/choose.png) no-repeat;
    background: auto 100%;
  }
  span.close{
    background: url(../../assets/img/setting/delect.png) no-repeat;
    background: auto 100%;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .setting{
      h2{
        font-size: $f14;
        color: $col;
      }
      button{
        background: $btnBgCol;
      }
    }
  }
}
</style>
