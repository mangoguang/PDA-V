<!-- <keep-alive> -->
<template>
  <div class="login" v-bind:style="{height: height+'px', background: 'url(./static/images/skinImg/' + skinCol + '/bg.png)','background-size': '100% 100%'}">
    <form>
      <h1>欢迎使用仓卫</h1>
      <ul>
        <li>
          <label for="account"></label>
          <input id="account" name="account" type="number" v-model="account" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="8" autocomplete="off" placeholder="请输入用户名">
        </li>
        <li>
          <label for="password"></label>
          <input id="password" name="password" type="password" v-model="password" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="32" autocomplete="off" placeholder="请输入密码">
        </li>
        <!-- mint ui基于vue2的日期插件 -->
        <!-- <li @click="openPicker">
          <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="datetime"
            @confirm="getDate">
          </mt-datetime-picker>
        </li> -->
        <li>
          <button type="button" @click="login">登录</button>
        </li>
      </ul>
    </form>
    <!-- <a class="internetCheck" href="http://10.12.0.175:81">网络测试</a> -->
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import md5 from 'js-md5'
import mango, { path, V } from '../js/variable.js'
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
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  created: function () {
    // localStorage.removeItem('mangoStrage')
    // localStorage.removeItem('account')
    // 获取本地存储的皮肤值
    this.setSkinCol()
    // this.skinCol = localStorage.getItem('skinCol')
    // if (this.skinCol) {
    // // 检测是否存在本地存储皮肤值
    //   this.$store.commit('changeSkin', this.skinCol)
    // } else {
    //   this.skinCol = 'skinA'
    //   this.$store.commit('changeSkin', 'skinA')
    //   localStorage.setItem('skinCol', 'skinA')
    // }
    // 获取本地存储账号信息
    // let accountMsg = localStorage.getItem('accountMsg')
    // console.log(accountMsg)
    // if (accountMsg) {
    //   let obj = eval('(' + accountMsg + ')')
    //   this.account = obj.account
    //   this.password = obj.password
    // } else {
    //   console.log('没有本地存储')
    // }
    this.loadingShow(false)
  },
  mounted() {
    this.initAccountMsg()
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    initAccountMsg() {
      let temp = localStorage.getItem('account')
      if (temp) {
        this.account = temp
        temp = mango.storage.getStorage(this.account)
        if (temp) {
          this.password = temp['password']
        } else {
          this.password = ''
        }
      } else {
        this.account = ''
        this.password = ''
      }
    },
    setSkinCol() {
      let temp = localStorage.getItem('account')
      if (!temp) {
        this.skinCol = 'skinA'
        this.$store.commit('changeSkin', 'skinA')
      } else {
        let skinCol = mango.storage.getStorage(temp)['skinCol']
        if (skinCol) {
          this.$store.commit('changeSkin', skinCol)
          mango.storage.setStorage(temp, 'skinCol', skinCol)
        } else {
          this.$store.commit('changeSkin', 'skinA')
          mango.storage.setStorage(temp, 'skinCol', 'skinA')
        }
      }
      console.log('皮肤：', this.$store.state.skinCol, this.skinCol)
    },
    login: function() {
      let _this = this
      let params = {
        // name: 'mango',
        // password: '123456'
        account: this.account,
        password: this.password
        // password: md5(this.password).toLocaleUpperCase()
      }
      let url = path.oa + '/login'
      // let url = path.oa + '/PDAUserCheck.jsp'
      // let url = path.local + '/login.php'
      if (_this.canClick) {
        _this.canClick = false
        _this.loadingShow(true)
        this.$ajax.post(url, params).then(function(res) {
          let data = res.data
        // V.post(url, params).then(function(data) {
          console.log('success', data)
          _this.canClick = true
          _this.loadingShow(false)
          if (data.status) {
            // 初始化本基于本账号的本地存储
            mango.storage.initStorage(_this.account)
            // 将盘点单号及盘点版本的本地缓存清空1
            mango.storage.setStorage(_this.account, 'orderNo', '')
            mango.storage.setStorage(_this.account, 'version', '')
            localStorage.setItem('account', _this.account)
            mango.storage.setStorage(_this.account, 'password', _this.password)
            _this.$router.push({ path: '/select?name=' + data.name })
          } else {
            alert(data.msg)
          }
        })
        // .catch((res) => {
        //   alert('请求超时！')
        //   _this.canClick = true
        //   _this.loadingShow(false)
        // })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.login{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  form{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6.25rem;
    margin-top: -3.125rem;
  }
  h1{
    color: #fff;
    margin: $f15 auto;
  }
  li{
    position: relative;
    height: $f30;
    width: 80%;
    background: rgba(255,255,255,0.2);
    margin-bottom: $f5;
    margin-left: 10%;
    input{
      display: block;
      width: 100%;
      line-height: $f30;
      padding-left: $f40;
      box-sizing: border-box;
      color: $s1btnBgCol;
    }
    #account{
      background: url(../assets/img/login/1_user.png) no-repeat;
      background-size: .59375rem .59375rem;
      background-position: $f5;
    }
    #password{
      background: url(../assets/img/login/2_Lock.png) no-repeat;
      background-size: .59375rem .59375rem;
      background-position: $f5;
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
    top: $f5; 
    left: $f30;
    display: block;
    content: "";
    width: 1px;
    height: .59375rem;
    background: $s1btnBgCol;
  }
  button{
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: $btnSize;
    border-radius: $f4;
  }
}
li:last-child{
  height: $f40;
  margin-top: $f20;
}

.internetCheck{
  position: absolute;
  bottom: .5rem;
  left: 50%;
  width: 1.6rem;
  height: .6rem;
  line-height: .6rem;
  text-align: center;
  margin-left: -1.1rem;
  padding-left: .6rem;
  text-decoration: none;
  color: #fff;
  background: url(../assets/img/login/wifi.png) no-repeat;
  background-size: .6rem auto;
  background-position: 0 center;
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .login{
      li{
        input{
          color: $btnBgCol;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: $btnBgCol;
        } input:-moz-placeholder, textarea:-moz-placeholder {
          color: $btnBgCol;
        } input::-moz-placeholder, textarea::-moz-placeholder {
          color: $btnBgCol;
        } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: $btnBgCol;
        }
      }
      label:after{
        background: $btnBgCol;
      }
      button{
        background: $btnBgCol;
      }
    }
  }
}
</style>
