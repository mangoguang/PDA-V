<template>
  <ul class="clearfix table-tr-op">
    <li v-if="name !== 'productScan'" v-for="(order,index) in orders" @click="toOrderDetail(order[0])">
      <ul>
        <li>{{index+1}}</li>
        <li>{{order[0]}}</li>
        <li><input :value="order[1]" disabled="disabled"></li>
        <li>{{order[2]}}</li>
      </ul>
    </li>
    <li v-if="name === 'productScan'">
      
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
        name: this.$route.params.module
      }
    },
    computed: {
      orders() {
        return this.$store.state.orders
      },
      bottomBtnName() {
        return this.$store.state.bottomBtnName
      },
      moduleName() {
        return this.$store.state.moduleName
      },
      productScanList() {
        return this.$store.state.productScanList
      }
    },
    methods: {
      toOrderDetail(num) {
        // if (this.bottomBtnName === 'salestockup') {
        //   nextPageName = 'addSNList'
        // } else {
        // }
        let temp = this.$route.params.module
        if (temp === 'stock') {
          temp = this.bottomBtnName
        }
        this.$router.push({ path: '/snList/' + num + '?name=' + temp + '&moduleName=' + this.moduleName + '&warehouse=' + this.$route.query.warehouse + '&warehouseNum=' + this.$route.query.warehouseNum + '&factoryNum=' + this.$route.query.factoryNum })
      }
    },
    created: function() {
      if (this.$route.params.module === 'stock') {
        console.log('success')
        // 销售备货
        if (this.bottomBtnName === 'salestockup') {
          this.$store.commit('moduleName', '销售备货')
        } else {
          this.$store.commit('moduleName', '销售出库')
        }
      } else if (this.$route.params.module === 'purchase') {
        this.$store.commit('moduleName', '采购入库')
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
      overflow-y: hidden;
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
