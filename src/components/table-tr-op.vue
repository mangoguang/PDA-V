<template>
  <div>
    <TableH></TableH>
    <ul v-if="name === 'productScan'" class="clearfix table-tr-op">
      <li v-for="(arr, index) in productScanList" :key="arr[0]" :class="{on: arr[3]}">
        <ul>
          <li class="li1">{{index+1}}</li>
          <li class="li2"><p>{{arr[0]}}</p></li>
          <li class="li4">{{arr[2]}}</li>
          <li class="li3"><p>{{arr[1]}}</p></li>
        </ul>
      </li>
    </ul>
    <ul v-else class="clearfix table-tr-op">
      <li v-if="name === 'purchase'" v-for="(order,index) in orders" :key="index" @click="toOrderDetail(order[0], order[3])">
        <ul>
          <li class="li1">{{index+1}}</li>
          <li class="li2">{{order[0]}}</li>
          <li class="li3"><p>{{order[1]}}</p></li>
        </ul>
      </li>
      <li v-if="name==='salesreturn' || name==='stock' || name==='product'" v-for="(order,index) in orders" :key="order[0]" @click="toOrderDetail(order[0], order[3])">
        <ul>
          <li class="li1">{{index+1}}</li>
          <li class="li2">{{order[0]}}</li>
          <li class="li4">{{order[2]}}</li>
          <li class="li3"><p>{{order[1]}}</p></li>
        </ul>
      </li>
      <li v-if="name==='allot' || name==='allotinbound'" v-for="(order,index) in orders" :key="order[0]" @click="toOrderDetail(order[0], order[3])">
        <ul>
          <li class="li1">{{index+1}}</li>
          <li class="li2">{{order[0]}}</li>
          <li class="li3"><p>{{order[1]}}</p></li>
          <li class="li4">{{order[2]}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
import TableH from '../components/table-h'
Vue.use(Vuex)
  export default {
    name: 'table-tr',
    components: { TableH },
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
      toOrderDetail(num, ZDDLX) {
        // if (this.bottomBtnName === 'salestockup') {
        //   nextPageName = 'addSNList'
        // } else {
        // }
        let temp = this.$route.params.module
        if (temp === 'stock') {
          temp = this.bottomBtnName
        }
        this.$router.push({ path: '/snList/' + num + '?name=' + temp + '&moduleName=' + this.moduleName + '&ZDDLX=' + ZDDLX })
      }
    },
    created: function() {
      console.log('dddd')
      console.log(this.name, typeof (this.name))
      console.log(this.productScanList)
      if (this.$route.params.module === 'stock') {
        // 销售备货
        if (this.bottomBtnName === 'salestockup') {
          this.$store.commit('moduleName', '销售备货')
        } else {
          this.$store.commit('moduleName', '销售出库')
        }
      } else if (this.$route.params.module === 'purchase') {
        this.$store.commit('moduleName', '采购入库')
      } else if (this.$route.params.module === 'salesreturn') {
        this.$store.commit('moduleName', '退货入库')
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
  li.on{
    input{
      color: #38ce54;
    }
    li{
      color: #38ce54;
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
