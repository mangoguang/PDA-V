<template>
    <div class="head">
      <button><</button>
      <slot></slot>
      <button>设置</button>
    </div>
</template>
<script>
  export default {
    name: 'Head'
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .head{
      h1{
        font-weight: 300;
      }
    }
  }
}
</style>
