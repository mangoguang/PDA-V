<template>
    <div class="putIn">
      <div>
        <slot></slot>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'putIn'
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.putIn{
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
    background: url(../../assets/img/purchase/loading36.gif) no-repeat, #fff;
    background-size: $f50 $f50;
    background-position: 1.40625rem .8rem;
    border-radius: $f4;
    p{
      text-align: center;
      color: $textCol;
      font-size: $f12;
    }
  }
}
</style>
