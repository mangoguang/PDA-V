<template>
  <ul class="clearfix table-tr-sn">
    <li v-for="(sn,index) in sns">
      <ul>
        <li v-bind:class="{paddingLfet20: checkBoxShow}">
          <label v-show="checkBoxShow" :for= "sn[0]" v-bind:class="{on: checkboxNames[index]}">
          </label>
          <input type="checkbox" :id="sn[0]" v-model="checkboxNames[index]">
          {{index+1}}
        </li>
        <li>{{sn[0]}}</li>
        <li>{{sn[1]}}</li>
        <li>{{sn[2]}}</li>
      </ul>
    </li>
    <p>{{checkboxNames}}</p>
  </ul>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
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
        return this.$store.state.SN
      },
      checkBoxShow() {
        return this.$store.state.checkBoxShow
      },
      canSkip() {
        return this.$store.state.canSkip
      }
    },
    methods: {

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
    }
    li:nth-child(2),li:nth-child(4){
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

// @each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
//   .#{$skin} {
//     .table-tr{
//       width: 100%;
//       li{
//         float: left;
//       }   
//       &>li{
//         width: 100%;
//         border-bottom: 1px solid $borderIn;
//         li{
//           width: 2.8125rem;
//           height: $f30;
//           line-height: $f30;
//           font-size: $textSize;
//           color: $textCol;
//           text-align: center;
//           position: relative;
//           padding: 0 $f4;
//           box-sizing: border-box;
//         }
//         li:nth-child(2),li:nth-child(4){
//           overflow-y: hidden;
//         }
//         li:after{
//           display: block;
//           content: '';
//           width: 1px;
//           height: $f20;
//           background: $borderIn;
//           position: absolute;
//           top: $f5;
//           right: 0;
//         }
//         li:last-child:after{
//           width: 0;
//         }
//         li:first-child{
//           width: $f50;
//         }
//       }
//     }
//   }
// }
</style>
