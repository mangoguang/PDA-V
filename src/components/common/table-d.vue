<template>
  <tr>
    <td>{{index + 1}}</td>
    <td v-for="item in arr" :key="item">{{item}}</td>
    <slot></slot>
  </tr>
</template>
<script>
  export default {
    name: 'TableD',
    props: ['index', 'arr']
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

tr{
  height: $f30;
  line-height: $f30;
  font-size: $textSize;
  color: $textCol;
  text-align: center;
  position: relative;
  padding: 0 $f4;
  box-sizing: border-box;
  overflow-y: hidden;
  td{
    padding: 0 .2rem;
    white-space: nowrap;
    max-width: 8rem;
    overflow: scroll;
    // color: #333;
  }
}
</style>
