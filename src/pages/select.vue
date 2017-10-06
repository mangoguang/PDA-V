<!-- <keep-alive> -->
<template>
  <div class="select" v-bind:style="{height: height+'px'}">
    <div class="photoBox">
      <img src="../assets/img/login/s1/3_pic.png" alt="">
      <h3>{{name}}</h3>
      <h2>选择相关区域</h2>
    </div>
    
    <form>
      <select id="factorys" v-model="factorySel" @change="setWarehouse">
        <option v-for="factory in factorys" :value="factory">{{ factory }}</option>
      </select>
      <select id="warehouse" v-model="warehouseSel">
        <option v-for="warehouse in warehouses" :value="warehouse">{{ warehouse }}</option>
      </select>
      <div v-on:click="select"><Btn>确定</Btn></div>
<!--       <button @click="select" type="button">确定</button> -->
    </form>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {pathLocal, V} from '../js/variable'
import Btn from '../components/btn'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Select',
  components: {Btn},
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight,
      factorys: [],
      warehouses: [],
      factorySel: '',
      warehouseSel: '',
      warehouseStatus: false,
      name: '刘淑婷'
    }
  },
  computed: {

  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    select: function() {
      localStorage.setItem('factoryMsg', '{factory: "' + this.factorySel + '",warehouse: "' + this.warehouseSel + '"}')
      this.$router.push({ path: '/module' })
    },
    setWarehouse: function() {
      let _this = this
      let url = pathLocal + '/warehouse_sel.php'
      // let url = pathOA + '/PDAWareHouse.jsp'
      let obj = this.getAccountMsg()
      // 获取本地存储账号信息
      let params = {
        account: obj.account,
        password: obj.password,
        factory: this.factorySel
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        console.log('success')
        console.log(data)
        if (data.status) {
          _this.warehouses = data.warehouse
          if (_this.warehouseStatus) {
            // 更改默认仓库
            _this.warehouseSel = data.warehouse[0]
          } else {
            _this.warehouseStatus = true
          }
          console.log(data.warehouse)
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
    },
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let obj = eval('(' + accountMsg + ')')
      return obj
    },
    getFactorySel: function() {
      // 获取本地存储默认工厂
      let factoryMsg = localStorage.getItem('factoryMsg')
      let factoryObj = eval('(' + factoryMsg + ')')
      if (factoryMsg) {
        this.factorySel = factoryObj.factory
        this.warehouseSel = factoryObj.warehouse
      } else {
        console.log('没有本地存储')
      }
    },
    // 设置工厂列表
    setFactorys: function() {
      let _this = this
      // 获取本地存储的账号信息
      let obj = this.getAccountMsg()
      let url = pathLocal + '/factory_sel.php'
      // let url = pathOA + '/PDAFactory.jsp'
      let params = {
        // name: this.factorySel,
        // password: this.warehouseSel
        account: obj.account,
        password: obj.password
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        console.log(data)
        if (data.status) {
          _this.factorys = data.factorys
          _this.setWarehouse()
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
      this.getFactorySel()
    }
  },
  created: function () {
  },
  mounted() {
    this.setFactorys()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol, $loginBg in $skin-data {
  .#{$skin} {
    .select{
      width: 70%;
      padding-top: 70px;
      margin: 0 auto;
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
      select:last-child{
        margin-bottom: 15px;
      }
    }
  }
}
</style>
