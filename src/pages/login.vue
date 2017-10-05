<!-- <keep-alive> -->
<template>
  <div class="login" v-bind:style="{height: height+'px'}">
    <form>
      <h1>欢迎使用扫描枪</h1>
      <ul>
        <li>
          <label for="account"></label>
          <input id="account" name="account" type="number" v-model="account" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="8" autocomplete="off" placeholder="请输入用户名">
        </li>
        <li>
          <label for="password"></label>
          <input id="password" name="password" type="password" v-model="password" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="32" autocomplete="off" placeholder="请输入密码">
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
import { pathLocal, V } from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Login',
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: null,
      password: null,
      // 按钮是否可点击
      canClick: true
    }
  },
  computed: {

  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    login: function() {
      let _this = this
      let params = {
          name: 'mango',
          password: '123456'
          // account: this.account,
          // password: this.password
        }
      // let url = pathOA + '/PDAUserCheck.jsp'
      let url = pathLocal + '/login.php'
      if (_this.canClick) {
        _this.canClick = false
        _this.loadingShow(true)
        V.post(url, params).then(function(data) {
          _this.canClick = true
          _this.loadingShow(false)
          if (data.status) {
            // 保存账号密码到本地存储
            localStorage.setItem('accountMsg', "{account: '" + _this.account + "'," +
              "password: '" + _this.password + "'}")
            _this.$router.push({ path: '/select' })
          } else {
            alert('账号或者密码错误！')
          }
        }).catch((res) => {
          alert('请求超时！')
          _this.canClick = true
          _this.loadingShow(false)
        })
      }
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
    this.loadingShow(false)
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

$skin-data: (skinA, $s1Col),(skinB, $s2Col);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .login{
      background: $s1loginBg no-repeat;
      background-size: 100% 100%;
      form{
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 200px;
        margin-top: -100px;
      }
      h1{
        color: #fff;
        margin: 10px auto;
      }
      li{
        position: relative;
        height: 30px;
        width: 80%;
        background: rgba(255,255,255,0.2);
        margin-bottom: 5px;
        input{
          display: block;
          width: 100%;
          line-height: 30px;
          padding-left: 40px;
          box-sizing: border-box;
          color: $s1btnBgCol;
        }
        #account{
          background: url(../assets/img/login/1_user.png) no-repeat;
          background-size: 19px 19px;
          background-position: 5px 5px;
        }
        #password{
          background: url(../assets/img/login/2_Lock.png) no-repeat;
          background-size: 19px 19px;
          background-position: 5px 5px;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: $s1btnBgCol;
        } input:-moz-placeholder, textarea:-moz-placeholder {
          color: $s1btnBgCol;
        } input::-moz-placeholder, textarea::-moz-placeholder {
          color: $s1btnBgCol;
        } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: $s1btnBgCol;
        }
      }
      label:after{
        position: absolute;
        top: 5px; 
        left: 29px;
        display: block;
        content: "";
        width: 1px;
        height: 19px;
        background: $s1btnBgCol;
      }
      button{
        width: 100%;
        height: 100%;
        background: $s1btnBgCol;
        color: #fff;
        font-size: $btnSize;
        border-radius: 4px;
      }
    }
    li:last-child{
      height: 40px;
      margin-top: 20px;
    }
  }
}
</style>
