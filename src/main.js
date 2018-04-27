// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import { DatetimePicker } from 'mint-ui'
import App from './App'
import axios from 'axios'
// Vue.component(DatetimePicker.name, DatetimePicker)
import {
  router
} from './router/index.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.prototype.$ajax = axios
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
