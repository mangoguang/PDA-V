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

.head{
  height: 1.5rem;
  position: relative;
  width: 100%;
  margin-bottom: -1px;
  h1{
    font-size: $f18;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #fff;
  }
  button,a{
    position: absolute;
    top: $f15;
    width: $f20;
    height: $f20;
    z-index: 1;
  }
  button.back{ 
    left: $f15;
    background: url(../assets/img/1_back.png) no-repeat;
  }
  a.edit{
    right: $f15;
    background: url(../assets/img/3_set.png) no-repeat;
  }
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .head{
      background: $col;
    }
  }
}
</style>
