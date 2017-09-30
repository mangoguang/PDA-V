<template>
  <ul class="clearfix table-tr">
    <li v-for="(order,index) in orders" @click="toOrderDetail(order.BUS_NO)">
      <ul>
        <li>{{index}}</li>
        <li>{{order.BUS_NO}}</li>
        <li>{{order.ZDDLX}}</li>
        <li>{{order.ORT01}}</li>
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
        this.$router.push({ path: '/orderDetail/' + num })
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .table-tr{
      width: 100%;
      li{
        float: left;
      }
      &>li{
        width: 100%;
      }
    }
  }
}
</style>
