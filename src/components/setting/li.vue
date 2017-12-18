<template>
    <li>
      <label for="scanPlan">打印方案</label>
      <select id="scanPlan" v-model="val" @change="changePrintPlan">
        <option v-for="obj in list" :value="obj.code" :key="obj.code">{{ obj.name }}</option>
      </select>
      <span></span>
    </li>
</template>
<script>
  export default {
    name: 'LiComponent',
    props: ['list', 'val'],
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

li{
    position: relative;
    margin: $f5 0;
    label{
      display: inline-block;
      height: $f30;
      width: 3rem;
      line-height: $f30;
      font-size: $f14;
      color: #999;
    }
    select,option,input{
      display: inline-block;
      height: $f30;
      width: 5rem;
      font-size: $f12;
      color: #666;
      line-height: $f30;
      border: 1px solid #f0f0f0;
      border-radius: $f4;
    }
  }
  span{
    display: block;
    position: absolute;
    top: $f10;
    right: 1.2rem;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/setting/choose.png) no-repeat;
    background: auto 100%;
  }
</style>
