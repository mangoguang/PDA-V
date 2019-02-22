<template>
  <ul class="snBox clearfix">
    <li>
      <slot></slot>
    </li>
    <li>
      <input 
      type="text" 
      ref="searchInput"
      @keyup.enter="emitVerify" 
      v-model="sn" 
      placeholder="条码" 
      v-focus="true">
      <button 
      @click.stop="clearInput" 
      class="clearInput"></button>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
  export default {
    name: 'HeadBott',
    props: ['verify', 'inputVal'],
    data() {
      return {
        numLength: 0,
        canVerify: true,
        sn: ''
      }
    },
    computed: {

    },
    watch: {
      'sn': function() {
        // 判断是否人工输入
        if (this.sn.length === this.numLength + 1) {
          this.numLength++
          this.canVerify = false
        } else if (this.sn.length === this.numLength - 1) {
          this.numLength--
          this.canVerify = false
        } else {
          this.canVerify = true
        }
        if (this.canVerify && this.sn !== '') {
          this.emitVerify(this.sn)
          // this.$emit('parentVerify', this.sn)
        }
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      emitVerify(sn) {
        this.$emit('verify', this.sn)
      },
      test() {
        alert('success')
      },
      // setInputVal(x) {
      //   return this.$store.commit('inputVal', x)
      // },
      clearInput() {
        this.sn = ''
        this.numLength = 0
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
      this.$on('clearInput', this.clearInput)
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
  li:first-child{
    width: 4.6rem;
    height: $f30;
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
