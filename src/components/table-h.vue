<template>
  <ul class="clearfix table-h">
    <li v-for="name in names">{{name}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'table-h',
    data() {
      return {
        names: ['序号', '入库单号', '归属仓库', '客户地址']
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
    .table-h{
      width: 100%;
      li{
        float: left;
      }
    }
  }
}
</style>
