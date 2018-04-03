<!-- <keep-alive> -->
<template>
  <div class="check" v-bind:style="{height: height+'px'}">
    <div class="h25"></div>
    <div class="header">
      <div class="headBox">
        <HeadComponent :settingShow="true">
          <h1>仓库盘点</h1>
        </HeadComponent>
        <div class="searchOrder">
          <input v-model="inputVal" type="text" :placeholder="'条码'" @keyup.enter="verify">
          <button @click="clearInput" class="clearBtn" type="button"></button>
        </div>
      </div>
      <ul class="snList">
        <li>条码数量：{{snList.length}}</li>
        <li v-for="sn in snList" :key="sn">{{sn}}</li>
      </ul>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, ajax, getFactorySel, version} from '../../js/variable.js'
import HeadComponent from '../../components/header'
// import {pathOA} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Check',
  components: {HeadComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      inputVal: '',
      numLength: 0,
      canVerify: true,
      factoryNum: '',
      warehouseNum: '',
      snList: []
    }
  },
  computed: {

  },
  watch: {
    'inputVal': function() {
      // 判断是否人工输入
      if (this.inputVal.length === this.numLength + 1) {
        this.numLength++
        this.canVerify = false
      } else if (this.inputVal.length === this.numLength - 1) {
        this.numLength--
        this.canVerify = false
      } else {
        this.canVerify = true
      }

      if (this.canVerify && this.inputVal !== '') {
        this.verify()
      }
    }
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    clearInput() {

    },
    enterKey() {

    },
    verify() {
      let _this = this
      let url = 'http://10.12.0.53:8900/derucci/workflow/jsp/check.jsp'
      let params = {
        factory: this.factoryNum,
        wareHouse: this.warehouseNum,
        num: this.inputVal
      }
      _this.loadingShow(true)
      ajax('POST', url, params).then((data) => {
        let result = data.result
        _this.loadingShow(false)
        _this.numLength = 0
        if (result === 'true') {
          _this.snList.unshift(_this.inputVal)
          if (_this.snList.length > 100) {
            _this.snList = _this.snList.slice(0, 100)
          }
        } else if (result === 'repeat') {
          alert('条码重复扫描')
        } else {
          alert('数据上传失败')
        }
        _this.inputVal = ''
      })
      // .catch(() => {
      //   console.log(123)
      //   // alert('请求超时！')
      //   _this.inputVal = ''
      //   _this.loadingShow(false)
      // })
    }
  },
  created() {
    getFactorySel(this)
  },
  updated() {
    console.log(this.snList)
  },
  mounted() {
    this.loadingShow(false)
    // window.addEventListener('hashchange', () => {
    //   console.log('success')
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.check{
  .headBox{
    padding-bottom: .5rem;
  }
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
  .snList{
    li{
      height: 0.9375rem;
      line-height: 0.9375rem;
      font-size: 14px;
      color: #666;
      padding-left: .5rem;
      border-bottom: 1px solid #e1e1e1;
    }
  }
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .check{
      .headBox{
        background: $col;
      }
    }
  }
}
</style>
