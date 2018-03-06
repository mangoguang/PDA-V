<template>
  <div id="app" v-bind:class="skinCol">
    <Loading></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
// import Vue from 'vue'
// import Vuex from 'vuex'
// import vueResource from 'vue-resource'
import {flexible} from './js/lib/properScreen.js'
import Login from './pages/login.vue'
import store from './store'
import Loading from './components/loading'

// Vue.use(vueResource)
flexible()

export default{
  name: 'app',
  store,
  // components: {ComponentHello}
  components: {Login, Loading},
  data () {
    return {
      height: document.documentElement.clientHeight,
      apiAjaxStatus: false
    }
  },
  computed: {
    skinCol() {
      return this.$store.state.skinCol
    }
  },
  created() {
    let _this = this
    window.apiready = function(url, params) {
      let ajax = new Promise(function(resolve, reject) {
        api.ajax({
          url: url,
          method: 'post',
          async: false,
          timeout: 30,
          dataType: 'text',
          returnAll: false,
          data: params
        },
        function(ret, err) {
          if (ret) {
            let data = JSON.parse(ret)
            resolve(data)
          } else {
            if (_this.apiAjaxStatus) {
              _this.apiAjaxStatus = true
              alert('请求超时！')
            }
            resolve(false)
          }
        })
      })
      return ajax
    }
  },
  mounted() {
    /* 水波纹 */
    var addRippleEffect = function(e) {
        var body = document.getElementById('app')
        console.log(body)
        var target = e.target
        if (target.tagName.toLowerCase() === '') return false
        var rect = target.getBoundingClientRect()
        var ripple = target.querySelector('.ripple')
        if (!ripple) {
            ripple = document.createElement('span')
            ripple.className = 'ripple'
            ripple.style.height = ripple.style.width = Math.max(30, 30) + 'px'
            body.appendChild(ripple)
        }
        ripple.classList.remove('show')
        var top = e.pageY - 15
        var left = e.pageX - 15
        ripple.style.top = top + 'px'
        ripple.style.left = left + 'px'
        ripple.classList.add('show')
        return false
    }

    document.addEventListener('click', addRippleEffect, false)
  }
}
</script>

<style lang="scss">
@import "./assets/sass/variable.scss";
@import "./assets/css/common.css";
.h25{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 25px;
  width: 100%;
}
/* 水波纹样式 */
span {
  position: relative;
  display: block;
  height: 3em;
  letter-spacing: .2em;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  border-radius: 2px;
}

.ripple {
  position: absolute;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  pointer-events: none;
  transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  -o-transform: scale(0);
  -ms-transform: scale(0);
  z-index: 9999;
  &.show {
    animation: ripple .75s ease-out;
    -moz-animation: ripple .75s ease-out;
    -webkit-animation: ripple .75s ease-out;
    -o-animation: ripple .75s ease-out;
    -ms-animation: ripple .75s ease-out;
  }
}
@keyframes ripple {
  to {
    transform: scale(2);
    -moz-transform: scale(2);
    -webkit-transform: scale(2);
    -o-transform: scale(2);
    -ms-transform: scale(2);
    opacity: 0;
  }
}


@-moz-keyframes ripple {
  to {
    transform: scale(2);
    -moz-transform: scale(2);
    -webkit-transform: scale(2);
    -o-transform: scale(2);
    -ms-transform: scale(2);
    opacity: 0;
  }
}


@-webkit-keyframes ripple {
  to {
    transform: scale(2);
    -moz-transform: scale(2);
    -webkit-transform: scale(2);
    -o-transform: scale(2);
    -ms-transform: scale(2);
    opacity: 0;
  }
}


@-o-keyframes ripple {
  to {
    transform: scale(2);
    -moz-transform: scale(2);
    -webkit-transform: scale(2);
    -o-transform: scale(2);
    -ms-transform: scale(2);
    opacity: 0;
  }
}


@-ms-keyframes ripple {
  to {
    transform: scale(2);
    -moz-transform: scale(2);
    -webkit-transform: scale(2);
    -o-transform: scale(2);
    -ms-transform: scale(2);
    opacity: 0;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .h25{
      background: $col;
    }
  }
}
</style>
