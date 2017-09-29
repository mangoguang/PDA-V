<!-- <keep-alive> -->
<template>
  <div class="login" v-bind:style="{height: height+'px'}">
    <h1>欢迎使用扫描枪</h1>
    
    <form>
      <ul>
        <li>
          <label for="account">工号</label>
          <input id="account" name="account" type="number" v-model="account" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="8" autocomplete="off">
        </li>
        <li>
          <label for="password">密码</label>
          <input id="password" name="password" type="password" v-model="password" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="32" autocomplete="off">
        </li>
        <li>
          <button type="button" @click="login">登录</button>
        </li>
      </ul>
    </form>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { pathOA, V } from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Vuex组件',
      height: document.documentElement.clientHeight,
      account: null,
      password: null
    }
  },
  computed: {

  },
  methods: {
    login: function() {
      let _this = this
      let params = {
          // name: 'mango',
          // password: '123456'
          account: this.account,
          password: this.password
        }
      let url = pathOA + '/PDAUserCheck.jsp'
      // let url = pathLocal+'/login.php';
      V.post(url, params).then(function(data) {
        if (data.status) {
          // 保存账号密码到本地存储
          localStorage.setItem('accountMsg', "{account: '" + _this.account + "'," +
            "password: '" + _this.password + "'}")
          _this.$router.push({ path: '/select' })
        } else {
          alert('账号或者密码错误！')
        }
      })
    }
  },
  created: function () {
    // 获取本地存储的皮肤值
    let skinCol = localStorage.getItem('skinCol')
    console.log(skinCol)
    console.log('success')
    if (skinCol) {
    // 检测是否存在本地存储皮肤值
      this.$store.commit('changeSkin', skinCol)
    }

    // 获取本地存储账号信息
    let accountMsg = localStorage.getItem('accountMsg')
    if (accountMsg) {
      let obj = eval('(' + accountMsg + ')')
      this.account = obj.account
      this.password = obj.password
      console.log(obj)
    } else {
      console.log('没有本地存储')
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skin-red, $skin-red),(skin-blue, $skin-blue);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .login{
      background: $color;
    }
  }
}
</style>
