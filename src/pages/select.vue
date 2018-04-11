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
        <option v-for="factory in factorys" :value="factory.code">{{ factory.name }}</option>
      </select>
      <select id="warehouse" v-model="warehouseNum">
        <option v-for="warehouse in warehouses" :value="warehouse.code">{{ warehouse.name }}</option>
      </select>
      <input v-model="dateVal" type="text" class="demo-input" placeholder="请选择日期" id="date">
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
import {path, V, getFactorySel} from '../js/variable'
import Btn from '../components/btn'
import md5 from 'js-md5'
import laydate from '../js/lib/laydate'
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
      factory: '',
      warehouse: '',
      factoryNum: '',
      warehouseNum: '',
      warehouseStatus: false,
      name: this.$route.query.name,
      dateVal: ''
    }
  },
  computed: {

  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    select: function() {
      // localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "1012", warehouseNum: "' + this.warehouseNum + '"}')
      let dateVal = document.getElementById('date').value
      // 仓库名称与代号保持一致
      for (let i in this.warehouses) {
        if (this.warehouses[i].code === this.warehouseNum) {
          this.warehouse = this.warehouses[i].name
        }
      }
      localStorage.setItem('factoryMsg', '{factory: "' + this.factory + '",warehouse: "' + this.warehouse + '", factoryNum: "' + this.factoryNum + '", warehouseNum: "' + this.warehouseNum + '"}')
      if (dateVal === undefined || dateVal === '') {
        alert('请选择日期！')
        return
      } else {
        localStorage.setItem('dateVal', dateVal)
      }
      this.$router.push({ path: '/module?name=' + this.name })

      // this.$router.push({ path: '/module?name=' + this.name + '&factoryNum=1012&warehouseNum=' + this.warehouseNum + '&warehouse=' + this.warehouse })
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
        factory: this.factoryNum
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.warehouses = data.warehouse
          if (data.warehouse.length > 0) {
            if (_this.warehouseStatus) {
              // 更改默认仓库
              _this.warehouse = data.warehouse[0].name
              _this.warehouseNum = data.warehouse[0].code
            } else {
              let factoryMsg = localStorage.getItem('factoryMsg')
              if (!factoryMsg) {
                _this.warehouse = data.warehouse[0].name
                _this.warehouseNum = data.warehouse[0].code
              } else {
                _this.warehouseStatus = true
              }
            }
          }
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
    },
    // changeWarehouse() {

    // },
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let obj = eval('(' + accountMsg + ')')
      return obj
    },
    // getFactory: function() {
    //   // 获取本地存储默认工厂
    //   let factoryMsg = localStorage.getItem('factoryMsg')
    //   let factoryObj = eval('(' + factoryMsg + ')')
    //   if (factoryMsg) {
    //     this.factory = factoryObj.factory
    //     this.factoryNum = factoryObj.factoryNum
    //     this.warehouse = factoryObj.warehouse
    //     this.warehouseNum = factoryObj.warehouseNum
    //   } else {
    //     // this.factory = this.factorys[0].name
    //   }
    // },
    // 设置工厂列表
    setFactorys: function() {
      let _this = this
      // 获取本地存储的账号信息
      let obj = this.getAccountMsg()
      // let url = path.local + '/factory_sel.php'
      let url = path.oa + '/PDAFactory.jsp'
      let params = {
        // name: this.factory,
        // password: md5(this.warehouse).toLocaleUpperCase()
        account: obj.account,
        password: md5(obj.password).toLocaleUpperCase()
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        let factoryMsg = localStorage.getItem('factoryMsg')
        if (data.status) {
          if (!factoryMsg) {
            _this.factory = data.factorys[0].name
            _this.factoryNum = data.factorys[0].code
          }
          _this.factorys = data.factorys
          _this.setWarehouse()
        }
      }).catch((res) => {
        alert('您的网络有问题。')
        _this.loadingShow(false)
      })
      getFactorySel(this)
    }
  },
  created() {
    this.setFactorys()
    this.$store.commit('changeSkin', localStorage.getItem('skinCol'))
  },
  mounted() {
    localStorage.setItem('name', this.name)
    let timestamp = Date.parse(new Date())
    // 执行一个laydate实例
    laydate.render({
      elem: '#date', // 指定元素
      value: new Date(timestamp)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
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
