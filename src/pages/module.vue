<!-- <keep-alive> -->
<template>
  <div class="module">
    <div class="h25"></div>
    <HeadComponent>
      <h1>{{warehouse}}</h1>
    </HeadComponent>
    <ul class="clearfix moduleBox" :style="{height: (height - 73)+'px'}">
      <li 
      v-for="(module,index) in modules" 
      :key="module.coding"
      v-if="module.jurisdiction === 'true'"
      @click="toModule(module.coding, module.jurisdiction, module.name)" 
      :style="{
        background: 'url(./static/images/skinImg/' + skinCol + '/' + module.coding + '.png) no-repeat',
        backgroundSize: '100% 100%'}"
        @mouseover="addClass">
        <p>{{module.name}}</p>
      </li>
      <li 
      v-for="(module,index) in modules" 
      :key="module.coding"
      v-if="module.jurisdiction === 'false'"
      @click="toModule(module.coding, module.jurisdiction, module.name)" 
      :style="{
        background: 'url(./static/images/skinImg/' + skinCol + '/' + module.coding +'_1.png) no-repeat',
        backgroundSize: '100% 100%'}"
        @mouseover="addClass">
        <p>{{module.name}}</p>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, V, getFactorySel} from '../js/variable'
import HeadComponent from '../components/header'
import md5 from 'js-md5'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Module',
  components: {HeadComponent},
  data () {
    return {
      // skinCol: this.$store.state.skinCol,
      height: document.documentElement.clientHeight,
      account: null,
      password: null,
      modules: null,
      warehouse: '',
      factoryNum: '',
      warehouseNum: ''
    }
  },
  computed: {
    skinCol() {
      return localStorage.getItem('skinCol')
    }
  },
  methods: {
    addClass() {
      console.log('success')
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    jurisdiction: function() {
      let _this = this
      let url = path.oa + '/PDAPermission.jsp'
      // let url = path.local + '/jurisdiction.php'
      let params = {
        account: this.account,
        password: md5(this.password).toLocaleUpperCase(),
        factory: this.factoryNum,
        warehouse: this.warehouseNum
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          _this.modules = data.permissions
          // for (let i in _this.modules) {
          //   if (_this.modules[i].coding === 'salesReturn') {
          //     _this.modules[i].coding = 'salesreturn'
          //   }
          // }
        } else {
          alert('数据获取失败！')
        }
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    // 跳转对应模块
    toModule: function(module, status, moduleName) {
      if (status === 'true') {
        if (module === 'setting') {
          this.$router.push({ path: '/setting' })
        } else {
          this.$router.push({ path: '/modules/' + module + '?moduleName=' + moduleName })
        }
      } else {
        alert('您没有读取该模块内容的权限。')
      }
    },
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let obj = eval('(' + accountMsg + ')')
      return obj
    }
  },
  created: function() {
    // 设置注销的回退步数
    localStorage.setItem('routeIndex', '3')
    getFactorySel(this)
    let obj = this.getAccountMsg()
    this.account = obj.account
    this.password = obj.password
    this.$store.commit('changeSkin', localStorage.getItem('skinCol'))
  },
  mounted() {
    this.jurisdiction()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";

.module{
  ul{
    width: 100%;
    padding-left: $f20;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  li{
    float: left;
    width: 2.5rem;
    height: 3.4375rem;
    text-align: center;
    background-size: 100% 100%;
    margin: $f20 $f20 0 0;
    border-radius: $f4;
    color: #fff;
    p{
      font-size: $textSize;
      line-height: 2.2em;
    }
  }
}
</style>
