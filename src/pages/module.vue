<!-- <keep-alive> -->
<template>
  <div class="module" v-bind:style="{height: height+'px'}">
    <ul>
      <li v-for="module in modules" @click="toModule(module.coding,module.jurisdiction)">{{module.name}}</li>
    </ul>
    <button type="button" @click="changeSkin">换肤</button>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {pathOA,V,pathLocal} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Module',
  data () {
    return {
      height: document.documentElement.clientHeight,
      account: null,
      password: null,
      modules: null
    }
  },
  computed: {
    skinCol(){
      return this.$store.state.skinCol;
    }
  },
  methods:{
    changeSkin: function(){
      this.$store.commit('changeSkin');
    },
    jurisdiction: function(){
      let _this = this;
      let url = pathOA+'/PDAPermission.jsp';
      // let url = pathLocal+'/jurisdiction.php';
      let params = {
        account: 11605002,
        password: 'ADF00707A1C0154A9AD8EDB57C8646F4',
        factory: '工厂一',
        warehouse: '仓库二'
      }
      V.post(url,params).then(function(data) {
        if(data.status){
          console.log(data);
          _this.modules = data.permissions;
        }else{
          alert('数据获取失败！');
        }
      }).catch((res) => {
        alert('您的网络有问题。');
      });
    },
    //跳转对应模块
    toModule: function(module,status){
      if(status){
        this.$router.push({ path: '/'+module });
      }
    }
  },
  created: function(){

  },
  mounted(){
    this.jurisdiction();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
$skin-data: (skin-red, $skin-red),(skin-blue, $skin-blue);
@each $skin, $color in $skin-data {
  .#{$skin} {
    .module{
      background: $color;
    }
  }
}
</style>
 