<!-- <keep-alive> -->
<template>
  <div class="module" v-bind:style="{height: height+'px'}">
    <HeadComponent>
      <h1>{{warehouse}}</h1>
    </HeadComponent>
    <ul class="clearfix">
      <li 
      v-for="(module,index) in modules" 
      @click="toModule(module.coding, module.jurisdiction, module.name)" 
      v-bind:style="{
        background: 'url(./static/images/modules/module'+(index+1)+'.png) no-repeat',
        backgroundSize: '100% 100%'}"
        @mouseover="addClass">
        <p>{{module.name}}</p>
      </li>
    </ul>
    <button type="button" @click="changeSkin('skinA')">skinA</button>
    <button type="button" @click="changeSkin('skinB')">skinB</button>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, V} from '../js/variable'
import HeadComponent from '../components/header'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Module',
  components: {HeadComponent},
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: null,
      password: null,
      modules: null,
      warehouse: this.$route.query.warehouse
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  methods: {
    addClass() {
      console.log('success')
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    changeSkin: function(skinCol) {
      this.$store.commit('changeSkin', skinCol)
      localStorage.setItem('skinCol', skinCol)
    },
    jurisdiction: function() {
      let _this = this
      let url = path.oa + '/PDAPermission.jsp'
      // let url = path.local + '/jurisdiction.php'
      let params = {
        account: this.account,
        password: this.password,
        factory: '工厂一',
        warehouse: '仓库二'
      }

      _this.loadingShow(true)
      V.post(url, params).then(function(data) {
        _this.loadingShow(false)
        if (data.status) {
          console.log(data)
          _this.modules = data.permissions
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
      if (status) {
        this.$router.push({ path: '/modules/' + module + '?warehouse=' + this.warehouse + '&moduleName=' + moduleName })
      }
    },
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let obj = eval('(' + accountMsg + ')')
      return obj
    }
  },
  created: function() {
    let obj = this.getAccountMsg()
    this.account = obj.account
    this.password = obj.password
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
