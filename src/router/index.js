import Vue from 'vue'
import VueRouter from 'vue-router'

// const Hello = resolve => require(['../components/Hello'], resolve)
// const World = resolve => require(['../components/World'], resolve)

Vue.use(VueRouter)

export var router = new VueRouter({
  // mode: 'history',
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
    path: '/cropper',
    name: 'Cropper',
    component: resolve => require(['../pages/cropper'], resolve)
  }, {
    path: '/pandian',
    name: 'Pandian',
    component: resolve => require(['../pages/pandian'], resolve)
  },
  // 模块路由
  {
    path: '/purchase',
    name: 'Purchase',
    component: resolve => require(['../pages/purchase'], resolve)
  }, {
    path: '/purchase/:num',
    name: 'PurchaseSN',
    component: resolve => require(['../pages/purchase/child'], resolve)
  }, {
    path: '/allotIn',
    name: 'allotIn',
    component: resolve => require(['../pages/allotIn'], resolve)
  }, {
    path: '/allotIn/:num',
    name: 'AllotInSN',
    component: resolve => require(['../pages/allotIn/child'], resolve)
  }, {
    path: '/product',
    name: 'Product',
    component: resolve => require(['../pages/product'], resolve)
  }, {
    path: '/product/:num',
    name: 'ProductSN',
    component: resolve => require(['../pages/product/child'], resolve)
  }, {
    path: '/sales',
    name: 'Sales',
    component: resolve => require(['../pages/sales'], resolve)
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
    path: '/checkSetting',
    name: 'CheckSetting',
    component: resolve => require(['../pages/check/setting'], resolve)
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

