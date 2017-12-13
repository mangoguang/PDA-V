<template>
  <div class="table-h">
    <ul v-if="isOp === true && (moduleName === 'allot' || moduleName === 'allotinbound')" :style="{width: 182 + tr1+tr2 + 'px', 'min-width': '10rem'}" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li>{{names[1]}}</li>
      <li v-if="moduleName === 'productScan'" :style="{width: stateTr1 + 20 + 'px'}">{{names[2]}}</li>
      <li v-else :style="{width: tr1 + 20 + 'px'}">{{names[2]}}</li>
      <li v-if="moduleName === 'productScan'" :style="{width: stateTr2 + 20 + 'px'}">{{names[3]}}</li>
      <li v-else :style="{width: tr2 + 20 + 'px'}">{{names[3]}}</li>
    </ul>
    <ul v-if="isOp === true && (moduleName !== 'allot' && moduleName !== 'allotinbound')" :style="{width: 182 + tr1+tr2 + 'px', 'min-width': '10rem'}" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li>{{names[1]}}</li>
      <li v-if="moduleName === 'productScan'" :style="{width: stateTr2 + 20 + 'px'}">{{names[3]}}</li>
      <li v-else :style="{width: tr2 + 20 + 'px'}">{{names[3]}}</li>
      <li v-if="moduleName === 'productScan'" :style="{width: stateTr1 + 20 + 'px'}">{{names[2]}}</li>
      <li v-else :style="{width: tr1 + 20 + 'px'}">{{names[2]}}</li>
    </ul>
    <ul v-if="!isOp" :style="{width: 140 + tr1+tr2 + 'px'}" class="clearfix table-h">
      <li>{{names[0]}}</li>
      <li :style="{width: tr1 + 'px'}">{{names[1]}}</li>
      <li v-if="!isTr3" :style="{width: tr2 + 'px'}">{{names[2]}}</li>
      <li v-if="isTr3">{{names[2]}}</li>
      <li v-else>{{names[3]}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'table-h',
    props: ['tr1', 'tr2', 'isOp', 'moduleName'],
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
