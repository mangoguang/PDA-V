<template>
  <div class="searchOrder">
    <input v-model="searchNum" v-focus="focusStatus" type="text" :placeholder="'搜索' + placeholder + '单号'">
    <button @click="clearInput" class="clearBtn" type="button"></button>
  </div>
</template>
<script>
  import {cloneObj} from '../../js/variable.js'
  export default {
    name: 'searchInput',
    props: ['opListClone', 'placeholder'],
    data() {
      return {
        searchNum: '',
        focusStatus: true
      }
    },
    watch: {
      'searchNum': function(val) {
        this.searchOrder()
      }
    },
    methods: {
      clearInput() {
        this.searchNum = ''
      },
      setOpList(arr) {
        this.$store.commit('opList', arr)
      },
      // 检索订单号
      searchOrder() {
        let arr = []
        let str = this.searchNum
        if (str === '') {
          this.setOpList(this.opListClone)
        } else {
          let orderArr = cloneObj(this.opListClone)
          for (let i in orderArr) {
            let Str = orderArr[i][0].toString()
            if (Str.indexOf(str) !== -1) {
              arr.push(orderArr[i])
            }
          }
          this.setOpList(arr)
        }
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

.searchOrder{
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
    .searchOrder{
      background: $col;
      input{
        background: $col;
      }
    }
  }
}
</style>
