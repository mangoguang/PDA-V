import Vue from 'vue'
import VueRouter from 'vue-router'

// const Hello = resolve => require(['../components/Hello'], resolve)
// const World = resolve => require(['../components/World'], resolve)

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Login',
    component: resolve => require(['../pages/login'], resolve)
  }, {
    path: '/select',
    name: 'Select',
    component: resolve => require(['../pages/select'], resolve)
  }, {
    path: '/module',
    name: 'Module',
    component: resolve => require(['../pages/module'], resolve)
  }, {
    path: '/production',
    name: 'Production',
    component: resolve => require(['../pages/production/index'], resolve)
  }, {
    path: '/modules/:module',
    name: 'Modules',
    component: resolve => require(['../pages/modules/index'], resolve)
  }, {
    path: '/snList/:num',
    name: 'SNList',
    component: resolve => require(['../pages/modules/sn-list'], resolve)
  }, {
    path: '/setting',
    name: 'setting',
    component: resolve => require(['../pages/setting'], resolve)
  }, {
    path: '/salesReturn',
    name: 'SalesReturn',
    component: resolve => require(['../pages/salesReturn/index'], resolve)
  }, {
    path: '/allotIn',
    name: 'AllotIn',
    component: resolve => require(['../pages/allotIn/index'], resolve)
  }, {
    path: '/allotOut',
    name: 'AllotOut',
    component: resolve => require(['../pages/allotOut/index'], resolve)
  }, {
    path: '/stock',
    name: 'Stock',
    component: resolve => require(['../pages/stock/index'], resolve)
  }, {
    path: '/scanSearch',
    name: 'ScanSearch',
    component: resolve => require(['../pages/scanSearch/index'], resolve)
  }, {
    path: '/setting',
    name: 'Setting',
    component: resolve => require(['../pages/setting/index'], resolve)
  }, {
    path: '/check',
    name: 'Check',
    component: resolve => require(['../pages/check'], resolve)
  }, {
    path: '/edit',
    name: 'Edit',
    component: resolve => require(['../pages/edit'], resolve)
  }, {
    path: '*',
    name: '404',
    component: resolve => require(['../pages/404'], resolve)
  }]
})

