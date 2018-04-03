<template>
  <div>
    <TableH v-if="isTr3"></TableH>
    <TableH v-else></TableH>
    <div class="snBox wrapper" ref="wrapper" :style="{height: (height - 6.8675 * fontSize) + 'px'}">
      <ul id="content" class="content clearfix table-tr-sn" ref="content">
        <li v-for="(sn,index) in sns">
          <!-- 表格为三列 -->
          <div v-if="isTr3">
            <ul>
              <li class="li1">{{index+1}}</li>
              <li class="li2 tr2in1"><input type="text" :value="sn.arr[0]" disabled="disabled"></li>
    <!--           <li><input :value="sn.arr[1]" disabled="disabled"></li> -->
              <li class="li3">{{sn.arr[7]}}</li>
            </ul>
          </div>
          <!-- 表格为四列 -->
          <div v-else>
            <!-- 不存在子条码 -->
            <ul v-if="!sn.status" :class="{on: sn.arr[5]}">
              <li class="li1" v-bind:class="{paddingLfet20: checkBoxShow}">
                <label v-show="checkBoxShow" :for= "sn.arr[1]" :class="{on: checkboxVal[index]}">
                </label>
                <input type="checkbox" :id="sn.arr[1]" v-model="checkboxVal[index]">
                {{index+1}}
              </li>
              <li class="li2"><input type="text" :value="sn.arr[0]" disabled="disabled"></li>
              <li class="li3" @click="snDetailUrl(sn.arr[1], sn.arr[3], sn.arr[6], false)"><input type="text" :value="sn.arr[1]" disabled="disabled"></li>
              <li class="li4"><p v-if="sn.arr[5]">匹配</p></li>
            </ul>
            <!-- 存在子条码 -->
            <ul v-else v-for="(i,index1) in sn.arr[1].length" :key="i" :class="{on: sn.arr[2][index1]}">
              <li class="li1" v-if="index1 == 0" v-bind:class="{paddingLfet20: checkBoxShow}">
                <label v-show="checkBoxShow" :for= "sn.arr[1][0]" :class="{on: checkboxVal[index]}">
                </label>
                <input type="checkbox" :id="sn.arr[1][0]" v-model="checkboxVal[index]">
                {{index+1}}
              </li>
              <li class="li2" v-else></li>

              <li class="li3" v-if="index1 == 0"><input type="text" :value="sn.arr[0]" disabled="disabled"></li>
              <li v-else></li>

              <li  class="li4" @click="snDetailUrl(sn.arr[1][index1], sn.arr[3], sn.arr[6], true)"><input type="text" :value="sn.arr[1][i-1]" disabled="disabled"></li>
              <li class="li5"><p v-if="sn.arr[2][index1]">匹配</p></li>
            </ul>
          </div>
        </li>
        <li><span id="spanid"></span></li>
      </ul>
    </div>
  </div>
</template>
<script>
// import $ from 'n-zepto'
import Vue from 'vue'
import Vuex from 'vuex'
import BScroll from 'better-scroll'
import TableH from '../components/table-h'
import { path, V } from '../js/variable.js'
Vue.use(Vuex)
  export default {
    name: 'table-tr',
    components: {TableH},
    data() {
      return {
        height: document.documentElement.clientHeight,
        fontSize: parseInt(document.getElementsByTagName('html')[0].style.fontSize),
        canDel: false,
        urlParams: this.$route.query.name,
        ZDDLX: this.$route.query.ZDDLX,
        offsetHeight: 0
      }
    },
    computed: {
      snCount() {
        return this.$store.state.snCount
      },
      sns() {
        return this.$store.state.SN
      },
      SNCopy() {
        return this.$store.state.SNCopy
      },
      checkBoxShow() {
        return this.$store.state.checkBoxShow
      },
      checkboxVal() {
        return this.$store.state.checkboxVal
      },
      isTr3() {
        return this.$store.state.isTr3
      },
      snArr() {
        return this.$store.state.snArr
      },
      bottomBtnName() {
        return this.$store.state.bottomBtnName
      }
    },
    methods: {
      loadingShow: function(x) {
        this.$store.commit('loadingShow', x)
      },
      // 在文件sn-list.vue获取
      setSNCount(x) {
        this.$store.commit('snCount', x)
      },
      setSN(x) {
        this.$store.commit('SN', x)
      },
      // (SN, BUS_NO, ITEM_NO, status)
      snDetailUrl(SN, BUS_NO, ITEM_NO, status) {
        let _this = this
        let params = {}
        // 销售备货模块
        if (this.urlParams === 'salestockup' || this.urlParams === 'salesoutput' || this.urlParams === 'salesreturn') {
          params = {
            VBELN: BUS_NO,
            POSNR: ITEM_NO,
            ZTIAOM: SN
          }
        // 采购入库模块
        } else if (this.urlParams === 'purchase') {
          params = {
            BUS_NO: BUS_NO,
            ITEM_NO: ITEM_NO,
            ZDDLX: this.ZDDLX,
            ZTIAOM: SN
          }
        } else if (this.urlParams === 'allot' || this.urlParams === 'allotinbound') {
          // 调拨出入库
          params = {
            ZTIAOM: SN
          }
        }
        let url = path.sap + this.urlParams + '/getinformation'
        this.$store.commit('ifFB', status)
        if (this.urlParams !== 'product') {
          this.showSNDetail(url, params).then(function(data) {
            let arr = []
            // 采购入库模块
            if (_this.urlParams === 'purchase') {
              if (data.MT_Purchase_GetInformation_Resp.Header) {
                arr = data.MT_Purchase_GetInformation_Resp.Header
              }
            } else if (_this.urlParams === 'salestockup') {
              // 销售备货模块
              if (data.MT_Salestockup_GetInformation_Resp.Header) {
                arr = data.MT_Salestockup_GetInformation_Resp.Header
              }
            } else if (_this.urlParams === 'salesoutput') {
              // 销售出库模块
              if (data.MT_Salesoutput_GetInformation_Resp.Header) {
                arr = data.MT_Salesoutput_GetInformation_Resp.Header
              }
            } else if (_this.urlParams === 'salesreturn') {
              // 销售出库模块
              if (data.MT_SalesReturn_GetInformation_Resp.Header) {
                arr = data.MT_SalesReturn_GetInformation_Resp.Header
              }
            } else if (_this.urlParams === 'allot') {
              // 销售出库模块
              if (data.MT_Allot_GetInformationResp.Header) {
                arr = data.MT_Allot_GetInformationResp.Header
              }
            } else if (_this.urlParams === 'allotinbound') {
              // 销售出库模块
              if (data.MT_AllotInbound_GetInformation_Resp.Header) {
                arr = data.MT_AllotInbound_GetInformation_Resp.Header
              }
            }
            if (arr.Item) {
              _this.$store.commit('snDetailFB', arr.Item[0])
              _this.$store.commit('snDetail', arr)
              _this.detailBoxShow(true)
            } else {
              alert('数据查询失败！')
            }
          })
        }
      },
      showSNDetail(url, params) {
        let _this = this
        let data = new Promise(function(resolve, reject) {
          if (!_this.checkBoxShow) {
            _this.loadingShow(true)
            V.get(url, params).then(function(data) {
              _this.loadingShow(false)
              data = JSON.parse(data.responseText)
              resolve(data)
            }).catch((res) => {
              alert('请求超时！')
              _this.loadingShow(false)
            })
          }
        })
        return data
      },
      detailBoxShow(x) {
        this.$store.commit('detailBoxShow', x)
      },
      getSnListHeight() {
        let temp = document.getElementsByClassName('content')[0].offsetHeight
        return temp
        // if (temp > 200) {
        //   return (temp)
        // } else {
        //   this.getSnListHeight()
        // }
      }
    },
    updated() {

    },
    created: function() {
      this.$store.commit('isTr3', false)
      if (this.urlParams === 'stock') {
        this.urlParams = this.bottomBtnName
      }
    },
    mounted() {
      let _this = this
      // 获取节点
      let scrollBox = document.getElementById('contain')
      scrollBox.addEventListener('scroll', function() {
        let [scrollTop, contentHeight, htmlFontSize] = [scrollBox.scrollTop, document.getElementById('content').offsetHeight, document.getElementsByTagName('html')[0].style.fontSize]
        if (scrollTop > contentHeight - parseInt(htmlFontSize) * 11) {
          _this.setSNCount(_this.snCount + 50)
          _this.setSN(_this.SNCopy.slice(0, _this.snCount))
        }
      })
      // let snListHeight = this.getSnListHeight()
      // this.setSNCount(this.snCount)
      // this.$nextTick(() => {
      //   $('.content').scroll(function() {
      //     var t = $(this).scrollTop()
      //     console.log(t)
      //   })
        // this.scroll = new BScroll(this.$refs.wrapper, {
        //   mouseWheel: true
        //   // scrollbar: {
        //   //   fade: true,
        //   //   interactive: false
        //   // },
        //   // pullUpLoad: {
        //   //   threshold: 0,
        //   //   moreText: '加载更多',
        //   //   noMoreText: '没有更多数据了'
        //   // }
        // })

        // this.scroll.on('pullingUp', () => {
        //   if (this.snCount < this.SNCopy.length) {
        //     this.setSNCount(this.snCount + 30)
        //     this.setSN(this.SNCopy.slice(0, this.snCount))
        //     this.scroll.finishPullUp()
        //   }
        // })
      // })
    }
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.table-tr-sn{
  width: 100%;
  label{
    position: absolute;
    display: block;
    top: .1875rem;
    left: $f4;
    width: $f14;
    height: $f14;
    border: 1px solid #b8b8b8;
    border-radius: 3px;
  }
  label.on{
    background: url(../assets/img/purchase/6_choose.png) no-repeat;
    background-size: 105% 105%;
  }
  input[type="checkbox"]{
    display: none;
  }
  li{
    float: left;
  }   
  &>li{
    width: 100%;
    border-bottom: 1px solid $borderIn;

    ul{
      position: relative;
      height: $f30;
      border-bottom: 1px solid $borderIn;
    }
    ul.on{
      input, li, p{
        color: #38ce54;
      }
    }
    ul:last-child{
      border-bottom: none;
    }
    li{
      width: 2.8125rem;
      height: $f30;
      line-height: $f30;
      font-size: $textSize;
      color: $textCol;
      text-align: center;
      position: relative;
      padding: 0 $f4;
      box-sizing: border-box;
      overflow-y: hidden;
    }
    li.tr2in1{
      width: 5.625rem;
      input{
        text-align: center;
      }
      
    }
    li:after{
      display: block;
      content: '';
      width: 1px;
      height: $f20;
      background: $borderIn;
      position: absolute;
      top: $f5;
      right: 0;
    }
    li:last-child:after{
      width: 0;
    }
    li:first-child{
      width: $f50;
    }
    li.paddingLfet20{
      padding-left: $f20;
    }
  }
  &>li:last-child{
    border-bottom: none;
  }
  div.on{
    input,li,ul,p{
      color: #38ce54;
    }
  }
}
</style>
