<template>
  <ul v-bind:class="{tableH: isTbleH}" class="clearfix table-h">
    <li v-for="name in names">{{name}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'table-h',
    data() {
      return {
        names: ['序号', '入库单号', '归属仓库', '客户地址'],
        isTbleH: false
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.table-h{
  width: 100%;
  padding-left: 0;
  box-shadow: 0 2px $f4 rgba(0,0,0,0.16);
  li{
    float: left;
    text-align: center;
    width: 2.8125rem;
    height: $f30;
    line-height: $f30;
    font-size: $textSize;
    color: $textSubCol;
    background: #f0f0f0;
  }
  li:first-child{
    width: $f50;
  }
}
.tableH1{
  li:nth-child(2){
    width: 5.625rem;
  }
}

</style>
