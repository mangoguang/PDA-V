<template>
  <ul class="snBox clearfix">
    <li>
      <input :value="'单号：' + num" disabled="disabled">
    </li>
    <li>
      <input type="text" v-model="inputVal" placeholder="条码" v-focus="focusStatus">
      <button @click="clearInput" class="clearInput"></button>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'ScanInput',
    props: ['num'],
    data() {
      return {
        focusStatus: true,
        inputVal: ''
      }
    },
    computed: {

    },
    watch: {
      'inputVal': function() {
        this.setScanSNVal(this.inputVal)
        // if (this.ifVerify) {
        //   this.verify()
        // } else {z
        //   alert('请切换到应扫状态！')
        // }
      }
    },
    methods: {
      setScanSNVal(x) {
        this.$store.commit('scanSNVal', x)
      },
      clearInput() {
        this.inputVal = ''
      }
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
            if (value) {
              el.focus()
            }
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.snBox{
  position: relative;
  height: $f30;
  padding: 0 $f15;
  box-sizing: border-box;
  li{
    width: 3.75rem;
    float: left;
    color: #fff;
    font-size: $f18;
  }
  li:nth-child(1){
    width: 5rem;
    margin-right: $f10;
  }
  .clearInput{
    position: absolute;
    top: $f4;
    right: $f15;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/purchase/6_delect.png) no-repeat;
    background-size: $f12 $f12;
  }
  input[disabled="disabled"]{
    width: 4.6rem;
    padding-right: 0;
    color: #fff;
    border-bottom: none;
  }
  input{
    position: relative;
    border-bottom: 1px solid #fff;
    display: block;
    width: 100%;
    padding: $f5 $f15 0 0;
    box-sizing: border-box;
    line-height: $f20;
    color: #fff;
    font-size: $f16;
  }
  input::-webkit-input-placeholder{
    color: #66ffff;
    font-size: $f16;
  } input:-moz-placeholder{
    color: #66ffff;
    font-size: $f16;
  } input::-moz-placeholder{
    color: #66ffff;
    font-size: $f16;
  } input:-ms-input-placeholder{
    color: #66ffff;
    font-size: $f16;
  }
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .snBox{
      background: $col;
    }
  }
}
</style>

