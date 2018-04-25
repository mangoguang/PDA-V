<template>
  <div class="pandianSetting">
    <div class="h25"></div>
    <HeadComponent>
      <h1>盘点设置</h1>
    </HeadComponent>
    <ul>
      <li>
        <label for="factory">盘点工厂</label>
        <!-- <Select :value="selectValue" :selectArr="factoryList"></Select> -->
        <select v-model="factoryVal" @change="changeFactory" name="factory" id="">
          <option value="请选择工厂">请选择工厂</option>
          <option v-for="item in factoryList" :key="item.code" :value="item.code">{{item.name}}</option>
        </select>
      </li>
      <li>
        <label for="factory">盘点仓库</label>
        <select v-model="warehouseVal" name="factory" id="">
          <option value="请选择仓库">请选择仓库</option>
          <option v-for="item in warehouseList" :key="item.code" :value="item.code">{{item.name}}</option>
        </select>
      </li>
      <li>
        <label for="factory">盘点模式</label>
        <select v-model="typeVal" name="factory" id="">
          <option value="请选择盘点模式">请选择模式</option>
          <option value="0">通盘</option>
          <option value="1">精盘</option>
        </select>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import HeadComponent from '../../components/check/header'
import Select from '../../components/check/select'
import {path, ajax} from '../../js/variable.js'
import md5 from 'js-md5'
  export default {
    name: 'Head',
    // props: ['settingShow'],
    components: {HeadComponent, Select},
    data() {
      return {
        factoryList: [],
        warehouseList: [],
        PDFactory: '',
        factoryVal: '',
        warehouseVal: '',
        typeVal: '',
        key: true
      }
    },
    watch: {
      'PDFactory': () => {
        console.log('success')
      },
      // 'factoryVal': function() {
      //   this.setLocalData('factoryVal', this.factoryVal)
      //   // 设置仓库
      //   this.setWarehouse()
      // },
      'warehouseVal': function() {
        this.setLocalData('warehouseVal', this.warehouseVal)
      },
      'typeVal': function() {
        this.setLocalData('typeVal', this.typeVal)
      }
    },
    beforeCreated() {
      this.key = false
    },
    created() {
      if (!localStorage.getItem('settingData')) {
        localStorage.setItem('settingData', '{}')
      }
      this.getFactory()
    },
    mounted() {
      console.log(localStorage.getItem('settingData'))
      this.$store.commit('loadingShow', false)
      this.setSelectVal()
      this.setWarehouse()
      this.key = true
    },
    // beforeDestoryed() {
    //   alert('确定后退么？')
    // },
    destroyed() {
      if (!this.warehouseVal || !this.typeVal || this.warehouseVal === '请选择仓库' || this.typeVal === '请选择盘点模式') {
        alert('请选择仓库或者盘点模式！')
        this.$router.go(1)
      }
    },
    methods: {
      test() {
        console.log('success')
      },
      back() {
        this.$router.go(1)
      },
      loadingShow: function(x) {
        this.$store.commit('loadingShow', x)
      },
      setLocalData(item, value) {
        let local = localStorage
        let temp = JSON.parse(local.getItem('settingData'))
        temp[item] = value
        local.setItem('settingData', JSON.stringify(temp))
      },
      setSelectVal() {
        let temp = JSON.parse(localStorage.getItem('settingData'))
        if (temp) {
          this.factoryVal = temp.factoryVal
          this.warehouseVal = temp.warehouseVal
          this.typeVal = temp.typeVal
        }
      },
      getFactory() {
        let [_this, obj, url] = [
          this,
          this.getAccountMsg(),
          path.oa + '/PDAFactory.jsp'
        ]
        let params = {
          account: obj.account,
          password: md5(obj.password).toLocaleUpperCase()
        }
        this.loadingShow(true)
        ajax('POST', url, params).then((data) => {
          _this.factoryList = data.factorys
        }).catch(() => {
          alert('请求超时！')
          _this.loadingShow(false)
        })
      },
      getAccountMsg: function() {
        let accountMsg = localStorage.getItem('accountMsg')
        let obj = eval('(' + accountMsg + ')')
        return obj
      },
      setWarehouse: function() {
        let [_this, url, obj] = [this, path.oa + '/PDAWareHouse.jsp', this.getAccountMsg()]
        // 获取本地存储账号信息
        let params = {
          account: obj.account,
          password: md5(obj.password).toLocaleUpperCase(),
          factory: this.factoryVal
        }
        _this.loadingShow(true)
        ajax('POST', url, params).then((data) => {
          _this.warehouseList = data.warehouse
          _this.loadingShow(false)
        }).catch(() => {
          // alert('请求超时！')
          _this.loadingShow(false)
        })
      },
      changeFactory() {
        if (this.factoryVal !== '请选择工厂') {
          this.setLocalData('factoryVal', this.factoryVal)
          this.setWarehouse()
          this.warehouseVal = '请选择仓库'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.pandianSetting{
  ul{
    padding-top: $f15;
  }
  li{
    padding: 0 $f15;
    margin-top: $f15;
  }
  label{
    display: inline-block;
    height: 0.9375rem;
    width: 3rem;
    line-height: 0.9375rem;
    font-size: 0.4375rem;
    color: #999;
  }
  select{
    display: inline-block;
    height: 0.9375rem;
    width: 5rem;
    font-size: 0.375rem;
    color: #666;
    line-height: 0.9375rem;
    border: 1px solid #f0f0f0;
    border-radius: 0.125rem;
  }
  // a.edit{
  //   right: $f15;
  //   background: url(../../assets/img/3_set.png) no-repeat;
  // }
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .head{
      background: $col;
    }
  }
}
</style>
