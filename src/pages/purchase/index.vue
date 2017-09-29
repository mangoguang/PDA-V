<!-- <keep-alive> -->
<template>
  <div class="purchase" v-bind:style="{height: height+'px'}">
    <h2>采购入库页面</h2>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {pathOA} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Purchase',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    
  },
  methods:{
    getOrderList:function(){
      let url = 'http://10.12.0.153:50100/RESTAdapter/purchase/getcity?WERKS=1010&LGORT=1001';
      // let url = pathLocal+'/purchase/getlist.php';

      V.get(url).then(function(data) {
        alert(data.responseText)
        // data = JSON.parse(data.responseText);
        // console.log(data.MT_Purchase_GetInCity_Resp.Item);
      }, function(value) {
        console.log(value);
      });
    }
  },
  created: function(){

  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
 