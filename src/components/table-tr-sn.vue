<template>
  <ul class="clearfix table-tr-sn">
    <li v-for="(sn,index) in sns">
      <div v-if="isTr3">
        <ul>
          <li>{{index+1}}</li>
          <li class="tr2in1"><input :value="sn.arr[0]" disabled="disabled"></li>
<!--           <li><input :value="sn.arr[1]" disabled="disabled"></li> -->
          <li>{{sn.arr[4]}}</li>
        </ul>
      </div>
      <div v-else="isTr3" :class="{on: sn.arr[5]}">
        <ul v-if="!sn.status">
          <li v-bind:class="{paddingLfet20: checkBoxShow}">
            <label v-show="checkBoxShow" :for= "sn.arr[1]" :class="{on: checkboxVal[index]}">
            </label>
            <input type="checkbox" :id="sn.arr[1]" v-model="checkboxVal[index]">
            {{index+1}}
          </li>
          <li><input :value="sn.arr[0]" disabled="disabled"></li>
          <li @click="snDetailUrl(sn.arr[1], sn.arr[3], sn.arr[6], false)"><input :value="sn.arr[1]" disabled="disabled"></li>
          <li>{{sn.arr[4]}}</li>
        </ul>
        <!-- 分包部分 -->
        <ul v-else v-for="(i,index1) in sn.arr[1].length" :class="{on: sn.arr[2][index1]}">
          <li v-if="index1 == 0" v-bind:class="{paddingLfet20: checkBoxShow}">
            <label v-show="checkBoxShow" :for= "sn.arr[1][0]" :class="{on: checkboxVal[index]}">
            </label>
            <input type="checkbox" :id="sn.arr[1][0]" v-model="checkboxVal[index]">
            {{index+1}}
          </li>
          <li v-else="index1 == 0"></li>

          <li v-if="index1 == 0"><input :value="sn.arr[0]" disabled="disabled"></li>
          <li v-else></li>

          <li @click="snDetailUrl(sn.arr[1][index1], sn.arr[3], sn.arr[6], true)"><input :value="sn.arr[1][i-1]" disabled="disabled"></li>
          <li>{{sn.arr[4]}}</li>
        </ul>
      </div>
    </li>
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
        canDel: false,
        urlParams: this.$route.query.name
      }
    },
    computed: {
      sns() {
        console.log(this.$store.state.SN)
        return this.$store.state.SN
      },
      checkBoxShow() {
        return this.$store.state.checkBoxShow
      },
      checkboxVal() {
        return this.$store.state.checkboxVal
      },
      isTr3() {
        return this.$store.state.isTr3
      },
      snArr() {
        return this.$store.state.snArr
      },
      salesName() {
        return this.$store.state.salesName
      }
    },
    methods: {
      loadingShow: function(x) {
        this.$store.commit('loadingShow', x)
      },
      // (SN, BUS_NO, ITEM_NO, status)
      snDetailUrl(SN, BUS_NO, ITEM_NO, status) {
        let _this = this
        let params = {}
        // 销售备货模块
        if (this.urlParams === 'stock') {
          this.urlParams = this.salesName
          params = {
            VBELN: '80000256',
            POSNR: 10,
            ZTIAOM: SN
          }
        // 采购入库模块
        } else if (this.urlParams === 'purchase') {
          params = {
            BUS_NO: BUS_NO,
            ITEM_NO: ITEM_NO,
            ZDDLX: 1,
            ZTIAOM: SN
          }
        }
        let url = path.sap + this.urlParams + '/getinformation'
        this.$store.commit('ifFB', status)
        this.showSNDetail(url, params).then(function(data) {
          console.log('99999')
          console.log(data)
          let arr = []
          // 采购入库模块
          if (_this.urlParams === 'purchase') {
            arr = data.MT_Purchase_GetInformation_Resp.Header
          } else if (_this.urlParams === 'stock') {
            // 销售备货模块
            if (_this.salesName === 'salestockup') {
              arr = data.MT_Salestockup_GetInformation_Resp.Header
            } else {
              // 销售出库模块
              arr = data.MT_Salesoutput_GetInformation_Resp.Header
            }
          }
          _this.$store.commit('snDetail', arr)
          _this.$store.commit('snDetailFB', arr.Item)
          _this.detailBoxShow(true)
        })
      },
      showSNDetail(url, params) {
        let _this = this
        let data = new Promise(function(resolve, reject) {
          if (!_this.checkBoxShow) {
            _this.loadingShow(true)
            V.get(url, params).then(function(data) {
              _this.loadingShow(false)
              data = JSON.parse(data.responseText)
              resolve(data)
            }).catch((res) => {
              alert('请求超时！')
              _this.loadingShow(false)
            })
          }
        })
        return data
      },
      detailBoxShow(x) {
        this.$store.commit('detailBoxShow', x)
      }
    },
    created: function() {
      this.$store.commit('isTr3', true)
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
    ul{
      position: relative;
      height: $f30;
      border-bottom: 1px solid $borderIn;
    }
    ul.on{
      input, li, p{
        color: red
      }
    }
    ul:last-child{
      border-bottom: none;
    }
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
    li.tr2in1{
      width: 5.625rem;
      input{
        text-align: center;
      }
      
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
  div.on{
    input,li,ul,p{
      color: red
    }
  }
}
</style>
