<template>
  <div class="pandianSetting">
    <div class="h25"></div>
    <head-component>
      <h1 click="test">盘点设置</h1>
    </head-component>
    <ul>
      <select-component
      ref="factorySelect"
      @changeSelectVal="selectFactory"
      :dataName="'factoryVal'"
      :selectVal="factoryVal"
      :labelText = "'盘点工厂'"
      :firstOption = "'请选择工厂'"
      :selectArr="factoryList.map(function(item) {
        return {name: item.name, key: item.code}
      })"></select-component>

      <select-component
      ref="wareHouseSelect"
      @changeSelectVal="selectWarehouse"
      :dataName="'wareHouseVal'"
      :selectVal="wareHouseVal"
      :labelText = "'盘点仓库'"
      :firstOption = "'请选择仓库'"
      :selectArr="wareHouseList.map(function(item) {
        return {name: item.name, key: item.code}
      })"></select-component>

      <select-component
      @changeSelectVal="selectType"
      :dataName="'typeVal'"
      :selectVal="typeVal"
      :labelText = "'盘点方式'"
      :firstOption = "'请选择盘点方式'"
      :selectArr="[{name: '精盘', code: 1}, {name: '通盘', code: 0}].map(function(item) {
        return {name: item.name, key: item.code}
      })"></select-component>
        <!-- <select v-model="factoryVal" @change="changeFactory" name="factory" id="">
          <option value="请选择工厂">请选择工厂</option>
          <option v-for="item in factoryList" :key="item.code" :value="item.code">{{item.name}}</option>
        </select> -->
      <!-- <li>
        <label for="factory">盘点仓库</label>
        <select v-model="wareHouseVal" name="factory" id="">
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
      </li> -->
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import HeadComponent from '../../components/check/header'
import SelectComponent from '../../components/check/select'
import {path, ajax} from '../../js/variable.js'
import md5 from 'js-md5'
  export default {
    name: 'Head',
    // props: ['settingShow'],
    components: {HeadComponent, SelectComponent},
    data() {
      return {
        factoryList: [],
        wareHouseList: [],
        PDFactory: '',
        factoryVal: '请选择工厂',
        wareHouseVal: '请选择仓库',
        typeVal: '请选择盘点方式',
        key: true
      }
    },
    // watch: {
    //   'PDFactory': () => {
    //     console.log('success')
    //   },
    //   // 'factoryVal': function() {
    //   //   this.setLocalData('factoryVal', this.factoryVal)
    //   //   // 设置仓库
    //   //   this.setWareHouse()
    //   // },
    //   'wareHouseVal': function() {
    //     this.setLocalData('wareHouseVal', this.wareHouseVal)
    //   },
    //   'typeVal': function() {
    //     this.setLocalData('typeVal', this.typeVal)
    //   }
    // },
    beforeCreated() {
      this.key = false
    },
    created() {
      // localStorage.removeItem('settingData')
      if (!localStorage.getItem('settingData')) {
        localStorage.setItem('settingData', '{}')
      }
    },
    mounted() {
      this.$store.commit('loadingShow', false)
      this.setSelectVal()
      this.key = true
      this.getFactory()
      this.setWareHouse()
      let Book = function() {
        this.sayName = function() {
          console.log(this.name)
        }
        this.name = 'javascript设计模式'
      }
      let book = new Book()
      book.sayName()
      // console.log('00000', this.wareHouseList)
    },
    // beforeDestoryed() {
    //   alert('确定后退么？')
    // },
    destroyed() {
      if (!this.wareHouseVal || !this.typeVal || this.wareHouseVal === '请选择仓库' || this.typeVal === '请选择盘点模式') {
        alert('请选择仓库或者盘点模式！')
        this.$router.go(1)
      }
    },
    methods: {
      test() {
        this.factoryVal = 1030
      },
      back() {
        this.$router.go(1)
      },
      loadingShow: function(x) {
        this.$store.commit('loadingShow', x)
      },
      selectFactory(value) {
        this.factoryVal = value
        this.$refs.wareHouseSelect.$emit('resetSelectVal', '请选择仓库')
        this.setLocalData('wareHouseVal', '请选择仓库')
        if (value !== '请选择工厂') {
          this.setLocalData('factoryVal', value)
          this.wareHouseVal = '请选择仓库'
          this.setWareHouse()
        }
      },
      selectWarehouse(value) {
        this.wareHouseVal = value
        this.setLocalData('wareHouseVal', value)
      },
      selectType(value) {
        this.typeVal = value
        this.setLocalData('typeVal', value)
      },

      // 设置本地存储
      setLocalData(item, value) {
        let temp = JSON.parse(localStorage.getItem('settingData'))
        temp[item] = value
        localStorage.setItem('settingData', JSON.stringify(temp))
      },
      setSelectVal() {
        let temp = JSON.parse(localStorage.getItem('settingData'))
        if (temp) {
          this.factoryVal = temp.factoryVal
          this.wareHouseVal = temp.wareHouseVal
          this.typeVal = temp.typeVal
        }
      },

      // 获取工厂列表
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

      // 获取账号信息
      getAccountMsg: function() {
        let accountMsg = localStorage.getItem('accountMsg')
        let obj = eval('(' + accountMsg + ')')
        return obj
      },

      // 获取仓库列表
      setWareHouse: function() {
        let [_this, url, obj] = [this, path.oa + '/PDAWareHouse.jsp', this.getAccountMsg()]
        // 获取本地存储账号信息
        let params = {
          account: obj.account,
          password: md5(obj.password).toLocaleUpperCase(),
          factory: this.factoryVal
        }
        _this.loadingShow(true)
        ajax('POST', url, params).then((data) => {
          _this.wareHouseList = data.warehouse
          console.log(888, data)
          _this.loadingShow(false)
        }).catch(() => {
          // alert('请求超时！')
          _this.loadingShow(false)
        })
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
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .head{
      background: $col;
    }
  }
}
</style>
