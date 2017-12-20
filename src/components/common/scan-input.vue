<template>
  <div class="scanOrder">
    <input v-model="searchNum" v-focus="focusStatus" type="text" :placeholder="'扫描进入订单'">
  </div>
</template>
<script>
  // import {cloneObj} from '../../js/variable.js'
  export default {
    name: 'scanInput',
    // props: ['opListClone', 'placeholder'],
    data() {
      return {
        searchNum: '',
        focusStatus: true
      }
    },
    watch: {
      'searchNum': function(val) {
        this.scanOrder()
      }
    },
    methods: {
      clearInput() {
        this.searchNum = ''
      },
      // 检索订单号
      scanOrder() {
        this.$router.push({ path: '/product/' + this.searchNum })
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
      this.$store.commit('loadingShow', false)
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.scanOrder{
  position: relative;
  height: .78125rem;
  padding: $f5 0;
  input{
    display: block;
    width: 60%;
    height: $f20;
    margin: auto;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: $f16;
    text-align: center;
  }
  button.clearBtn{
    position: absolute;
    top: $f10;
    right: 20%;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/purchase/6_delect.png) no-repeat;
    background-size: 100% 100%;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #fff;
    text-align: center;
  } input:-moz-placeholder, textarea:-moz-placeholder {
    color: #fff;
    text-align: center;
  } input::-moz-placeholder, textarea::-moz-placeholder {
    color: #fff;
    text-align: center;
  } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #fff;
    text-align: center;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .scanOrder{
      background: $col;
      input{
        background: $col;
      }
    }
  }
}
</style>
