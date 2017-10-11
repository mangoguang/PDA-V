<!-- <keep-alive> -->
<template>
  <div class="snList">
    <div @click="tableTrShow" v-show="errorShow">
      <ScanError></ScanError>
    </div>
    <div @click="putIn" v-show="putInShow">
      <PutIn></PutIn>
    </div>
    <div class="snDetail">
      <SNDetail></SNDetail>
    </div>
    <div class="headBox">
      <HeadComponent>
        <h1>采购入库操作</h1>
        <button @click="checkBoxShowFn(showCheckbox)" class="delBtn"></button>
      </HeadComponent>
      <ul class="snBox clearfix">
        <li>
          <p @click="detailBoxShow(true)">单号：{{opNum}}</p>
        </li>
        <li>
          <input type="text" v-model="inputVal" placeholder="条码" v-focus="focusStatus">
          <button @click="clearInput" class="clearInput"></button>
        </li>
      </ul>
      <ul class="statusBox clearfix">
        <li class="on">产品：{{status[0]}}</li>
        <li>应扫：{{status[1]}}</li>
        <li>已扫：{{status[2]}}</li>
        <li>未扫：{{status[3]}}</li>
      </ul>
    </div>
    <div class="table">
      <TableH></TableH>
      <TableTr class="contain" v-bind:style="{height: height+'px'}"></TableTr>
      <div @click="sureIn" v-if="btnShow"><Btn class="btn100 sure">确认入库</Btn></div>
      <ul class="delCancel clearfix">
        <li @click="delSN" v-if="!btnShow"><Btn class="btn100 del">删除</Btn></li>
        <li @click="cancel" v-if="!btnShow"><Btn class="btn100 gray cancel">取消</Btn></li>
      </ul>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HeadComponent from '../../components/header'
import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr'
import ScanError from '../../components/purchase/scan-error'
import PutIn from '../../components/purchase/put-in'
import SNDetail from '../../components/purchase/sn-detail'
import Btn from '../../components/btn'
// import {pathLocal, V} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'snList',
  components: {HeadComponent, TableH, TableTr, ScanError, PutIn, SNDetail, Btn},
  data () {
    return {
      height: document.documentElement.clientHeight,
      focusStatus: true,
      opNum: this.$route.params.num,
      status: [5, 7, 4, 3],
      // 扫码错误弹框显示/隐藏
      errorShow: true,
      putInShow: true,
      inputVal: '',
      btnShow: true,
      showCheckbox: true
    }
  },
  computed: {

  },
  methods: {
    // SN列表checkbox复选框显示/隐藏
    checkBoxShowFn(x) {
      this.showCheckbox = !this.showCheckbox
      this.$store.commit('checkBoxShow', x)
    },
    detailBoxShow(x) {
      this.$store.commit('detailBoxShow', x)
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    tableTrShow() {
      this.errorShow = false
    },
    putIn() {
      this.putInShow = false
    },
    clearInput() {
      this.inputVal = ''
    },
    sureIn() {
      this.btnShow = false
    },
    delSN() {
      this.btnShow = true
    },
    cancel() {
      this.btnShow = true
    }
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
  created: function () {
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.snList{
  .delBtn{
    position: absolute;
    top: 0.46875rem;
    right: $f40;
    width: $f20;
    height: $f20;
    background: url(../../assets/img/purchase/2_dustbin.png) no-repeat;
    background-size: 100% 100%;
  }
  .sure{
    bottom: $f20;
  }
  ul.delCancel{
    position: absolute;
    bottom: $f20;
    li{
      position: relative;
      float: left;
      width: 5rem;
      height: $f40;
    }
  }
  .statusBox{
    width: 9.6875rem;
    height: $f50;
    margin: 0 auto;
    background: #fff;
    border-top-left-radius: $f4;
    border-top-right-radius: $f4;
    padding-left: $f10;
    box-sizing: border-box;
    li{
      float: left;
      width: 2.03125rem;
      height: $f30;
      margin: $f10 $f10 0 0 ;
      text-align: center;
      color: #fff;
      font-size: $f14;
      line-height: $f30;
      border-radius: $f4;
      background: #b8b8b8;
    }
  }
  .snBox{
    position: relative;
    height: $f30;
    padding: 0 $f15;
    box-sizing: border-box;
    li{
      width: 3.75rem;
      float: left;
      color: #fff;
      font-size: $f18;
    }
    li:nth-child(1){
      width: 5rem;
      margin-right: $f10;
    }
    .clearInput{
      position: absolute;
      top: $f4;
      right: $f15;
      width: $f12;
      height: $f12;
      background: url(../../assets/img/purchase/6_delect.png) no-repeat;
      background-size: $f12 $f12;
    }
    input{
      position: relative;
      border-bottom: 1px solid #fff;
      display: block;
      width: 100%;
      padding: $f5 $f15 0 0;
      box-sizing: border-box;
      line-height: $f20;
      color: #fff;
      font-size: $f16;
    }
    input::-webkit-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input::-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-ms-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    }
  }
  .contain{
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 4.90625rem;
    box-sizing: border-box;
    overflow-x: hidden;
    z-index: -1;
    padding-bottom: 2.1875rem;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .snList{
      .headBox{
        background: $col;
      }
      .statusBox{
        li.on{
          background: $btnBgCol;
        }
      }
      .snBox{
        background: $col;
      }
    }
  }
}
</style>
