<template>
  <select v-model="value" name="factory" id="">
    <option value="请选择工厂">请选择工厂</option>
    <option v-for="item in selectArr" :key="item" :value="item">{{item}}</option>
  </select>
</template>
<script>
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// import HeadComponent from '../../components/check/header'
  export default {
    name: 'Select',
    props: ['selectArr', 'value'],
    mounted() {
      console.log(123123)
      console.log(1111, this.selectArr)
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

select{
  display: inline-block;
  height: 0.9375rem;
  width: 5rem;
  font-size: 0.375rem;
  color: #666;
  line-height: 0.9375rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.125rem;
}
</style>
