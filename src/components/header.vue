<template>
    <div class="head">
      <button class="back" @click="back()" type="button"></button>
      <slot></slot>
      <router-link to="/edit" class="edit"></router-link>
    </div>
</template>
<script>
  export default {
    name: 'Head',
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .head{
      height: 48px;
      position: relative;
      width: 100%;
      h1{
        height: 48px;
        line-height: 48px;
        color: #fff;
      }
      button,a{
        position: absolute;
        top: 15px;
        width: 20px;
        height: 20px;
        z-index: 1;
      }
      button.back{ 
        left: 15px;
        background: url(../assets/img/1_back.png) no-repeat;
      }
      a.edit{
        right: 15px;
        background: url(../assets/img/3_set.png) no-repeat;
      }
    }
  }
}
</style>
