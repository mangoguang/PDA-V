<template>
  <ul class="clearfix table-tr-op">
    <li v-for="(order,index) in orders" @click="toOrderDetail('4500000277')">
      <ul>
        <li>{{index+1}}</li>
        <li>{{order[0]}}</li>
        <li>{{order[1]}}</li>
        <li>{{order[2]}}</li>
      </ul>
    </li>
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

      }
    },
    computed: {
      orders() {
        return this.$store.state.orders
      }
    },
    methods: {
      toOrderDetail(num) {
        this.$router.push({ path: '/snList/' + num + '?name=' + this.$route.params.module + '&moduleName=' + this.$route.query.moduleName + '&warehouse=' + this.$route.query.warehouse + '&factory=' + this.$route.query.factory })
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.table-tr-op{
  width: 100%;
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
