<template>
  <tr @click="snDetail()">
    <td class="clearfix" :class="{on: chekboxShow}">
      <label v-show="chekboxShow" :for= "'checkbox' + index" :class="{on: checkboxList[index]}">
      </label>
      <input v-show="false" type="checkbox" :id="'checkbox' + index" v-model="checkboxList[index]">
      <span>{{index + 1}}</span>
    </td>
    <slot></slot>
    <!-- <td v-for="name in arr" :key="name">{{name}}</td> -->
  </tr>
</template>
<script>
  export default {
    name: 'TableD',
    props: ['index', 'arr', 'chekboxShow', 'checkboxList'],
    data() {
      return {

      }
    },
    computed: {
      // chekboxShow() {
      //   return this.$store.state.chekboxShow
      // }
    },
    methods: {
      snDetail() {

      }
    },
    mounted() {
      // console.log(this.evenArr)
    }
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
  }
  td:first-child{
    position: relative;
  }
  td.on{
    padding-left: $f20;
  }
  label{
    position: absolute;
    display: inline-block;
    top: .1875rem;
    left: $f4;
    width: $f14;
    height: $f14;
    border: 1px solid #b8b8b8;
    border-radius: 3px;
  }
  label.on{
    background: url(../../assets/img/purchase/6_choose.png) no-repeat;
    background-size: 105% 105%;
  }
}
tr.on{
  color: #38ce54;
}
</style>
