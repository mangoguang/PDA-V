<template>
  <button @click="checkBoxShowFn(showCheckbox)" class="delBtn"></button>
</template>
<script>
  export default {
    name: 'DelSN',
    props: ['num'],
    data() {
      return {
        inputVal: ''
      }
    },
    methods: {
      clearInput() {
        this.inputVal = ''
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.delBtn{
  position: absolute;
  top: 0.46875rem;
  right: $f40;
  width: $f20;
  height: $f20;
  background: url(../../assets/img/purchase/2_dustbin.png) no-repeat;
  background-size: 100% 100%;
}
</style>

