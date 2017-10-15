<template>
  <ul v-bind:class="{tableH1: isTr3 && !isOP}" class="clearfix table-h">
    <li v-for="name in names">{{name}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'table-h',
    data() {
      return {
        isTbleH: false
      }
    },
    computed: {
      names() {
        return this.$store.state.tableH
      },
      isTr3() {
        return this.$store.state.isTr3
      },
      isOP() {
        return this.$store.state.isOP
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
