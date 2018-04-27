<template>
  <li>
    <label for="factory">{{labelText}}</label>
    <select v-model="value" @change="change">
      <option :value="firstOption">{{firstOption}}</option>
      <option v-for="item in selectArr" :key="item.key" :value="item.key">{{item.name}}</option>
    </select>
  </li>
</template>
<script>
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// import HeadComponent from '../../components/check/header'
import mango from '../../js/variable.js'
  export default {
    name: 'Select',
    props: ['selectArr', 'selectVal', 'labelText', 'firstOption', 'dataName'],
    data() {
      return {
        value: '',
        account: localStorage.getItem('account')
      }
    },
    mounted() {
      const settingData = localStorage.getItem('settingData')
      this.$on('resetSelectVal', this.resetSelectVal)
      // 初始化value值
      this.value = mango.storage.getStorage(this.account)[this.dataName]
    },
    methods: {
      change() {
        this.$emit('changeSelectVal', this.value)
        mango.storage.setStorage(this.account, this.dataName, this.value)
        // console.log(mango.storage.getStorage(this.account)[this.dataName])
      },
      resetSelectVal(str) {
        this.value = str
      }
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
label{
  display: inline-block;
  height: 0.9375rem;
  width: 3rem;
  line-height: 0.9375rem;
  font-size: 0.4375rem;
  color: #999;
}
</style>
