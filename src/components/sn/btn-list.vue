<template>
  <ul class="statusBox clearfix">
    <li @click="btn1" :class="{on: btnStatus[0]}">产品：{{1}}</li>
    <li @click="btn2" :class="{on: btnStatus[1]}">应扫：{{1}}</li>
    <li @click="btn3" :class="{on: btnStatus[2]}">已扫：{{1}}</li>
    <li @click="btn4" :class="{on: btnStatus[3]}">未扫：{{1}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'DelSN',
    props: ['num'],
    data() {
      return {
        btnStatus: [true, true, true, true]
      }
    },
    computed: {

    },
    methods: {
      btn1() {

      },
      btn2() {

      },
      btn3() {

      },
      btn4() {

      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.statusBox{
  width: 9.6875rem;
  height: $f50;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: $f4;
  border-top-right-radius: $f4;
  padding-left: $f10;
  box-sizing: border-box;
  li{
    float: left;
    width: 2.03125rem;
    height: $f30;
    margin: $f10 $f10 0 0 ;
    text-align: center;
    color: #fff;
    font-size: $f10;
    line-height: $f30;
    border-radius: $f4;
    background: #b8b8b8;
    overflow-y: hidden;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .statusBox{
      li.on:nth-child(1){
        background: $btnBgCol;
      }
      li.on:nth-child(2){
        background: #ff9600;
      }
      li.on:nth-child(3){
        background: #38ce54;
      }
      li.on:nth-child(4){
        background: #666;
      }
    }
  }
}
</style>

