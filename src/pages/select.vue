<!-- <keep-alive> -->
<template>
  <div class="select" :style="{height: height+'px'}">
    <div class="photoBox">
      <img src="../assets/img/login/s1/3_pic.png" alt="">
      <h3>{{name}}</h3>
      <h2>选择相关区域</h2>
    </div>
    
    <form>
      <select id="factorys" v-model="factoryNum" @change="setWarehouse">
        <option v-for="factory in factorys" :value="factory.code" :key="factory.code">{{ factory.name }}</option>
      </select>
      <select id="warehouse" v-model="warehouseNum">
        <option v-for="warehouse in warehouses" :value="warehouse.code" :key="warehouse.code">{{ warehouse.name }}</option>
      </select>
      <input id="date" @click="openPicker" v-model="dateVal" type="text">
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm">
      </mt-datetime-picker>
      <!-- <Btn @click.native="openPicker">open</Btn> -->
      <div @click="select"><Btn>确定</Btn></div>
    </form>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import 'mint-ui/lib/style.min.css'
import { DatetimePicker, Button } from 'mint-ui'

import mango, {path, V, getFactorySel} from '../js/variable'
import Btn from '../components/btn'
import md5 from 'js-md5'
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Button.name, Button)

export default {
  name: 'Select',
  components: {Btn, DatetimePicker},
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
      factorys: [],
      warehouses: [],
      factory: '',
      warehouse: '',
      factoryNum: '',
      warehouseNum: '',
      warehouseStatus: false,
      name: this.$route.query.name,
      dateVal: '',
      account: localStorage.getItem('account'),
      pickerValue: new Date(),
      password: ''
    }
  },
  computed: {

  },
  created() {
    // 获取本地存储
    this.getStorage()
    this.$store.commit('changeSkin', localStorage.getItem('skinCol'))
  },
  mounted() {
    this.setFactorys()
    // 设置日期插件宽度，一个bug还是我打开min-ui的姿势不对？
    document.getElementsByClassName('picker-items')[0].style.width = this.width + 'px'
    // localStorage.setItem('name', this.name)
    // console.log('sssss', mango.storage.setStorage(this.account, 'name', 'guang').setStorage(this.account, 'age', 26))
    // console.log(mango.storage.getStorage(this.account))
    // console.log('jjjj', vuexI18n)
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    handleConfirm(date) {
      this.dateVal = date.toLocaleDateString().split('/').join('-')
    },
    openPicker() {
      this.$refs.picker.open()
    },
    getStorage() {
      let temp = mango.storage.getStorage(this.account)
      console.log(123, temp)
      if (temp['dateVal']) {
        this.dateVal = temp['dateVal']
      } else {
        this.handleConfirm(new Date())
      }
      if (temp['factoryNum']) {
        this.factoryNum = temp['factoryNum']
      }
      this.factory = temp['factory']
      this.warehouseNum = temp['warehouseNum']
      this.password = temp['password']
    },
    setStorage() {
      // 工厂、仓库、日期本地缓存
      mango.storage.setStorage(this.account, 'factory', this.factory)
      .setStorage(this.account, 'factoryNum', this.factoryNum)
      .setStorage(this.account, 'warehouse', this.warehouse)
      .setStorage(this.account, 'warehouseNum', this.warehouseNum)
      .setStorage(this.account, 'dateVal', this.dateVal)
      .setStorage(this.account, 'name', this.name)
      console.log('222', mango.storage.getStorage(this.account))
    },
    select: function() {
      console.log(this.warehouseNum)
      // localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "1012", warehouseNum: "' + this.warehouseNum + '"}')
      // let dateVal = document.getElementById('date').value
      if (this.dateVal === undefined || this.dateVal === '') {
        alert('请选择日期！')
        return
      }
      // 仓库名称与代号保持一致
      for (let i in this.warehouses) {
        if (this.warehouses[i].code === this.warehouseNum) {
          this.warehouse = this.warehouses[i].name
        }
      }

      // 工厂、仓库、日期本地缓存
      this.setStorage()

      // localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "' + this.factoryNum + '", warehouseNum: "' + this.warehouseNum + '"}')
      // localStorage.setItem('dateVal', dateVal)
      this.$router.push({ path: '/module?name=' + this.name })
    },
    setWarehouse: function() {
      let _this = this
      // let url = path.local + '/warehouse_sel.php'
      let url = path.oa + '/warehouse'
      // 获取本地存储账号信息
      let params = {
        account: this.account,
        password: this.password,
        factory: this.factoryNum
      }

      _this.loadingShow(true)
      this.$ajax.post(url, params).then(function(res) {
        let data = res.data
      // V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.warehouses = data.warehouse
          if (data.warehouse.length > 0) {
            if (!_this.warehouseNum || _this.warehouseStatus) {
              // 更改默认仓库
              _this.warehouse = data.warehouse[0].name
              _this.warehouseNum = data.warehouse[0].code
              console.log('successssss')
            } else {
              _this.warehouseStatus = true
            }
          }
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
    },
    // 设置工厂列表
    setFactorys: function() {
      // alert(this.factoryNum)
      let _this = this
      // let url = path.local + '/factory_sel.php'
      let url = path.oa + '/factory'
      let params = {
        account: this.account,
        password: this.password
      }
      _this.loadingShow(true)
      this.$ajax.post(url, params).then(function(res) {
          let data = res.data
      // V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        // let factoryMsg = localStorage.getItem('factoryMsg')
        if (data.status) {
          // if (!factoryMsg) {
          //   _this.factory = data.factorys[0].name
          //   _this.factoryNum = data.factorys[0].code
          // }
          _this.factorys = data.factorys
          _this.setWarehouse()
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
      // getFactorySel(this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/mint-ui.css";
@import "./../assets/css/common.css";

.select{
  position: absolute;
  top: 0;
  left: 0;
  width: 7rem;
  padding-top: 70px;
  box-sizing: border-box;
  margin: 0 1.5rem;
  background: #fff;
  div.photoBox{
    text-align: center;
    h2,h3{
      line-height: 2em;
      color: $textCol;
    }
    img{
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }
  form{
    padding-top: 20px;
  }
  select{
    display: block;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    background: #f0f0f0;
    border-radius: 4px;
    border: 1px solid $borderOut;
    text-indent: 10px;
  }
  form input{
    display: block;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    background: #f0f0f0;
    border-radius: 4px;
    border: 1px solid $borderOut;
    text-indent: 10px;
  }
  select:last-child{
    margin-bottom: 15px;
  }
}
</style>
