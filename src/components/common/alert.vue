<template>
  <div class="alertBox">
    <ul class="content">
      <li><button @click="emitCloseAlert" class="close"></button></li>
      <li>
        <slot></slot>
        <slot name="mid"></slot>
      </li>
      <li class="bottom"><slot name="btn"></slot></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Alert',
    methods: {
      emitCloseAlert() {
        this.$emit('closeAlert')
      }
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.alertBox{
  display: flex;
  position: absolute;
  top: 0;
  width: 10rem;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  z-index: 99;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .content{
    position: relative;
    width: 6rem;
    min-height: 2rem;
    background: #fff;
    border-radius: $f8;
    text-align: center;
    color: #666;
    button.close{
      position: absolute;
      width: $f16;
      height: $f16;
      background: url(../../assets/img/5_close.png) no-repeat;
      background-size: 100% 100%;
      top: $f10;
      right: $f10;
    }
    li:first-child{
      padding: $f18 $f10 0 $f10;
    }
    p{
      font-size: $f12;
    }
  }
  .bottom{
    border-bottom-left-radius: $f8;
    border-bottom-right-radius: $f8;
    button{
      width: 100%;
      color: #fff;
      font-size: $f17;
      line-height: 2em;
    }
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .alertBox{
      .bottom{
        background: $col;
      }
    }
  }
}
</style>
