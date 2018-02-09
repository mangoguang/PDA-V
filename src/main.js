// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import { DatetimePicker } from 'mint-ui'
import App from './App'
// Vue.component(DatetimePicker.name, DatetimePicker)
import {
  router
} from './router/index.js'
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
