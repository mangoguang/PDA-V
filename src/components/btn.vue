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

button.btn{
  width: 100%;
  height: $f40;
  color: #fff;
  font-size: $btnSize;
  border-radius: $f4;
  margin: 0 auto;
}
button.btn100{
  width: 3.125rem;
  position: absolute;
  left: 50%;
  margin-left: -$f50;
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    button.btn{
      background: $btnBgCol;
    }
    button.gray{
      background: #bdbdbd;
    }
  }
}
</style>
