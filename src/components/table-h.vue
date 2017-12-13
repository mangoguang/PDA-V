<template>
  <div class="table-h">
    <ul v-if="isOp === true && (moduleName === 'allot' || moduleName === 'allotinbound')" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li>{{names[1]}}</li>
      <li v-if="moduleName === 'productScan'">{{names[2]}}</li>
      <li v-else>{{names[2]}}</li>
      <li v-if="moduleName === 'productScan'">{{names[3]}}</li>
      <li v-else>{{names[3]}}</li>
    </ul>
    <ul v-if="isOp === true && (moduleName !== 'allot' && moduleName !== 'allotinbound')" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li>{{names[1]}}</li>
      <li v-if="moduleName === 'productScan'">{{names[3]}}</li>
      <li v-else>{{names[3]}}</li>
      <li v-if="moduleName === 'productScan'">{{names[2]}}</li>
      <li v-else>{{names[2]}}</li>
    </ul>
    <ul v-if="!isOp" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li>{{names[1]}}</li>
      <li v-if="!isTr3">{{names[2]}}</li>
      <li v-if="isTr3">{{names[2]}}</li>
      <li v-else>{{names[3]}}</li>
    </ul>
  </div>
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
      stateTr1() {
        return this.$store.state.tr1
      },
      stateTr2() {
        return this.$store.state.tr2
      },
      isOp() {
        return this.$store.state.isOp
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.table-h{
  // width: 100%;
  padding-left: 0;
  min-width: 10rem;
  box-shadow: 0 2px $f4 rgba(0,0,0,0.16);
  background: #f0f0f0;
  // box-shadow: 0 2px $f4 rgba(0,0,0,0.16);
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
