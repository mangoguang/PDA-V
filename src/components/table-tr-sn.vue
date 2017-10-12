<template>
  <ul class="clearfix table-tr-sn">
    <li v-for="(sn,index) in sns" @click="showSNDetail(sn.arr[3])">
      <ul v-if="!sn.status">
        <li v-bind:class="{paddingLfet20: checkBoxShow}">
          <label v-show="checkBoxShow" :for= "sn.arr[0]" v-bind:class="{on: checkboxNames[index]}">
          </label>
          <input type="checkbox" :id="sn.arr[0]" v-model="checkboxNames[index]">
          {{index+1}}
        </li>
        <li><input :value="sn.arr[0]" disabled="disabled"></li>
        <li><input :value="sn.arr[1]" disabled="disabled"></li>
        <li>{{sn.arr[2]}}</li>
      </ul>
      <ul v-else v-for="(i,index) in sn.arr[1].length">
        <li v-bind:class="{paddingLfet20: checkBoxShow}">
          <label v-show="checkBoxShow" :for= "sn.arr[0]" v-bind:class="{on: checkboxNames[index]}">
          </label>
          <input type="checkbox" :id="sn.arr[0]" v-model="checkboxNames[index]">
          {{index+1}}
        </li>
        <li v-if="index == 0"><input :value="sn.arr[0]" disabled="disabled"></li>
        <li v-else></li>
        <li><input :value="sn.arr[1][i-1]" disabled="disabled"></li>
        <li>{{sn.arr[2][i-1]}}</li>
      </ul>
    </li>
    <p>{{checkboxNames}}</p>
  </ul>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
import { path, V } from '../js/variable.js'
Vue.use(Vuex)
  export default {
    name: 'table-tr',
    data() {
      return {
        checkboxNames: [true, false, true]
      }
    },
    computed: {
      sns() {
        console.log('success')
        console.log(this.$store.state.SN)
        return this.$store.state.SN
      },
      checkBoxShow() {
        return this.$store.state.checkBoxShow
      }
    },
    methods: {
      loadingShow: function(x) {
        this.$store.commit('loadingShow', x)
      },
      showSNDetail(sn) {
        let _this = this
        _this.loadingShow(true)
        let url = path.sap + 'purchase/getinformation'
        let params = {
          BUS_NO: '4500000266',
          ITEM_NO: '00010',
          ZDDLX: 1,
          ZTIAOM: '4500000266-171011000005'
        }
        V.get(url, params).then(function(data) {
          _this.loadingShow(false)
          data = JSON.parse(data.responseText)
          let arr = data.MT_Purchase_GetInformation_Resp.Header
          _this.$store.commit('snDetail', arr)
          _this.detailBoxShow(true)
        }).catch((res) => {
          alert('请求超时！')
          _this.loadingShow(false)
        })
      },
      detailBoxShow(x) {
        this.$store.commit('detailBoxShow', x)
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.table-tr-sn{
  width: 100%;
  label{
    position: absolute;
    display: block;
    top: .1875rem;
    left: $f4;
    width: $f14;
    height: $f14;
    border: 1px solid #b8b8b8;
    border-radius: 3px;
  }
  label.on{
    background: url(../assets/img/purchase/6_choose.png) no-repeat;
    background-size: 105% 105%;
  }
  input[type="checkbox"]{
    display: none;
  }
  li{
    float: left;
  }   
  &>li{
    width: 100%;
    border-bottom: 1px solid $borderIn;
    li{
      width: 2.8125rem;
      height: $f30;
      line-height: $f30;
      font-size: $textSize;
      color: $textCol;
      text-align: center;
      position: relative;
      padding: 0 $f4;
      box-sizing: border-box;
      overflow-y: hidden;
    }
    li:after{
      display: block;
      content: '';
      width: 1px;
      height: $f20;
      background: $borderIn;
      position: absolute;
      top: $f5;
      right: 0;
    }
    li:last-child:after{
      width: 0;
    }
    li:first-child{
      width: $f50;
    }
    li.paddingLfet20{
      padding-left: $f20;
    }
  }
}
</style>
