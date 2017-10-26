<!-- <keep-alive> -->
<template>
  <div class="select" v-bind:style="{height: height+'px'}">
    <div class="photoBox">
      <img src="../assets/img/login/s1/3_pic.png" alt="">
      <h3>{{name}}</h3>
      <h2>选择相关区域</h2>
    </div>
    
    <form>
      <select id="factorys" v-model="factorySelNum" @change="setWarehouse">
        <option v-for="factory in factorys" :value="factory.code">{{ factory.name }}</option>
      </select>
      <select id="warehouse" v-model="warehouseSelNum">
        <option v-for="warehouse in warehouses" :value="warehouse.code">{{ warehouse.name }}</option>
      </select>
      <div @click="select"><Btn>确定</Btn></div>
<!--       <button @click="select" type="button">确定</button> -->
    </form>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, V} from '../js/variable'
import Btn from '../components/btn'
import md5 from 'js-md5'
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
      factorySelNum: '',
      warehouseSelNum: '',
      warehouseStatus: false,
      name: this.$route.query.name
    }
  },
  computed: {

  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    select: function() {
      localStorage.setItem('factoryMsg', '{factory: "' + this.factorySel + '",warehouse: "' + this.warehouseSel + '", factorySelNum: "' + this.factorySelNum + '", warehouseSelNum: "' + this.warehouseSelNum + '"}')
      // 仓库名称与代号保持一致
      for (let i in this.warehouses) {
        if (this.warehouses[i].code === this.warehouseSelNum) {
          this.warehouseSel = this.warehouses[i].name
        }
      }
      this.$router.push({ path: '/module?name=' + this.name + '&factoryNum=' + this.factorySelNum + '&warehouseNum=' + this.warehouseSelNum + '&warehouse=' + this.warehouseSel })
    },
    setWarehouse: function() {
      let _this = this
      // let url = path.local + '/warehouse_sel.php'
      let url = path.oa + '/PDAWareHouse.jsp'
      let obj = this.getAccountMsg()
      // 获取本地存储账号信息
      let params = {
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase(),
        factory: this.factorySelNum
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.warehouses = data.warehouse
          if (_this.warehouseStatus) {
            // 更改默认仓库
            _this.warehouseSel = data.warehouse[0].name
          } else {
            let factoryMsg = localStorage.getItem('factoryMsg')
            if (!factoryMsg) {
              _this.warehouseSel = data.warehouse[0].name
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
        this.factorySelNum = factoryObj.factorySelNum
        this.warehouseSel = factoryObj.warehouse
        this.warehouseSelNum = factoryObj.warehouseSelNum
      } else {
        // this.factorySel = this.factorys[0].name
      }
    },
    // 设置工厂列表
    setFactorys: function() {
      let _this = this
      // 获取本地存储的账号信息
      let obj = this.getAccountMsg()
      // let url = path.local + '/factory_sel.php'
      let url = path.oa + '/PDAFactory.jsp'
      let params = {
        // name: this.factorySel,
        // password: md5(this.warehouseSel).toLocaleUpperCase()
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.factorys = data.factorys
          _this.factorySel = data.factorys[0].name
          _this.setWarehouse()
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
      this.getFactorySel()
    }
  },
  created() {
    this.setFactorys()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

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
</style>
