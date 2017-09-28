import Vue from 'vue'
import VueRouter from 'vue-router'

// const Hello = resolve => require(['../components/Hello'], resolve)
// const World = resolve => require(['../components/World'], resolve)

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Login',
    component: require('../pages/login')
  },{
    path: '/select',
    name: 'Select',
    component: require('../pages/select')
  },{
    path: '/module',
    name: 'Module',
    component: require('../pages/module')
  },{
    path: '/production',
    name: 'Production',
    component: require('../pages/production/index')
  },{
    path: '/purchase',
    name: 'Purchase',
    component: require('../pages/purchase/index')
  },{
    path: '/salesReturn',
    name: 'SalesReturn',
    component: require('../pages/salesReturn/index')
  },{
    path: '/allotIn',
    name: 'AllotIn',
    component: require('../pages/allotIn/index')
  },{
    path: '/allotOut',
    name: 'AllotOut',
    component: require('../pages/allotOut/index')
  },{
    path: '/stock',
    name: 'Stock',
    component: require('../pages/stock/index')
  },{
    path: '/scanSearch',
    name: 'ScanSearch',
    component: require('../pages/scanSearch/index')
  },{
    path: '/setting',
    name: 'Setting',
    component: require('../pages/setting/index')
  },{
    path: '/vuex',
    name: 'Vuex',
    component: require('../pages/vuex')
  }]
})