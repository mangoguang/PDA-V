<template>
  <button class="btn" type="button"><slot></slot></button>
</template>
<script>
  export default {
    name: 'Btn'
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    button.btn{
      width: 100%;
      background: $s1btnBgCol;
      height: 40px;
      color: #fff;
      font-size: $btnSize;
      border-radius: 4px;
      margin: 0 auto;
    }
    button.btn100{
      width: 100px;
    }
  }
}
</style>
