<template>
    <div class="scanError">
      <div>
        <p>{{errorMsg}}</p>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

  export default {
    name: 'scanError',
    computed: {
      errorMsg() {
        return this.$store.state.errorMsg
      }
    },
    methods: {

    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.scanError{
  // display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index: 100;
  div{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4.375rem;
    height: 4.375rem;
    background: #fff;
    margin-left: -2.1875rem;
    margin-top: -2.1875rem;
    padding-top: 2.8125rem;
    box-sizing: border-box;
    background: url(../../assets/img/purchase/4_wrong.png) no-repeat, #fff;
    background-size: $f50 1.09375rem;
    background-position: 1.40625rem 1.40625rem;
    border-radius: $f4;
    p{
      text-align: center;
      color: $textCol;
      font-size: $f12;
    }
  }
}
</style>
